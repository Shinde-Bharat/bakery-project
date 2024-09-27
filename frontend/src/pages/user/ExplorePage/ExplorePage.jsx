
import { useState, useEffect } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { CheckboxGroup, Checkbox } from "@nextui-org/react"
import { Slider } from "@nextui-org/react"
import { Filter, Search, StarIcon } from "lucide-react"
import { Input } from "@nextui-org/react"
import ProductCard from "@/components/utility/ProductCard"
import { getAllProducts } from "@/services/apis/products"
import { getAllCategories } from "@/services/apis/categories"
import { toast } from "@/hooks/use-toast"

export default function ExplorePage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategories, setSelectedCategories] = useState([])
    const [priceRange, setPriceRange] = useState([0, 1000])
    const [minRating, setMinRating] = useState(0)
    const [sortBy, setSortBy] = useState("popularity")
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchProductsAndCategories()
    }, [])

    const fetchProductsAndCategories = async () => {
        try {
            const [productsData, categoriesData] = await Promise.all([
                getAllProducts(),
                getAllCategories()
            ])
            setProducts(productsData)
            setCategories(categoriesData)
            let maxPrice = Math.max(...productsData.map(p => p.price))
            maxPrice = maxPrice + 50
            setPriceRange([0, maxPrice])
        } catch (error) {
            console.error("Error fetching data:", error)
            toast({
                title: "Error",
                description: "Failed to fetch products and categories. Please try again.",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category._id)
        const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
        const matchesRating = product.rating >= minRating
        return matchesSearch && matchesCategory && matchesPrice && matchesRating
    })

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case "price-low-high":
                return a.price - b.price
            case "price-high-low":
                return b.price - a.price
            case "rating":
                return b.rating - a.rating
            default:
                return 0 // For "popularity", we'll just use the original order
        }
    })

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>
    }

    return (
        <div className="px-24 py-8 font-Manrope">
            <Input
                isClearable
                placeholder="Search Something..."
                radius="full"
                color="ternary"
                size="lg"
                startContent={
                    <Search className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="grid grid-cols-1 md:grid-cols-[0.7fr_1fr_1fr_1fr] gap-8 font-Manrope pt-8">
                {/* Filters */}
                <div className="space-y-6 ">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Categories</h2>
                        {categories.map((category) => (
                            <div key={category._id} className="flex items-center space-x-2">
                                <Checkbox
                                    id={category._id}
                                    isSelected={selectedCategories.includes(category._id)}
                                    onValueChange={(checked) => {
                                        setSelectedCategories(
                                            checked
                                                ? [...selectedCategories, category._id]
                                                : selectedCategories.filter((c) => c !== category._id)
                                        )
                                    }}
                                >
                                    {category.name}
                                </Checkbox>
                            </div>
                        ))}
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2">Price Range</h2>
                        <Slider
                            label="Select a budget"
                            formatOptions={{ style: "currency", currency: "INR" }}
                            step={10}
                            maxValue={500}
                            minValue={10}
                            value={priceRange}
                            onChange={setPriceRange}
                            className="mb-2"
                        />
                        <div className="flex justify-between">
                            <span>₹{priceRange[0]}</span>
                            <span>₹{priceRange[1]}</span>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2">Minimum Rating</h2>
                        <Select value={minRating.toString()} onValueChange={(value) => setMinRating(Number(value))}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select minimum rating" />
                            </SelectTrigger>
                            <SelectContent>
                                {[0, 1, 2, 3, 4].map((rating) => (
                                    <SelectItem key={rating} value={rating.toString()}>
                                        {rating} {rating === 1 ? "star" : "stars"} & up
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="md:col-span-3">
                    <div className="flex justify-between items-center mb-4">
                        <p>{sortedProducts.length} products found</p>
                        <div className="flex items-center space-x-2">
                            <Filter className="text-gray-400" />
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="popularity">Popularity</SelectItem>
                                    <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                                    <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                                    <SelectItem value="rating">Highest Rated</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sortedProducts.map((product) => (
                            <ProductCard
                                key={product._id}
                                product={product}

                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}