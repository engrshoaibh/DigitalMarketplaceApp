import React, { useState } from 'react';
import Logo from '../assets/trolley.png'; // Assuming Logo component is defined elsewhere
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from './context/UserContext';

import { FiLogOut, FiUser } from 'react-icons/fi'; // Importing icons from react-icons

const Navbar = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const { userData, setUserData } = useUser();

  const renderProfileIcon = () => {
    if (userData && userData.email) {
      const { email } = userData;
      const firstLetter = email.charAt(0).toUpperCase();
      return (

        <div className="relative">
          <button
            onClick={() => setIsClick(!isClick)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-black-300 text-white-700 bg-white focus:outline-none"
          >
            {firstLetter}
          </button>
          {isClick &&
            (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                {userData.userType === "admin" ?
                  <Link
                    to="/admin/admin-dashboard"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    <FiUser className="inline-block w-4 h-4 mr-2" />
                    Dashboard
                  </Link>
                  : userData.userType === "seller" ? (

                    <Link to="/seller/seller-dashboard" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                      <FiUser className="inline-block w-4 h-4 mr-2" />
                      Sell
                    </Link>

                  ) : (
                    <div className='block px-4 py-2 text-gray-800 hover:bg-gray-200'>
                      {userData.email}
                    </div>
                  )

                }



                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  <FiLogOut className="inline-block w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            )}
        </div>
      );
    } else {
      return null;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.clear()
    setUserData('')
    navigate('/')
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
          <img src={Logo} alt='Logo' className="h-8" /> {/* Assuming Logo component displays the website logo */}
        </div>
        <div className='flex items-center lg:hidden'>
         
        {renderProfileIcon()}

        </div>

        <div className="hidden lg:flex items-center">
          <img src={Logo} className="h-10  mr-4" alt='Logo' /> {/* Assuming Logo component displays the website logo */}
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
        </div>
        <div className="hidden lg:flex items-center relative">
          {userData?.email ? renderProfileIcon() : (
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
          {userData?.email ? null : (
           
            <div className=' flex flex-col '>
            <Link to={'/login'} className="block py-2 px-4 text-white">
                Login
              </Link>
              <Link to={'/signup'} className="block py-2 px-4 text-white">
                Sign Up
              </Link>
            </div>
              
            
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
