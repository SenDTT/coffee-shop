import Link from "next/link";


export default function SideBar() {
    return (
        <div className="flex flex-col w-64 justify-between h-screen bg-gray-800 text-white">
            <div className="flex flex-col items-left py-4 gap-4">
                <h1 className="text-2xl font-bold py-4 border-b border-slate-100 px-6">Coffee Shop</h1>
                <nav className="mt-4">
                    <ul className="space-y-2">
                        <li>
                            <Link href="/admin" className="text-lg transition hover:bg-gray-700 hover:cursor-pointer px-6 py-2 block">Dashboard</Link>
                        </li>
                        <li>
                            <Link href="/admin/menu" className="text-lg transition hover:bg-gray-700 hover:cursor-pointer px-6 py-2 block">Menu</Link>
                        </li>
                        <li>
                            <Link href="/admin/orders" className="text-lg transition hover:bg-gray-700 hover:cursor-pointer px-6 py-2 block">Orders</Link>
                        </li>
                        <li>
                            <Link href="/admin/users" className="text-lg transition hover:bg-gray-700 hover:cursor-pointer px-6 py-2 block">Users</Link>
                        </li>
                        <li>
                            <Link href="/admin/settings" className="text-lg transition hover:bg-gray-700 hover:cursor-pointer px-6 py-2 block">Settings</Link>
                        </li>
                    </ul>
                </nav>
            </div>

            <footer className="mt-10">
                <div className="container mx-auto px-4 py-6 text-center text-sm text-white">
                    &copy; {new Date("05/05/2025").getFullYear()} Coffee Shop
                </div>
            </footer>
        </div>
    );
}