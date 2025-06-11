'use client';

import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import api from "../../../api";
import { IHompageSettings, ISetting } from "../../../types/Admin";
import AdminForm from "../../../components/Admin/AdminForm";
import { InputEvent } from "../../../types/Product";

const groupName: string = 'homepage';

export default function HomepageSettings() {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState();
    const initial: IHompageSettings = {
        bannerText: '',
        heroImage: '',
    }
    const [formData, setFormData] = useState<IHompageSettings>(initial);

    useEffect(() => {
        // fetch data - homepage
        fetchData();

    }, []);

    const fetchData = async () => {
        try {
            const response = await api.get("/admin/settings", { params: { group: groupName } });
            const res = response.data;

            if (res.success && res.data && Array.isArray(res.data)) {
                setData(res.data);
                const settingsArray: ISetting[] = res.data;

                const settingsRecord: Record<string, string> = settingsArray.reduce((acc, setting) => {
                    acc[setting.key] = Array.isArray(setting.value) ? setting.value.join(",") : setting.value;
                    return acc;
                }, {} as Record<string, string>);

                setFormData({
                    bannerText: settingsRecord.bannerText ?? '',
                    heroImage: settingsRecord.bannerText ?? '',
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
            const formPayload = new FormData();

            formPayload.append("bannerText", formData.bannerText);

            if (formData.heroImage) {
                formPayload.append("heroImage", formData.heroImage);
            }

            const res = await api.put(`/admin/settings/${groupName}`, formData);

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
                    name: 'bannerText',
                    label: 'Banner Text',
                    type: 'text',
                    placeholder: 'Cloud Brew',
                    required: true,
                    value: formData.bannerText,
                    onChange: handleInputChange,
                    error: errors.bannerText ?? ''
                },
                {
                    name: 'heroImage',
                    label: 'Hero Image',
                    type: 'file',
                    placeholder: 'upload image',
                    required: false,
                    value: formData.heroImage,
                    multiple: false,
                    accept: 'image/*',
                    onChange: handleInputChange,
                    error: errors.heroImage ?? '',
                    isBannerImage: true,
                },
            ]} className="sm:-mx-2" setErrors={setErrors} onSubmit={handleSubmit} submitText="Submit" loading={loading} error={error ?? undefined} success={success ?? undefined} cancelUrl={'/admin/settings'} isShowButton={true}></AdminForm>
        </div>
    );
}
