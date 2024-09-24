import { useEffect, useState } from 'react'
import { Heart, Minus, Plus, ShoppingCart, Star } from 'lucide-react'
import { Button } from "@nextui-org/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, Tab } from "@nextui-org/tabs";
import ProductCard from '@/components/utility/ProductCard';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart, useWishlist } from '@/hooks/reduxHooks';
import { getProduct } from '@/services/apis/products';
import { Image } from '@nextui-org/react';
import { toast } from '@/hooks/use-toast';

export default function ProductDetails() {
    const [quantity, setQuantity] = useState(1)
    const [product, setProduct] = useState(null)
    const navigate = useNavigate()

    const { addToWishlist, wishlist, removeFromWishlist } = useWishlist()
    const { cart, addItem, removeItem, updateItemQuantity } = useCart()

    const { id } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productData = await getProduct(id)
                // console.log("product data ", productData);
                setProduct(productData)

                // Set initial quantity to 1 or the cart item quantity if it exists
                const cartItem = cart.items.find(item => item._id === productData._id)
                setQuantity(cartItem ? cartItem.quantity : 1)
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [id]);

    const isInWishlist = product && wishlist.some(item => item._id === product._id);
    const isInCart = product && cart.items.some(item => item._id === product._id);

    const handleQuantityChange = (amount) => {
        if (!product) return;

        const newQuantity = quantity + amount;
        if (newQuantity < 1) {
            toast({
                title: "Minimum quantity reached",
                description: "Quantity cannot be less than 1.",
                variant: "warning",
            });
            return;
        }
        if (newQuantity > product.avlQuantity) {
            toast({
                title: "Maximum quantity reached",
                description: `Only ${product.avlQuantity} items available in stock.`,
                variant: "warning",
            });
            return;
        }
        setQuantity(newQuantity);

        // Update cart if the item is already in the cart
        if (isInCart) {
            updateItemQuantity(product._id, newQuantity);
            console.log(cart);

        }
    }

    if (!product) {
        return <div>Loading...</div>; // Or any loading indicator
    }


    // const product = {
    //     name: "Chocolate Delight Cupcake",
    //     price: 3.99,
    //     description: "Indulge in our rich, moist chocolate cupcake topped with a swirl of creamy chocolate frosting. Each bite is a heavenly experience for chocolate lovers.",
    //     image: "https://g-l--q8r-vryke.vusercontent.net/placeholder.svg?height=400&width=400",
    //     rating: 4.8,
    //     reviews: [
    //         { author: "Jane Doe", rating: 5, comment: "Absolutely delicious! The chocolate flavor is intense and satisfying." },
    //         { author: "John Smith", rating: 4, comment: "Great cupcake, but a bit too sweet for my taste." },
    //     ],
    // }

    const bakeryData = [
        { id: 1, name: "Chocolate Cake", price: 499, image: "/cake1.jpg", rating: 4.8 },
        { id: 2, name: "Strawberry Cheesecake", price: 599, image: "/cake2.jpg", rating: 4.6 },
        { id: 3, name: "Blueberry Muffin", price: 199, image: "/muffin.jpg", rating: 4.7 },
        { id: 4, name: "Donut", price: 99, image: "/donut.jpg", rating: 4.5 },
        { id: 5, name: "Red Velvet Cupcake", price: 149, image: "/cupcake.jpg", rating: 4.9 },
        { id: 6, name: "Croissant", price: 79, image: "/croissant.jpg", rating: 4.3 },
    ];

    // const isInWishlist = wishlist.some(item => item._id === product?._id);
    // const isInCart = cart.items.some(item => item.product._id === product?._id);


    return (
        <> {
            product && <div className="container  px-24 py-8 font-Montserrat">
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <Image isBlurred src={product.imageURL} alt={product.name} className="w-full h-auto rounded-lg shadow-lg" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                        <h1 className="text-lg text-slate-800 font-semibold mb-2">{product.category.name}</h1>
                        <div className="flex items-center mb-4">
                            {Array(5).fill(0).map((_, i) => (
                                <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                            ))}
                            <span className="ml-2 text-sm text-gray-600">{product.rating} ({product.reviews.length} reviews)</span>
                        </div>
                        <p className="text-2xl font-bold text-primary mb-4">${product.price.toFixed(2)}</p>
                        <p className="mb-6">{product.description}</p>
                        <div className="flex items-center mb-6">
                            <Button color='primary' variant="flat" size="icon" onClick={() => handleQuantityChange(-1)}>
                                <Minus className="h-4 w-4" />
                            </Button>
                            <span className="mx-4 text-xl font-bold">{quantity}</span>
                            <Button color='primary' variant="flat" size="icon" onClick={() => handleQuantityChange(1)}>
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="flex space-x-4">
                            <Button radius='full' className='flex-1 text-white px-4' variant="shadow" color='primary'
                                onPress={(e) => {
                                    if (isInCart) {
                                        removeItem(product._id); // Function to remove item from cart
                                    } else {
                                        addItem(product); // Function to add item to cart
                                    }
                                }}
                            >
                                <ShoppingCart className="mr-2 h-4 w-4" /> {isInCart ? "Already added " : "Add "} to Cart
                            </Button>
                            <Button
                                isIconOnly
                                radius="full"
                                variant="flat"
                                color='primary'
                                onPress={(e) => {
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
                        </div>
                    </div>
                </div>

                <Separator className="my-12" />

                <Tabs aria-label="Options" color='ternary' radius='full'>

                    <Tab key="Description" title="Description">
                        <Card className="rounded-2xl">
                            <CardHeader>
                                <CardTitle>Product Description</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{product.description}</p>
                                <ul className="list-disc list-inside mt-4">
                                    <li>Made with premium cocoa powder</li>
                                    <li>Topped with rich chocolate frosting</li>
                                    <li>Baked fresh daily</li>
                                    <li>Perfect for birthdays and special occasions</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </Tab>
                    <Tab key="Reviews" title="Reviews">
                        <Card>
                            <CardHeader>
                                <CardTitle>Customer Reviews</CardTitle>
                                <CardDescription>Read what our customers have to say about this product</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {product.reviews.map((review, index) => (
                                    <div key={index} className="mb-4 last:mb-0">
                                        <div className="flex items-center mb-2">
                                            <span className="font-bold mr-2">{review.author}</span>
                                            <div className="flex">
                                                {Array(5).fill(0).map((_, i) => (
                                                    <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                                                ))}
                                            </div>
                                        </div>
                                        <p>{review.comment}</p>
                                        {index < product.reviews.length - 1 && <Separator className="my-4" />}
                                    </div>
                                ))}
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline">Write a Review</Button>
                            </CardFooter>
                        </Card>
                    </Tab>
                </Tabs>

                <Separator className="my-12" />

                <section>
                    <h2 className="text-2xl font-bold mb-6 text-bprimary">You May Also Like</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {bakeryData.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onAddToCart={() => addToCart(product.id)}
                                onRemoveFromFavorites={() => removeFromFavorites(product.id)}

                            />
                        ))}
                    </div>
                </section>
            </div>
        }

        </>

    )
}