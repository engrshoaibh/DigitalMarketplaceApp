// AdminLoginPage.js
import React, { useState } from 'react';
import { LoginUser } from '../../api/index';
import { useNavigate } from 'react-router-dom';
import Toast from '../Toast';
import { useUser } from '../context/UserContext';
function AdminLoginPage() {
  const { setUserData } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [userType, setUserType] = useState('admin');
  const [toastMessage, setToastMessage] = useState('');
  const [messageType, setMessageType] = useState('error');
  const navigate = useNavigate();

  const handleShowToast = (message, type) => {
    setMessageType(type);
    setToastMessage(message);
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    if (email === "" || password === "") {
      handleShowToast('All fields are required', 'error');
      return;
    }

    try {
      const foundUser = await LoginUser({ email, password, userType });
      handleShowToast('Login Success', 'success');
      setUserData(foundUser);
      if (foundUser && foundUser.userType.toLowerCase() === "admin") {
        handleShowToast('Admin Login Success', 'success');
        navigate("/admin/admin-dashboard");
      } else {
        handleShowToast('Invalid credentials or user is not an admin', 'error');
      }
    } catch (error) {
      console.error("Error logging in:", error);
      handleShowToast("Error logging in. Please try again later.", 'error');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl font-bold mb-4">Admin Login</h2>
      <div className="w-80 bg-white p-8 rounded-lg shadow-lg border border-gray-300">
        {/* Email Input */}
        <label className="input input-bordered flex items-center gap-2 mb-4">
          <input type="text" className="grow" placeholder="Email" value={email} onChange={handleEmailChange} />
        </label>

        {/* Password Input */}
        <label className="input input-bordered flex items-center gap-2 mb-4">
          <input type="password" className="grow" placeholder="Password" value={password} onChange={handlePasswordChange} />
        </label>

        {/* Login Button */}
        <button className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600" onClick={handleLogin}>
          Login
        </button>
      </div>
      {showToast && <Toast message={toastMessage} onCloseToast={handleCloseToast} messageType={messageType} />}
    </div>
  );
}

export default AdminLoginPage;
