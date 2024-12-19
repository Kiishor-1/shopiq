"use client";
import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { slidesData } from "@/helpers/data";

const Header = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isPaused) return; 

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slidesData.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, activeIndex]);


  const handleUserInteraction = () => {
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };

  const nextSlide = () => {
    handleUserInteraction();
    setActiveIndex((prev) => (prev + 1) % slidesData.length);
  };

  const prevSlide = () => {
    handleUserInteraction();
    setActiveIndex(
      (prev) => (prev - 1 + slidesData.length) % slidesData.length
    );
  };

  const getSlideStyle = (index) => {
    const position = (index - activeIndex + slidesData.length) % slidesData.length;

    if (isMobile) {
      if (position === 0) {
        return { width: "100%", left: "0", zIndex: 3, opacity: 1 };
      } else {
        return { width: "0", opacity: 0 };
      }
    } else {
      if (position === 0) {
        return { width: "60%", left: "5%", zIndex: 3, opacity: 1 };
      } else if (position === 1) {
        return { width: "25%", left: "70%", zIndex: 2, opacity: 1, fontSize: "1rem" };
      } else if (position === 2) {
        return { width: "15%", left: "85%", zIndex: 1, opacity: 1, fontSize: "1rem" };
      }
      return { width: "0", left: "100%", opacity: 0 };
    }
  };

  return (
    <div className="relative w-full md:h-[450px] h-[400px] overflow-hidden bg-gray-100">
      <div className="absolute w-full h-full">
        {slidesData.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute top-0 bottom-0 m-auto md:h-[400px] h-[350px] rounded-lg shadow-lg transition-all duration-500 ease-in-out flex items-center justify-center text-white ${slide.bg}`}
            style={getSlideStyle(index)}
          >
            <div className="w-full h-full relative">
              <h2
                className={`absolute md:top-[30%] top-[35%] uppercase left-[5%] z-[20] text-[#E2808A] md:text-4xl text-2xl md:max-w-[220px] max-w-[100px] font-bold text-center`}
              >
                {slide.title}
              </h2>
              <img
                src={slide?.image}
                className="relative z-1 h-full w-full rounded-lg object-cover object-center"
                loading="lazy"
                alt={slide.title}
              />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="md:block hidden absolute left-2 top-[45%] md:h-12 md:w-12 h-7 w-7 bg-black text-white border border-2 border-white rounded-full z-10"
      >
        <FaChevronLeft className="translate-x-[70%] translate-y-[10%]" />
      </button>
      <button
        onClick={nextSlide}
        className="md:block hidden absolute right-2 top-[45%] md:h-12 md:w-12 h-7 w-7 bg-black text-white rounded-full border border-2 border-white z-10"
      >
        <FaChevronRight className="translate-x-[80%] translate-y-[10%]" />
      </button>
    </div>
  );
};

export default Header;
