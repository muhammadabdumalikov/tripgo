'use client';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { TbAirBalloon } from 'react-icons/tb';
import SearchBox from '@/components/Helper/SearchBox';
import Link from 'next/link';

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
    <div className={`${
      isHomePage 
        ? navBg ? 'bg-blue-950 shadow-md' : 'bg-transparent'
        : 'bg-blue-950'
    } transition-all duration-200 h-[12vh] z-[1000] fixed w-full`}>
      <div className='flex items-center h-full justify-between w-[90%] xl:w-[80%] mx-auto'>
        {/* LOGO */}
        <Link href="/" className='flex items-center space-x-2'>
          <div className='w-10 h-10 bg-[#ff8264] rounded-full flex items-center justify-center flex-col'>
            <TbAirBalloon className='w-6 h-6 text-white' />
          </div>
          <h1 className='text-xl md:text-2xl text-white uppercase font-bold'>Tripgo</h1>
        </Link>

        {/* SearchBox */}
        <div className='flex-1 max-w-3xl mx-8'>
          <SearchBox variant={pathname === '/search' ? 'compact' : 'default'} />
        </div>

        {/* Download App Button */}
        <button className='hidden md:block px-8 py-3 text-white text-base bg-blue-500 hover:bg-blue-600 transition-colors rounded-full'>
          Download App
        </button>
      </div>
    </div>
  );
};

export default Nav;