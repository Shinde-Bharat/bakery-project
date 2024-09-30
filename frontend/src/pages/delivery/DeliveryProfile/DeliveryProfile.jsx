

import { useState, useEffect } from 'react'
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
import { LogOut } from 'lucide-react'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'
import { getOwnProfile } from '@/services/apis/delivery'

const profileFormSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    phoneNumber: z.string().regex(/^\+?[1-9]\d{9,14}$/, {
        message: "Please enter a valid phone number.",
    }),
})

export default function DeliveryProfile() {
    const navigate = useNavigate()
    const [profile, setProfile] = useState(null)

    const form = useForm({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            name: "",
            email: "",
            phoneNumber: "",
        },
        mode: "onChange",
    })

    useEffect(() => {
        fetchProfile()
    }, [])

    const fetchProfile = async () => {
        try {
            const data = await getOwnProfile()
            setProfile(data)
            form.reset({
                name: data.name,
                email: data.email,
                phoneNumber: data.phoneNumber,
            })
        } catch (error) {
            console.error("Error fetching profile:", error)
            toast({
                title: "Error",
                description: "Failed to fetch profile. Please try again.",
                variant: "destructive",
            })
        }
    }

    function handleLogout() {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        toast({
            title: "Logged out",
            description: "You have been successfully logged out.",
        })
        navigate('/delivery/login')
    }

    if (!profile) {
        return <div>Loading...</div>
    }

    return (
        <div className="px-4 py-24" >
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <div className="flex items-center space-x-4">
                        <Avatar className="w-20 h-20">
                            <AvatarImage src="/placeholder-avatar.jpg" alt="Profile picture" />
                            <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-2xl">{profile.name}</CardTitle>
                            <CardDescription>{profile.email}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form className="space-y-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} disabled />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="email" disabled />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input {...field} disabled />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                    <p className="mt-4 text-sm text-gray-500">To change your details, please contact the admin.</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="destructive" onClick={handleLogout}>
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}