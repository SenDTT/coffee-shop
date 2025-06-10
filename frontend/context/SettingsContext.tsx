'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { IGeneralSettings, ISetting, SettingsContextType } from '../types/Admin';
import api from '../api';

const SettingsContext = createContext<SettingsContextType>({
    settings: null,
    loading: true,
});

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
    const [settings, setSettings] = useState<IGeneralSettings | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await api.get("/admin/settings", { params: { group: 'general' } });
                const data = res.data.data || null;

                const settingsArray: ISetting[] = data;

                const settingsRecord: Record<string, string> = settingsArray.reduce((acc, setting) => {
                    acc[setting.key] = setting.value;
                    return acc;
                }, {} as Record<string, string>);

                setSettings({
                    shopName: settingsRecord.shopName || '',
                    shopDescription: settingsRecord.shopDescription || '',
                    shopEmail: settingsRecord.shopEmail || '',
                    shopPhone: settingsRecord.shopPhone || '',
                    shopAddress: settingsRecord.shopAddress || '',
                });
            } catch (err) {
                console.error('Failed to fetch settings', err);
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    return (
        <SettingsContext.Provider value={{ settings, loading }}>
            {children}
        </SettingsContext.Provider>
    );
};
