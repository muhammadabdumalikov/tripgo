import Image from 'next/image';
import { MdFavoriteBorder } from 'react-icons/md';
import Link from 'next/link';
import { Star } from 'lucide-react';

export interface Tour {
  id: number,
  title: string,
  files: Array<{
    type: string,
    url: string
  }>,
  organizer_logo: string;
  organizer_title: string;
  organizer_phone: string;
  description: string,
  rating: number,
  price: string;
  reviews?: Array<{
    id: number;
    user_name: string;
    rating: number;
    comment: string;
    date: string;
    user_image?: string;
  }>;
};

export const TourCard = ({
  index,
  tour,
  onPressHandler
}: {tour: Tour, index: number, onPressHandler: (item: Tour) => void}) => {
  return (
    <Link href={`/tour/${tour.id}`} className="block group">
      <div
        key={index}
        onClick={() => onPressHandler(tour)}
        className="w-full h-96 overflow-hidden rounded-3xl cursor-pointer snap-center flex flex-col transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-1"
      >
        {/* Image Section */}
        <div className="relative w-full h-56 flex-shrink-0 rounded-t-3xl overflow-hidden">
          <Image
            src={tour.files?.find((f) => f.type === "extra")?.url || "/placeholder.jpg"}
            alt={tour.title}
            layout="fill"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Discount Box */}
          <div className="absolute top-3 left-3 bg-secondary text-neutral-50 text-xs font-semibold px-3 py-1 rounded-full">
            25% OFF
          </div>

          {/* Organizer Logo */}
          <div className="absolute bottom-3 right-3 w-10 h-10 bg-neutral-50 rounded-full flex items-center justify-center">
            <Image
              src={tour.organizer_logo || "/logo-placeholder.png"}
              alt="Organizer"
              width={38}
              height={38}
              className="rounded-full"
            />
          </div>

          {/* Heart Icon */}
          <div className="absolute top-3 right-3 text-neutral-50">
            <MdFavoriteBorder size={28} />
          </div>
        </div>

        {/* Info Section */}
        <div className="p-3 pb-6 flex flex-col flex-grow">
          <div className="items-center mt-1">
            <p className="text-sm text-gray-500">Cultural • Coffee</p>

            <h3 className="text-lg font-semibold text-[#050544] break-words line-clamp-2">
              {tour.title}
            </h3>
          </div>

          {/* Price Section */}
          <div className="flex justify-between items-end mt-auto">
            <span className="text-gray-500 text-sm">
              <span className="text-orange-400 font-semibold">
                {Intl.NumberFormat().format(+tour.price)}
              </span>
              /person
            </span>
            
            {/* Rating */}
            <div className="flex items-center bg-green-500 text-white text-sm px-2 py-1 rounded-md">
              <span className="pr-1">{tour.rating || 0}</span>
              <Star className="w-4 h-4 ml-1" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
