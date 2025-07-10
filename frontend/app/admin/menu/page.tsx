'use client';

import AdminLayout from '../../../components/Layouts/AdminLayout';
import DeleteButton from '../../../components/Admin/DeleteButton';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import AddButton from '../../../components/Admin/AddButton';
import SearchItem from '../../../components/Admin/SearchItem';
import Title from '../../../components/Admin/Title';
import { Product } from '../../../types/Product';
import api from '../../../api';
import AdminTable from '../../../components/Admin/AdminTable';
import { confirmThemeSwal } from '../../../utils/sweetalert';
import Sidebar from '../../../components/Admin/SideBar';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaPen, FaTrash } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../../store';
import { beginLoading, beginProcess, clearMessage, fetchAllProducts, fetchAProduct, handleMessage, onHanldeSearchData, onReduxPageChange, unSelectProduct, updateCurrentProductData } from '../../../store/slices/admin/menu';

const LIMIT = 10;

export default function MenuPage() {
    const [showDeleteBtn, setShowDeleteBtn] = useState(false);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const { settings } = useAppSelector(state => state.settings);
    const { selectedProduct, products, params, error, success, message, loading, total, currentPage, inProccessing } = useAppSelector(state => state.products);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (settings?.shopName) {
            document.title = settings.shopName + " - Admin | Menu";
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
        const id = searchParams.get('id') ?? null;
        const view = searchParams.get('view') ?? null;

        if (id && view === 'true') {
            getProductById(id);
        }
    }, [searchParams]);

    useEffect(() => {
        fetchProducts();
    }, [params]);

    const getProductById = async (id: string) => {
        try {
            const response = await api.get(`/products/${id}`);
            const dataRes = response.data;

            dispatch(fetchAProduct(dataRes));
        } catch (err) {
            dispatch(handleMessage({ success: false, message: 'Failed to get product. Please try again.' }));
        }
    }

    const fetchProducts = async () => {
        dispatch(beginLoading());

        try {
            const res = await api.get('/products', { params });
            const dataRes = res.data;

            dispatch(fetchAllProducts(dataRes));
        } catch (err) {
            console.log(err);
            dispatch(handleMessage({ success: false, message: "Failed to fetch data. Please try again" }));
        }
    };

    const deleteMultipleHandle = async () => {
        // Perform delete logic here
        const ids = [...selectedIds.values()];
        // Reset deleteIds or perform any other necessary actions
        try {
            const response = await api.post("/products/delete-multiple", { ids });
            const dataRes = response.data;

            if (dataRes.success) {
                // Show success message
                dispatch(handleMessage(dataRes));
            } else {
                dispatch(handleMessage({ success: false, message: "Items deleted Failed" }));
            }
        } catch (err) {
            dispatch(handleMessage({ success: false, message: "Items deleted Failed" }));
            console.log(err);
        } finally {
            // Reset state
            handleShowDeleteBtn();
        }
    };

    const toggleShowDeleteBtn = (value: boolean) => {
        setShowDeleteBtn(value);
    };

    const onClickSearch = (searchTerm: string) => {
        dispatch(onHanldeSearchData({ search: searchTerm }));
    }

    const onRequestDeleteById = async (id: string) => {
        dispatch(beginProcess());
        try {
            const response = await api.delete(`/products/${id}`);
            const dataRes = response.data;

            if (dataRes.success) {
                // Show success message
                dispatch(handleMessage(dataRes));
            } else {
                dispatch(handleMessage({ success: false, message: "Items deleted Failed" }))
            }
        } catch (err) {
            dispatch(handleMessage({ success: false, message: "Items deleted Failed" }))
            console.log(err);
        } finally {
            // Reset state
            handleShowDeleteBtn();
            closeSideBar();
        }
    }

    const resetDataWithoutApi = (id: string, data: Product) => {
        dispatch(updateCurrentProductData({ id, data }));
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
        router.push(`/admin/menu/${id}`);
    }

    const activeHandle = async (id: string) => {
        if (inProccessing) return;

        dispatch(beginProcess());
        try {
            const response = await api.put(`/products/${id}/active`);
            const dataRes = response.data;

            if (dataRes.success) {
                // Show success message
                dispatch(handleMessage(dataRes));
            } else {
                dispatch(handleMessage({ success: false, message: "Items update Failed" }))
            }
        } catch (err) {
            dispatch(handleMessage({ success: false, message: "Items update Failed" }))
            console.log(err);
        } finally {
            // Reset state
            const item = products.find(item => item._id === id);

            if (item && item._id) {
                resetDataWithoutApi(id, { ...item, active: item.active === 0 ? 1 : 0 });
            }
        }
    }

    const onPageChange = (newPage: number) => {
        dispatch(onReduxPageChange({ page: newPage }));
    }

    const handleShowDeleteBtn = () => {
        setShowDeleteBtn(false);
        setSelectedIds(new Set());
    }

    const viewHandle = (id: string) => {
        const product = products.find(p => p._id === id) || null;
        dispatch(fetchAProduct({ success: true, data: product }));
        setIsSidebarOpen(true);
    }

    const closeSideBar = () => {
        setIsSidebarOpen(false);
        dispatch(unSelectProduct());
    }

    return (
        <AdminLayout>
            {/* Alert */}
            <ToastContainer />

            {/* heading */}
            <Title title="Menu Management" />

            {/* filter row and actions */}
            <div className="w-full flex flex-col items-start sm:items-center gap-2 my-4 text-xs sm:text-base bg-white/50 rounded-lg py-3 px-4 shadow-md mb-4">
                <div className='w-full flex flex-col sm:flex-row sm:justify-between justify-start items-start sm:items-center gap-2 my-4 text-xs sm:text-base'>
                    <SearchItem onSearchHanlde={onClickSearch} />

                    <div className="flex flex-row sm:justify-end items-center gap-2 sm:w-full">
                        <DeleteButton onDelete={deleteMultipleHandle} disabled={!showDeleteBtn} />

                        <AddButton path="/admin/menu/add" />
                    </div>
                </div>

                {/* table */}
                <AdminTable
                    showCheckbox
                    selectedIds={selectedIds}
                    setSelectedIds={setSelectedIds}
                    headers={["Sku", "Name", "Description", "Price", "Stock"]}
                    columns={["sku", "name", "description", "price", "stock"]}
                    rows={products}
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
                title={selectedProduct ? selectedProduct.sku : "Product Detail"}
                isOpen={isSidebarOpen}
                onClose={closeSideBar}
                className="w-1/3"
            >
                {selectedProduct ? (
                    <div className="flex flex-col gap-4 p-4">
                        {/* Product Images */}
                        {selectedProduct.images.length > 0 && (
                            <div className="w-full overflow-x-auto">
                                <div className="flex flex-row gap-4 py-2">
                                    {selectedProduct.images.map((item, index) => (
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
                                <h3 className="text-2xl font-bold text-gray-900">{selectedProduct.name}</h3>
                                {selectedProduct.category?.name && (
                                    <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                                        {selectedProduct.category.name}
                                    </span>
                                )}
                            </div>

                            {/* Key Info Grid */}
                            <div className="grid grid-cols-2 gap-4 text-sm border-b border-gray-200 pb-2">
                                {/* Price */}
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-500 font-medium">Price:</span>
                                    <span className="text-green-600 font-semibold text-base">${selectedProduct.price}</span>
                                </div>

                                {/* Stock */}
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-500 font-medium">Stock:</span>
                                    <span
                                        className={`text-xs font-bold px-2 py-1 rounded-full ${selectedProduct.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                                            }`}
                                    >
                                        {selectedProduct.stock > 0 ? `${selectedProduct.stock} items` : "Out of stock"}
                                    </span>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {selectedProduct.description || "No description available."}
                                </p>
                            </div>

                            {/* Materials */}
                            <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
                                <span className="text-sm text-gray-500 font-medium">Materials:</span>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {selectedProduct.material || "No description available."}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-row flex-wrap items-center gap-2">
                                {editHandle && (
                                    <button
                                        onClick={() => editHandle(selectedProduct._id)}
                                        title="Edit product"
                                        className='inline-flex text-sm gap-2 items-center px-4 py-1 rounded-md bg-coastal-additional-info'
                                    >
                                        <FaPen className="text-white cursor-pointer size-3" />
                                        <span className="text-white">Edit</span>
                                    </button>
                                )}
                                {deleteHandle && (
                                    <button
                                        onClick={() => deleteHandle(selectedProduct._id)}
                                        title="Delete product"
                                        className='inline-flex text-sm gap-2 px-4 py-1 rounded-md items-center bg-gray-400 text-white'
                                    >
                                        <FaTrash className="text-white cursor-pointer size-3" />
                                        <span className="text-white">Delete</span>
                                    </button>
                                )}
                            </div>
                        </div>

                    </div>
                ) : (
                    <p className="p-4 text-gray-500">No product selected</p>
                )}
            </Sidebar>
        </AdminLayout>
    );
}