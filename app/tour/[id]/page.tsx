// 'use client';
import React from 'react';
import Image from 'next/image';
import { Calendar, Clock, MapPin, Star, Users, Shield, Globe, ThumbsUp } from 'lucide-react';
import BookButton from '@/components/features/tour/BookButton';
import FavoriteButton from '@/components/features/tour/FavoriteButton';
// import TourMap from '@/components/features/tour/TourMap';

interface Tour {
  id: string;
  title: string;
  rating: number;
  reviews_count: number;
  duration: string;
  groupSize: string;
  price: number;
  location: string;
  startLocation: string;
  endLocation: string;
  images: string[];
  description: string;
  included: string[];
  participants: Array<{
    image: string;
    alt: string;
  }>;
  reviews: Array<{
    id: number;
    user_name: string;
    rating: number;
    comment: string;
    date: string;
    user_image: string;
  }>;
}

// Define Params type
type Params = Promise<{ id: string }>;

export default async function TourDetails({ params }: { params: Params }) {
  const { id } = await params;

  const tour: Tour = {
    id: id,
    title: "Shveytsariya Alp tog'larida sarguzasht",
    rating: 4.8,
    reviews_count: 128,
    duration: "12 hours",
    groupSize: "2-8",
    price: 2800,
    location: "Tashkent, Uzbekistan",
    startLocation: "Tashkent, Uzbekistan",
    endLocation: "Samarkand, Uzbekistan",
    images: [
      "/bg2.jpg",
      "/bg2.jpg",
      "/bg2.jpg",
      "/bg2.jpg",
    ],
    description: "Escape the city and discover the natural beauty of Uzbekistan on this full-day tour. Journey through the majestic mountains, visit the crystal-clear lakes, and immerse yourself in local culture with traditional food and optional activities.",
    included: [
      "Professional guide",
      "Hotel pickup and drop-off",
      "Lunch at local restaurant",
      "All entrance fees",
      "Bottled water"
    ],
    participants: [
      { image: '/images/reviewer.png', alt: 'Participant 1' },
      { image: '/images/reviewer.png', alt: 'Participant 2' },
      { image: '/images/reviewer.png', alt: 'Participant 3' },
      { image: '/images/reviewer.png', alt: 'Participant 4' },
      { image: '/images/reviewer.png', alt: 'Participant 5' },
    ],
    reviews: [
      {
        id: 1,
        user_name: "Sarah Johnson",
        rating: 5,
        comment: "Amazing experience! The guide was very knowledgeable and friendly. The views were breathtaking and the whole trip was well organized.",
        date: "March 2024",
        user_image: "/placeholder-avatar.jpg"
      },
      {
        id: 2,
        user_name: "Michael Chen",
        rating: 4,
        comment: "Great tour with beautiful scenery. The coffee tasting was a highlight. Would definitely recommend to others.",
        date: "February 2024",
        user_image: "/placeholder-avatar.jpg"
      }
    ]
  };

  // Simulate network delay        
  if (!tour) {
    return <div>Loading...</div>;
  }


  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Image Section */}
      <div className="relative h-[75vh] bg-gray-900">
        <Image
          src={tour.images[0]}
          alt={tour.title}
          fill
          className="object-cover opacity-90"
          priority
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Bottom Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-3">
              <div className="px-3 py-1 bg-[#febd2d] text-black text-sm font-medium rounded-full">
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
                <span className="text-white/80">({tour.reviews_count} reviews)</span>
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
              <p className="text-gray-600 leading-relaxed mb-6">{tour.description}</p>
              
              {/* Travel Participants - Integrated with Description */}
              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center">
                      {tour.participants.map((participant, index) => (
                        <div 
                          key={index} 
                          className="relative -ml-2 first:ml-0 transition-transform hover:-translate-y-1"
                          style={{ zIndex: 10 - index }}
                        >
                          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                            <Image
                              src={participant.image}
                              alt={participant.alt}
                              width={32}
                              height={32}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        </div>
                      ))}
                      <div 
                        className="relative -ml-2 w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-white text-xs font-medium border-2 border-white transition-transform hover:-translate-y-1"
                        style={{ zIndex: 0 }}
                      >
                        +24
                      </div>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-gray-900">29 travelers</span>
                      <span className="text-gray-500"> joined this month</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-[#febd2d]" />
                    <span className="text-gray-500">Next trip in 2 days</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Tour Route</h2>
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <MapPin className="w-5 h-5 text-[#febd2d]" />
                <span>From: {tour.startLocation}</span>
                <span className="mx-2">→</span>
                <MapPin className="w-5 h-5 text-[#febd2d]" />
                <span>To: {tour.endLocation}</span>
              </div>
              {/* <TourMap 
                startLocation={tour.startLocation}
                endLocation={tour.endLocation}
                className="mt-4"
              /> */}
            </div>

            {/* Experience Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-6">Experience</h2>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Itinerary</h3>

                <div className="relative pl-8 space-y-6">
                  {/* Vertical Line */}
                  <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-200" />

                  {/* Pickup Location */}
                  <div className="relative">
                    <div className="absolute left-[-33px] w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                      <MapPin className="w-3 h-3 text-white" />
                    </div>
                    <h4 className="font-medium mb-1">Pickup location:</h4>
                    <p className="text-gray-600">Tashkent</p>
                  </div>

                  {/* Car Journey */}
                  <div className="relative">
                    <div className="absolute left-[-33px] w-6 h-6 bg-gray-100 border-2 border-gray-200 rounded-full flex items-center justify-center">
                      <Users className="w-3 h-3 text-gray-400" />
                    </div>
                    <h4 className="font-medium mb-1">Car</h4>
                    <p className="text-gray-600">(20 minutes)</p>
                  </div>

                  {/* Train Journey */}
                  <div className="relative">
                    <div className="absolute left-[-33px] w-6 h-6 bg-gray-100 border-2 border-gray-200 rounded-full flex items-center justify-center">
                      <Users className="w-3 h-3 text-gray-400" />
                    </div>
                    <h4 className="font-medium mb-1">Train</h4>
                    <p className="text-gray-600">(2.17 hours)</p>
                  </div>

                  {/* Main Stop */}
                  <div className="relative">
                    <div className="absolute left-[-33px] w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <Star className="w-3 h-3 text-white" />
                    </div>
                    <h4 className="font-medium mb-1">Samarkand</h4>
                    <p className="text-gray-600">Visit, Guided tour, Shopping, Sightseeing (6 hours)</p>
                  </div>

                  {/* Return Train */}
                  <div className="relative">
                    <div className="absolute left-[-33px] w-6 h-6 bg-gray-100 border-2 border-gray-200 rounded-full flex items-center justify-center">
                      <Users className="w-3 h-3 text-gray-400" />
                    </div>
                    <h4 className="font-medium mb-1">Train</h4>
                    <p className="text-gray-600">(2.17 hours)</p>
                  </div>

                  {/* Return Car */}
                  <div className="relative">
                    <div className="absolute left-[-33px] w-6 h-6 bg-gray-100 border-2 border-gray-200 rounded-full flex items-center justify-center">
                      <Users className="w-3 h-3 text-gray-400" />
                    </div>
                    <h4 className="font-medium mb-1">Car</h4>
                    <p className="text-gray-600">(15 minutes)</p>
                  </div>

                  {/* Arrive Back */}
                  <div className="relative">
                    <div className="absolute left-[-33px] w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                      <MapPin className="w-3 h-3 text-white" />
                    </div>
                    <h4 className="font-medium mb-1">Arrive back at:</h4>
                    <p className="text-gray-600">Tashkent</p>
                  </div>
                </div>

                {/* Reference Note */}
                <p className="text-sm text-gray-500 mt-6 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  For reference only. Itineraries are subject to change.
                </p>
              </div>
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

            {/* Reviews Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Customer Reviews</h2>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-medium text-lg">{tour.rating}</span>
                  <span className="text-gray-500">({tour.reviews_count} reviews)</span>
                </div>
              </div>

              {/* Review Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    </div>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-yellow-400 rounded-full" style={{ width: '70%' }} />
                    </div>
                    <span className="text-sm text-gray-500 w-12">70%</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <Star className="w-4 h-4 text-gray-300" />
                    </div>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-yellow-400 rounded-full" style={{ width: '20%' }} />
                    </div>
                    <span className="text-sm text-gray-500 w-12">20%</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <Star className="w-4 h-4 text-gray-300" />
                      <Star className="w-4 h-4 text-gray-300" />
                    </div>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-yellow-400 rounded-full" style={{ width: '10%' }} />
                    </div>
                    <span className="text-sm text-gray-500 w-12">10%</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="w-5 h-5 text-green-500" />
                    <span className="text-gray-600">95% of travelers recommend this experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="text-gray-600">Based on {tour.reviews_count} reviews</span>
                  </div>
                </div>
              </div>

              {/* Individual Reviews */}
              <div className="space-y-6">
                {tour.reviews.map((review) => (
                  <div key={review.id} className="border-t pt-6">
                    <div className="flex items-start gap-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                        <Image
                          alt={review.user_image}
                          src='/images/reviewer.png'
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium">{review.user_name}</h3>
                          <span className="text-gray-500">•</span>
                          <span className="text-gray-500">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < review.rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                                }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Show More Button */}
              <button className="mt-8 w-full py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50">
                Show all reviews
              </button>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-32">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-3xl font-bold">${tour.price}</span>
                  <span className="text-gray-500 ml-1">/ person</span>
                </div>
                <FavoriteButton />
              </div>

              <div className="space-y-4 mb-6">
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

              <BookButton
                tour={{
                  title: tour.title,
                  price: tour.price,
                  location: tour.location
                }}
              />

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