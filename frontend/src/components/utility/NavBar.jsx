import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, Input } from "@nextui-org/react";
import { Heart, SearchIcon, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate()
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
                    <NavLink color="foreground" to={'/'}>
                        Home
                    </NavLink>
                </NavbarItem>
                <NavbarItem isActive>
                    <NavLink to={'/explore'} aria-current="page">
                        Products
                    </NavLink>
                </NavbarItem>
                <NavbarItem>
                    <NavLink color="foreground" href="#">
                        Contact US
                    </NavLink>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">

                <NavbarItem>
                    <Button
                        isIconOnly
                        radius="full"
                        variant="flat"
                        onPress={() => { navigate('/favorites') }}
                    >
                        <Heart className="text-bsecondary" fill="#A35A32" />
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <Button
                        isIconOnly
                        radius="full"
                        variant="flat"
                        onPress={() => { navigate('/cart/1') }}
                    >
                        <ShoppingCart className="text-bsecondary" fill="#A35A32" />
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <Button color="primary" variant="flat" radius="full">
                        Log in
                    </Button>
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <NavLink
                            color={
                                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            className="w-full"
                            href="#"
                            size="lg"
                        >
                            {item}
                        </NavLink>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}