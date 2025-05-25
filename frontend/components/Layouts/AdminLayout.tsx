"use client";

import { AuthProvider } from "@/context/AuthContext";
import SideBar from "./SideBar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <div className="flex flex-row justify-start items-start gap-2">
                {/* sidebar */}
                <SideBar />

                {/* main content */}
                <main className="p-4 mt-4">{children}</main>
            </div>
        </AuthProvider>
    );
}
