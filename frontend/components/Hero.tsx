'use client';

import Link from "next/link";
import Slider, { Settings } from "react-slick";

export default function Hero() {

    const sliderSettings: Settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        waitForAnimate: false,
        autoplaySpeed: 2500,
        pauseOnHover: true,
        arrows: false
    };

    return (
        <section className="slide-section section-full-width rounded-3xl py-3 mb-6 container mx-auto">
            <Slider {...sliderSettings}>
                {/* first slide */}
                <div className="hero-section p-10 !rounded-3xl my-10 !flex items-start">
                    <div className="flex flex-col justify-center gap-2 sm:gap-4 p-6 rounded-3xl shadow-md bg-black/30 w-full sm:w-[45%]">
                        <h2 className="text-base sm:text-3xl font-mono font-bold mb-4 text-latte-200">Welcome to the </h2>
                        <h1 className="text-xl sm:text-7xl font-serif font-bold mb-2 text-latte-200">Coffee Shop</h1>
                        <p className="text-sm sm:text-base text-latte-200 mb-6 font-mono !leading-relaxed">
                            Handcrafted coffee, cozy vibes, and a warm welcome await.
                        </p>
                        <div>
                            <Link
                                href="/menu"
                                className="font-bold font-sans sm:text-base text-sm px-4 sm:px-6 py-2 sm:py-3 bg-cabin-600/80 text-white rounded-lg shadow hover:bg-cabin-700 transition"
                            >
                                Explore Our Menu
                            </Link>
                        </div>
                    </div>
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 
                      px-3 py-1 bg-black text-white text-sm rounded-md opacity-0 
                      group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        Pausing
                    </div>
                </div>

                {/* second slide */}
                <div className="hero-section-2 p-10 !rounded-3xl my-10 !flex">
                    <div className="flex justify-end w-full">
                        <div className="flex flex-col justify-center gap-2 sm:gap-4 p-4 sm:p-6 rounded-3xl shadow-md bg-black/50 sm:bg-black/30 w-full sm:w-[45%]">
                            <h2 className="text-base sm:text-3xl font-mono font-bold mb-4 text-latte-200">
                                Now Brewing
                            </h2>
                            <h1 className="text-xl sm:text-6xl font-serif font-bold mb-2 text-latte-200">
                                Matcha Latte
                            </h1>
                            <p className="text-sm sm:text-base text-latte-200 mb-6 font-mono !leading-relaxed">
                                A refreshing fusion of creamy milk and premium Japanese matcha—earthy, vibrant, and energizing.
                            </p>
                            <div>
                                <Link
                                    href="/products/matcha-latte"
                                    className="font-bold font-sans sm:text-base text-sm px-4 sm:px-6 py-2 sm:py-3 bg-green-600/80 text-white rounded-lg shadow hover:bg-green-700 transition"
                                >
                                    Order Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Slider>
        </section>
    );
}
