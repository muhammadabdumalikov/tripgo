'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import LocationSearch from '../Home/Hero/LocationSearch';

interface SearchBoxProps {
  variant?: 'search' | 'default' | 'compact';
}

const SearchBox = ({ }: SearchBoxProps) => {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [guests, setGuests] = useState('Guest 1 Room 1');

  const handleSearch = () => {
    const searchParams = new URLSearchParams({
      location: location || '',
      startDate: startDate || '',
      guests: guests || '',
    });
    router.push(`/search?${searchParams.toString()}`);
  };

  return (
    <div className="flex items-center bg-white rounded-full shadow-md">
      {/* Location */}
      <div className="flex-1 px-6 py-2 border-r border-gray-200">
        <LocationSearch onLocationSelect={(loc) => setLocation(loc)} />
      </div>

      {/* Start Date */}
      <div className="flex-1 px-6 py-2 border-r border-gray-200">
        <p className="text-sm font-medium">Start Date</p>
        <input 
          type="date" 
          placeholder="dd/mm/yyyy"
          className="w-full text-sm outline-none text-gray-600"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      {/* Guest */}
      <div className="flex-1 px-6 py-2">
        <p className="text-sm font-medium">Guest</p>
        <p className="text-sm text-gray-600">{guests}</p>
      </div>

      {/* Search Button */}
      <div className="px-2">
        <button
          onClick={handleSearch}
          className="rounded-full px-8 py-3 flex items-center justify-center overflow-hidden group bg-blue-500 relative hover:bg-gradient-to-r hover:from-blue-500
            hover:to-bg-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-blue-500 transition-all ease-out duration-300"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBox;