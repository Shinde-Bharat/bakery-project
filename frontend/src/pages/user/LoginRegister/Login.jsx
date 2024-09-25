import { Tabs, Tab, Input, Link, Button, Card, CardBody } from "@nextui-org/react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { getUserProfile, loginUser, registerUser } from '@/services/apis/user';
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";
import { useUser } from "@/hooks/reduxHooks";

// Define the login and register schemas with zod
const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const registerSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),

})

export default function Login() {
    const [showPassword, setShowPassword] = useState(false)
    const [selected, setSelected] = useState("login");
    const navigate = useNavigate();
    const { login, user } = useUser()

    // Setup forms with react-hook-form and zodResolver for validation
    const loginForm = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const registerForm = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    // Handle login submission
    const onLoginSubmit = async (values) => {
        try {
            const response = await loginUser(values);
            console.log(response);

            localStorage.setItem('user', JSON.stringify({
                token: response.token, // Assuming the API returns the token
                refreshToken: response?.refreshToken // If refreshToken is returned
            }));
            // Fetch the full user profile
            const userProfile = await getUserProfile();

            console.log("user data", userProfile);

            const userInfo = {
                name: userProfile?.name,
                email: userProfile?.email,
                phoneNumber: userProfile?.phoneNumber,
                savedAddresses: userProfile?.savedAddresses,
                orderHistory: userProfile?.orderHistory,
                wishlistItems: userProfile?.wishlistItems,
                cartItems: userProfile?.cartItems,
                isLoggedIn: false,

            };

            // Update Redux store with the full user profile
            login(userInfo)
            if (response?.token) {

                toast({
                    title: "Login Successful",
                    description: "Welcome back!",
                });
                navigate('/');
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

    // Handle register submission
    const onRegisterSubmit = async (values) => {
        try {
            const response = await registerUser(values);

            localStorage.setItem('user', JSON.stringify({
                token: response.token, // Assuming the API returns the token
                refreshToken: response?.refreshToken // If refreshToken is returned
            }));



            // Fetch the full user profile
            const userProfile = await getUserProfile();

            console.log("user data", userProfile);

            const userInfo = {
                _id: userProfile?._id,
                name: userProfile?.name,
                email: userProfile?.email,
                phoneNumber: userProfile?.phoneNumber,
                savedAddresses: userProfile?.savedAddresses,
                orderHistory: userProfile?.orderHistory,
                wishlistItems: userProfile?.wishlistItems,
                cartItems: userProfile?.cartItems,
                isLoggedIn: false,

            };

            // Update Redux store with the full user profile
            login(userInfo)

            toast({
                title: "Registration Successful",
                description: "Welcome!",
            });
            navigate('/');
        } catch (error) {
            console.log(error);

            toast({
                title: "Registration Failed",
                description: "An error occurred. Please try again.",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="flex  justify-center  h-screen w-full ">
            <Card className="max-w-full mt-24 h-fit w-[340px] ">
                <CardBody className="overflow-hidden">
                    <Tabs
                        fullWidth
                        size="md"
                        aria-label="Tabs form"
                        selectedKey={selected}
                        onSelectionChange={setSelected}
                    >
                        {/* Login Form */}
                        <Tab key="login" title="Login">
                            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="flex flex-col gap-4">
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


                                <p className="text-center text-small">
                                    Need to create an account?{" "}
                                    <Link size="sm" className="cursor-pointer underline font-semibold hover:bg-bsecondary/15" onPress={() => setSelected("sign-up")}>
                                        Sign up
                                    </Link>
                                </p>
                                <div className="flex gap-2 justify-end">
                                    <Button type="submit" fullWidth color="primary">
                                        Login
                                    </Button>
                                </div>
                            </form>
                        </Tab>

                        {/* Register Form */}
                        <Tab key="sign-up" title="Sign up">
                            <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="flex flex-col gap-4">
                                <Input
                                    isRequired
                                    label="Name"
                                    isInvalid={!!registerForm.formState.errors.name}
                                    errorMessage={registerForm.formState.errors.name?.message}
                                    placeholder="Enter your name"
                                    {...registerForm.register("name")}
                                />


                                <Input
                                    isRequired
                                    label="Email"
                                    isInvalid={!!registerForm.formState.errors.email}
                                    errorMessage={registerForm.formState.errors.email?.message}
                                    placeholder="Enter your email"
                                    {...registerForm.register("email")}
                                />


                                <Input
                                    isRequired
                                    label="Password"
                                    isInvalid={!!registerForm.formState.errors.password}
                                    errorMessage={registerForm.formState.errors.password?.message}
                                    placeholder="Enter your password"
                                    type={showPassword ? "text" : "password"}
                                    {...registerForm.register("password")}
                                    endContent={
                                        <button className="focus:outline-none" type="button" onClick={() => setShowPassword(!showPassword)} aria-label="toggle password visibility">
                                            {showPassword ? (
                                                <Eye className="text-2xl text-default-400 pointer-events-none" />
                                            ) : (
                                                <EyeOff className="text-2xl text-default-400 pointer-events-none" />
                                            )}
                                        </button>
                                    }
                                />
                                {registerForm.formState.errors.password && <span className="text-xs text-red-500 -mt-3">{registerForm.formState.errors.password.message}</span>}


                                <p className="text-center text-small">
                                    Already have an account?{" "}
                                    <Link size="sm" className="cursor-pointer underline font-semibold hover:bg-bsecondary/15" onPress={() => setSelected("login")}>
                                        Login
                                    </Link>
                                </p>
                                <div className="flex gap-2 justify-end">
                                    <Button type="submit" fullWidth color="primary">
                                        Sign up
                                    </Button>
                                </div>
                            </form>
                        </Tab>
                    </Tabs>
                </CardBody>
            </Card>
        </div>
    );
}
