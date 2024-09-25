"use client"

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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, UserPlus, Edit, Trash2 } from "lucide-react"
import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { changeUserRole, addUser, listUsers, createDeliveryBoy } from "@/services/apis/admin"
import { getAllDeliveryBoys, getDeliveryBoyById, updateDeliveryBoy, updateDeliveryBoyPassword, deleteDeliveryBoy } from "@/services/apis/delivery"

export default function UserMgt() {
    const [users, setUsers] = useState([])
    const [deliveryBoys, setDeliveryBoys] = useState([])
    const [admins, setAdmins] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedUser, setSelectedUser] = useState(null)
    const [newUser, setNewUser] = useState({ name: "", email: "", phoneNumber: "", password: "", role: "user" })

    useEffect(() => {
        fetchUsers()
        fetchDeliveryBoys()
    }, [])

    const fetchUsers = async () => {
        try {
            const fetchedUsers = await listUsers()
            setUsers(fetchedUsers.filter(user => user.role === 'user'))
            setAdmins(fetchedUsers.filter(user => user.role === 'admin'))
        } catch (error) {
            console.error("Error fetching users:", error)
        }
    }

    const fetchDeliveryBoys = async () => {
        try {
            const fetchedDeliveryBoys = await getAllDeliveryBoys()
            setDeliveryBoys(fetchedDeliveryBoys)
        } catch (error) {
            console.error("Error fetching delivery boys:", error)
        }
    }

    const handleAddUser = async () => {
        try {
            await addUser(newUser)
            fetchUsers()
            setNewUser({ name: "", email: "", phoneNumber: "", password: "", role: "user" })
        } catch (error) {
            console.error("Error adding user:", error)
        }
    }
    const handleCreateDeliveryBoy = async () => {
        try {
            await createDeliveryBoy(newUser)
            fetchDeliveryBoys()
            setNewUser({ name: "", email: "", phoneNumber: "", password: "", role: "delivery" })
        } catch (error) {
            console.error("Error creating delivery boy:", error)
        }
    }


    const handleEditUser = async () => {
        try {
            if (selectedUser.role === 'delivery') {
                await updateDeliveryBoy(selectedUser._id, selectedUser)
                fetchDeliveryBoys()
            } else {
                await changeUserRole({ userId: selectedUser._id, newRole: selectedUser.role })
                fetchUsers()
            }
            setSelectedUser(null)
        } catch (error) {
            console.error("Error editing user:", error)
        }
    }

    const handleDeleteUser = async (id, role) => {
        try {
            if (role === 'delivery') {
                await deleteDeliveryBoy(id)
                fetchDeliveryBoys()
            } else {
                // Implement delete user logic for regular users if needed
                console.log("Delete user not implemented for regular users")
            }
        } catch (error) {
            console.error("Error deleting user:", error)
        }
    }

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const filteredDeliveryBoys = deliveryBoys.filter((deliveryBoy) =>
        deliveryBoy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deliveryBoy.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const filteredAdmins = admins.filter((admin) =>
        admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">User Management</h1>

            <div className="flex justify-between">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <UserPlus className="mr-2 h-4 w-4" /> Add User
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add New User</DialogTitle>
                            <DialogDescription>
                                Enter the details of the new user account.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    value={newUser.name}
                                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="text-right">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={newUser.email}
                                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="phoneNumber" className="text-right">
                                    Phone
                                </Label>
                                <Input
                                    id="phoneNumber"
                                    value={newUser.phoneNumber}
                                    onChange={(e) => setNewUser({ ...newUser, phoneNumber: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="password" className="text-right">
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={newUser.password}
                                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="role" className="text-right">
                                    Role
                                </Label>
                                <Select
                                    value={newUser.role}
                                    onValueChange={(value) => setNewUser({ ...newUser, role: value })}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="user">User</SelectItem>
                                        <SelectItem value="admin">Admin</SelectItem>
                                        <SelectItem value="delivery">Delivery</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={newUser.role === 'delivery' ? handleCreateDeliveryBoy : handleAddUser}>
                                {newUser.role === 'delivery' ? 'Create Delivery Boy' : 'Add User'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <div className="flex items-center space-x-2 mb-4">
                    <Search className="text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-64"
                    />
                </div>
            </div>


            <Tabs defaultValue="users">
                <TabsList>
                    <TabsTrigger value="users">Users</TabsTrigger>
                    <TabsTrigger value="deliveryBoys">Delivery Boys</TabsTrigger>
                    <TabsTrigger value="admins">Admins</TabsTrigger>
                </TabsList>

                <TabsContent value="users">
                    <Card>
                        <CardHeader>
                            <CardTitle>Users</CardTitle>
                            <CardDescription>Manage regular user accounts</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>User</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Phone</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredUsers.map((user) => (
                                        <TableRow key={user._id}>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center space-x-3">
                                                    <Avatar>
                                                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <span>{user.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.phoneNumber}</TableCell>
                                            <TableCell>
                                                <div className="flex space-x-2">
                                                    <Button variant="outline" size="sm" onClick={() => setSelectedUser(user)}>
                                                        <Edit className="h-4 w-4" />
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

                <TabsContent value="deliveryBoys">
                    <Card>
                        <CardHeader>
                            <CardTitle>Delivery Boys</CardTitle>
                            <CardDescription>Manage delivery boy accounts</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>User</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Phone</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredDeliveryBoys.map((deliveryBoy) => (
                                        <TableRow key={deliveryBoy._id}>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center space-x-3">
                                                    <Avatar>
                                                        <AvatarFallback>{deliveryBoy.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <span>{deliveryBoy.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>{deliveryBoy.email}</TableCell>
                                            <TableCell>{deliveryBoy.phoneNumber}</TableCell>
                                            <TableCell>
                                                <div className="flex space-x-2">
                                                    <Button variant="outline" size="sm" onClick={() => setSelectedUser(deliveryBoy)}>
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="destructive" size="sm" onClick={() => handleDeleteUser(deliveryBoy._id, 'delivery')}>
                                                        <Trash2 className="h-4 w-4" />
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

                <TabsContent value="admins">
                    <Card>
                        <CardHeader>
                            <CardTitle>Admins</CardTitle>
                            <CardDescription>Manage admin accounts</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>User</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead
                                            Head>Phone</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredAdmins.map((admin) => (
                                        <TableRow key={admin._id}>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center space-x-3">
                                                    <Avatar>
                                                        <AvatarFallback>{admin.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <span>{admin.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>{admin.email}</TableCell>
                                            <TableCell>{admin.phoneNumber}</TableCell>
                                            <TableCell>
                                                <div className="flex space-x-2">
                                                    <Button variant="outline" size="sm" onClick={() => setSelectedUser(admin)}>
                                                        <Edit className="h-4 w-4" />
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
            </Tabs>

            <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit User</DialogTitle>
                        <DialogDescription>
                            Update user information.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="edit-name"
                                value={selectedUser?.name || ""}
                                onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-email" className="text-right">
                                Email
                            </Label>
                            <Input
                                id="edit-email"
                                value={selectedUser?.email || ""}
                                onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-phone" className="text-right">
                                Phone
                            </Label>
                            <Input
                                id="edit-phone"
                                value={selectedUser?.phoneNumber || ""}
                                onChange={(e) => setSelectedUser({ ...selectedUser, phoneNumber: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        {selectedUser?.role !== 'delivery' && (
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-role" className="text-right">
                                    Role
                                </Label>
                                <Select
                                    value={selectedUser?.role || ""}
                                    onValueChange={(value) => setSelectedUser({ ...selectedUser, role: value })}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="user">User</SelectItem>
                                        <SelectItem value="admin">Admin</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={handleEditUser}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}