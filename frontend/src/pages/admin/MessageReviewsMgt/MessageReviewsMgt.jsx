

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
import { Star, Search, MessageCircle, Trash2, Send } from "lucide-react"
import { Button } from "@nextui-org/button"
import { Input, Textarea } from "@nextui-org/react"

// Mock data for reviews and messages
const initialReviews = [
    { id: 1, productId: "P001", productName: "Wireless Earbuds", customerName: "John Doe", rating: 4, comment: "Great sound quality, but battery life could be better.", date: "2023-06-15", status: "Published" },
    { id: 2, productId: "P002", productName: "Smart Watch", customerName: "Jane Smith", rating: 5, comment: "Absolutely love it! Perfect for tracking my workouts.", date: "2023-06-14", status: "Published" },
    { id: 3, productId: "P003", productName: "Bluetooth Speaker", customerName: "Mike Johnson", rating: 3, comment: "Decent sound, but not as loud as I expected.", date: "2023-06-13", status: "Pending" },
]

const initialMessages = [
    { id: 1, name: "Alice Brown", email: "alice@example.com", subject: "Product Inquiry", message: "Hi, I'm interested in your new smartphone model. Can you provide more details?", date: "2023-06-15", status: "Unread" },
    { id: 2, name: "Bob Wilson", email: "bob@example.com", subject: "Order Status", message: "I placed an order last week (Order #12345). Can you tell me when it will be shipped?", date: "2023-06-14", status: "Read" },
    { id: 3, name: "Carol Davis", email: "carol@example.com", subject: "Return Request", message: "I received a damaged item and would like to return it. What's the process?", date: "2023-06-13", status: "Replied" },
]

