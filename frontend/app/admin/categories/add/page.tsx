'use client';

import AdminLayout from '../../../../components/Layouts/AdminLayout';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Title from '../../../../components/Admin/Title';
import AdminForm from '../../../../components/Admin/AdminForm';
import { GetListParams, InputEvent, SelectOption } from '../../../../types/Product';
import api from '../../../../api';
import { useRouter } from 'next/navigation';

const LIMIT = 50;

export default function AddCategoryPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [success, setSuccess] = useState<string | null>(null);
    const initialData = {
        name: '',
        description: '',
        type: 'ingredient',
        parent: '',
        active: 1,
    };

    const [formData, setFormData] = useState(initialData);
    const [categoryOptions, setCategoryOptions] = useState<SelectOption[]>([]);

    useEffect(() => {
        return () => setFormData(initialData);
    }, []);

    const getListCategories = async (search: string, page: number = 0) => {
        let params: GetListParams = { limit: LIMIT, skip: page * LIMIT };
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
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            // Simulate API call
            let data: any = formData;

            if (formData.parent) {
                data = { ...formData, parentId: formData.parent };
            }
            delete data.parent;

            const res = await api.post("/categories", data);

            const dataRes = res.data;

            if (dataRes.success) {
                setSuccess('Category added successfully!');
                toast.success('Category added successfully!');

                setTimeout(() => {
                    router.push('/admin/categories');
                }, 2000);
            } else {
                setError('Failed to add category. Please try again.');
                toast.error('Failed to add category. Please try again.');
            }
        } catch (err) {
            setError('Failed to add category. Please try again.');
            toast.error('Failed to add category. Please try again.');

            if ((err as any)?.response?.data?.errors) {
                const errors = (err as any)?.response?.data?.errors;
                setErrors(errors);
            }
        } finally {
            setLoading(false);
            setFormData(initialData);
        }
    };

    return (
        <AdminLayout>
            {/* Alert */}
            <ToastContainer />

            {/* heading */}
            <Title title="Add Category" parentPath="/admin/categories" />

            <div className="w-full flex flex-col sm:flex-row items-center gap-2 my-4 text-xs sm:text-base bg-white/50 rounded-lg py-3 px-4 shadow-md mb-4">
                {/* form */}
                <AdminForm fields={[
                    {
                        name: 'name',
                        label: 'Category Name',
                        type: 'text',
                        placeholder: 'Blog',
                        required: true,
                        value: formData.name,
                        onChange: handleInputChange,
                        error: errors.name ?? ''
                    },
                    {
                        name: 'type',
                        label: 'Type',
                        type: 'select',
                        options: [{ value: 'ingredient', label: 'Ingredient' }, { value: 'product', label: 'Product' }, { value: 'blog', label: 'Blog' }],
                        required: true,
                        value: formData.type,
                        onChange: handleInputChange,
                        error: errors.type ?? ''
                    },
                    {
                        name: 'parent',
                        label: 'Parent',
                        type: 'async-select',
                        options: categoryOptions,
                        required: false,
                        value: formData.parent,
                        onChange: handleInputChange,
                        fetchOptionsAPI: getListCategories,
                        error: errors.parent ?? errors.parentId ?? ''
                    },
                    {
                        name: 'active',
                        label: 'Active Status',
                        type: 'select',
                        options: [{ value: '1', label: 'Active' }, { value: '0', label: 'Inactive' }],
                        required: true,
                        value: formData.active.toString(),
                        onChange: handleInputChange,
                        error: errors.active ?? ''
                    },
                    {
                        name: 'description',
                        label: 'Description',
                        type: 'textarea',
                        placeholder: 'Enter category description',
                        required: true,
                        value: formData.description,
                        onChange: handleInputChange,
                        error: errors.description ?? ''
                    },
                ]} setErrors={setErrors} onSubmit={handleSubmit} submitText="Submit" loading={loading} error={error ?? undefined} success={success ?? undefined} cancelUrl={'/admin/categories'} isShowButton={true}></AdminForm>
            </div>
        </AdminLayout>
    );
}