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
import { useRouter } from 'next/navigation';
import { Category } from '../../../types/Category';
import { useSettings } from '../../../context/SettingsContext';

const LIMIT = 10;

export default function AdminCategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [showDeleteBtn, setShowDeleteBtn] = useState(false);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [params, setParams] = useState<GetListParams>({
        limit: LIMIT,
        skip: 0,
    });
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const router = useRouter();
    const [inProccessing, setInProccessing] = useState<Boolean>(false);
    const { settings } = useSettings();

    useEffect(() => {
        if (settings?.shopName) {
            document.title = settings.shopName + " - Admin | Categories";
        }
    }, [settings]);

    useEffect(() => {
        fetchProducts();
    }, [params]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await api.get('/categories', { params });
            const dataRes = res.data;

            if (dataRes.success && dataRes.data) {
                setCategories(dataRes.data.data);
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
            const response = await api.post("/categories/delete-multiple", { ids });
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

    const resetDataWithoutApi = (id: string, data: Category) => {
        const newData = categories.map((item) => {
            if (item._id === id) {
                return data;
            }

            return item;
        });
        setCategories(newData);
    }

    const activeHandle = async (id: string) => {
        if (inProccessing) return;

        setInProccessing(true);
        try {
            const response = await api.put(`/categories/${id}/active`);
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
            const item = categories.find(item => item._id === id);

            if (item && item._id) {
                resetDataWithoutApi(id, { ...item, active: item.active === 0 ? 1 : 0 });
            }
            setInProccessing(false);
        }
    }

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
            const response = await api.delete(`/categories/${id}`);
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
        router.push(`/admin/categories/${id}`);
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

    // TODO: add active column and call api

    return (
        <AdminLayout>
            {/* Alert */}
            <ToastContainer />

            {/* heading */}
            <Title title="Categories Management" />

            {/* filter row and actions */}
            <div className="w-full flex flex-col items-start sm:items-center gap-2 my-4 text-xs sm:text-base bg-white/50 rounded-lg py-3 px-4 shadow-md mb-4">
                <div className='w-full flex flex-col sm:flex-row sm:justify-between justify-start items-start sm:items-center gap-2 my-4 text-xs sm:text-base'>
                    <SearchItem onSearchHanlde={onClickSearch} />

                    <div className="flex flex-row sm:justify-end items-center gap-2 sm:w-full">
                        <DeleteButton onDelete={deleteMultipleHandle} disabled={!showDeleteBtn} />

                        <AddButton path="/admin/categories/add" />
                    </div>
                </div>

                {/* table */}
                <AdminTable
                    showCheckbox
                    selectedIds={selectedIds}
                    setSelectedIds={setSelectedIds}
                    headers={["Name", "Description", "Type"]}
                    columns={["name", "description", "type"]}
                    rows={categories}
                    hasActionsCol={true}
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
        </AdminLayout>
    );
}