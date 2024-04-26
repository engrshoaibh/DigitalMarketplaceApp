import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4 flex flex-col justify-between h-full">
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="col-span-2 lg:col-span-1">
              <h2 className="text-lg font-semibold mb-4">About Us</h2>
              <p className="text-sm leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla felis libero, tincidunt a elit ac, eleifend molestie odio.</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
              <ul className="text-sm">
                <li className="mb-2"><a href="#" className="hover:text-white">Home</a></li>
                <li className="mb-2"><a href="#" className="hover:text-white">Shop</a></li>
                <li className="mb-2"><a href="#" className="hover:text-white">About</a></li>
                <li className="mb-2"><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
              <p className="text-sm leading-relaxed mb-2">123 Main Street</p>
              <p className="text-sm leading-relaxed">New York, NY 10001</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="text-white hover:text-gray-400"><FaFacebook /></a>
                <a href="#" className="text-white hover:text-gray-400"><FaTwitter /></a>
                <a href="#" className="text-white hover:text-gray-400"><FaInstagram /></a>
                <a href="#" className="text-white hover:text-gray-400"><FaLinkedin /></a>
              </div>
              <div>
                <p className="text-sm">Follow us on social media for updates and promotions.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-center">
          <p>&copy; 2024 Your Ecommerce. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
