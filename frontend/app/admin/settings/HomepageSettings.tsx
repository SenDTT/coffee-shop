'use client';

import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import api from "../../../api";
import { IHompageSettings, ISetting } from "../../../types/Admin";
import AdminForm from "../../../components/Admin/AdminForm";
import { InputEvent } from "../../../types/Product";
import { useAppDispatch, useAppSelector } from "../../../store";
import { clearMessage, fetchCurrentSetting, handleMessage, handleSetErrors } from "../../../store/slices/setting";

const groupName: string = 'homepage';

export default function HomepageSettings() {
    const [loading, setLoading] = useState(false);
    const initial: IHompageSettings = {
        bannerText: '',
        heroImage: '',
    }
    const [formData, setFormData] = useState<IHompageSettings>(initial);
    const { currentSettingData, error, success, message, errors } = useAppSelector(state => state.settings);
    const dispatch = useAppDispatch();

    useEffect(() => {
        // fetch data - homepage
        fetchData();
    }, []);

    useEffect(() => {
        if (currentSettingData) {
            setFormData({
                bannerText: currentSettingData.bannerText ?? '',
                heroImage: currentSettingData.heroImage ?? '',
            });
        }
    }, [currentSettingData]);

    useEffect(() => {
        if (error && message) {
            toast.error(message);
            dispatch(clearMessage());
        } else if (success && message) {
            toast.success(message);
            dispatch(clearMessage())
        }
    }, [error, success, message, dispatch]);

    const fetchData = async () => {
        try {
            const response = await api.get("/admin/settings", { params: { group: groupName } });
            const res = response.data;

            if (res.success && res.data && Array.isArray(res.data)) {
                const settingsArray: ISetting[] = res.data;

                const settingsRecord: Record<string, string> = settingsArray.reduce((acc, setting) => {
                    acc[setting.key] = Array.isArray(setting.value) ? setting.value.join(",") : setting.value;
                    return acc;
                }, {} as Record<string, string>);

                dispatch(fetchCurrentSetting({ data: settingsRecord, success: true }));
            }

        } catch (err) {
            dispatch(handleMessage({ success: false, message: "Failed to fetch homepage settings. Please try again." }));
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
            const formPayload = new FormData();

            formPayload.append("bannerText", formData.bannerText);

            if (formData.heroImage) {
                formPayload.append("heroImage", formData.heroImage);
            }

            const res = await api.put(`/admin/settings/${groupName}`, formData);

            const dataRes = res.data;

            if (dataRes.success) {
                dispatch(handleMessage({ success: true, message: "Homepage settings updated successfully." }));
            } else {
                dispatch(handleMessage({ success: false, message: 'Failed to update homepage settings. Please try again.' }));
            }
        } catch (err) {
            dispatch(handleMessage({ success: false, message: 'Failed to update homepage settings. Please try again.' }));

            if ((err as any)?.response?.data?.errors) {
                const errors = (err as any)?.response?.data?.errors;
                setErrors(errors);
            }
        } finally {
            setLoading(false);
            fetchData();
        }
    };

    const setErrors = (err: Record<string, string>) => {
        dispatch(handleSetErrors({ errors: err }));
    }

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
            ]} className="sm:-mx-2" setErrors={setErrors} onSubmit={handleSubmit} submitText="Submit" loading={loading} cancelUrl={'/admin/settings'} isShowButton={true}></AdminForm>
        </div>
    );
}
