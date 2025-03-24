'use client';

import React, { useState, useRef } from 'react';
import { Globe, Loader2, Camera, Check, X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { api, API_BASE_URL } from '@/utils/api';
import Image from 'next/image';
import { getProxiedImageUrl } from '@/utils/image';

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

interface OrganizerProfile {
  id: string;
  status: number;
  is_deleted: boolean;
  created_at: string;
  title: {
    en: string;
    ru: string;
    uz: string;
  };
  description: null | {
    en: string;
    ru: string;
    uz: string;
  };
  phone: string;
  telegram_username: string;
  password: string;
  login: string;
  rating: number;
  files: Array<{
    url: string;
    name: string;
    type: string;
    size: number;
  }>;
}

const ProfilePage = () => {
  const [activeLanguage, setActiveLanguage] = useState<Language>('en');
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedLogo, setSelectedLogo] = useState<{ file: File; preview: string } | null>(null);

  const { data: organizerData, isLoading, error } = useQuery({
    queryKey: ['organizer'],
    queryFn: async () => {
      const response = await api.post<OrganizerProfile>('/admin/organizer/me', {}, true);
      if (!response.success) {
        throw new Error(response.error || 'Failed to fetch organizer data');
      }
      return response.data;
    },
  });

  const [profile, setProfile] = useState<OrganizerProfile | null>(null);

  // Update profile state when data is loaded
  React.useEffect(() => {
    if (organizerData) {
      setProfile(organizerData);
    }
  }, [organizerData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!profile) return;

    const { name, value } = e.target;

    // Handle multi-language fields
    if (name.includes('.')) {
      const [field, lang] = name.split('.');
      setProfile(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          [field]: {
            ...prev[field as keyof Pick<OrganizerProfile, 'title' | 'description'>],
            [lang]: value
          }
        };
      });
    } else {
      setProfile(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          [name]: value
        };
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    try {
      const response = await api.post('/admin/organizer/update', profile);
      if (!response.success) {
        throw new Error(response.error || 'Failed to update profile');
      }
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      // TODO: Show error message to user
    }
  };

  const handleLogoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create a local URL for the file
    const objectUrl = URL.createObjectURL(file);
    setSelectedLogo({
      file,
      preview: objectUrl
    });
  };

  // Cleanup object URL when component unmounts or when selectedLogo changes
  React.useEffect(() => {
    return () => {
      if (selectedLogo?.preview) {
        URL.revokeObjectURL(selectedLogo.preview);
      }
    };
  }, [selectedLogo]);

  const handleLogoUpload = async () => {
    if (!selectedLogo?.file || !profile) return;

    const formData = new FormData();
    formData.append('file', selectedLogo.file, selectedLogo.file.name);

    try {
      const response = await fetch(`${API_BASE_URL}/file-router/simple-upload`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();

      const { url, name, size } = data;

      // Update profile with new logo
      const newFiles = profile.files.filter(f => f.type !== 'logo').concat({
        url,
        name,
        type: 'logo',
        size,
      });

      setProfile(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          files: newFiles
        };
      });
      
      setSelectedLogo(null);
    } catch (err) {
      console.error('Error uploading logo:', err);
      // TODO: Show error message to user
    }
  };

  const LanguageTabs = () => (
    <div className="flex space-x-1 mb-4 border-b">
      {languages.map((lang) => (
        <button
          key={lang.code}
          type="button"
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="p-4">
        <p className="text-red-500">
          {error instanceof Error ? error.message : 'Failed to load organizer profile'}
        </p>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 group">
              <div className="rounded-full overflow-hidden border border-gray-200 w-full h-full relative">
                <Image
                  src={selectedLogo?.preview || getProxiedImageUrl(profile.files?.find(f => f.type === 'logo')?.url || '/placeholder.jpg')}
                  alt="Organization Logo"
                  fill
                  sizes="100px"
                  className="object-cover"
                  priority
                />
              </div>
              {isEditing && !selectedLogo && (
                <>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleLogoSelect}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Camera className="w-6 h-6 text-white" />
                  </button>
                </>
              )}
              {selectedLogo && (
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={handleLogoUpload}
                    className="p-1.5 bg-green-500 rounded-full text-white hover:bg-green-600 transition-colors"
                    title="Confirm new logo"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      URL.revokeObjectURL(selectedLogo.preview);
                      setSelectedLogo(null);
                    }}
                    className="p-1.5 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
                    title="Cancel"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
            <h1 className="text-2xl font-bold">Organizer Profile</h1>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsEditing(!isEditing);
              setSelectedLogo(null);
            }}
            className="px-4 py-2 bg-[#febd2d] text-gray-900 rounded-lg hover:bg-[#ffc94d]"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company Information */}
          <div className="space-y-6">
            {/* Company Name in multiple languages */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                  Company Name
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
                        value={profile.title[lang.code] || ''}
                        onChange={handleInputChange}
                        placeholder={`Company name in ${lang.name}`}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#febd2d] focus:border-[#febd2d]"
                        disabled={!isEditing}
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#febd2d] focus:border-[#febd2d]"
                  placeholder="Enter phone number"
                  disabled={!isEditing}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telegram Username
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">@https://t.me/</span>
                  <input
                    type="text"
                    name="telegram_username"
                    value={profile.telegram_username || ''}
                    onChange={handleInputChange}
                    className="w-full pl-[160px] pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#febd2d] focus:border-[#febd2d]"
                    placeholder="username"
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Login
                </label>
                <input
                  type="text"
                  name="login"
                  value={profile.login}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  disabled
                />
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
                        value={profile.description?.[lang.code] || ''}
                        onChange={handleInputChange}
                        placeholder={`Description in ${lang.name}`}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#febd2d] focus:border-[#febd2d]"
                        disabled={!isEditing}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          {isEditing && (
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-[#febd2d] text-gray-900 rounded-lg hover:bg-[#ffc94d]"
              >
                Save Changes
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProfilePage; 