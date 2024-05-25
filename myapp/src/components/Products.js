import React, { useState } from 'react';
import { BsChevronLeft, BsChevronRight, BsSearch,  } from "react-icons/bs";
import { FaMapMarkerAlt } from 'react-icons/fa';
import Footer from './Footer';
import ViewProduct from './ViewProduct'; // Import the ViewProduct component
import SearchModal from './SearchScreen'; // Import the SearchModal component
import { Link } from 'react-router-dom';

function Products({ allProducts }) {
    const [searchModalOpen, setSearchModalOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const productsPerPage = 12; // Change this value based on your preference for products per page

    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = searchResults.slice(indexOfFirstProduct, indexOfLastProduct);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Function to handle click on product card
    const handleProductClick = (product) => {
        setSelectedProduct(product);
    };

    // Function to close the modal
    const closeModal = () => {
        setSelectedProduct(null);
    };

    // Function to handle search
    const handleSearch = async (searchQuery) => {
        // Call backend API to fetch search results
        const response = await fetch(`/api/products?search=${searchQuery}`);
        const data = await response.json();
        setSearchResults(data);
        setSearchModalOpen(false);
    };

    return (
        <>
            <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
                    All Products
                </h2>
                <Link
                    to="/search"
                    className="text-gray-600 hover:text-gray-800 flex items-center ml-5"
                >
                    <BsSearch className="h-6 w-6 mr-1" />
                    Search
                </Link>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {allProducts?.map((product) => (
                        <div
                            key={product.id}
                            onClick={() => handleProductClick(product)}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover: cursor-pointer product-card  m-5"
                            style={
                                {
                                  width: "fit-content"
                                }
                              }
                        >
                            <div className="p-6">
                                <div className="mb-4">
                                    <img
                                        src={product.imageFile}
                                        alt={product.name}
                                        className="w-50 h-50 rounded-lg"
                                        style={{
                                            resizeMode: 'contain',
                                            flex: 1,
                                            aspectRatio: 1
                                        }}
                                    />
                                </div>
                                <h3 className="text-sm font-semibold mb-2">{product.proName}</h3>
                                <p className="text-gray-700">${product.proPrice}</p>
                                <div className='flex items-center pt-2'>
                                <FaMapMarkerAlt />
                                <p className="text-gray-700">{product?.proLocation}</p>

                                </div>
                            </div>
                        </div>
                    ))}
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
                        disabled={indexOfLastProduct >= searchResults.length}
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
            <Footer />
            {searchModalOpen && (
                <SearchModal
                    closeModal={() => setSearchModalOpen(false)}
                    handleSearch={handleSearch}
                />
            )}
        </>
    );
}

export default Products;
