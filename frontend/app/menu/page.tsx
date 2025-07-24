'use client'

import api from "../../api";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaSearch, FaSpinner } from "react-icons/fa";
import MenuItem from "../../components/Products/MenuItem";
import { useAppDispatch, useAppSelector } from "../../store";
import { clearMessage, fetchAllProducts, handleMessage, onHanldeSearchData, onReduxPageChange } from "../../store/slices/productSlide";
import { toast, ToastContainer } from 'react-toastify';

import dynamic from "next/dynamic"; import { Product } from "@/types/Product";
import { beginLoading } from "@/store/slices/admin/adminMenu";
import { useRouter, useSearchParams } from "next/navigation";
;
const Layout = dynamic(() => import("../../components/Layouts/MainLayout"), { ssr: true });

export default function ProductListPage() {
    const dispatch = useAppDispatch();
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const observerRef = useRef<HTMLDivElement | null>(null);
    const loadingRef = useRef(false);
    const [hasMore, setHasMore] = useState(true);
    const { error, loading, products, params, success, currentPage, message } = useAppSelector(state => state.product);
    const [searchKeyword, setSearchKeyword] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        handleSearch();
    }, []);

    useEffect(() => {
        console.log("fetchMenuItems", params, currentPage, loadingRef.current, hasMore);
        fetchMenuItems();
    }, [currentPage]);

    const handleSearch = () => {
        const currentSearch = new URLSearchParams(searchParams.toString());
        if (searchKeyword) {
            onClickSearch(searchKeyword);
            currentSearch.set('search', searchKeyword);
        } else {
            currentSearch.delete('search');
        }

        router.push(`?${currentSearch.toString()}`);
    };

    useEffect(() => {
        if (products.length > 0) {
            setAllProducts(prev => [...prev, ...products]);
        }

        if (products.length === 0 || products.length < params.limit) {
            setHasMore(false);
        }

        loadingRef.current = false;
    }, [products]);

    useEffect(() => {
        if (error && message) {
            toast.error(message);
            dispatch(clearMessage());
        } else if (success && message) {
            toast.success(message);
            dispatch(clearMessage())
        }
    }, [error, success, message]);

    const fetchMenuItems = useCallback(async () => {
        if (loadingRef.current || !hasMore) return;

        loadingRef.current = true;
        dispatch(clearMessage());

        try {
            const response = await api.get("/products", { params });
            if (response.status !== 200) {
                dispatch(handleMessage({ success: false, message: "Network response was not ok" }));
                return;
            }

            const data = response.data;
            if (data.data.data.length === 0) {
                setHasMore(false);
            } else {
                setHasMore(true);
            }
            dispatch(fetchAllProducts(data));
        } catch (error) {
            if (error instanceof Error) {
                dispatch(handleMessage({ success: false, message: error.message }));
            } else {
                dispatch(handleMessage({ success: false, message: "An unknown error occurred" }));
            }
        } finally {
            loadingRef.current = false;
        }
    }, [currentPage, params]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    loadingRef.current = false;
                    console.log(currentPage);
                    dispatch(onReduxPageChange({ page: currentPage + 1 }));
                }
            },
            { threshold: 1.0 }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };
    }, [dispatch, currentPage]);

    const onClickSearch = (searchTerm: string) => {
        setAllProducts([]);
        dispatch(beginLoading());
        setHasMore(true);
        loadingRef.current = false;
        dispatch(onHanldeSearchData({ search: searchTerm }));

        const currentSearch = new URLSearchParams();
        currentSearch.set('search', searchTerm);
        router.push(`?${currentSearch.toString()}`);
    }

    return (
        <Layout>
            <ToastContainer />
            <section className="py-10">
                <div className="container mx-auto space-y-8">
                    <h2 className="text-xl sm:text-6xl font-bold text-center font-serif text-espresso-800">
                        Full Menu
                    </h2>

                    <div className="relative w-full max-w-sm mx-auto rounded-2xl">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                            className="w-full pr-10 pl-4 py-2 border-none text-cabin-800 rounded-2xl bg-cabin-700/20 outline-none placeholder:text-cabin-800 placeholder:font-bold font-bold"
                        />
                        <button
                            title="click"
                            type="button"
                            onClick={(e) => onClickSearch(searchKeyword)} // define this function
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-800 hover:text-gray-800"
                        >
                            <FaSearch />
                        </button>
                    </div>

                    {loading && (
                        <div className="flex justify-center gap-4">
                            <FaSpinner className="inline-block mr-2 animate-spin" />
                            Loading Products...
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
                        {allProducts.map((item) => (
                            <MenuItem key={item._id} item={item} />
                        ))}
                    </div>

                    {/* Load more trigger element */}
                    <div ref={observerRef} className="h-10 mt-10 flex justify-center items-center">
                        {loading ? null : (
                            <>
                                {hasMore ? (
                                    <span className="text-gray-500 text-sm">Loading more...</span>
                                ) : (
                                    <span className="text-gray-400 text-sm">No more products</span>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </section>
        </Layout>
    );
}
