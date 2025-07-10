"use client";

import SideBar from "./SideBar";
import { Provider } from 'react-redux'
import { store, useAppDispatch, useAppSelector } from '../../store'
import { useEffect } from "react";
import { fetchSettings } from "../../store/slices/setting";
import { hydrateFromStorage } from "../../store/slices/auth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (!user && localStorage.getItem('auth')) {
            dispatch(hydrateFromStorage());
        }
    }, [user, dispatch]);

    useEffect(() => {
        dispatch(fetchSettings())
    }, [dispatch])

    return (
        <Provider store={store}>
            <div className="flex flex-row justify-start items-start bg-gray-100">
                {/* sidebar */}
                <SideBar />

                {/* main content */}
                <main className="w-full h-screen p-6 overflow-y-auto pt-8">{children}</main>
            </div>
        </Provider>
    );
}
