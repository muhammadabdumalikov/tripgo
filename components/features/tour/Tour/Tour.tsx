'use client';
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {TourCard, Tour} from "../TourCard";

type Response = {
  data: Tour[];
};


async function fetchTours(): Promise<Response> {
  const API_URL = "/api/tour/list"; // Calls the Next.js proxy instead

  const res = await fetch(API_URL, { method: 'post', body: JSON.stringify({}), headers: {'X-Lang': 'uz'}}); // Replace with your API endpoint
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}


const RecommendedTours = () => {
  const router = useRouter();

   const { data, isLoading, error } = useQuery({
    queryKey: ["tours"],
    queryFn: fetchTours,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  const onPressHandler = (item: Tour) => {
    router.push(`/listing-details/${item.id}`);
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
