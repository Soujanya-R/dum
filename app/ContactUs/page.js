import React from 'react'

const page = () => {
  return (
    <div className='pt-8 rounded-lg shadow-2xl  '>
      <div className="p-8 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center">Contact Us</h2>
        <form className="mt-4 space-y-4">
          <input type="text" placeholder="Your Name" className="w-full border p-2 rounded" required />
          <input type="email" placeholder="Your Email" className="w-full border p-2 rounded" required />
          <textarea placeholder="Your Message" className="w-full border p-2 rounded h-32" required></textarea>
          <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded">Send Message</button>
        </form>
      </div>
        <footer className="mt-8 text-center text-gray-600">
        <p>&copy; 2024 Flight Booking System. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default page
