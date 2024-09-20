import { useState } from "react"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue, Button, Input } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/reduxHooks";


// Mock data for cart items
const initialCartItems = [
    { id: 1, name: "Wireless Earbuds", price: 79.99, quantity: 1, image: "https://g-l--q8r-vryke.vusercontent.net/placeholder.svg" },
    { id: 2, name: "Smart Watch", price: 199.99, quantity: 1, image: "https://g-l--q8r-vryke.vusercontent.net/placeholder.svg" },
    { id: 3, name: "Portable Charger", price: 49.99, quantity: 2, image: "https://g-l--q8r-vryke.vusercontent.net/placeholder.svg" },
]

const ongoingOffer = {
    type: "percentage",
    value: 10,
    description: "10% off on all items"
}

const validCoupons = [
    { code: "SAVE20", type: "percentage", value: 20 },
    { code: "FLAT10OFF", type: "flat", value: 10 },
]

export default function CartPage() {
    const [couponCode, setCouponCode] = useState("")
    const [appliedCoupon, setAppliedCoupon] = useState(null)
    const [cartItems, setCartItems] = useState(initialCartItems)
    const { cart, removeItem, updateItemQuantity } = useCart()
    console.log(cart);

    const navigate = useNavigate()

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity >= 0) {
            setCartItems(
                cartItems.map((item) =>
                    item.id === id ? { ...item, quantity: newQuantity } : item
                )
            )
        }
    }



    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const tax = subtotal * 0.1 // Assuming 10% tax

    // Apply ongoing offer
    const ongoingOfferDiscount = ongoingOffer.type === "percentage"
        ? subtotal * (ongoingOffer.value / 100)
        : ongoingOffer.value

    // Apply coupon discount
    const applyCoupon = () => {
        const coupon = validCoupons.find(c => c.code === couponCode)
        if (coupon) {
            setAppliedCoupon(coupon)
            setCouponCode("")
        } else {
            alert("Invalid coupon code")
        }
    }

    const couponDiscount = appliedCoupon
        ? appliedCoupon.type === "percentage"
            ? subtotal * (appliedCoupon.value / 100)
            : appliedCoupon.value
        : 0

    const total = subtotal + tax - ongoingOfferDiscount - couponDiscount

    return (
        <div className="px-24 py-8 font-Montserrat">
            <h1 className="text-3xl font-bold mb-8">Your Cart {cart.items.length}</h1>
            {cart.items.length === 0 ? (
                <p className="text-xl text-center">Your cart is empty.</p>
            ) : (
                <div className="grid gap-8 md:grid-cols-3">
                    <div className="md:col-span-2">
                        <Table>
                            <TableHeader>
                                <TableColumn className="w-[100px] uppercase">Product</TableColumn>
                                <TableColumn className=" uppercase">Name</TableColumn>
                                <TableColumn className=" uppercase">Quantity</TableColumn>
                                <TableColumn className="text-right uppercase">Price</TableColumn>
                                <TableColumn className="text-right uppercase">Total</TableColumn>
                                <TableColumn className="text-right uppercase">Action</TableColumn>
                            </TableHeader>
                            <TableBody>
                                {cart.items.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                        </TableCell>
                                        <TableCell className="font-medium">{item.name}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center space-x-2">
                                                <Button
                                                    variant="flat"
                                                    size="icon"
                                                    color='primary'
                                                    onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </Button>
                                                <Input
                                                    type="number"
                                                    min="0"
                                                    value={item.quantity}
                                                    onChange={(e) => updateItemQuantity(item.id, parseInt(e.target.value))}
                                                    className="w-16 text-center"
                                                />
                                                <Button
                                                    variant="flat"
                                                    color='primary'
                                                    size="icon"
                                                    onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                                        <TableCell className="text-right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                                        <TableCell>
                                            <Button variant="light" size="icon" onClick={() => removeItem(item.id)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div>
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                                {ongoingOfferDiscount > 0 && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Ongoing Offer ({ongoingOffer.description})</span>
                                        <span>-${ongoingOfferDiscount.toFixed(2)}</span>
                                    </div>
                                )}
                                {appliedCoupon && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Coupon Discount ({appliedCoupon.code})</span>
                                        <span>-${couponDiscount.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="border-t pt-2 mt-2">
                                    <div className="flex justify-between font-semibold">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <Input
                                    placeholder="Enter coupon code"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                    className="mb-2"
                                />
                                <Button onClick={applyCoupon} variant="flat" color="secondary" className="w-full">
                                    Apply Coupon
                                </Button>
                            </div>
                            <Button onPress={() => navigate('/checkout')} variant="shadow" color="primary" className="w-full mt-6">
                                Proceed to Checkout
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}