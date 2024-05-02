import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiAddCircleLine, RiShoppingCartLine } from 'react-icons/ri'; // Importing icons from react-icons library
import { useUser } from '../context/UserContext';

function SellerDashboard() {
  const {userData} = useUser()
  const navigate = useNavigate()

  return (
    userData?(
      <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl font-bold mb-8">Seller Dashboard</h2>
      <div className="flex flex-col sm:flex-row sm:space-x-4">
        <Link to="/seller/add-product">
          <button className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded flex items-center justify-center sm:flex-row sm:justify-start sm:space-x-2 w-full my-5">
            <RiAddCircleLine className="mr-2" /> {/* Add icon */}
            <span className="hidden sm:inline-block">Add Product</span>
          </button>
        </Link>
        <Link to="/seller/showProducts">
          <button className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded flex items-center justify-center sm:flex-row sm:justify-start sm:space-x-2 w-full my-5">
            <RiShoppingCartLine className="mr-2" /> {/* Show Products icon */}
            <span className="hidden sm:inline-block">Show All Products</span>
          </button>
        </Link>
      </div>
    </div>
    ):(
      navigate('/')
    )
    
  );

   

}

export default SellerDashboard;