import Link from 'next/link';
import { TbAlertTriangle } from 'react-icons/tb';
import AdminLayout from '../../components/Layouts/AdminLayout';

export default function Admin404() {

    return (
        <AdminLayout>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 text-center">
                <div className="flex flex-col items-center space-y-4">
                    <TbAlertTriangle className="w-16 h-16 text-yellow-500" />
                    <h1 className="text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
                    <p className="text-gray-600 text-lg max-w-md">
                        Oops! The page you're looking for doesn't exist in the admin panel. It might have been moved or deleted.
                    </p>
                    <Link href="/admin" className="mt-4">
                        Go to Dashboard
                    </Link>
                </div>
            </div>
        </AdminLayout>
    );
};
