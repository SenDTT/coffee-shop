import Link from "next/link";
import { useState } from "react";
import { TbLayoutDashboardFilled, TbLayoutSidebarLeftCollapseFilled, TbLayoutSidebarRightCollapseFilled, TbLogout, TbMenu } from "react-icons/tb";
import { PiClipboardTextBold } from "react-icons/pi";
import { FaBoxes, FaNewspaper, FaUsers } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { AiFillProduct } from "react-icons/ai";
import { usePathname } from 'next/navigation';

export default function SideBar() {
    const pathname = usePathname();
    // Function to determine if the current path is active
    const isActive = (path: string) => pathname.startsWith(path) ? 'bg-gray-700 text-coastal-light-bg' : '';
    // Special case for the dashboard to handle exact match
    const isDashboardActive = (path: string) => pathname === path ? 'bg-gray-700 text-coastal-light-bg' : '';
    const [menuOpen, setMenuOpen] = useState(true);
    const toggleMenu = () => setMenuOpen(!menuOpen);
    return (
        <div className={`flex flex-col ${menuOpen ? 'w-64' : 'w-16'} justify-between h-screen bg-gray-800 text-coastal-light-bg`}>
            <div className="flex flex-col items-left py-4 gap-4">
                <div className={`inline-flex ${menuOpen ? 'justify-between' : 'justify-start'} items-center p-4 border-b border-slate-100`}>
                    <Link href="/"><h1 className={`text-2xl font-bold ${menuOpen ? 'block' : 'hidden'}`}>Coffee Shop</h1></Link>
                    {menuOpen ? (
                        <TbLayoutSidebarLeftCollapseFilled onClick={toggleMenu} className="text-2xl cursor-pointer text-coastal-light-bg" />
                    ) : (
                        <TbLayoutSidebarRightCollapseFilled onClick={toggleMenu} className="text-2xl cursor-pointer text-coastal-light-bg" />
                    )}
                </div>
                <nav className="mt-4">
                    <ul className="space-y-2">
                        <li className={menuOpen ? 'px-4' : 'px-2'}>
                            <Link href="/admin" className={`text-lg transition hover:bg-gray-700 hover:cursor-pointer ${menuOpen ? 'px-4' : 'px-2'} ${isDashboardActive('/admin')} py-2 inline-flex gap-2 items-center w-full rounded-md`}>
                                <TbLayoutDashboardFilled className="text-2xl" />
                                <p className={menuOpen ? 'block' : 'hidden'}>Dashboard</p>
                            </Link>
                        </li>
                        <li className={menuOpen ? 'px-4' : 'px-2'}>
                            <Link href="/admin/menu" className={`text-lg transition hover:bg-gray-700 hover:cursor-pointer ${menuOpen ? 'px-4' : 'px-2'} ${isActive('/admin/menu')} py-2 inline-flex gap-2 items-center w-full rounded-md`}>
                                <PiClipboardTextBold className="text-2xl" />
                                <p className={menuOpen ? 'block' : 'hidden'}>Menu</p>
                            </Link>
                        </li>
                        <li className={menuOpen ? 'px-4' : 'px-2'}>
                            <Link href="/admin/ingredients" className={`text-lg transition hover:bg-gray-700 hover:cursor-pointer ${menuOpen ? 'px-4' : 'px-2'} ${isActive('/admin/ingredients')} py-2 inline-flex gap-2 items-center w-full rounded-md`}>
                                <AiFillProduct className="text-2xl" />
                                <p className={menuOpen ? 'block' : 'hidden'}>Ingredients</p>
                            </Link>
                        </li>
                        <li className={menuOpen ? 'px-4' : 'px-2'}>
                            <Link href="/admin/orders" className={`text-lg transition hover:bg-gray-700 hover:cursor-pointer ${menuOpen ? 'px-4' : 'px-2'} ${isActive('/admin/orders')} py-2 inline-flex gap-2 items-center w-full rounded-md`}>
                                <FaBoxes className="text-2xl" />
                                <p className={menuOpen ? 'block' : 'hidden'}>Orders</p>
                            </Link>
                        </li>
                        <li className={menuOpen ? 'px-4' : 'px-2'}>
                            <Link href="/admin/blogs" className={`text-lg transition hover:bg-gray-700 hover:cursor-pointer ${menuOpen ? 'px-4' : 'px-2'} ${isActive('/admin/blogs')} py-2 inline-flex gap-2 items-center w-full rounded-md`}>
                                <FaNewspaper className="text-2xl" />
                                <p className={menuOpen ? 'block' : 'hidden'}>Blogs</p>
                            </Link>
                        </li>
                        <li className={menuOpen ? 'px-4' : 'px-2'}>
                            <Link href="/admin/users" className={`text-lg transition hover:bg-gray-700 hover:cursor-pointer ${menuOpen ? 'px-4' : 'px-2'} ${isActive('/admin/users')} py-2 inline-flex gap-2 items-center w-full rounded-md`}>
                                <FaUsers className="text-2xl" />
                                <p className={menuOpen ? 'block' : 'hidden'}>Users</p>
                            </Link>
                        </li>
                        <li className={menuOpen ? 'px-4' : 'px-2'}>
                            <Link href="/admin/settings" className={`text-lg transition hover:bg-gray-700 hover:cursor-pointer ${menuOpen ? 'px-4' : 'px-2'} ${isActive('/admin/settings')} py-2 inline-flex gap-2 items-center w-full rounded-md`}>
                                <IoMdSettings className="text-2xl" />
                                <p className={menuOpen ? 'block' : 'hidden'}>Settings</p>
                            </Link>
                        </li>
                        <li className={menuOpen ? 'px-4' : 'px-2'}>
                            <Link href="/auth/logout" className={`text-lg transition hover:bg-gray-700 hover:cursor-pointer ${menuOpen ? 'px-4' : 'px-2'} py-2 inline-flex gap-2 items-center w-full rounded-md`}>
                                <TbLogout className="text-2xl" />
                                <p className={menuOpen ? 'block' : 'hidden'}>Logout</p>
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