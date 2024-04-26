import React, { useState, useEffect } from 'react';
import { UpdateUserStatus, FetchAllUsers } from '../../api';
import { BsSearch } from "react-icons/bs";

function AdminSellerList() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state to handle data fetching state
  const [error, setError] = useState(null); // Add error state to handle errors during fetching

  useEffect(() => {
    fetchData()
  });
  

  const fetchData = async () => {
    try {
      const userData = await FetchAllUsers();
      setUsers(userData);
      setFilteredUsers(userData);
      console.log(`bro this is user data list`,userData)
      setLoading(false); // Update loading state after successful fetching
    } catch (error) {
      console.error('Error fetching users:', error);
      setError(error); // Set error state if there's an error during fetching
      setLoading(false); // Update loading state even if there's an error
    }
  };
  fetchData()
  const handleApprove = async (seller) => {
    console.log(`Seller ${seller.id} approved`);
    const updated = await UpdateUserStatus({ ...seller, status: "approved" });
    window.location.reload(true);
  };
  const handleReject = async (seller) => {
    console.log(`Seller ${seller.id} rejected`);
    const updated = await UpdateUserStatus({ ...seller, status: "pending" });
    window.location.reload(true);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = users.filter((user) =>
      user.email.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1); // Reset pagination to first page when searching
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers?.slice(indexOfFirstItem, indexOfLastItem);

  if (loading) {
    return <div>Loading...</div>; // Render a loading indicator while fetching data
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Render an error message if there's an error during fetching
  }

  return (
    <div className="p-6">
      {/* Search Input */}
      <div className="relative flex-grow mb-4 sm:mb-0">
        <input
          type="text"
          placeholder="Search by email..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-2 pl-10 border border-gray-300 rounded-md transition-all duration-300 focus:border-blue-500 focus:outline-none"
        />
        <div className="absolute left-3 top-3 text-gray-400 pointer-events-none">
          <BsSearch className="h-5 w-5" />
        </div>
      </div>

      {/* Display Users in Table */}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Password</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentItems?.map((seller) => (
            <tr key={seller.id}>
              <td className="px-6 py-4 whitespace-nowrap">{seller.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{seller.password}</td>
              <td className="px-6 py-4 whitespace-nowrap">{seller.userType}</td>
              <td className="px-6 py-4 whitespace-nowrap">{seller.userStatus}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button onClick={() => handleApprove(seller)} className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg mr-2 hover:bg-green-600">
                  Approve
                </button>
                <button onClick={() => handleReject(seller)} className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600">
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex items-center justify-center mt-4">
        {Array.from({ length: Math.ceil(filteredUsers?.length / itemsPerPage) })?.map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)} className={`mr-2 p-2 rounded-lg ${currentPage === index + 1 ? 'bg-gray-300' : 'bg-gray-200'}`}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default AdminSellerList;