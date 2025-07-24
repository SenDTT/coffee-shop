'use client';

import { motion } from 'framer-motion';

export default function VideoSection() {
    return (
        <section className="section-panel section-full-width w-full py-16 text-espresso-800 bg-light_latte">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Left Text */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl font-bold mb-4 text-espresso-800">
                        Discover the Craft of Coffee
                    </h2>
                    <p className="text-lg text-espresso-800">
                        From bean to cup, our coffee journey is one of passion and precision.
                        Watch how we bring flavors to life in every drop.
                    </p>
                </motion.div>

                {/* Right Video */}
                <motion.div
                    className="w-full aspect-video"
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="relative w-full h-0 pb-[56.25%]">
                        <iframe
                            className="absolute top-0 left-0 w-full h-full rounded-xl shadow-lg"
                            src="https://www.youtube.com/embed/quYT8BPq59A?autoplay=0&mute=1&loop=1&playlist=quYT8BPq59A&controls=1&showinfo=0&modestbranding=1&rel=0"
                            title="Coffee process video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
