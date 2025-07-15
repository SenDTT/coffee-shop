'use client';

// lazy load components
import dynamic from "next/dynamic";
const Title = dynamic(() => import("../../components/Admin/Title"), { ssr: true });
const AdminLayout = dynamic(() => import("../../components/Layouts/AdminLayout"), { ssr: false });

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <Title title="Dashboard" />
      {/* Add your admin dashboard components here */}
    </AdminLayout>
  );
}