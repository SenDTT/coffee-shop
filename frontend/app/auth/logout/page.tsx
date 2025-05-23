'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';

export default function Logout() {
    const router = useRouter();
    const { logout } = useAuth(); // Assuming you have a logout function in your Auth context

    useEffect(() => {
        logout();

        return () => router.replace('/');; // cleanup
    }, [logout, router]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">Logout</h1>
            <p className="mt-4">You have been logged out successfully.</p>
            <a href="/auth/login" className="mt-6 text-blue-500 hover:underline">
                Go to Login
            </a>
        </div>
    );
}
