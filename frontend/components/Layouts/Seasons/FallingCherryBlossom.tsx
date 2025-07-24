import { motion } from 'framer-motion';

interface FallingCherryBlossomProps {
    delay?: number;
    duration?: number;
    startX?: number;
    size?: number;
}

export default function FallingCherryBlossom({
    delay = 0,
    duration = 6,
    startX = 50,
    size = 20
}: FallingCherryBlossomProps) {
    // Tạo màu sắc ngẫu nhiên cho hoa đào
    const colors = [
        { main: '#ffb3d9', center: '#ff69b4', shadow: '#ff1493' }, // Hồng đậm
        { main: '#ffc0cb', center: '#ff91a4', shadow: '#dc143c' }, // Hồng nhạt
        { main: '#ffe4e6', center: '#ffb6c1', shadow: '#ff69b4' }, // Hồng rất nhạt
        { main: '#ffd1dc', center: '#ff8fa3', shadow: '#ff1493' }, // Hồng pastel
    ];

    const colorIndex = Math.floor(delay * 4) % colors.length;
    const currentColor = colors[colorIndex];

    return (
        <motion.div
            className="fixed"
            initial={{
                y: -50,
                x: `${startX}vw`,
                rotate: 0,
                opacity: 0.9
            }}
            animate={{
                y: '100vh',
                x: [`${startX}vw`, `${startX + 8}vw`, `${startX - 5}vw`, `${startX + 12}vw`],
                rotate: [0, 120, 240, 360],
                opacity: [0.9, 1, 0.8, 0.5, 0]
            }}
            transition={{
                duration: duration,
                delay: delay,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: Math.random() * 3
            }}
            style={{
                filter: `drop-shadow(0 2px 4px ${currentColor.shadow}40)`,
            }}
        >
            <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
                {/* Hoa đào với 5 cánh */}
                <defs>
                    <radialGradient id={`cherryGradient-${delay}`} cx="50%" cy="30%" r="70%">
                        <stop offset="0%" stopColor={currentColor.center} />
                        <stop offset="70%" stopColor={currentColor.main} />
                        <stop offset="100%" stopColor={currentColor.shadow} stopOpacity="0.8" />
                    </radialGradient>
                </defs>

                {/* 5 cánh hoa đào */}
                <g transform="translate(16,16)">
                    {Array.from({ length: 5 }, (_, i) => (
                        <g key={i} transform={`rotate(${i * 72})`}>
                            <path
                                d="M0,-8 Q-3,-12 -6,-8 Q-8,-4 -4,-2 Q-2,-1 0,0 Q2,-1 4,-2 Q8,-4 6,-8 Q3,-12 0,-8Z"
                                fill={`url(#cherryGradient-${delay})`}
                                stroke={currentColor.shadow}
                                strokeWidth="0.5"
                                opacity="0.9"
                            />
                        </g>
                    ))}

                    {/* Nhụy hoa */}
                    <circle cx="0" cy="0" r="1.5" fill="#ffff99" stroke="#ffa500" strokeWidth="0.5" />

                    {/* Các chấm nhỏ trên nhụy */}
                    <circle cx="-0.5" cy="-0.5" r="0.3" fill="#ffa500" />
                    <circle cx="0.5" cy="-0.3" r="0.3" fill="#ffa500" />
                    <circle cx="0" cy="0.7" r="0.3" fill="#ffa500" />
                </g>
            </svg>
        </motion.div>
    );
}