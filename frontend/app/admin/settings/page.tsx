// app/admin/settings/page.tsx
'use client';

import { useEffect, useState } from 'react';
import GeneralSettings from './GeneralSettings';
import HomepageSettings from './HomepageSettings';
import AdminLayout from '../../../components/Layouts/AdminLayout';
import Title from '../../../components/Admin/Title';
import { useAppSelector } from '../../../store';
// import ThemeAppearance from '@/components/admin/settings/ThemeAppearance';
// import DeliveryPickupSettings from '@/components/admin/settings/DeliveryPickupSettings';
// import PaymentSettings from '@/components/admin/settings/PaymentSettings';
// import TaxInvoiceSettings from '@/components/admin/settings/TaxInvoiceSettings';
// import NotificationsSubscriptions from '@/components/admin/settings/NotificationsSubscriptions';
// import SecurityAccessSettings from '@/components/admin/settings/SecurityAccessSettings';
// import SeoSocialMediaSettings from '@/components/admin/settings/SeoSocialMediaSettings';
// import CustomPagesSettings from '@/components/admin/settings/CustomPagesSettings';

const tabs = [
    { id: 'general', label: 'General' },
    { id: 'homepage', label: 'Homepage' },
    // { id: 'theme', label: 'Theme & Appearance' },
    // { id: 'delivery', label: 'Delivery & Pickup Settings' },
    // { id: 'payment', label: 'Payment Settings' },
    // { id: 'tax', label: 'Tax & Invoice' },
    // { id: 'notifications', label: 'Notifications & Subscriptions' },
    // { id: 'security', label: 'Security & Access' },
    // { id: 'seo', label: 'SEO & Social Media' },
    // { id: 'customPages', label: 'Custom Pages' },
];

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('general');
    const { settings } = useAppSelector(state => state.settings);

    useEffect(() => {
        if (settings?.shopName) {
            document.title = settings.shopName + " - Admin | Settings";
        }
    }, [settings]);

    const renderTabContent = () => {
        switch (activeTab) {
            case 'general': return <GeneralSettings />;
            case 'homepage': return <HomepageSettings />;
            // case 'theme': return <ThemeAppearance />;
            // case 'delivery': return <DeliveryPickupSettings />;
            // case 'payment': return <PaymentSettings />;
            // case 'tax': return <TaxInvoiceSettings />;
            // case 'notifications': return <NotificationsSubscriptions />;
            // case 'security': return <SecurityAccessSettings />;
            // case 'seo': return <SeoSocialMediaSettings />;
            // case 'customPages': return <CustomPagesSettings />;
            default: return null;
        }
    };

    return (
        <AdminLayout>
            {/* heading */}
            <Title title="Admin Settings" />

            <div className="w-full flex flex-col items-start sm:items-center gap-2 my-4 text-xs sm:text-base bg-white/50 rounded-lg py-3 px-4 shadow-md mb-4">
                <div className="w-full flex space-x-4 overflow-x-auto border-b mb-4">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors duration-200 ${activeTab === tab.id ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black'}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                <div className="w-full">
                    {renderTabContent()}
                </div>
            </div>
        </AdminLayout>
    );
}
