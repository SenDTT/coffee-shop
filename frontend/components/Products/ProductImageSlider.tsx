// components/ProductImageSlider.tsx
"use client";

import Slider from "react-slick";
import React from "react";

interface ProductImageSliderProps {
    images: string[]; // array of image paths
}

const ProductImageSlider: React.FC<ProductImageSliderProps> = ({ images }) => {
    const settings = {
        customPaging: function (i: number) {
            return (
                <a>
                    <img
                        onError={(e) => {
                            e.currentTarget.src = `${process.env.NEXT_PUBLIC_DOMAIN}uploads/default_coffee.png`;
                        }}
                        src={process.env.NEXT_PUBLIC_DOMAIN + images[i]}
                        alt={`Thumbnail ${i}`}
                        className="w-20 h-20 object-cover rounded" />
                </a>
            );
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    return (
        <div className="flex-1 product-image-slider w-full md:w-1/2">
            {images.length === 1 ? (
                <img
                    src={process.env.NEXT_PUBLIC_DOMAIN + images[0]}
                    alt="Product"
                    className="w-full h-full rounded-xl object-cover"
                    onError={(e) => {
                        e.currentTarget.src = `${process.env.NEXT_PUBLIC_DOMAIN}uploads/default_coffee.png`;
                    }}
                />
            ) : (
                <Slider {...settings}>
                    {images.map((img, i) => (
                        <div key={i}>
                            <img
                                src={process.env.NEXT_PUBLIC_DOMAIN + img}
                                alt={`Slide ${i}`}
                                className="w-full h-full rounded-xl object-cover"
                                onError={(e) => {
                                    e.currentTarget.src = `${process.env.NEXT_PUBLIC_DOMAIN}uploads/default_coffee.png`;
                                }}
                            />
                        </div>
                    ))}
                </Slider>
            )}
        </div>
    );
};

export default ProductImageSlider;
