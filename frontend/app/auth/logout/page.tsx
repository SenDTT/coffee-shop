'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { logout } from '../../../store/slices/auth';
import { useAppDispatch } from '../../../store';

export default function Logout() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(logout());

        return () => router.replace('/');; // cleanup
    }, [dispatch, router]);

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
