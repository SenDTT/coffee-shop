'use client';

import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { CategoryParams, InputEvent, SelectOption } from '../../../../types/Product';
import api from '../../../../api';
import { useParams, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { clearCurrentProduct, clearMessage, fetchAProduct, handleMessage, handleSetErrors } from '../../../../store/slices/admin/adminMenu';

// lazy load the components
import dynamic from 'next/dynamic';
const AdminForm = dynamic(() => import('../../../../components/Admin/AdminForm'), {
    ssr: false,
});
const Title = dynamic(() => import('../../../../components/Admin/Title'), {
    ssr: false,
});
const AdminLayout = dynamic(() => import('../../../../components/Layouts/AdminLayout'), {
    ssr: false,
});

const LIMIT = 50;

export default function EditProductPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id;
    const [loading, setLoading] = useState(false);
    const [skuPrefix, setSkuPrefix] = useState("");
    type FormDataType = {
        name: string;
        sku: string;
        material: string;
        price: string;
        description: string;
        category: string;
        stock: string;
        images: (File | string)[];
        active: number;
    };

    const initialData: FormDataType = {
        name: '',
        sku: '',
        material: '',
        price: '',
        description: '',
        category: '',
        stock: '1',
        images: [],
        active: 1,
    };
    const [deletedImages, setDeletedImages] = useState<string[]>([]);
    const [formData, setFormData] = useState<FormDataType>(initialData);
    const [categoryOptions, setCategoryOptions] = useState<SelectOption[]>([]);
    const { settings } = useAppSelector(state => state.settings);
    const { error, success, message, selectedProduct, errors } = useAppSelector(state => state.adminProducts);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (settings?.shopName) {
            document.title = settings.shopName + " - Admin | Edit Menu";
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
            getProductById(id)
        }
        return () => {
            setFormData(initialData);
            dispatch(clearCurrentProduct());
            setErrors({});
        }
    }, [id, dispatch]);

    const getProductById = async (id: string) => {
        try {
            const response = await api.get(`/products/${id}`);
            const dataRes = response.data;

            if (dataRes.success && dataRes.data) {
                dispatch(fetchAProduct(dataRes));
                const skuSplit = dataRes.data.sku.split("-");
                setSkuPrefix(skuSplit[0] + "-");
                setCategoryOptions([{ value: dataRes.data.category._id, label: dataRes.data.category.name }])
                setFormData({
                    name: dataRes.data.name,
                    sku: skuSplit[1],
                    material: dataRes.data.material,
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
        const data = response.data.map((item: any) => ({ value: item._id, label: item.name }));

        setCategoryOptions(data);
        return {
            data,
            nextPage: response.total < LIMIT + (page * LIMIT) ? null : page + 1
        };
    }

    const handleInputChange = (e: InputEvent) => {
        const { name, value, files } = e.target as HTMLInputElement;

        if (name === 'images' && files) {
            setFormData((prev) => ({
                ...prev,
                images: Array.from(files), // cast FileList to File[]
            }));
            return;
        }

        setFormData((prev) => ({
            ...prev,
            [name]: value,
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
        dispatch(clearMessage());
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

            formData.images.forEach((img) => {
                if (img instanceof File) {
                    formPayload.append("images", img);
                }
            });

            const res = await api.put(`/products/${id}`, formPayload);

            const dataRes = res.data;

            if (dataRes.success) {
                dispatch(handleMessage({ success: true, message: 'Product updated successfully!' }))

                setTimeout(() => {
                    router.push(`/admin/menu?id=${id}&view=true`);
                }, 2000);
            } else {
                dispatch(handleMessage({ success: false, message: 'Failed to update product. Please try again.' }))
            }
        } catch (err) {
            const backendErrors = err?.response?.data?.errors;

            if (backendErrors && typeof backendErrors === 'object') {
                setErrors(backendErrors);
            } else {
                console.error("Unexpected error:", err);
                dispatch(handleMessage({ success: false, message: 'Unexpected error. Please try again.' }));
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
            <Title title="Edit Product" parentPath={`/admin/menu?id=${id}&view=true`} />

            <div className="w-full flex flex-col sm:flex-row items-center gap-2 my-4 text-xs sm:text-base bg-white/50 rounded-lg py-3 px-4 shadow-md mb-4">
                {/* form */}
                <AdminForm fields={[
                    {
                        name: 'name',
                        label: 'Product Name',
                        type: 'text',
                        placeholder: 'Cappuccino',
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
                        validate: (value) => value === '' || Number.isNaN(Number(value)) ? 'Price must be a number' : ''
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
                        error: errors.category ?? errors.categoryId ?? '',
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
                        validate: (value) => value === '' || Number.isNaN(Number(value)) ? 'Stock must be a number' : ''
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
                        name: 'material',
                        label: 'Material',
                        type: 'textarea',
                        placeholder: 'Enter product material',
                        required: true,
                        value: formData.material,
                        onChange: handleInputChange,
                        error: errors.material ?? ''
                    },
                    {
                        name: 'images',
                        label: 'Images',
                        type: 'file',
                        placeholder: 'upload images',
                        required: false,
                        value: formData.images.join(','),
                        images: selectedProduct ? selectedProduct.images.join(",") : "",
                        multiple: true,
                        accept: 'image/*',
                        onChange: handleInputChange,
                        error: errors.images ?? '',
                        setDeletedImagePaths: setDeletedImages
                    },
                ]} setErrors={setErrors} onSubmit={handleSubmit} submitText="Save" loading={loading} cancelUrl={`/admin/menu?id=${id}&view=true`} isShowButton={true}></AdminForm>
            </div>
        </AdminLayout>
    );
}