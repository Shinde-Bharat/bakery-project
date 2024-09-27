import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { toast } from "@/hooks/use-toast"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { Button, Card, CardBody, CardHeader, Input, Textarea } from "@nextui-org/react"
import SectionHeading from "@/components/utility/SectionHeading"
import { createMessage } from "@/services/apis/message"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    subject: z.string().min(2, {
        message: "Subject must be at least 2 characters.",
    }),
    message: z.string().min(10, {
        message: "Message must be at least 10 characters.",
    }),
})

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const contactform = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
    })

    async function onSubmit(values) {
        setIsSubmitting(true)
        try {
            const response = await createMessage(values)

            if (response) {
                toast({
                    title: "Message sent!",
                    description: "We'll get back to you as soon as possible.",
                })
                contactform.reset()
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "There was a problem sending your message. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="px-4 py-16 bg-amber-50">
            <SectionHeading heading={"Contact Us"} />

            <div className="max-w-3xl mx-auto mb-16">
                <p className="text-lg text-center mb-8">
                    We'd love to hear from you! Whether you have a question about our delicious treats,
                    want to place a custom order, or just want to say hello, we're here for you.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex items-center">
                        <MapPin className="h-6 w-6 mr-4 text-primary" />
                        <div>
                            <h3 className="font-semibold">Address</h3>
                            <p>123 Bakery Lane, Sweet Town, ST 12345</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Phone className="h-6 w-6 mr-4 text-primary" />
                        <div>
                            <h3 className="font-semibold">Phone</h3>
                            <p>(555) 123-4567</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Mail className="h-6 w-6 mr-4 text-primary" />
                        <div>
                            <h3 className="font-semibold">Email</h3>
                            <p>hello@sweetbakery.com</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Clock className="h-6 w-6 mr-4 text-primary" />
                        <div>
                            <h3 className="font-semibold">Hours</h3>
                            <p>Mon-Sat: 7am - 7pm, Sun: 8am - 5pm</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="  px-24">
                <div className="grid grid-cols-[1.1fr_1.2fr] space-x-4">
                    <Card className="max-w-full h-fit p-4 ">
                        <CardHeader className="font-semibold text-2xl">Send us a message</CardHeader>
                        <CardBody className="overflow-hidden">
                            <form onSubmit={contactform.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                                <Input
                                    isRequired
                                    label="name"
                                    isInvalid={!!contactform.formState.errors.name}
                                    errorMessage={contactform.formState.errors.name?.message}
                                    placeholder="Enter your name"
                                    {...contactform.register("name")}
                                />
                                <Input
                                    isRequired
                                    label="email"
                                    isInvalid={!!contactform.formState.errors.email}
                                    errorMessage={contactform.formState.errors.email?.message}
                                    placeholder="Enter your email"
                                    {...contactform.register("email")}
                                />
                                <Input
                                    label="subject"
                                    isInvalid={!!contactform.formState.errors.subject}
                                    errorMessage={contactform.formState.errors.subject?.message}
                                    placeholder="Enter your subject"
                                    {...contactform.register("subject")}
                                />
                                <Input
                                    isRequired
                                    label="message"
                                    isInvalid={!!contactform.formState.errors.message}
                                    errorMessage={contactform.formState.errors.message?.message}
                                    placeholder="Enter your message"
                                    {...contactform.register("message")}
                                />
                                <Button color='primary' type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                </Button>
                            </form>
                        </CardBody>
                    </Card>
                    <div className="font-Cormorant text-4xl flex items-center justify-center font-semibold text-bprimary">
                        Want to place a custom order,<br /> or just want to say hello?
                    </div>
                </div>
            </div>
        </div>
    )
}
