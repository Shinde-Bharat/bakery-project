
import React, { useState, useEffect } from 'react'
import { getAllOffers } from '@/services/apis/offers'
import { toast } from '@/hooks/use-toast'
import SectionHeading from '@/components/utility/SectionHeading'
import { NavLink } from 'react-router-dom'

function OffersSection() {
    const [offers, setOffers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchOffers()
    }, [])

    const fetchOffers = async () => {
        try {
            const fetchedOffers = await getAllOffers()
            setOffers(fetchedOffers)
        } catch (error) {
            console.error("Error fetching offers:", error)
            toast({
                title: "Error",
                description: "Failed to fetch offers. Please try again.",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return <div className="w-full h-40 flex items-center justify-center">Loading offers...</div>
    }

    if (offers.length === 0) {
        return <></>
    }

    return (
        <div className="w-full overflow-hidden">
            <SectionHeading heading={"Offers"} />
            {offers.map((offer) => (
                <NavLink to={'/explore'} key={offer._id} className="relative w-full mb-4 overflow-hidden">
                    <img
                        src={offer.imgURL}
                        alt={offer.title}
                        className="w-full h-auto object-cover transition-transform duration-300 ease-in-out transform scale-105 opacity-80"
                    />
                    {/* Shine effect div */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent  animate-shine"></div>
                </NavLink>
            ))}

        </div >

    )
}

export default OffersSection