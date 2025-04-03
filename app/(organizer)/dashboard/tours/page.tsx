'use client';

import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/utils/api';
import { TourListFilters, TourListResponse, Tour } from '@/types/tour';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2, MapPin, Clock, Users, Star, Plus, Pencil, Copy, Trash2 } from 'lucide-react';
import { TourFilters } from './components/TourFilters';
import Link from 'next/link';
import Image from 'next/image';
import { getProxiedImageUrl } from '@/utils/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ToursPage() {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState<TourListFilters>({
    limit: 10,
    offset: 0,
    search: undefined,
    status: [],
    from_date: undefined,
    to_date: undefined,
    location: 0,
    from_price: 0,
    to_price: 0,
  });
  const [openDeleteDialog, setOpenDeleteDialog] = useState<string | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ['tours', filters],
    queryFn: async () => {
      const response = await api.post<TourListResponse>('/tour/list', filters);
      if (!response.success) {
        throw new Error(response.error || 'Failed to fetch tours');
      }
      return response.data;
    },
  });
  
  const handleFilterChange = (key: keyof TourListFilters, value: string | number | undefined) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      offset: 0, // Reset pagination when filters change
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      ...filters,
      search: undefined,
      status: [],
      from_date: undefined,
      to_date: undefined,
      from_price: 0,
      to_price: 0,
      offset: 0,
    });
  };

  const handlePageChange = (newOffset: number) => {
    setFilters(prev => ({
      ...prev,
      offset: newOffset,
    }));
  };

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(Number(price));
  };

  const handleDeleteTour = async (tourId: string) => {
    try {
      const response = await api.post('/admin/tour/delete', { id: tourId });
      if (response.success) {
        setOpenDeleteDialog(null); // Close dialog on success
        await queryClient.invalidateQueries({ queryKey: ['tours'] });
      } else {
        throw new Error(response.error || 'Failed to delete tour');
      }
    } catch (error) {
      console.error('Failed to delete tour:', error);
      // You might want to show an error toast here
    }
  };

  if (error) {
    return (
      <div className="p-4">
        <p className="text-red-500">Error: {error instanceof Error ? error.message : 'Failed to load tours'}</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tours</h1>
        <Link href="/dashboard/tours/create">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Tour
          </Button>
        </Link>
      </div>

      <TourFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.data.map((tour: Tour) => (
              <Card key={tour.id} className="p-4 hover:shadow-lg transition-shadow flex flex-col">
                <div className="relative">
                  {tour.files?.length > 0 && tour.files[0] && (
                    <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={getProxiedImageUrl(tour.files[0].url)}
                        alt={tour.title as unknown as string}
                        fill
                        className="object-cover"
                      />
                      {tour.sale_price && (
                        <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                          Sale
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-lg">{tour.title.uz}</h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">{tour.description.uz}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>Location ID: {tour.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{tour.duration}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{tour.seats} seats</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Star className="w-4 h-4 mr-2 text-yellow-400" />
                    <span>{tour.rating} ({tour.review_count} reviews)</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-lg">{formatPrice(tour.price)}</div>
                    {tour.sale_price && (
                      <div className="text-sm text-green-600">{formatPrice(tour.sale_price)}</div>
                    )}
                  </div>
                  <div className="text-sm">
                    <span className={`px-2 py-1 rounded-full ${
                      tour.status === 1 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {tour.status === 1 ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>

                <div className="mt-2 text-sm text-gray-500">
                  <p>By {tour.organizer_title}</p>
                  <p>{new Date(tour.start_date).toLocaleDateString()} - {new Date(tour.end_date).toLocaleDateString()}</p>
                </div>

                <div className="mt-auto pt-4 flex gap-2">
                  <Link 
                    href={`/dashboard/tours/edit/${tour.id}`}
                    className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                    <span>Edit Tour</span>
                  </Link>
                  <Link 
                    href={`/dashboard/tours/create?copyFrom=${tour.id}`}
                    className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                    <span>Copy Tour</span>
                  </Link>
                  <Dialog open={openDeleteDialog === tour.id} onOpenChange={(open) => setOpenDeleteDialog(open ? tour.id : null)}>
                    <DialogTrigger asChild>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="px-4"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently delete the tour
                          &ldquo;{tour.title.uz}&rdquo; and remove all associated data.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setOpenDeleteDialog(null)}>Cancel</Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleDeleteTour(tour.id)}
                        >
                          Delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </Card>
            ))}
          </div>

          <div className="flex justify-between items-center mt-4">
            <Button
              variant="outline"
              onClick={() => handlePageChange(filters.offset - filters.limit)}
              disabled={filters.offset === 0}
            >
              Previous
            </Button>
            <span className="text-sm text-gray-600">
              Page {Math.floor(filters.offset / filters.limit) + 1}
            </span>
            <Button
              variant="outline"
              onClick={() => handlePageChange(filters.offset + filters.limit)}
              disabled={!data?.data || data.data.length < filters.limit}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
} 