'use client';
import React from 'react'
import Hero from './Hero/Hero'
// import Destination from '../destination/Destination/Destination'
import Tour from '@/components/(client)/features/tour/Tour/Tour';
import Blogs from './Blogs/Blogs';
import Testimonials from './Testimonials/Testimonials';
import Stories from './Stories/Stories';

const Home = () => {
  return (
    <div className='overflow-hidden w-full'>
      <Hero />
      <Stories />
      {/* <Destination /> */}
      <Tour />
      <Testimonials />
      <Blogs />
    </div>
  )
}

export default Home