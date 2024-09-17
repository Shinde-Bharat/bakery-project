import React from 'react'
import CategoryCard from './CategoryCard'
import ProductCard from '../../components/utility/ProductCard'
import SectionHeading from '../../components/utility/SectionHeading'


function CategorySection() {
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

                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>
        </div>

    )
}

export default CategorySection