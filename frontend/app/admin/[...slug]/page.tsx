'use client';

import { notFound, useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const validAdminRoutes = ["dashboard", "products", "orders", "users"];

export default function AdminCatchAll() {
    const router = useRouter();
    const params = useParams();

    // Validate the route
    useEffect(() => {
        const slug = Array.isArray(params.slug) ? params.slug : [params.slug];
        const path = slug.join("/");

        if (!validAdminRoutes.includes(path)) {
            notFound(); // ✅ This shows the actual 404 page
        }
    }, [params, router]);

    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold">Admin Page</h1>
            <p className="text-gray-600 mt-2">This is a valid admin route.</p>
        </div>
    );
}
