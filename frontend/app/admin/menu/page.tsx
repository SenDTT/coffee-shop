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

const LIMIT = 10;

export default function MenuPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [showDeleteBtn, setShowDeleteBtn] = useState(true);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [selectedAll, setSelectedAll] = useState(false);
    const [params, setParams] = useState<GetListParams>({
        limit: LIMIT,
        skip: 0,
    });
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

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

    const handleDelete = async (ids: string[]) => {
        // Perform delete logic here
        console.log('Deleting items with IDs:', ids);
        // Reset deleteIds or perform any other necessary actions

        // Show success message
        toast.success('Items deleted successfully!');

        // Reset state
        setShowDeleteBtn(false);
        setSelectedItems([]);
        setSelectedAll(false);
    };

    const toggleShowDeleteBtn = () => {
        setShowDeleteBtn(!showDeleteBtn);
    };

    const onClickSearch = (searchTerm: string) => {
        setCurrentPage(1);
        if (searchTerm !== "") {
            setParams({ ...params, search: searchTerm });
        } else {
            setParams({ limit: LIMIT, skip: 0 });
        }
    }

    const deleteHandle = (id: string) => {
        console.log(id);
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
                        {showDeleteBtn && (<DeleteButton deleteIds={selectedItems} onDelete={handleDelete} />)}

                        <AddButton path="/admin/menu/add" />
                    </div>
                </div>

                {/* table */}
                <AdminTable
                    showCheckbox
                    headers={["Sku", "Name", "Description", "Price", "Stock", "Category"]}
                    columns={["sku", "name", "description", "price", "stock", "category.name"]}
                    rows={products}
                    hasActionsCol={true}
                    viewUrl="/admin/menu/"
                    deleteHandle={deleteHandle}
                    editHandle={editHandle}
                    totalRecords={total}
                    currentPage={currentPage}
                    pageSize={LIMIT}
                    onPageChange={onPageChange}
                />

            </div>
        </AdminLayout>
    );
}