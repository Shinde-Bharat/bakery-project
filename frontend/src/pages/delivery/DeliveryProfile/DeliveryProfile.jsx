"use client"

import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { toast } from '@/hooks/use-toast'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, Save } from 'lucide-react'
import { Button } from '@nextui-org/button'
import { Input, Textarea } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'

const profileFormSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    pincode: z.string().regex(/^\d{6}$/, {
        message: "Pincode must be a 6-digit number.",
    }),
    phone: z.string().regex(/^\+?[1-9]\d{9,14}$/, {
        message: "Please enter a valid phone number.",
    }),
    bio: z.string().max(160).optional(),
})


// This can be replaced with actual data fetching logic
const defaultValues = {
    username: "johndoe",
    email: "johndoe@example.com",
    name: "John Doe",
    pincode: "110001",
    phone: "+919876543210",
    bio: "Experienced delivery professional with a passion for customer service.",
}

export default function DeliveryProfile() {
    const navigate = useNavigate()
    const [isEditing, setIsEditing] = useState(false)

    const form = useForm({
        resolver: zodResolver(profileFormSchema),
        defaultValues,
        mode: "onChange",
    })

    function onSubmit(data) {
        toast({
            title: "Profile updated",
            description: "Your profile has been successfully updated.",
        })
        setIsEditing(false)
        // Here you would typically send the updated data to your backend
        console.log(data)
    }

    function handleLogout() {
        // Implement logout logic here
        toast({
            title: "Logged out",
            description: "You have been successfully logged out.",
        })
        navigate('/login') // Redirect to login page
    }

    return (
        <div className="px-4 py-24" >
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <div className="flex items-center space-x-4">
                        <Avatar className="w-20 h-20">
                            <AvatarImage src="/placeholder-avatar.jpg" alt="Profile picture" />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-2xl">{form.watch("name")}</CardTitle>
                            <CardDescription>{form.watch("email")}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="email" disabled={!isEditing} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} disabled={!isEditing} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex gap-x-4">
                                <FormField
                                    control={form.control}
                                    name="pincode"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Pincode</FormLabel>
                                            <FormControl>
                                                <Input {...field} disabled={!isEditing} />
                                            </FormControl>
                                            <FormDescription>
                                                Your primary delivery area pincode.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl>
                                                <Input {...field} disabled={!isEditing} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>


                            {isEditing && (
                                <Button type="submit">
                                    <Save className="w-4 h-4 mr-2" />
                                    Save changes
                                </Button>
                            )}
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    {!isEditing && (
                        <Button onClick={() => setIsEditing(true)}>
                            Edit Profile
                        </Button>
                    )}
                    <Button variant="destructive" onClick={handleLogout}>
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}