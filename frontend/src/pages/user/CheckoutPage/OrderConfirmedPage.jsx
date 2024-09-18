import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, Package, Truck } from "lucide-react"

// Mock order data
const orderData = {
  orderId: "ORD-12345-ABCDE",
  date: "May 15, 2023",
  status: "Processing",
  items: [
    { id: 1, name: "Wireless Earbuds", quantity: 1, price: 79.99 },
    { id: 2, name: "Smart Watch", quantity: 1, price: 199.99 },
    { id: 3, name: "Portable Charger", quantity: 2, price: 49.99 },
  ],
  subtotal: 379.96,
  shipping: 9.99,
  tax: 37.99,
  total: 427.94,
  shippingAddress: {
    name: "John Doe",
    street: "123 Main St",
    city: "Anytown",
    state: "CA",
    zipCode: "12345",
    country: "United States",
  },
  paymentMethod: "RazorPay",
}

export default function OrderConfirmedPage() {
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
                <span>{orderData.date}</span>
              </div>
              <div className="flex justify-between">
                <span>Order Status:</span>
                <span className="font-semibold text-orange-500">{orderData.status}</span>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Items</h3>
                {orderData.items.map((item) => (
                  <div key={item.id} className="flex justify-between mb-2">
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
                  <span>₹{orderData.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>₹{orderData.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>₹{orderData.tax.toFixed(2)}</span>
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
                <p>{orderData.shippingAddress.name}</p>
                <p>{orderData.shippingAddress.street}</p>
                <p>
                  {orderData.shippingAddress.city}, {orderData.shippingAddress.state}{" "}
                  {orderData.shippingAddress.zipCode}
                </p>
                <p>{orderData.shippingAddress.country}</p>
              </address>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="w-5 h-5 mr-2" />
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{orderData.paymentMethod}</p>
            </CardContent>
          </Card>
        </div>


      </div>
    </div>
  )
}