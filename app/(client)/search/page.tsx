'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import TravelCalendar from '@/components/features/calendar/TravelCalendar';
import { TourCard, Tour } from '@/components/(client)/features/tour/TourCard';
import { api } from '@/utils/api';

interface ApiTour {
  id: string;
  title: {
    en: string;
    [key: string]: string;
  };
  description: {
    en: string;
    [key: string]: string;
  };
  price: string;
  organizer_title: string;
  organizer_phone: string;
  organizer_logo: string;
  rating?: number;
  files: Array<{
    type: string;
    url: string;
  }>;
  [key: string]: unknown;
}

interface ApiResponse {
  data?: ApiTour[];
  [key: string]: unknown;
}

// Create a separate component that uses useSearchParams
function SearchPageContent() {
  const searchParams = useSearchParams();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [tours, setTours] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch tours wrapped in useCallback
  const fetchTours = useCallback(async (params: Record<string, string>) => {
    setIsLoading(true);
    try {
      const filters = { ...params };
      
      // Add date filter if selected
      if (selectedDate) {
        filters.date = selectedDate.toISOString();
      }

      // Make POST request to API
      const response = await api.post<ApiResponse>('/tour/list', filters);
      
      if (response?.data?.data) {
        // Map API response to Tour type
        const mappedTours = response.data.data.map((tour: ApiTour) => ({
          id: parseInt(tour.id),
          title: tour.title.en,
          description: tour.description.en || '',
          price: tour.price,
          organizer_title: tour.organizer_title || '',
          organizer_phone: tour.organizer_phone || '',
          organizer_logo: tour.organizer_logo || '',
          rating: tour.rating || 0,
          files: tour.files || []
        }));
        setTours(mappedTours);
      } else {
        setTours([]);
      }
    } catch (error) {
      console.error('Error fetching tours:', error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedDate]);

  // Fetch tours on page load or when params change
  useEffect(() => {
    const search = searchParams.get('search');
    const dates = searchParams.get('dates');
    
    const params: Record<string, string> = {};
    
    if (search) {
      params.search = search;
      }
    
    if (dates) {
      params.dates = dates;
    }
    
    fetchTours(params);
  }, [searchParams, fetchTours]);

  // Fetch tours when date changes
  useEffect(() => {
    if (selectedDate) {
      const search = searchParams.get('search');
      const dates = searchParams.get('dates');
      
      const params: Record<string, string> = {};
      
      if (search) {
        params.search = search;
      }
      
      if (dates) {
        params.dates = dates;
      }
      
      fetchTours(params);
    }
  }, [selectedDate, searchParams, fetchTours]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
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
                  <h2 className="text-xl font-semibold">
                    {searchParams.get('search') 
                      ? `Tours matching "${searchParams.get('search')}"` 
                      : 'Available Tours'}
                  </h2>
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
                  {tours.length} tours found
                </div>
              </div>

              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {tours.map((tour, index) => (
                      <TourCard 
                        tour={tour}
                        onPressHandler={(tour: Tour) => {
                          console.log('Selected tour:', tour);
                        }}
                        index={index}
                        key={tour.id}
                      />
                    ))}
                  </div>

                  {tours.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-gray-500">
                        {searchParams.get('search')
                          ? `No tours found matching "${searchParams.get('search')}"${selectedDate ? ' for the selected date' : ''}.`
                          : 'No tours available for the selected criteria.'}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        Try adjusting your search or selecting a different date.
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// Main component with Suspense boundary
export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
} 