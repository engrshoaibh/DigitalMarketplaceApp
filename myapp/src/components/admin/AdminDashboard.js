import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiAddCircleLine, RiShoppingCartLine } from 'react-icons/ri'; // Importing icons from react-icons library
import { useUser } from '../context/UserContext';

function AdminDashboard() {
  const {userData} = useUser()
  const navigate = useNavigate()

  return (
    userData?(
      <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl font-bold mb-8">Admin Dashboard</h2>
      <div className="flex flex-col sm:flex-row sm:space-x-4">
        <Link to="/admin/showProducts">
          <button className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded flex items-center justify-center sm:flex-row sm:justify-start sm:space-x-2 w-full my-5">
            <RiAddCircleLine className="mr-2" /> {/* Add icon */}
            <span className="sm:inline-block">Product List</span>
          </button>
        </Link>
        <Link to="/admin/showUsers">
          <button className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded flex items-center justify-center sm:flex-row sm:justify-start sm:space-x-2 w-full my-5">
            <RiShoppingCartLine className="mr-2" /> {/* Show Products icon */}
            <span className=" sm:inline-block">Manage User</span>
          </button>
        </Link>
        <Link to="/admin/addCategory">
          <button className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded flex items-center justify-center sm:flex-row sm:justify-start sm:space-x-2 w-full my-5">
            <RiAddCircleLine className="mr-2" /> {/* Show Products icon */}
            <span className="sm:inline-block">Manage Category</span>
          </button>
        </Link>
      </div>
    </div>
    ):(
      navigate('/')
    )
    
  );
}

export default AdminDashboard;