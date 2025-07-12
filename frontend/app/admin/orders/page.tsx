'use client';

import AdminLayout from '../../../components/Layouts/AdminLayout';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import SearchItem from '../../../components/Admin/SearchItem';
import Title from '../../../components/Admin/Title';
import api from '../../../api';
import AdminTable from '../../../components/Admin/AdminTable';
import Sidebar from '../../../components/Admin/SideBar';
import { useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../../store';
import { beginLoading, clearMessage, fetchAdminOrder, fetchAllAdminOrders, handleMessage, onHanldeSearchData, onReduxPageChange, unSelectAdminOrder } from '../../../store/slices/admin/adminOrders';

export default function OrdersPage() {
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const searchParams = useSearchParams();
    const { settings } = useAppSelector(state => state.settings);
    const { error, success, message, orders, selectedOrder, params, currentPage, total, loading } = useAppSelector(state => state.adminOrders);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (settings?.shopName) {
            document.title = settings.shopName + " - Admin | Orders";
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
            getOrderById(id);
        }
    }, [searchParams]);

    useEffect(() => {
        fetchOrders();
    }, [params]);

    const getOrderById = async (id: string) => {
        try {
            const response = await api.get(`/admin/orders/${id}`);
            const dataRes = response.data;

            if (dataRes.success && dataRes.data) {
                dispatch(fetchAdminOrder(dataRes));
                setIsSidebarOpen(true);
            } else {
                dispatch(handleMessage({ success: false, message: "Failed to fetch order details." }));
            }
        } catch (err) {
            dispatch(handleMessage({ success: false, message: "Failed to fetch order details." }));
        }
    }

    const fetchOrders = async () => {
        dispatch(beginLoading());
        try {
            const res = await api.get('/admin/orders', { params });
            const dataRes = res.data;

            if (dataRes.success && dataRes.data) {
                dispatch(fetchAllAdminOrders(dataRes));
            } else {
                dispatch(handleMessage({ success: false, message: "Failed to fetch orders." }));
            }
        } catch (err) {
            dispatch(handleMessage({ success: false, message: "Failed to fetch orders." }));
        }
    };

    const onClickSearch = (searchTerm: string) => {
        dispatch(onHanldeSearchData({ search: searchTerm }));
    }

    const onPageChange = (newPage: number) => {
        dispatch(onReduxPageChange({ page: newPage }));
    }

    const viewHandle = (id: string) => {
        const product = orders.find(p => p._id === id) || null;
        dispatch(fetchAdminOrder({ data: product, success: true, message: "Order details fetched successfully." }));
        setIsSidebarOpen(true);
    }

    const closeSideBar = () => {
        setIsSidebarOpen(false);
        dispatch(unSelectAdminOrder())
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
                    rows={orders}
                    hasActionsCol={true}
                    viewHandle={viewHandle}
                    totalRecords={total}
                    currentPage={currentPage}
                    pageSize={params.limit}
                    onPageChange={onPageChange}
                    loading={loading}
                />

            </div>

            {/* View Detail */}
            <Sidebar
                title={selectedOrder ? selectedOrder._id : "Order Detail"}
                isOpen={isSidebarOpen}
                onClose={closeSideBar}
                className="w-1/3"
            >
                {selectedOrder ? (
                    <div className="flex flex-col gap-4 p-4">
                        {/* Product Info */}
                        <div className="w-full space-y-4 text-gray-800">
                            {/* Title + Category Badge */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <h3 className="text-2xl font-bold text-gray-900">{selectedOrder._id}</h3>
                                <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                                    {selectedOrder.status}
                                </span>
                            </div>

                            {/* Key Info Grid */}
                            <div className="grid grid-cols-2 gap-4 text-sm border-b border-gray-200 pb-2">
                                {/* Price */}
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-500 font-medium">Price:</span>
                                    <span className="text-green-600 font-semibold text-base">${selectedOrder.total}</span>
                                </div>
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