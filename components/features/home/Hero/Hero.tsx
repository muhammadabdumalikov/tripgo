import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <div className='relative w-full h-[120vh] sm:h-[100vh]'>
      {/* overlay */}
      <div className='absolute top-0 left-0 w-full h-full bg-neutral-900 opacity-70'></div>
      <video src="/hero1.mp4" autoPlay muted loop preload='metadata' className='w-full h-full object-cover' />
      {/* <img alt="image" src="bg2.jpg" className="js-laz w-full h-full object-cover" /> */}

      {/* Text content */}
      <div className='absolute z-[100] w-full h-full top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
        <div className='flex items-center justify-center flex-col w-full h-full'>
          <div className='w-full flex flex-col items-center justify-center'>
            <h1 className='text-[25px] mb-4 md:mb-0 text-center md:text-[35px] lg:text-[45px] tracking-[0.7rem] 
              text-neutral-50 font-bold uppercase'>
              Lets Enjoy The Nature
            </h1>
            <p className='md:text-base text-center text-lg text-neutral-50 font-normal [word-spacing:5px]'>
              Get the best prices on 2.000.000+ properties, worldwide
            </p>

            <Link href='#' className='rounded-full px-4 md:px-6 mt-8 mb-8 py-2.5 overflow-hidden group bg-primary relative text-neutral-50'
            >
              <span className='absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-neutral-50 opacity-10
                rotate-12 group-hover:translate-x-40 ease'></span>
              <span className='relative font-semibold'>Get Started</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero