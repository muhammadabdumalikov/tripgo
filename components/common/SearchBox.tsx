'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import LocationSearch from '../features/home/Hero/LocationSearch';

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
    <div className="flex items-center bg-white rounded-full shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
      {/* Location */}
      <div className="flex-1 px-6 py-3 border-r border-gray-200">
        <LocationSearch onLocationSelect={(loc) => setLocation(loc)} />
      </div>

      {/* Start Date */}
      <div className="flex-1 px-6 py-3 border-r border-gray-200">
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
      <div className="flex-1 px-6 py-3">
        <p className="text-sm font-medium text-gray-800">Guest</p>
        <p className="text-sm text-gray-600">{guests}</p>
      </div>

      {/* Search Button */}
      <div className="px-3">
        <button
          onClick={handleSearch}
          className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full px-8 py-3.5 font-medium 
          shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] 
          flex items-center gap-2 transition-all duration-200"
        >
          <Search className="w-4 h-4" />
          <span>Search</span>
        </button>
      </div>
    </div>
  );
};

export default SearchBox;