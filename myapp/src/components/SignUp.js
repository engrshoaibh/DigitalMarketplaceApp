import React, { useState } from 'react';
import { RegisterUser } from '../api';
import Toast from './Toast';
function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('customer');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [messageType, setMessageType] = useState('error');

  const handleShowToast = (message,type) => {
    setMessageType(type)
    setToastMessage(message);
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  const handleEmailChange = (event) => {
    console.log(event.target.value)
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value.toLowerCase());
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if(email === "" || password === "" || userType === ""){
        return handleShowToast("All fields are required")
    }

    let userStatus = "pending";

    if(userType === "customer"){
      userStatus = "approved"
    }

    const newUser = RegisterUser({
        email : email,
        password : password,
        userType : userType,
        userStatus : userStatus
    })
    await newUser.save
    
    handleShowToast("Your has been Successfully Registered Just wait for approval frm Admin",'success')

  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl font-bold mb-4">Sign Up</h2>
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

        {/* SignUp Button */}
        <button
          className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600"
          onClick={handleSignUp}
        >
          Sign up
        </button>
      </div>
      {showToast && (
      <Toast message={toastMessage} onCloseToast={handleCloseToast} messageType={messageType} />
    )}
    </div>
  );
}

export default SignUp;
