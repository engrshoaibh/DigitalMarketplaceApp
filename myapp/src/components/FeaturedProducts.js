import React from "react";
import { useNavigate } from 'react-router-dom';
import HomeProduct from "./HomeProduct";
import Loading from "./Loading";

const FeaturedProducts = ({ allProducts }) => {
  const products = allProducts?.slice(0, 8);
  const navigate = useNavigate();

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
          Latest Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {
            allProducts && allProducts.length > 0 ? 
            products?.map((product) => {
              if (product.proStatus === 'approved') {
                return <HomeProduct key={product.id} product={product} />
              }
              return null;
            })
            :(
              <div className="col-span-full flex justify-center items-center">
                <Loading />
              </div>
            )
          }
        </div>
        <div className="mt-5 text-center">
          {
           products ? (
            <button 
            className="bg-gray-900 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300"
            onClick={() => {
              navigate('/products');
              window.scrollTo(0, 0);
            }}
          >
            View All Products
          </button>
           ):null
            
          }
          
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
