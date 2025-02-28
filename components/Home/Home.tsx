import React from 'react'
import Hero from './Hero/Hero'
import Destination from './Destination/Destination'
import Tour from './Tour/Tour'

const Home = () => {
  return (
    <div className='overflow-hidden w-full'>
      <Hero />
      <Destination />
      <Tour listingData={[]}/>
    </div>
  )
}

export default Home