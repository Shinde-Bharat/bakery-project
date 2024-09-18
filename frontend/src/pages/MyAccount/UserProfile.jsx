
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Pencil, Plus, Trash2, LogOut } from "lucide-react"
import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Mock user data
const initialUserData = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/placeholder.svg",
    addresses: [
        { id: 1, name: "Home", street: "123 Main St", city: "Anytown", state: "CA", zipCode: "12345", country: "USA" },
        { id: 2, name: "Work", street: "456 Office Blvd", city: "Workville", state: "NY", zipCode: "67890", country: "USA" },
    ],
    orders: [
        { id: "ORD-001", date: "2023-05-15", total: 129.99, status: "Delivered" },
        { id: "ORD-002", date: "2023-06-02", total: 79.99, status: "Processing" },
        { id: "ORD-003", date: "2023-06-10", total: 199.99, status: "Shipped" },
    ],
}

export default function UserProfilePage() {
    const [userData, setUserData] = useState(initialUserData)
    const [editMode, setEditMode] = useState(false)
    const [newAddress, setNewAddress] = useState({ name: "", street: "", city: "", state: "", zipCode: "", country: "" })

    const handleProfileUpdate = (e) => {
        e.preventDefault()
        setEditMode(false)
        // In a real application, you would send this data to your backend
        console.log("Profile updated:", userData)
    }

    const handleAddressAdd = (e) => {
        e.preventDefault()
        const updatedAddresses = [...userData.addresses, { ...newAddress, id: Date.now() }]
        setUserData({ ...userData, addresses: updatedAddresses })
        setNewAddress({ name: "", street: "", city: "", state: "", zipCode: "", country: "" })
        // In a real application, you would send this data to your backend
        console.log("New address added:", newAddress)
    }

    const handleAddressDelete = (id) => {
        const updatedAddresses = userData.addresses.filter(address => address.id !== id)
        setUserData({ ...userData, addresses: updatedAddresses })
        // In a real application, you would send this request to your backend
        console.log("Address deleted:", id)
    }

    const handleLogout = () => {
        // In a real application, you would implement logout logic here
        console.log("User logged out")
    }

    return (
        <div className="px-24 py-8 font-Montserrat">
            <h1 className="text-3xl font-bold mb-8">User Profile</h1>

            <Tabs defaultValue="profile" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="addresses">Addresses</TabsTrigger>
                    <TabsTrigger value="orders">Order History</TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>Manage your profile details</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleProfileUpdate}>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-4">
                                        <Avatar className="w-20 h-20">
                                            <AvatarImage src={userData.avatar} alt={userData.name} />
                                            <AvatarFallback>{userData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                        <Button type="button">Change Avatar</Button>
                                    </div>
                                    <div className="grid w-full items-center gap-1.5">
                                        <Input
                                            type="text"
                                            id="name"
                                            value={userData.name}
                                            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                            disabled={!editMode}
                                        />
                                    </div>
                                    <div className="grid w-full items-center gap-1.5">
                                        <Input
                                            type="email"
                                            id="email"
                                            value={userData.email}
                                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                            disabled={!editMode}
                                        />
                                    </div>
                                </div>
                                {editMode ? (
                                    <div className="flex justify-end space-x-2 mt-4">
                                        <Button type="submit">Save Changes</Button>
                                        <Button type="button" variant="outline" onClick={() => setEditMode(false)}>Cancel</Button>
                                    </div>
                                ) : (
                                    <div className="flex justify-end mt-4 space-x-2">
                                        <Button type="button" onClick={() => setEditMode(true)}>
                                            <Pencil className="mr-2 h-4 w-4" /> Edit Profile
                                        </Button>
                                        <Button type="button" variant="destructive" onClick={handleLogout}>
                                            <LogOut className="mr-2 h-4 w-4" /> Logout
                                        </Button>
                                    </div>
                                )}
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="addresses">
                    <Card>
                        <CardHeader>
                            <CardTitle>Saved Addresses</CardTitle>
                            <CardDescription>Manage your saved addresses</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {userData.addresses.map((address) => (
                                    <Card key={address.id}>
                                        <CardHeader>
                                            <CardTitle>{address.name}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p>{address.street}</p>
                                            <p>{address.city}, {address.state} {address.zipCode}</p>
                                            <p>{address.country}</p>
                                        </CardContent>
                                        <CardFooter>
                                            <Button variant="destructive" onClick={() => handleAddressDelete(address.id)}>
                                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <form onSubmit={handleAddressAdd} className="w-full">
                                <h3 className="text-lg font-semibold mb-2">Add New Address</h3>
                                <div className="space-y-2">
                                    <Input
                                        placeholder="Address Name (e.g., Home, Work)"
                                        value={newAddress.name}
                                        onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                                        required
                                    />
                                    <Input
                                        placeholder="Street Address"
                                        value={newAddress.street}
                                        onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                                        required
                                    />
                                    <div className="grid grid-cols-2 gap-2">
                                        <Input
                                            placeholder="City"
                                            value={newAddress.city}
                                            onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                                            required
                                        />
                                        <Input
                                            placeholder="State"
                                            value={newAddress.state}
                                            onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <Input
                                            placeholder="Zip Code"
                                            value={newAddress.zipCode}
                                            onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
                                            required
                                        />
                                        <Input
                                            placeholder="Country"
                                            value={newAddress.country}
                                            onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                                <Button type="submit" className="mt-2">
                                    <Plus className="mr-2 h-4 w-4" /> Add Address
                                </Button>
                            </form>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="orders">
                    <Card>
                        <CardHeader>
                            <CardTitle>Order History</CardTitle>
                            <CardDescription>View your past orders</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {userData.orders.map((order) => (
                                    <Card key={order.id}>
                                        <CardHeader>
                                            <CardTitle>Order {order.id}</CardTitle>
                                            <CardDescription>Placed on {order.date}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex justify-between items-center">
                                                <p className="font-semibold">Total: ${order.total.toFixed(2)}</p>
                                                <Badge>{order.status}</Badge>
                                            </div>
                                        </CardContent>
                                        <CardFooter>
                                            <Button variant="outline">View Details</Button>
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