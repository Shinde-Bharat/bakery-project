"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from '@nextui-org/button'
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    Tag,
    MessageSquare,
    IndianRupee,
    ArrowUpRight,
    ArrowDownRight
} from "lucide-react"
import { getAllOrders } from '@/services/apis/order'
import { getAllProducts } from '@/services/apis/products'
import { listUsers } from '@/services/apis/admin'
import { getAllMessages } from '@/services/apis/message'
import { getAllCoupons } from '@/services/apis/coupons'

function AdminOverview() {
    const [orders, setOrders] = useState([])
    const [products, setProducts] = useState([])
    const [users, setUsers] = useState([])
    const [messages, setMessages] = useState([])
    const [coupons, setCoupons] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const [ordersData, productsData, usersData, messagesData, couponsData] = await Promise.all([
                getAllOrders(),
                getAllProducts(),
                listUsers(),
                getAllMessages(),
                getAllCoupons()
            ])
            setOrders(ordersData)
            setProducts(productsData)
            setUsers(usersData)
            setMessages(messagesData)
            setCoupons(couponsData)
        } catch (error) {
            console.error("Error fetching data:", error)
        } finally {
            setLoading(false)
        }
    }

    const calculateTotalRevenue = () => {
        return orders.reduce((total, order) => total + order.total, 0)
    }

    const getActiveOrders = () => {
        return orders.filter(order => order.status !== 'delivered').length
    }

    const getNewCustomers = () => {
        const lastMonth = new Date()
        lastMonth.setMonth(lastMonth.getMonth() - 1)
        return users.filter(user => new Date(user.createdAt) > lastMonth).length
    }

    const getActiveCoupons = () => {
        const now = new Date()
        return coupons.filter(coupon => new Date(coupon.expiryDate) > now).length
    }

    const getRecentActivities = () => {
        const activities = [
            ...orders.map(order => ({
                id: order._id,
                action: "New order placed",
                orderId: order.orderId,
                customer: order.customer.name,
                amount: order.total,
                date: new Date(order.date)
            })),
            ...messages.map(message => ({
                id: message._id,
                action: "New message received",
                customer: message.name,
                subject: message.subject,
                date: new Date(message.date)
            })),
            ...products.filter(product => product.avlQuantity < 10).map(product => ({
                id: product._id,
                action: "Low stock alert",
                productId: product._id,
                productName: product.name,
                quantity: product.avlQuantity,
                date: new Date() // Assuming current date for this alert
            }))
        ]
        return activities.sort((a, b) => b.date - a.date).slice(0, 5)
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="space-y-4 px-24 py-12 font-Montserrat">
            <h2 className="text-2xl font-bold">Dashboard Overview</h2>

            {/* Key Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Revenue
                        </CardTitle>
                        <IndianRupee className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹{calculateTotalRevenue().toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">
                            +20.1% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Active Orders
                        </CardTitle>
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{getActiveOrders()}</div>
                        <p className="text-xs text-muted-foreground">
                            +{orders.filter(order => new Date(order.date) > new Date(Date.now() - 24 * 60 * 60 * 1000)).length} in last 24 hours
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            New Customers
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+{getNewCustomers()}</div>
                        <p className="text-xs text-muted-foreground">
                            +{((getNewCustomers() / users.length) * 100).toFixed(1)}% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Active Discounts
                        </CardTitle>
                        <Tag className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{getActiveCoupons()} active</div>
                        <p className="text-xs text-muted-foreground">
                            {coupons.filter(coupon => new Date(coupon.expiryDate) < new Date(Date.now() + 24 * 60 * 60 * 1000)).length} ending in 24 hours
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activities */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activities</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {getRecentActivities().map((activity) => (
                            <li key={activity.id} className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                    {activity.action === "New order placed" && (
                                        <ShoppingCart className="h-6 w-6 text-blue-500" />
                                    )}
                                    {activity.action === "New message received" && (
                                        <MessageSquare className="h-6 w-6 text-yellow-500" />
                                    )}
                                    {activity.action === "Low stock alert" && (
                                        <Package className="h-6 w-6 text-red-500" />
                                    )}
                                </div>
                                <div>
                                    <p className="text-sm font-medium">{activity.action}</p>
                                    <p className="text-xs text-gray-500">
                                        {activity.orderId && `Order ${activity.orderId}`}
                                        {activity.subject && `Subject: ${activity.subject}`}
                                        {activity.productName && `Product: ${activity.productName}`}
                                        {activity.customer && ` by ${activity.customer}`}
                                        {activity.amount && ` - ₹${activity.amount}`}
                                        {activity.quantity && ` - Qty: ${activity.quantity}`}
                                        {` - ${activity.date.toLocaleString()}`}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    )
}

export default AdminOverview