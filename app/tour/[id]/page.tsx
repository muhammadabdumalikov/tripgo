'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Star, Clock, Users, Calendar, MapPin, Globe, Shield, ChevronRight, Heart } from 'lucide-react';

interface TourDetailsProps {
  params: {
    id: string;
  };
}

const TourDetails = ({ params }: TourDetailsProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock data - In real app, fetch this based on params.id
  const tour = {
    id: params.id,
    title: "Tashkent: Full-Day Chimgan Mountains & Charvak Lake Tour",
    rating: 4.8,
    reviews: 128,
    duration: "12 hours",
    groupSize: "Up to 8 people",
    price: 89,
    location: "Tashkent, Uzbekistan",
    languages: ["English", "Russian", "Uzbek"],
    images: [
      "/destinations/nefrit.jpg",
      "/destinations/gulkam.jpg",
      "/destinations/tuzkon.jpg",
      "/destinations/issiqkol.jpg",
    ],
    highlights: [
      "Enjoy a scenic drive through the Chimgan Mountains",
      "Visit the beautiful Charvak Lake",
      "Experience local cuisine at a traditional restaurant",
      "Take stunning photos at panoramic viewpoints",
      "Optional activities: hiking, horseback riding"
    ],
    description: "Escape the city and discover the natural beauty of Uzbekistan on this full-day tour. Journey through the majestic Chimgan Mountains, visit the crystal-clear Charvak Lake, and immerse yourself in local culture with traditional food and optional activities."
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-gray-900">
        <Image
          src={tour.images[selectedImage]}
          alt={tour.title}
          fill
          className="object-cover opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        {/* Image Gallery Thumbnails */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {tour.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all
                ${selectedImage === index ? 'border-white scale-110' : 'border-transparent opacity-70'}`}
            >
              <Image
                src={image}
                alt={`Tour image ${index + 1}`}
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">{tour.title}</h1>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Heart className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-medium">{tour.rating}</span>
                  <span className="text-gray-600">({tour.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{tour.location}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span>{tour.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-5 h-5 text-gray-400" />
                  <span>{tour.groupSize}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Globe className="w-5 h-5 text-gray-400" />
                  <span>{tour.languages.join(", ")}</span>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Highlights</h2>
                  <ul className="space-y-3">
                    {tour.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <ChevronRight className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4">Description</h2>
                  <p className="text-gray-600 leading-relaxed">{tour.description}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <span className="text-2xl font-bold">${tour.price}</span>
                  <span className="text-gray-600 ml-1">per person</span>
                </div>
                <div className="flex items-center text-green-600 text-sm">
                  <Shield className="w-4 h-4 mr-1" />
                  <span>Lowest price guarantee</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white">
                    <option>1 person</option>
                    <option>2 people</option>
                    <option>3 people</option>
                    <option>4 people</option>
                    <option>5+ people</option>
                  </select>
                </div>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors">
                Check Availability
              </button>

              <div className="mt-6 space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Shield className="w-4 h-4" />
                  <span>Free cancellation up to 24 hours in advance</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Available tomorrow</span>
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