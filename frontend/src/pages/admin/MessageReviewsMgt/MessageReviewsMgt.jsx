import React, { useState, useEffect } from 'react'
import { Button } from '@nextui-org/button'
import { Input, Textarea } from "@nextui-org/react"
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react"
import { Select, SelectItem } from "@nextui-org/react"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react"
import { Card, CardHeader, CardBody } from "@nextui-org/react"
import { Badge } from '@/components/ui/badge'
import { Star, Search, MessageCircle, Trash2, Send } from 'lucide-react'
import { getAllMessages, updateMessageStatus } from '@/services/apis/message'

export default function MessageReviewsMgt() {
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("All")
    const [selectedMessage, setSelectedMessage] = useState(null)
    const [replyText, setReplyText] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [sendingMail, setsendingMail] = useState(false)

    useEffect(() => {
        fetchMessages()
    }, [])

    const fetchMessages = async () => {
        try {
            setLoading(true)
            const data = await getAllMessages()
            setMessages(data)
        } catch (error) {
            console.error("Error fetching messages:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleStatusChange = async (messageId, newStatus) => {
        try {
            await updateMessageStatus(messageId, { status: newStatus })
            setMessages(messages.map(message =>
                message._id === messageId ? { ...message, status: newStatus } : message
            ))
        } catch (error) {
            console.error("Error updating message status:", error)
        }
    }

    const handleReplySubmit = async () => {
        setsendingMail(true)
        if (selectedMessage) {
            try {
                await updateMessageStatus(selectedMessage._id, { status: 'replied', replyMsg: replyText })
                setMessages(messages.map(message =>
                    message._id === selectedMessage._id ? { ...message, status: 'replied', replyMsg: replyText } : message
                ))
                setReplyText("")
                setSelectedMessage(null)
                setIsModalOpen(false)
                setsendingMail(false)
                getAllMessages()
            } catch (error) {
                console.error("Error sending reply:", error)
            }
        }
    }

    const filteredMessages = messages.filter((message) => {
        const matchesSearch = message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            message.subject.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === "All" || message.status === statusFilter
        return matchesSearch && matchesStatus
    })

    return (
        <div className="container mx-auto px-4 py-8  overflow-y-scroll max-h-screen">
            <h1 className="text-3xl font-bold mb-8">Message Management</h1>

            <Card className="mb-6">
                <CardBody>
                    <div className="flex justify-between items-center">
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
                            <Select
                                placeholder="Filter by status"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <SelectItem value="All">All Statuses</SelectItem>
                                <SelectItem value="unread">Unread</SelectItem>
                                <SelectItem value="read">Read</SelectItem>
                                <SelectItem value="replied">Replied</SelectItem>
                            </Select>
                        </div>
                    </div>
                </CardBody>
            </Card>

            <Table aria-label="Messages table">
                <TableHeader>
                    <TableColumn>NAME</TableColumn>
                    <TableColumn>SUBJECT</TableColumn>
                    <TableColumn>DATE</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                    <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody>
                    {filteredMessages.map((message) => (
                        <TableRow key={message._id}>
                            <TableCell>{message.name}</TableCell>
                            <TableCell>{message.subject}</TableCell>
                            <TableCell>{new Date(message.date).toLocaleDateString()}</TableCell>
                            <TableCell>
                                <Badge className={message.status === 'unread' ? 'bg-blue-500' : message.status === 'read' ? 'bg-yellow-500' : 'bg-green-500'}>
                                    {message.status}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <Button
                                    color="primary"
                                    auto

                                    onClick={() => {
                                        setSelectedMessage(message)
                                        setIsModalOpen(true)
                                        if (message.status === 'unread') {
                                            handleStatusChange(message._id, 'read')
                                        }
                                    }}
                                >
                                    View
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Message Details</ModalHeader>
                            <ModalBody>
                                {selectedMessage && (
                                    <>
                                        <p><strong>From:</strong> {selectedMessage.name}</p>
                                        <p><strong>Email:</strong> {selectedMessage.email}</p>
                                        <p><strong>Subject:</strong> {selectedMessage.subject}</p>
                                        <p><strong>Message:</strong> {selectedMessage.message}</p>
                                        {
                                            selectedMessage.status === "replied" ?
                                                <p><strong>Reply Message:</strong> {selectedMessage.replyMsg}</p> : <Textarea
                                                    label="Reply"
                                                    placeholder="Type your reply here..."
                                                    value={replyText}
                                                    onChange={(e) => setReplyText(e.target.value)}
                                                />
                                        }

                                    </>
                                )}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                {
                                    selectedMessage.status !== "replied" && <Button color="primary" isLoading={sendingMail} onPress={handleReplySubmit}>
                                        Send Reply
                                    </Button>
                                }

                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}