import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@nextui-org/button"
import { Input, Radio, RadioGroup, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"
import { useOrderSummary, useUser } from "@/hooks/reduxHooks"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import generateOrderId from "@/services/utils/generateOrderId"
import { createOrder } from "@/services/apis/order"
import { toast } from "@/hooks/use-toast"
import { getUserProfile } from "@/services/apis/user"
import axios from "axios"

const checkoutSchema = z.object({
    fullName: z.string().min(3, { message: "Full name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
    address: z.string().min(3, { message: "Address is required" }),
    city: z.string().min(1, { message: "City is required" }),
    country: z.string().min(2, { message: "Country is required" }),
    postalCode: z.string().min(5, { message: "Postal code must be at least 5 digits" }),
})

export default function CheckoutPage() {
    const [step, setStep] = useState(1)
    const navigate = useNavigate()
    const { orderSummary } = useOrderSummary()
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [order, setOrder] = useState(null)
    const [orderId, setOrderId] = useState(null)
    const { user } = useUser()
    const [savedAddresses, setSavedAddresses] = useState([])
    const [loading, setLoading] = useState(true)
    const [Paymenting, setPaymenting] = useState(false)
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            country: "",
            postalCode: "",
        },
    })

    useEffect(() => {
        if (!user.isLoggedIn) navigate('/login')
        if (orderSummary.total === 0) {
            navigate('/cart')
        }
        const id = generateOrderId()
        setOrderId(id)
        fetchUserProfile()
    }, [orderSummary.total, navigate, user.isLoggedIn])

    const fetchUserProfile = async () => {
        try {
            setLoading(true)
            const profile = await getUserProfile()
            setSavedAddresses(profile.savedAddresses)
            if (profile.savedAddresses.length > 0) {
                setSelectedAddress(profile.savedAddresses[0]._id)
                populateAddressFields(profile.savedAddresses[0])
            }
        } catch (err) {
            toast({
                title: "Error",
                description: "Failed to fetch saved addresses. Please try again.",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    const populateAddressFields = (address) => {
        setValue("address", address.streetName)
        setValue("city", address.city)
        setValue("country", address.country)
        setValue("postalCode", address.zipCode)
    }

    const onSubmit = async (data) => {
        if (step < 3) {
            setStep(step + 1)
            if (step === 1 || step === 2) {
                const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                setOrder({
                    orderId: orderId,
                    customer: {
                        name: data.fullName,
                        number: data.phone,
                    },
                    shippingAddress: `${data.address}, ${data.city}, ${data.country} ${data.postalCode}`,
                    postalCode: data.postalCode,
                    date: currentDate,
                    items: orderSummary.items,
                    total: orderSummary.total
                })
            }
        } else {
            try {
                setPaymenting(true)
                const paymentData = {
                    userId: user.id,
                    orderId: order.orderId,
                    name: order.customer.name,
                    mobileNumber: order.customer.number,
                    amount: Math.round(order.total),
                    customer: {
                        name: order.customer.name,
                        number: order.customer.number,
                    },
                    shippingAddress: order.shippingAddress,
                    postalCode: order.postalCode,
                    date: order.date,
                    items: order.items,
                    total: order.total,
                }
                try {

                    const response = await createOrder(paymentData)

                    console.log(response);

                    window.location.href = response.url

                    // if (response.data.msg == "OK" && response.data.status == 200) {
                    //     const orderCreatedResponce = await createOrder(order)


                    //     toast({
                    //         title: "Order Created Successfully",
                    //         description: "Your order has been placed successfully.",
                    //     })
                    // }


                } catch (error) {
                    console.log("error in payment", error)
                }
                // console.log(paymentData);

                // making payment request
                // if success create order 
                //  window.location.href = response.data.url
                // cancle payment- contact page

                // const response = await createOrder(order)
                // toast({
                //     title: "Order Created Successfully",
                //     description: "Your order has been placed successfully.",
                // })
                // navigate(`/confirmedOrdered/${order.orderId}`)
            } catch (error) {
                console.log(error);

                toast({
                    title: "Error",
                    description: "Failed to create order. Please try again.",
                    variant: "destructive",
                })
            }
        }
    }

    const selectSavedAddress = (id) => {
        const selectedAddr = savedAddresses.find(addr => addr._id === id)
        if (selectedAddr) {
            setSelectedAddress(selectedAddr._id)
            populateAddressFields(selectedAddr)
        }
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="px-24 py-8">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>
            <Tabs value={`step-${step}`} className="w-full">
                <TabsList className="grid w-1/2 grid-cols-3">
                    <TabsTrigger value="step-1">Shipping</TabsTrigger>
                    <TabsTrigger value="step-2">Order Summary</TabsTrigger>
                    <TabsTrigger value="step-3">Payment</TabsTrigger>
                </TabsList>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 mt-8">
                    <TabsContent value="step-1">
                        <Card>
                            <CardHeader>
                                <CardTitle>Shipping Information</CardTitle>
                                <CardDescription>Enter your shipping details or select a saved address.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {savedAddresses.length > 0 && (
                                    <div className="space-y-2">
                                        <div>Saved Addresses</div>
                                        <RadioGroup
                                            onValueChange={(value) => selectSavedAddress(value)}
                                            value={selectedAddress}
                                        >
                                            {savedAddresses.map((address) => (
                                                <Radio key={address._id} value={address._id} description={address.streetName}>
                                                    {address.addressName}
                                                </Radio>
                                            ))}
                                        </RadioGroup>
                                    </div>
                                )}
                                <Input
                                    id="fullName"
                                    label="Full Name"
                                    placeholder="John Doe"
                                    {...register("fullName")}
                                    isInvalid={!!errors.fullName}
                                    errorMessage={errors.fullName?.message}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        id="email"
                                        type="email"
                                        label="Email"
                                        placeholder="john@example.com"
                                        {...register("email")}
                                        isInvalid={!!errors.email}
                                        errorMessage={errors.email?.message}
                                    />
                                    <Input
                                        id="phone"
                                        label="Phone"
                                        placeholder="+91 (555) 123-4567"
                                        {...register("phone")}
                                        isInvalid={!!errors.phone}
                                        errorMessage={errors.phone?.message}
                                    />
                                </div>
                                <Input
                                    id="address"
                                    label="Address"
                                    placeholder="123 Main St"
                                    {...register("address")}
                                    isInvalid={!!errors.address}
                                    errorMessage={errors.address?.message}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        id="city"
                                        label="City"
                                        placeholder="Mumbai"
                                        {...register("city")}
                                        isInvalid={!!errors.city}
                                        errorMessage={errors.city?.message}
                                    />
                                    <Input
                                        id="country"
                                        label="Country"
                                        placeholder="India"
                                        {...register("country")}
                                        isInvalid={!!errors.country}
                                        errorMessage={errors.country?.message}
                                    />
                                </div>
                                <Input
                                    id="postalCode"
                                    label="Postal Code"
                                    placeholder="10001"
                                    {...register("postalCode")}
                                    isInvalid={!!errors.postalCode}
                                    errorMessage={errors.postalCode?.message}
                                />
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" color="primary" variant="solid">Next</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    <TabsContent value="step-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                                <CardDescription>Review your order details.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {order && (
                                    <div className="space-y-4 w-3/5">
                                        <div>
                                            <h3 className="font-semibold">Customer Details</h3>
                                            <p>{order.customer.name}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">Shipping Address</h3>
                                            <p>{order.shippingAddress}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">Order Date</h3>
                                            <p>{order.date}</p>
                                        </div>
                                        <Table>
                                            <TableHeader>
                                                <TableColumn>Product</TableColumn>
                                                <TableColumn>Price</TableColumn>
                                                <TableColumn>Quantity</TableColumn>
                                                <TableColumn className="text-right">Subtotal</TableColumn>
                                            </TableHeader>
                                            <TableBody>
                                                {order.items.map((item) => (
                                                    <TableRow key={item._id}>
                                                        <TableCell>{item.name}</TableCell>
                                                        <TableCell>₹{item.price.toFixed(2)}</TableCell>
                                                        <TableCell>{item.quantity}</TableCell>
                                                        <TableCell className="text-right">₹{(item.price * item.quantity).toFixed(2)}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                        <div className="flex justify-between text-lg font-bold">
                                            <span>Total</span>
                                            <span>₹{order.total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter>
                                <Button type="button" variant="outline" className="mr-2" onClick={() => setStep(1)}>
                                    Back
                                </Button>
                                <Button type="submit" color="primary" variant="solid">Next</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    <TabsContent value="step-3">
                        <Card>
                            <CardHeader>
                                <CardTitle>Payment</CardTitle>
                                <CardDescription>Complete your order with PhonePe.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Click the button below to open the PhonePe payment gateway. </p>
                            </CardContent>
                            <CardFooter>
                                <Button type="button" variant="flat" className="mr-2" onClick={() => setStep(2)}>
                                    Back
                                </Button>
                                <Button type="submit" color="primary" variant="solid" isLoading={Paymenting} >Pay Now

                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </form>
            </Tabs>
        </div>
    )
}