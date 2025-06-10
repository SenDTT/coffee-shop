'use client';

import AdminLayout from '../../../components/Layouts/AdminLayout';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import SearchItem from '../../../components/Admin/SearchItem';
import Title from '../../../components/Admin/Title';
import { GetListParams, Product } from '../../../types/Product';
import api from '../../../api';
import AdminTable from '../../../components/Admin/AdminTable';
import Sidebar from '../../../components/Admin/SideBar';
import { useSearchParams } from 'next/navigation';
import { useSettings } from '../../../context/SettingsContext';

const LIMIT = 10;

export default function MenuPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [params, setParams] = useState<GetListParams>({
        limit: LIMIT,
        skip: 0,
    });
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Product | null>(null);
    const searchParams = useSearchParams();
    const { settings } = useSettings();

    useEffect(() => {
        if (settings?.shopName) {
            document.title = settings.shopName + " - Admin | Orders";
        }
    }, [settings]);

    useEffect(() => {
        const id = searchParams.get('id') ?? null;
        const view = searchParams.get('view') ?? null;

        if (id && view === 'true') {
            getOrderById(id);
        }
    }, [searchParams]);

    useEffect(() => {
        fetchProducts();
    }, [params]);

    const getOrderById = async (id: string) => {
        try {
            const response = await api.get(`/admin/orders/${id}`);
            const dataRes = response.data;

            if (dataRes.success && dataRes.data) {
                console.log(dataRes.data);
                setSelectedOrder(dataRes.data);
                setIsSidebarOpen(true);
            }
        } catch (err) {
            toast.error('Failed to get order. Please try again.');
        }
    }

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await api.get('/admin/orders', { params });
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

    const onClickSearch = (searchTerm: string) => {
        setCurrentPage(1);
        if (searchTerm !== "") {
            setParams({ ...params, search: searchTerm });
        } else {
            setParams({ limit: LIMIT, skip: 0 });
        }
    }

    const onPageChange = (newPage: number) => {
        setCurrentPage(newPage);
        setParams({
            skip: (newPage - 1) * LIMIT,
            limit: LIMIT
        });
    }

    const resetParams = () => {
        setSelectedIds(new Set());
        setParams({
            skip: 0,
            limit: LIMIT
        });
    }

    const viewHandle = (id: string) => {
        const product = products.find(p => p._id === id) || null;
        setSelectedOrder(product);
        setIsSidebarOpen(true);
    }

    const closeSideBar = () => {
        setIsSidebarOpen(false);
        setSelectedOrder(null);
    }

    return (
        <AdminLayout>
            {/* Alert */}
            <ToastContainer />

            {/* heading */}
            <Title title="Order Management" />

            {/* filter row and actions */}
            <div className="w-full flex flex-col items-start sm:items-center gap-2 my-4 text-xs sm:text-base bg-white/50 rounded-lg py-3 px-4 shadow-md mb-4">
                <div className='w-full flex flex-col sm:flex-row sm:justify-between justify-start items-start sm:items-center gap-2 my-4 text-xs sm:text-base'>
                    <SearchItem onSearchHanlde={onClickSearch} />

                    <div className="flex flex-row sm:justify-end items-center gap-2 sm:w-full">
                        {/* archive */}
                    </div>
                </div>

                {/* table */}
                <AdminTable
                    showCheckbox
                    selectedIds={selectedIds}
                    setSelectedIds={setSelectedIds}
                    headers={["ID", "User", "Products", "Price", "Amount", "Date", "Status"]}
                    columns={["id", "user.name", "totalItems", "totalPrice", "totalAmount", "orderDate", "status"]}
                    rows={products}
                    hasActionsCol={true}
                    viewHandle={viewHandle}
                    totalRecords={total}
                    currentPage={currentPage}
                    pageSize={LIMIT}
                    onPageChange={onPageChange}
                    loading={loading}
                />

            </div>

            {/* View Detail */}
            <Sidebar
                title={selectedOrder ? selectedOrder.sku : "Order Detail"}
                isOpen={isSidebarOpen}
                onClose={closeSideBar}
                className="w-1/3"
            >
                {selectedOrder ? (
                    <div className="flex flex-col gap-4 p-4">
                        {/* Product Images */}
                        {selectedOrder.images.length > 0 && (
                            <div className="w-full overflow-x-auto">
                                <div className="flex flex-row gap-4 py-2">
                                    {selectedOrder.images.map((item, index) => (
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
                                <h3 className="text-2xl font-bold text-gray-900">{selectedOrder.name}</h3>
                                {selectedOrder.category?.name && (
                                    <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                                        {selectedOrder.category.name}
                                    </span>
                                )}
                            </div>

                            {/* Key Info Grid */}
                            <div className="grid grid-cols-2 gap-4 text-sm border-b border-gray-200 pb-2">
                                {/* Price */}
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-500 font-medium">Price:</span>
                                    <span className="text-green-600 font-semibold text-base">${selectedOrder.price}</span>
                                </div>

                                {/* Stock */}
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-500 font-medium">Stock:</span>
                                    <span
                                        className={`text-xs font-bold px-2 py-1 rounded-full ${selectedOrder.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                                            }`}
                                    >
                                        {selectedOrder.stock > 0 ? `${selectedOrder.stock} items` : "Out of stock"}
                                    </span>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {selectedOrder.description || "No description available."}
                                </p>
                            </div>

                            {/* Materials */}
                            <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
                                <span className="text-sm text-gray-500 font-medium">Materials:</span>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {selectedOrder.material || "No description available."}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-row flex-wrap items-center gap-2">
                                {/* only update status or archive orders */}
                            </div>
                        </div>

                    </div>
                ) : (
                    <p className="p-4 text-gray-500">No order selected</p>
                )}
            </Sidebar>
        </AdminLayout>
    );
}