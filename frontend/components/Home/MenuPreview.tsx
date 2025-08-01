'use client'

import api from "../../api";
import { Product } from "../../types/Product";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import Slider, { Settings } from "react-slick";
import MenuItem from "../Products/MenuItem";

export default function MenuPreview() {
    const [menuItems, setMenuItems] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch menu items from the API
    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await api.get("/products", {
                    params: {
                        limit: 6,
                        skip: 0,
                    },
                });
                if (response.status !== 200) {
                    throw new Error("Network response was not ok");
                }

                const data = response.data;
                setMenuItems(data.data.data);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("An unknown error occurred");
                }
            } finally {
                setLoading(false);
            }
        }

        fetchMenuItems();
    }, []);

    if (loading) {
        return (
            <section className="section-panel homepage-sections py-10 bg-inherit">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">
                        <FaSpinner className="inline-block mr-2 animate-spin" />
                        Loading Menu...
                    </h2>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="section-panel homepage-sections py-10 bg-inherit">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6 text-red-600">
                        Error: {error}
                    </h2>
                </div>
            </section>
        );
    }
    if (menuItems.length === 0) {
        return "";
    }

    const sliderSettings: Settings = {
        dots: true,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        pauseOnHover: true,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 3 },
            },
            {
                breakpoint: 640,
                settings: { slidesToShow: 1 },
            },
        ],
    };

    return (
        <section className="our-signature-menu section-panel sm:min-h-lvh py-10 bg-latte-100 section-full-width">
            <div className="container mx-auto">
                <h2 className="text-xl sm:text-4xl font-bold text-center mb-4 font-serif text-espresso-800">Our Signature Menu</h2>
                <p className="text-center mb-8 text-espresso-700 font-serif leading-10">
                    Discover our delicious offerings, crafted with care and passion.
                </p>

                <Slider {...sliderSettings}>
                    {menuItems.map((item: Product) => (
                        <MenuItem key={item._id} item={item} />
                    ))}
                </Slider>
            </div>
        </section>
    );
}