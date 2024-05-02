import React, { useState } from 'react';

import { BsChevronLeft, BsChevronRight, BsFilter, BsSearch } from "react-icons/bs";
import Footer from './Footer';
import ViewProduct from './ViewProduct'; // Import the ViewProduct component

function Products({ allProducts }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [filterOpen, setFilterOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const productsPerPage = 12; // Change this value based on your preference for products per page

    // Filter products based on search term and price range
    const filteredProducts = allProducts.filter(product =>
        product.proName?.toLowerCase().includes(searchTerm?.toLowerCase()) &&
        (!minPrice || product.proPrice >= parseFloat(minPrice)) &&
        (!maxPrice || product.proPrice <= parseFloat(maxPrice))
    );

    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Function to handle filter application
    const applyFilter = () => {
        setCurrentPage(1); // Reset current page to first page when filter is applied
        setFilterOpen(false); // Close filter module
    };

    // Function to handle click on product card
    const handleProductClick = (product) => {
        setSelectedProduct(product);
    };

    // Function to close the modal
    const closeModal = () => {
        setSelectedProduct(null);
    };

    return (
        <>
            <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
                    All Products
                </h2>
                <div className="flex items-center mb-6">
                    <div className="relative flex-grow mb-4 sm:mb-0">
                        <input
                            type="text"
                            placeholder="Search Products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-2 pl-10 border border-gray-300 rounded-md transition-all duration-300 focus:border-blue-500 focus:outline-none"
                        />
                        <div className="absolute left-3 top-3 text-gray-400 pointer-events-none">
                            <BsSearch className="h-5 w-5" />
                        </div>
                    </div>
                    <button
                        onClick={() => setFilterOpen(!filterOpen)}
                        className="ml-0 sm:ml-4 text-gray-600 hover:text-gray-800 flex items-center"
                    >
                        <BsFilter className="h-6 w-6 mr-1" />
                        Filter
                    </button>
                </div>
                {filterOpen && (
                    <div className="mb-6 flex flex-col sm:flex-row items-center">
                        <input
                            type="number"
                            placeholder="Min Price"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            className="mb-4 sm:mr-4 p-2 border border-gray-300 rounded-md"
                        />
                        <input
                            type="number"
                            placeholder="Max Price"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            className="mb-4 sm:mr-4 p-2 border border-gray-300 rounded-md"
                        />
                        <button
                            onClick={applyFilter}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Apply
                        </button>
                    </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                  
                    {currentProducts?.map((product) => {
                        if (product.proStatus === 'approved') {
                            return (
                                <div
                            key={product.id}
                            onClick={() => handleProductClick(product)}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover: cursor-pointer product-card"
                        >
                            <div className="p-6">
                                <div className="mb-4 ">
                                    <img
                                        src={product.imageFile} // Assuming product.image contains the URL of the image
                                        alt={product.name} // Alt text for accessibility
                                        className="w-50 h-50 rounded-lg"
                                    />
                                </div>
                                <h3 className="text-sm font-semibold mb-2">{product.proName}</h3>

                                <p className="text-gray-700">${product.proPrice}</p>
                            </div>
                        </div>
                            );
                        }
                        return null; // or any other fallback if needed
                    })}
                </div>
                <div className="mt-6 flex justify-between items-center">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="text-gray-600 hover:text-gray-800 disabled:opacity-50 flex items-center"
                    >
                        <BsChevronLeft className="h-6 w-6 mr-1" />
                        Previous
                    </button>
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={indexOfLastProduct >= filteredProducts.length}
                        className="text-gray-600 hover:text-gray-800 disabled:opacity-50 flex items-center"
                    >
                        Next
                        <BsChevronRight className="h-6 w-6 ml-1" />
                    </button>
                </div>
            </section>
            <ViewProduct
                selectedProduct={selectedProduct}
                closeModal={closeModal}
                handleProductClick={handleProductClick}
            />
            <Footer></Footer>
        </>
    );
}

export default Products;
