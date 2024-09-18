
import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@nextui-org/button"
import { Input, Radio, RadioGroup } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"

const savedAddresses = [
    { id: 1, name: "Home", address: "123 Main St, City, Country" },
    { id: 2, name: "Work", address: "456 Office Blvd, City, Country" },
]



export default function CheckoutPage() {
    const [step, setStep] = useState(1)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        country: "",
        postalCode: "",

    })
    const [selectedAddress, setSelectedAddress] = useState(null)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }



    const selectSavedAddress = (id) => {
        setSelectedAddress(id)
        const address = savedAddresses.find((addr) => addr.id === id)
        if (address) {
            setFormData(prev => ({ ...prev, address: address.address }))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (step < 2) {
            setStep(step + 1)
        } else {
            // Mock Razorpay integration
            const options = {
                key: "YOUR_RAZORPAY_KEY",
                amount: 50000,
                currency: "INR",
                name: "Your Company Name",
                description: "Purchase Description",
                handler: function (response) {
                    alert("Payment successful. Payment ID: " + response.razorpay_payment_id)
                },
                prefill: {
                    name: formData.fullName,
                    email: formData.email,
                    contact: formData.phone,
                },
                notes: {
                    address: formData.address,
                },
                theme: {
                    color: "#3399cc",
                },
            }
            const rzp = new (window).Razorpay(options)
            rzp.open()
        }
    }

    return (
        <div className="px-24 py-8">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>
            <Tabs value={`step-${step}`} className="w-full">
                <TabsList className="grid w-1/2 grid-cols-2">
                    <TabsTrigger value="step-1">Shipping</TabsTrigger>
                    <TabsTrigger value="step-2">Payment</TabsTrigger>
                </TabsList>
                <form onSubmit={handleSubmit} className="space-y-8 mt-8">
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
                                        onValueChange={(value) => selectSavedAddress(Number(value))}
                                        value={selectedAddress?.toString()}
                                    >
                                        {savedAddresses.map((address) => (
                                            <div key={address.id} className="flex items-center space-x-2">
                                                <Radio value={address.id.toString()} id={`address-${address.id} `} description={address.address} >{address.name}</Radio>

                                            </div>
                                        ))}
                                    </RadioGroup>
                                </div>
                                <div>

                                    <Input
                                        variant="flat"
                                        id="fullName"
                                        name="fullName"
                                        key={"fullName"}
                                        placeholder="John Doe"
                                        label="Full Name"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Input
                                            id="email"
                                            variant="flat"
                                            name="email"
                                            type="email"
                                            label="Email"

                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            id="phone"
                                            variant="flat"
                                            name="phone"
                                            label="Phone"

                                            placeholder="+1 (555) 123-4567"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Input
                                        id="address"
                                        variant="flat"
                                        name="address"
                                        label="Address"

                                        placeholder="123 Main St"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Input
                                            variant="flat"
                                            id="city"
                                            name="city"
                                            label="City"

                                            placeholder="New York"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            variant="flat"
                                            id="country"
                                            name="country"
                                            label="Country"

                                            placeholder="United States"
                                            value={formData.country}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Input
                                        id="postalCode"
                                        variant="flat"
                                        name="postalCode"
                                        label="Postal Code"

                                        placeholder="10001"
                                        value={formData.postalCode}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" color="primary" variant="solid">Next</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    <TabsContent value="step-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Payment</CardTitle>
                                <CardDescription>Complete your order with Razorpay.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Click the button below to open the Razorpay payment gateway.</p>
                            </CardContent>
                            <CardFooter>
                                <Button type="button" variant="outline" className="mr-2" onClick={() => setStep(1)}>
                                    Back
                                </Button>
                                <Button onPress={() => navigate('/confirmedOrdered')} type="submit" color="primary" variant="solid">Pay Now</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </form>
            </Tabs>
        </div>
    )
}