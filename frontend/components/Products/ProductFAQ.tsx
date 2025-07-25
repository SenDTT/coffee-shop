// components/FaqSection.tsx
'use client';

import { useState } from "react";
import FaqItem from "./FaqItem";

const FAQS = [
    {
        question: "How long does the coffee last?",
        answer:
            "Our coffee maintains its optimal flavor for around 12 months if stored properly. We recommend keeping it in a cool, dry place, sealed tightly, and away from direct sunlight or humidity to preserve its aroma and freshness for as long as possible.",
    },
    {
        question: "Can I use an espresso machine?",
        answer:
            "Yes, absolutely. For the best results, use a finer grind suitable for espresso machines and tamp the grounds firmly. You may need to experiment slightly with grind size and pressure to match your machine’s specifications and achieve a rich crema.",
    },
    {
        question: "Do you offer international shipping?",
        answer:
            "Currently, we only offer shipping within Vietnam. However, we’re actively working on expanding our logistics network and expect to launch international shipping within the next few months. Stay tuned through our newsletter or social channels for updates.",
    },
    {
        question: "What grind size should I choose for my brew method?",
        answer:
            "We offer multiple grind sizes tailored to your brewing method. For example, choose coarse for French press, medium for drip coffee, and fine for espresso. If you’re unsure, feel free to reach out to our team—we're happy to recommend the right option based on your setup.",
    },
    {
        question: "Is your packaging eco-friendly?",
        answer:
            "Yes! Our coffee bags are made from biodegradable materials and printed with soy-based inks. We also offer a subscription service with reusable containers to help reduce waste. Sustainability is a core part of our values and operations.",
    },
];

export default function FaqSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleClick = (index: number) => {
        setOpenIndex(prev => (prev === index ? null : index));
    };

    return (
        <section className="section-full-width bg-caramel-800 text-latte-200">
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-6 py-20 px-6 sm:px-10 lg:px-20">
                <div className="faq-left-side">
                    <img
                        src="/faq.avif"
                        alt="FAQ Background"
                        className="w-full h-auto object-cover rounded-xl"
                    />
                </div>
                <div className="faq-right-side">
                    <h2 className="text-2xl sm:text-3xl font-serif font-semibold mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {FAQS.map((faq, index) => (
                            <FaqItem
                                key={index}
                                question={faq.question}
                                answer={faq.answer}
                                isOpen={openIndex === index}
                                onClick={() => handleClick(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
