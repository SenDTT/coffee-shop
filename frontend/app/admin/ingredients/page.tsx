'use client';

import AdminLayout from '../../../components/Layouts/AdminLayout';
import DeleteButton from '../../../components/Admin/DeleteButton';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import AddButton from '../../../components/Admin/AddButton';
import SearchItem from '../../../components/Admin/SearchItem';
import Title from '../../../components/Admin/Title';
import { GetListParams } from '../../../types/Product';
import api from '../../../api';
import AdminTable from '../../../components/Admin/AdminTable';
import { confirmThemeSwal } from '../../../utils/sweetalert';
import Sidebar from '../../../components/Admin/SideBar';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaPen, FaTrash } from 'react-icons/fa';
import { Ingredient } from '../../../types/Ingredient';
import { useSettings } from '../../../context/SettingsContext';

const LIMIT = 10;

export default function AdminIngredientsPage() {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [showDeleteBtn, setShowDeleteBtn] = useState(false);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [params, setParams] = useState<GetListParams>({
        limit: LIMIT,
        skip: 0,
    });
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const [inProccessing, setInProccessing] = useState<Boolean>(false);
    const { settings } = useSettings();

    useEffect(() => {
        if (settings?.shopName) {
            document.title = settings.shopName + " - Admin | Ingredients";
        }
    }, [settings]);

    useEffect(() => {
        const id = searchParams.get('id') ?? null;
        const view = searchParams.get('view') ?? null;

        if (id && view === 'true') {
            getIngredientById(id);
        }
    }, [searchParams]);

    useEffect(() => {
        fetchProducts();
    }, [params]);

    const getIngredientById = async (id: string) => {
        try {
            const response = await api.get(`/ingredients/${id}`);
            const dataRes = response.data;

            if (dataRes.success && dataRes.data) {
                console.log(dataRes.data);
                setSelectedIngredient(dataRes.data);
                setIsSidebarOpen(true);
            }
        } catch (err) {
            toast.error('Failed to get ingredients. Please try again.');
        }
    }

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await api.get('/ingredients', { params });
            const dataRes = res.data;

            if (dataRes.success && dataRes.data) {
                setIngredients(dataRes.data.data);
                setTotal(dataRes.data.total);
            }
        } catch (err) {
            toast.error("Failed");
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const resetDataWithoutApi = (id: string, data: Ingredient) => {
        const newData = ingredients.map((item) => {
            if (item._id === id) {
                return data;
            }

            return item;
        });
        setIngredients(newData);
    }

    const activeHandle = async (id: string) => {
        if (inProccessing) return;

        setInProccessing(true);
        try {
            const response = await api.put(`/ingredients/${id}/active`);
            const dataRes = response.data;

            if (dataRes.success) {
                // Show success message
                toast.success(dataRes.message);
            } else {
                toast.error("Items deleted Failed");
            }
        } catch (err) {
            toast.error("Failed");
            console.log(err);
        } finally {
            // Reset state
            const item = ingredients.find(item => item._id === id);

            if (item && item._id) {
                resetDataWithoutApi(id, { ...item, active: item.active === 0 ? 1 : 0 });
            }
            setInProccessing(false);
        }
    }

    const deleteMultipleHandle = async () => {
        // Perform delete logic here
        const ids = [...selectedIds.values()];
        // Reset deleteIds or perform any other necessary actions
        try {
            const response = await api.post("/ingredients/delete-multiple", { ids });
            const dataRes = response.data;

            if (dataRes.success) {
                // Show success message
                toast.success(dataRes.message);
            } else {
                toast.error("Items deleted Failed");
            }
        } catch (err) {
            toast.error("Failed");
            console.log(err);
        } finally {
            // Reset state
            resetParams();
        }
    };

    const toggleShowDeleteBtn = (value: boolean) => {
        setShowDeleteBtn(value);
    };

    const onClickSearch = (searchTerm: string) => {
        setCurrentPage(1);
        if (searchTerm !== "") {
            setParams({ ...params, search: searchTerm });
        } else {
            setParams({ limit: LIMIT, skip: 0 });
        }
    }

    const onRequestDeleteById = async (id: string) => {
        try {
            const response = await api.delete(`/ingredients/${id}`);
            const dataRes = response.data;

            if (dataRes.success) {
                // Show success message
                toast.success(dataRes.message);
            } else {
                toast.error("Items deleted Failed");
            }
        } catch (err) {
            toast.error("Failed");
            console.log(err);
        } finally {
            // Reset state
            //resetParams();
            const newData = ingredients.filter((item) => item._id !== id);
            setIngredients(newData);

            closeSideBar();
        }
    }

    const deleteHandle = (id: string) => {
        confirmThemeSwal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                // Perform delete logic here
                onRequestDeleteById(id);
            }
        });
    }

    const editHandle = (id: string) => {
        router.push(`/admin/ingredients/${id}`);
    }

    const onPageChange = (newPage: number) => {
        setCurrentPage(newPage);
        setParams({
            skip: (newPage - 1) * LIMIT,
            limit: LIMIT
        });
    }

    const resetParams = () => {
        setShowDeleteBtn(false);
        setSelectedIds(new Set());
        setParams({
            skip: 0,
            limit: LIMIT
        });
        setCurrentPage(1);
    }

    const viewHandle = (id: string) => {
        const product = ingredients.find(p => p._id === id) || null;
        setSelectedIngredient(product);
        setIsSidebarOpen(true);
    }

    const closeSideBar = () => {
        setIsSidebarOpen(false);
        setSelectedIngredient(null);
    }

    // TODO: add active column and call api

    return (
        <AdminLayout>
            {/* Alert */}
            <ToastContainer />

            {/* heading */}
            <Title title="Ingredients Management" />

            {/* filter row and actions */}
            <div className="w-full flex flex-col items-start sm:items-center gap-2 my-4 text-xs sm:text-base bg-white/50 rounded-lg py-3 px-4 shadow-md mb-4">
                <div className='w-full flex flex-col sm:flex-row sm:justify-between justify-start items-start sm:items-center gap-2 my-4 text-xs sm:text-base'>
                    <SearchItem onSearchHanlde={onClickSearch} />

                    <div className="flex flex-row sm:justify-end items-center gap-2 sm:w-full">
                        <DeleteButton onDelete={deleteMultipleHandle} disabled={!showDeleteBtn} />

                        <AddButton path="/admin/ingredients/add" />
                    </div>
                </div>

                {/* table */}
                <AdminTable
                    showCheckbox
                    selectedIds={selectedIds}
                    setSelectedIds={setSelectedIds}
                    headers={["Sku", "Name", "Description", "Price", "Stock"]}
                    columns={["sku", "name", "description", "price", "stock"]}
                    rows={ingredients}
                    hasActionsCol={true}
                    viewHandle={viewHandle}
                    deleteHandle={deleteHandle}
                    editHandle={editHandle}
                    activeHandle={activeHandle}
                    totalRecords={total}
                    currentPage={currentPage}
                    pageSize={LIMIT}
                    onPageChange={onPageChange}
                    loading={loading}
                    onShowDeleteMultipleHandle={toggleShowDeleteBtn}
                />

            </div>
            <Sidebar
                title={selectedIngredient ? selectedIngredient.sku : "Ingredient Detail"}
                isOpen={isSidebarOpen}
                onClose={closeSideBar}
                className="w-1/3"
            >
                {selectedIngredient ? (
                    <div className="flex flex-col gap-4 p-4">
                        {/* Product Images */}
                        {selectedIngredient.images.length > 0 && (
                            <div className="w-full overflow-x-auto">
                                <div className="flex flex-row gap-4 py-2">
                                    {selectedIngredient.images.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex-shrink-0 h-40 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center"
                                        >
                                            <img
                                                src={process.env.NEXT_PUBLIC_DOMAIN + item}
                                                alt={`Product Image ${index + 1}`}
                                                className="h-full object-contain"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Product Info */}
                        <div className="w-full space-y-4 text-gray-800">
                            {/* Title + Category Badge */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <h3 className="text-2xl font-bold text-gray-900">{selectedIngredient.name}</h3>
                                {selectedIngredient.category?.name && (
                                    <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                                        {selectedIngredient.category.name}
                                    </span>
                                )}
                            </div>

                            {/* Key Info Grid */}
                            <div className="grid grid-cols-2 gap-4 text-sm border-b border-gray-200 pb-2">
                                {/* Price */}
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-500 font-medium">Price:</span>
                                    <span className="text-green-600 font-semibold text-base">${selectedIngredient.price}</span>
                                </div>

                                {/* Stock */}
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-500 font-medium">Stock:</span>
                                    <span
                                        className={`text-xs font-bold px-2 py-1 rounded-full ${selectedIngredient.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                                            }`}
                                    >
                                        {selectedIngredient.stock > 0 ? `${selectedIngredient.stock} items` : "Out of stock"}
                                    </span>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {selectedIngredient.description || "No description available."}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-row flex-wrap items-center gap-2">
                                {editHandle && (
                                    <button
                                        onClick={() => editHandle(selectedIngredient._id)}
                                        title="Edit"
                                        className='inline-flex gap-2 items-center px-4 py-2 rounded-md bg-coastal-additional-info'
                                    >
                                        <FaPen className="text-white cursor-pointer size-3" />
                                        <span className="text-white">Edit</span>
                                    </button>
                                )}
                                {deleteHandle && (
                                    <button
                                        onClick={() => deleteHandle(selectedIngredient._id)}
                                        title="Delete"
                                        className='inline-flex gap-2 px-4 py-2 rounded-md items-center bg-gray-400 text-white'
                                    >
                                        <FaTrash className="text-white cursor-pointer size-3" />
                                        <span className="text-white">Delete</span>
                                    </button>
                                )}
                            </div>
                        </div>

                    </div>
                ) : (
                    <p className="p-4 text-gray-500">No ingredient selected</p>
                )}
            </Sidebar>
        </AdminLayout>
    );
}