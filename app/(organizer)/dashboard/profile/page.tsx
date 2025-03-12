'use client';

import React, { useState } from 'react';
import { Camera, Globe } from 'lucide-react';
import Image from 'next/image';

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
  companyName: {
    en: string;
    ru: string;
    uz: string;
  };
  description: {
    en: string;
    ru: string;
    uz: string;
  };
  email: string;
  phone: string;
  address: string;
  website: string;
  profileImage: string | null;
}

const ProfilePage = () => {
  const [activeLanguage, setActiveLanguage] = useState<Language>('en');
  const [profile, setProfile] = useState<OrganizerProfile>({
    companyName: {
      en: 'Adventure Tours & Travel Co.',
      ru: 'Adventure Tours & Travel Co.',
      uz: 'Adventure Tours & Travel Co.'
    },
    description: {
      en: 'We are a leading adventure tourism company specializing in unique outdoor experiences and cultural expeditions. With over 10 years of experience, we provide unforgettable journeys that combine adventure, safety, and comfort.',
      ru: 'We are a leading adventure tourism company specializing in unique outdoor experiences and cultural expeditions. With over 10 years of experience, we provide unforgettable journeys that combine adventure, safety, and comfort.',
      uz: 'We are a leading adventure tourism company specializing in unique outdoor experiences and cultural expeditions. With over 10 years of experience, we provide unforgettable journeys that combine adventure, safety, and comfort.'
    },
    email: 'contact@adventuretours.com',
    phone: '+1 (555) 123-4567',
    address: '123 Adventure Street, Tourism Valley, CA 94105',
    website: 'https://www.adventuretours.com',
    profileImage: '/images/reviewer.png',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Handle multi-language fields
    if (name.includes('.')) {
      const [field, lang] = name.split('.');
      setProfile(prev => ({
        ...prev,
        [field]: {
          ...prev[field as keyof Pick<OrganizerProfile, 'companyName' | 'description'>],
          [lang]: value
        }
      }));
    } else {
      setProfile(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({
          ...prev,
          profileImage: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement profile update logic
    console.log('Profile data:', profile);
    setIsEditing(false);
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

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Organizer Profile</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Image Upload */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100">
                {profile.profileImage ? (
                  <Image
                    src={profile.profileImage}
                    alt="Profile"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Camera className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>
              <label
                htmlFor="profileImage"
                className="absolute bottom-0 right-0 bg-[#febd2d] p-2 rounded-full cursor-pointer hover:bg-[#e5a827] transition-colors"
              >
                <Camera className="w-4 h-4 text-white" />
                <input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={!isEditing}
                />
              </label>
            </div>
          </div>

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
                        name={`companyName.${lang.code}`}
                        value={profile.companyName[lang.code]}
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
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#febd2d] focus:border-[#febd2d]"
                  placeholder="Enter email address"
                  disabled={!isEditing}
                  required
                />
              </div>

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
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  value={profile.website}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#febd2d] focus:border-[#febd2d]"
                  placeholder="Enter website URL"
                  disabled={!isEditing}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={profile.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#febd2d] focus:border-[#febd2d]"
                  placeholder="Enter company address"
                  disabled={!isEditing}
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
                        value={profile.description[lang.code]}
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

          <div className="flex justify-end space-x-4">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#febd2d] text-white rounded-lg hover:bg-[#e5a827] transition-colors"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-[#febd2d] text-white rounded-lg hover:bg-[#e5a827] transition-colors"
              >
                Edit Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage; 