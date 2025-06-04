'use client';

import AdminLayout from '../../../components/Layouts/AdminLayout';
import DeleteButton from '../../../components/Admin/DeleteButton';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import AddButton from '../../../components/Admin/AddButton';
import SearchItem from '../../../components/Admin/SearchItem';
import Title from '../../../components/Admin/Title';
import { GetListParams, Product } from '../../../types/Product';
import api from '../../../api';
import AdminTable from '../../../components/Admin/AdminTable';
import { confirmThemeSwal } from '../../../utils/sweetalert';
import Sidebar from '../../../components/Admin/SideBar';

const LIMIT = 10;

export default function MenuPage() {
    const [products, setProducts] = useState<Product[]>([]);
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
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    useEffect(() => {
        fetchProducts();
    }, [params]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await api.get('/products', { params });
            const dataRes = res.data;

            if (dataRes.success && dataRes.data) {
                setProducts(dataRes.data.data);
                setTotal(dataRes.data.total);
            }
        } catch (err) {
            toast.error("Failed");
            console.log(err);
        } finally {
            setLoading(false);
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
            const response = await api.delete(`/products/${id}`);
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
        console.log(id);
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
    }

    const viewHandle = (id: string) => {
        const product = products.find(p => p._id === id) || null;
        setSelectedProduct(product);
        setIsSidebarOpen(true);
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
                    headers={["Sku", "Name", "Description", "Price", "Stock", "Category"]}
                    columns={["sku", "name", "description", "price", "stock", "category.name"]}
                    rows={products}
                    hasActionsCol={true}
                    viewHandle={viewHandle}
                    deleteHandle={deleteHandle}
                    editHandle={editHandle}
                    totalRecords={total}
                    currentPage={currentPage}
                    pageSize={LIMIT}
                    onPageChange={onPageChange}
                    loading={loading}
                    onShowDeleteMultipleHandle={toggleShowDeleteBtn}
                />

            </div>
            <Sidebar
                title="Product Detail"
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
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
                        <div className="space-y-2 text-gray-700">
                            <h3 className="text-xl font-semibold text-gray-900">{selectedProduct.name}</h3>
                            <p className="text-sm text-gray-600">{selectedProduct.description}</p>
                            <p className="text-base font-medium text-green-700">
                                Price: ${selectedProduct.price}
                            </p>

                            {selectedProduct.sku && (
                                <p className="text-sm text-gray-500">SKU: {selectedProduct.sku}</p>
                            )}
                            {selectedProduct.category?.name && (
                                <p className="text-sm text-gray-500">Category: {selectedProduct.category.name}</p>
                            )}
                            {selectedProduct.stock !== undefined && (
                                <p className="text-sm text-gray-500">Stock: {selectedProduct.stock}</p>
                            )}
                        </div>
                    </div>
                ) : (
                    <p className="p-4 text-gray-500">No product selected</p>
                )}
            </Sidebar>
        </AdminLayout>
    );
}