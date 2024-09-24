import React from 'react'
import HeroSection from './HeroSection'
import GallerySection from './GallerySection'
import CategorySection from './CategorySection'

function LandingPage() {
    return (
        <div className="px-24  bg-amber-50 font-Montserrat">
            <HeroSection />
            <CategorySection />
            <GallerySection />

        </div>
    )
}

export default LandingPage