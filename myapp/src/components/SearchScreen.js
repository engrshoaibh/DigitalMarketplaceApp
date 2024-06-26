import React, { useState } from 'react';
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Footer from './Footer';
import ViewProduct from './ViewProduct'; // Import the ViewProduct component
import { useNavigate } from 'react-router-dom';
import HomeProduct from './HomeProduct'
import axios from 'axios';
import Loading from './Loading'; // Import the Loading component

function SearchScreen() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(false); // State to manage loading animation
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

    const handleSearch = async () => {
        try {
            if (!searchQuery) {
                return;
            }

            setLoading(true); 
            const response = await axios.get(`https://digital-marketplace-app.onrender.com/products/search?proName=${searchQuery}`);
            setLoading(false); 
            
            navigate(`/search?proName=${encodeURIComponent(searchQuery)}`);
            setSearchResults(response.data);
            setCurrentPage(1); // Reset pagination to first page
        } catch (error) {
            console.error("Error while searching products:", error);
            setLoading(false); // Hide loading animation in case of error
        }
    };

    return (
        <>
            <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
                    Search Products
                </h2>
                <div className='flex justify-center w-full gap-5'>
                    <div className='w-1/2  shadow-md'>
                        <input
                            type="text"
                            placeholder="Enter search query..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <button 
                        onClick={handleSearch}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 shadow-md"
                    >
                        Search
                    </button>
                </div>

                {/* Loading animation */}
                {loading && <Loading />}

                {/* Display search results or message if no results */}
                {searchResults.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {currentProducts?.map((product) => {
                            if (product.proStatus === 'approved') {
                                return <HomeProduct key={product.id} product={product} />
                            }
                            return null;
                        })}
                    </div>
                ) : (
                    <div className="text-center text-gray-600 font-semibold mt-8">
                        No products found.
                    </div>
                )}

                {searchResults.length > productsPerPage && (
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
                )}
            </section>
            <ViewProduct
                selectedProduct={selectedProduct}
                closeModal={closeModal}
                handleProductClick={handleProductClick}
            />
            <Footer />
        </>
    );
}

export default SearchScreen;
