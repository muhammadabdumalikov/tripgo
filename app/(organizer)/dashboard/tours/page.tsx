'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Plus, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Search,
  Filter,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';

interface Tour {
  id: string;
  title: string;
  description: string;
  location: string;
  duration: string;
  groupSize: string;
  price: string;
  startDate: string;
  category: string;
  image: string;
  status: 'active' | 'draft' | 'completed';
}

// Mock data for development
const mockTours: Tour[] = [
  {
    id: '1',
    title: 'Mountain Trek Adventure',
    description: 'Experience the thrill of mountain climbing with experienced guides.',
    location: 'Swiss Alps',
    duration: '5',
    groupSize: '8',
    price: '1299',
    startDate: '2024-06-15',
    category: 'adventure',
    image: 'https://picsum.photos/seed/mountain/800/600',
    status: 'active'
  },
  {
    id: '2',
    title: 'Cultural Heritage Tour',
    description: 'Explore ancient temples and local traditions.',
    location: 'Kyoto, Japan',
    duration: '7',
    groupSize: '12',
    price: '1899',
    startDate: '2024-07-01',
    category: 'cultural',
    image: 'https://picsum.photos/seed/temple/800/600',
    status: 'draft'
  }
];

export default function ToursPage() {
  const [tours] = useState<Tour[]>(mockTours);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'active' | 'draft' | 'completed'>('all');

  const filteredTours = tours.filter(tour => {
    const matchesSearch = tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tour.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || tour.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const EmptyState = () => (
    <div className="text-center py-12">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <MapPin className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No Tours Yet</h3>
      <p className="text-gray-500 mb-6">Get started by creating your first tour package</p>
      <Link
        href="/dashboard/tours/create"
        className="inline-flex items-center px-4 py-2 bg-[#febd2d] text-white rounded-lg hover:bg-[#e5a827] transition-colors"
      >
        <Plus className="w-5 h-5 mr-2" />
        Create Tour
      </Link>
    </div>
  );

  const TourCard = ({ tour }: { tour: Tour }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-2 right-2">
          <span className={`
            px-2 py-1 rounded-full text-xs font-medium
            ${tour.status === 'active' ? 'bg-green-100 text-green-800' : ''}
            ${tour.status === 'draft' ? 'bg-gray-100 text-gray-800' : ''}
            ${tour.status === 'completed' ? 'bg-blue-100 text-blue-800' : ''}
          `}>
            {tour.status.charAt(0).toUpperCase() + tour.status.slice(1)}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{tour.title}</h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{tour.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-2" />
            {tour.location}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-2" />
            {tour.duration} days
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Users className="w-4 h-4 mr-2" />
            {tour.groupSize} people
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-2" />
            {new Date(tour.startDate).toLocaleDateString()}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            ${Number(tour.price).toLocaleString()}
          </span>
          <div className="flex space-x-2">
            <button
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              title="View Details"
            >
              <Eye className="w-5 h-5" />
            </button>
            <button
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              title="Edit Tour"
            >
              <Edit className="w-5 h-5" />
            </button>
            <button
              className="p-2 text-red-500 hover:text-red-700 transition-colors"
              title="Delete Tour"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Tours</h1>
        <Link
          href="/dashboard/tours/create"
          className="inline-flex items-center px-4 py-2 bg-[#febd2d] text-white rounded-lg hover:bg-[#e5a827] transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create Tour
        </Link>
      </div>

      {tours.length > 0 ? (
        <>
          <div className="flex gap-4 flex-col sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search tours..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#febd2d] focus:border-[#febd2d]"
              />
            </div>
            <div className="sm:w-48">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value as "all" | "active" | "draft" | "completed")}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#febd2d] focus:border-[#febd2d] appearance-none"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTours.map(tour => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>

          {filteredTours.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No tours found matching your criteria</p>
            </div>
          )}
        </>
      ) : (
        <EmptyState />
      )}
    </div>
  );
} 