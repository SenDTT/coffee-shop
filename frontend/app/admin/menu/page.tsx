'use client';

import AdminLayout from '../../../components/Layouts/AdminLayout';
import DeleteButton from '../../../components/Admin/DeleteButton';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import AddButton from '../../../components/Admin/AddButton';
import SearchItem from '../../../components/Admin/SearchItem';
import Title from '../../../components/Admin/Title';
import { GetListParams, Product } from '../../../types/Product';
import api from '../../..//api';

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

    useEffect(() => {
        fetchProducts();
    }, [params]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await api.get('/products', { params });
            const dataRes = res.data;
            console.log(dataRes);
            if (dataRes.success && dataRes.data) {
                setProducts(dataRes.data.data);
                setTotal(dataRes.total);
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
        console.log('Search term:', searchTerm);
    }

    return (
        <AdminLayout>
            {/* Alert */}
            <ToastContainer />

            {/* heading */}
            <Title title="Menu Management" />

            {/* filter row and actions */}
            <div className="w-full flex flex-col sm:flex-row items-center gap-2 my-4 text-xs sm:text-base bg-white/50 rounded-lg py-3 px-4 shadow-md mb-4">
                <SearchItem onSearchHanlde={onClickSearch} />

                <div className="flex flex-row justify-end items-center gap-2 w-full">
                    {showDeleteBtn && (<DeleteButton deleteIds={selectedItems} onDelete={handleDelete} />)}

                    <AddButton path="/admin/menu/add" />
                </div>

                {/* table */}
            </div>
        </AdminLayout>
    );
}