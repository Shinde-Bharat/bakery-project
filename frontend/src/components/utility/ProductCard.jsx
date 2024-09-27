import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Chip, Image, Tooltip } from "@nextui-org/react";
import { button } from "@nextui-org/theme";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import cake from '../../assets/categories/cake.jpg'
import { useCart, useWishlist } from "@/hooks/reduxHooks";
// Accepting product details and action handlers as props
export default function ProductCard({ product, onAddToCart, onRemoveFromFavorites, inCart }) {

    const navigate = useNavigate();
    const { addToWishlist, wishlist, removeFromWishlist } = useWishlist()
    const { cart, addItem, removeItem } = useCart()

    const isInWishlist = wishlist.some(item => item._id === product._id);
    const isInCart = cart.items.some(item => item._id === product._id);

    return (

        <Card className="w-fit mt-6 font-Montserrat hover:scale-105 hover:transition-all hover:ease-in" isBlurred>
            <CardBody className="overflow-visible relative">
                <div className="absolute z-20 top-5 left-5">
                    <Chip color="primary" size="sm" variant="shadow">{product.category?.name}</Chip>
                </div>
                <Image
                    alt={product.name}
                    isBlurred
                    onClick={() => { navigate(`/product/${product._id}`) }}
                    isZoomed
                    className="object-cover rounded-xl cursor-pointer aspect-square"
                    src={product.imageURL}
                    // src={"https://nextui.org/images/fruit-2.jpeg"}
                    width={240}
                />
            </CardBody>
            <CardFooter className="pb-0 flex flex-col items-stretch">
                <div className="flex justify-between">
                    <Tooltip content={product.name}>
                        <h4 onClick={() => { navigate(`/product/${product._id}`) }} className="text-medium font-bold text-bprimary cursor-pointer w-4/5 text-nowrap text-ellipsis overflow-hidden">{product.name}</h4>
                    </Tooltip>
                    {/* Ratings */}
                    <div className="flex items-center">
                        <Star fill="#A35A32" stroke="0" className="h-5" />
                        <span className="text-bsecondary font-bold text-base">{product.rating}</span>
                    </div>
                </div>

                <div className="flex justify-between mt-1">
                    <p className="text-xl font-bold text-bprimary">
                        <span className="text-base mr-1">₹</span>
                        {product.price.toFixed(2)}
                    </p>

                    {/* Buttons */}
                    <div className="flex gap-1">
                        <Button
                            isIconOnly
                            className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                            radius="full"
                            variant="light"
                            onPress={(e) => {
                                // onRemoveFromFavorites();
                                if (isInWishlist) {
                                    removeFromWishlist(product._id); // Function to remove item from cart
                                } else {
                                    addToWishlist(product); // Function to add item to cart
                                }
                            }}
                        >
                            {isInWishlist ? (
                                <Heart className="text-bsecondary" fill="#A35A32" />) : <Heart className="text-bsecondary" />
                            }
                        </Button>
                        <Button
                            isIconOnly
                            className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                            radius="full"
                            variant="light"
                            // disabled={inCart} // Disable button if in cart
                            onPress={(e) => {
                                if (isInCart) {
                                    removeItem(product._id); // Function to remove item from cart
                                } else {
                                    addItem(product); // Function to add item to cart
                                }
                            }}
                        >
                            {isInCart ? <ShoppingCart className="text-bsecondary" fill="#A35A32" /> : <ShoppingCart className="text-bsecondary" />}
                        </Button>
                    </div>
                </div>
            </CardFooter>
        </Card>

    );
}
