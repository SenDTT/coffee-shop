'use client';

import { Truck, Coffee, RotateCcw } from 'lucide-react';

const features = [
    {
        icon: <Truck className="w-10 h-10 sm:w-7 sm:h-7 text-caramel-800 sm:mb-2" />,
        title: 'Free Shipping',
        description: 'Nationwide delivery on orders over $12.',
    },
    {
        icon: <Coffee className="w-10 h-10 sm:w-7 sm:h-7 text-caramel-800 sm:mb-2" />,
        title: 'Pure Coffee',
        description: 'No chemicals or artificial flavors – just real beans.',
    },
    {
        icon: <RotateCcw className="w-10 h-10 sm:w-7 sm:h-7 text-caramel-800 sm:mb-2" />,
        title: 'Easy Returns',
        description: 'Not satisfied? We make returns easy and fast.',
    },
];

export default function WhyChooseUs() {
    return (
        <div className="why-choose-us grid grid-cols-3 text-center">
            {features.map((feature, index) => (
                <div
                    key={index}
                    className="flex flex-col p-4 sm:p-6 items-center bg-latte-300 transition why-choose-us-items first:rounded-l-lg last:rounded-r-lg"
                >
                    {feature.icon}
                    <h3 className="hidden sm:block text-xs font-semibold mb-1">{feature.title}</h3>
                    <p className="hidden sm:block text-xs mb-1">{feature.description}</p>
                </div>
            ))}
        </div>
    );
}
