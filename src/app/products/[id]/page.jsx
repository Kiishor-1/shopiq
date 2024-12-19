"use client";
import ReviewCard from "@/components/ReviewCard";
import ReviewSummary from "@/components/ReviewSummary";
import Slider from "@/components/Slider";
import { notFound } from "next/navigation";
import { FaExchangeAlt, FaShippingFast } from "react-icons/fa";
import { HiBadgeCheck } from "react-icons/hi";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function ProductDetail({ params }) {
    const [id, setId] = useState(null);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchParams = async () => {
            const resolvedParams = await params;
            setId(resolvedParams?.id);
        };
        fetchParams();
    }, [params]);

    useEffect(() => {
        if (!id) return;
        const fetchProduct = async () => {
            toast.loading("Fetching product details...", { id: "loading-toast" });
            try {
                const response = await fetch(`https://dummyjson.com/products/${id}`);
                const productData = await response.json();

                if (!productData) {
                    notFound();
                }

                setProduct(productData);
            } catch (error) {
                toast.error("Failed to fetch product details!");
            } finally {
                setLoading(false);
                toast.dismiss("loading-toast");
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                 <div className="spinner"></div>
            </div>
        );
    }

    if (!product) {
        return <p>Product not found!</p>;
    }

    return (
        <div className="md:p-6 m-2 flex md:flex-row flex-col items-center md:items-start gap-8">
            <div className="md:w-[40%] w-[100%]">
                <Slider images={product.images} />
            </div>
            <div className="flex-1 mt-8 flex flex-col gap-4">
                <h1 className="text-3xl font-semibold text-gray-600">{product?.brand}</h1>
                <h2 className="text-2xl font-bold">{product.title}</h2>
                <p className="flex items-center gap-2">
                    {product?.tags.length > 0 &&
                        product?.tags.map((tag, id) => (
                            <span key={id} className="text-blue-400 text-sm">
                                #{tag}
                            </span>
                        ))}
                </p>
                <p className="px-3 py-1 border border-2 rounded-lg font-semibold my-4 border-gray-500 bg-gray-100 w-[fit-content]">
                    {product?.rating} Ratings
                </p>
                <p className="flex items-center gap-2">
                    <span className="font-bold">
                        $ {(product?.price - (product?.price * product?.discountPercentage) / 100).toFixed(2)}
                    </span>
                    <s className="font-semibold text-gray-600">₹ {product?.price}</s>
                    <span className="font-bold text-lg text-orange-500">({product?.discountPercentage}% Off)</span>
                </p>
                <p className="font-semibold bg-red-500 px-2 py-1 text-white rounded-md w-[fit-content]">{product?.stock} left</p>
                <p className="max-w-[70%] text-gray-900">{product.description}</p>
                <p className="font-semibold px-2 py-1 flex items-center gap-4 text-gray-600">
                    <MdOutlineProductionQuantityLimits />
                    Minimum Order Quantity: {product?.minimumOrderQuantity}
                </p>
                <p className="font-semibold px-2 py-1 flex items-center gap-4 text-gray-600">
                    <HiBadgeCheck />
                    {product?.warrantyInformation}
                </p>
                <p className="font-semibold px-2 py-1 flex items-center gap-4 text-gray-600">
                    <FaShippingFast />
                    {product?.shippingInformation}
                </p>
                <p className="font-semibold px-2 py-1 flex items-center gap-4 text-gray-600">
                    <FaExchangeAlt />
                    {product?.returnPolicy}
                </p>
                <div className="mt-4 border border-2 border-gray-300 rounded-lg md:p-8 p-4">
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2">
                        {product?.reviews.length > 0 &&
                            product?.reviews.map((review, id) => (
                                <ReviewCard key={id} review={review} />
                            ))}
                    </div>
                    <ReviewSummary reviews={product?.reviews} />
                </div>
            </div>
        </div>
    );
}
