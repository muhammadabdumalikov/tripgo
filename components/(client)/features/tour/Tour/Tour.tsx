'use client';
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {TourCard, Tour} from "../TourCard";
import { api } from "@/utils/api";

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

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  const onPressHandler = (item: Tour) => {
    router.push(`/tour/${item.id}`);
  };

  return (
    <div className="w-[90%] xl:w-[80%] mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 overflow-x-scroll scroll-smooth snap-x snap-mandatory mb-8">
      {data?.data?.map((item, index) => (
        <TourCard key={index} index={index} tour={item} onPressHandler={onPressHandler}/>
      ))}
    </div>
  );
};

export default RecommendedTours;
