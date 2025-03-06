import Link from 'next/link'
import React from 'react'
import MobileSearchBox from './MobileSearchBox'

const Hero = () => {
  return (
    <div className='relative w-full h-[120vh] sm:h-[100vh]'>
      {/* overlay */}
      <div className='absolute top-0 left-0 w-full h-full bg-black opacity-60'></div>
      <video src="/hero1.mp4" autoPlay muted loop preload='metadata' className='w-full h-full object-cover' />
      {/* <img alt="image" src="bg2.jpg" className="js-laz w-full h-full object-cover" /> */}

      {/* Text content */}
      <div className='absolute z-[100] w-full h-full top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
        <div className='flex items-center justify-center flex-col w-full h-full'>
          <div className='w-full flex flex-col items-center justify-center px-6'>
            <h1 className='text-[28px] mb-4 md:mb-0 text-center md:text-[38px] lg:text-[48px] tracking-[0.8rem] 
              text-[#febd2d] font-bold uppercase'>
              Lets Enjoy The Nature
            </h1>
            <p className='md:text-base text-center text-lg text-white/90 font-normal [word-spacing:5px] mb-8'>
              Get the best prices on 2.000.000+ properties, worldwide
            </p>

            {/* Search Box for Mobile */}
            <div className='w-full block md:hidden mb-8'>
              <MobileSearchBox />
            </div>

            {/* Get Started Button (hidden on mobile) */}
            <Link href='#' className='hidden md:inline-block rounded-full px-8 md:px-10 py-3 overflow-hidden group bg-[#febd2d] hover:bg-[#e5a827] relative text-black transition-colors duration-300'
            >
              <span className='absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10
                rotate-12 group-hover:translate-x-40 ease'></span>
              <span className='relative font-semibold text-[15px]'>Get Started</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero