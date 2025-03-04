'use client';
import { Tour, TourCard } from '@/components/features/tour/TourCard';

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
  return (
    <main className="min-h-screen bg-white pt-[12vh] pb-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {properties.map((property, index) => (
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
                // Handle tour selection
                console.log('Selected tour:', tour);
              }}
              index={index}
              key={index}
            />
          ))}
        </div>
      </div>
    </main>
  );
} 