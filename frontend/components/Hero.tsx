'use client';

import Link from "next/link";

export default function Hero() {
    return (
        <section className="text-center py-10 bg-gradient-to-r from-latte-50 to-latte-100/50 rounded-3xl my-10">
            <h2 className="text-4xl font-bold mb-4 text-cabin-800">Welcome to the Coffee Shop</h2>
            <p className="text-lg text-cabin-700 mb-6">
                Handcrafted coffee, cozy vibes, and a warm welcome await.
            </p>
            <Link
                href="/menu"
                className="inline-block px-6 py-3 bg-cabin-600 text-white rounded-lg shadow hover:bg-cabin-700 transition"
            >
                Explore Our Menu
            </Link>
        </section>
    );
}
