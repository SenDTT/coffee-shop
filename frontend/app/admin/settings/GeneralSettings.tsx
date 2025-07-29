'use client';

import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import api from "../../../api";
import { IGeneralSettings, ISetting } from "../../../types/Admin";
import AdminForm from "../../../components/Admin/AdminForm";
import { InputEvent } from "../../../types/Product";
import { useAppDispatch, useAppSelector } from "../../../store";
import { clearMessage, fetchGeneralSetting, handleMessage, handleSetErrors } from "../../../store/slices/setting";

export default function GeneralSettings() {
    const [loading, setLoading] = useState(false);
    const initial: IGeneralSettings = {
        shopName: "",
        shopDescription: "",
        shopEmail: "",
        shopPhone: "",
        shopAddress: ""
    }
    const [formData, setFormData] = useState<IGeneralSettings>(initial);
    const { settings, error, success, message, errors } = useAppSelector(state => state.settings);
    const dispatch = useAppDispatch();

    useEffect(() => {
        // fetch data - general
        fetchData();
    }, []);

    useEffect(() => {
        if (settings) {
            setFormData(settings);
        }
        if (settings?.shopName) {
            document.title = settings.shopName + " - Admin | General Settings";
        }
    }, [settings]);

    useEffect(() => {
        if (error && message) {
            toast.error(message);
            dispatch(clearMessage());
        } else if (success && message) {
            toast.success(message);
            dispatch(clearMessage())
        }
    }, [error, success, message, dispatch]);

    const setErrors = (err: Record<string, string>) => {
        dispatch(handleSetErrors({ errors: err }));
    }

    const fetchData = async () => {
        try {
            const response = await api.get("/admin/settings", { params: { group: 'general' } });
            const res = response.data;

            if (res.success && res.data && Array.isArray(res.data)) {
                const settingsArray: ISetting[] = res.data;

                const settingsRecord: Record<string, string> = settingsArray.reduce((acc, setting) => {
                    acc[setting.key] = setting.value;
                    return acc;
                }, {} as Record<string, string>);

                const generalSettings: IGeneralSettings = {
                    shopName: settingsRecord.shopName ?? initial.shopName,
                    shopDescription: settingsRecord.shopDescription ?? initial.shopDescription,
                    shopEmail: settingsRecord.shopEmail ?? initial.shopEmail,
                    shopPhone: settingsRecord.shopPhone ?? initial.shopPhone,
                    shopAddress: settingsRecord.shopAddress ?? initial.shopAddress,
                };
                dispatch(fetchGeneralSetting({ data: generalSettings, success: true }));
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

        dispatch(clearMessage());
        try {
            // Simulate API call
            const res = await api.put("/admin/settings", { group: 'general', data: formData });

            const dataRes = res.data;

            if (dataRes.success) {
                dispatch(handleMessage({ success: true, message: "Settings updated successfully." }));
            } else {
                dispatch(handleMessage({ success: false, message: 'Failed to update settings. Please try again.' }));
            }
        } catch (err) {
            dispatch(handleMessage({ success: false, message: 'Failed to update settings. Please try again.' }));

            if ((err as any)?.response?.data?.errors) {
                const errors = (err as any)?.response?.data?.errors;
                setErrors(errors);
            }
        } finally {
            setLoading(false);
            fetchData();
        }
    };

    return (
        <div className="gap-4 justify-end items-end">
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
            ]} className="sm:-mx-2" setErrors={setErrors} onSubmit={handleSubmit} submitText="Submit" loading={loading} cancelUrl={'/admin/settings'} isShowButton={true}></AdminForm>
            <ToastContainer />
        </div>
    );
}
