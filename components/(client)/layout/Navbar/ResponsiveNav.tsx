'use client';
import React, { useState } from 'react'
import Nav from './Nav'
import MobileNav from './MobileNav'

const ResponsiveNav = () => {
  const [showNav, setShowNav] = useState(false);
  const handShowNav = () => setShowNav(true);
  const handCloseShowNav = () => setShowNav(false);

  return (
    <div>
      <Nav openNav={handShowNav} />
      <MobileNav closeNav={handCloseShowNav} showNav={showNav} />
    </div>
  )
}

export default ResponsiveNav