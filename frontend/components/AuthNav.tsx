"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Time-based greeting function
const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { greeting: "Good morning", color: "bg-amber-600" }; // Morning
    if (hour < 18) return { greeting: "Good afternoon", color: "bg-blue-600" }; // Afternoon
    return { greeting: "Good evening", color: "bg-purple-600" }; // Evening
};

export default function AuthNav({ user }: { user: any }) {
    const [greetingData, setGreetingData] = useState({ greeting: "Hello", color: "" });

    useEffect(() => {
        setGreetingData(getGreeting());
    }, []);

    return user ? (
        <Link
            href="/profile"
            className={`flex items-center gap-2 ml-4 text-sm font-medium text-white bg-blue-600 px-4 py-2 rounded-full hover:bg-blue-700 transition`}
        >
            <span className="hidden sm:inline-block">
                {greetingData.greeting}, {user.name.split(" ")[0]}
            </span>
        </Link>
    ) : (
        <div className="flex items-center gap-3 ml-4">
            <Link
                href="/auth/login"
                className="text-sm text-latte-600 hover:text-cabin-600 transition font-bold"
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
