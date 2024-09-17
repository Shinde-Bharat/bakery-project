import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


export default function ProductCard() {
    const navigate = useNavigate();
    const handleCardClick = () => {
        // Navigate to the details page
        navigate('/details');
    };

    return (
        <Card className=" w-fit mt-6" isBlurred >
            <CardBody className="overflow-visible ">
                <img
                    alt="Card background"
                    className="object-cover rounded-xl aspect-square "
                    src="https://nextui.org/images/fruit-2.jpeg"
                    width={240}
                />
            </CardBody>
            <CardFooter className="pb-0 flex flex-col items-stretch">
                <div className="flex justify-between">
                    <h4 className="text-medium font-bold text-bprimary">Donut Cake</h4>
                    {/* ratings */}
                    <div className="flex items-center">
                        <Star fill="#A35A32" stroke="0" className="h-5" />
                        <span className="text-bseondary font-bold text-base">4.7</span>
                    </div>

                </div>


                <div className="flex justify-between mt-1">
                    <p className="text-xl font-bold text-bprimary"><span className="text-base mr-1">₹</span>50</p>

                    {/* buttons */}
                    <div className="flex gap-1">

                        <Button
                            isIconOnly
                            className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                            radius="full"
                            variant="light"

                            onPress={() => { }}
                        >
                            <Heart className="text-bseondary" fill="#A35A32" />
                        </Button>
                        <Button
                            isIconOnly
                            className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                            radius="full"
                            variant="light"
                            onPress={() => { }}
                        >
                            <ShoppingCart className="text-bseondary" />
                        </Button>
                    </div>

                </div>

            </CardFooter>


        </Card>
    )
}
