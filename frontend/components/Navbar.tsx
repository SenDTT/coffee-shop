'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import AuthNav from './AuthNav';

// Time-based greeting function
const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
};

export default function Navbar() {
    const { user } = useAuth();

    console.log(user);

    return (
        <header className="bg-gradient-to-r from-latte-200/20 to-latte-300/30 shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className="text-xl font-bold text-cabin-800">
                    Coffee Shop
                </Link>
                <nav className="space-x-4 flex items-center">
                    <Link
                        href="/"
                        className="relative px-3 py-2 font-bold text-cabin-700 transition-colors duration-200 hover:text-mocha-600 hover:after:w-full after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-mocha-500 after:transition-all after:duration-300"
                    >
                        Home
                    </Link>
                    <Link
                        href="/menu"
                        className="relative px-3 py-2 font-bold text-cabin-700 transition-colors duration-200 hover:text-mocha-600 hover:after:w-full after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-mocha-500 after:transition-all after:duration-300"
                    >
                        Menu
                    </Link>
                    <Link
                        href="/blogs"
                        className="relative px-3 py-2 font-bold text-cabin-700 transition-colors duration-200 hover:text-mocha-600 hover:after:w-full after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-mocha-500 after:transition-all after:duration-300"
                    >
                        Blogs
                    </Link>
                    <Link
                        href="/about"
                        className="relative px-3 py-2 font-bold text-cabin-700 transition-colors duration-200 hover:text-mocha-600 hover:after:w-full after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-mocha-500 after:transition-all after:duration-300"
                    >
                        About
                    </Link>
                    <Link
                        href="/contact"
                        className="relative px-3 py-2 font-bold text-cabin-700 transition-colors duration-200 hover:text-mocha-600 hover:after:w-full after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-mocha-500 after:transition-all after:duration-300"
                    >
                        Contact
                    </Link>
                    <AuthNav user={user} />
                </nav>
            </div>
        </header>
    );
}
