'use client';
import Image from 'next/image';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Williams',
    location: 'London, UK',
    image: '/images/bg2.jpg',
    rating: 4,
    comment: 'The safari experience in Tanzania was the trip of a lifetime. The wildlife sightings were incredible, and our guide made sure we were comfortable and safe throughout the journey.',
    date: 'October 2023'
  },
  {
    id: 2,
    name: 'David Rodriguez',
    location: 'Barcelona, Spain',
    image: '/images/bg2.jpg',
    rating: 5,
    comment: 'The Japan cultural tour was meticulously planned with the perfect balance of traditional experiences and modern attractions. The local insights made this trip truly special.',
    date: 'November 2023'
  },
  {
    id: 3,
    name: 'Olivia Thompson',
    location: 'Sydney, Australia',
    image: '/images/bg2.jpg',
    rating: 5,
    comment: 'The Greek Islands cruise was absolutely magical. Each island had its own unique charm, and the onboard experience was luxurious and relaxing. Worth every penny!',
    date: 'December 2023'
  },
  {
    id: 4,
    name: 'Sarah Williams',
    location: 'London, UK',
    image: '/images/bg2.jpg',
    rating: 4,
    comment: 'The safari experience in Tanzania was the trip of a lifetime. The wildlife sightings were incredible, and our guide made sure we were comfortable and safe throughout the journey.',
    date: 'October 2023'
  },
  {
    id: 5,
    name: 'David Rodriguez',
    location: 'Barcelona, Spain',
    image: '/images/bg2.jpg',
    rating: 5,
    comment: 'The Japan cultural tour was meticulously planned with the perfect balance of traditional experiences and modern attractions. The local insights made this trip truly special.',
    date: 'November 2023'
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">What Our Travelers Say</h2>
          <p className="text-gray-600 mt-4 text-lg">
            Real experiences from travelers who have explored the world with us
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 scrollbar-hide">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex-none w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-center"
                >
                  <div className="bg-white rounded-2xl p-8 shadow-sm relative overflow-hidden h-full">
                    {/* User Info */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.location}</p>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < testimonial.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-200"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-gray-600 text-sm leading-relaxed">
                      &ldquo;{testimonial.comment}&rdquo;
                    </p>

                    {/* Quote Icon */}
                    <div className="absolute top-6 right-6 text-gray-100">
                      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>

                    {/* Date */}
                    <p className="text-xs text-gray-400 mt-6">{testimonial.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Dots */}
          {/* <div className="flex justify-center items-center gap-2 mt-8">
            {[0, 1].map((dot) => (
              <button
                key={dot}
                type="button"
                className={`w-2 h-2 rounded-full transition-all ${
                  dot === 0 ? 'w-6 bg-blue-600' : 'bg-gray-200'
                }`}
                aria-label={`Go to slide ${dot + 1}`}
              />
            ))}
          </div> */}
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default Testimonials; 