
import { useState } from "react"

import { Label } from "@/components/ui/label"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, ChevronDown, ChevronUp } from "lucide-react"
import { Button, Input } from "@nextui-org/react"

// Mock data for orders
const initialOrders = [
    {
        id: "ORD-001",
        customer: "John Doe",
        date: "2023-06-15",
        total: 129.99,
        status: "Processing",
        items: [
            { id: 1, name: "Wireless Earbuds", price: 79.99, quantity: 1 },
            { id: 2, name: "Phone Case", price: 25.00, quantity: 2 },
        ]
    },
    {
        id: "ORD-002",
        customer: "Jane Smith",
        date: "2023-06-14",
        total: 79.99,
        status: "Shipped",
        items: [
            { id: 3, name: "Bluetooth Speaker", price: 59.99, quantity: 1 },
            { id: 4, name: "USB Cable", price: 9.99, quantity: 2 },
        ]
    },
    {
        id: "ORD-003",
        customer: "Bob Johnson",
        date: "2023-06-13",
        total: 199.99,
        status: "Delivered",
        items: [
            { id: 5, name: "Smart Watch", price: 199.99, quantity: 1 },
        ]
    },
    {
        id: "ORD-004",
        customer: "Alice Brown",
        date: "2023-06-12",
        total: 59.99,
        status: "Processing",
        items: [
            { id: 6, name: "Portable Charger", price: 39.99, quantity: 1 },
            { id: 7, name: "Screen Protector", price: 9.99, quantity: 2 },
        ]
    },
    {
        id: "ORD-005",
        customer: "Charlie Davis",
        date: "2023-06-11",
        total: 149.99,
        status: "Shipped",
        items: [
            { id: 8, name: "Wireless Mouse", price: 29.99, quantity: 1 },
            { id: 9, name: "Keyboard", price: 89.99, quantity: 1 },
            { id: 10, name: "Mouse Pad", price: 14.99, quantity: 2 },
        ]
    },
]

const statusColors = {
    Processing: "bg-yellow-200 text-yellow-800",
    Shipped: "bg-blue-200 text-blue-800",
    Delivered: "bg-green-200 text-green-800",
}

export default function OrderManagementPage() {
    const [orders, setOrders] = useState(initialOrders)
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("All")
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [expandedOrders, setExpandedOrders] = useState({})

    const filteredOrders = orders.filter((order) => {
        const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === "All" || order.status === statusFilter
        return matchesSearch && matchesStatus
    })

    const handleStatusChange = (orderId, newStatus) => {
        setOrders(orders.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
        ))
    }

    const toggleOrderExpansion = (orderId) => {
        setExpandedOrders(prev => ({
            ...prev,
            [orderId]: !prev[orderId]
        }))
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Order Management</h1>

            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-2">
                    <Search className="text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Search orders..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-64"
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <Filter className="text-gray-400" />
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">All Statuses</SelectItem>
                            <SelectItem value="Processing">Processing</SelectItem>
                            <SelectItem value="Shipped">Shipped</SelectItem>
                            <SelectItem value="Delivered">Delivered</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredOrders.map((order) => (
                        <>
                            <TableRow key={order.id}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{order.customer}</TableCell>
                                <TableCell>{order.date}</TableCell>
                                <TableCell>${order.total.toFixed(2)}</TableCell>
                                <TableCell>
                                    <Badge className={statusColors[order.status]}>
                                        {order.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex space-x-2">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" onClick={() => setSelectedOrder(order)}>
                                                    Update Status
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                    <DialogTitle>Update Order Status</DialogTitle>
                                                    <DialogDescription>
                                                        Change the status for order {selectedOrder?.id}
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="grid gap-4 py-4">
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="status" className="text-right">
                                                            Status
                                                        </Label>
                                                        <Select
                                                            value={selectedOrder?.status}
                                                            onValueChange={(value) => handleStatusChange(selectedOrder?.id, value)}
                                                        >
                                                            <SelectTrigger className="w-[180px]">
                                                                <SelectValue placeholder="Select status" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="Processing">Processing</SelectItem>
                                                                <SelectItem value="Shipped">Shipped</SelectItem>
                                                                <SelectItem value="Delivered">Delivered</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>
                                                <DialogFooter>
                                                    <Button type="submit">Save changes</Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                        <Button
                                            variant="outline"
                                            onClick={() => toggleOrderExpansion(order.id)}
                                        >
                                            {expandedOrders[order.id] ? <ChevronUp /> : <ChevronDown />}
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                            {expandedOrders[order.id] && (
                                <TableRow>
                                    <TableCell colSpan={6}>
                                        <div className="bg-gray-50 p-4 rounded-md">
                                            <h4 className="font-semibold mb-2">Order Items:</h4>
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Product</TableHead>
                                                        <TableHead>Price</TableHead>
                                                        <TableHead>Quantity</TableHead>
                                                        <TableHead>Subtotal</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {order.items.map((item) => (
                                                        <TableRow key={item.id}>
                                                            <TableCell>{item.name}</TableCell>
                                                            <TableCell>${item.price.toFixed(2)}</TableCell>
                                                            <TableCell>{item.quantity}</TableCell>
                                                            <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}