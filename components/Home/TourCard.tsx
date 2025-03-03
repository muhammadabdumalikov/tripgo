import Image from 'next/image';
import { MdFavoriteBorder, MdStar } from 'react-icons/md';

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
};

export const TourCard = ({
  key,
  tour,
  onPressHandler
}: {tour: Tour, key: number, onPressHandler: (item: Tour) => void}) => {
  return (
 <div
          key={key}
          onClick={() => onPressHandler(tour)}
          className="w-full h-96 bg-white overflow-hidden rounded-3xl cursor-pointer snap-center border flex flex-col"
        >
          {/* Image Section */}
          <div className="relative w-full h-56 flex-shrink-0 rounded-t-3xl overflow-hidden">
            <Image
              src={tour.files?.find((f) => f.type === "extra")?.url || "/placeholder.jpg"}
              alt={tour.title}
              layout="fill"
              className="object-cover"
            />

            {/* Discount Box */}
            <div className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
              25% OFF
            </div>

            {/* Organizer Logo */}
            <div className="absolute bottom-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <Image
                src={tour.organizer_logo || "/logo-placeholder.png"}
                alt="Organizer"
                width={38}
                height={38}
                className="rounded-full"
              />
            </div>

            {/* Heart Icon */}
            <div className="absolute top-3 right-3 text-white">
              <MdFavoriteBorder size={28} />
            </div>
          </div>

          {/* Info Section */}
          <div className="p-3 pb-6 flex flex-col flex-grow">
            <div className="items-center mt-1">
              <p className="text-sm text-gray-500">Cultural • Coffee</p>

              <h3 className="text-lg font-semibold text-[#050544] break-words line-clamp-2">{tour.title}</h3>
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
                <MdStar size={16} />
              </div>
            </div>
          </div>
        </div>
  );
};
