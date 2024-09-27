

import { useState, useEffect } from "react"
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
import { Percent, Tag, Image, Pencil, Trash2, Plus } from "lucide-react"
import { Button } from "@nextui-org/button"
import { Input, Textarea } from "@nextui-org/react"
import { createCoupon, getAllCoupons, updateCoupon, deleteCoupon } from "@/services/apis/coupons"
import { createOffer, getAllOffers, updateOffer, deleteOffer } from "@/services/apis/offers"

export default function DiscountCouponsMgt() {
    const [coupons, setCoupons] = useState([])
    const [offers, setOffers] = useState([])
    const [newCoupon, setNewCoupon] = useState({ code: "", type: "percentage", value: "", expiryDate: "" })
    const [newOffer, setNewOffer] = useState({ title: "", description: "", imgURL: null, type: "percentage", value: "", expiryDate: "" })
    const [editingCoupon, setEditingCoupon] = useState(null)
    const [editingOffer, setEditingOffer] = useState(null)

    useEffect(() => {
        fetchCoupons()
        fetchOffers()
    }, [])

    const fetchCoupons = async () => {
        try {
            const fetchedCoupons = await getAllCoupons()
            setCoupons(fetchedCoupons)
        } catch (error) {
            console.error("Error fetching coupons:", error)
        }
    }

    const fetchOffers = async () => {
        try {
            const fetchedOffers = await getAllOffers()
            setOffers(fetchedOffers)
        } catch (error) {
            console.error("Error fetching offers:", error)
        }
    }

    const handleAddCoupon = async () => {
        try {
            await createCoupon(newCoupon)
            fetchCoupons()
            setNewCoupon({ code: "", type: "percentage", value: "", expiryDate: "" })
        } catch (error) {
            console.error("Error adding coupon:", error)
        }
    }

    const handleEditCoupon = async () => {
        try {
            await updateCoupon(editingCoupon._id, editingCoupon)
            fetchCoupons()
            setEditingCoupon(null)
        } catch (error) {
            console.error("Error editing coupon:", error)
        }
    }

    const handleDeleteCoupon = async (id) => {
        try {
            await deleteCoupon(id)
            fetchCoupons()
        } catch (error) {
            console.error("Error deleting coupon:", error)
        }
    }

    // for file upload
    const handleFileChange = (e, setter) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setter(prevState => ({ ...prevState, imgURL: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddOffer = async () => {
        try {
            await createOffer(newOffer)
            fetchOffers()
            setNewOffer({ title: "", description: "", imgURL: null, type: "percentage", value: "", expiryDate: "" })
        } catch (error) {
            console.error("Error adding offer:", error)
        }
    }

    const handleEditOffer = async () => {
        try {
            await updateOffer(editingOffer._id, editingOffer)
            fetchOffers()
            setEditingOffer(null)
        } catch (error) {
            console.error("Error editing offer:", error)
        }
    }

    const handleDeleteOffer = async (id) => {
        try {
            await deleteOffer(id)
            fetchOffers()
        } catch (error) {
            console.error("Error deleting offer:", error)
        }
    }


    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Offers and Coupons Management</h1>

            <Tabs defaultValue="coupons" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="coupons">Coupons Codes</TabsTrigger>
                    <TabsTrigger value="offers">Promotional Offers</TabsTrigger>
                </TabsList>

                <TabsContent value="coupons">
                    <Card>
                        <CardHeader>
                            <CardTitle>Manage Coupons Codes</CardTitle>
                            <CardDescription>Create and manage Coupons codes for your store</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-4">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button>
                                            <Plus className="mr-2 h-4 w-4" /> Add New Coupons code
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Add New Coupons code</DialogTitle>
                                            <DialogDescription>
                                                Create a new Coupons code for your customers.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="code" className="text-right">
                                                    Code
                                                </Label>
                                                <Input
                                                    id="code"
                                                    value={newCoupon.code}
                                                    onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
                                                    className="col-span-3"
                                                />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="type" className="text-right">
                                                    Type
                                                </Label>
                                                <Select
                                                    value={newCoupon.type}
                                                    onValueChange={(value) => setNewCoupon({ ...newCoupon, type: value })}
                                                >
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Select type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="percentage">Percentage</SelectItem>
                                                        <SelectItem value="flat">Flat</SelectItem>
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
                                                    value={newCoupon.value}
                                                    onChange={(e) => setNewCoupon({ ...newCoupon, value: parseFloat(e.target.value) })}
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
                                                    value={newCoupon.expiryDate}
                                                    onChange={(e) => setNewCoupon({ ...newCoupon, expiryDate: e.target.value })}
                                                    className="col-span-3"
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button type="submit" onClick={handleAddCoupon}>Add Discount</Button>
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
                                    {coupons.map((coupon) => (
                                        <TableRow key={coupon._id}>
                                            <TableCell>{coupon.code}</TableCell>
                                            <TableCell>{coupon.type}</TableCell>
                                            <TableCell>{coupon.type === "percentage" ? `${coupon.value}%` : `₹${coupon.value}`}</TableCell>
                                            <TableCell>{new Date(coupon.expiryDate).toLocaleDateString()}</TableCell>
                                            <TableCell>
                                                <div className="flex space-x-2">
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button variant="outline" onClick={() => setEditingCoupon(coupon)}>
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
                                                                        value={editingCoupon?.code || ""}
                                                                        onChange={(e) => setEditingCoupon({ ...editingCoupon, code: e.target.value })}
                                                                        className="col-span-3"
                                                                    />
                                                                </div>
                                                                <div className="grid grid-cols-4 items-center gap-4">
                                                                    <Label htmlFor="edit-type" className="text-right">
                                                                        Type
                                                                    </Label>
                                                                    <Select
                                                                        value={editingCoupon?.type || ""}
                                                                        onValueChange={(value) => setEditingCoupon({ ...editingCoupon, type: value })}
                                                                    >
                                                                        <SelectTrigger className="w-[180px]">
                                                                            <SelectValue placeholder="Select type" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectItem value="percentage">Percentage</SelectItem>
                                                                            <SelectItem value="flat">Flat</SelectItem>
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
                                                                        value={editingCoupon?.value || ""}
                                                                        onChange={(e) => setEditingCoupon({ ...editingCoupon, value: parseFloat(e.target.value) })}
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
                                                                        value={editingCoupon?.expiryDate ? new Date(editingCoupon.expiryDate).toISOString().split('T')[0] : ""}
                                                                        onChange={(e) => setEditingCoupon({ ...editingCoupon, expiryDate: e.target.value })}
                                                                        className="col-span-3"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <DialogFooter>
                                                                <Button type="submit" onClick={handleEditCoupon}>Save Changes</Button>
                                                            </DialogFooter>
                                                        </DialogContent>
                                                    </Dialog>
                                                    <Button variant="destructive" onClick={() => handleDeleteCoupon(coupon._id)}>
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
                                            <div className="grid gri d-cols-4 items-center gap-4">
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
                                                <Label htmlFor="imgURL" className="text-right">
                                                    Image URL
                                                </Label>
                                                <Input
                                                    type="file"
                                                    className="col-span-3" onChange={(e) => handleFileChange(e, setNewOffer)}
                                                />
                                                {/* <Input
                                                    id="imgURL"
                                                    value={newOffer.imgURL}
                                                    onChange={(e) => setNewOffer({ ...newOffer, imgURL: e.target.value })}
                                                    className="col-span-3"
                                                /> */}
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
                                                        <SelectItem value="percentage">Percentage</SelectItem>
                                                        <SelectItem value="flat">Flat</SelectItem>
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
                                                    onChange={(e) => setNewOffer({ ...newOffer, value: parseFloat(e.target.value) })}
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
                                    <Card key={offer._id}>
                                        <CardHeader>
                                            <CardTitle>{offer.title}</CardTitle>
                                            <CardDescription>{offer.description}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <img src={offer.imgURL} alt={offer.title} className="w-full h-48 object-cover rounded-md mb-2" />
                                            <p className="font-semibold">
                                                Discount: {offer.type === "percentage" ? `${offer.value}%` : `₹${offer.value}`}
                                            </p>
                                            <p>Type: {offer.type}</p>
                                            <p>Expires: {new Date(offer.expiryDate).toLocaleDateString()}</p>
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
                                                            <Label htmlFor="edit-imgURL" className="text-right">
                                                                Image URL
                                                            </Label>
                                                            <Input
                                                                id="edit-imgURL"
                                                                value={editingOffer?.imgURL || ""}
                                                                onChange={(e) => setEditingOffer({ ...editingOffer, imgURL: e.target.value })}
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
                                                                    <SelectItem value="percentage">Percentage</SelectItem>
                                                                    <SelectItem value="flat">Flat</SelectItem>
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
                                                                value={editingOffer?.expiryDate ? new Date(editingOffer.expiryDate).toISOString().split('T')[0] : ""}
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
                                            <Button variant="destructive" onClick={() => handleDeleteOffer(offer._id)}>
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