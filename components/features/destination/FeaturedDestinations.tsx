'use client';
import Image from 'next/image';
import { Star } from 'lucide-react';

interface Destination {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  reviews: number;
  price: string;
}

const destinations: Destination[] = [
  {
    id: 1,
    name: "Nefrit Ko'li",
    location: "Tashkent, Uzbekistan",
    image: "/destination-1.jpg",
    rating: 4.8,
    reviews: 128,
    price: "$299"
  },
  {
    id: 2,
    name: "Gulkam Sharsharasi",
    location: "Tashkent, Uzbekistan",
    image: "/destination-2.jpg",
    rating: 4.9,
    reviews: 89,
    price: "$199"
  },
  {
    id: 3,
    name: "Tuzkon ko'li",
    location: "Jizzax, Uzbekistan",
    image: "/destination-3.jpg",
    rating: 4.7,
    reviews: 156,
    price: "$249"
  },
  {
    id: 4,
    name: "Issiqko'l",
    location: "Bishkek, Kyrgyzstan",
    image: "/destination-1.jpg",
    rating: 4.9,
    reviews: 201,
    price: "$399"
  }
];

const FeaturedDestinations = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-12">
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">Featured Destinations</h2>
        <p className="text-gray-600 max-w-2xl">
          Discover the most popular destinations in Central Asia, from pristine lakes to stunning waterfalls
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.map((destination) => (
          <div 
            key={destination.id}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            {/* Image Container */}
            <div className="aspect-[4/3] relative overflow-hidden">
              <Image
                src={destination.image}
                alt={destination.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-lg font-semibold">{destination.name}</h3>
                <p className="text-sm opacity-90">{destination.location}</p>
              </div>
            </div>

            {/* Info Container */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-medium">{destination.rating}</span>
                  <span className="text-sm text-gray-600">
                    ({destination.reviews} reviews)
                  </span>
                </div>
                <p className="text-sm font-semibold text-blue-600">
                  from {destination.price}
                </p>
              </div>
              <button className="w-full py-2 text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedDestinations; 