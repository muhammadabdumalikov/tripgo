'use client';
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {TourCard, Tour} from "../TourCard";
import { api } from "@/utils/api";
import { XCircle } from "lucide-react";

type Response = {
  data: Tour[];
};

const RecommendedTours = () => {
  const router = useRouter();

   const { data, isLoading, error } = useQuery({
    queryKey: ["tours"],
    queryFn: async () => {
      const response = await api.post<Response>('/tour/list',{}, false);
      if (!response.success) {
        throw new Error(response.error || 'Failed to fetch tours');
      }
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="w-[90%] xl:w-[80%] py-16 px-12 mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 overflow-x-scroll scroll-smooth snap-x snap-mandatory mb-8">
        {[1, 2, 3, 4].map((index) => (
          <div key={index} className="snap-start bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
            {/* Image Skeleton */}
            <div className="relative h-48 bg-gray-200">
              {/* Price Tag Skeleton */}
              <div className="absolute top-4 right-4 h-8 w-24 bg-gray-300 rounded-full"></div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              {/* Title */}
              <div className="space-y-2">
                <div className="h-5 w-3/4 bg-gray-200 rounded-md"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded-md"></div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between">
                <div className="h-4 w-20 bg-gray-200 rounded-md"></div>
                <div className="h-4 w-24 bg-gray-200 rounded-md"></div>
              </div>

              {/* Duration and Location */}
              <div className="flex items-center gap-4">
                <div className="h-4 w-16 bg-gray-200 rounded-md"></div>
                <div className="h-4 w-24 bg-gray-200 rounded-md"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3 text-red-700">
          <XCircle className="w-5 h-5 text-red-500" />
          <p>Error: {error.message}</p>
        </div>
      </div>
    );
  }

  const onPressHandler = (item: Tour) => {
    router.push(`/tour/${item.id}`);
  };

  return (
    <div className="w-[90%] xl:w-[80%] py-8 mx-auto mb-8">
      <div className="w-full flex justify-between items-center px-12 mb-4">
        <h2 className="text-2xl font-bold">Hot Tours</h2>
        <button
          onClick={() => router.push('/blogs')}
          className="text-[#febd2d] hover:text-[#e5a827] font-semibold"
        >
          See All
        </button>
      </div>

      <div className="w-full pt-2 pb-8 px-12 grid grid-cols-1 md:grid-cols-4 gap-4 overflow-x-scroll scroll-smooth snap-x snap-mandatory mb-8">
        {data?.data?.map((item, index) => (
          <TourCard key={index} index={index} tour={item} onPressHandler={onPressHandler} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedTours;
