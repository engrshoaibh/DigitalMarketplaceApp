import './App.css';
import React, { useState, useEffect } from 'react';
import { FetchAllProducts } from '../src/api';
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import LoginPage from './components/LoginPage';
import Products from './components/Products';
import SellerDashboard from './components/seller/SellerDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import AddProductForm from './components/seller/AddProductForm';
import ProductList from './components/seller/ProductList';
import AdminProductList from './components/admin/AdminProductList';
import AdminSellerList from './components/admin/AdminSellerList';
import AddCategoryList from "./components/admin/AdminCategoryList"

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Footer from './components/Footer';
import About from './components/About';
import { UserProvider } from './components/context/UserContext';
import PrivacyPolicy from './components/PrivacyPolicy';

function App() {
  const [products, setProducts] = useState([]);

  const FetchProducts = () => {
    try {
      let fetchedData = FetchAllProducts(setProducts);
      console.log("Fetched Data  ", fetchedData);
      setProducts(fetchedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchProducts();
    console.log("Products", products);
    setProducts(products);
  }, []);

  return (
    <div>
      <Router>
        <UserProvider>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home allProducts={products} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/seller/seller-dashboard" element={<SellerDashboard />} />
            <Route path="/admin/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/seller/add-product" element={<AddProductForm />} />
            <Route path="/products" element={<Products allProducts={products} />} />
            <Route path="/seller/showProducts" element={<ProductList allProducts={products} />} />
            <Route path="/admin/showProducts" element={<AdminProductList allProducts={products} />} />
            <Route path="/admin/addCategory" element={<AddCategoryList allProducts={products} />} />
            <Route path="/admin/showUsers" element={<AdminSellerList/>} />
            <Route path="/about-us" element={<About />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          </Routes>
          </UserProvider>
        {/* <Footer /> */}

      </Router>
    </div>
  );
}

export default App;