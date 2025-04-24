'use client';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SearchBox from '@/components/shared/ui/SearchBox';

const Nav = () => {
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
        ? navBg ? 'bg-white shadow-sm' : 'bg-transparent'
        : 'bg-white shadow-sm'
      } transition-all duration-200 h-[12vh] z-[1000] fixed w-full`}>
      <div className='flex items-center h-full w-[90%] xl:w-[80%] mx-auto'>
        {/* LOGO */}
        <Link href="/" className='flex items-center space-x-3 flex-shrink-0'>
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-col ${isHomePage ? 'bg-white' : 'bg-transparent'}`}>
            <Image 
              src="/images/logo.svg" 
              alt="Trippo Logo"
              width={70}
              height={70}
              priority
            />
          </div>
          <h1 className={`text-2xl md:text-3xl ${isHomePage
              ? navBg ? 'text-black' : 'text-white'
              : 'text-black'
            } font-bold`}>Trippo</h1>
        </Link>

        {/* SearchBox - Centered and Stretched */}
        <div className='hidden md:flex justify-center px-8 flex-1'>
          <div className='w-full max-w-3xl'>
            <SearchBox variant={pathname === '/search' ? 'compact' : 'default'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;