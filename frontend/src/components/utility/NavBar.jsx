import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, Input } from "@nextui-org/react";
import { Heart, SearchIcon, ShoppingCart } from "lucide-react";
import { useState } from "react";

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuItems = [
        "Profile",
        "Dashboard",
        "Activity",
        "Analytics",
        "Log Out",
    ];
    // shouldHideOnScroll isBordered
    return (
        <Navbar shouldHideOnScroll isBordered onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <p className="font-bold text-inherit">Bakery</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Home
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link href="#" aria-current="page">
                        Categories
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Contact US
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">

                <NavbarItem>
                    <Button
                        isIconOnly
                        radius="full"
                        variant="flat"
                        onPress={() => { }}
                    >
                        <Heart className="text-bseondary" fill="#A35A32" />
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <Button
                        isIconOnly
                        radius="full"
                        variant="flat"
                        onPress={() => { }}
                    >
                        <ShoppingCart className="text-bseondary" fill="#A35A32" />
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} color="primary" href="#" variant="flat" radius="full">
                        Log in
                    </Button>
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            color={
                                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            className="w-full"
                            href="#"
                            size="lg"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}