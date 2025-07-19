'use client';

import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import api from '../../../api';
import Sidebar from '../../../components/Admin/SideBar';
import { useSearchParams } from 'next/navigation';
import { User } from '../../../types/User';
import { useAppDispatch, useAppSelector } from '../../../store';
import { beginLoading, beginProcess, clearCurrentAdminUser, clearMessage, fetchAdminUser, fetchAllAdminUsers, handleMessage, onHanldeSearchData, onReduxPageChange, updateCurrentAdminUsersData } from '../../../store/slices/admin/adminUsers';

// lazy load components
import dynamic from 'next/dynamic';
const AddButton = dynamic(() => import('../../../components/Admin/AddButton'), { ssr: true });
const AdminLayout = dynamic(() => import('../../../components/Layouts/AdminLayout'), { ssr: true });
const SearchItem = dynamic(() => import('../../../components/Admin/SearchItem'), { ssr: false });
const Title = dynamic(() => import('../../../components/Admin/Title'), { ssr: true });
const AdminTable = dynamic(() => import('../../../components/Admin/AdminTable'), { ssr: false });

export default function UserPage() {
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const searchParams = useSearchParams();
    const { settings } = useAppSelector(state => state.settings);
    const dispatch = useAppDispatch();
    const { error, success, message, users, total, selectedUser, currentPage, loading, params, inProccessing } = useAppSelector(state => state.adminUsers);

    useEffect(() => {
        if (settings?.shopName) {
            document.title = settings.shopName + " - Admin | Users";
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
    }, [error, success, message, dispatch]);

    useEffect(() => {
        const id = searchParams.get('id') ?? null;
        const view = searchParams.get('view') ?? null;

        if (id && view === 'true') {
            getUserById(id);
        }
    }, [searchParams]);

    useEffect(() => {
        fetchProducts();
    }, [params]);

    const getUserById = async (id: string) => {
        try {
            const response = await api.get(`/admin/users/${id}`);
            const dataRes = response.data;

            if (dataRes.success && dataRes.data) {
                dispatch(fetchAdminUser(dataRes));
                setIsSidebarOpen(true);
            }
        } catch (err) {
            console.error(err);
            toast.error('Failed to get product. Please try again.');
        }
    }

    const fetchProducts = async () => {
        dispatch(beginLoading());
        try {
            const res = await api.get('/admin/users', { params });
            const dataRes = res.data;

            if (dataRes.success && dataRes.data) {
                dispatch(fetchAllAdminUsers(dataRes));
            } else {
                dispatch(handleMessage({ success: false, message: "Failed to fetch users" }));
            }
        } catch (err) {
            dispatch(handleMessage({ success: false, message: "Failed to fetch users" }));
            console.log(err);
        }
    };

    const onClickSearch = (searchTerm: string) => {
        dispatch(onHanldeSearchData({ search: searchTerm }));
    }

    const resetDataWithoutApi = (id: string, data: User) => {
        dispatch(updateCurrentAdminUsersData({ id, data }));
    }

    const isAdminHandle = async (id: string) => {
        if (inProccessing) return;

        dispatch(beginProcess());
        try {
            const response = await api.put(`/admin/users/${id}/role`);
            const dataRes = response.data;

            if (dataRes.success) {
                // Show success message
                dispatch(handleMessage(dataRes));
            } else {
                dispatch(handleMessage({ success: false, message: "Failed to update user role" }));
            }
        } catch (err) {
            dispatch(handleMessage({ success: false, message: "Failed to update user role" }));
            console.log(err);
        } finally {
            // Reset state
            const item = users.find(item => item._id === id);

            if (item && item._id) {
                resetDataWithoutApi(id, { ...item, role: item.role === 'admin' ? 'user' : 'admin' });
            }
        }
    }

    const onPageChange = (newPage: number) => {
        dispatch(onReduxPageChange({ page: newPage }));
    }

    const viewHandle = (id: string) => {
        const product = users.find(p => p._id === id) || null;
        dispatch(fetchAdminUser({ success: true, data: product }));
        setIsSidebarOpen(true);
    }

    const closeSideBar = () => {
        setIsSidebarOpen(false);
        dispatch(clearCurrentAdminUser());
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
                        <AddButton path="/admin/users/add" />
                    </div>
                </div>

                {/* table */}
                <AdminTable
                    showCheckbox
                    selectedIds={selectedIds}
                    setSelectedIds={setSelectedIds}
                    headers={["Name", "Username", "Email", "Role"]}
                    columns={["name", "username", "email", "role"]}
                    rows={users}
                    hasActionsCol={true}
                    viewHandle={viewHandle}
                    activeHandle={isAdminHandle}
                    totalRecords={total}
                    currentPage={currentPage}
                    pageSize={params.limit}
                    onPageChange={onPageChange}
                    loading={loading}
                />

            </div>
            <Sidebar
                title={selectedUser ? selectedUser.name : "User Detail"}
                isOpen={isSidebarOpen}
                onClose={closeSideBar}
                className="w-1/3"
            >
                {isSidebarOpen && selectedUser ? (
                    <div className="flex flex-col gap-4 p-4">
                        {/* Product Images */}
                        {selectedUser.profileImage && (
                            <div
                                className="flex-shrink-0 h-40 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center"
                            >
                                <img
                                    loading="lazy"
                                    src={process.env.NEXT_PUBLIC_DOMAIN + selectedUser.profileImage}
                                    alt={`Product Image`}
                                    className="h-full object-contain"
                                />
                            </div>
                        )}

                        {/* Product Info */}
                        <div className="w-full space-y-4 text-gray-800">
                            {/* Title + Category Badge */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <h3 className="text-2xl font-bold text-gray-900">{selectedUser.name}</h3>
                                {selectedUser.role && (
                                    <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                                        {selectedUser.role}
                                    </span>
                                )}
                            </div>

                            {/* Description */}
                            <div>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {selectedUser.email}
                                </p>
                            </div>

                            {/* Materials */}
                            <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
                                <span className="text-sm text-gray-500 font-medium">Address:</span>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {selectedUser.address || "No address available."}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-row flex-wrap items-center gap-2">
                                {/* actions */}
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