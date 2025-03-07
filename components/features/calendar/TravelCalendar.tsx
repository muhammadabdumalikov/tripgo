/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TravelEvent {
  id: string;
  date: Date;
  title: string;
  image: string;
  category: 'Art' | 'Music' | 'Food & Drink' | 'Movie & Theatre';
}

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

interface TravelCalendarProps {
  onDateSelect?: (date: Date) => void;
}

const TravelCalendar = ({ onDateSelect }: TravelCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('Art');
  
  // Example events data
  const events: TravelEvent[] = [
    {
      id: '1',
      date: new Date(2024, 2, 9),
      title: 'Art Gallery Tour',
      image: '/images/events/art-gallery.jpg',
      category: 'Art'
    },
    {
      id: '2',
      date: new Date(2024, 2, 11),
      title: 'Food Festival',
      image: '/images/events/food-festival.jpg',
      category: 'Food & Drink'
    },
  ];

  // Example available tour dates
  const tourDates = [
    new Date(2024, 2, 15), // March 15
    new Date(2024, 2, 20), // March 20
    new Date(2024, 2, 25), // March 25
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const days = [];
    const previousMonth = new Date(year, month, 0);
    const daysInPreviousMonth = previousMonth.getDate();
    
    // Add days from previous month
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, daysInPreviousMonth - i);
      days.push({
        date,
        isCurrentMonth: false,
        hasTour: tourDates.some(tourDate => 
          tourDate.getDate() === date.getDate() &&
          tourDate.getMonth() === date.getMonth() &&
          tourDate.getFullYear() === date.getFullYear()
        )
      });
    }
    
    // Add days from current month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push({
        date,
        isCurrentMonth: true,
        hasTour: tourDates.some(tourDate => 
          tourDate.getDate() === date.getDate() &&
          tourDate.getMonth() === date.getMonth() &&
          tourDate.getFullYear() === date.getFullYear()
        )
      });
    }
    
    // Add days from next month
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i);
      days.push({
        date,
        isCurrentMonth: false,
        hasTour: tourDates.some(tourDate => 
          tourDate.getDate() === date.getDate() &&
          tourDate.getMonth() === date.getMonth() &&
          tourDate.getFullYear() === date.getFullYear()
        )
      });
    }
    
    return days;
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    onDateSelect?.(date);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  const isSelected = (date: Date) => {
    return selectedDate?.getDate() === date.getDate() &&
      selectedDate?.getMonth() === date.getMonth() &&
      selectedDate?.getFullYear() === date.getFullYear();
  };

  const days = getDaysInMonth(currentDate);
  const spotlightEvents = events.filter(event => event.category === selectedCategory);

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold mb-1">Select travel dates</h3>
        <p className="text-sm text-gray-500">Add your travel dates for exact pricing</p>
      </div>

      <div className="p-4">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-medium">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h2>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => navigateMonth('prev')}
              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={() => navigateMonth('next')}
              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div>
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 mb-1">
            {WEEKDAYS.map(day => (
              <div key={day} className="text-center text-xs font-medium text-gray-500">
                {day.charAt(0)}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => (
              <button
                key={index}
                onClick={() => handleDateClick(day.date)}
                className={`
                  relative aspect-square flex items-center justify-center text-xs
                  ${day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}
                  ${isToday(day.date) ? 'bg-gray-50 font-medium' : ''}
                  ${isSelected(day.date) ? 'bg-[#febd2d] text-white font-medium' : 
                    day.hasTour ? 'bg-yellow-50 hover:bg-yellow-100' : 'hover:bg-gray-50'}
                  rounded-full transition-colors
                `}
              >
                <span>{day.date.getDate()}</span>
                {day.hasTour && !isSelected(day.date) && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#febd2d] rounded-full" />
                )}
                {day.hasTour && !isSelected(day.date) && (
                  <span className="absolute -top-2 right-0 w-2 h-2 bg-green-500 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {selectedDate && (
        <div className="p-4 border-t border-gray-200">
          <div className="text-sm">
            <div className="font-medium">Selected date:</div>
            <div className="text-gray-500">
              {selectedDate.toLocaleDateString('default', { 
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
            {days.find(day => 
              day.date.getDate() === selectedDate.getDate() &&
              day.date.getMonth() === selectedDate.getMonth() &&
              day.date.getFullYear() === selectedDate.getFullYear()
            )?.hasTour && (
              <div className="mt-2 text-green-600 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Tours available on this date</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelCalendar; 