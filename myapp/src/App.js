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
import AddCategoryList from './components/admin/AdminCategoryList';
import AdminPanel from './components/admin/AdminPanel';
import SearchScreen from './components/SearchScreen';
import AdminLogin from './components/admin/AdminLoginPage';
import AdminSignup from './components/admin/AdminAddPage';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import { UserProvider, useUser } from './components/context/UserContext';
import PrivacyPolicy from './components/PrivacyPolicy';
import Loading from './components/Loading';

const ProtectedRoute = ({ element, role }) => {
  const { userData } = useUser();

  if (!userData) {
    return <Navigate to="/login" />;
  }

  if (role && userData.userType !== role) {
    return <Navigate to="/login" />;
  }

  return element;
};

function App() {
  const [loading, setLoading] = useState(true);  // initially true to show the loader
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const fetchProducts = async () => {
    await FetchAllProducts(setProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home allProducts={products} />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/login" element={<LoginPage />} />

          {/* Admin Routes */}
          <Route
            exact
            path="/admin/showProducts"
            element={<ProtectedRoute element={<AdminProductList allProducts={products} />} role="admin" />}
          />
          <Route
            exact
            path="/admin/addCategory"
            element={<ProtectedRoute element={<AddCategoryList allProducts={products} />} role="admin" />}
          />
          <Route
            exact
            path="/admin/showUsers"
            element={<ProtectedRoute element={<AdminSellerList />} role="admin" />}
          />
          <Route
            exact
            path="/adminpanel"
            element={<ProtectedRoute element={<AdminPanel />} role="admin" />}
          />
          <Route
            exact
            path="/adminpanel/login"
            element={<ProtectedRoute element={<AdminLogin />} role="admin" />}
          />
          <Route
            exact
            path="/adminpanel/signup"
            element={<ProtectedRoute element={<AdminSignup />} role="admin" />}
          />

          {/* Seller Routes */}
          <Route exact path="/seller/seller-dashboard" element={<SellerDashboard />} />
          <Route exact path="/admin/admin-dashboard" element={<AdminDashboard />} />
          <Route exact path="/seller/add-product" element={<AddProductForm />} />
          <Route exact path="/seller/showProducts" element={<ProductList allProducts={products} />} />

          {/* General Routes */}
          <Route exact path="/products" element={<Products allProducts={products} />} />
          <Route exact path="/about-us" element={<About />} />
          <Route exact path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route exact path="/search" element={<SearchScreen />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
