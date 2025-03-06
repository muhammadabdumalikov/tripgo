'use client';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import SearchBox from '@/components/common/SearchBox';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
  openNav: () => void;
};

const Nav = ({ }: Props) => {
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
      <div className='flex items-center h-full justify-between w-[90%] xl:w-[80%] mx-auto'>
        {/* LOGO */}
        <Link href="/" className='flex items-center space-x-3'>
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

        {/* SearchBox */}
        <div className='hidden md:flex flex-1 max-w-3xl mx-8'>
          <SearchBox variant={pathname === '/search' ? 'compact' : 'default'} />
        </div>

        {/* Download App Button */}
        <button className='hidden md:block px-8 py-3 text-black text-base bg-[#febd2d] hover:bg-[#e5a827] transition-colors rounded-full'>
          Download App
        </button>
      </div>
    </div>
  );
};

export default Nav;