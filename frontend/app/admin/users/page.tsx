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
import Sidebar from '../../../components/Admin/SideBar';
import { useSearchParams } from 'next/navigation';
import { User } from '../../../types/User';
import { useSettings } from '../../../context/SettingsContext';

const LIMIT = 10;

export default function UserPage() {
    const [user, setUsers] = useState<User[]>([]);
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
    const [selectedProduct, setSelectedProduct] = useState<User | null>(null);
    const searchParams = useSearchParams();
    const [inProccessing, setInProccessing] = useState<Boolean>(false);
    const { settings } = useSettings();

    useEffect(() => {
        if (settings?.shopName) {
            document.title = settings.shopName + " - Admin | Users";
        }
    }, [settings]);

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
                console.log(dataRes.data);
                setSelectedProduct(dataRes.data);
                setIsSidebarOpen(true);
            }
        } catch (err) {
            toast.error('Failed to get product. Please try again.');
        }
    }

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await api.get('/admin/users', { params });
            const dataRes = res.data;

            if (dataRes.success && dataRes.data) {
                setUsers(dataRes.data.data);
                setTotal(dataRes.data.total);
            }
        } catch (err) {
            toast.error("Failed");
            console.log(err);
        } finally {
            setLoading(false);
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

    const resetDataWithoutApi = (id: string, data: User) => {
        const newData = user.map((item) => {
            if (item._id === id) {
                return data;
            }

            return item;
        });
        setUsers(newData);
    }

    const isAdminHandle = async (id: string) => {
        if (inProccessing) return;

        setInProccessing(true);
        try {
            const response = await api.put(`/admin/users/${id}/role`);
            const dataRes = response.data;

            if (dataRes.success) {
                // Show success message
                toast.success(dataRes.message);
            } else {
                toast.error("Items update Failed");
            }
        } catch (err) {
            toast.error("Failed");
            console.log(err);
        } finally {
            // Reset state
            const item = user.find(item => item._id === id);

            if (item && item._id) {
                resetDataWithoutApi(id, { ...item, role: item.role === 'admin' ? 'user' : 'admin' });
            }
            setInProccessing(false);
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
        setShowDeleteBtn(false);
        setSelectedIds(new Set());
        setParams({
            skip: 0,
            limit: LIMIT
        });
    }

    const viewHandle = (id: string) => {
        const product = user.find(p => p._id === id) || null;
        setSelectedProduct(product);
        setIsSidebarOpen(true);
    }

    const closeSideBar = () => {
        setIsSidebarOpen(false);
        setSelectedProduct(null);
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
                    rows={user}
                    hasActionsCol={true}
                    viewHandle={viewHandle}
                    activeHandle={isAdminHandle}
                    totalRecords={total}
                    currentPage={currentPage}
                    pageSize={LIMIT}
                    onPageChange={onPageChange}
                    loading={loading}
                    onShowDeleteMultipleHandle={toggleShowDeleteBtn}
                />

            </div>
            <Sidebar
                title={selectedProduct ? selectedProduct.name : "User Detail"}
                isOpen={isSidebarOpen}
                onClose={closeSideBar}
                className="w-1/3"
            >
                {selectedProduct ? (
                    <div className="flex flex-col gap-4 p-4">
                        {/* Product Images */}
                        {selectedProduct.profileImage && (
                            <div
                                className="flex-shrink-0 h-40 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center"
                            >
                                <img
                                    src={process.env.NEXT_PUBLIC_DOMAIN + selectedProduct.profileImage}
                                    alt={`Product Image`}
                                    className="h-full object-contain"
                                />
                            </div>
                        )}

                        {/* Product Info */}
                        <div className="w-full space-y-4 text-gray-800">
                            {/* Title + Category Badge */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <h3 className="text-2xl font-bold text-gray-900">{selectedProduct.name}</h3>
                                {selectedProduct.role && (
                                    <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                                        {selectedProduct.role}
                                    </span>
                                )}
                            </div>

                            {/* Description */}
                            <div>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {selectedProduct.email}
                                </p>
                            </div>

                            {/* Materials */}
                            <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
                                <span className="text-sm text-gray-500 font-medium">Address:</span>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {selectedProduct.address || "No address available."}
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