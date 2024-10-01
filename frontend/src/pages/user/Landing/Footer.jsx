import React from 'react'

import { Instagram, Facebook } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Image } from '@nextui-org/react';
import logo from '../../../assets/logo/logo.png';

const Footer = () => {
    return (
        <footer className="bg-bprimaryDark text-bternary py-20 font-Montserrat">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between">
                    {/* Logo and Description */}
                    <div className="w-full md:w-1/4 mb-6 md:mb-0">
                        <NavLink to={'/'} className={'flex items-center gap-x-2'}>

                            <Image src={logo} alt="Amruta Bakery" width={80} />
                            <span className='font-bold text-xl text-white'>Amruta Bakers</span>
                        </NavLink>
                        <p className="text-sm mt-2">
                            Nestled in the heart of the community, our bakery offers
                            a warm and inviting atmosphere where the aroma of
                            freshly baked bread and sweet treats fills the air.
                        </p>
                    </div>

                    {/* Product Column */}
                    <div className="w-full md:w-1/6 mb-6 md:mb-0">
                        <h3 className="text-lg font-semibold mb-2">Product</h3>
                        <ul className="text-sm space-y-2">
                            <li className="mb-1">Cupcake</li>
                            <li className="mb-1">Bun</li>
                            <li className="mb-1">Croissant</li>
                            <li className="mb-1">Baguette</li>
                            <li className="mb-1">Donut</li>
                        </ul>
                    </div>

                    {/* Help Column */}
                    <div className="w-full md:w-1/6 mb-6 md:mb-0">
                        <h3 className="text-lg font-semibold mb-2">Help</h3>
                        <ul className="text-sm space-y-2">
                            <li><NavLink to={'/contact'} className="mb-1 hover:underline">Contact Us</NavLink></li>
                            <li><NavLink to={'/track'} className="mb-1 hover:underline">Track Order</NavLink></li>
                            <li><NavLink to={'/login'} className="mb-1 hover:underline">Login</NavLink></li>
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div className="w-full md:w-1/6 mb-6 md:mb-0">
                        <h3 className="text-lg font-semibold mb-2">Company</h3>
                        <ul className="text-sm space-y-2">
                            <li>

                                <NavLink to={'/aboutus'} className="mb-1 hover:underline">About Us</NavLink>
                            </li>
                            <li>

                                <NavLink to={'/privacy_policy'} className="mb-1 hover:underline">Privacy Policy</NavLink>
                            </li>
                            {/* <li className="mb-1">Reviews</li> */}
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div className="w-full md:w-1/6">
                        <h3 className="text-lg font-semibold mb-2">Social Links</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-300 hover:text-white">
                                <Instagram size={24} />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white">
                                <Facebook size={24} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;