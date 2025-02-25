import React from 'react';
import Image from 'next/image';
const About = () => {
  return (
    <div className='pt-1 rounded-full pb-0 shadow-lg bg-white'>
      {/* About Section */}
      <div>
      <section className="py-16  shadow-lg px-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-6">About Us</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Welcome to Flight Booking! We are a passionate team of travel enthusiasts dedicated to making your journey easier and more enjoyable. Our platform aims to offer the most comprehensive and user-friendly experience when it comes to booking flights, discovering new destinations, and managing your travel plans.
          </p>
          <div className="flex justify-center items-center space-x-5">
            <Image
              src="/flight4.webp"
              width={160}
                height={160}    
              alt="Team Image"
              className="rounded-full shadow-lg w-40 h-40 object-cover"
            />
            <div className="max-w-lg">
              <p className="text-md mb-4">
                Our mission is to provide you with the best possible travel options at the best prices. With a simple interface, seamless booking process, and personalized recommendations, we ensure that your travel experience starts with ease and comfort.
              </p>
              <p className="text-md mb-4">
                Whether you're traveling for business, leisure, or adventure, we have the perfect flight options for you. Our commitment to providing high-quality service is what drives us every day, ensuring that you get the best deals and the most up-to-date information.
              </p>
              <p className="text-md mb-4">
                Our team consists of travel experts, engineers, and customer service professionals working together to deliver an exceptional experience. We continually innovate and improve our services, keeping your convenience and satisfaction as our top priority.
              </p>
              <p className="text-md mb-8">
                We are always here to help you make your next journey a smooth and enjoyable one. Join us, and let's explore the world together!
              </p>
            </div>
          </div>
        </div>
      </section>
      </div>
      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-12">
  <div className="max-w-7xl mx-auto text-center">
    <p className="text-2xl mb-4">Stay connected with us:</p>
    <div className="flex justify-center items-center space-x-8 mb-4">
      <a href="https://www.facebook.com" className="hover:text-blue-500">
        <i className="fab fa-facebook fa-2x"></i> Facebook
      </a>
      <a href="https://twitter.com" className="hover:text-blue-500">
        <i className="fab fa-twitter fa-2x"></i> Twitter
      </a>
      <a href="https://www.instagram.com" className="hover:text-pink-500">
        <i className="fab fa-instagram fa-2x"></i> Instagram
      </a>
      <a href="https://www.linkedin.com" className="hover:text-blue-700">
        <i className="fab fa-linkedin fa-2x"></i> LinkedIn
      </a>
    </div>
    <p className="text-md mb-2">Contact Us: support@flightbooking.com</p>
    <p className="text-sm">© 2025 Flight Booking. All Rights Reserved.</p>
  </div>
</footer>

    </div>
  );
};

export default About;
