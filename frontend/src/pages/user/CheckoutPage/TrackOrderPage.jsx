import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Truck, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/react"
import { toast } from "@/hooks/use-toast"
import { trackOrderByOrderId } from "@/services/apis/order"

export default function TrackOrderPage() {
    const [orderId, setOrderId] = useState("")
    const [orderData, setOrderData] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()



    const handleTrackOrder = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const order = await trackOrderByOrderId(orderId)
            setOrderData(order)
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to fetch order details. Please try again.",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    const getStatusIndex = (status) => {
        const statusOrder = ['processing', 'packed', 'out for delivery', 'delivered']
        return statusOrder.indexOf(status)
    }

    const renderTimeline = () => {
        const statusOrder = [
            { status: 'Processing', icon: Package },
            { status: 'Packed', icon: Package },
            { status: 'Out for Delivery', icon: Truck },
            { status: 'Delivered', icon: CheckCircle },
        ]

        const currentStatusIndex = getStatusIndex(orderData.status)

        return (
            <ol className="relative border-l border-gray-200 font-Montserrat">
                {statusOrder.map((step, index) => {
                    const isCompleted = index <= currentStatusIndex
                    const Icon = step.icon
                    return (
                        <li key={index} className="mb-10 ml-6">
                            <span
                                className={`absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 ring-4 ring-white ${isCompleted ? "bg-green-200" : "bg-gray-100"
                                    }`}
                            >
                                <Icon className={`w-5 h-5 ${isCompleted ? "text-green-500" : "text-gray-500"}`} />
                            </span>
                            <h3 className="font-medium leading-tight">{step.status}</h3>
                            {index === currentStatusIndex && (
                                <p className="text-sm">
                                    {new Date(orderData.date).toLocaleDateString()} {new Date(orderData.date).toLocaleTimeString()}
                                </p>
                            )}
                        </li>
                    )
                })}
            </ol>
        )
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
                        <Button type="submit" disabled={loading}>
                            {loading ? "Tracking..." : "Track"}
                        </Button>
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
                                    <p className="text-lg font-semibold capitalize">{orderData.status}</p>
                                    <p className="text-sm text-gray-500">
                                        Order Date: {new Date(orderData.date).toLocaleDateString()}
                                    </p>
                                </div>
                                <Package className="w-12 h-12 text-primary" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Order Timeline</CardTitle>
                        </CardHeader>
                        <CardContent>{renderTimeline()}</CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Order Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <h3 className="font-semibold mb-2">Items in your order:</h3>
                            <ul className="list-disc list-inside space-y-1">
                                {orderData.items.map((item, index) => (
                                    <li key={index}>
                                        {item.name} x {item.quantity} - ₹{(item.price * item.quantity).toFixed(2)}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-4">
                                <p className="font-semibold">Total: ₹{orderData.total.toFixed(2)}</p>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <div className="w-full space-y-2">
                                <h3 className="font-semibold">Shipping Details:</h3>
                                <p>{orderData.customer.name}</p>
                                <p>{orderData.shippingAddress}</p>
                                <p>{orderData.postalCode}</p>
                                {orderData.deliveryBoy && (
                                    <p className="mt-2">Delivery Person: {orderData.deliveryBoy.name}</p>
                                )}
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            )}
        </div>
    )
}