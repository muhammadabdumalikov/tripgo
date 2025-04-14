'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  DollarSign, 
  Upload,
  X,
  Trash2,
  Globe,
  Loader2,
  Plus
} from 'lucide-react';
import { api } from '@/utils/api';
import { Button } from '@/components/ui/button';
import { Tour } from '@/types/tour';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type Language = 'en' | 'ru' | 'uz';

interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
}

const languages: LanguageOption[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺' },
  { code: 'uz', name: 'Uzbek', flag: '🇺🇿' }
];

interface RoutePoint {
  type: 'location' | 'destination' | 'transport';
  title: string;
  transport_type: string;
  duration: string;
  activities: string;
}

export interface Includes {
  title: string;
  included: boolean;
}

interface TourForm {
  title: {
    en: string;
    ru: string;
    uz: string;
  };
  description: {
    en: string;
    ru: string;
    uz: string;
  };
  location: number;
  duration: string;
  seats: number;
  price: number | string;
  sale_price: number | string;
  start_date: string;
  end_date: string;
  status: number;
  images: string[];
  route_json: RoutePoint[];
  includes: Array<{
    title: string;
    included: boolean;
  }>;
  excluded: string[];
}

export default function CreateTourPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const copyFromId = searchParams.get('copyFrom');

  const [formData, setFormData] = useState<TourForm>({
    title: {
      en: '',
      ru: '',
      uz: ''
    },
    description: {
      en: '',
      ru: '',
      uz: ''
    },
    location: 1,
    duration: '1 day',
    seats: 1,
    price: 100000,
    sale_price: 80000,
    start_date: '2025-01-01',
    end_date: '2025-01-01',
    status: 1,
    images: [],
    route_json: [{
      type: 'location',
      title: '',
      transport_type: '',
      duration: '',
      activities: ''
    }],
    includes: [
      { title: 'Professional guide', included: true },
      { title: 'Transportation', included: true },
      { title: 'Lunch', included: false },
      { title: 'Entrance fees', included: true },
    ],
    excluded: ['Personal expenses', 'Travel insurance']
  });

  const [dragActive, setDragActive] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState<Language>('en');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const status = [
    {name: 'Active', value: 1},
    {name: 'Inactive', value: 2},
    {name: 'Draft', value: 3},
    {name: 'Deleted', value: 4},
  ];

  useEffect(() => {
    const copyTourData = async () => {
      if (copyFromId) {
        try {
          const response = await api.post<Tour>('/tour/get-by-id', { id: copyFromId });
          if (response.success && response.data) {
            const tourData = response.data;
            const defaultIncludes = [
              { title: 'Professional guide', included: true },
              { title: 'Transportation', included: true },
            ];

            const included = tourData.included_json || [];
            const includes = included.map(item => ({
              title: typeof item === 'string' ? item : item.title || '',
              included: typeof item === 'string' ? true : Boolean(item.included),
            }));

            setFormData(prev => ({
              ...prev,
              title: tourData.title,
              description: tourData.description,
              location: Number(tourData.location),
              duration: tourData.duration,
              seats: Number(tourData.seats),
              price: tourData.price,
              sale_price: tourData.sale_price,
              start_date: tourData.start_date,
              end_date: tourData.end_date,
              status: tourData.status,
              images: tourData.files?.map(file => file.url) || [],
              route_json: tourData.route_json || [],
              includes: includes.length > 0 ? includes : defaultIncludes,
              excluded: tourData.excluded_json || [],
            }));
          }
        } catch (error) {
          console.error('Failed to copy tour data:', error);
        }
      }
    };

    copyTourData();
  }, [copyFromId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle multi-language fields
    if (name.includes('.')) {
      const [field, lang] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [field]: {
          ...prev[field as keyof Pick<TourForm, 'title' | 'description'>],
          [lang]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, reader.result as string]
          }));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    Array.from(files).forEach(file => {
      if (file.type.includes('image')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, reader.result as string]
          }));
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const addRoutePoint = () => {
    setFormData(prev => ({
      ...prev,
      route_json: [
        ...prev.route_json,
        {
          type: 'location',
          title: '',
          transport_type: '',
          duration: '',
          activities: ''
        }
      ]
    }));
  };

  const updateRoutePoint = (index: number, field: keyof RoutePoint, value: string) => {
    setFormData(prev => ({
      ...prev,
      route_json: prev.route_json.map((point, i) => 
        i === index ? { ...point, [field]: value } : point
      )
    }));
  };

  const removeRoutePoint = (indexToRemove: number) => {
    setFormData(prev => ({
      ...prev,
      route_json: prev.route_json.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleAddInclude = () => {
    setFormData(prev => ({
      ...prev,
      includes: [...prev.includes, { title: '', included: true }]
    }));
  };

  const handleRemoveInclude = (index: number) => {
    setFormData(prev => ({
      ...prev,
      includes: prev.includes.filter((_, i) => i !== index)
    }));
  };

  const handleIncludeChange = (index: number, field: keyof Includes, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      includes: prev.includes.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Transform includes data for API
      const included = formData.includes
        .filter(item => item.included)
        .map(item => item.title);
      
      const excluded = formData.includes
        .filter(item => !item.included)
        .map(item => item.title);

      const response = await api.post('/tour/create', {
        ...formData,
        included_json: included,
        excluded_json: excluded,
      });

      if (!response.success) {
        throw new Error(response.error || 'Failed to create tour');
      }

      router.push('/dashboard/tours');
    } catch (error) {
      console.error('Failed to create tour:', error);
      setError(error instanceof Error ? error.message : 'Failed to create tour');
    } finally {
      setIsSubmitting(false);
    }
  };

  const LanguageTabs = () => (
    <div className="flex space-x-1 mb-4 border-b">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setActiveLanguage(lang.code)}
          className={`
            px-4 py-2 rounded-t-lg flex items-center space-x-2 transition-colors
            ${activeLanguage === lang.code 
              ? 'bg-[#febd2d] text-gray-900 border-b-2 border-[#febd2d]' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }
          `}
        >
          <span>{lang.flag}</span>
          <span>{lang.name}</span>
        </button>
      ))}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Create New Tour</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8 p-4">
          {/* Basic Information */}
          <div className="space-y-4">
            {/* Title in multiple languages */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                  Tour Title
                </label>
                <div className="flex items-center text-sm text-gray-500">
                  <Globe className="w-4 h-4 mr-1" />
                  <span>Multi-language input</span>
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <LanguageTabs />
                <div className="p-4">
                  {languages.map((lang) => (
                    <div
                      key={lang.code}
                      className={activeLanguage === lang.code ? 'block' : 'hidden'}
                    >
                      <input
                        type="text"
                        name={`title.${lang.code}`}
                        value={formData.title[lang.code]}
                        onChange={handleChange}
                        placeholder={`Title in ${lang.name}`}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#febd2d] focus:border-[#febd2d]"
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Description in multiple languages */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <div className="flex items-center text-sm text-gray-500">
                  <Globe className="w-4 h-4 mr-1" />
                  <span>Multi-language input</span>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <LanguageTabs />
                <div className="p-4">
                  {languages.map((lang) => (
                    <div
                      key={lang.code}
                      className={activeLanguage === lang.code ? 'block' : 'hidden'}
                    >
                      <textarea
                        name={`description.${lang.code}`}
                        value={formData.description[lang.code]}
                        onChange={handleChange}
                        placeholder={`Description in ${lang.name}`}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#febd2d] focus:border-[#febd2d]"
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tour Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#febd2d] focus:border-[#febd2d]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration (days)
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#febd2d] focus:border-[#febd2d]"
                  required
                  min="1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Group Size
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="number"
                  name="group_size"
                  value={formData.seats}
                  onChange={handleChange}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#febd2d] focus:border-[#febd2d]"
                  required
                  min="1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#febd2d] focus:border-[#febd2d]"
                  required
                  min="0"
                  step="1000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sale Price
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="number"
                  name="sale_price"
                  value={formData.sale_price}
                  onChange={handleChange}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#febd2d] focus:border-[#febd2d]"
                  required
                  min="0"
                  step="1000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#febd2d] focus:border-[#febd2d]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#febd2d] focus:border-[#febd2d]"
                  required
                />
              </div>
            </div>
          </div>

          {/* Status Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#febd2d] focus:border-[#febd2d]"
              required
            >
              {status.map(status => (
                <option key={status.value} value={status.value}>
                  {status.name}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tour Images
            </label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center ${
                dragActive ? 'border-[#febd2d] bg-[#febd2d]/5' : 'border-gray-300'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                Drag and drop your images here, or{' '}
                <label className="text-[#febd2d] hover:text-[#ffc94d] cursor-pointer">
                  browse
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                  />
                </label>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG, GIF up to 10MB each
              </p>
            </div>

            {/* Image Preview */}
            {formData.images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={image}
                      alt={`Tour image ${index + 1}`}
                      width={200}
                      height={150}
                      className="rounded-lg object-cover w-full h-32"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Route Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Route Information</h2>
              <Button
                type="button"
                onClick={addRoutePoint}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Point
              </Button>
            </div>

            <div className="space-y-4">
              {formData.route_json.map((point, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Point {index + 1}</h3>
                    <Button
                      type="button"
                      onClick={() => removeRoutePoint(index)}
                      variant="ghost"
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Type
                      </label>
                      <select
                        value={point.type}
                        onChange={(e) => updateRoutePoint(index, 'type', e.target.value as 'location' | 'destination' | 'transport')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#febd2d] focus:border-[#febd2d]"
                      >
                        <option value="location">Location</option>
                        <option value="destination">Destination</option>
                        <option value="transport">Transport</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        value={point.title}
                        onChange={(e) => updateRoutePoint(index, 'title', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#febd2d] focus:border-[#febd2d]"
                        placeholder={point.type === 'transport' ? 'Transport name' : 'Location name'}
                      />
                    </div>

                    {point.type === 'transport' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Transport Type
                          </label>
                          <input
                            type="text"
                            value={point.transport_type}
                            onChange={(e) => updateRoutePoint(index, 'transport_type', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#febd2d] focus:border-[#febd2d]"
                            placeholder="e.g., Car, Bus, Train"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Duration
                          </label>
                          <input
                            type="text"
                            value={point.duration}
                            onChange={(e) => updateRoutePoint(index, 'duration', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#febd2d] focus:border-[#febd2d]"
                            placeholder="e.g., 2 hours"
                          />
                        </div>
                      </>
                    )}

                    {point.type === 'destination' && (
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Activities
                        </label>
                        <textarea
                          value={point.activities}
                          onChange={(e) => updateRoutePoint(index, 'activities', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#febd2d] focus:border-[#febd2d]"
                          rows={3}
                          placeholder="Describe the activities at this destination"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Route Preview Section */}
            {formData.route_json.length > 0 && (
              <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border">
                <h3 className="text-xl font-semibold mb-4">Route Preview</h3>
                <div className="relative pl-8 space-y-6">
                  {/* Vertical Line */}
                  <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-200" />

                  {formData.route_json.map((point, index) => (
                    <div key={index} className="relative">
                      <div className={`absolute left-[-33px] w-6 h-6 ${
                        point.type === 'location' 
                          ? 'bg-orange-500' 
                          : point.type === 'destination' 
                          ? 'bg-blue-600'
                          : 'bg-gray-100 border-2 border-gray-200'
                      } rounded-full flex items-center justify-center`}>
                        {point.type === 'location' || point.type === 'destination' ? (
                          <MapPin className="w-3 h-3 text-white" />
                        ) : (
                          <Users className="w-3 h-3 text-gray-400" />
                        )}
                      </div>
                      <h4 className="font-medium mb-1">
                        {point.type === 'location' 
                          ? (index === 0 ? 'Pickup location:' : 'Arrive back at:')
                          : point.type === 'destination'
                          ? point.title
                          : point.transport_type}
                      </h4>
                      <p className="text-gray-600">
                        {point.type === 'location' || point.type === 'destination' 
                          ? point.title
                          : `(${point.duration})`}
                        {point.type === 'destination' && point.activities && (
                          <span className="block text-sm text-gray-500 mt-1">
                            {point.activities}
                          </span>
                        )}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Reference Note */}
                <p className="text-xs text-gray-500 mt-6 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  For reference only. This is how the route will appear to clients.
                </p>
              </div>
            )}
          </div>

          {/* Includes & Excludes Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Includes & Excludes</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddInclude}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </div>
            
            <div className="space-y-4">
              {formData.includes.map((item, index) => (
                <div key={index} className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleIncludeChange(index, 'title', e.target.value)}
                      placeholder="Enter item title"
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`include-${index}`}>
                      {item.included ? 'Included' : 'Excluded'}
                    </Label>
                    <Switch
                      id={`include-${index}`}
                      checked={item.included}
                      onCheckedChange={(checked: boolean) => handleIncludeChange(index, 'included', checked)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveInclude(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-sm mt-2">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#febd2d] text-gray-900 rounded-lg hover:bg-[#ffc94d] flex items-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Tour'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 