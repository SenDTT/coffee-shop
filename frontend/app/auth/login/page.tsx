'use client';

import api from '../../../api';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import InputField from '../../../components/InputField';
import { useAuth } from '../../../context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { user, setAuth, logout } = useAuth();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            router.push('/');
        }
    }, [user]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Replace this with real login logic
        try {
            const response = await api.post("/auth/login", { email, password });

            if (response.status === 200 && response.data.success) {
                const data = response.data.data;
                setAuth({
                    userData: data.user,
                    accToken: data.accessToken,
                    refToken: data.refreshToken,
                });

                toast.success('Login successful!');

                setTimeout(() => {
                    if (data.user.role === 'admin') {
                        router.push('/admin/dashboard');
                    } else if (data.user.role === 'user') {
                        router.push('/');
                    } else {
                        logout();
                        toast.error('Unauthorized access. Please log in again.');
                        router.push('/auth/login');
                    }
                }, 2000);
            } else {
                toast.error('Login failed. Please check your credentials.');
            }
        } catch (error: any) {
            const res = error.response ?? null
            if (res.status === 400 && res.data.message) {
                toast.error(res.data.message);
            } else {
                toast.error('Login failed. Please check your credentials.');
            }
            return;
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Welcome Back</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <InputField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="you@example.com"
                    />
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                tabIndex={-1}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-200 inline-flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <svg
                                className="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    fill="none"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12zm2.5-1h9a2.5 2.5 0 1 1-9 0z"
                                />
                            </svg>
                        ) : null}
                        {loading ? 'Loading...' : 'Sign In'}
                    </button>
                    <ToastContainer />
                </form>
                <p className="text-sm text-gray-500 mt-4 text-center">
                    Don’t have an account? <a href="/auth/register" className="text-blue-600 hover:underline">Register</a>
                </p>
            </div>
        </div>
    );
}
