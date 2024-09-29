

import { useState, useEffect } from "react"
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
import { Search, Filter, ChevronDown, ChevronUp, MapPin } from "lucide-react"
import { Button, Input } from "@nextui-org/react"
// import { getAllOrders, updateOrderStatusAdmin, assignDeliveryBoy } from "@/services/apis/orders"
import { getAllOrders, updateOrderStatusAdmin, assignDeliveryBoy } from "@/services/apis/order"

const statusColors = {
    processing: "bg-yellow-200 text-yellow-800",
    packed: "bg-blue-200 text-blue-800",
    "out for delivery": "bg-purple-200 text-purple-800",
    delivered: "bg-green-200 text-green-800",
}

export default function OrderManagementPage() {
    const [orders, setOrders] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("All")
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [expandedOrders, setExpandedOrders] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchOrders()
    }, [])

    const fetchOrders = async () => {
        try {
            setLoading(true)
            const fetchedOrders = await getAllOrders()
            setOrders(fetchedOrders)
            setError(null)
        } catch (err) {
            setError("Failed to fetch orders. Please try again.")
            console.error("Error fetching orders:", err)
        } finally {
            setLoading(false)
        }
    }

    const filteredOrders = orders.filter((order) => {
        const matchesSearch = order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer.name.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === "All" || order.status === statusFilter
        return matchesSearch && matchesStatus
    })

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await updateOrderStatusAdmin(orderId, newStatus)
            setOrders(orders.map(order =>
                order._id === orderId ? { ...order, status: newStatus } : order
            ))
        } catch (error) {
            console.error("Error updating order status:", error)
        }
    }

    const handleAssignDeliveryBoy = async (orderId, deliveryBoyId) => {
        try {
            const updatedOrder = await assignDeliveryBoy(orderId, deliveryBoyId)
            setOrders(orders.map(order =>
                order._id === orderId ? updatedOrder : order
            ))
        } catch (error) {
            console.error("Error assigning delivery boy:", error)
        }
    }

    const toggleOrderExpansion = (orderId) => {
        setExpandedOrders(prev => ({
            ...prev,
            [orderId]: !prev[orderId]
        }))
    }

    if (loading) return <div>Loading orders...</div>
    if (error) return <div>Error: {error}</div>
    console.log(orders);


    return (
        <div className="container mx-auto px-4 py-8  overflow-y-scroll max-h-screen">
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
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="packed">Packed</SelectItem>
                            <SelectItem value="out for delivery">Out for Delivery</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
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
                            <TableRow key={order._id}>
                                <TableCell>{order.orderId}</TableCell>
                                <TableCell>{order.customer.name}</TableCell>
                                <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                                <TableCell>₹{order.total.toFixed(2)}</TableCell>
                                <TableCell>
                                    <Badge className={statusColors[order.status]}>
                                        {order.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex space-x-2">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="flat" color="primary" onClick={() => setSelectedOrder(order)}>
                                                    Update Status
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                    <DialogTitle>Update Order Status</DialogTitle>
                                                    <DialogDescription>
                                                        Change the status for order {selectedOrder?.orderId}
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="grid gap-4 py-4">
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="status" className="text-right">
                                                            Status
                                                        </Label>
                                                        <Select
                                                            value={selectedOrder?.status}
                                                            onValueChange={(value) => handleStatusChange(selectedOrder?._id, value)}
                                                        >
                                                            <SelectTrigger className="w-[180px]">
                                                                <SelectValue placeholder="Select status" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="processing">Processing</SelectItem>
                                                                <SelectItem value="packed">Packed</SelectItem>
                                                                <SelectItem value="out for delivery">Out for Delivery</SelectItem>
                                                                <SelectItem value="delivered">Delivered</SelectItem>
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
                                            onClick={() => toggleOrderExpansion(order._id)}
                                        >
                                            {expandedOrders[order._id] ? <ChevronUp /> : <ChevronDown />}
                                        </Button>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline">
                                                    <MapPin className="mr-2 h-4 w-4" /> Address
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                    <DialogTitle>Shipping Address</DialogTitle>
                                                    <DialogDescription>
                                                        Address for order {order.orderId}
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="py-4">
                                                    <p>{order.shippingAddress}</p>
                                                    <p>Postal Code: {order.postalCode}</p>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </TableCell>
                            </TableRow>
                            {expandedOrders[order._id] && (
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
                                                    {order.items.map((item, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell>{item.name}</TableCell>
                                                            <TableCell>₹{item.price.toFixed(2)}</TableCell>
                                                            <TableCell>{item.quantity}</TableCell>
                                                            <TableCell>₹{(item.price * item.quantity).toFixed(2)}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                            {order.status === "out for delivery" && (
                                                <div className="mt-4">
                                                    <h4 className="font-semibold mb-2"> Delivery Boy:</h4>
                                                    {order?.deliveryBoy?.name}
                                                </div>
                                            )}
                                            {order.status === "delivered" && (
                                                <div className="mt-4">
                                                    <h4 className="font-semibold mb-2"> Delivered by:</h4>
                                                    {order.deliveryBoy === 'undefined' ? 'Admin' : order?.deliveryBoy?.name}

                                                </div>
                                            )}
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