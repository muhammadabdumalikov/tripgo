'use client';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SearchBox from '@/components/shared/ui/SearchBox';

type Props = {
  openNav: () => void;
};

const Nav = ({ openNav }: Props) => {
  const [navBg, setNavBg] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handler = () => {
      if (window.scrollY >= 90) setNavBg(true);
      if (window.scrollY < 90) setNavBg(false);
    };

    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <div className={`${isHomePage
        ? navBg ? 'bg-white shadow-md' : 'bg-transparent'
        : 'bg-white'
      } transition-all duration-200 h-[12vh] z-[1000] fixed w-full`}>
      <div className='flex items-center h-full w-[90%] xl:w-[80%] mx-auto'>
        {/* LOGO */}
        <Link href="/" className='flex items-center space-x-3 flex-shrink-0'>
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-col ${isHomePage ? 'bg-white' : 'bg-transparent'}`}>
            <Image 
              src="/images/Logo.svg" 
              alt="Tripgo Logo"
              width={80}
              height={80}
              priority
            />
          </div>
          <h1 className={`text-2xl md:text-3xl ${isHomePage
              ? navBg ? 'text-black' : 'text-white'
              : 'text-black'
            } font-bold`}>Tripgo</h1>
        </Link>

        {/* SearchBox - Centered and Stretched */}
        <div className='hidden md:flex justify-center px-8 flex-1'>
          <div className='w-full max-w-3xl'>
            <SearchBox variant={pathname === '/search' ? 'compact' : 'default'} />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={openNav}
          className="md:hidden text-gray-500 hover:text-gray-700 flex-shrink-0"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Nav;