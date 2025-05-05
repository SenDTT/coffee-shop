"use client";

import { AuthProvider } from "@/context/AuthContext";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <Navbar />
            <main className="container mx-auto">{children}</main>
            <Footer />
        </AuthProvider>
    );
}
