'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import LocationSearch from '@/components/features/home/Hero/LocationSearch';

interface SearchBoxProps {
  variant?: 'search' | 'default' | 'compact';
}

const SearchBox = ({ }: SearchBoxProps) => {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [guests] = useState('Guest 1 Room 1');

  const handleSearch = () => {
    const searchParams = new URLSearchParams({
      location: location || '',
      startDate: startDate || '',
      guests: guests || '',
    });
    router.push(`/search?${searchParams.toString()}`);
  };

  return (
    <div className="mt-2 md:flex md:items-center bg-white md:rounded-full rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
      <div className="flex flex-col md:flex-row w-full">
        {/* Location */}
        <div className="flex-1 px-6 py-4 md:py-1 border-b md:border-b-0 md:border-r border-gray-200">
          <LocationSearch onLocationSelect={(loc) => setLocation(loc)} />
        </div>

        {/* Start Date */}
        <div className="flex-1 px-6 py-4 md:py-1 border-b md:border-b-0 md:border-r border-gray-200">
          <p className="text-sm font-medium text-gray-800">Start Date</p>
          <input 
            type="date" 
            placeholder="dd/mm/yyyy"
            className="w-full text-sm outline-none text-gray-600 focus:text-gray-800 placeholder:text-gray-400"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        {/* Guest */}
        <div className="flex-1 px-6 py-4 md:py-1">
          <p className="text-sm font-medium text-gray-800">Guest</p>
          <p className="text-sm text-gray-600">{guests}</p>
        </div>
      </div>

      {/* Search Button */}
      <div className="p-6 md:p-3 w-full md:w-auto">
        <button
          onClick={handleSearch}
          className="w-full md:w-auto bg-[#febd2d] hover:bg-[#e5a827] text-black rounded-xl md:rounded-full px-8 py-3.5 font-medium 
          shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] 
          flex items-center justify-center md:justify-start gap-2 transition-all duration-200"
        >
          <Search className="w-4 h-4" />
          <span>Search</span>
        </button>
      </div>
    </div>
  );
};

export default SearchBox;