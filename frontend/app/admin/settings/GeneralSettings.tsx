'use client';

import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import api from "../../../api";
import { IGeneralSettings, ISetting } from "../../../types/Admin";
import AdminForm from "../../../components/Admin/AdminForm";
import { InputEvent } from "../../../types/Product";

export default function GeneralSettings() {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState();
    const initial: IGeneralSettings = {
        shopName: "Cloud Brew",
        shopDescription: "Coffee and Blog",
        shopEmail: "coffee.contact@gmail.com",
        shopPhone: "+1 (123) 234-xxxx",
        shopAddress: "Irving, Texas"
    }
    const [formData, setFormData] = useState<IGeneralSettings>(initial);

    useEffect(() => {
        // fetch data - general
        fetchData();

    }, []);

    const fetchData = async () => {
        try {
            const response = await api.get("/admin/settings", { params: { group: 'general' } });
            const res = response.data;

            if (res.success && res.data && Array.isArray(res.data)) {
                setData(res.data);
                const settingsArray: ISetting[] = res.data;

                const settingsRecord: Record<string, string> = settingsArray.reduce((acc, setting) => {
                    acc[setting.key] = setting.value;
                    return acc;
                }, {} as Record<string, string>);

                setFormData({
                    shopName: settingsRecord.shopName || initial.shopName,
                    shopDescription: settingsRecord.shopDescription || initial.shopDescription,
                    shopEmail: settingsRecord.shopEmail || initial.shopEmail,
                    shopPhone: settingsRecord.shopPhone || initial.shopPhone,
                    shopAddress: settingsRecord.shopAddress || initial.shopAddress,
                });
            }

        } catch (err) {
            toast.error("Fetch General Settings failed.");
            console.log(err);
        }
    }

    const handleInputChange = (e: InputEvent) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            // Simulate API call
            const res = await api.put("/admin/settings", { group: 'general', data: formData });

            const dataRes = res.data;

            if (dataRes.success) {
                setSuccess('Updated successfully!');
                toast.success('Updated successfully!');
            } else {
                setError('Failed to update settings. Please try again.');
                toast.error('Failed to update settings. Please try again.');
            }
        } catch (err) {
            setError('Failed to update settings. Please try again.');
            toast.error('Failed to update settings. Please try again.');

            if ((err as any)?.response?.data?.errors) {
                const errors = (err as any)?.response?.data?.errors;
                setErrors(errors);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="gap-4 justify-end items-end">
            <ToastContainer />

            <AdminForm fields={[
                {
                    name: 'shopName',
                    label: 'Name',
                    type: 'text',
                    placeholder: 'Cloud Brew',
                    required: true,
                    value: formData.shopName,
                    onChange: handleInputChange,
                    error: errors.shopName ?? ''
                },
                {
                    name: 'shopEmail',
                    label: 'Email',
                    type: 'text',
                    placeholder: 'example@gmail.com',
                    required: true,
                    value: formData.shopEmail,
                    onChange: handleInputChange,
                    error: errors.shopEmail ?? ''
                },
                {
                    name: 'shopPhone',
                    label: 'Phone',
                    type: 'text',
                    placeholder: '+198xxxxxx',
                    required: true,
                    value: formData.shopPhone,
                    onChange: handleInputChange,
                    error: errors.shopPhone ?? ''
                },
                {
                    name: 'shopAddress',
                    label: 'Address',
                    type: 'text',
                    placeholder: 'Irving, Texas',
                    required: true,
                    value: formData.shopAddress,
                    onChange: handleInputChange,
                    error: errors.shopAddress ?? ''
                },
                {
                    name: 'shopDescription',
                    label: 'Description',
                    type: 'textarea',
                    placeholder: 'Description',
                    required: true,
                    value: formData.shopDescription,
                    onChange: handleInputChange,
                    error: errors.shopDescription ?? ''
                },
            ]} className="sm:-mx-2" setErrors={setErrors} onSubmit={handleSubmit} submitText="Submit" loading={loading} error={error ?? undefined} success={success ?? undefined} cancelUrl={'/admin/settings'} isShowButton={true}></AdminForm>
        </div>
    );
}
