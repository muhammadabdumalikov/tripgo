'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
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
  Loader2
} from 'lucide-react';
import { api } from '@/utils/api';

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
  price: number;
  sale_price: number;
  start_date: string;
  end_date: string;
  status: number;
  images: string[];
  route: {
    day?: string;
    title: string;
    description: string;
  }[];
  included: string[];
  excluded: string[];
}

export default function CreateTourPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<TourForm>({
    title: {
      en: 'test',
      ru: 'test',
      uz: 'test'
    },
    description: {
      en: 'test',
      ru: 'test',
      uz: 'test'
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
    route: [{ day: 'Day 1', title: 'test', description: 'test' }],
    included: ['Professional guide', 'Transportation'],
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
  const addRouteDay = () => {
    setFormData(prev => ({
      ...prev,
      route: [
        ...prev.route,
        {
          day: `Day ${prev.route.length + 1}`,
          title: '',
          description: ''
        }
      ]
    }));
  };

  const updateRoute = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      route: prev.route.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const removeRouteItem = (indexToRemove: number) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.route.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await api.post('/admin/tour/create', formData);
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to create tour');
      }

      console.log('Tour created successfully:', response.data);
      router.push('/dashboard/tours');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while creating the tour');
      console.error('Error creating tour:', err);
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
        
        <form onSubmit={handleSubmit} className="space-y-6">
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
                  step="0.01"
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
                  name="price"
                  value={formData.sale_price}
                  onChange={handleChange}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#febd2d] focus:border-[#febd2d]"
                  required
                  min="0"
                  step="0.01"
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
                  name="startDate"
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
                  name="endDate"
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

          {/* Route */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Route
            </label>
            <div className="space-y-4">
              {formData.route.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-sm font-medium text-gray-900">Activity {index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeRouteItem(index)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      title="Remove Activity"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => updateRoute(index, 'title', e.target.value)}
                        placeholder="Activity title"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#febd2d] focus:border-[#febd2d]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Description
                      </label>
                      <textarea
                        value={item.description}
                        onChange={(e) => updateRoute(index, 'description', e.target.value)}
                        placeholder="Activity description"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#febd2d] focus:border-[#febd2d]"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addRouteDay}
                className="text-[#febd2d] hover:text-[#ffc94d] text-sm font-medium"
              >
                + Add Activity
              </button>
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