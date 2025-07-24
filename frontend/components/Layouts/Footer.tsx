import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="main-footer space-y-4 py-10 px-5 sm:px-32 mt-10 sm:mt-0">
            <div className="bg-black/30 shadow-md rounded-3xl flex flex-col space-y-4 py-6 px-2 sm:p-4">
                <div className="container mx-auto sm:px-4 sm:py-6 flex flex-col sm:flex-row justify-between items-center sm:items-baseline gap-6">
                    <div className="text-latte-200 font-bold text-3xl font-serif">
                        Coffee Shop
                    </div>
                    <nav className="space-x-6">
                        {['Menu', 'Blogs', 'About', 'Contact'].map((page) => (
                            <Link
                                key={page}
                                href={`/${page.toLowerCase()}`}
                                className="text-latte-200 hover:text-mocha-300 transition-colors duration-200 text-base"
                            >
                                {page}
                            </Link>
                        ))}
                    </nav>
                    <div className="flex flex-col space-y-4 text-center sm:text-left">
                        <div className="text-latte-200 text-lg font-semibold">Contact Us</div>
                        <div className="text-latte-200 text-sm">
                            <p><span className="font-extrabold">Address:</span> 1000 N 4st St, Irvine, CA, 100000</p>
                            <p><span className="font-extrabold">Phone:</span> +1 (123) 456-7890</p>
                            <p><span className="font-extrabold">Email:</span> contact.coffee@gmail.com</p>
                        </div>
                        <div className="flex space-x-4 items-center sm:items-start justify-center sm:justify-start">
                            <Link href="#"><FaFacebook className="text-latte-200 hover:text-mocha-300 size-6" /></Link>

                            <Link href="#"><FaInstagram className="text-latte-200 hover:text-mocha-300 size-6" /></Link>

                            <Link href="#"><FaTwitter className="text-latte-200 hover:text-mocha-300 size-6" /></Link>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <Link href="/privacy" className="text-latte-200 hover:text-mocha-300 transition-colors duration-200 text-sm px-2 sm:border-r border-latte-200 underline">
                        Privacy Policy
                    </Link>
                    <Link href="/terms" className="text-latte-200 hover:text-mocha-300 transition-colors duration-200 text-sm px-2 underline">
                        Terms of Service
                    </Link>
                </div>
                <hr className="border-t border-latte-200 mt-4" />
                <div className="container mx-auto px-4 py-2 sm:py-4 text-center text-sm text-latte-200">
                    &copy; {new Date("05/05/2025").getFullYear()} Coffee Shop. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
