import { useState } from 'react'
import { Heart, Minus, Plus, ShoppingCart, Star } from 'lucide-react'
import { Button } from "@nextui-org/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, Tab } from "@nextui-org/tabs";
import ProductCard from '@/components/utility/ProductCard';

export default function ProductDetails() {
    const [quantity, setQuantity] = useState(1)
    const [isFavorite, setIsFavorite] = useState(false)

    const product = {
        name: "Chocolate Delight Cupcake",
        price: 3.99,
        description: "Indulge in our rich, moist chocolate cupcake topped with a swirl of creamy chocolate frosting. Each bite is a heavenly experience for chocolate lovers.",
        image: "https://g-l--q8r-vryke.vusercontent.net/placeholder.svg?height=400&width=400",
        rating: 4.8,
        reviews: [
            { author: "Jane Doe", rating: 5, comment: "Absolutely delicious! The chocolate flavor is intense and satisfying." },
            { author: "John Smith", rating: 4, comment: "Great cupcake, but a bit too sweet for my taste." },
        ],
    }

    const bakeryData = [
        { id: 1, name: "Chocolate Cake", price: 499, image: "/cake1.jpg", rating: 4.8 },
        { id: 2, name: "Strawberry Cheesecake", price: 599, image: "/cake2.jpg", rating: 4.6 },
        { id: 3, name: "Blueberry Muffin", price: 199, image: "/muffin.jpg", rating: 4.7 },
        { id: 4, name: "Donut", price: 99, image: "/donut.jpg", rating: 4.5 },
        { id: 5, name: "Red Velvet Cupcake", price: 149, image: "/cupcake.jpg", rating: 4.9 },
        { id: 6, name: "Croissant", price: 79, image: "/croissant.jpg", rating: 4.3 },
    ];

    const addToFavorites = (id) => {
        if (!favorites.includes(id)) {
            setFavorites([...favorites, id]);
        }
    };

    const removeFromFavorites = (id) => {
        setFavorites(favorites.filter((favId) => favId !== id));
    };

    const addToCart = (id) => {
        if (!cart.includes(id)) {
            setCart([...cart, id]);
        }
    };


    const handleQuantityChange = (amount) => {
        setQuantity(Math.max(1, quantity + amount))
    }

    const handleAddToCart = () => {
        console.log(`Added ${quantity} ${product.name}(s) to cart`)
        // Implement actual cart functionality here
    }

    const handleToggleFavorite = () => {
        setIsFavorite(!isFavorite)
        console.log(`${isFavorite ? 'Removed from' : 'Added to'} favorites: ${product.name}`)
        // Implement actual favorites functionality here
    }

    return (
        <div className="container  px-24 py-8 font-Montserrat">
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <img src={product.image} alt={product.name} className="w-full h-auto rounded-lg shadow-lg" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
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
                        <Button radius='full' className='flex-1 text-white px-4' variant="shadow" color='primary' onClick={handleAddToCart}>
                            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                        </Button>
                        <Button
                            isIconOnly
                            radius="full"
                            variant="flat"
                            color='primary'
                            onPress={handleToggleFavorite}
                        >
                            <Heart className="text-bsecondary" />
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
    )
}