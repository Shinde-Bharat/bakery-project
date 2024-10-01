import { useCart, useUser, useWishlist } from "@/hooks/reduxHooks";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, Input, Badge, Image } from "@nextui-org/react";
import { Heart, SearchIcon, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import logo from '../../assets/logo/logo.png'


export default function NavBar() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { wishlist } = useWishlist()
    const { cart } = useCart()
    const { user } = useUser()



    const navigate = useNavigate()
    const navItems = [
        { name: "Home", path: "/" },
        { name: "Products", path: "/explore" },
        { name: "About Us", path: "/about" },
        { name: "Contact Us", path: "/contact" }
    ];

    // shouldHideOnScroll isBordered
    return (
        <Navbar className="font-Montserrat" shouldHideOnScroll isBordered onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    {/* <p className="font-bold text-inherit">Bakery </p> */}
                    <NavLink to={'/'}>

                        <Image src={logo} alt="Amruta Bakery" width={70} />
                    </NavLink>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {navItems.map((item) => (
                    <NavbarItem key={item.name}>
                        <NavLink
                            to={item.path}
                            className={({ isActive }) =>
                                isActive
                                    ? "text-primary font-bold" // Active class styles
                                    : "text-foreground"        // Default class styles
                            }
                        >
                            {item.name}
                        </NavLink>
                    </NavbarItem>
                ))}
            </NavbarContent>
            <NavbarContent justify="end">

                <NavbarItem>
                    <Badge content={wishlist.length} size="lg" className="bg-blue-500 text-white">
                        <Button
                            isIconOnly
                            radius="full"
                            variant="flat"
                            onPress={() => { navigate('/favorites') }}
                        >
                            <Heart className="text-bsecondary" fill="#A35A32" />
                        </Button>
                    </Badge>
                </NavbarItem>
                <NavbarItem>
                    <Badge content={cart.items.length} size="lg" className="bg-blue-500 text-white">
                        <Button
                            isIconOnly
                            radius="full"
                            variant="flat"
                            onPress={() => { navigate('/cart') }}
                        >
                            <ShoppingCart className="text-bsecondary" fill="#A35A32" />
                        </Button>
                    </Badge>
                </NavbarItem>
                <NavbarItem>
                    {
                        user.isLoggedIn ?
                            <Button isIconOnly color="primary" variant="flat" radius="full" onPress={() => navigate('/profile')}>
                                <Avatar>
                                    <AvatarImage src={user?.avatar} alt={user?.name} />
                                    <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                            </Button>
                            :
                            <Button color="primary" variant="flat" radius="full" onPress={() => navigate('/login')}>
                                Log in
                            </Button>
                    }

                </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
                {navItems.map((item, index) => (
                    <NavbarMenuItem key={`${item.name}-${index}`}>
                        <NavLink
                            color={
                                index === 2 ? "primary" : index === navItems.length - 1 ? "danger" : "foreground"
                            }
                            className="w-full"
                            to={item.path}
                            size="lg"
                        >
                            {item.name}
                        </NavLink>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}