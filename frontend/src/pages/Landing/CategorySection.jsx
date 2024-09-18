import React from 'react'
import CategoryCard from './CategoryCard'
import ProductCard from '../../components/utility/ProductCard'
import SectionHeading from '../../components/utility/SectionHeading'


function CategorySection() {
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

    return (
        <div className='my-4'>

            <SectionHeading heading={"Category"} />

            <div className="flex justify-around">
                <CategoryCard />
                <CategoryCard />
                <CategoryCard isClicked={true} />
                <CategoryCard />
                <CategoryCard />
            </div>

            <div className="grid grid-cols-4 my-12">
                {bakeryData.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={() => addToCart(product.id)}
                        onRemoveFromFavorites={() => removeFromFavorites(product.id)}

                    />
                ))}
            </div>
        </div>

    )
}

export default CategorySection