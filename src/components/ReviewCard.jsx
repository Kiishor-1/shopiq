'use client';

import dynamic from "next/dynamic";
import { formatDate } from "@/helpers/formatDate";

const ReactStars = dynamic(() => import("react-stars"), { ssr: false });

const ReviewCard = ({ review }) => {
  return (
    <div className="w-full max-w-md p-6 border rounded-md shadow-md bg-white">
      <div className="flex items-center space-x-4">
        <img
          src={`https://api.dicebear.com/5.x/initials/svg?seed=${review?.reviewerName}`}
          alt="Profile Picture"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h2 className="text-sm font-semibold text-gray-800">{review?.reviewerName}</h2>
          <p className="text-sm text-gray-500">{formatDate(review?.date)}</p>
        </div>
      </div>

      <div className="mt-4">
        <ReactStars
          count={5}
          value={review?.rating || 0}
          size={16}
          color1="#e4e5e9"
          color2="#008080"
          edit={false}
        />
      </div>

      <p className="mt-4 text-gray-600 text-sm leading-relaxed">
        {review?.comment}
      </p>
    </div>
  );
};

export default ReviewCard;