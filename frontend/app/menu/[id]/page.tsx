"use client";

import { useParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../../store';
import { useEffect } from 'react';
import { clearCurrentProduct, fetchAProduct, handleMessage } from '../../../store/slices/productSlide';
import api from '../../../api';
import ProductSliderImage from "../../../components/Products/ProductImageSlider";
import Layout from '../../../components/Layouts/MainLayout';

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
            <div className="container mx-auto p-6 space-y-12">
                {/* Section 1: Overview */}
                {selectedProduct && (
                    <>
                        <div className="flex flex-col md:flex-row gap-6">
                            {selectedProduct.images ? (<ProductSliderImage images={selectedProduct.images} />) : (
                                <img
                                    loading="lazy"
                                    src={`${process.env.NEXT_PUBLIC_DOMAIN}uploads/default_coffee.png`}
                                    alt={"default"}
                                    className="object-cover w-full h-full rounded-3xl"
                                />
                            )}
                            <div>
                                <h1 className="text-3xl font-bold">{selectedProduct.name}</h1>
                                <p className="text-xl text-green-700 mt-2">${selectedProduct.price}</p>
                                <p className="mt-4 text-gray-600">{selectedProduct.description}</p>
                                <button className="mt-6 px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
                                    Add to Cart
                                </button>
                            </div>
                        </div>

                        {/* Section 2: Details */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-2">Details</h2>
                            <p className="text-gray-700">{selectedProduct.description}</p>
                        </section>

                        {/* Section 4: Related Items */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-2">You may also like</h2>
                            {/* Replace with a horizontal scroll or grid */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* Related items */}
                            </div>
                        </section>
                    </>
                )}
            </div>
        </Layout>
    );
}
