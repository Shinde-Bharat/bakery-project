import React from 'react'

import image from '../../assets/image.png'
function CategoryCard({ isClicked }) {
    return (
        <div className={` p-4 rounded-lg w-fit shadow-lg cursor-pointer ${isClicked ? 'bg-bsecondary' : 'bg-white'}`}>
            <img className='rounded-lg' src={image} alt="" />
            <p className='text-center font-semibold text-bsecondary'>Donut</p>

        </div>
    )
}

export default CategoryCard