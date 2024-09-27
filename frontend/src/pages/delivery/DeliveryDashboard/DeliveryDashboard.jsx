

import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Package, Truck, User, Search, CheckCircle } from 'lucide-react'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/react'
import { getPackedOrders, acceptOrder, getAcceptedOrders, updateOrderStatus } from '@/services/apis/delivery'

export default function DeliveryDashboard() {
    const [packedOrders, setPackedOrders] = useState([])
    const [acceptedOrders, setAcceptedOrders] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [pincodeFilter, setPincodeFilter] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchOrders()
    }, [])

    const fetchOrders = async () => {
        try {
            setLoading(true)
            const [packed, accepted] = await Promise.all([getPackedOrders(), getAcceptedOrders()])
            setPackedOrders(packed)
            setAcceptedOrders(accepted)
            setError(null)
        } catch (err) {
            setError("Failed to fetch orders. Please try again.")
            console.error("Error fetching orders:", err)
        } finally {
            setLoading(false)
        }
    }

    const filteredPackedOrders = packedOrders.filter((order) =>
        (order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.shippingAddress.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (pincodeFilter === "" || order.postalCode === pincodeFilter)
    )

    const handleAccept = async (orderId) => {
        try {
            await acceptOrder(orderId)
            fetchOrders() // Refresh both packed and accepted orders
        } catch (error) {
            console.error("Error accepting order:", error)
        }
    }

    const handleUpdateStatus = async (orderId, status) => {
        try {
            await updateOrderStatus(orderId, status)
            fetchOrders() // Refresh both packed and accepted orders
        } catch (error) {
            console.error("Error updating order status:", error)
        }
    }

    if (loading) return <div>Loading orders...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <div className="container mx-auto px-4 py-8">
            <nav className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">Delivery Dashboard</h1>
                <div className="flex space-x-4">
                    <NavLink to="/new-orders" className="text-blue-600 hover:text-blue-800">New Orders</NavLink>
                    <NavLink to="/my-orders" className="text-blue-600 hover:text-blue-800">My Orders</NavLink>
                    <NavLink to="/profile" className="text-blue-600 hover:text-blue-800">Profile</NavLink>
                </div>
            </nav>

            <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Deliveries</CardTitle>
                        <Truck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{acceptedOrders.length}</div>
                        <p className="text-xs text-muted-foreground">Total accepted orders</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{packedOrders.length}</div>
                        <p className="text-xs text-muted-foreground">Orders ready for pickup</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">On-Time Delivery Rate</CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">98.5%</div>
                        <p className="text-xs text-muted-foreground">Estimated on-time rate</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
                        <User className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4.9/5</div>
                        <p className="text-xs text-muted-foreground">Estimated satisfaction rate</p>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-4">
                <Tabs defaultValue="new-orders">
                    <TabsList>
                        <TabsTrigger value="new-orders">New Orders</TabsTrigger>
                        <TabsTrigger value="my-orders">My Accepted Orders</TabsTrigger>
                    </TabsList>
                    <TabsContent value="new-orders">
                        <div className="space-y-4">
                            <div className='text-xl font-semibold'>New Orders</div>

                            <div className="flex flex-col md:flex-row justify-between md:items-center space-y-2 md:space-y-0 md:space-x-2">
                                <div className="flex-1 flex space-x-2">
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
                            </div>

                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {filteredPackedOrders.map((order) => (
                                    <Card key={order._id}>
                                        <CardHeader>
                                            <CardTitle className="text-lg">Order #{order.orderId}</CardTitle>
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
                                                    <Package className="h-4 w-4 mr-2 text-muted-foreground" />
                                                    <span>{order.items.length} item(s)</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                                                    <span>Pincode: {order.postalCode}</span>
                                                </div>
                                                <div className="flex justify-between items-center mt-4">
                                                    <Badge variant="secondary">
                                                        {order.status}
                                                    </Badge>
                                                    <Button onClick={() => handleAccept(order._id)}>Accept</Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="my-orders">
                        <div className="space-y-4">
                            <div className='text-xl font-semibold'>My Accepted Orders</div>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {acceptedOrders.map((order) => (
                                    <Card key={order._id}>
                                        <CardHeader>
                                            <CardTitle className="text-lg">Order #{order.orderId}</CardTitle>
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
                                                    <Package className="h-4 w-4 mr-2 text-muted-foreground" />
                                                    <span>{order.items.length} item(s)</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                                                    <span>Pincode: {order.postalCode}</span>
                                                </div>
                                                <div className="flex justify-between items-center mt-4">
                                                    <Badge variant="secondary">
                                                        {order.status}
                                                    </Badge>
                                                    {order.status === 'out for delivery' && (
                                                        <Button onClick={() => handleUpdateStatus(order._id, 'delivered')}>
                                                            Mark as Delivered
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}