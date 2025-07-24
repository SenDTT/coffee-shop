import { motion } from 'framer-motion';

interface FallingSnowProps {
    delay?: number;
    duration?: number;
    startX?: number;
    size?: number;
}

export default function FallingSnow({
    delay = 0,
    duration = 8,
    startX = 50,
    size = 16
}: FallingSnowProps) {
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
                x: [`${startX}vw`, `${startX + 5}vw`, `${startX - 3}vw`, `${startX + 8}vw`],
                rotate: [0, 180, 360, 540],
                opacity: [0.9, 1, 0.8, 0.6, 0]
            }}
            transition={{
                duration: duration,
                delay: delay,
                ease: "linear",
                repeat: Infinity,
                repeatDelay: Math.random() * 2
            }}
            style={{
                filter: 'drop-shadow(0 0 4px rgba(70, 130, 180, 0.5)) drop-shadow(0 0 8px rgba(70, 130, 180, 0.3))',
            }}
        >
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                {/* Bông tuyết với 6 cánh - có outline và fill */}
                <g>
                    {/* Outline tối để nổi bật trên nền sáng */}
                    <g stroke="#4682b4" strokeWidth="2.5" fill="none" opacity="0.8">
                        {/* Đường chính dọc */}
                        <line x1="12" y1="2" x2="12" y2="22" />
                        {/* Đường chéo 1 */}
                        <line x1="4.22" y1="6.22" x2="19.78" y2="17.78" />
                        {/* Đường chéo 2 */}
                        <line x1="19.78" y1="6.22" x2="4.22" y2="17.78" />

                        {/* Các nhánh nhỏ trên đường dọc */}
                        <line x1="10" y1="4" x2="14" y2="4" />
                        <line x1="10" y1="20" x2="14" y2="20" />
                        <line x1="9" y1="6" x2="15" y2="6" />
                        <line x1="9" y1="18" x2="15" y2="18" />

                        {/* Các nhánh nhỏ trên đường chéo */}
                        <line x1="6.5" y1="8.5" x2="8.5" y2="6.5" />
                        <line x1="15.5" y1="17.5" x2="17.5" y2="15.5" />
                        <line x1="17.5" y1="8.5" x2="15.5" y2="6.5" />
                        <line x1="8.5" y1="17.5" x2="6.5" y2="15.5" />
                    </g>

                    {/* Fill trắng bên trong */}
                    <g stroke="white" strokeWidth="1.5" fill="white" opacity="1">
                        {/* Đường chính dọc */}
                        <line x1="12" y1="2" x2="12" y2="22" />
                        {/* Đường chéo 1 */}
                        <line x1="4.22" y1="6.22" x2="19.78" y2="17.78" />
                        {/* Đường chéo 2 */}
                        <line x1="19.78" y1="6.22" x2="4.22" y2="17.78" />

                        {/* Các nhánh nhỏ trên đường dọc */}
                        <line x1="10" y1="4" x2="14" y2="4" />
                        <line x1="10" y1="20" x2="14" y2="20" />
                        <line x1="9" y1="6" x2="15" y2="6" />
                        <line x1="9" y1="18" x2="15" y2="18" />

                        {/* Các nhánh nhỏ trên đường chéo */}
                        <line x1="6.5" y1="8.5" x2="8.5" y2="6.5" />
                        <line x1="15.5" y1="17.5" x2="17.5" y2="15.5" />
                        <line x1="17.5" y1="8.5" x2="15.5" y2="6.5" />
                        <line x1="8.5" y1="17.5" x2="6.5" y2="15.5" />
                    </g>

                    {/* Trung tâm bông tuyết */}
                    <circle cx="12" cy="12" r="1.5" fill="#4682b4" stroke="white" strokeWidth="1" />
                </g>
            </svg>
        </motion.div>
    );
}