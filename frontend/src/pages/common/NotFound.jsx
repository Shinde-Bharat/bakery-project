import { Button } from "@nextui-org/button";
import { NavLink } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
                <h2 className="text-3xl font-semibold mb-4">Oops! This page is half-baked.</h2>
                <p className="text-xl text-muted-foreground mb-8">
                    Looks like our baker forgot to put this page in the oven.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button asChild>
                        <NavLink to="/">
                            Return to Home
                        </NavLink>
                    </Button>
                    <Button variant="outline" asChild>
                        <NavLink to="/explore">
                            View Our products
                        </NavLink>
                    </Button>
                </div>
            </div>
            <div className="mt-12">
                <img
                    src="/placeholder.svg?height=200&width=200"
                    alt="A sad cupcake"
                    className="w-48 h-48 mx-auto"
                />
            </div>
        </div>
    )
}