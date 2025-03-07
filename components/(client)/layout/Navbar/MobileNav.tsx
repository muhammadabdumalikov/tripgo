import Link from 'next/link'
import React from 'react'
import { X } from 'lucide-react'

type Props = {
  showNav: boolean;
  closeNav: () => void;
}

const MobileNav = ({ closeNav, showNav }: Props) => {
  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen bg-black/20 backdrop-blur-sm md:hidden ${
        showNav ? '' : 'hidden'
      }`}
    >
      <div className="absolute right-0 top-0 h-screen w-56 bg-white">
        <div className="flex flex-col gap-6 px-6 py-8">
          <button onClick={closeNav} className="self-end">
            <X className="h-6 w-6" />
          </button>

          <div className="flex flex-col gap-4">
            <Link href="/" className="text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link href="/search" className="text-gray-700 hover:text-gray-900">
              Tours
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-gray-900">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-gray-900">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileNav