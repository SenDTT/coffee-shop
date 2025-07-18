'use client';

import api from '../../../api';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import InputField from '../../../components/InputField';
import { toast, ToastContainer } from 'react-toastify';

export default function RegisterPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');

    // Handle form submission
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password.localeCompare(confirmPassword) !== 0) {
            toast.error('Passwords do not match');
            return;
        }

        // Registration logic here (e.g., API call to register)
        console.log('Registering user:', { email, name, username, password });

        // Redirect to login after successful registration
        try {
            const response = await api.post("/auth/signup", {
                email,
                name,
                username,
                password,
            });

            if (response.status === 200 && response.data.success) {
                toast.success('Registration successful! Please log in.');
                router.push('/auth/login');
            }
            else {
                toast.error('Registration failed. Please try again.');
            }
        } catch (error: any) {
            const res = error.response ?? null
            if (res.status === 400 && res.data.message) {
                toast.error(res.data.message);
            } else {
                toast.error('Registration failed. Please try again.');
            }
            return;
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
            <form
                onSubmit={handleRegister}
                className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
            >
                <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Create Your Account</h1>

                <div className="space-y-4">
                    <InputField
                        label="Full Name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <InputField
                        label="Username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <InputField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="you@example.com"
                    />
                    <InputField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="********"
                    />
                    <InputField
                        label="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder="********"
                    />
                </div>

                <button
                    type="submit"  // Using the form's submit button
                    className="w-full mt-6 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                >
                    Register
                </button>
                <ToastContainer />

                <p className="text-sm text-center mt-4 text-gray-600">
                    Already have an account?{' '}
                    <a href="/auth/login" className="text-blue-600 hover:underline">
                        Log in
                    </a>
                </p>
            </form>
        </div>
    );
}
