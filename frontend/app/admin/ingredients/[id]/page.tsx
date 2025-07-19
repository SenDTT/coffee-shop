'use client';

import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { CategoryParams, InputEvent, SelectOption } from '../../../../types/Product';
import api from '../../../../api';
import { useParams, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { clearCurrentIngredient, clearMessage, fetchAnIngredient, handleSetErrors, handleMessage } from '../../../../store/slices/admin/adminIngredients';

// lazy load components
import dynamic from 'next/dynamic';
import { Category } from '../../../../types/Category';
const Title = dynamic(() => import('../../../../components/Admin/Title'), { ssr: true });
const AdminForm = dynamic(() => import('../../../../components/Admin/AdminForm'), { ssr: false });
const AdminLayout = dynamic(() => import('../../../../components/Layouts/AdminLayout'), { ssr: true });

const LIMIT = 50;

export default function EditIngredientPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id;
    const [loading, setLoading] = useState(false);
    const [skuPrefix, setSkuPrefix] = useState("");
    const initialData = {
        name: '',
        sku: '',
        price: '',
        description: '',
        category: '',
        stock: '1',
        images: [],
        active: 1,
    };
    const [deletedImages, setDeletedImages] = useState<string[]>([]);
    const [formData, setFormData] = useState(initialData);
    const [categoryOptions, setCategoryOptions] = useState<SelectOption[]>([]);
    const { settings } = useAppSelector(state => state.settings);
    const dispatch = useAppDispatch();
    const { error, message, success, errors, selectedIngredient } = useAppSelector(state => state.adminIngredients);

    useEffect(() => {
        if (settings?.shopName) {
            document.title = settings.shopName + " - Admin | Edit Ingredient";
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
            getIngredientById(id)
        }
        return () => {
            setFormData(initialData);
            dispatch(clearCurrentIngredient());
            setErrors({});
        }
    }, [id]);

    const getIngredientById = async (id: string) => {
        try {
            const response = await api.get(`/ingredients/${id}`);
            const dataRes = response.data;

            if (dataRes.success && dataRes.data) {
                dispatch(fetchAnIngredient(dataRes));
                const skuSplit = dataRes.data.sku.split("-");
                setSkuPrefix(skuSplit[0] + "-");
                setCategoryOptions([{ value: dataRes.data.category._id, label: dataRes.data.category.name }])
                setFormData({
                    name: dataRes.data.name,
                    sku: skuSplit[1],
                    price: dataRes.data.price + "",
                    description: dataRes.data.description,
                    category: dataRes.data.category._id,
                    stock: dataRes.data.stock + "",
                    images: dataRes.data.images,
                    active: dataRes.data.active,
                });
            }
        } catch (err) {
            dispatch(handleMessage({ success: false, message: 'Failed to get product. Please try again.' }))

            if ((err as any)?.response?.data?.errors) {
                const errors = (err as any)?.response?.data?.errors;
                setErrors(errors);
            }
        }
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
            [name]: name === 'images'
                ? Array.isArray(value)
                    ? value
                    : []
                : value,
        }));
    };

    const selectCategoryCallBack = (e: SelectOption) => {
        const label = e.label.split(" ");

        let arr = label.map((word, index) => {
            if (index < label.length - 1) {
                return word.charAt(0).toUpperCase();
            } else {
                return word.toUpperCase();
            }
        });

        setSkuPrefix(arr.join("") + "-");
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Simulate API call
            const formPayload = new FormData();

            Object.entries(formData).forEach(([key, value]) => {
                if (key === "sku" || key === "images" || key === "category") return;
                formPayload.append(key, String(value));
            });

            formPayload.append("categoryId", formData.category);
            formPayload.append("sku", skuPrefix + formData.sku);
            // add deleted images
            if (deletedImages && deletedImages.length > 0) {
                deletedImages.forEach(path => formPayload.append("deletedImages", path));
            }

            formData.images.forEach((file: File) => {
                formPayload.append("images", file);
            });

            const res = await api.put(`/ingredients/${id}`, formPayload);

            const dataRes = res.data;

            if (dataRes.success) {
                dispatch(handleMessage({ success: true, message: 'Ingredient updated successfully!' }));

                setTimeout(() => {
                    router.push(`/admin/ingredients?id=${id}&view=true`);
                }, 2000);
            } else {
                dispatch(handleMessage({ success: false, message: 'Failed to update Ingredient. Please try again.' }))
            }
        } catch (err) {
            dispatch(handleMessage({ success: false, message: 'Failed to update Ingredient. Please try again.' }))

            if ((err as any)?.response?.data?.errors) {
                const errors = (err as any)?.response?.data?.errors;
                setErrors(errors);
            }
        } finally {
            setLoading(false);
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
            <Title title="Edit Ingredient" parentPath={`/admin/ingredients?id=${id}&view=true`} />

            <div className="w-full flex flex-col sm:flex-row items-center gap-2 my-4 text-xs sm:text-base bg-white/50 rounded-lg py-3 px-4 shadow-md mb-4">
                {/* form */}
                <AdminForm fields={[
                    {
                        name: 'name',
                        label: 'Ingredient Name',
                        type: 'text',
                        placeholder: 'Coffee Beans',
                        required: true,
                        value: formData.name,
                        onChange: handleInputChange,
                        error: errors.name ?? ''
                    },
                    {
                        name: 'sku',
                        label: 'SKU',
                        type: 'text',
                        prefix: skuPrefix,
                        placeholder: '01',
                        required: true,
                        value: formData.sku,
                        onChange: handleInputChange,
                        error: errors.sku ?? ''
                    },
                    {
                        name: 'price',
                        label: 'Price',
                        type: 'text',
                        placeholder: '$0.0',
                        required: true,
                        value: formData.price,
                        onChange: handleInputChange,
                        error: errors.price ?? '',
                        validate: (value) => Number.isNaN(Number(value)) ? 'Price must be a number' : ''
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
                        onSelect: selectCategoryCallBack,
                        error: errors.category ?? errors.categoryId ?? ''
                    },
                    {
                        name: 'stock',
                        label: 'Stock Quantity',
                        type: 'text',
                        placeholder: '1',
                        min: 1,
                        required: true,
                        value: formData.stock,
                        onChange: handleInputChange,
                        error: errors.stock ?? '',
                        validate: (value) => Number.isNaN(Number(value)) ? 'Stock must be a number' : ''
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
                        placeholder: 'Enter product description',
                        required: true,
                        value: formData.description,
                        onChange: handleInputChange,
                        error: errors.description ?? ''
                    },
                    {
                        name: 'images',
                        label: 'Images',
                        type: 'file',
                        placeholder: 'upload images',
                        required: false,
                        value: formData.images.join(','),
                        images: selectedIngredient ? selectedIngredient.images.join(",") : "",
                        multiple: true,
                        accept: 'image/*',
                        onChange: handleInputChange,
                        error: errors.images ?? '',
                        setDeletedImagePaths: setDeletedImages
                    },
                ]} setErrors={setErrors} onSubmit={handleSubmit} submitText="Save" loading={loading} cancelUrl={`/admin/ingredients?id=${id}&view=true`} isShowButton={true}></AdminForm>
            </div>
        </AdminLayout>
    );
}