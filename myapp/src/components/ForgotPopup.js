import React, { useState } from 'react';
import SuccessModal from './SuccessModal';
import { ForgotPassword } from '../api';

function ForgotPasswordPopup({ onClose }) {
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('customer');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [userTypeError, setUserTypeError] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async () => {
    let isValid = true;

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Enter a valid email');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!userType) {
      setUserTypeError('User type is required');
      isValid = false;
    } else {
      setUserTypeError('');
    }

    if (!isValid) {
      return;
    }

    const response = await ForgotPassword(email, userType);
    console.log('Reset password for:', response);
    setShowSuccessModal(true);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    onClose();
  };

  return (
    <>
      <dialog open className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Forgot Password</h3>
          <p className="py-4">Enter your email to reset your password.</p>
          <input
            type="email"
            className="input input-bordered w-full mb-2"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
          {emailError && <p className="text-red-500 text-sm mb-2">{emailError}</p>}
          <div className="mb-2 relative">
            <label className="block mb-2 text-sm font-bold">User Type</label>
            <div className="relative">
              <select
                className="input input-bordered w-full pl-4"
                value={userType}
                onChange={handleUserTypeChange}
              >
                <option value="customer">Customer</option>
                <option value="seller">Seller</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 9.707a1 1 0 011.414 0L10 13.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          {userTypeError && <p className="text-red-500 text-sm mb-2">{userTypeError}</p>}
          <div className="modal-action">
            <button className="btn" onClick={handleSubmit}>Submit</button>
            <button className="btn" onClick={onClose}>Close</button>
          </div>
        </div>
      </dialog>
      {showSuccessModal && <SuccessModal onClose={handleCloseSuccessModal} />}
    </>
  );
}

export default ForgotPasswordPopup;
