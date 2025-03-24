// 'use client';
import React from 'react';
import Image from 'next/image';
import { Calendar, Clock, MapPin, Star, Users, Shield, Globe, ThumbsUp } from 'lucide-react';
import BookButton from '@/components/(client)/features/tour/BookButton';
import FavoriteButton from '@/components/(client)/features/tour/FavoriteButton';
import { api } from '@/utils/api';
import { getProxiedImageUrl } from '@/utils/image';

export interface RoutePoint {
  /** Type of the point in the route */
  type: 'location' | 'destination' | 'transport';
  /** Name of the location or destination */
  name: string;
  /** Type of transport (only for transport type points) */
  transport_type?: string;
  /** Duration of transport or activity */
  duration?: string;
  /** Activities available at this point (for destinations) */
  activities?: string;
  /** Optional coordinates for mapping */
  coordinates?: {
    lat: number;
    lng: number;
  };
}

interface Tour {
  id: string;
  title: {
    en: string;
    ru: string;
    uz: string;
  };
  description: {
    en: string;
    ru: string;
    uz: string;
  };
  price: number;
  rating: number;
  reviews_count: number;
  duration: string;
  group_size: string;
  location: string;
  start_location: string;
  end_location: string;
  files: Array<{
    url: string;
    type: string;
  }>;
  included: string[];
  route_json?: Array<RoutePoint>;
  reviews: Array<{
    id: number;
    user_name: string;
    rating: number;
    comment: string;
    date: string;
    user_image: string;
  }>;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TourDetails({ params }: PageProps) {
  // Await params before accessing id
  const { id } = await params;
  
  // Fetch tour data
  const response = await api.post<Tour>('/tour/get-by-id', { id }, false);
  console.log(response);
  if (!response.success || !response.data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Tour Not Found</h2>
          <p className="text-gray-600">The tour you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        </div>
      </div>
    );
  }

  const tour: Tour = response.data;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Image Section */}
      <div className="relative h-[75vh] bg-gray-900">
        <Image
          src={getProxiedImageUrl(tour.files?.find(f => f.type === 'extra')?.url || '/placeholder.jpg')}
          alt={tour.title.en}
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
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{tour.title.en}</h1>
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
                <span>{tour.group_size} people</span>
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
              <p className="text-gray-600 leading-relaxed mb-6">{tour.description.en}</p>
            </div>

            {/* Map Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Tour Route</h2>
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <MapPin className="w-5 h-5 text-[#febd2d]" />
                <span>From: {tour.start_location}</span>
                <span className="mx-2">→</span>
                <MapPin className="w-5 h-5 text-[#febd2d]" />
                <span>To: {tour.end_location}</span>
              </div>
            </div>

            {/* Experience Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Experience</h2>
              {tour.route_json && tour.route_json.length > 0 ? (
                <>
                  <h3 className="text-xl font-semibold mb-4">Route</h3>
                  <div className="relative pl-8 space-y-6">
                    {/* Vertical Line */}
                    <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-200" />

                    {tour.route_json?.map((point: RoutePoint, index: number) => (
                      <div key={index} className="relative">
                        <div className={`absolute left-[-33px] w-6 h-6 ${
                          point.type === 'location' 
                            ? 'bg-orange-500' 
                            : point.type === 'destination' 
                            ? 'bg-blue-600'
                            : 'bg-gray-100 border-2 border-gray-200'
                        } rounded-full flex items-center justify-center`}>
                          {point.type === 'location' || point.type === 'destination' ? (
                            <MapPin className="w-3 h-3 text-white" />
                          ) : (
                            <Users className="w-3 h-3 text-gray-400" />
                          )}
                        </div>
                        <h4 className="font-medium mb-1">
                          {point.type === 'location' 
                            ? (index === 0 ? 'Pickup location:' : 'Arrive back at:')
                            : point.type === 'destination'
                            ? point.name
                            : point.transport_type}
                        </h4>
                        <p className="text-gray-600">
                          {point.type === 'location' || point.type === 'destination' 
                            ? point.name
                            : `(${point.duration})`}
                          {point.type === 'destination' && point.activities && (
                            <span className="block text-sm text-gray-500 mt-1">
                              {point.activities}
                            </span>
                          )}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Reference Note */}
                  <p className="text-sm text-gray-500 mt-6 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    For reference only. Itineraries are subject to change.
                  </p>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="w-8 h-8" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={1.5} 
                        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                      />
                    </svg>
                  </div>
                  <p className="text-lg font-medium mb-2">No Route Information</p>
                  <p className="text-sm text-center text-gray-400 max-w-sm">
                    The route details for this tour are not available at the moment. Please contact the organizer for more information about the tour itinerary.
                  </p>
                </div>
              )}
            </div>

            {/* What's Included */}
            {tour.included && tour.included.length > 0 && (
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
            )}

            {/* Reviews Section */}
            {tour.reviews && tour.reviews.length > 0 && (
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
            )}
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
                  title: tour.title.en,
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
}