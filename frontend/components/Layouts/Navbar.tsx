// components/Navbar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaBars } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { useAppSelector } from '../../store';

// lazy load components
import dynamic from 'next/dynamic';
import SeasonSwitcher from './Seasons/SeasonSwitcher';
const AuthNav = dynamic(() => import('../AuthNav'), { ssr: false });

export default function Navbar() {
    const { user } = useAppSelector(state => state.auth);
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    return (
        <>
            <header className="main-navbar shadow-md top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <Link href="/" className="text-xl sm:text-3xl font-serif font-bold text-latte-200">
                        Coffee Shop
                    </Link>

                    <div className="md:hidden">
                        <button onClick={toggleMenu}>
                            {menuOpen ? <IoMdClose className='text-latte-200' size={20} /> : <FaBars className='text-latte-200' size={20} />}
                        </button>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex space-x-4 items-center">
                        {['Menu', 'Blogs', 'About', 'Contact'].map((page) => (
                            <Link
                                key={page}
                                href={`/${page.toLowerCase()}`}
                                className="relative px-3 py-2 font-bold text-latte-300 transition-colors duration-200 hover:after:w-full after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-latte-300 after:transition-all after:duration-300"
                            >
                                {page}
                            </Link>
                        ))}
                        <AuthNav user={user} />
                        <SeasonSwitcher />
                    </nav>
                </div>
            </header>

            <div
                className={`absolute top-[64px] right-0 w-full bg-gradient-to-r from-cabin-600 to-cabin-800 shadow-md md:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                    } z-40`}
            >
                <div className="flex flex-col items-end px-4 pb-4 pt-2 space-y-2">
                    {['Menu', 'Blogs', 'About', 'Contact'].map((page) => (
                        <Link
                            key={page}
                            href={`/${page.toLowerCase()}`}
                            className="block font-semibold text-latte-300 transition-colors duration-200 text-lg"
                            onClick={closeMenu}
                        >
                            {page}
                        </Link>
                    ))}
                    <AuthNav user={user} mobile={true} />
                    <SeasonSwitcher />
                </div>
            </div>
        </>
    );
}
