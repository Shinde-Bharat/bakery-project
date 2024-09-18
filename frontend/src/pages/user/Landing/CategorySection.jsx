import React, { useState } from 'react';
import CategoryCard from './CategoryCard';
import ProductCard from '../../../components/utility/ProductCard';
import SectionHeading from '../../../components/utility/SectionHeading';
import bun from '../../../assets/categories/bun.png';
import croinssant from '../../../assets/categories/croinssant.png';

function CategorySection() {

    const categories = [
        {
            id: 1,
            categoryName: "Cakes",
            image: bun, // Replace with actual image URL
        },
        {
            id: 2,
            categoryName: "Pastries",
            image: croinssant, // Replace with actual image URL
        },
        {
            id: 3,
            categoryName: "Breads",
            image: bun, // Replace with actual image URL
        },
        {
            id: 4,
            categoryName: "Cookies",
            image: croinssant, // Replace with actual image URL
        },
        {
            id: 5,
            categoryName: "Cupcakes",
            image: bun, // Replace with actual image URL
        }
    ];

    const bakeryData = [
        { id: 1, name: "Chocolate Cake", price: 499, image: "/cake1.jpg", rating: 4.8, category: "Cakes" },
        { id: 2, name: "Strawberry Cheesecake", price: 599, image: "/cake2.jpg", rating: 4.6, category: "Cakes" },
        { id: 3, name: "Blueberry Muffin", price: 199, image: "/muffin.jpg", rating: 4.7, category: "Pastries" },
        { id: 4, name: "Donut", price: 99, image: "/donut.jpg", rating: 4.5, category: "Pastries" },
        { id: 5, name: "Red Velvet Cupcake", price: 149, image: "/cupcake.jpg", rating: 4.9, category: "Cupcakes" },
        { id: 6, name: "Croissant", price: 79, image: "/croissant.jpg", rating: 4.3, category: "Breads" },
    ];

    const [selectedCategory, setSelectedCategory] = useState("Cakes");

    // Function to handle category selection
    const handleCategoryClick = (categoryName) => {
        setSelectedCategory(categoryName);
    };

    // Filter the products based on the selected category
    const filteredProducts = selectedCategory
        ? bakeryData.filter((product) => product.category === selectedCategory)
        : bakeryData; // Show all products if no category is selected

    const addToCart = (id) => {
        console.log("Added to cart:", id);
    };

    const removeFromFavorites = (id) => {
        console.log("Removed from favorites:", id);
    };

    return (
        <div className='my-4'>
            <SectionHeading heading={"Category"} />

            <div className="flex justify-around">
                <div className="flex justify-around gap-4">
                    {categories.map((category) => (
                        <CategoryCard
                            key={category.id}
                            id={category.id}
                            categoryName={category.categoryName}
                            img={category.image}
                            isClicked={category.categoryName === selectedCategory}
                            handleCategoryClick={() => handleCategoryClick(category.categoryName)} // Pass categoryName here
                        />
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-4 my-12">
                {filteredProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={() => addToCart(product.id)}
                        onRemoveFromFavorites={() => removeFromFavorites(product.id)}
                    />
                ))}
            </div>
        </div>
    );
}

export default CategorySection;
