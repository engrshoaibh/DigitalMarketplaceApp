import React from 'react';
import { BsX } from 'react-icons/bs';

const ViewProduct = ({ selectedProduct, closeModal, handleProductClick }) => {
    return (
        <>
            {selectedProduct && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 max-w-md relative">
                        <button onClick={closeModal} className="absolute top-0 right-0 p-2">
                            <BsX className="h-6 w-6 text-gray-800" />
                        </button>
                        <img
                            src={selectedProduct.imageFile}
                            alt={selectedProduct.proName}
                            className="w-full h-full  object-cover mb-4 rounded-lg"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-bold mb-2">{selectedProduct.proName}</h3>
                            <p className="text-gray-600 mb-2">{selectedProduct.category}</p>
                            <p className="text-gray-700 mb-2">${selectedProduct.proPrice}</p>
                            <button
                                onClick={() => handleProductClick(selectedProduct)}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            >
                                Chat with Seller
                            </button>
                            <p className="text-gray-800 mt-4">{selectedProduct.proDesc}</p>
                        </div>  
                    </div>
                </div>
            )}
        </>
    );
}

export default ViewProduct;
