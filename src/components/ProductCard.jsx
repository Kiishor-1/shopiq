'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
const ReactStars = dynamic(() => import('react-stars'), { ssr: false });

const ProductCard = ({ product }) => (
    <Link href={`/products/${product?.id}`} className="relative group border p-1 rounded-md shadow-md text-center bg-white flex flex-col items-center">
        <img
            src={product.thumbnail}
            alt={product.title}
            className="w-[fit-content] mx-auto bg-white h-40 object-cover mb-4"
            loading="lazy"
        />
        <h3 className="md:text-lg text-xs font-bold">{product.title.length > 30 ? product.title.slice(0,30)+"...":product.title}</h3>
        <p className="md:text-md text-xs text-green-600 font-semibold">${product.price}</p>

        <div className="text-xs mb-2 flex items-center gap-2">
            <ReactStars
                count={5}
                value={product.rating || 0}
                edit={false}
                size={16}
                color1="#e4e5e9"
                color2="#FFD700"
            />
            <p className="text-xs">{product?.rating.toFixed(1)} Stars</p>
        </div>

        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#f7f7ee] opacity-50 z-10 hidden group-active:block transition-opacity duration-300"></div>
    </Link>
);

export default ProductCard;
