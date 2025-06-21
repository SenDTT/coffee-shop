'use client';

import AdminLayout from '../../../../components/Layouts/AdminLayout';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Title from '../../../../components/Admin/Title';
import AdminForm from '../../../../components/Admin/AdminForm';
import { CategoryParams, InputEvent, SelectOption } from '../../../../types/Product';
import api from '../../../../api';
import { useRouter } from 'next/navigation';
import { useSettings } from '../../../../context/SettingsContext';

const LIMIT = 50;

export default function AddBlogPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [success, setSuccess] = useState<string | null>(null);
    const initialData = {
        title: '',
        content: '',
        category: '',
        tags: '',
        image: '',
    };
    const { settings } = useSettings();
    const [content, setContent] = useState<string>('');

    useEffect(() => {
        if (settings?.shopName) {
            document.title = settings.shopName + " - Admin | Add Blog";
        }
    }, [settings]);

    const [formData, setFormData] = useState(initialData);
    const [categoryOptions, setCategoryOptions] = useState<SelectOption[]>([]);

    useEffect(() => {
        return () => setFormData(initialData);
    }, []);

    const getListCategories = async (search: string, page: number = 0) => {
        let params: CategoryParams = { limit: LIMIT, skip: page * LIMIT, type: 'blog' };
        if (search !== "") {
            params = { ...params, search };
        }
        const res = await api.get('/categories', { params });
        const response = res.status === 200 ? res.data.data : { data: [] };
        const data = response.data.map((item: any) => ({ value: item._id, label: item.name }));

        setCategoryOptions(data);
        return {
            data,
            nextPage: response.total < LIMIT + (page * LIMIT) ? null : page + 1
        };
    }

    const handleInputChange = (e: InputEvent) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        let isValid = true;

        if (!content) {
            newErrors.content = 'Content is required';
            isValid = isValid && false;
        }

        setErrors(prev => ({
            ...prev,
            ...newErrors
        }));

        return isValid;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setErrors({});
        setSuccess(null);

        if (!validateForm()) {
            setLoading(false);
            return;
        }

        try {
            // Simulate API call
            const formPayload = new FormData();

            Object.entries(formData).forEach(([key, value]) => {
                if (key === "image" || key === "content") return;
                formPayload.append(key, String(value));
            });

            if (content) {
                formPayload.append("content", content);
            }

            if (formData.image) {
                formPayload.append("image", formData.image);
            }

            const res = await api.post("/blogs", formPayload);

            const dataRes = res.data;

            if (dataRes.success) {
                setSuccess('Blog added successfully!');
                toast.success('Blog added successfully!');

                setTimeout(() => {
                    router.push('/admin/blogs');
                }, 2000);
            } else {
                setError('Failed to add Blog. Please try again.');
                toast.error('Failed to add Blog. Please try again.');
            }
        } catch (err) {
            setError('Failed to add Blog. Please try again.');
            toast.error('Failed to add Blog. Please try again.');

            if ((err as any)?.response?.data?.errors) {
                const errors = (err as any)?.response?.data?.errors;
                setErrors(errors);
            }
        } finally {
            setLoading(false);
        }
    };

    const onCollectContent = (content: string) => {
        setContent(content);
    };

    return (
        <AdminLayout>
            {/* Alert */}
            <ToastContainer />

            {/* heading */}
            <Title title="Add Blog" parentPath="/admin/blogs" />

            <div className="w-full flex flex-col sm:flex-row items-center gap-2 my-4 text-xs sm:text-base bg-white/50 rounded-lg py-3 px-4 shadow-md mb-4">
                {/* form */}
                <AdminForm fields={[
                    {
                        name: 'title',
                        label: 'Blog Title',
                        type: 'text',
                        placeholder: 'New Title',
                        required: true,
                        value: formData.title,
                        onChange: handleInputChange,
                        error: errors.title ?? ''
                    },
                    {
                        name: 'category',
                        label: 'Category',
                        type: 'async-select',
                        options: categoryOptions,
                        required: true,
                        value: formData.category,
                        onChange: handleInputChange,
                        fetchOptionsAPI: getListCategories,
                        error: errors.category ?? errors.categoryId ?? ''
                    },
                    {
                        name: 'tags',
                        label: 'Tags',
                        type: 'text',
                        placeholder: 'news',
                        required: true,
                        value: formData.tags,
                        onChange: handleInputChange,
                        error: errors.tags ?? '',
                    },
                    {
                        type: "editor",
                        name: "content",
                        label: "Content",
                        value: formData.content,
                        onChange: handleInputChange,
                        required: false,
                        error: errors.content ?? '',
                        onBeforeSubmitHanlde: onCollectContent,
                    },
                    {
                        name: 'image',
                        label: 'Featured Image',
                        type: 'file',
                        placeholder: 'upload image',
                        required: false,
                        value: formData.image,
                        multiple: false,
                        accept: 'image/*',
                        onChange: handleInputChange,
                        error: errors.image ?? '',
                    },
                ]} buttonDivClassName='w-2/3 mx-auto' formClassName='grid grid-cols-1 gap-4 w-2/3 mx-auto h-full p-6' setErrors={setErrors} onSubmit={handleSubmit} submitText="Submit" loading={loading} error={error ?? undefined} success={success ?? undefined} cancelUrl={'/admin/menu'} isShowButton={true}></AdminForm>
            </div>
        </AdminLayout>
    );
}