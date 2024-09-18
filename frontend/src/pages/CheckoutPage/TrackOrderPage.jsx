import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Truck, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/react"

// Mock order data
const orderData = {
    orderId: "ORD-12345-ABCDE",
    status: "In Transit",
    estimatedDelivery: "May 22, 2023",
    items: [
        { id: 1, name: "Wireless Earbuds", quantity: 1 },
        { id: 2, name: "Smart Watch", quantity: 1 },
        { id: 3, name: "Portable Charger", quantity: 2 },
    ],
    timeline: [
        { id: 1, status: "Order Placed", date: "May 15, 2023", time: "10:30 AM", completed: true },
        { id: 2, status: "Processing", date: "May 16, 2023", time: "2:45 PM", completed: true },
        { id: 3, status: "Shipped", date: "May 17, 2023", time: "11:15 AM", completed: true },
        { id: 4, status: "In Transit", date: "May 18, 2023", time: "9:00 AM", completed: true },
        { id: 5, status: "Out for Delivery", date: "Pending", time: "", completed: false },
        { id: 6, status: "Delivered", date: "Pending", time: "", completed: false },
    ],
}

export default function TrackOrderPage() {
    const [orderId, setOrderId] = useState("")

    const handleTrackOrder = (e) => {
        e.preventDefault()
        // In a real application, you would fetch the order data based on the orderId
        console.log("Tracking order:", orderId)
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Track Your Order</h1>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Enter Your Order ID</CardTitle>
                    <CardDescription>Please enter the order ID you received in your confirmation email.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleTrackOrder} className="flex space-x-2">
                        <Input
                            placeholder="e.g., ORD-12345-ABCDE"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            className="flex-grow"
                        />
                        <Button type="submit">Track</Button>
                    </form>
                </CardContent>
            </Card>

            {orderData && (
                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Status</CardTitle>
                            <CardDescription>Order #{orderData.orderId}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-lg font-semibold">{orderData.status}</p>
                                    <p className="text-sm text-gray-500">Estimated Delivery: {orderData.estimatedDelivery}</p>
                                </div>
                                <Package className="w-12 h-12 text-primary" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Order Timeline</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ol className="relative border-l border-gray-200">
                                {orderData.timeline.map((event, index) => (
                                    <li key={event.id} className="mb-10 ml-6">
                                        <span
                                            className={`absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 ring-4 ring-white ${event.completed ? "bg-green-200" : "bg-gray-100"
                                                }`}
                                        >
                                            {event.completed ? (
                                                <CheckCircle className="w-5 h-5 text-green-500" />
                                            ) : (
                                                <AlertCircle className="w-5 h-5 text-gray-500" />
                                            )}
                                        </span>
                                        <h3 className="font-medium leading-tight">{event.status}</h3>
                                        <p className="text-sm">{event.date}</p>
                                        {event.time && <p className="text-xs text-gray-500">{event.time}</p>}
                                    </li>
                                ))}
                            </ol>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Order Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <h3 className="font-semibold mb-2">Items in your order:</h3>
                            <ul className="list-disc list-inside space-y-1">
                                {orderData.items.map((item) => (
                                    <li key={item.id}>
                                        {item.name} x {item.quantity}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full">
                                <Truck className="w-4 h-4 mr-2" />
                                View Shipping Details
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            )}
        </div>
    )
}