"use client";

import Footer from "./Footer";
import Navbar from "./Navbar";
import { Provider } from 'react-redux'
import { store, useAppDispatch, useAppSelector } from '../../store'
import { useEffect } from "react";
import { fetchUserMe, hydrateFromStorage } from "../../store/slices/auth";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger, ScrollToPlugin, useGSAP);

export default function Layout({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (!user && localStorage.getItem('auth')) {
            dispatch(hydrateFromStorage());
        }
    }, [user, dispatch]);

    useEffect(() => {
        dispatch(fetchUserMe())
    }, [dispatch])

    return (
        <Provider store={store}>
            <Navbar />
            <div className="bg-coffee/10">
                <main>{children}</main>
            </div>
            <Footer />
        </Provider>
    );
}
