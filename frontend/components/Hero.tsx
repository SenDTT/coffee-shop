import Link from "next/link";

export default function Hero() {
    return (
        <section className="text-center py-10 bg-gradient-to-r from-blue-50 to-blue-100 my-10 rounded-lg">
            <h2 className="text-4xl font-bold mb-4 text-blue-800">Welcome to the Coffee Shop</h2>
            <p className="text-lg text-gray-700 mb-6">
                Handcrafted coffee, cozy vibes, and a warm welcome await.
            </p>
            <Link
                href="/menu"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-amber-700 transition"
            >
                Explore Our Menu
            </Link>
        </section>
    );
}
