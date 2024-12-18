"use client";
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { FaChevronCircleDown } from "react-icons/fa";

const Listings = () => {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
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
    } else {
      fetchInitialProducts();
    }
  }, []);

  const fetchInitialProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://dummyjson.com/products?limit=12&skip=0`);
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://dummyjson.com/products?limit=12&skip=${page * 12}`);
      const data = await response.json();
      setProducts((prevProducts) => [...prevProducts, ...data.products]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error loading more products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveState = () => {
    setTimeout(() => {
      localStorage.setItem("products", JSON.stringify(products));
      localStorage.setItem("page", page.toString());
      localStorage.setItem("scrollPosition", window.scrollY.toString());
    }, 0);
  };

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 md:gap-6 gap-2 md:p-6 p-4">
        {products.map((product) => (
          <div key={product.id} onClick={handleSaveState}>
            <ProductCard product={product} />
          </div>
        ))}
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

export default Listings;
