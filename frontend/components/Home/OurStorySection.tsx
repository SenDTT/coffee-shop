"use client";

import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ourStoryImage from "/public/our-story.avif";

gsap.registerPlugin(ScrollTrigger);

export default function OurStorySection() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".story-text", {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".story-text",
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            });

            gsap.from(".story-img", {
                opacity: 0,
                x: -100,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".story-img",
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 px-4 bg-inherit">
            <div className="container mx-auto flex flex-col md:flex-row items-center gap-12">
                {/* Image on the left, square frame */}
                <div className="story-img w-full max-w-sm aspect-square rounded-xl overflow-hidden shadow-lg">
                    <Image
                        src={ourStoryImage}
                        alt="Coffee beans and cup"
                        width={500}
                        height={500}
                        className="w-[500px] h-[500px] object-cover"
                    />
                </div>

                {/* Text on the right, aligned left */}
                <div className="story-text max-w-xl text-left">
                    <h2 className="text-4xl font-serif font-bold text-espresso-800 mb-6">
                        Our Story
                    </h2>
                    <p className="text-espresso-700 leading-relaxed font-serif mb-4">
                        Inspired by tradition and crafted with passion, our journey started from a single corner café and blossomed into a beloved community space.
                    </p>
                    <p className="text-espresso-700 leading-relaxed font-serif">
                        We believe in ethically sourced beans, rich flavor, and human connection—one cup at a time.
                    </p>
                </div>
            </div>
        </section>
    );
}
