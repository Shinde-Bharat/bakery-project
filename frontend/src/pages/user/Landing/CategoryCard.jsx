import React from 'react'

// import image from '../../../assets/image.png'
import { Image } from '@nextui-org/react'
function CategoryCard({ id, isClicked, categoryName, img, handleCategoryClick }) {
    return (
        <div onClick={() => { handleCategoryClick(id) }} className={` p-4 rounded-xl w-fit cursor-pointer ${isClicked ? 'bg-bsecondary/35' : ''}`}>
            <Image isBlurred className='rounded-lg' src={img} alt="" />
            <p className={`text-center font-semibold text-bsecondary ${isClicked ? 'text-white' : 'text-bsecondary'}`}>{categoryName}</p>

        </div>
    )
}

export default CategoryCard