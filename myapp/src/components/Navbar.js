import React, { useState, useEffect, useContext } from 'react';
import Logo from '../assets/logo.jpg'; // Assuming Logo component is defined elsewhere
import { Link } from 'react-router-dom';
import { useUser } from './context/UserContext';
import Logout from './Logout'; // Assuming you have a Logout component

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userData } = useUser();

  const renderProfileIcon = () => {
    if (userData && userData.email) {
      const { email } = userData;
      const firstLetter = email.charAt(0).toUpperCase();
      return (
        <div className="relative">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-black-300 text-white-700">
            {firstLetter}
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white shadow-md py-2 px-4 rounded-lg mt-2">
            {email}
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <nav className="bg-gray-800 p-4 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center lg:hidden">
          <button
            className="text-white ml-4"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex items-center justify-center lg:hidden"> {/* Centering the logo */}
          <img src={Logo} className="h-8" /> {/* Assuming Logo component displays the website logo */}
        </div>

        <div className="hidden lg:flex items-center">
          <img src={Logo} className="h-10  mr-4" /> {/* Assuming Logo component displays the website logo */}
          <Link to={'/'} className="text-white mr-4">
            Home
          </Link>
          <Link to={'/products'} className="text-white mr-4">
            Products
          </Link>
          <Link to={'/privacy-policy'} className="text-white mr-4">
            Privacy Policy
          </Link>
          <Link to={'/about-us'} className="text-white mr-4">
            About
          </Link>
          {renderProfileIcon()}
        </div>
        <div className="hidden lg:flex items-center relative">
          {userData ? <Logout /> : (
            <>
              <Link to={'/login'} className="text-white mr-4">
                Login
              </Link>
              <Link to={'/signup'} className="text-white mr-4">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
      {/* Responsive Dropdown Menu */}
      {isOpen && (
        <div className="lg:hidden">
          <Link to={'/'} className="block py-2 px-4 text-white">
            Home
          </Link>
          <Link to={'/products'} className="block py-2 px-4 text-white">
            Products
          </Link>
          <Link to={'/about-us'} className="block py-2 px-4 text-white">
            About
          </Link>
          {userData ? <Logout /> : (
            <>
              <Link to={'/login'} className="text-white mr-4">
                Login
              </Link>
              <Link to={'/signup'} className="text-white mr-4">
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
