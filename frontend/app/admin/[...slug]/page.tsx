'use client';

import AdminLayout from '@/components/Layouts/AdminLayout';
import { notFound, useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FaSpinner } from 'react-icons/fa';

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
        <AdminLayout>
            <div className="h-screen flex flex-col justify-center items-center">
                <FaSpinner className='size-4 animate-spin' />
            </div>
        </AdminLayout>
    );
}
