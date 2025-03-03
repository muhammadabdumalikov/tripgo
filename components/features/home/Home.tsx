'use client';
import React from 'react'
import Hero from './Hero/Hero'
import Destination from '../destination/Destination/Destination'
import Tour from '../tour/Tour/Tour'
import FeaturedDestinations from '../destination/FeaturedDestinations'

const Home = () => {
  return (
    <div className='overflow-hidden w-full'>
      <Hero />
      <FeaturedDestinations />
      <Destination />
      <Tour/>
    </div>
  )
}

export default Home