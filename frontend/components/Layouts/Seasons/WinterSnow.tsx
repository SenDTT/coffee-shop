import FallingSnow from './FallingSnow';

export default function WinterSnow() {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 50 }, (_, i) => (
                <FallingSnow
                    key={i}
                    delay={i * 0.2}
                    duration={6 + Math.random() * 4}
                    startX={Math.random() * 100}
                    size={8 + Math.random() * 16}
                />
            ))}
        </div>
    );
}