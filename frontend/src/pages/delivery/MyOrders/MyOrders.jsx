"use client"

import { useState, useEffect } from 'react'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { MapPin, Package, Phone, Search, User } from 'lucide-react'
import { Input } from '@nextui-org/react'
import { Button } from '@nextui-org/button'
import { getAcceptedOrders, updateOrderStatus } from '@/services/apis/delivery'

export default function MyOrders() {
    const [orders, setOrders] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchOrders()
    }, [])

    const fetchOrders = async () => {
        try {
            setLoading(true)
            const fetchedOrders = await getAcceptedOrders()
            setOrders(fetchedOrders)
            setError(null)
        } catch (err) {
            setError("Failed to fetch orders. Please try again.")
            console.error("Error fetching orders:", err)
        } finally {
            setLoading(false)
        }
    }

    const outForDeliveryOrders = orders.filter(order => order.status === 'out for delivery')
    const deliveredOrders = orders.filter(order => order.status === 'delivered')

    const filteredOutForDeliveryOrders = outForDeliveryOrders.filter((order) =>
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.shippingAddress.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const filteredDeliveredOrders = deliveredOrders.filter((order) =>
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.shippingAddress.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            await updateOrderStatus(orderId, newStatus)
            fetchOrders() // Refresh orders after update
        } catch (error) {
            console.error("Error updating order status:", error)
        }
    }

    const getStatusBadgeVariant = (status) => {
        switch (status.toLowerCase()) {
            case 'out for delivery': return 'warning'
            case 'delivered': return 'success'
            default: return 'default'
        }
    }

    if (loading) return <div>Loading orders...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <div className="px-4 py-8">
            <h1 className="text-2xl font-bold mb-8">My Orders</h1>

            <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-8">
                <div className="flex-1">
                    <Label htmlFor="search" className="sr-only">Search orders</Label>
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            id="search"
                            placeholder="Search orders..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-8"
                        />
                    </div>
                </div>
            </div>

            <Tabs defaultValue="out-for-delivery">
                <TabsList>
                    <TabsTrigger value="out-for-delivery">Out for Delivery</TabsTrigger>
                    <TabsTrigger value="delivered">Delivered</TabsTrigger>
                </TabsList>
                <TabsContent value="out-for-delivery">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredOutForDeliveryOrders.map((order) => (
                            <Card key={order._id}>
                                <CardHeader>
                                    <CardTitle className="text-lg flex justify-between items-center">
                                        <span>Order #{order.orderId}</span>
                                        <Badge variant={getStatusBadgeVariant(order.status)}>{order.status}</Badge>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <div className="flex items-center">
                                            <User className="h-4 w-4 mr-2 text-muted-foreground" />
                                            <span>{order.customer.name}</span>
                                        </div>
                                        <div className="flex items-start">
                                            <MapPin className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                                            <span>{order.shippingAddress}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                                            <span>{order.customer.number}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Package className="h-4 w-4 mr-2 text-muted-foreground" />
                                            <span>{order.items.length} item(s)</span>
                                        </div>
                                        <Button
                                            onClick={() => handleStatusUpdate(order._id, 'delivered')}
                                            className="w-full mt-2"
                                        >
                                            Mark as Delivered
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    {filteredOutForDeliveryOrders.length === 0 && (
                        <div className="text-center py-8">
                            <p className="text-muted-foreground">No orders out for delivery matching your criteria.</p>
                        </div>
                    )}
                </TabsContent>
                <TabsContent value="delivered">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredDeliveredOrders.map((order) => (
                            <Card key={order._id}>
                                <CardHeader>
                                    <CardTitle className="text-lg flex justify-between items-center">
                                        <span>Order #{order.orderId}</span>
                                        <Badge variant={getStatusBadgeVariant(order.status)}>{order.status}</Badge>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <div className="flex items-center">
                                            <User className="h-4 w-4 mr-2 text-muted-foreground" />
                                            <span>{order.customer.name}</span>
                                        </div>
                                        <div className="flex items-start">
                                            <MapPin className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                                            <span>{order.shippingAddress}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                                            <span>{order.customer.number}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Package className="h-4 w-4 mr-2 text-muted-foreground" />
                                            <span>{order.items.length} item(s)</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    {filteredDeliveredOrders.length === 0 && (
                        <div className="text-center py-8">
                            <p className="text-muted-foreground">No delivered orders matching your criteria.</p>
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    )
}