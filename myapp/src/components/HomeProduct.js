import React from "react";
import ViewProduct from './ViewProduct'; // Import the ViewProduct component
import { useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

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
        className="bg-white rounded-lg shadow-md overflow-hidden hover: cursor-pointer product-card m-5"
        style={
          {
            width: "fit-content"
          }
        }
      >
        <div className="p-6 " >
          <div className="mb-4 h-full" >
            <img
              src={product.imageFile}
              alt={product.proName}
              className=" rounded-lg "
              style={{
                resizeMode: 'contain',
                flex: 1,
                aspectRatio: 1,
                width: "100%",

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
      <ViewProduct
        selectedProduct={selectedProduct}
        closeModal={closeModal}
        handleProductClick={handleProductClick}
      />
    </>
  );
};

export default Product;