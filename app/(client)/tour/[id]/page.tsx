import React from 'react';
import Image from 'next/image';
import { Calendar, Clock, MapPin, Star, Users, Shield, Globe, ThumbsUp, Play } from 'lucide-react';
import BookButton from '@/components/(client)/features/tour/BookButton';
import FavoriteButton from '@/components/(client)/features/tour/FavoriteButton';
import { api } from '@/utils/api';
import { getProxiedImageUrl } from '@/utils/image';
import { Includes } from '@/app/(organizer)/dashboard/tours/create/page';

export interface RoutePoint {
  /** Type of the point in the route */
  type: 'location' | 'destination' | 'transport';
  /** Name of the location or destination */
  title: string;
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
  includes: Includes[];
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

interface MediaGalleryProps {
  files: Tour['files'];
  title: string;
  rating: number;
  reviewsCount: number;
  duration: string;
  groupSize: string;
  location: string;
}

function MediaGallery({ 
  files,
  title,
  rating,
  reviewsCount,
  duration,
  groupSize,
  location
}: MediaGalleryProps) {

  const mediaFiles = files || [];
  const mainImage = mediaFiles.find(f => f.type === 'extra')?.url || '/placeholder.jpg';

  return (
    <>
      {/* Main Gallery Grid */}
      <div className="relative h-[75vh] max-w-7xl mx-auto mt-28">
        <div className="mx-auto h-full w-full">
          <div className="flex h-full gap-1">
            {/* Main Large Image */}
            <div className="relative h-full w-full lg:w-[75%] bg-gray-900 overflow-hidden">
              <Image
                src={getProxiedImageUrl(mainImage)}
                alt="Main tour image"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Side Grid for Additional Images */}
            <div className="hidden lg:grid h-full w-[25%] grid-rows-3 gap-1">
              {mediaFiles.slice(1, 4).map((file, index) => (
                <div key={index} className="relative cursor-pointer group overflow-hidden">
                  {file.type === 'video' ? (
                    <div className="relative h-full bg-gray-900">
                      <Image
                        src={getProxiedImageUrl(file.url)}
                        alt={`Tour preview ${index + 1}`}
                        fill
                        className="object-cover opacity-90 group-hover:opacity-95 transition-opacity"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Play className="w-10 h-10 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={getProxiedImageUrl(file.url)}
                      alt={`Tour preview ${index + 1}`}
                      fill
                      className="object-cover opacity-90 group-hover:opacity-95 transition-opacity"
                    />
                  )}
                  {index === mediaFiles.length - 2 && mediaFiles.length > 4 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white text-xl font-medium">+{mediaFiles.length - 4}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Title and Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
          <div className="max-w-7xl mx-auto flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
              <div className="flex items-center gap-4 text-white/90">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span>{rating?.toFixed(1)}</span>
                  <span>({reviewsCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-5 h-5" />
                  <span>{duration} hours</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-5 h-5" />
                  <span>Up to {groupSize} people</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-5 h-5" />
                  <span>{location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function TourDetailsSkeleton() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Image Section Skeleton */}
      <div className="relative h-[75vh] bg-gray-300 animate-pulse">
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-24 h-6 bg-gray-400 rounded-full"></div>
              <div className="w-20 h-6 bg-gray-400 rounded-full"></div>
            </div>
            <div className="h-10 w-2/3 bg-gray-400 rounded-lg mb-4"></div>
            <div className="flex flex-wrap items-center gap-4">
              <div className="w-32 h-6 bg-gray-400 rounded-lg"></div>
              <div className="w-24 h-6 bg-gray-400 rounded-lg"></div>
              <div className="w-28 h-6 bg-gray-400 rounded-lg"></div>
              <div className="w-36 h-6 bg-gray-400 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Skeleton */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description Skeleton */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="h-7 w-48 bg-gray-200 rounded-lg mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 w-full bg-gray-200 rounded-lg"></div>
                <div className="h-4 w-5/6 bg-gray-200 rounded-lg"></div>
                <div className="h-4 w-4/6 bg-gray-200 rounded-lg"></div>
              </div>
            </div>

            {/* Route Skeleton */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="h-7 w-48 bg-gray-200 rounded-lg mb-4"></div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-32 h-6 bg-gray-200 rounded-lg"></div>
                <div className="w-4 h-4 bg-gray-200"></div>
                <div className="w-32 h-6 bg-gray-200 rounded-lg"></div>
              </div>
              
              {/* Route Points */}
              <div className="relative pl-8 space-y-6">
                <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-200"></div>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="relative">
                    <div className="absolute left-[-33px] w-6 h-6 bg-gray-200 rounded-full"></div>
                    <div className="h-6 w-48 bg-gray-200 rounded-lg mb-2"></div>
                    <div className="h-4 w-64 bg-gray-200 rounded-lg"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Includes Skeleton */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="h-7 w-48 bg-gray-200 rounded-lg mb-4"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
                    <div className="h-4 w-40 bg-gray-200 rounded-lg"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Skeleton */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="h-7 w-48 bg-gray-200 rounded-lg"></div>
              <div className="flex items-center gap-2">
                  <div className="h-6 w-24 bg-gray-200 rounded-lg"></div>
                </div>
              </div>

              {/* Review Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-24 h-4 bg-gray-200 rounded-lg"></div>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full"></div>
                      <div className="w-12 h-4 bg-gray-200 rounded-lg"></div>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <div className="h-6 w-full bg-gray-200 rounded-lg"></div>
                  <div className="h-6 w-3/4 bg-gray-200 rounded-lg"></div>
                </div>
              </div>

              {/* Individual Reviews */}
              <div className="space-y-6">
                {[1, 2].map((i) => (
                  <div key={i} className="border-t pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="h-5 w-32 bg-gray-200 rounded-lg"></div>
                          <div className="h-5 w-24 bg-gray-200 rounded-lg"></div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-4 w-full bg-gray-200 rounded-lg"></div>
                          <div className="h-4 w-5/6 bg-gray-200 rounded-lg"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Card Skeleton */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="h-8 w-32 bg-gray-200 rounded-lg"></div>
                <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="h-12 w-full bg-gray-200 rounded-xl"></div>
                <div className="h-12 w-full bg-gray-200 rounded-xl"></div>
              </div>

              <div className="h-12 w-full bg-gray-200 rounded-xl mb-6"></div>

              <div className="space-y-3">
              <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                  <div className="h-4 w-full bg-gray-200 rounded-lg"></div>
              </div>
              <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                  <div className="h-4 w-5/6 bg-gray-200 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default async function TourDetails({ params }: PageProps) {
  // Await params before accessing id
  const { id } = await params;
  
  // Show skeleton while loading
  if (!id) {
    return <TourDetailsSkeleton />;
  }
  
  // Fetch tour data
  const response = await api.post<Tour>('/tour/get-by-id', { id }, false);
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
      <MediaGallery 
        files={tour.files}
        title={tour.title.en}
        rating={tour.rating}
        reviewsCount={tour.reviews_count}
        duration={tour.duration}
        groupSize={tour.group_size}
        location={tour.location}
      />

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About this activity */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">About this activity</h2>
              
              {/* Free cancellation */}
              <div>
                <div className="flex items-start gap-5 py-5 border-b border-gray-100 px-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-900 mb-0.5">
                      Free cancellation
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Cancel up to 24 hours in advance for a full refund
                    </p>
                  </div>
                </div>
              </div>

              {/* Duration */}
              <div>
                <div className="flex items-start gap-5 py-5 border-b border-gray-100 px-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-900 mb-0.5">
                      Duration {tour.duration}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Check availability to see starting times
                    </p>
                  </div>
                </div>
              </div>

              {/* Live tour guide */}
              <div>
                <div className="flex items-start gap-5 py-5 border-b border-gray-100 px-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center">
                    <Globe className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-900 mb-0.5">
                      Live tour guide
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      English
                    </p>
                  </div>
                </div>
              </div>

              {/* Small group */}
              <div>
                <div className="flex items-start gap-5 py-5 px-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center">
                    <Users className="w-4 h-4 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-900 mb-0.5">
                      Small group
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Limited to {tour.group_size} participants
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-6">Experience</h2>
              {tour.route_json && tour.route_json.length > 0 ? (
                <>
                  <h3 className="text-lg font-semibold mb-4">Route</h3>
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
                            ? point.title
                            : point.transport_type}
                        </h4>
                        <p className="text-gray-600">
                          {point.type === 'location' || point.type === 'destination' 
                            ? point.title
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
            {tour.includes && tour.includes.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">What&apos;s included</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {tour.includes.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                      {item.title}
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
                  <span className="text-3xl font-bold">{Intl.NumberFormat().format(+tour.price)}</span>
                  <span className="text-gray-500 ml-1">/ per person</span>
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