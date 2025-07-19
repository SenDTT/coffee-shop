'use client';

// lazy load components
import dynamic from "next/dynamic";
const Title = dynamic(() => import("../../components/Admin/Title"), { ssr: true });
const AdminLayout = dynamic(() => import("../../components/Layouts/AdminLayout"), { ssr: true });
const SimpleLineChart = dynamic(() => import("../../components/Admin/Charts/LineChart"), { ssr: false });
const DonutChart = dynamic(() => import("../../components/Admin/Charts/DonutChart"), { ssr: false });

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <Title title="Dashboard" />
      {/* Add your admin dashboard components here */}
      <div className="grid grid-rows-2 gap-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="w-full h-full text-xs sm:text-base bg-white/50 rounded-lg p-4 shadow-md mb-4">
            <h2 className="text-lg font-semibold mb-4">Simple Line Chart</h2>
            <SimpleLineChart />
          </div>
          <div className="w-full h-full text-xs sm:text-base bg-white/50 rounded-lg p-4 shadow-md mb-4">
            <h2 className="text-lg font-semibold mb-4">Donut Chart</h2>
            <DonutChart />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Additional charts or components can be added here */}
          <div className="w-full h-full bg-white/50 rounded-lg py-3 px-4 shadow-md sm:col-span-2">
            {/* Placeholder for additional content */}
            <h2 className="text-lg font-semibold">Additional Chart</h2>
            <p className="text-sm">This is a placeholder for another chart or component.</p>
          </div>
          <div className="w-full h-full bg-white/50 rounded-lg py-3 px-4 shadow-md">
            {/* Placeholder for additional content */}
            <h2 className="text-lg font-semibold">More Insights</h2>
            <p className="text-sm">This is a placeholder for more insights or analytics.</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}