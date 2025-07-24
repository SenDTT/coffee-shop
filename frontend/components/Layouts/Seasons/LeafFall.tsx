import { motion } from 'framer-motion';

interface FallingLeafProps {
    color?: string;
    delay?: number;
    duration?: number;
    startX?: number;
}

export default function LeafFall({
    color = "#ff6b35",
    delay = 0,
    duration = 4,
    startX = 50
}: FallingLeafProps) {
    return (
        <motion.div
            className="absolute"
            initial={{
                y: -100,
                x: `${startX}vw`,
                rotate: 0,
                opacity: 1
            }}
            animate={{
                y: '100vh',
                x: [`${startX}vw`, `${startX + 10}vw`, `${startX - 5}vw`, `${startX + 15}vw`],
                rotate: [0, 90, 180, 270, 360],
                opacity: [1, 1, 0.8, 0.6, 0]
            }}
            transition={{
                duration: duration,
                delay: delay,
                ease: "linear",
                repeat: Infinity,
                repeatDelay: Math.random() * 2
            }}
        >
            <svg width="24" height="32" viewBox="0 0 24 32" fill="none">
                {/* Lá cây với gradient màu thu */}
                <defs>
                    <linearGradient id={`leafGradient-${delay}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={color} />
                        <stop offset="50%" stopColor="#ffb347" />
                        <stop offset="100%" stopColor="#d2691e" />
                    </linearGradient>
                </defs>

                {/* Hình dạng lá */}
                <path
                    d="M12 2C8 2 4 6 2 12C4 18 8 22 12 30C16 22 20 18 22 12C20 6 16 2 12 2Z"
                    fill={`url(#leafGradient-${delay})`}
                    stroke="#8b4513"
                    strokeWidth="0.5"
                />

                {/* Vân lá */}
                <path
                    d="M12 4L12 28M8 8L12 12M16 8L12 12M8 16L12 20M16 16L12 20"
                    stroke="#8b4513"
                    strokeWidth="0.5"
                    opacity="0.6"
                />
            </svg>
        </motion.div>
    );
}