
import { useState, useEffect } from "react"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue, Button, Input, Image } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"
import { useCart, useOrderSummary } from "@/hooks/reduxHooks"
import { toast } from "@/hooks/use-toast"
import { getAllOffers } from "@/services/apis/offers"
import { getAllCoupons } from "@/services/apis/coupons"

export default function CartPage() {
    const [couponCode, setCouponCode] = useState("")
    const [appliedCoupon, setAppliedCoupon] = useState(null)
    const [offers, setOffers] = useState([])
    const [coupons, setCoupons] = useState([])
    const { cart, removeItem, updateItemQuantity } = useCart()
    const { setOrderSummary } = useOrderSummary()
    const navigate = useNavigate()

    useEffect(() => {
        fetchOffersAndCoupons()
    }, [])

    const fetchOffersAndCoupons = async () => {
        try {
            const [offersData, couponsData] = await Promise.all([
                getAllOffers(),
                getAllCoupons()
            ])
            setOffers(offersData)
            setCoupons(couponsData)
        } catch (error) {
            console.error("Error fetching offers and coupons:", error)
            toast({
                title: "Error",
                description: "Failed to fetch offers and coupons. Please try again.",
                variant: "destructive",
            })
        }
    }

    const handleQuantityChange = (itemId, newQuantity) => {
        const item = cart.items.find(item => item._id === itemId)
        if (!item) return

        if (newQuantity < 1) {
            toast({
                title: "Minimum quantity reached",
                description: "Quantity cannot be less than 1.",
                variant: "warning",
            })
            return
        }

        if (newQuantity > item.avlQuantity) {
            toast({
                title: "Maximum quantity reached",
                description: `Only ${item.avlQuantity} items available in stock.`,
                variant: "warning",
            })
            return
        }

        updateItemQuantity(itemId, newQuantity)
    }

    const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const tax = subtotal * 0.1 // Assuming 10% tax

    // Apply ongoing offer
    const ongoingOffer = offers.find(offer => new Date(offer.expiryDate) > new Date())
    const ongoingOfferDiscount = ongoingOffer
        ? ongoingOffer.type === "percentage"
            ? subtotal * (ongoingOffer.value / 100)
            : ongoingOffer.value
        : 0

    // Apply coupon discount
    const applyCoupon = () => {
        const coupon = coupons.find(c => c.code === couponCode && new Date(c.expiryDate) > new Date())
        if (coupon) {
            setAppliedCoupon(coupon)
            setCouponCode("")
            toast({
                title: "Coupon applied",
                description: `${coupon.code} coupon has been applied successfully.`,
                variant: "success",
            })
        } else {
            toast({
                title: "Invalid coupon",
                description: "The entered coupon code is invalid or expired.",
                variant: "error",
            })
        }
    }

    const couponDiscount = appliedCoupon
        ? appliedCoupon.type === "percentage"
            ? subtotal * (appliedCoupon.value / 100)
            : appliedCoupon.value
        : 0

    const total = subtotal + tax - ongoingOfferDiscount - couponDiscount

    const handleCheckout = () => {
        const orderSummary = {
            items: cart.items,
            subtotal: subtotal,
            tax: tax,
            ongoingOfferDiscount: ongoingOfferDiscount,
            couponDiscount: couponDiscount,
            total: total,
        }

        setOrderSummary(orderSummary)
        navigate('/checkout')
    }

    return (
        <div className="px-24 py-8 font-Montserrat">
            <h1 className="text-3xl font-bold mb-8">Your Cart ({cart.items.length})</h1>
            {cart.items.length === 0 ? (
                <p className="text-xl text-center">Your cart is empty.</p>
            ) : (
                <div className="grid gap-8 md:grid-cols-3">
                    <div className="md:col-span-2">
                        <Table>
                            <TableHeader>
                                <TableColumn className="w-[100px] uppercase">Product</TableColumn>
                                <TableColumn className="uppercase">Name</TableColumn>
                                <TableColumn className="uppercase">Quantity</TableColumn>
                                <TableColumn className="text-right uppercase">Price</TableColumn>
                                <TableColumn className="text-right uppercase">Total</TableColumn>
                                <TableColumn className="text-right uppercase">Action</TableColumn>
                            </TableHeader>
                            <TableBody>
                                {cart.items.map((item) => (
                                    <TableRow key={item._id}>
                                        <TableCell>
                                            <Image isBlurred src={item.imageURL} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                        </TableCell>
                                        <TableCell className="font-medium">{item.name}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center space-x-2">
                                                <Button
                                                    variant="flat"
                                                    size="icon"
                                                    color='primary'
                                                    onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </Button>
                                                <Input
                                                    type="number"
                                                    min="0"
                                                    value={item.quantity}
                                                    onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
                                                    className="w-16 text-center"
                                                />
                                                <Button
                                                    variant="flat"
                                                    color='primary'
                                                    size="icon"
                                                    onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">₹{item.price.toFixed(2)}</TableCell>
                                        <TableCell className="text-right">₹{(item.price * item.quantity).toFixed(2)}</TableCell>
                                        <TableCell>
                                            <Button variant="light" size="icon" onClick={() => removeItem(item._id)}>
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
                                    <span>₹{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax</span>
                                    <span>₹{tax.toFixed(2)}</span>
                                </div>
                                {ongoingOfferDiscount > 0 && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Ongoing Offer ({ongoingOffer.description})</span>
                                        <span>-₹{ongoingOfferDiscount.toFixed(2)}</span>
                                    </div>
                                )}
                                {appliedCoupon && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Coupon Discount ({appliedCoupon.code})</span>
                                        <span>-₹{couponDiscount.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="border-t pt-2 mt-2">
                                    <div className="flex justify-between font-semibold">
                                        <span>Total</span>
                                        <span>₹{total.toFixed(2)}</span>
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
                            <Button onPress={handleCheckout} variant="shadow" color="primary" className="w-full mt-6">
                                Proceed to Checkout
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}