"use client";

import Footer from "./Footer";
import Navbar from "./Navbar";
import { Provider } from 'react-redux'
import { store, useAppDispatch, useAppSelector } from '@/store'
import { useEffect } from "react";
import { hydrateFromStorage } from "@/store/slices/auth";

export default function Layout({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (!user && localStorage.getItem('auth')) {
            dispatch(hydrateFromStorage());
        }
    }, [user, dispatch]);

    return (
        <Provider store={store}>
            <Navbar />
            <main className="container mx-auto">{children}</main>
            <Footer />
        </Provider>
    );
}
