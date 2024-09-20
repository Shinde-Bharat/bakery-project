import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Package, Truck, User, Search, CheckCircle } from 'lucide-react'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/react'

// Mock data for new orders
const initialOrders = [
    { id: 1, customerName: "John Doe", address: "123 Main St, City", pincode: "110001", items: 2, status: "Pending" },
    { id: 2, customerName: "Jane Smith", address: "456 Elm St, Town", pincode: "110002", items: 1, status: "Pending" },
    { id: 3, customerName: "Bob Johnson", address: "789 Oak St, Village", pincode: "110001", items: 3, status: "Pending" },
    { id: 4, customerName: "Alice Brown", address: "101 Pine St, County", pincode: "110003", items: 2, status: "Pending" },
]

export default function DeliveryDashboard() {
    const [orders, setOrders] = useState(initialOrders)
    const [searchTerm, setSearchTerm] = useState("")
    const [pincodeFilter, setPincodeFilter] = useState("")

    const filteredOrders = orders.filter((order) =>
        (order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.address.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (pincodeFilter === "" || order.pincode === pincodeFilter)
    )

    const handleAccept = (orderId) => {
        setOrders(orders.map(order =>
            order.id === orderId ? { ...order, status: "Accepted" } : order
        ))
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <nav className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">Delivery Dashboard</h1>
                <div className="flex space-x-4 bg-red-600">
                    <NavLink href="/new-orders" className="text-blue-600 hover:text-blue-800">New Orders</NavLink>
                    <NavLink href="/my-orders" className="text-blue-600 hover:text-blue-800">My Orders</NavLink>
                    <NavLink href="/profile" className="text-blue-600 hover:text-blue-800">Profile</NavLink>
                </div>
            </nav>

            <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Deliveries</CardTitle>
                        <Truck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">24</div>
                        <p className="text-xs text-muted-foreground">+10% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">13</div>
                        <p className="text-xs text-muted-foreground">+2 since yesterday</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">On-Time Delivery Rate</CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">98.5%</div>
                        <p className="text-xs text-muted-foreground">+0.5% from last week</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
                        <User className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4.9/5</div>
                        <p className="text-xs text-muted-foreground">Based on 120 reviews</p>
                    </CardContent>
                </Card>
            </div>

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
                        <div className="w-[150px]">
                            <Label htmlFor="pincode-filter" className="sr-only">Filter by pincode</Label>
                            <Input
                                id="pincode-filter"
                                placeholder="Filter by pincode"
                                value={pincodeFilter}
                                onChange={(e) => setPincodeFilter(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {filteredOrders.map((order) => (
                        <Card key={order.id}>
                            <CardHeader>
                                <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <User className="h-4 w-4 mr-2 text-muted-foreground" />
                                        <span>{order.customerName}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                                        <span>{order.address}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Package className="h-4 w-4 mr-2 text-muted-foreground" />
                                        <span>{order.items} item(s)</span>
                                    </div>
                                    <div className="flex justify-between items-center mt-4">
                                        <Badge variant={order.status === "Pending" ? "secondary" : "success"}>
                                            {order.status}
                                        </Badge>
                                        {order.status === "Pending" && (
                                            <Button onClick={() => handleAccept(order.id)}>Accept</Button>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

            </div>

        </div>
    )
}