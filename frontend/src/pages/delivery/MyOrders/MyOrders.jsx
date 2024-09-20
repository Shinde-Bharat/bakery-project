
import { useState } from 'react'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { MapPin, Package, Phone, Search, User } from 'lucide-react'
import { Input } from '@nextui-org/react'

// Mock data for accepted orders
const initialOrders = [
    { id: 1, customerName: "John Doe", address: "123 Main St, City", pincode: "110001", phone: "+1 234-567-8901", items: 2, status: "Accepted" },
    { id: 2, customerName: "Jane Smith", address: "456 Elm St, Town", pincode: "110002", phone: "+1 234-567-8902", items: 1, status: "Out for Delivery" },
    { id: 3, customerName: "Bob Johnson", address: "789 Oak St, Village", pincode: "110001", phone: "+1 234-567-8903", items: 3, status: "Delivered" },
    { id: 4, customerName: "Alice Brown", address: "101 Pine St, County", pincode: "110003", phone: "+1 234-567-8904", items: 2, status: "Accepted" },
]

export default function MyOrders() {
    const [orders, setOrders] = useState(initialOrders)
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")

    const filteredOrders = orders.filter((order) =>
        (order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.address.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter === "all" || order.status.toLowerCase() === statusFilter)
    )

    const handleStatusUpdate = (orderId, newStatus) => {
        setOrders(orders.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
        ))
    }

    const getStatusBadgeVariant = (status) => {
        switch (status.toLowerCase()) {
            case 'accepted': return 'secondary'
            case 'out for delivery': return 'warning'
            case 'delivered': return 'success'
            default: return 'default'
        }
    }

    return (
        <div className="px-4 py-8">
            <h1 className="text-2xl font-bold mb-8">My Orders</h1>

            <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-8">
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
                    <div className="w-[200px]">
                        <Label htmlFor="status-filter" className="sr-only">Filter by status</Label>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger id="status-filter">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Statuses</SelectItem>
                                <SelectItem value="accepted">Accepted</SelectItem>
                                <SelectItem value="out for delivery">Out for Delivery</SelectItem>
                                <SelectItem value="delivered">Delivered</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 ">
                {filteredOrders.map((order) => (
                    <Card key={order.id}>
                        <CardHeader>
                            <CardTitle className="text-lg flex justify-between items-center">
                                <span>Order #{order.id}</span>
                                <Badge variant={getStatusBadgeVariant(order.status)}>{order.status}</Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-2 ">
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
                                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                                        <span>{order.phone}</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <Package className="h-4 w-4 mr-2 text-muted-foreground" />
                                        <span>{order.items} item(s)</span>
                                    </div>
                                    <div>
                                        <Label htmlFor={`status-${order.id}`}>Update Status</Label>
                                        <Select
                                            value={order.status}
                                            onValueChange={(value) => handleStatusUpdate(order.id, value)}
                                        >
                                            <SelectTrigger id={`status-${order.id}`}>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Accepted">Accepted</SelectItem>
                                                <SelectItem value="Out for Delivery">Out for Delivery</SelectItem>
                                                <SelectItem value="Delivered">Delivered</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {filteredOrders.length === 0 && (
                <div className="text-center py-8">
                    <p className="text-muted-foreground">No orders found matching your criteria.</p>
                </div>
            )}
        </div>
    )
}