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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, UserPlus, Edit, Trash2, Lock, UnlockKeyhole } from "lucide-react"
import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/react"

// Mock data for users
const initialUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Customer", status: "Active", lastLogin: "2023-06-15", avatar: "/placeholder.svg" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Admin", status: "Active", lastLogin: "2023-06-14", avatar: "/placeholder.svg" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Customer", status: "Inactive", lastLogin: "2023-05-20", avatar: "/placeholder.svg" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Customer", status: "Active", lastLogin: "2023-06-13", avatar: "/placeholder.svg" },
    { id: 5, name: "Charlie Davis", email: "charlie@example.com", role: "Moderator", status: "Active", lastLogin: "2023-06-12", avatar: "/placeholder.svg" },
]

export default function UserMgt() {
    const [users, setUsers] = useState(initialUsers)
    const [searchTerm, setSearchTerm] = useState("")
    const [roleFilter, setRoleFilter] = useState("All")
    const [statusFilter, setStatusFilter] = useState("All")
    const [selectedUser, setSelectedUser] = useState(null)
    const [newUser, setNewUser] = useState({ name: "", email: "", role: "Customer", status: "Active" })

    const filteredUsers = users.filter((user) => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesRole = roleFilter === "All" || user.role === roleFilter
        const matchesStatus = statusFilter === "All" || user.status === statusFilter
        return matchesSearch && matchesRole && matchesStatus
    })

    const handleAddUser = () => {
        const userToAdd = {
            ...newUser,
            id: users.length + 1,
            lastLogin: "N/A",
            avatar: "/placeholder.svg"
        }
        setUsers([...users, userToAdd])
        setNewUser({ name: "", email: "", role: "Customer", status: "Active" })
    }

    const handleEditUser = () => {
        setUsers(users.map(user =>
            user.id === selectedUser.id ? selectedUser : user
        ))
        setSelectedUser(null)
    }

    const handleDeleteUser = (userId) => {
        setUsers(users.filter(user => user.id !== userId))
    }

    const handleToggleUserStatus = (userId) => {
        setUsers(users.map(user =>
            user.id === userId ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" } : user
        ))
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
                                    <SelectItem value="Customer">Customer</SelectItem>
                                    <SelectItem value="Admin">Admin</SelectItem>
                                    <SelectItem value="Moderator">Moderator</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All">All Statuses</SelectItem>
                                    <SelectItem value="Active">Active</SelectItem>
                                    <SelectItem value="Inactive">Inactive</SelectItem>
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
                                                    <SelectItem value="Customer">Customer</SelectItem>
                                                    <SelectItem value="Admin">Admin</SelectItem>
                                                    <SelectItem value="Moderator">Moderator</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit" onClick={handleAddUser}>Add User</Button>
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
                                <TableHead>Role</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Last Login</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center space-x-3">
                                            <Avatar>
                                                <AvatarImage src={user.avatar} alt={user.name} />
                                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span>{user.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>
                                        <Badge
                                            className={
                                                user.status === "Active"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-red-100 text-red-800"
                                            }
                                        >
                                            {user.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{user.lastLogin}</TableCell>
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
                                                            Make changes to user account details.
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
                                                                type="email"
                                                                value={selectedUser?.email || ""}
                                                                onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                                                                className="col-span-3"
                                                            />
                                                        </div>
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
                                                                    <SelectItem value="Customer">Customer</SelectItem>
                                                                    <SelectItem value="Admin">Admin</SelectItem>
                                                                    <SelectItem value="Moderator">Moderator</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                    </div>
                                                    <DialogFooter>
                                                        <Button type="submit" onClick={handleEditUser}>Save Changes</Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleToggleUserStatus(user.id)}
                                            >
                                                {user.status === "Active" ? (
                                                    <Lock className="h-4 w-4" />
                                                ) : (
                                                    <UnlockKeyhole className="h-4 w-4" />
                                                )}
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDeleteUser(user.id)}
                                            >
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
        </div>
    )
}