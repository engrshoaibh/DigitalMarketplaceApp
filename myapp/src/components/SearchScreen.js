import React, { useState } from 'react';
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Footer from './Footer';
import ViewProduct from './ViewProduct'; // Import the ViewProduct component
import { SearchProducts } from "../api";
function SearchScreen() {
    const [searchQuery, setSearchQuery] = useState('');
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

    const handleSearch = async (query) => {
        try {
            const searchResults = await SearchProducts(query);
            console.log("Search results:", searchResults);
            // Update state or perform other actions with the search results
        } catch (error) {
            console.error("Error while searching products:", error);
        }
    };

    return (
        <>
            <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
                    Search Products
                </h2>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Enter search query..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <button
                    onClick={handleSearch(searchQuery)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Search
                </button>
                {/* Display search results or message if no results */}
                {searchResults.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {currentProducts?.map((product) => (
                            <div
                                key={product.id}
                                onClick={() => handleProductClick(product)}
                                className="bg-white rounded-lg shadow-md overflow-hidden hover: cursor-pointer product-card"
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
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-600 font-semibold mt-8">
                        No products found.
                    </div>
                )}
                {/* Pagination */}
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