export default function MessageReviewsMgt() {
    const [reviews, setReviews] = useState(initialReviews)
    const [messages, setMessages] = useState(initialMessages)
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("All")
    const [selectedReview, setSelectedReview] = useState(null)
    const [selectedMessage, setSelectedMessage] = useState(null)
    const [replyText, setReplyText] = useState("")

    const filteredReviews = reviews.filter((review) => {
        const matchesSearch = review.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            review.customerName.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === "All" || review.status === statusFilter
        return matchesSearch && matchesStatus
    })

    const filteredMessages = messages.filter((message) => {
        const matchesSearch = message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            message.subject.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === "All" || message.status === statusFilter
        return matchesSearch && matchesStatus
    })

    const handleReviewStatusChange = (reviewId, newStatus) => {
        setReviews(reviews.map(review =>
            review.id === reviewId ? { ...review, status: newStatus } : review
        ))
    }

    const handleMessageStatusChange = (messageId, newStatus) => {
        setMessages(messages.map(message =>
            message.id === messageId ? { ...message, status: newStatus } : message
        ))
    }

    const handleReplySubmit = () => {
        if (selectedMessage) {
            handleMessageStatusChange(selectedMessage.id, "Replied")
            setReplyText("")
            setSelectedMessage(null)
        }
    }

    const handleDeleteReview = (reviewId) => {
        setReviews(reviews.filter(review => review.id !== reviewId))
    }

    const handleDeleteMessage = (messageId) => {
        setMessages(messages.filter(message => message.id !== messageId))
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Messages and Review Management</h1>

            <Tabs defaultValue="reviews" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="reviews">Customer Reviews</TabsTrigger>
                    <TabsTrigger value="messages">Contact Messages</TabsTrigger>
                </TabsList>

                <TabsContent value="reviews">
                    <Card>
                        <CardHeader>
                            <CardTitle>Manage Customer Reviews</CardTitle>
                            <CardDescription>View and manage product reviews from customers</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center space-x-2">
                                    <Search className="text-gray-400" />
                                    <Input
                                        type="text"
                                        placeholder="Search reviews..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-64"
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Filter by status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="All">All Statuses</SelectItem>
                                            <SelectItem value="Published">Published</SelectItem>
                                            <SelectItem value="Pending">Pending</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Product</TableHead>
                                        <TableHead>Customer</TableHead>
                                        <TableHead>Rating</TableHead>
                                        <TableHead>Comment</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredReviews.map((review) => (
                                        <TableRow key={review.id}>
                                            <TableCell>{review.productName}</TableCell>
                                            <TableCell>{review.customerName}</TableCell>
                                            <TableCell>
                                                <div className="flex">
                                                    {[...Array(5)].map((_, index) => (
                                                        <Star
                                                            key={index}
                                                            className={`h-5 w-5 ${index < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                            </TableCell>
                                            <TableCell className="max-w-xs truncate">{review.comment}</TableCell>
                                            <TableCell>{review.date}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    className={
                                                        review.status === "Published"
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-yellow-100 text-yellow-800"
                                                    }
                                                >
                                                    {review.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex space-x-2">
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button variant="outline" onClick={() => setSelectedReview(review)}>
                                                                View
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="sm:max-w-[425px]">
                                                            <DialogHeader>
                                                                <DialogTitle>Review Details</DialogTitle>
                                                                <DialogDescription>
                                                                    View or update the status of this review.
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <div className="grid gap-4 py-4">
                                                                <div className="grid grid-cols-4 items-center gap-4">
                                                                    <Label htmlFor="product" className="text-right">
                                                                        Product
                                                                    </Label>
                                                                    <div id="product" className="col-span-3">
                                                                        {selectedReview?.productName}
                                                                    </div>
                                                                </div>
                                                                <div className="grid grid-cols-4 items-center gap-4">
                                                                    <Label htmlFor="customer" className="text-right">
                                                                        Customer
                                                                    </Label>
                                                                    <div id="customer" className="col-span-3">
                                                                        {selectedReview?.customerName}
                                                                    </div>
                                                                </div>
                                                                <div className="grid grid-cols-4 items-center gap-4">
                                                                    <Label htmlFor="rating" className="text-right">
                                                                        Rating
                                                                    </Label>
                                                                    <div id="rating" className="col-span-3 flex">
                                                                        {[...Array(5)].map((_, index) => (
                                                                            <Star
                                                                                key={index}
                                                                                className={`h-5 w-5 ${index < selectedReview?.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                                                                    }`}
                                                                            />
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                                <div className="grid grid-cols-4 items-center gap-4">
                                                                    <Label htmlFor="comment" className="text-right">
                                                                        Comment
                                                                    </Label>
                                                                    <div id="comment" className="col-span-3">
                                                                        {selectedReview?.comment}
                                                                    </div>
                                                                </div>
                                                                <div className="grid grid-cols-4 items-center gap-4">
                                                                    <Label htmlFor="status" className="text-right">
                                                                        Status
                                                                    </Label>
                                                                    <Select
                                                                        value={selectedReview?.status}
                                                                        onValueChange={(value) => handleReviewStatusChange(selectedReview?.id, value)}
                                                                    >
                                                                        <SelectTrigger className="w-[180px]">
                                                                            <SelectValue placeholder="Select status" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectItem value="Published">Published</SelectItem>
                                                                            <SelectItem value="Pending">Pending</SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                </div>
                                                            </div>
                                                            <DialogFooter>
                                                                <Button type="submit" onClick={() => setSelectedReview(null)}>
                                                                    Save changes
                                                                </Button>
                                                            </DialogFooter>
                                                        </DialogContent>
                                                    </Dialog>
                                                    <Button variant="destructive" onClick={() => handleDeleteReview(review.id)}>
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

                <TabsContent value="messages">
                    <Card>
                        <CardHeader>
                            <CardTitle>Manage Contact Messages</CardTitle>
                            <CardDescription>View and respond to messages from the contact form</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center space-x-2">
                                    <Search className="text-gray-400" />
                                    <Input
                                        type="text"
                                        placeholder="Search messages..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-64"
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Filter by status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="All">All Statuses</SelectItem>
                                            <SelectItem value="Unread">Unread</SelectItem>
                                            <SelectItem value="Read">Read</SelectItem>
                                            <SelectItem value="Replied">Replied</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Subject</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredMessages.map((message) => (
                                        <TableRow key={message.id}>
                                            <TableCell>{message.name}</TableCell>
                                            <TableCell className="max-w-xs truncate">{message.subject}</TableCell>
                                            <TableCell>{message.date}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    className={
                                                        message.status === "Unread"
                                                            ? "bg-red-100 text-red-800"
                                                            : message.status === "Read"
                                                                ? "bg-blue-100 text-blue-800"
                                                                : "bg-green-100 text-green-800"
                                                    }
                                                >
                                                    {message.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex space-x-2">
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button variant="outline" onClick={() => {
                                                                setSelectedMessage(message)
                                                                if (message.status === "Unread") {
                                                                    handleMessageStatusChange(message.id, "Read")
                                                                }
                                                            }}>
                                                                View
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="sm:max-w-[425px]">
                                                            <DialogHeader>
                                                                <DialogTitle>Message Details</DialogTitle>
                                                                <DialogDescription>
                                                                    View message details and send a reply.
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <div className="grid gap-4 py-4">
                                                                <div className="grid grid-cols-4 items-center gap-4">
                                                                    <Label htmlFor="name" className="text-right">
                                                                        Name
                                                                    </Label>
                                                                    <div id="name" className="col-span-3">
                                                                        {selectedMessage?.name}
                                                                    </div>
                                                                </div>
                                                                <div className="grid grid-cols-4 items-center gap-4">
                                                                    <Label htmlFor="email" className="text-right">
                                                                        Email
                                                                    </Label>
                                                                    <div id="email" className="col-span-3">
                                                                        {selectedMessage?.email}
                                                                    </div>
                                                                </div>
                                                                <div className="grid grid-cols-4 items-center gap-4">
                                                                    <Label htmlFor="subject" className="text-right">
                                                                        Subject
                                                                    </Label>
                                                                    <div id="subject" className="col-span-3">
                                                                        {selectedMessage?.subject}
                                                                    </div>
                                                                </div>
                                                                <div className="grid grid-cols-4 items-center gap-4">
                                                                    <Label htmlFor="message" className="text-right">
                                                                        Message
                                                                    </Label>
                                                                    <div id="message" className="col-span-3">
                                                                        {selectedMessage?.message}
                                                                    </div>
                                                                </div>
                                                                <div className="grid grid-cols-4 items-center gap-4">
                                                                    <Label htmlFor="reply" className="text-right">
                                                                        Reply
                                                                    </Label>
                                                                    <Textarea
                                                                        id="reply"
                                                                        value={replyText}
                                                                        onChange={(e) => setReplyText(e.target.value)}
                                                                        className="col-span-3"
                                                                        placeholder="Type your reply here..."
                                                                    />
                                                                </div>
                                                            </div>
                                                            <DialogFooter>
                                                                <Button type="submit" onClick={handleReplySubmit}>
                                                                    <Send className="mr-2 h-4 w-4" />
                                                                    Send Reply
                                                                </Button>
                                                            </DialogFooter>
                                                        </DialogContent>
                                                    </Dialog>
                                                    <Button variant="destructive" onClick={() => handleDeleteMessage(message.id)}>
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
            </Tabs>
        </div>
    )
}