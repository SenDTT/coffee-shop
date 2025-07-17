'use client';

import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { GetListParams, InputEvent, SelectOption } from '../../../../types/Product';
import api from '../../../../api';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { clearMessage, handleMessage, handleSetErrors } from '../../../../store/slices/admin/adminCategories';

// lazy load components
import dynamic from 'next/dynamic';
import { CategoryData } from '../[id]/page';
import { Category } from '../../../../types/Category';
const AdminLayout = dynamic(() => import('../../../../components/Layouts/AdminLayout'), { ssr: false });
const Title = dynamic(() => import('../../../../components/Admin/Title'), { ssr: true });
const AdminForm = dynamic(() => import('../../../../components/Admin/AdminForm'), { ssr: false });

const LIMIT = 50;

export default function AddCategoryPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const initialData: CategoryData = {
        name: '',
        description: '',
        type: 'ingredient',
        parent: '',
        active: 1,
    };
    const [formData, setFormData] = useState<CategoryData>(initialData);
    const [categoryOptions, setCategoryOptions] = useState<SelectOption[]>([]);
    const { settings } = useAppSelector(state => state.settings);
    const { error, success, message, errors } = useAppSelector(state => state.adminCategories);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (settings?.shopName) {
            document.title = settings.shopName + " - Admin | Add Category";
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
    }, [error, success, message]);

    useEffect(() => {
        return () => {
            setFormData(initialData);
            dispatch(handleSetErrors({ errors: {} }));
            setCategoryOptions([]);
        }
    }, []);

    const getListCategories = async (search: string, page: number = 0) => {
        let params: GetListParams = { limit: LIMIT, skip: page * LIMIT };
        if (search !== "") {
            params = { ...params, search };
        }
        const res = await api.get('/categories', { params });
        const response = res.status === 200 ? res.data.data : { data: [] };
        const data = response.data.map((item: Category) => ({ value: item._id, label: item.name }));

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

        dispatch(clearMessage());
        try {
            // Simulate API call
            let data: CategoryData = formData;

            if (formData.parent) {
                data = { ...formData, parentId: formData.parent };
            }
            delete data.parent;

            const res = await api.post("/categories", data);

            const dataRes = res.data;

            if (dataRes.success) {
                dispatch(handleMessage(dataRes));

                setTimeout(() => {
                    router.push('/admin/categories');
                }, 2000);
            } else {
                dispatch(handleMessage({ success: false, message: "Failed to add category" }));
            }
        } catch (err) {
            dispatch(handleMessage({ success: false, message: "Failed to add category" }));

            if ((err as any)?.response?.data?.errors) {
                const errors = (err as any)?.response?.data?.errors;
                setErrors(errors);
            }
        } finally {
            setLoading(false);
            setFormData(initialData);
        }
    };

    const setErrors = (err: Record<string, string>) => {
        dispatch(handleSetErrors({ errors: err }));
    }

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
                        value: formData.parent ?? '',
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
                ]} setErrors={setErrors} onSubmit={handleSubmit} submitText="Submit" loading={loading} cancelUrl={'/admin/categories'} isShowButton={true}></AdminForm>
            </div>
        </AdminLayout>
    );
}