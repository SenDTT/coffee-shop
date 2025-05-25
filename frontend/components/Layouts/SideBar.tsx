import Link from "next/link";
import { useState } from "react";
import { TbLayoutDashboardFilled, TbLayoutSidebarLeftCollapseFilled, TbLayoutSidebarRightCollapseFilled, TbMenu } from "react-icons/tb";
import { PiClipboardTextBold } from "react-icons/pi";
import { FaBoxes, FaUsers } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

export default function SideBar() {
    const [menuOpen, setMenuOpen] = useState(true);
    const toggleMenu = () => setMenuOpen(!menuOpen);
    return (
        <div className={`flex flex-col ${menuOpen ? 'w-64' : 'w-16'} justify-between h-screen bg-gray-800 text-coastal-light-bg`}>
            <div className="flex flex-col items-left py-4 gap-4">
                <div className={`inline-flex ${menuOpen ? 'justify-between' : 'justify-start'} items-center p-4 border-b border-slate-100`}>
                    <h1 className={`text-2xl font-bold ${menuOpen ? 'block' : 'hidden'}`}>Coffee Shop</h1>
                    {menuOpen ? (
                        <TbLayoutSidebarLeftCollapseFilled onClick={toggleMenu} className="text-2xl cursor-pointer text-coastal-light-bg" />
                    ) : (
                        <TbLayoutSidebarRightCollapseFilled onClick={toggleMenu} className="text-2xl cursor-pointer text-coastal-light-bg" />
                    )}
                </div>
                <nav className="mt-4">
                    <ul className="space-y-2">
                        <li>
                            <Link href="/admin" className="text-lg transition hover:bg-gray-700 hover:cursor-pointer px-4 py-2 inline-flex gap-2 items-center w-full">
                                <TbLayoutDashboardFilled className="text-2xl" />
                                <p className={menuOpen ? 'block' : 'hidden'}>Dashboard</p>
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/menu" className="text-lg transition hover:bg-gray-700 hover:cursor-pointer px-4 py-2 inline-flex gap-2 items-center w-full">
                                <PiClipboardTextBold className="text-2xl" />
                                <p className={menuOpen ? 'block' : 'hidden'}>Menu</p>
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/orders" className="text-lg transition hover:bg-gray-700 hover:cursor-pointer px-4 py-2 inline-flex gap-2 items-center w-full">
                                <FaBoxes className="text-2xl" />
                                <p className={menuOpen ? 'block' : 'hidden'}>Orders</p>
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/users" className="text-lg transition hover:bg-gray-700 hover:cursor-pointer px-4 py-2 inline-flex gap-2 items-center w-full">
                                <FaUsers className="text-2xl" />
                                <p className={menuOpen ? 'block' : 'hidden'}>Users</p>
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/settings" className="text-lg transition hover:bg-gray-700 hover:cursor-pointer px-4 py-2 inline-flex gap-2 items-center w-full">
                                <IoMdSettings className="text-2xl" />
                                <p className={menuOpen ? 'block' : 'hidden'}>Settings</p>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

            <footer className="mt-10">
                <div className="container mx-auto px-4 py-6 text-center text-xs sm:text-sm text-coastal-light-bg">
                    &copy; {new Date("05/05/2025").getFullYear()} Coffee Shop
                </div>
            </footer>
        </div>
    );
}