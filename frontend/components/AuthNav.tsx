'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User } from '../types/User';

const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { greeting: 'Good morning', class: 'bg-white/20 text-light_latte' };
    if (hour < 18) return { greeting: 'Good afternoon', class: 'bg-white/20 text-light_latte' };
    return { greeting: 'Good evening', class: 'bg-white/20 text-light_latte' };
};

export default function AuthNav({ user, mobile = false }: {
    user: User | null;
    mobile?: boolean;
}) {
    const router = useRouter();
    const [greetingData, setGreetingData] = useState({ greeting: 'Hello', class: '' });
    const [openDropdown, setOpenDropdown] = useState(false);

    useEffect(() => {
        setGreetingData(getGreeting());
    }, []);

    const handleLogout = () => {
        router.push('/auth/logout');
    };

    if (!user) {
        return (
            <div className={`${mobile ? 'w-full flex flex-col gap-2' : 'flex items-center gap-3 ml-4'}`}>
                <Link
                    href="/auth/login"
                    className="text-sm text-latte-200 hover:text-latte-300 transition font-bold"
                >
                    Login
                </Link>
                <Link
                    href="/auth/register"
                    className="text-sm bg-cabin-600 text-white px-4 py-2 rounded-full hover:bg-cabin-700 transition font-medium"
                >
                    Sign Up
                </Link>
            </div>
        );
    }

    if (mobile) {
        return (
            <div className="w-full">
                <button
                    className="w-full text-right py-2 text-cabin-800 font-bold flex justify-end items-center gap-2"
                    onClick={() => setOpenDropdown(!openDropdown)}
                >
                    {greetingData.greeting}, {user.name.split(" ")[0]}
                    <svg
                        className={`w-4 h-4 transition-transform ${openDropdown ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {openDropdown && (
                    <div className="ml-4 mt-1 space-y-1 text-right">
                        <Link href="/profile" className="block text-sm py-1 text-cabin-700">
                            Profile
                        </Link>
                        <Link href="/admin" className="block text-sm py-1 text-cabin-700">
                            Admin Dashboard
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="block text-right w-full text-sm py-1 text-red-600"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        );
    }

    // desktop version unchanged...
    return (
        <div className="relative hidden md:flex items-center group ml-4">
            <button className={`flex items-center gap-2 text-sm font-medium ${greetingData.class} px-4 py-2 rounded-full transition`}>
                {greetingData.greeting}, <span className="font-semibold">{user.name.split(" ")[0]}</span>
                <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform -translate-y-2 transition-all duration-200 z-50">
                <Link href="/profile" className="block px-4 py-2 text-sm text-cabin-700 hover:bg-latte-100 rounded-t-md">
                    Profile
                </Link>
                <Link href="/admin" className="block px-4 py-2 text-sm text-cabin-700 hover:bg-latte-100 rounded-t-md">
                    Admin Dashboard
                </Link>
                <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-b-md"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
