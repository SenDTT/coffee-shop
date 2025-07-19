'use client';

import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import api from '../../../api';
import { confirmThemeSwal } from '../../../utils/sweetalert';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../../store';
import { beginLoading, beginProcess, clearMessage, fetchAllAdminBlogs, onHanldeSearchData, onReduxPageChange, handleMessage } from '../../../store/slices/admin/adminBlogs';

// lazy load components
import dynamic from 'next/dynamic';
const DeleteButton = dynamic(() => import('../../../components/Admin/DeleteButton'), { ssr: true });
const AddButton = dynamic(() => import('../../../components/Admin/AddButton'), { ssr: true });
const AdminLayout = dynamic(() => import('../../../components/Layouts/AdminLayout'), { ssr: true });
const SearchItem = dynamic(() => import('../../../components/Admin/SearchItem'), { ssr: false });
const Title = dynamic(() => import('../../../components/Admin/Title'), { ssr: true });
const AdminTable = dynamic(() => import('../../../components/Admin/AdminTable'), { ssr: false });

export default function BlogsManagementPage() {
    const [showDeleteBtn, setShowDeleteBtn] = useState(false);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const router = useRouter();
    const { settings } = useAppSelector(state => state.settings);
    const { blogs, error, success, message, params, loading, total, currentPage, inProccessing } = useAppSelector(state => state.adminBlogs);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (settings?.shopName) {
            document.title = settings.shopName + " - Admin | Blogs";
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
        fetchBlogs();
    }, [params]);

    const fetchBlogs = async () => {
        dispatch(beginLoading());
        try {
            const res = await api.get('/blogs', { params });
            const dataRes = res.data;

            if (dataRes.success && dataRes.data) {
                dispatch(fetchAllAdminBlogs(dataRes));
            } else {
                dispatch(handleMessage({ success: false, message: "Failed to fetch blogs" }));
            }
        } catch (err) {
            dispatch(handleMessage({ success: false, message: "Failed to fetch blogs" }));
            console.log(err);
        }
    };

    const deleteMultipleHandle = async () => {
        // Perform delete logic here
        const ids = [...selectedIds.values()];
        // Reset deleteIds or perform any other necessary actions
        try {
            const response = await api.post("/blogs/delete-multiple", { ids });
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
            resetParams();
            fetchBlogs();
        }
    };

    const toggleShowDeleteBtn = (value: boolean) => {
        setShowDeleteBtn(value);
    };

    const onClickSearch = (searchTerm: string) => {
        dispatch(onHanldeSearchData({ search: searchTerm }));
    }

    const onRequestDeleteById = async (id: string) => {
        try {
            const response = await api.delete(`/blogs/${id}`);
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
        const newData = blogs.filter((item) => item._id !== id);
        dispatch(fetchAllAdminBlogs({ success: true, data: { data: newData, total: total - 1 } }));
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
        router.push(`/admin/blogs/${id}`);
    }

    const activeHandle = async (id: string) => {
        if (inProccessing) return;

        dispatch(beginProcess());
        try {
            const response = await api.put(`/blogs/${id}/active`);
            const dataRes = response.data;

            if (dataRes.success) {
                // Show success message
                dispatch(handleMessage(dataRes));
            } else {
                dispatch(handleMessage({ success: false, message: "Failed to change status" }));
            }
        } catch (err) {
            dispatch(handleMessage({ success: false, message: "Failed to change status" }));
            console.log(err);
        } finally {
            // Reset state
            resetParams();

            // update the blogs state
            const newData = blogs.filter((item) => item._id !== id);
            dispatch(fetchAllAdminBlogs({ success: true, data: { data: newData, total } }));
        }
    }

    const onPageChange = (newPage: number) => {
        dispatch(onReduxPageChange({ page: newPage }));
    }

    const resetParams = () => {
        setShowDeleteBtn(false);
        setSelectedIds(new Set());
    }

    const viewHandle = (id: string) => {
        const blog = blogs.find((item) => item._id === id);

        if (blog && blog.slug) {
            window.open(`/blogs/${blog.slug}`, '_blank');
        }

        return;
    }

    return (
        <AdminLayout>
            {/* Alert */}
            <ToastContainer />

            {/* heading */}
            <Title title="Blogs Management" />

            {/* filter row and actions */}
            <div className="w-full flex flex-col items-start sm:items-center gap-2 my-4 text-xs sm:text-base bg-white/50 rounded-lg py-3 px-4 shadow-md mb-4">
                <div className='w-full flex flex-col sm:flex-row sm:justify-between justify-start items-start sm:items-center gap-2 my-4 text-xs sm:text-base'>
                    <SearchItem onSearchHanlde={onClickSearch} />

                    <div className="flex flex-row sm:justify-end items-center gap-2 sm:w-full">
                        <DeleteButton onDelete={deleteMultipleHandle} disabled={!showDeleteBtn} />

                        <AddButton path="/admin/blogs/add" />
                    </div>
                </div>

                {/* table */}
                <AdminTable
                    showCheckbox
                    selectedIds={selectedIds}
                    setSelectedIds={setSelectedIds}
                    headers={["Title", "Category", "Tags", "Author"]}
                    columns={["title", "category.name", "tags", "author.name"]}
                    rows={blogs}
                    hasActionsCol={true}
                    viewHandle={viewHandle}
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