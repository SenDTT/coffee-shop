"use client";

import { AuthProvider } from "@/context/AuthContext";
import SideBar from "./SideBar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <div className="grid grid-col-2 gap-2">
                {/* sidebar */}
                <SideBar />

                {/* main content */}
                <main className="container mx-auto px-4 py-6">{children}</main>
            </div>
        </AuthProvider>
    );
}
