'use client';

import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { CategoryParams, InputEvent, SelectOption } from '../../../../types/Product';
import api from '../../../../api';
import { useParams, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { clearCurrentAdminCategory, clearMessage, fetchAdminCategory, handleMessage, handleSetErrors } from '../../../../store/slices/admin/adminCategories';

// lazy load components
import dynamic from 'next/dynamic';
import { Category } from '../../../../types/Category';
const AdminLayout = dynamic(() => import('../../../../components/Layouts/AdminLayout'), { ssr: false });
const Title = dynamic(() => import('../../../../components/Admin/Title'), { ssr: true });
const AdminForm = dynamic(() => import('../../../../components/Admin/AdminForm'), { ssr: false });

const LIMIT = 50;

export interface CategoryData {
    name: string;
    description: string;
    type: string;
    parent?: string;
    active: number;
    parentId?: string;
}

export default function EditCategoryPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id;
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
            document.title = settings.shopName + " - Admin | Edit Category";
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
        if (id && typeof id === 'string') {
            getCategoryById(id)
        }
        return () => {
            setFormData(initialData);
            dispatch(clearCurrentAdminCategory());
            dispatch(handleSetErrors({ errors: {} }));
            setCategoryOptions([]);
        }
    }, [id]);

    const getCategoryById = async (id: string) => {
        try {
            const response = await api.get(`/categories/${id}`);
            const dataRes = response.data;

            if (dataRes.success && dataRes.data) {
                dispatch(fetchAdminCategory(dataRes));
                if (dataRes.data.parent) {
                    setCategoryOptions([{ value: dataRes.data.parent._id, label: dataRes.data.parent.name }]);
                }
                setFormData({
                    name: dataRes.data.name,
                    description: dataRes.data.description,
                    parent: dataRes.data.parent ? dataRes.data.parent._id : '',
                    type: dataRes.data.type,
                    active: dataRes.data.active,
                });
            }
        } catch (err) {
            dispatch(handleMessage({ success: false, message: "Failed to fetch category. Please try again." }));

            if ((err as any)?.response?.data?.errors) {
                const errors = (err as any)?.response?.data?.errors;
                setErrors(errors);
            }
        }
    }

    const setErrors = (err: Record<string, string>) => {
        dispatch(handleSetErrors({ errors: err }));
    }

    const getListCategories = async (search: string, page: number = 0) => {
        let params: CategoryParams = { limit: LIMIT, skip: page * LIMIT, type: 'product' };
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

            const res = await api.put(`/categories/${id}`, data);

            const dataRes = res.data;

            if (dataRes.success) {
                dispatch(handleMessage(dataRes));

                setTimeout(() => {
                    router.push(`/admin/categories`);
                }, 2000);
            } else {
                dispatch(handleMessage({ success: false, message: "Failed to update category" }));
            }
        } catch (err) {
            dispatch(handleMessage({ success: false, message: "Failed to update category" }));

            if ((err as any)?.response?.data?.errors) {
                const errors = (err as any)?.response?.data?.errors;
                setErrors(errors);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            {/* Alert */}
            <ToastContainer />

            {/* heading */}
            <Title title="Edit Category" parentPath={`/admin/categories?id=${id}&view=true`} />

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