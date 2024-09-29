import { useEffect, useState } from 'react'
import { Heart, Minus, Plus, ShoppingCart, Star } from 'lucide-react'
import { Button } from "@nextui-org/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, Tab } from "@nextui-org/tabs";
import ProductCard from '@/components/utility/ProductCard';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart, useWishlist, useUser } from '@/hooks/reduxHooks';
import { getProduct, addReview, getRecommendations } from '@/services/apis/products';
import { Image, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input, Textarea } from '@nextui-org/react';
import { toast } from '@/hooks/use-toast';

export default function ProductDetails() {
    const [quantity, setQuantity] = useState(1)
    const [product, setProduct] = useState(null)
    const navigate = useNavigate()
    const [recommendations, setRecommendations] = useState([])
    const [reviewText, setReviewText] = useState('')
    const [reviewRating, setReviewRating] = useState(0)
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { addToWishlist, wishlist, removeFromWishlist } = useWishlist()
    const { cart, addItem, removeItem, updateItemQuantity } = useCart()
    const { user } = useUser()

    const { id } = useParams()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const productData = await getProduct(id)
                setProduct(productData)

                const cartItem = cart.items.find(item => item._id === productData._id)
                setQuantity(cartItem ? cartItem.quantity : 1)

                const recommendationsData = await getRecommendations(id)
                setRecommendations(recommendationsData)
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


    const handleAddReview = async () => {
        if (!user.isLoggedIn) {
            toast({
                title: "Login Required",
                description: "You must be logged in to add a review.",
                variant: "warning",
            });
            return;
        }

        try {
            await addReview(product._id, { text: reviewText, rating: reviewRating });
            const updatedProduct = await getProduct(id);
            setProduct(updatedProduct);
            onClose();
            toast({
                title: "Review Added",
                description: "Your review has been successfully added.",
                variant: "success",
            });
        } catch (error) {
            console.error("Error adding review:", error);
            toast({
                title: "Error",
                description: "Failed to add review. Please try again.",
                variant: "destructive",
            });
        }
    }



    console.log("recommendations;", recommendations);



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
                                <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                            ))}
                            <span className="ml-2 text-sm text-gray-600">{Math.floor(product.averageRating)} Rating ({product.reviews.length} reviews)</span>
                        </div>
                        <p className="text-2xl font-bold text-primary mb-4">₹{product.price.toFixed(2)}</p>
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
                                            <span className="font-bold mr-2">{review.user.name}</span>
                                            <div className="flex">
                                                {Array(5).fill(0).map((_, i) => (
                                                    <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                                                ))}
                                            </div>
                                        </div>
                                        <p>{review.text}</p>
                                        {index < product.reviews.length - 1 && <Separator className="my-4" />}
                                    </div>
                                ))}
                            </CardContent>
                            <CardFooter>
                                {
                                    user.isLoggedIn ?
                                        <Button variant="outline" onPress={onOpen}>Write a Review</Button> :
                                        <Button variant="outline" >Login to review</Button>
                                }

                            </CardFooter>
                        </Card>
                    </Tab>
                </Tabs>

                <Separator className="my-12" />

                {
                    recommendations.length > 0 &&
                    <section>
                        <h2 className="text-2xl font-bold mb-6 text-bprimary">You May Also Like</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                            {recommendations.map((product) => (
                                <ProductCard
                                    key={product._id}
                                    product={product}

                                />
                            ))}
                        </div>
                    </section>
                }

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalContent>
                        <ModalHeader>Write a Review</ModalHeader>
                        <ModalBody>
                            <div className="flex mb-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={`w-6 h-6 cursor-pointer ${star <= reviewRating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                        onClick={() => setReviewRating(star)}
                                    />
                                ))}
                            </div>
                            <Textarea
                                placeholder="Write your review here..."
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Cancel
                            </Button>
                            <Button color="primary" onPress={handleAddReview}>
                                Submit Review
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </div>
        }

        </>

    )
}