import React from 'react'

// import image from '../../../assets/image.png'
import { Image } from '@nextui-org/react'
function CategoryCard({ id, isClicked, categoryName, img, handleCategoryClick }) {
    return (
        <div onClick={() => { handleCategoryClick(id) }} className={` p-4 rounded-xl cursor-pointer hover:bg-bsecondary/10 h-28 w-28 flex flex-col items-center justify-between ${isClicked ? 'bg-bsecondary/20 scale-105 transition-all ease-in' : ''}`}>
            <Image isBlurred className='rounded-lg aspect-square' src={img} height={60} width={60} />
            <p className={` font-semibold text-bsecondary `}>{categoryName}</p>

        </div>
    )
}

export default CategoryCard