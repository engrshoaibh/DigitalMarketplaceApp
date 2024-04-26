
import React, { useState } from 'react';
import { LoginUser } from '../api';
import { useNavigate } from 'react-router-dom';
import { useUser } from './context/UserContext';

function LoginPage() {
  const { setUserData } = useUser()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('customer');
  const [user, setUser] = useState([]);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleEmailChange = (event)  => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value.toLowerCase());
  };

  const handleLogin = async () => {
    if (email === "" || password === "" || userType === "") {
      alert("Fill All the fields!!! \nYou cannot Login with empty fields!");
      return;
    }

    const userData = {
      email: email,
      password: password,
      userType: userType
    };

    try {
      const foundUser = await LoginUser(setUser, userData);
      setUserData(foundUser)

      if (foundUser) {
        
        if (foundUser.toLowerCase() === "customer") {
          console.log(foundUser)
          navigate("/"); // Use navigate for redirection
        } else if (foundUser.toLowerCase() === "seller") {
          navigate("/seller/seller-dashboard");
        } else if (foundUser.toLowerCase() === "admin") {
          navigate("/admin/admin-dashboard");
        }
      } else {
        alert("Either your email or password is incorrect or you are not a seller/admin.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Error logging in. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl font-bold mb-4">Login</h2>
      <div className="w-80">
        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 rounded-lg border outline-none focus:border-blue-500"
          value={email}
          onChange={handleEmailChange}
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 rounded-lg border outline-none focus:border-blue-500"
          value={password}
          onChange={handlePasswordChange}
        />

        {/* User Type Radio Buttons */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold">User Type</label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="seller"
              checked={userType === 'seller'}
              onChange={handleUserTypeChange}
              className="mr-2"
            />
            Seller
          </label>
          <label className="inline-flex items-center ml-4">
            <input
              type="radio"
              value="customer"
              checked={userType === 'customer'}
              onChange={handleUserTypeChange}
              className="mr-2"
            />
            Customer
          </label>
          <label className="inline-flex items-center ml-4">
            <input
              type="radio"
              value="admin"
              checked={userType === 'admin'}
              onChange={handleUserTypeChange}
              className="mr-2"
            />
            Admin
          </label>
        </div>

        {/* Login Button */}
        <button
          className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginPage;

