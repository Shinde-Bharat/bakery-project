
import { useState } from "react"

import { Label } from "@/components/ui/label"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
// import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Percent, Tag, Image, Pencil, Trash2, Plus } from "lucide-react"
import { Button, Input, Textarea } from "@nextui-org/react"

// Mock data for discounts and offers
const initialDiscounts = [
    { id: 1, code: "SUMMER20", type: "Percentage", value: 20, expiryDate: "2023-08-31" },
    { id: 2, code: "FREESHIP", type: "Fixed Amount", value: 10, expiryDate: "2023-07-15" },
    { id: 3, code: "WELCOME10", type: "Percentage", value: 10, expiryDate: "2023-12-31" },
]

const initialOffers = [
    { id: 1, title: "Summer Sale", description: "Get up to 50% off on summer collection", image: "/placeholder.svg", type: "Percentage", value: 50, expiryDate: "2023-08-31" },
    { id: 2, title: "Back to School", description: "Special discounts on school supplies", image: "/placeholder.svg", type: "Fixed Amount", value: 20, expiryDate: "2023-09-15" },
]

export default function DiscountCouponsMgt() {
    const [discounts, setDiscounts] = useState(initialDiscounts)
    const [offers, setOffers] = useState(initialOffers)
    const [newDiscount, setNewDiscount] = useState({ code: "", type: "", value: "", expiryDate: "" })
    const [newOffer, setNewOffer] = useState({ title: "", description: "", image: "", type: "", value: "", expiryDate: "" })
    const [editingDiscount, setEditingDiscount] = useState(null)
    const [editingOffer, setEditingOffer] = useState(null)

    const handleAddDiscount = () => {
        const discountToAdd = {
            ...newDiscount,
            id: discounts.length + 1,
            value: parseFloat(newDiscount.value),
        }
        setDiscounts([...discounts, discountToAdd])
        setNewDiscount({ code: "", type: "", value: "", expiryDate: "" })
    }

    const handleEditDiscount = () => {
        setDiscounts(discounts.map(discount =>
            discount.id === editingDiscount.id ? editingDiscount : discount
        ))
        setEditingDiscount(null)
    }

    const handleDeleteDiscount = (id) => {
        setDiscounts(discounts.filter(discount => discount.id !== id))
    }

    const handleAddOffer = () => {
        const offerToAdd = {
            ...newOffer,
            id: offers.length + 1,
            value: parseFloat(newOffer.value),
        }
        setOffers([...offers, offerToAdd])
        setNewOffer({ title: "", description: "", image: "", type: "", value: "", expiryDate: "" })
    }

    const handleEditOffer = () => {
        setOffers(offers.map(offer =>
            offer.id === editingOffer.id ? editingOffer : offer
        ))
        setEditingOffer(null)
    }

    const handleDeleteOffer = (id) => {
        setOffers(offers.filter(offer => offer.id !== id))
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Discounts and Coupons Management</h1>

            <Tabs defaultValue="discounts" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="discounts">Discount Codes</TabsTrigger>
                    <TabsTrigger value="offers">Promotional Offers</TabsTrigger>
                </TabsList>

                <TabsContent value="discounts">
                    <Card>
                        <CardHeader>
                            <CardTitle>Manage Discount Codes</CardTitle>
                            <CardDescription>Create and manage discount codes for your store</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-4">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button>
                                            <Plus className="mr-2 h-4 w-4" /> Add New Discount
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Add New Discount</DialogTitle>
                                            <DialogDescription>
                                                Create a new discount code for your customers.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="code" className="text-right">
                                                    Code
                                                </Label>
                                                <Input
                                                    id="code"
                                                    value={newDiscount.code}
                                                    onChange={(e) => setNewDiscount({ ...newDiscount, code: e.target.value })}
                                                    className="col-span-3"
                                                />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="type" className="text-right">
                                                    Type
                                                </Label>
                                                <Select
                                                    value={newDiscount.type}
                                                    onValueChange={(value) => setNewDiscount({ ...newDiscount, type: value })}
                                                >
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Select type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Percentage">Percentage</SelectItem>
                                                        <SelectItem value="Fixed Amount">Fixed Amount</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="value" className="text-right">
                                                    Value
                                                </Label>
                                                <Input
                                                    id="value"
                                                    type="number"
                                                    value={newDiscount.value}
                                                    onChange={(e) => setNewDiscount({ ...newDiscount, value: e.target.value })}
                                                    className="col-span-3"
                                                />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="expiryDate" className="text-right">
                                                    Expiry Date
                                                </Label>
                                                <Input
                                                    id="expiryDate"
                                                    type="date"
                                                    value={newDiscount.expiryDate}
                                                    onChange={(e) => setNewDiscount({ ...newDiscount, expiryDate: e.target.value })}
                                                    className="col-span-3"
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button type="submit" onClick={handleAddDiscount}>Add Discount</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Code</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Value</TableHead>
                                        <TableHead>Expiry Date</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {discounts.map((discount) => (
                                        <TableRow key={discount.id}>
                                            <TableCell>{discount.code}</TableCell>
                                            <TableCell>{discount.type}</TableCell>
                                            <TableCell>{discount.type === "Percentage" ? `${discount.value}%` : `$${discount.value}`}</TableCell>
                                            <TableCell>{discount.expiryDate}</TableCell>
                                            <TableCell>
                                                <div className="flex space-x-2">
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button variant="outline" onClick={() => setEditingDiscount(discount)}>
                                                                <Pencil className="mr-2 h-4 w-4" /> Edit
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="sm:max-w-[425px]">
                                                            <DialogHeader>
                                                                <DialogTitle>Edit Discount</DialogTitle>
                                                                <DialogDescription>
                                                                    Make changes to the discount code.
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <div className="grid gap-4 py-4">
                                                                <div className="grid grid-cols-4 items-center gap-4">
                                                                    <Label htmlFor="edit-code" className="text-right">
                                                                        Code
                                                                    </Label>
                                                                    <Input
                                                                        id="edit-code"
                                                                        value={editingDiscount?.code || ""}
                                                                        onChange={(e) => setEditingDiscount({ ...editingDiscount, code: e.target.value })}
                                                                        className="col-span-3"
                                                                    />
                                                                </div>
                                                                <div className="grid grid-cols-4 items-center gap-4">
                                                                    <Label htmlFor="edit-type" className="text-right">
                                                                        Type
                                                                    </Label>
                                                                    <Select
                                                                        value={editingDiscount?.type || ""}
                                                                        onValueChange={(value) => setEditingDiscount({ ...editingDiscount, type: value })}
                                                                    >
                                                                        <SelectTrigger className="w-[180px]">
                                                                            <SelectValue placeholder="Select type" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectItem value="Percentage">Percentage</SelectItem>
                                                                            <SelectItem value="Fixed Amount">Fixed Amount</SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                </div>
                                                                <div className="grid grid-cols-4 items-center gap-4">
                                                                    <Label htmlFor="edit-value" className="text-right">
                                                                        Value
                                                                    </Label>
                                                                    <Input
                                                                        id="edit-value"
                                                                        type="number"
                                                                        value={editingDiscount?.value || ""}
                                                                        onChange={(e) => setEditingDiscount({ ...editingDiscount, value: parseFloat(e.target.value) })}
                                                                        className="col-span-3"
                                                                    />
                                                                </div>
                                                                <div className="grid grid-cols-4 items-center gap-4">
                                                                    <Label htmlFor="edit-expiryDate" className="text-right">
                                                                        Expiry Date
                                                                    </Label>
                                                                    <Input
                                                                        id="edit-expiryDate"
                                                                        type="date"
                                                                        value={editingDiscount?.expiryDate || ""}
                                                                        onChange={(e) => setEditingDiscount({ ...editingDiscount, expiryDate: e.target.value })}
                                                                        className="col-span-3"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <DialogFooter>
                                                                <Button type="submit" onClick={handleEditDiscount}>Save Changes</Button>
                                                            </DialogFooter>
                                                        </DialogContent>
                                                    </Dialog>
                                                    <Button variant="destructive" onClick={() => handleDeleteDiscount(discount.id)}>
                                                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="offers">
                    <Card>
                        <CardHeader>
                            <CardTitle>Manage Promotional Offers</CardTitle>
                            <CardDescription>Create and manage promotional offers with images</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-4">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button>
                                            <Plus className="mr-2 h-4 w-4" /> Add New Offer
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Add New Promotional Offer</DialogTitle>
                                            <DialogDescription>
                                                Create a new promotional offer with an image.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="title" className="text-right">
                                                    Title
                                                </Label>
                                                <Input
                                                    id="title"
                                                    value={newOffer.title}
                                                    onChange={(e) => setNewOffer({ ...newOffer, title: e.target.value })}
                                                    className="col-span-3"
                                                />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="description" className="text-right">
                                                    Description
                                                </Label>
                                                <Textarea
                                                    id="description"
                                                    value={newOffer.description}
                                                    onChange={(e) => setNewOffer({ ...newOffer, description: e.target.value })}
                                                    className="col-span-3"
                                                />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="image" className="text-right">
                                                    Image URL
                                                </Label>
                                                <Input
                                                    id="image"
                                                    value={newOffer.image}
                                                    onChange={(e) => setNewOffer({ ...newOffer, image: e.target.value })}
                                                    className="col-span-3"
                                                />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="offer-type" className="text-right">
                                                    Type
                                                </Label>
                                                <Select
                                                    value={newOffer.type}
                                                    onValueChange={(value) => setNewOffer({ ...newOffer, type: value })}
                                                >
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Select type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Percentage">Percentage</SelectItem>
                                                        <SelectItem value="Fixed Amount">Fixed Amount</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="offer-value" className="text-right">
                                                    Value
                                                </Label>
                                                <Input
                                                    id="offer-value"
                                                    type="number"
                                                    value={newOffer.value}
                                                    onChange={(e) => setNewOffer({ ...newOffer, value: e.target.value })}
                                                    className="col-span-3"
                                                />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="expiryDate" className="text-right">
                                                    Expiry Date
                                                </Label>
                                                <Input
                                                    id="expiryDate"
                                                    type="date"
                                                    value={newOffer.expiryDate}
                                                    onChange={(e) => setNewOffer({ ...newOffer, expiryDate: e.target.value })}
                                                    className="col-span-3"
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button type="submit" onClick={handleAddOffer}>Add Offer</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {offers.map((offer) => (
                                    <Card key={offer.id}>
                                        <CardHeader>
                                            <CardTitle>{offer.title}</CardTitle>
                                            <CardDescription>{offer.description}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <img src={offer.image} alt={offer.title} className="w-full h-48 object-cover rounded-md mb-2" />
                                            <p className="font-semibold">
                                                Discount: {offer.type === "Percentage" ? `${offer.value}%` : `$${offer.value}`}
                                            </p>
                                            <p>Type: {offer.type}</p>
                                            <p>Expires: {offer.expiryDate}</p>
                                        </CardContent>
                                        <CardFooter className="flex justify-between">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="outline" onClick={() => setEditingOffer(offer)}>
                                                        <Pencil className="mr-2 h-4 w-4" /> Edit
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[425px]">
                                                    <DialogHeader>
                                                        <DialogTitle>Edit Promotional Offer</DialogTitle>
                                                        <DialogDescription>
                                                            Make changes to the promotional offer.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="grid gap-4 py-4">
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label htmlFor="edit-title" className="text-right">
                                                                Title
                                                            </Label>
                                                            <Input
                                                                id="edit-title"
                                                                value={editingOffer?.title || ""}
                                                                onChange={(e) => setEditingOffer({ ...editingOffer, title: e.target.value })}
                                                                className="col-span-3"
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label htmlFor="edit-description" className="text-right">
                                                                Description
                                                            </Label>
                                                            <Textarea
                                                                id="edit-description"
                                                                value={editingOffer?.description || ""}
                                                                onChange={(e) => setEditingOffer({ ...editingOffer, description: e.target.value })}
                                                                className="col-span-3"
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label htmlFor="edit-image" className="text-right">
                                                                Image URL
                                                            </Label>
                                                            <Input
                                                                id="edit-image"
                                                                value={editingOffer?.image || ""}
                                                                onChange={(e) => setEditingOffer({ ...editingOffer, image: e.target.value })}
                                                                className="col-span-3"
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label htmlFor="edit-offer-type" className="text-right">
                                                                Type
                                                            </Label>
                                                            <Select
                                                                value={editingOffer?.type || ""}
                                                                onValueChange={(value) => setEditingOffer({ ...editingOffer, type: value })}
                                                            >
                                                                <SelectTrigger className="w-[180px]">
                                                                    <SelectValue placeholder="Select type" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="Percentage">Percentage</SelectItem>
                                                                    <SelectItem value="Fixed Amount">Fixed Amount</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label htmlFor="edit-offer-value" className="text-right">
                                                                Value
                                                            </Label>
                                                            <Input
                                                                id="edit-offer-value"
                                                                type="number"
                                                                value={editingOffer?.value || ""}
                                                                onChange={(e) => setEditingOffer({ ...editingOffer, value: parseFloat(e.target.value) })}
                                                                className="col-span-3"
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label htmlFor="edit-expiryDate" className="text-right">
                                                                Expiry Date
                                                            </Label>
                                                            <Input
                                                                id="edit-expiryDate"
                                                                type="date"
                                                                value={editingOffer?.expiryDate || ""}
                                                                onChange={(e) => setEditingOffer({ ...editingOffer, expiryDate: e.target.value })}
                                                                className="col-span-3"
                                                            />
                                                        </div>
                                                    </div>
                                                    <DialogFooter>
                                                        <Button type="submit" onClick={handleEditOffer}>Save Changes</Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                            <Button variant="destructive" onClick={() => handleDeleteOffer(offer.id)}>
                                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}