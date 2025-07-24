'use client';

import { motion } from 'framer-motion';

interface FallingRainProps {
    count?: number;
}

export default function FallingRain({ count = 50 }: FallingRainProps) {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => {
                const delay = Math.random() * 5;
                const duration = 1.5 + Math.random() * 1;
                const startX = Math.random() * 100;
                const length = 10 + Math.random() * 20;
                const opacity = 0.3 + Math.random() * 0.5;

                return (
                    <motion.div
                        key={i}
                        className="fixed top-0 left-0 w-[1.5px] bg-blue-400 rounded-full pointer-events-none z-[-1]"
                        initial={{
                            y: -length,
                            x: `${startX}vw`,
                            opacity: 0,
                            height: length,
                        }}
                        animate={{
                            y: '100vh',
                            opacity: [opacity, opacity * 0.8, 0.1, 0],
                        }}
                        transition={{
                            duration,
                            delay,
                            repeat: Infinity,
                            ease: 'linear',
                            repeatDelay: Math.random() * 2,
                        }}
                    />
                );
            })}
        </>
    );
}
