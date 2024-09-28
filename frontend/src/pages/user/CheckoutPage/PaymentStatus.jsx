import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { toast } from "@/hooks/use-toast"
import { createOrder } from '@/services/apis/order'
// import { Spinner } from "@/components/ui/spinner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PaymentStatus() {
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const checkPaymentStatus = async () => {
            const searchParams = new URLSearchParams(location.search)
            const orderId = searchParams.get('id')

            if (!orderId) {
                toast({
                    title: "Error",
                    description: "Invalid order ID",
                    variant: "destructive",
                })
                navigate('/checkout')
                return
            }

            try {
                // Retrieve the pending order from localStorage
                const pendingOrder = JSON.parse(localStorage.getItem('pendingOrder'))

                if (!pendingOrder) {
                    throw new Error("No pending order found")
                }

                // Create the order in the database
                const orderCreatedResponse = await createOrder(pendingOrder)

                if (orderCreatedResponse.success) {
                    toast({
                        title: "Order Created Successfully",
                        description: "Your order has been placed successfully.",
                    })

                    // Clear the pending order from localStorage
                    localStorage.removeItem('pendingOrder')

                    // Navigate to the order confirmation page
                    navigate(`/confirmedOrdered/${orderId}`)
                } else {
                    throw new Error("Failed to create order")
                }
            } catch (error) {
                console.error("Error processing order:", error)
                toast({
                    title: "Error",
                    description: "Failed to process your order. Please contact support.",
                    variant: "destructive",
                })
                navigate('/checkout')
            } finally {
                setLoading(false)
            }
        }

        checkPaymentStatus()
    }, [navigate, location])

    if (loading) {
        return (
            <Card className="w-[300px] mx-auto mt-20">
                <CardHeader>
                    <CardTitle className="text-center">Processing Payment</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                    {/* <Spinner size="lg" /> */}
                </CardContent>
            </Card>
        )
    }

    return null
}