'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import LocationSearch from '@/components/features/home/Hero/LocationSearch';
import DatePicker, { DateObject } from "react-multi-date-picker";
import { Calendar } from "lucide-react";
import "react-multi-date-picker/styles/layouts/mobile.css";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";

interface SearchBoxProps {
  variant?: 'search' | 'default' | 'compact';
  onSearch?: (params: { location: string; dates: string[]; }) => void;
}

const SearchBox = ({ onSearch }: SearchBoxProps) => {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState<DateObject[]>([]);
  // const [guests] = useState('Guest 1 Room 1');

  const handleSearch = () => {
    if (onSearch) {
      onSearch({
        location,
        dates: startDate.map(date => date.format("DD.MM.YYYY")),
      });
    } else {
      router.push(`/search?search=${location}&dates=${startDate.map(date => date.format("DD.MM.YYYY")).join(',')}`);
    }
  };

  return (
    <div className="my-2 md:flex md:items-center bg-white md:rounded-full rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col md:flex-row w-full">
        {/* Location */}
        <div className="flex-1 px-6 py-4 md:py-1 border-b md:border-b-0 md:border-r border-gray-200">
          <LocationSearch onLocationSelect={(loc) => setLocation(loc)} />
        </div>

        {/* Start Date */}
        <div className="flex-1 px-6 py-4 md:py-1 border-b md:border-b-0 border-gray-200">
          <p className="text-sm font-medium text-gray-800">Start Date</p>
          <div className="relative">
            <style jsx global>{`
              .rmdp-wrapper {
                background: white !important;
                box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1) !important;
                border: none !important;
                border-radius: 0.75rem !important;
                padding: 1rem !important;
              }
              .rmdp-calendar {
                padding: 0.5rem !important;
              }
              .rmdp-day, .rmdp-week-day {
                width: 40px !important;
                height: 40px !important;
                font-size: 0.875rem !important;
              }
              .rmdp-week-day {
                color: #6B7280 !important;
                font-weight: 500 !important;
              }
              .rmdp-day.rmdp-today span {
                background-color: transparent !important;
                color: #febd2d !important;
                font-weight: 600 !important;
              }
              .rmdp-day:not(.rmdp-disabled):not(.rmdp-day-hidden) span:hover {
                background-color: #fff8e6 !important;
                color: #febd2d !important;
              }
              .rmdp-day.rmdp-selected span:not(.highlight) {
                background-color: #febd2d !important;
                color: white !important;
                box-shadow: none !important;
              }
              .rmdp-day.rmdp-range.start span:not(.highlight) {
                background-color: #febd2d !important;
                color: white !important;
                border-top-left-radius: 100% !important;
                border-bottom-left-radius: 100% !important;
              }
              .rmdp-day.rmdp-range.end span:not(.highlight) {
                background-color: #febd2d !important;
                color: white !important;
                border-top-right-radius: 100% !important;
                border-bottom-right-radius: 100% !important;
              }
              .rmdp-day.rmdp-range {
                background-color: #febd2d !important;
              }
              .rmdp-day.rmdp-range span:not(.highlight) {
                color: #fff8e6 !important;
              }
              .rmdp-day.rmdp-range.start, .rmdp-day.rmdp-range.end {
                background-color: #febd2d !important;
              }
              .rmdp-day.rmdp-range.start span, .rmdp-day.rmdp-range.end span {
                color: white !important;
              }
              .rmdp-day.rmdp-range-hover {
                background-color: #fff8e6 !important;
              }
              .rmdp-day.rmdp-range-hover span {
                color: #d4a012 !important;
              }
              .rmdp-arrow {
                border: solid #4B5563 !important;
                border-width: 0 2px 2px 0 !important;
              }
              .rmdp-arrow-container:hover {
                background-color: #F3F4F6 !important;
                box-shadow: none !important;
              }
              .rmdp-header-values {
                font-size: 1rem !important;
                font-weight: 600 !important;
                color: #111827 !important;
                margin-bottom: 0.5rem !important;
              }
              .rmdp-month-picker, .rmdp-year-picker {
                background-color: white !important;
                box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1) !important;
                border-radius: 0.5rem !important;
              }
            `}</style>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <DatePicker
                range
                value={startDate}
                onChange={(dates) => {
                  if (Array.isArray(dates)) {
                    setStartDate(dates);
                  }
                }}
                format="MMM D"
                placeholder="Select date"
                minDate={new Date()}
                rangeHover
                monthYearSeparator=" "
                dateSeparator=" - "
                render={(value, openCalendar) => (
                  <CustomDateInput value={value} openCalendar={openCalendar} />
                )}
                className="w-full text-sm outline-none text-gray-600 focus:text-gray-800 placeholder:text-gray-400 mt-10"
              />
            </div>
          </div>
        </div>

        {/* Guest
        <div className="flex-1 px-6 py-4 md:py-1">
          <p className="text-sm font-medium text-gray-800">Guest</p>
          <p className="text-sm text-gray-600">{guests}</p>
        </div> */}
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

const CustomDateInput = ({ openCalendar, value }: { openCalendar: () => void, value: string }) => {
  return (
    <div
      onClick={openCalendar}
      className="flex items-center cursor-pointer w-full text-sm outline-none text-gray-600 hover:text-gray-800"
    >
      <input
        value={value}
        placeholder="Select date"
        className="w-44 cursor-pointer outline-none placeholder:text-gray-400"
        readOnly
      />
    </div>
  );
};

export default SearchBox;