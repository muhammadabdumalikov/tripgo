'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import LocationSearch from './LocationSearch';

const MobileSearchBox = () => {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [guests] = useState('2 adults - 1 children - 1 room');

  const handleSearch = () => {
    const searchParams = new URLSearchParams({
      location: location || '',
      startDate: startDate || '',
      guests: guests || '',
    });
    router.push(`/search?${searchParams.toString()}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
      {/* Location */}
      <div className="px-6 py-4 border-b border-gray-200">
        <LocationSearch onLocationSelect={(loc) => setLocation(loc)} />
      </div>

      {/* Start Date */}
      <div className="px-6 py-4 border-b border-gray-200">
        <p className="text-sm font-medium text-gray-800">Check in - Check out</p>
        <input 
          type="text" 
          placeholder="Wed 2 Mar - Fri 11 Apr"
          className="w-full text-sm outline-none text-gray-600 focus:text-gray-800 placeholder:text-gray-400"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      {/* Guest */}
      <div className="px-6 py-4 border-b border-gray-200">
        <p className="text-sm font-medium text-gray-800">Guest</p>
        <p className="text-sm text-gray-600">{guests}</p>
      </div>

      {/* Search Button */}
      <div className="p-6">
        <button
          onClick={handleSearch}
          className="w-full bg-[#4169E1] hover:bg-[#3154b3] text-white rounded-xl px-8 py-3.5 font-medium 
          shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] 
          flex items-center justify-center gap-2 transition-all duration-200"
        >
          <Search className="w-4 h-4" />
          <span>Search</span>
        </button>
      </div>
    </div>
  );
};

export default MobileSearchBox; 