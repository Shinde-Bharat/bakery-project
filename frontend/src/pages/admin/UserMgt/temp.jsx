

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
import { changeUserRole, addUser, listUsers, createDeliveryBoy } from "@/services/apis/admin"

export default function UserMgt() {
    const [users, setUsers] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [roleFilter, setRoleFilter] = useState("All")
    const [selectedUser, setSelectedUser] = useState(null)
    const [newUser, setNewUser] = useState({ name: "", email: "", phoneNumber: "", password: "", role: "user" })

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        try {
            const fetchedUsers = await listUsers()
            setUsers(fetchedUsers)
        } catch (error) {
            console.error("Error fetching users:", error)
        }
    }

    const filteredUsers = users.filter((user) => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesRole = roleFilter === "All" || user.role === roleFilter
        return matchesSearch && matchesRole
    })

    const handleAddUser = async () => {
        try {
            await addUser(newUser)
            fetchUsers()
            setNewUser({ name: "", email: "", phoneNumber: "", password: "", role: "user" })
        } catch (error) {
            console.error("Error adding user:", error)
        }
    }

    const handleEditUser = async () => {
        try {
            await changeUserRole({ userId: selectedUser._id, newRole: selectedUser.role })
            fetchUsers()
            setSelectedUser(null)
        } catch (error) {
            console.error("Error editing user:", error)
        }
    }

    const handleCreateDeliveryBoy = async () => {
        try {
            await createDeliveryBoy(newUser)
            fetchUsers()
            setNewUser({ name: "", email: "", phoneNumber: "", password: "", role: "delivery" })
        } catch (error) {
            console.error("Error creating delivery boy:", error)
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">User Management</h1>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>User Overview</CardTitle>
                    <CardDescription>Manage and monitor user accounts</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
                        <div className="flex items-center space-x-2">
                            <Search className="text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Search users..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-64"
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Select value={roleFilter} onValueChange={setRoleFilter}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Filter by role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All">All Roles</SelectItem>
                                    <SelectItem value="user">User</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="delivery">Delivery</SelectItem>
                                </SelectContent>
                            </Select>
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
                        </div>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Role</TableHead>
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
                                        <Badge>
                                            {user.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="outline" size="sm" onClick={() => setSelectedUser(user)}>
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[425px]">
                                                    <DialogHeader>
                                                        <DialogTitle>Edit User</DialogTitle>
                                                        <DialogDescription>
                                                            Change user role.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="grid gap-4 py-4">
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
                                                                    <SelectItem value="delivery">Delivery</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                    </div>
                                                    <DialogFooter>
                                                        <Button type="submit" onClick={handleEditUser}>Save Changes</Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}