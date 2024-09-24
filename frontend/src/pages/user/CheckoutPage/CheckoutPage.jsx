import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@nextui-org/button"
import { Input, Radio, RadioGroup, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"
import { useOrderSummary } from "@/hooks/reduxHooks"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import generateOrderId from "@/services/utils/generateOrderId"
import { createOrder } from "@/services/apis/order"
import { toast } from "@/hooks/use-toast"


const checkoutSchema = z.object({
    fullName: z.string().min(3, { message: "Full name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
    address: z.string().min(3, { message: "Address is required" }),
    city: z.string().min(1, { message: "City is required" }),
    country: z.string().min(2, { message: "Country is required" }),
    postalCode: z.string().min(5, { message: "Postal code must be at least 5 digits" }),
})

const savedAddresses = [
    { id: 1, name: "Home", address: "123 Main St", city: "Mumbai", country: "India", postalCode: "400001" },
    { id: 2, name: "Work", address: "456 Office Blvd", city: "Pune", country: "India", postalCode: "411001" },
]

export default function CheckoutPage() {
    const [step, setStep] = useState(1)
    const navigate = useNavigate()
    const { orderSummary } = useOrderSummary()
    const [selectedAddress, setSelectedAddress] = useState(savedAddresses[0].name)
    const [order, setOrder] = useState(null)
    const [orderId, setOrderId] = useState(null)

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            address: savedAddresses[0].address,
            city: savedAddresses[0].city,
            country: savedAddresses[0].country,
            postalCode: savedAddresses[0].postalCode,
        },
    })

    useEffect(() => {
        if (orderSummary.total === 0) {
            navigate('/cart')
        }
        const id = generateOrderId()
        setOrderId(id)
    }, [orderSummary.total, navigate])


    const onSubmit = async (data) => {
        console.log(order);

        if (step < 3) {
            setStep(step + 1)
            if (step === 1 || step == 2) {
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
            // Handle payment logic here
            console.log(order);
            // creating new order

            const responce = await createOrder(order);

            toast({
                title: "Order Created successfully",
                description: "Order created successfully",
            });



            navigate(`/confirmedOrdered/${order.orderId}`)
        }
    }

    const [address, setAddress] = useState()
    const [city, setCity] = useState()
    const [country, setCountry] = useState()
    const [postcode, setPostcode] = useState()

    const selectSavedAddress = (id) => {
        const selectedAddr = savedAddresses.find(addr => addr.name === id)
        if (selectedAddr) {
            setSelectedAddress(selectedAddr.id)

            setAddress(selectedAddr.address)
            setCity(selectedAddr.city)
            setCountry(selectedAddr.country)
            setPostcode(selectedAddr.postalCode)

        }
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
                                <div className="space-y-2">
                                    <div>Saved Addresses</div>
                                    <RadioGroup
                                        onValueChange={(value) => selectSavedAddress(value)}
                                        value={selectedAddress.name}
                                    >
                                        {savedAddresses.map((address) => (
                                            <Radio key={address.name} value={address.name} description={address.address}>
                                                {address.name}
                                            </Radio>
                                        ))}
                                    </RadioGroup>
                                </div>
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
                                    value={address}
                                    placeholder="123 Main St"
                                    {...register("address")}
                                    isInvalid={!!errors.address}
                                    errorMessage={errors.address?.message}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        id="city"
                                        label="City"
                                        value={city}
                                        placeholder="Mumbai"
                                        {...register("city")}
                                        isInvalid={!!errors.city}
                                        errorMessage={errors.city?.message}
                                    />
                                    <Input
                                        id="country"
                                        label="Country"
                                        value={country}
                                        placeholder="India"
                                        {...register("country")}
                                        isInvalid={!!errors.country}
                                        errorMessage={errors.country?.message}
                                    />
                                </div>
                                <Input
                                    id="postalCode"
                                    label="Postal Code"
                                    value={postcode}
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
                                            <p>{order.customerName}</p>
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
                                <CardDescription>Complete your order with Razorpay.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Click the button below to open the Razorpay payment gateway.</p>
                            </CardContent>
                            <CardFooter>
                                <Button type="button" variant="outline" className="mr-2" onClick={() => setStep(2)}>
                                    Back
                                </Button>
                                <Button type="submit" color="primary" variant="solid">Pay Now</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </form>
            </Tabs>
        </div>
    )
}