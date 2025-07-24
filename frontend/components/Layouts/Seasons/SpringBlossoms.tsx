import FallingCherryBlossom from "./FallingCherryBlossom";

export default function SpringBlossoms() {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 35 }, (_, i) => (
                <FallingCherryBlossom
                    key={i}
                    delay={i * 0.3}
                    duration={5 + Math.random() * 4}
                    startX={Math.random() * 100}
                    size={12 + Math.random() * 16}
                />
            ))}
        </div>
    );
}