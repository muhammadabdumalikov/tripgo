'use client';
import Image from "next/image";
import React, { useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const images = [
  "/destination-1.jpg",
  "/destination-2.jpg",
  "/destination-3.jpg",
];

const Destination = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col items-center w-[90%] xl:w-[80%] mx-auto">
      {/* Heading and Buttons */}
      <div className="flex items-center justify-between w-full mt-24 mb-8">
        <p className="text-[40px]">Top Travel Destinations</p>
        <div className="w-24 flex items-center justify-between">
          <MdChevronLeft
            className="w-10 h-10 p-2 border border-gray-400 text-gray-400 hover:bg-blue-500 hover:text-white hover:border-blue-500 rounded-full cursor-pointer
              transition-all ease duration-500"
            onClick={prevSlide}
          />
          <MdChevronRight
            className="w-10 h-10 p-2 border border-gray-400 text-gray-400 hover:bg-blue-500 hover:text-white hover:border-blue-500 rounded-full cursor-pointer
              transition-all ease duration-500"
            onClick={nextSlide}
          />
        </div>
      </div>

      {/* Carousel */}
      <div className="relative w-full h-56 md:h-[516px] overflow-hidden rounded-[30] mb-8">
        {images.map((src, index) => (
          <div key={index} className={`h-full w-full duration-700 ease-in-out rounded-[30] overflow-hidden ${
              index === currentIndex ? "" : "hidden"
            }`}>
             <Image
            src={src}
            alt={`Slide ${index + 1}`}
              fill
              style={{borderRadius: '100%'}}
            className={`top-0 left-0 w-full h-full object-cover rounded-[30]`}
          />
         </div>
        ))}

        {/* Left & Right Buttons */}
        {/* <button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 bg-white/30 p-2 rounded-full hover:bg-white/50"
          onClick={prevSlide}
        >
          <MdChevronLeft className="text-white w-6 h-6" />
        </button>
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 bg-white/30 p-2 rounded-full hover:bg-white/50"
          onClick={nextSlide}
        >
          <MdChevronRight className="text-white w-6 h-6" />
        </button> */}
      </div>
    </div>
  );
};

export default Destination;
