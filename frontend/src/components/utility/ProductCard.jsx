import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Image, Tooltip } from "@nextui-org/react";
import { button } from "@nextui-org/theme";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Accepting product details and action handlers as props
export default function ProductCard({ product, onAddToCart, onRemoveFromFavorites, inCart }) {
    const navigate = useNavigate();

    return (

        <Card className="w-fit mt-6 font-Montserrat" isBlurred>
            <CardBody className="overflow-visible">

                <Image
                    alt={product.name}
                    isBlurred
                    onClick={() => { navigate('/product') }}
                    isZoomed

                    className="object-cover rounded-xl cursor-pointer aspect-square"
                    src={"https://nextui.org/images/fruit-2.jpeg"}
                    width={240}
                />
            </CardBody>
            <CardFooter className="pb-0 flex flex-col items-stretch">
                <div className="flex justify-between">
                    <Tooltip content={product.name}>
                        <h4 onClick={() => { navigate('/product') }} className="text-medium font-bold text-bprimary cursor-pointer w-4/5 text-nowrap text-ellipsis overflow-hidden">{product.name}</h4>
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
                                e.stopPropagation(); // Prevent click from bubbling to the card
                                onRemoveFromFavorites();
                            }}
                        >
                            <Heart className="text-bsecondary" />
                        </Button>
                        <Button
                            isIconOnly
                            className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                            radius="full"
                            variant="light"
                            disabled={inCart} // Disable button if in cart
                            onPress={(e) => {
                                e.stopPropagation(); // Prevent click from bubbling to the card
                                onAddToCart();
                            }}
                        >
                            {inCart ? <ShoppingCart className="text-bsecondary" fill="#A35A32" /> : <ShoppingCart className="text-bsecondary" />}
                        </Button>
                    </div>
                </div>
            </CardFooter>
        </Card>

    );
}
