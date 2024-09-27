import React, { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard';
import ProductCard from '../../../components/utility/ProductCard';
import SectionHeading from '../../../components/utility/SectionHeading';
import bun from '../../../assets/categories/bun.png';
import bagutte from '../../../assets/categories/bagutte.png';
import croinssant from '../../../assets/categories/croinssant.png';
import cupcake from '../../../assets/categories/cupcake.png';
import donut from '../../../assets/categories/donut.png';
import { getAllProducts } from '@/services/apis/products';
import { getAllCategories } from '@/services/apis/categories';

function CategorySection() {

    const [bakeryData, setbakeryData] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState();

    useEffect(() => {
        // Function to fetch data
        const fetchData = async () => {
            try {
                const products = await getAllProducts()
                setbakeryData(products);
                const categories = await getAllCategories()
                setCategories(categories)
                setSelectedCategory(categories[0]?.name)
            } catch (error) {
                console.log(error);

            }
        };

        fetchData(); // Invoke the fetch function when the component mounts
    }, []);
    // console.log(categories);


    // Function to handle category selection
    const handleCategoryClick = (categoryName) => {
        setSelectedCategory(categoryName);
    };

    // Filter the products based on the selected category
    const filteredProducts = selectedCategory && bakeryData
        ?
        bakeryData.filter((product) => product.category?.name === selectedCategory)
        : bakeryData; // Show all products if no category is selected

    console.log("filterd", filteredProducts);



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
                            key={category._id}
                            id={category._id}
                            categoryName={category.name}
                            img={category.imgURL}
                            isClicked={category.name === selectedCategory}
                            handleCategoryClick={() => handleCategoryClick(category.name)} // Pass categoryName here
                        />
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-4 my-12">
                {filteredProducts.map((product) => (
                    <ProductCard
                        key={product._id}
                        product={product}
                        onAddToCart={() => addToCart(product._id)}
                        onRemoveFromFavorites={() => removeFromFavorites(product._id)}
                    />
                ))}
            </div>
        </div>
    );
}

export default CategorySection;
