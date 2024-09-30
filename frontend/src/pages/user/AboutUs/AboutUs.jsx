"use client";

import React, { useEffect } from "react";
import { Card, CardBody, Image, Button } from "@nextui-org/react";
import { Star, ChevronRight } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { NavLink, useNavigate } from "react-router-dom";

const categoryItems = [
    { name: "Cup Cakes", image: "https://www.apnabakery.com/images/category1.jpg" },
    { name: "Plum Cakes", image: "https://www.apnabakery.com/images/category2.jpg" },
    { name: "Doughnuts", image: "https://www.apnabakery.com/images/category3.jpg" },
    { name: "Kharis", image: "https://www.apnabakery.com/images/category4.jpg" },
];

const testimonials = [
    {
        name: "James",
        occupation: "Lawyer",
        image: "https://www.apnabakery.com/images/rev2.jpg",
        text: "The aroma and taste of Apna Bakery's delicacies bring back memories. Their cakes are simply divine!",
    },
    {
        name: "Olivia",
        occupation: "Dentist",
        image: "https://www.apnabakery.com/images/rev3.jpg",
        text: "Incredible flavors that stand the test of time. Apna Bakery is a must-visit for anyone with a sweet tooth.",
    },
    {
        name: "Vinod",
        occupation: "Doctor",
        image: "https://www.apnabakery.com/images/rev1.jpg",
        text: "From cakes to pastries, every item here is a masterpiece. Apna Bakery delivers happiness in every bite.",
    },
];

const AboutUs = () => {
    const controls = useAnimation();
    const navigate = useNavigate()
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.3,
    });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
    };

    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 1.8, ease: "easeOut" } },
    };

    const staggerChildren = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                ease: "easeOut",
            },
        },
    };

    const bounceIn = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: { scale: 1, opacity: 1, transition: { duration: 0.9, bounce: 0.3 } },
    };

    return (
        <div className="bg-black text-white font-Montserrat">
            <section
                className="relative h-[50vh] flex items-center justify-center bg-cover bg-center bg-no-repeat bg-opacity-50"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://www.apnabakery.com/images/bg.jpg)",
                }}
            >
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.8, ease: "easeOut" }}
                    className="text-5xl font-bold text-white "
                >
                    About Us
                </motion.h1>
            </section>

            {/* About Section */}
            <section className=" px-24 py-16">
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={controls}
                    variants={staggerChildren}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12"
                >
                    <motion.div variants={staggerChildren} className="grid grid-cols-2 gap-4">
                        {categoryItems.map((item, index) => (
                            <motion.div key={index} variants={fadeInUp}>

                                <Image
                                    isZoomed
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-48 object-cover"
                                />

                            </motion.div>
                        ))}
                    </motion.div>
                    <motion.div variants={fadeInUp} className="flex flex-col justify-center">
                        <motion.h2 className="text-2xl font-semibold mb-4" initial="hidden" animate="visible" variants={fadeIn}>
                            About Us
                        </motion.h2>
                        <motion.h3 className="text-4xl font-bold mb-6" initial="hidden" animate="visible" variants={fadeIn}>
                            The Aroma of Kerala, <br />Baked in Pune!
                        </motion.h3>
                        <motion.p className="mb-4" initial="hidden" animate="visible" variants={fadeIn}>
                            Established in the 1960s by the Abdullah friends, Apna Bakery has brought the authentic flavors of Malabari
                            cuisine to the heart of Maharashtra. From freshly baked goods to aromatic spices, we deliver a taste of
                            Kerala right to your doorstep. Every bite tells a story of tradition, passion, and quality.
                        </motion.p>
                    </motion.div>
                </motion.div>
                <motion.p variants={fadeInUp} initial="hidden" animate={controls} className="mt-8">
                    Apna Bakery began in the humble village of Supa and has since grown to become a landmark in Pune. What started
                    as a small venture to share the unique tastes of Malabar has now blossomed into a full-fledged bakery, serving
                    the best pastries, cakes, and bread to people from all walks of life. We believe in bringing joy to every
                    customer who walks through our doors.
                </motion.p>
            </section>

            {/* Customer Feedback */}
            <section className="bg-gray-900 py-16">
                <div className="container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-2xl font-semibold mb-2">Customer Feedback</h2>
                        <h3 className="text-4xl font-bold">What Our Customers Say</h3>
                    </motion.div>
                    <Carousel className="w-full max-w-4xl mx-auto">
                        <CarouselContent>
                            {testimonials.map((testimonial, index) => (
                                <CarouselItem key={index}>
                                    <motion.div
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        variants={bounceIn}
                                    >
                                        <Card className="bg-gray-800 text-white">
                                            <CardBody className="flex flex-col items-center text-center p-8">
                                                <Image
                                                    src={testimonial.image}
                                                    alt={testimonial.name}
                                                    className="w-24 h-24 rounded-full mb-4"
                                                />
                                                <motion.div className="flex mb-2">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className="text-yellow-400 w-5 h-5" />
                                                    ))}
                                                </motion.div>
                                                <p className="mb-4">{testimonial.text}</p>
                                                <h5 className="font-semibold">
                                                    {testimonial.name}{" "}
                                                    <span className="font-normal text-gray-400">{testimonial.occupation}</span>
                                                </h5>
                                            </CardBody>
                                        </Card>
                                    </motion.div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </section>

            {/* CTA Section */}
            <section
                className="relative py-16 bg-cover bg-center bg-no-repeat bg-opacity-50"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://www.apnabakery.com/images/cta_bg.jpg)",
                }}
            >
                <div className="container mx-auto text-center">
                    <motion.h2
                        className="text-4xl font-bold text-white mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5 }}
                    >
                        Ready to Experience the Best of Kerala?
                    </motion.h2>
                    <motion.div variants={fadeIn} className="flex justify-center">


                        <Button onPress={() => navigate('/explore')} color="primary" size="lg" endContent={<ChevronRight className="ml-2" />}>
                            Explore Our Menu
                        </Button>

                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
