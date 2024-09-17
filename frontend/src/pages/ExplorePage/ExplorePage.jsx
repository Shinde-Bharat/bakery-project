
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectItem } from "@nextui-org/react";

import { CheckboxGroup, Checkbox } from "@nextui-org/react";
import { Slider } from "@nextui-org/react";
import { Search, StarIcon } from "lucide-react"
import { Input } from "@nextui-org/react"
import ProductCard from "@/components/utility/ProductCard";

// Mock data for demonstration
const categories = ["Electronics", "Clothing", "Books", "Home & Garden", "Toys"]
const products = [
    { id: 1, name: "Smartphone", category: "Electronics", price: 599, rating: 4.5, image: "/placeholder.svg" },
    { id: 2, name: "T-shirt", category: "Clothing", price: 19.99, rating: 4.0, image: "/placeholder.svg" },
    { id: 3, name: "Novel", category: "Books", price: 12.99, rating: 4.2, image: "/placeholder.svg" },
    { id: 4, name: "Coffee Maker", category: "Home & Garden", price: 79.99, rating: 4.7, image: "/placeholder.svg" },
    { id: 5, name: "Action Figure", category: "Toys", price: 24.99, rating: 3.8, image: "/placeholder.svg" },
    // Add more mock products as needed
]

export default function ExplorePage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategories, setSelectedCategories] = useState([])
    const [priceRange, setPriceRange] = useState([0, 1000])
    const [minRating, setMinRating] = useState(0)
    const [sortBy, setSortBy] = useState("popularity")

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
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

    return (
        <div className=" px-24 py-8 font-Manrope">

            <Input
                label="Search"
                isClearable
                placeholder="Search Something..."
                radius="full"
                color="ternary"
                size="lg"
                startContent={
                    <Search className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
            />

            <div className="grid grid-cols-1 md:grid-cols-[0.7fr_1fr_1fr_1fr] gap-8 font-Manrope pt-8">
                {/* Filters */}
                <div className="space-y-6 ">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Categories</h2>

                        {categories.map((category) => (
                            <div key={category} className="flex items-center space-x-2">
                                <Checkbox
                                    id={category}
                                    isSelected={selectedCategories.includes(category)}
                                    onValueChange={(checked) => {
                                        setSelectedCategories(
                                            checked
                                                ? [...selectedCategories, category]
                                                : selectedCategories.filter((c) => c !== category)
                                        )
                                    }}
                                >
                                    {category}
                                </Checkbox>

                            </div>
                        ))}
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2">Price Range</h2>
                        <Slider
                            label="Select a budget"
                            formatOptions={{ style: "currency", currency: "USD" }}
                            step={10}
                            maxValue={1000}
                            minValue={0}
                            value={priceRange}
                            onChange={setPriceRange}
                            className="mb-2"
                        />

                        <div className="flex justify-between">
                            <span>${priceRange[0]}</span>
                            <span>${priceRange[1]}</span>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2">Minimum Rating</h2>
                        <Select selectedKeys={minRating.toString()} onSelectionChange={(value) => setMinRating(Number(value))}>

                            {[0, 1, 2, 3, 4].map((rating) => (
                                <SelectItem key={rating}>
                                    {rating} {rating === 1 ? "star" : "stars"} & up
                                </SelectItem>
                            ))}

                        </Select>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="md:col-span-3">
                    <div className="flex justify-between items-center mb-4">
                        <p>{sortedProducts.length} products found</p>
                        <Select
                            labelPlacement={'outside-left'}
                            label="Sort by"
                            className="max-w-xs"
                            selectedKeys={sortBy}
                            onSelectionChange={setSortBy}
                        >

                            <SelectItem key="popularity">Popularity</SelectItem>
                            <SelectItem key="price-low-high">Price: Low to High</SelectItem>
                            <SelectItem key="price-high-low">Price: High to Low</SelectItem>
                            <SelectItem key="rating">Highest Rated</SelectItem>

                        </Select>


                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sortedProducts.map((product) => (
                            <ProductCard />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}