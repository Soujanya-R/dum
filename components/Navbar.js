import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
const Navbar = () => {
  return (
    <div>
      <nav className="flex justify-between p-4 bg-blue-500 text-white">
        <span className='flex '>
        <Link href="/" className="text-lg font-bold">Flight Booking
          {/* <Image alt='' src='/airplane.gif' width={100} height={100} /> */}
        </Link>
        </span>
        <div>
          <Link href="/flights" className="px-4">Flights</Link>
          <Link href="/About" className="px-4">About</Link>
          <Link href="/ContactUs" className="px-4">Contact US</Link>
          <Link href="/register" className="px-4">Register</Link>
          <Link href="/login" className="px-4">Login</Link>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
