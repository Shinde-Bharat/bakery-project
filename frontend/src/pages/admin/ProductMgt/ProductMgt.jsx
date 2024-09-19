"use client"

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
import { Search, Plus, Pencil, Trash2 } from "lucide-react"
import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/react"

// Mock data for products and categories
const initialProducts = [
    { id: 1, name: "Wireless Earbuds", category: "Electronics", price: 79.99, quantity: 50, image: "https://g-kfbf-n0ebyl.vusercontent.net/placeholder.svg" },
    { id: 2, name: "Smart Watch", category: "Electronics", price: 199.99, quantity: 30, image: "https://g-kfbf-n0ebyl.vusercontent.net/placeholder.svg" },
    { id: 3, name: "Running Shoes", category: "Sports", price: 89.99, quantity: 100, image: "https://g-kfbf-n0ebyl.vusercontent.net/placeholder.svg" },
    { id: 4, name: "Coffee Maker", category: "Home", price: 59.99, quantity: 20, image: "https://g-kfbf-n0ebyl.vusercontent.net/placeholder.svg" },
    { id: 5, name: "Backpack", category: "Fashion", price: 49.99, quantity: 75, image: "https://g-kfbf-n0ebyl.vusercontent.net/placeholder.svg" },
]

const initialCategories = ["Electronics", "Sports", "Home", "Fashion"]

export default function ProductMgt() {
    const [products, setProducts] = useState(initialProducts)
    const [categories, setCategories] = useState(initialCategories)
    const [searchTerm, setSearchTerm] = useState("")
    const [categoryFilter, setCategoryFilter] = useState("All")
    const [editingProduct, setEditingProduct] = useState(null)
    const [newProduct, setNewProduct] = useState({
        name: "",
        category: "",
        price: "",
        quantity: "",
        image: "",
    })
    const [newCategory, setNewCategory] = useState("")

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = categoryFilter === "All" || product.category === categoryFilter
        return matchesSearch && matchesCategory
    })

    const handleAddProduct = () => {
        const productToAdd = {
            ...newProduct,
            id: products.length + 1,
            price: parseFloat(newProduct.price),
            quantity: parseInt(newProduct.quantity),
        }
        setProducts([...products, productToAdd])
        setNewProduct({ name: "", category: "", price: "", quantity: "", image: "" })
    }

    const handleEditProduct = () => {
        setProducts(products.map(product =>
            product.id === editingProduct.id ? editingProduct : product
        ))
        setEditingProduct(null)
    }

    const handleDeleteProduct = (id) => {
        setProducts(products.filter(product => product.id !== id))
    }

    const handleAddCategory = () => {
        if (newCategory && !categories.includes(newCategory)) {
            setCategories([...categories, newCategory])
            setNewCategory("")
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Product Management</h1>

            <Tabs defaultValue="products" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="products">Products</TabsTrigger>
                    <TabsTrigger value="categories">Categories</TabsTrigger>
                </TabsList>

                <TabsContent value="products">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center space-x-2">
                            <Search className="text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-64"
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Filter by category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All">All Categories</SelectItem>
                                    {categories.map((category) => (
                                        <SelectItem key={category} value={category}>{category}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button>
                                        <Plus className="mr-2 h-4 w-4" /> Add Product
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Add New Product</DialogTitle>
                                        <DialogDescription>
                                            Enter the details of the new product.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="name" className="text-right">
                                                Name
                                            </Label>
                                            <Input
                                                id="name"
                                                value={newProduct.name}
                                                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                                className="col-span-3"
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="category" className="text-right">
                                                Category
                                            </Label>
                                            <Select
                                                value={newProduct.category}
                                                onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                                            >
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Select category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {categories.map((category) => (
                                                        <SelectItem key={category} value={category}>{category}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="price" className="text-right">
                                                Price
                                            </Label>
                                            <Input
                                                id="price"
                                                type="number"
                                                value={newProduct.price}
                                                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                                className="col-span-3"
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="quantity" className="text-right">
                                                Quantity
                                            </Label>
                                            <Input
                                                id="quantity"
                                                type="number"
                                                value={newProduct.quantity}
                                                onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                                                className="col-span-3"
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="image" className="text-right">
                                                Image URL
                                            </Label>
                                            <Input
                                                id="image"
                                                value={newProduct.image}
                                                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                                                className="col-span-3"
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit" onClick={handleAddProduct}>Add Product</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredProducts.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>
                                        <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                                    </TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell>${product.price.toFixed(2)}</TableCell>
                                    <TableCell>{product.quantity}</TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="outline" onClick={() => setEditingProduct(product)}>
                                                        <Pencil className="mr-2 h-4 w-4" /> Edit
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[425px]">
                                                    <DialogHeader>
                                                        <DialogTitle>Edit Product</DialogTitle>
                                                        <DialogDescription>
                                                            Make changes to the product details.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="grid gap-4 py-4">
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label htmlFor="edit-name" className="text-right">
                                                                Name
                                                            </Label>
                                                            <Input
                                                                id="edit-name"
                                                                value={editingProduct?.name || ""}
                                                                onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                                                className="col-span-3"
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label htmlFor="edit-category" className="text-right">
                                                                Category
                                                            </Label>
                                                            <Select
                                                                value={editingProduct?.category || ""}
                                                                onValueChange={(value) => setEditingProduct({ ...editingProduct, category: value })}
                                                            >
                                                                <SelectTrigger className="w-[180px]">
                                                                    <SelectValue placeholder="Select category" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {categories.map((category) => (
                                                                        <SelectItem key={category} value={category}>{category}</SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label htmlFor="edit-price" className="text-right">
                                                                Price
                                                            </Label>
                                                            <Input
                                                                id="edit-price"
                                                                type="number"
                                                                value={editingProduct?.price || ""}
                                                                onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                                                                className="col-span-3"
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label htmlFor="edit-quantity" className="text-right">
                                                                Quantity
                                                            </Label>
                                                            <Input
                                                                id="edit-quantity"
                                                                type="number"
                                                                value={editingProduct?.quantity || ""}
                                                                onChange={(e) => setEditingProduct({ ...editingProduct, quantity: parseInt(e.target.value) })}
                                                                className="col-span-3"
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label htmlFor="edit-image" className="text-right">
                                                                Image URL
                                                            </Label>
                                                            <Input
                                                                id="edit-image"
                                                                value={editingProduct?.image || ""}
                                                                onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                                                                className="col-span-3"
                                                            />
                                                        </div>
                                                    </div>
                                                    <DialogFooter>
                                                        <Button type="submit" onClick={handleEditProduct}>Save Changes</Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                            <Button variant="destructive" onClick={() => handleDeleteProduct(product.id)}>
                                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TabsContent>

                <TabsContent value="categories">
                    <Card>
                        <CardHeader>
                            <CardTitle>Manage Categories</CardTitle>
                            <CardDescription>Add or remove product categories</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex space-x-2 mb-4">
                                <Input
                                    placeholder="New category name"
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                />
                                <Button onClick={handleAddCategory}>Add Category</Button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {categories.map((category) => (
                                    <Badge key={category} variant="secondary">
                                        {category}
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="ml-2 h-4 w-4 p-0"
                                            onClick={() => setCategories(categories.filter(c => c !== category))}
                                        >
                                            <Trash2 className="h-3 w-3" />
                                        </Button>
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}