import React from 'react'

import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    Tag,
    MessageSquare,
    DollarSign,
    ArrowUpRight,
    ArrowDownRight,
    IndianRupee
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// Mock data for recent activities
const recentActivities = [
    { id: 1, action: "New order placed", orderId: "#12345", customer: "John Doe", amount: 150.00 },
    { id: 2, action: "Product restocked", productId: "P-789", quantity: 50 },
    { id: 3, action: "Customer review", productId: "P-456", rating: 5, customer: "Jane Smith" },
    { id: 4, action: "Discount code used", code: "SUMMER20", discount: "20%" },
]

function AdminOverview() {
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
                        <div className="text-2xl font-bold">₹45,231.89</div>
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
                        <div className="text-2xl font-bold">+573</div>
                        <p className="text-xs text-muted-foreground">
                            +201 since last hour
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
                        <div className="text-2xl font-bold">+2350</div>
                        <p className="text-xs text-muted-foreground">
                            +180.1% from last month
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
                        <div className="text-2xl font-bold">7 active</div>
                        <p className="text-xs text-muted-foreground">
                            3 ending in 24 hours
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
                        {recentActivities.map((activity) => (
                            <li key={activity.id} className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                    {activity.action === "New order placed" && (
                                        <ShoppingCart className="h-6 w-6 text-blue-500" />
                                    )}
                                    {activity.action === "Product restocked" && (
                                        <Package className="h-6 w-6 text-green-500" />
                                    )}
                                    {activity.action === "Customer review" && (
                                        <MessageSquare className="h-6 w-6 text-yellow-500" />
                                    )}
                                    {activity.action === "Discount code used" && (
                                        <Tag className="h-6 w-6 text-purple-500" />
                                    )}
                                </div>
                                <div>
                                    <p className="text-sm font-medium">{activity.action}</p>
                                    <p className="text-xs text-gray-500">
                                        {activity.orderId && `Order ${activity.orderId}`}
                                        {activity.productId && `Product ${activity.productId}`}
                                        {activity.code && `Code: ${activity.code}`}
                                        {activity.customer && ` by ${activity.customer}`}
                                        {activity.amount && ` - ₹${activity.amount}`}
                                        {activity.quantity && ` - Qty: ${activity.quantity}`}
                                        {activity.rating && ` - ${activity.rating} stars`}
                                        {activity.discount && ` - ${activity.discount} off`}
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