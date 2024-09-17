import { useState } from "react"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue, Button, Input } from "@nextui-org/react";


// Mock data for cart items
const initialCartItems = [
    { id: 1, name: "Wireless Earbuds", price: 79.99, quantity: 1, image: "https://g-l--q8r-vryke.vusercontent.net/placeholder.svg" },
    { id: 2, name: "Smart Watch", price: 199.99, quantity: 1, image: "https://g-l--q8r-vryke.vusercontent.net/placeholder.svg" },
    { id: 3, name: "Portable Charger", price: 49.99, quantity: 2, image: "https://g-l--q8r-vryke.vusercontent.net/placeholder.svg" },
]

export default function CartPage() {
    const [cartItems, setCartItems] = useState(initialCartItems)

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity >= 0) {
            setCartItems(
                cartItems.map((item) =>
                    item.id === id ? { ...item, quantity: newQuantity } : item
                )
            )
        }
    }

    const removeItem = (id) => {
        setCartItems(cartItems.filter((item) => item.id !== id))
    }

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const tax = subtotal * 0.1 // Assuming 10% tax
    const total = subtotal + tax

    return (
        <div className="px-24 py-8 font-Montserrat">
            <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
            {cartItems.length === 0 ? (
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
                                {cartItems.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                        </TableCell>
                                        <TableCell className="font-medium">{item.name}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center space-x-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </Button>
                                                <Input
                                                    type="number"
                                                    min="0"
                                                    value={item.quantity}
                                                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                                    className="w-16 text-center"
                                                />
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
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
                                <div className="border-t pt-2 mt-2">
                                    <div className="flex justify-between font-semibold">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                            <Button variant="shadow" color="primary" className="w-full mt-6">Proceed to Checkout</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}