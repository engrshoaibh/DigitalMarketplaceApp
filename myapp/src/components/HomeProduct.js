import React from "react";
import ViewProduct from './ViewProduct'; // Import the ViewProduct component
import  { useState } from 'react';


const Product = ({ product }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

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
      <ViewProduct
                selectedProduct={selectedProduct}
                closeModal={closeModal}
                handleProductClick={handleProductClick}
            />
      </>
  );
};

export default Product;