// components/Navbar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import AuthNav from '../AuthNav';
import { FaBars } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

export default function Navbar() {
    const { user } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    return (
        <>
            <header className="bg-gradient-to-r from-latte-200/20 to-latte-300/30 shadow-md top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <Link href="/" className="text-xl font-bold text-cabin-800">
                        Coffee Shop
                    </Link>

                    <div className="md:hidden">
                        <button onClick={toggleMenu}>
                            {menuOpen ? <IoMdClose size={20} /> : <FaBars size={20} />}
                        </button>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex space-x-4 items-center">
                        {['Menu', 'Blogs', 'About', 'Contact'].map((page) => (
                            <Link
                                key={page}
                                href={`/${page.toLowerCase()}`}
                                className="relative px-3 py-2 font-bold text-cabin-700 transition-colors duration-200 hover:text-mocha-600 hover:after:w-full after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-mocha-500 after:transition-all after:duration-300"
                            >
                                {page}
                            </Link>
                        ))}
                        <AuthNav user={user} />
                    </nav>
                </div>
            </header>

            <div
                className={`absolute top-[64px] right-0 w-full bg-white shadow-md md:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                    } z-40`}
            >
                <div className="flex flex-col items-end px-4 pb-4 pt-2 space-y-2">
                    {['Menu', 'Blogs', 'About', 'Contact'].map((page) => (
                        <Link
                            key={page}
                            href={`/${page.toLowerCase()}`}
                            className="block font-semibold text-cabin-700"
                            onClick={closeMenu}
                        >
                            {page}
                        </Link>
                    ))}
                    <AuthNav user={user} mobile={true} closeMenu={closeMenu} />
                </div>
            </div>
        </>
    );
}
