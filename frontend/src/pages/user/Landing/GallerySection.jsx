import React from 'react'
import { Image } from "@nextui-org/react";
import img1 from '../../../assets/gallery/img1.png'
import img2 from '../../../assets/gallery/img2.png'
import img3 from '../../../assets/gallery/img3.png'
import img4 from '../../../assets/gallery/img4.png'
import img5 from '../../../assets/gallery/img5.png'
import img6 from '../../../assets/gallery/img6.jpg'
import img7 from '../../../assets/gallery/img7.jpg'
import SectionHeading from '../../../components/utility/SectionHeading';


function GallerySection() {
    return (
        <div className='my-8'>
            <SectionHeading heading={"Gallery"} />
            <div className="grid grid-cols-[1fr_1.3fr_1fr] gap-x-4">
                <Image
                    isZoomed
                    alt="Card background"
                    height={300}
                    width={600}
                    className="z-0 w-full   object-cover"
                    src={img7}
                />
                <Image
                    isZoomed
                    alt="Card background"
                    className="z-0 w-full   object-cover"
                    src={img6}
                    height={300}
                />
                <Image
                    isZoomed
                    alt="Card background"
                    className="z-0 w-full h-full object-cover"
                    src={img3}
                    height={300}
                />

            </div>
            <div className="grid grid-cols-[1fr_2fr] gap-4 mt-2">
                <Image
                    isZoomed
                    alt="Card background"
                    className="z-0 w-full h-full  object-cover"
                    src={img4}
                />
                <Image
                    isZoomed
                    alt="Card background"
                    className="z-0 w-full h-full object-cover"
                    src={img5}
                />
            </div>

        </div>
    )
}

export default GallerySection