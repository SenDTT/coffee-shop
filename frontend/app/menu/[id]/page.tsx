"use client";

import { useParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../../store';
import { useEffect } from 'react';
import { clearCurrentProduct, fetchAProduct, handleMessage } from '../../../store/slices/productSlide';
import api from '../../../api';
import ProductSliderImage from "../../../components/Products/ProductImageSlider";
import Layout from '../../../components/Layouts/MainLayout';
import ProductStaticSections from '../../../components/Products/ProductStaticSections';
import WhyChooseUs from '../../../components/Products/WhyChooseUs';
import { ShoppingCart } from 'lucide-react';

export default function ProductDetailPage() {
    const params = useParams();
    const productId: string = params.id as string;
    const dispatch = useAppDispatch();
    const { error, success, message, selectedProduct } = useAppSelector(state => state.product);

    useEffect(() => {
        if (productId && typeof productId === 'string') {
            getProduct(productId)
        }
        return () => {
            dispatch(clearCurrentProduct());
        }
    }, [dispatch, productId]);

    const getProduct = async (id: string) => {
        try {
            const response = await api.get(`/products/${id}`);
            if (response.status !== 200) {
                dispatch(handleMessage({ success: false, message: "Network response was not ok" }));
                return;
            }

            const data = response.data;
            dispatch(fetchAProduct(data));
        } catch (error) {
            if (error instanceof Error) {
                dispatch(handleMessage({ success: false, message: error.message }));
            } else {
                dispatch(handleMessage({ success: false, message: "An unknown error occurred" }));
            }
        }
    }

    return (
        <Layout>
            <div className="container mx-auto p-6 pb-20">
                {/* Section 1: Overview */}
                {selectedProduct && (
                    <>
                        <div className="w-full sm:h-[70vh] flex flex-col md:flex-row gap-6">
                            {selectedProduct.images ? (<ProductSliderImage images={selectedProduct.images} />) : (
                                <img
                                    loading="lazy"
                                    src={`${process.env.NEXT_PUBLIC_DOMAIN}uploads/default_coffee.png`}
                                    alt={"default"}
                                    className="object-cover w-full h-full rounded-3xl"
                                />
                            )}
                            <div className='flex-1 flex flex-col gap-4'>
                                <h1 className="text-3xl font-bold">{selectedProduct.name}</h1>
                                <p className="text-xl font-bold text-green-700 mt-2">${selectedProduct.price}</p>
                                <p className="mt-4 text-gray-600">{selectedProduct.description}</p>
                                <div className='flex'>
                                    <button className="inline-flex items-center gap-2 mt-6 px-4 py-2 bg-caramel-800 text-latte-100 rounded hover:bg-caramel-700">
                                        <ShoppingCart className='w-5 h-5 text-latte-200 inline-block' />
                                        Add to Cart 
                                    </button>
                                </div>

                                {/* SECTION: Why Choose Us */}
                                <WhyChooseUs />
                            </div>
                        </div>
                    </>
                )}
            </div>

            <ProductStaticSections />
        </Layout>
    );
}
