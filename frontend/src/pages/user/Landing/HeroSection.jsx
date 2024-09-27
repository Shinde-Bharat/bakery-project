import React from 'react'
import hero from '../../../assets/hero1.png'
import { Button, ButtonGroup } from "@nextui-org/button";
import { MoveRight } from 'lucide-react';
import CategorySection from './CategorySection';
import { useNavigate } from 'react-router-dom';


function HeroSection() {
    const navigate = useNavigate()
    return (
        <div className="relative w-full">
            <div className="grid grid-cols-[1fr_0.9fr] h-screen ">
                <div className="mt-12">
                    <h1 className='font-Cormorant text-7xl font-bold text-bprimary'>Delight in Every Bite: Fresh, Handmade Goodness</h1>
                    <p className='mt-4 font-medium mb-8'>Experience the finest selection of handcrafted breads, cakes, and pastries, made with love and delivered fresh daily.</p>
                    <Button radius='full' className=' text-white px-4' variant="shadow" color='primary' onClick={() => navigate('/explore')} endContent={<MoveRight />}>
                        Shop Now
                    </Button>

                </div>
                <div className="">
                    <img src={hero} className='h-4/5 drop-shadow-2xl' alt="" />
                </div>
            </div>

        </div>
    )
}

export default HeroSection