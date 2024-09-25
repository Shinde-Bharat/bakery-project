import { Tabs, Tab, Input, Link, Button, Card, CardBody } from "@nextui-org/react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";
import { loginDeliveryBoy } from "@/services/apis/delivery";

// Define the login and register schemas with zod
const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

function DeliveryLogin() {
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate();

    // Setup forms with react-hook-form and zodResolver for validation
    const loginForm = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // Handle login submission
    const onLoginSubmit = async (values) => {
        try {
            const response = await loginDeliveryBoy(values);
            console.log(response);

            localStorage.setItem('user', JSON.stringify({
                token: response.token, // Assuming the API returns the token
                refreshToken: response?.refreshToken // If refreshToken is returned
            }));

            if (response?.token) {

                toast({
                    title: "Login Successful",
                    description: "Welcome back!",
                });
                navigate('/delivery');
            }
        } catch (error) {
            console.log(error);

            toast({
                title: "Login Failed",
                description: "Please check your credentials and try again.",
                variant: "destructive",
            });
        }
    };


    return (
        <div className="flex items-center justify-center bg-bternary  h-screen w-full">

            <Card className="max-w-full h-fit w-[340px] ">
                <CardBody className="overflow-hidden">
                    {/* Login Form */}
                    <div key="login" title="Login">
                        <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="flex flex-col gap-4">
                            <h1 className="text-2xl font-semibold">Delivery Login</h1>
                            <Input
                                isRequired
                                label="Email"
                                isInvalid={!!loginForm.formState.errors.email}
                                errorMessage={loginForm.formState.errors.email?.message}
                                placeholder="Enter your email"
                                {...loginForm.register("email")}
                            />


                            <Input
                                isRequired
                                label="Password"
                                placeholder="Enter your password"
                                isInvalid={!!loginForm.formState.errors.password}
                                errorMessage={loginForm.formState.errors.password?.message}
                                type={showPassword ? "text" : "password"}
                                endContent={
                                    <button className="focus:outline-none" type="button" onClick={() => setShowPassword(!showPassword)} aria-label="toggle password visibility">
                                        {showPassword ? (
                                            <Eye className="text-2xl text-default-400 pointer-events-none" />
                                        ) : (
                                            <EyeOff className="text-2xl text-default-400 pointer-events-none" />
                                        )}
                                    </button>
                                }

                                {...loginForm.register("password")}
                            />


                            <div className="flex gap-2 justify-end">
                                <Button type="submit" fullWidth color="primary">
                                    Login
                                </Button>
                            </div>
                        </form>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

export default DeliveryLogin