import React from 'react'
import HeroSection from './HeroSection'
import GallerySection from './GallerySection'
import CategorySection from './CategorySection'
import OffersSection from './OffersSection'

function LandingPage() {

    return (
        <div className=" bg-amber-50 font-Montserrat">
            <div className="px-24 ">
                <HeroSection />
                <CategorySection />
            </div>
            <OffersSection />
            <div className="px-24 ">
                <GallerySection />
            </div>

        </div>
    )
}

export default LandingPage