"use client";

import { AuthProvider } from "@/context/AuthContext";
import SideBar from "./SideBar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <div className="flex flex-row justify-start items-start bg-gray-100">
                {/* sidebar */}
                <SideBar />

                {/* main content */}
                <main className="w-full h-screen p-6 overflow-y-auto pt-8">{children}</main>
            </div>
        </AuthProvider>
    );
}
