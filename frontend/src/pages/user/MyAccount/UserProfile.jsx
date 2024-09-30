'use client'

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Pencil, Plus, Trash2, LogOut, Eye } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useUser } from "@/hooks/reduxHooks"
import { getUserProfile, updateUserProfile, addAddress, deleteAddress, getUserOrders } from "@/services/apis/user"
import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/react"

export default function UserProfilePage() {
    const [userData, setUserData] = useState(null)
    const [editMode, setEditMode] = useState(false)
    const [newAddress, setNewAddress] = useState({ addressName: "", streetName: "", city: "", state: "", zipCode: "", country: "" })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [activeTab, setActiveTab] = useState("profile")
    const navigate = useNavigate()
    const { user, updateProfile, logout } = useUser()

    useEffect(() => {
        const luser = JSON.parse(localStorage.getItem('user'))
        if (luser?.token && user.isLoggedIn) {
            fetchUserProfile()
        } else {
            navigate('/login')
        }
    }, [])

    const fetchUserProfile = async () => {
        try {
            setLoading(true)
            const profile = await getUserProfile()
            setUserData(profile)
            updateProfile(profile)
        } catch (err) {
            setError("Failed to fetch user profile")
            toast({
                title: "Error",
                description: "Failed to fetch user profile. Please try again.",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    const handleProfileUpdate = async (e) => {
        e.preventDefault()
        try {
            const updatedProfile = await updateUserProfile({ name: userData.name })
            setUserData(updatedProfile)
            updateProfile(updatedProfile)
            setEditMode(false)
            toast({
                title: "Success",
                description: "Profile updated successfully.",
            })
        } catch (err) {
            toast({
                title: "Error",
                description: "Failed to update profile. Please try again.",
                variant: "destructive",
            })
        }
    }

    const handleAddressAdd = async (e) => {
        e.preventDefault()
        try {
            const updatedAddresses = await addAddress(newAddress)
            const updatedUserData = { ...userData, savedAddresses: updatedAddresses }
            setUserData(updatedUserData)
            updateProfile(updatedUserData)
            setNewAddress({ addressName: "", streetName: "", city: "", state: "", zipCode: "", country: "" })
            toast({
                title: "Success",
                description: "Address added successfully.",
            })
        } catch (err) {
            toast({
                title: "Error",
                description: "Failed to add address. Please try again.",
                variant: "destructive",
            })
        }
    }

    const handleAddressDelete = async (addressId) => {
        try {
            const updatedAddresses = await deleteAddress(addressId)
            const updatedUserData = { ...userData, savedAddresses: updatedAddresses }
            setUserData(updatedUserData)
            updateProfile(updatedUserData)
            toast({
                title: "Success",
                description: "Address deleted successfully.",
            })
        } catch (err) {
            toast({
                title: "Error",
                description: "Failed to delete address. Please try again.",
                variant: "destructive",
            })
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('user')
        logout()
        toast({
            title: "Logout Successful",
            description: "We'll miss you!",
        })
        navigate('/')
    }

    const handleOrderHistoryClick = async () => {
        try {
            setLoading(true)
            const orders = await getUserOrders()
            const updatedUserData = { ...userData, orderHistory: orders }
            setUserData(updatedUserData)
            updateProfile(updatedUserData)
        } catch (err) {
            toast({
                title: "Error",
                description: "Failed to fetch order history. Please try again.",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    const handleTabChange = (value) => {
        setActiveTab(value)
        if (value === "orders") {
            handleOrderHistoryClick()
        }
    }

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
    if (!userData) return null

    return (
        <div className="px-24 py-8 font-Montserrat">
            <h1 className="text-3xl font-bold mb-8">User Profile</h1>

            <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
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
                                            disabled
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
                                {userData.savedAddresses.map((address) => (
                                    <Card key={address._id}>
                                        <CardHeader>
                                            <CardTitle>{address.addressName}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p>{address.streetName}</p>
                                            <p>{address.city}, {address.state} {address.zipCode}</p>
                                            <p>{address.country}</p>
                                        </CardContent>
                                        <CardFooter>
                                            <Button variant="destructive" onClick={() => handleAddressDelete(address._id)}>
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
                                        value={newAddress.addressName}
                                        onChange={(e) => setNewAddress({ ...newAddress, addressName: e.target.value })}
                                        required
                                    />
                                    <Input
                                        placeholder="Street Address"
                                        value={newAddress.streetName}
                                        onChange={(e) => setNewAddress({ ...newAddress, streetName: e.target.value })}
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
                            <div className="flex justify-between">
                                <div className="">
                                    <CardTitle>Order History</CardTitle>
                                    <CardDescription>View your past orders</CardDescription>
                                </div>
                                <Button color="primary" onClick={() => navigate('/track')}>Track Orders</Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {userData.orderHistory.slice().reverse().map((order) => (
                                    <Card key={order._id}>
                                        <CardHeader>
                                            <CardTitle>Order {order.orderId}</CardTitle>
                                            <CardDescription>Placed on {new Date(order.placedOn).toLocaleDateString()}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex justify-between items-center">
                                                <p className="font-semibold">Total: ₹{order.total.toFixed(2)}</p>
                                                <Badge>{order.status}</Badge>
                                            </div>
                                        </CardContent>
                                        <CardFooter>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="outline" onClick={() => setSelectedOrder(order)}>
                                                        <Eye className="mr-2 h-4 w-4" /> View Details
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[425px]">
                                                    <DialogHeader>
                                                        <DialogTitle>Order Details</DialogTitle>
                                                        <DialogDescription>
                                                            Order ID: {order.orderId}
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="grid gap-4 py-4">
                                                        <div>
                                                            <h4 className="font-semibold">Order Items:</h4>
                                                            <ul className="list-disc pl-5">
                                                                {order.items.map((item, index) => (
                                                                    <li key={index}>
                                                                        {item.name} - Quantity: {item.quantity}, Price: ₹{item.price.toFixed(2)}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                        <div>
                                                            <h4 className="font-semibold">Total: ₹{order.total.toFixed(2)}</h4>
                                                        </div>
                                                        <div>
                                                            <h4 className="font-semibold">Status: {order.status}</h4>
                                                        </div>
                                                        <div>
                                                            <h4 className="font-semibold">Placed On: {new Date(order.placedOn).toLocaleString()}</h4>
                                                        </div>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
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