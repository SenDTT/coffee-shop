import LeafFall from "./LeafFall";

export default function AutumnLeaves() {
    const autumnColors = [
        "#ff6b35", // Cam đậm
        "#f7931e", // Cam
        "#ffd700", // Vàng
        "#ff4500", // Đỏ cam
        "#cd853f", // Nâu vàng
        "#b22222", // Đỏ thẫm
        "#daa520", // Vàng đậm
        "#ff8c00"  // Cam đậm
    ];

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 100 }, (_, i) => (
                <LeafFall
                    key={i}
                    color={autumnColors[i % autumnColors.length]}
                    delay={i * 0.5}
                    duration={4 + Math.random() * 2}
                    startX={Math.random() * 80 + 10}
                />
            ))}
        </div>
    )
}