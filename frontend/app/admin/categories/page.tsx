'use client';

import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import api from '../../../api';
import { confirmThemeSwal } from '../../../utils/sweetalert';
import { useRouter } from 'next/navigation';
import { Category } from '../../../types/Category';
import { useAppDispatch, useAppSelector } from '../../../store';
import { beginLoading, beginProcess, clearMessage, fetchAllAdminCategories, handleMessage, onHanldeSearchData, onReduxPageChange, updateCurrentAdminCategoryData } from '../../../store/slices/admin/adminCategories';

// lazy load components
import dynamic from 'next/dynamic';
const AdminLayout = dynamic(() => import('../../../components/Layouts/AdminLayout'), { ssr: false });
const DeleteButton = dynamic(() => import('../../../components/Admin/DeleteButton'), { ssr: true });
const AddButton = dynamic(() => import('../../../components/Admin/AddButton'), { ssr: true });
const SearchItem = dynamic(() => import('../../../components/Admin/SearchItem'), { ssr: false });
const Title = dynamic(() => import('../../../components/Admin/Title'), { ssr: true });
const AdminTable = dynamic(() => import('../../../components/Admin/AdminTable'), { ssr: false });

export default function AdminCategoriesPage() {
    const [showDeleteBtn, setShowDeleteBtn] = useState(false);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const router = useRouter();
    const { settings } = useAppSelector(state => state.settings);
    const { error, success, message, categories, params, loading, total, currentPage, inProccessing } = useAppSelector(state => state.adminCategories);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (settings?.shopName) {
            document.title = settings.shopName + " - Admin | Categories";
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
        fetchAllCategories();
    }, [params]);

    const fetchAllCategories = async () => {
        dispatch(beginLoading());
        try {
            const res = await api.get('/categories', { params });
            const dataRes = res.data;

            if (dataRes.success && dataRes.data) {
                dispatch(fetchAllAdminCategories(dataRes));
            }
        } catch (err) {
            dispatch(handleMessage({ success: false, message: "Failed to fetch categories. Please try again." }));
            console.log(err);
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
                dispatch(handleMessage(dataRes));
            } else {
                dispatch(handleMessage({ success: false, message: "Items deleted Failed" }));
            }
        } catch (err) {
            dispatch(handleMessage({ success: false, message: "Items deleted Failed" }));
            console.log(err);
        } finally {
            // Reset state
            fetchAllCategories();
        }
    };

    const resetDataWithoutApi = (id: string, data: Category) => {
        dispatch(updateCurrentAdminCategoryData({ id, data }));
    }

    const activeHandle = async (id: string) => {
        if (inProccessing) return;

        dispatch(beginProcess());
        try {
            const response = await api.put(`/categories/${id}/active`);
            const dataRes = response.data;

            if (dataRes.success) {
                // Show success message
                dispatch(handleMessage(dataRes));
            } else {
                dispatch(handleMessage({ success: false, message: "Failed to update category status" }));
            }
        } catch (err) {
            dispatch(handleMessage({ success: false, message: "Failed to update category status" }));
            console.log(err);
        } finally {
            // Reset state
            const item = categories.find(item => item._id === id);

            if (item && item._id) {
                resetDataWithoutApi(id, {
                    ...item,
                    active: (item as Category).active === 0 ? 1 : 0
                } as Category);
            }
        }
    }

    const toggleShowDeleteBtn = (value: boolean) => {
        setShowDeleteBtn(value);
    };

    const onClickSearch = (searchTerm: string) => {
        dispatch(onHanldeSearchData({ search: searchTerm }));
    }

    const onRequestDeleteById = async (id: string) => {
        try {
            const response = await api.delete(`/categories/${id}`);
            const dataRes = response.data;

            if (dataRes.success) {
                // Show success message
                dispatch(handleMessage(dataRes));
            } else {
                dispatch(handleMessage({ success: false, message: "Failed to delete category" }));
            }
        } catch (err) {
            dispatch(handleMessage({ success: false, message: "Failed to delete category" }));
            console.log(err);
        } finally {
            // Reset state
            const newData = categories.filter((item) => item._id !== id);
            dispatch(fetchAllAdminCategories({ success: true, data: { data: newData, total: total - 1 } }));
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
        dispatch(onReduxPageChange({ page: newPage }));
    }

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
                    pageSize={params.limit}
                    onPageChange={onPageChange}
                    loading={loading}
                    onShowDeleteMultipleHandle={toggleShowDeleteBtn}
                />

            </div>
        </AdminLayout>
    );
}