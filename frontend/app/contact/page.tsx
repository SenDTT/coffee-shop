'use client';

import { Mail, Phone } from 'lucide-react';
import { useState } from 'react';
import dynamic from "next/dynamic";
import { useAppSelector } from '../../store';
import { FaAddressBook } from 'react-icons/fa';
const Layout = dynamic(() => import("../../components/Layouts/MainLayout"), { ssr: true });

export default function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const { settings } = useAppSelector(state => state.settings);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Thank you, ${form.name}! Your message has been sent.`);
        setForm({ name: '', email: '', message: '' });
    };

    return (
        <Layout>
            <section className='grid grid-cols-1 sm:grid-cols-2 gap-6 items-end'>
                <div className='flex-1'>
                    <h1 className="text-4xl font-bold mb-6 text-latte-900">Contact Us</h1>

                    {settings ? (
                        <div className="mb-8 space-y-4 text-latte-700">
                            <p className="flex items-center gap-3">
                                <Mail className="w-4 h-4" /> Email: <a href={`mailto:${settings.shopEmail}`} className="underline">{settings.shopEmail}</a>
                            </p>
                            <p className="flex items-center gap-3">
                                <Phone className="w-4 h-4" /> Phone: <a href={`tel:${settings.shopPhone}`} className="underline">{settings.shopPhone}</a>
                            </p>
                            <p className="flex items-center gap-3">
                                <FaAddressBook className="w-4 h-4" /> Address: {settings.shopAddress}
                            </p>
                        </div>
                    ) : null}

                    <form onSubmit={handleSubmit} className="gap-6 bg-caramel-800/30 px-4 py-8 rounded-lg">
                        <div className=''>
                            <label htmlFor="name" className="block mb-1 font-semibold text-latte-800">Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="w-full border border-latte-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-latte-500"
                            />
                        </div>

                        <div className='mt-4'>
                            <label htmlFor="email" className="block mb-1 font-semibold text-latte-800">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="w-full border border-latte-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-latte-500"
                            />
                        </div>

                        <div className='mt-4'>
                            <label htmlFor="message" className="block mb-1 font-semibold text-latte-800">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows={5}
                                value={form.message}
                                onChange={handleChange}
                                required
                                className="w-full border border-latte-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-latte-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-latte-600 mt-4 text-white px-6 py-2 rounded-md hover:bg-latte-700 transition"
                        >
                            Send Message
                        </button>
                    </form>
                </div>

                <div className='flex-1'>
                    <img src="/banner_3.webp" alt="image" className='rounded-lg w-full h-full object-cover'></img>
                </div>
            </section>
        </Layout>
    );
}
