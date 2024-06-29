import React, { useState } from 'react';
import { UpdateProductStatus } from '../../api';
import { BsSearch } from "react-icons/bs";

function ProductRow({ product }) {
  const handleApprove = async () => {
    await UpdateProductStatus({ ...product, status: "approved" });
    window.location.reload(true);
  };

  const handleReject = async () => {
    await UpdateProductStatus({ ...product, status: "pending" });
    window.location.reload(true);
  };

  return (
    <tr>
      <td className="border px-4 py-2">
        <img src={product.imageFile} alt={product.proName} className="w-16 h-16 object-cover rounded-lg" />
      </td>
      <td className="border px-4 py-2">{product.proName}</td>
      <td className="border px-4 py-2">${product.proPrice}</td>
      <td className="border px-4 py-2">{product.proDesc.slice(0, 40)}{product.proDesc.length > 40 ? '...' : ''}</td>
      <td className="border px-4 py-2">
        <div className={`text-sm font-bold px-2 py-1 rounded ${product.proStatus === 'approved' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
          {product.proStatus === 'approved' ? 'Approved' : 'Pending'}
        </div>
      </td>
      <td className="border px-4 py-2">
        <button onClick={handleApprove} className="bg-green-500 text-white font-bold py-1 px-3 rounded-lg mr-2 hover:bg-green-600">
          Approve
        </button>
        <button onClick={handleReject} className="bg-red-500 text-white font-bold py-1 px-3 rounded-lg hover:bg-red-600">
          Reject
        </button>
      </td>
    </tr>
  );
}

function AdminProductList({ allProducts }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Filter products based on search query
  const filteredProducts = allProducts.filter(product =>
    product.proName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Handle search input change
  const handleSearchChange = e => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset pagination to first page when searching
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="overflow-x-auto px-10 flex-grow">
        <div className="relative flex-grow mb-4 sm:mb-0 mt-6">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by product name..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full p-2 pl-10 border border-gray-300 rounded-md transition-all duration-300 focus:border-blue-500 focus:outline-none"
          />
          <div className="absolute left-3 top-3 text-gray-400 pointer-events-none">
            <BsSearch className="h-5 w-5" />
          </div>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map(product => (
              <ProductRow key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center mt-4 mb-4">
        {Array.from({ length: Math.ceil(filteredProducts.length / itemsPerPage) }).map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)} className={`mr-2 p-2 rounded-lg ${currentPage === index + 1 ? 'bg-gray-300' : 'bg-gray-200'}`}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default AdminProductList;
