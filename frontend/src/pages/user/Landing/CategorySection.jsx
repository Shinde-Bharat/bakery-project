import React, { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard';
import ProductCard from '../../../components/utility/ProductCard';
import SectionHeading from '../../../components/utility/SectionHeading';
import bun from '../../../assets/categories/bun.png';
import bagutte from '../../../assets/categories/bagutte.png';
import croinssant from '../../../assets/categories/croinssant.png';
import cupcake from '../../../assets/categories/cupcake.png';
import donut from '../../../assets/categories/donut.png';

function CategorySection() {

    const [bakeryData, setbakeryData] = useState([])
    useEffect(() => {
        // Function to fetch data
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/products/');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const result = await response.json();
                setbakeryData(result); // Set the fetched data
            } catch (error) {
                console.log(error);

            }
        };

        fetchData(); // Invoke the fetch function when the component mounts
    }, []);
    // console.log(bakeryData[0]);

    const categories = [
        {
            id: 1,
            categoryName: "Cake",
            image: cupcake, // Replace with actual image URL
        },
        {
            id: 2,
            categoryName: "Croinssant",
            image: croinssant, // Replace with actual image URL
        },
        {
            id: 3,
            categoryName: "Bun",
            image: bun, // Replace with actual image URL
        },
        {
            id: 4,
            categoryName: "Bagutte",
            image: bagutte, // Replace with actual image URL
        },
        {
            id: 5,
            categoryName: "Donut",
            image: donut, // Replace with actual image URL
        }
    ];


    const [selectedCategory, setSelectedCategory] = useState("Cake");

    // Function to handle category selection
    const handleCategoryClick = (categoryName) => {
        setSelectedCategory(categoryName);
    };

    // Filter the products based on the selected category
    const filteredProducts = selectedCategory && bakeryData
        ?
        bakeryData.filter((product) => product.category?.name === selectedCategory)
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
                <div className="flex justify-around gap-8">
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
                        key={product._id}
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
