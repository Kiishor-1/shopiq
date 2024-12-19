"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { FaChevronCircleDown } from "react-icons/fa";
import toast from "react-hot-toast";

const ListingsClient = ({ initialProducts }) => {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState(initialProducts || []); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    const savedPage = parseInt(localStorage.getItem("page") || "1", 10);
    const savedScrollPosition = parseInt(localStorage.getItem("scrollPosition") || "0", 10);

    if (savedProducts.length > 0) {
      setProducts(savedProducts);
      setPage(savedPage);
      setTimeout(() => {
        window.scrollTo(0, savedScrollPosition);
      }, 0);
    }
  }, []);

  const handleLoadMore = async () => {
    setLoading(true);
    const toastId = toast.loading("Loading more products...");
    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=12&skip=${page * 12}`
      );
      const data = await response.json();
      setProducts((prevProducts) => [...prevProducts, ...data.products]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error loading more products:", error);
      toast.error("Failed to load more products");
    } finally {
      toast.dismiss(toastId);
      setLoading(false);
    }
  };

  const handleSaveState = () => {
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("page", page.toString());
    localStorage.setItem("scrollPosition", window.scrollY.toString());
  };

  return (
    <div>
      <h2 className="md:text-4xl text-2xl p-4 mt-4 text-gray-600 font-semibold">
        Top Selling Products
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 md:gap-6 gap-2 md:p-6 p-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} onClick={handleSaveState}>
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No products available</p>
        )}
      </div>
      {loading ? (
        <div className="text-center py-4">Loading...</div>
      ) : (
        <div className="mb-4">
          <button
            onClick={handleLoadMore}
            className="w-[fit-content] mx-auto mt-4 text-blue-400 text-lg flex items-center justify-center gap-2"
          >
            Show More
            <FaChevronCircleDown />
          </button>
        </div>
      )}
    </div>
  );
};

export default ListingsClient;
