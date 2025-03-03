'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Calendar, Clock, Heart, MapPin, Star, Users, Shield, Globe } from 'lucide-react';

interface PageProps {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

const TourDetails = ({ params }: PageProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock data - In real app, fetch this based on params.id
  const tour = {
    id: params.id,
    title: "Shveytsariya Alp tog&apos;larida sarguzasht",
    rating: 4.8,
    reviews: 128,
    duration: "12 hours",
    groupSize: "2-8",
    price: 2800,
    location: "Tashkent, Uzbekistan",
    images: [
      "/destinations/nefrit.jpg",
      "/destinations/gulkam.jpg",
      "/destinations/tuzkon.jpg",
      "/destinations/issiqkol.jpg",
    ],
    description: "Escape the city and discover the natural beauty of Uzbekistan on this full-day tour. Journey through the majestic mountains, visit the crystal-clear lakes, and immerse yourself in local culture with traditional food and optional activities.",
    included: [
      "Professional guide",
      "Hotel pickup and drop-off",
      "Lunch at local restaurant",
      "All entrance fees",
      "Bottled water"
    ]
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Image Section */}
      <div className="relative h-[75vh] bg-gray-900">
        <Image
          src={tour.images[selectedImage]}
          alt={tour.title}
          fill
          className="object-cover"
          priority
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Top Navigation */}
        <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4">
          <button className="w-10 h-10 bg-white/10 backdrop-blur rounded-full flex items-center justify-center">
            <MapPin className="w-6 h-6 text-white" />
          </button>
          <div className="flex gap-2">
            <button className="w-10 h-10 bg-white/10 backdrop-blur rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-3">
              <div className="px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">
                Featured
              </div>
              <div className="px-3 py-1 bg-white/20 backdrop-blur text-white text-sm font-medium rounded-full">
                Mountain
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{tour.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-white">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="font-medium">{tour.rating}</span>
                <span className="text-white/80">({tour.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-white/80" />
                <span>{tour.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-white/80" />
                <span>{tour.groupSize} people</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-white/80" />
                <span>{tour.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">About this tour</h2>
              <p className="text-gray-600 leading-relaxed">{tour.description}</p>
            </div>

            {/* What's Included */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">What&apos;s included</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tour.included.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <div className="flex items-baseline justify-between mb-6">
                <div>
                  <span className="text-3xl font-bold">${tour.price}</span>
                  <span className="text-gray-500 ml-1">/ person</span>
                </div>
                <div className="flex items-center text-green-600 text-sm">
                  <Shield className="w-4 h-4 mr-1" />
                  <span>Lowest price guarantee</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
                    <option>2 people</option>
                    <option>3 people</option>
                    <option>4 people</option>
                    <option>5 people</option>
                    <option>6 people</option>
                    <option>7 people</option>
                    <option>8 people</option>
                  </select>
                </div>
              </div>

              <button onClick={() => setSelectedImage(0)} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-4 rounded-xl mt-6 transition-colors">
                Book Now
              </button>

              <div className="mt-6 space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Shield className="w-4 h-4" />
                  <span>Free cancellation up to 24 hours in advance</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Globe className="w-4 h-4" />
                  <span>Available in multiple languages</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TourDetails; 