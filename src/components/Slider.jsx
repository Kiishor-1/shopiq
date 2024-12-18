"use client"

import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

export default function Slider({images}) {
  return (
    <div className='hover:shadow-[0_0_2px_gray] rounded-lg'>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper text-center w-full h-full"
      >
        {
            images.length > 0 &&
            images.map((img,id)=>(
                <SwiperSlide key={id}>
                    <img src={img} alt="" />
                </SwiperSlide>
            ))
        }
      </Swiper>
    </div>
  );
}