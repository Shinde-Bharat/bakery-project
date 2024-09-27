
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, Package, Truck } from "lucide-react"
import { getOrderByOrderId } from '@/services/apis/order'
import { toast } from '@/hooks/use-toast'
import { useUser } from '@/hooks/reduxHooks'

export default function OrderConfirmedPage() {
  const { orderId } = useParams()
  const [orderData, setOrderData] = useState(null)
  const [loading, setLoading] = useState(true)
  const { user } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const order = await getOrderByOrderId(orderId)
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

    if (!user.isLoggedIn) navigate('/login')
    fetchOrder()
  }, [orderId])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!orderData) {
    return <div>Order not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Order Confirmed</h1>
          <p className="text-gray-600">
            Thank you for your purchase! Your order has been received and is being processed.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
            <CardDescription>Order #{orderData.orderId}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Order Date:</span>
                <span>{new Date(orderData.date).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Order Status:</span>
                <span className="font-semibold text-orange-500">{orderData.status}</span>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Items</h3>
                {orderData.items.map((item, index) => (
                  <div key={index} className="flex justify-between mb-2">
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{orderData.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>₹{orderData.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Truck className="w-5 h-5 mr-2" />
                Shipping Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <address className="not-italic">
                <p>{orderData.customer.name}</p>
                <p>{orderData.shippingAddress}</p>
                <p>{orderData.postalCode}</p>
              </address>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="w-5 h-5 mr-2" />
                Order Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Order ID: {orderData.orderId}</p>
              <p>Customer Phone: {orderData.customer.number}</p>
              {orderData.deliveryBoy && (
                <p>Delivery Boy: {orderData.deliveryBoy.name}</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}