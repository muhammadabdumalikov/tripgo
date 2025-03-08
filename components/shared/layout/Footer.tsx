'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Youtube, MapPin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Subscribe:', email);
    setEmail('');
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-3 space-y-4">
            <div className="inline-flex bg-white rounded-xl p-2">
              <Image
                src="/images/logo.svg"
                alt="TripGo Logo"
                width={40}
                height={40}
                className="h-8 w-auto"
              />
            </div>
            <p className="text-sm leading-relaxed">
              Discover extraordinary destinations and create unforgettable memories with TripGo. 
              Your journey begins here.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['About Us', 'Services', 'Booking', 'Blog', 'Contact Us'].map((item) => (
                <li key={item}>
                  <Link 
                    href="#" 
                    className="text-sm hover:text-white transition-colors inline-block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-sm">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>123 Travel Street, Tourism City, TC 12345</span>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>+1 234 567 8900</span>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span>contact@tripgo.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold mb-4">Newsletter</h3>
            <p className="text-sm mb-4">
              Subscribe to our newsletter and get exclusive offers on our tours.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-[#febd2d] transition-colors"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#febd2d] text-gray-900 font-medium px-4 py-2 rounded-lg hover:bg-[#ffc94d] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Tour Organizers Section */}
          <div className="lg:col-span-2 lg:border-l lg:border-gray-800 lg:pl-8">
            <h3 className="text-white font-semibold mb-4">For Tour Organizers</h3>
            <div className="space-y-3">
              <p className="text-sm text-gray-400">
                Are you a tour operator? Join our platform and start growing your business today.
              </p>
              <Link 
                href="/register" 
                className="text-sm bg-[#febd2d] text-gray-900 px-6 py-2.5 rounded-lg hover:bg-[#ffc94d] transition-colors inline-flex items-center justify-center font-medium w-full md:w-auto"
              >
                Become Organizer
              </Link>
              <ul className="text-xs text-gray-400 space-y-1 mt-2">
                <li className="flex items-center">
                  <span className="w-1 h-1 bg-[#febd2d] rounded-full mr-2" />
                  Manage your tours easily
                </li>
                <li className="flex items-center">
                  <span className="w-1 h-1 bg-[#febd2d] rounded-full mr-2" />
                  Access to booking analytics
                </li>
                <li className="flex items-center">
                  <span className="w-1 h-1 bg-[#febd2d] rounded-full mr-2" />
                  Direct communication with travelers
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile App Section - Now between main content and bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="md:w-1/2 space-y-4">
              <h2 className="text-xl font-semibold text-white">Download TripGo App</h2>
              <p className="text-gray-400 text-sm max-w-md">
                Book tours, manage trips, and discover new destinations on the go.
              </p>
              <div className="flex flex-row gap-3">
                <Link href="#" className="transition-transform hover:scale-105">
                  <Image
                    src="/images/appstore.png"
                    alt="Download on App Store"
                    width={100}
                    height={32}
                    className="h-[32px] w-auto"
                  />
                </Link>
                <Link href="#" className="transition-transform hover:scale-105">
                  <Image
                    src="/images/playmarket.png"
                    alt="Get it on Google Play"
                    width={100}
                    height={32}
                    className="h-[32px] w-auto"
                  />
                </Link>
              </div>
            </div>
            <div className="md:w-auto flex justify-center md:justify-end">
              <div className="relative w-[160px] h-[320px] transform rotate-[-5deg] hover:rotate-0 transition-transform duration-300">
                <Image
                  src="/images/iphone-16.png"
                  alt="TripGo Mobile App"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm">
              © {new Date().getFullYear()} TripGo. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <Link href="#" className="text-sm hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 