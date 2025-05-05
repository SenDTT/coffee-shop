'use client';

import api from '@/api';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import InputField from '@/components/InputField';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { setAuth } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

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
                router.push('/');
            } else {
                alert('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please check your credentials.');
            return;
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
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
                    >
                        Sign In
                    </button>
                </form>
                <p className="text-sm text-gray-500 mt-4 text-center">
                    Don’t have an account? <a href="/auth/register" className="text-blue-600 hover:underline">Register</a>
                </p>
            </div>
        </div>
    );
}
