'use client';
import { useState } from 'react';
import TravelCalendar from '@/components/features/calendar/TravelCalendar';
import { TourCard, Tour } from '@/components/(client)/features/tour/TourCard';

// This would typically come from an API based on search params
const properties = [
  {
    imageUrl: '/images/bg2.jpg',
    location: 'Shinano, Kamiminochi District, Japan',
    rating: 4.94,
    distance: '5,817 kilometers away',
    dates: 'Mar 30 - Apr 4',
    price: 458,
    isGuestFavorite: false,
  },
  {
    imageUrl: '/images/bg2.jpg',
    location: 'Jibhi, India',
    rating: 4.89,
    distance: '1,301 kilometers away',
    dates: 'Jul 1 - 6',
    price: 80,
    isGuestFavorite: false,
  },
  {
    imageUrl: '/images/bg2.jpg',
    location: 'Jibhi, India',
    rating: 4.95,
    distance: '1,302 kilometers away',
    dates: 'Mar 11 - 16',
    price: 140,
    isGuestFavorite: true,
  },
  {
    imageUrl: '/images/bg2.jpg',
    location: 'Saini, India',
    rating: 4.93,
    distance: '1,283 kilometers away',
    dates: 'Mar 3 - 8',
    price: 27,
    isGuestFavorite: true,
  },
  {
    imageUrl: '/images/bg2.jpg',
    location: 'Jibhi, India',
    rating: 4.89,
    distance: '1,301 kilometers away',
    dates: 'Jul 1 - 6',
    price: 80,
    isGuestFavorite: false,
  },
  {
    imageUrl: '/images/bg2.jpg',
    location: 'Jibhi, India',
    rating: 4.95,
    distance: '1,302 kilometers away',
    dates: 'Mar 11 - 16',
    price: 140,
    isGuestFavorite: true,
  },
  {
    imageUrl: '/images/bg2.jpg',
    location: 'Saini, India',
    rating: 4.93,
    distance: '1,283 kilometers away',
    dates: 'Mar 3 - 8',
    price: 27,
    isGuestFavorite: true,
  },
  {
    imageUrl: '/images/bg2.jpg',
    location: 'Jibhi, India',
    rating: 4.89,
    distance: '1,301 kilometers away',
    dates: 'Jul 1 - 6',
    price: 80,
    isGuestFavorite: false,
  },
  {
    imageUrl: '/images/bg2.jpg',
    location: 'Jibhi, India',
    rating: 4.95,
    distance: '1,302 kilometers away',
    dates: 'Mar 11 - 16',
    price: 140,
    isGuestFavorite: true,
  },
  {
    imageUrl: '/images/bg2.jpg',
    location: 'Saini, India',
    rating: 4.93,
    distance: '1,283 kilometers away',
    dates: 'Mar 3 - 8',
    price: 27,
    isGuestFavorite: true,
  },
];

export default function SearchPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [filteredProperties, setFilteredProperties] = useState(properties);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    // Here you would typically filter properties based on the selected date
    // For now, we'll just simulate filtering
    const filtered = properties.filter(() => Math.random() > 0.5);
    setFilteredProperties(filtered.length > 0 ? filtered : properties);
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-32 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calendar Widget */}
          <div className="lg:col-span-1 h-fit lg:sticky lg:top-32">
            <TravelCalendar onDateSelect={handleDateSelect} />
          </div>

          {/* Search Results */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div>
                  <h2 className="text-xl font-semibold">Available Tours</h2>
                  {selectedDate && (
                    <p className="text-sm text-gray-500 mt-1">
                      Tours available for {selectedDate.toLocaleDateString('default', { 
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  )}
                </div>
                <div className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                  {filteredProperties.length} tours found
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProperties.map((property, index) => (
                  <TourCard 
                    tour={{
                      id: index,
                      organizer_phone: '',
                      organizer_title: '',
                      title: property.location,
                      description: '',
                      files: [{
                        type: 'extra',
                        url: property.imageUrl
                      }],
                      organizer_logo: property.imageUrl,
                      rating: property.rating,
                      price: property.price.toString(),
                    }}
                    onPressHandler={(tour: Tour) => {
                      console.log('Selected tour:', tour);
                    }}
                    index={index}
                    key={index}
                  />
                ))}
              </div>

              {filteredProperties.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No tours available for the selected date.</p>
                  <p className="text-sm text-gray-400 mt-1">Try selecting a different date.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 