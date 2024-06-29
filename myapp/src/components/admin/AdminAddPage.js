import React, { useState } from 'react';
import { RegisterUser } from '../../api';
import Toast from '../Toast';
import Loading from '../Loading';


function AdminAddPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [messageType, setMessageType] = useState('error');

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

  const handleAddAdmin = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      return handleShowToast("All fields are required", "error");
    }

    setLoading(true);

    try {
      const newUser = RegisterUser({
        email: email,
        password: password,
        userType: 'admin',
        userStatus: 'approved',
      });

      await newUser.save();
      handleShowToast("Admin account created successfully", "success");
    } catch (error) {
      handleShowToast("Error creating admin account", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl font-bold mb-4">Admin Panel</h2>
      <div className="w-80 bg-white p-8 rounded-lg shadow-lg border border-gray-300">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Loading />
          </div>
        ) : (
          <>
            <label className="input input-bordered flex items-center gap-2 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
              <input type="text" className="grow" placeholder="Email" value={email} onChange={handleEmailChange} />
            </label>

            <label className="input input-bordered flex items-center gap-2 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 1 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
              <input type="password" className="grow" value={password} onChange={handlePasswordChange} placeholder="Password" />
            </label>

            <button className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600" onClick={handleAddAdmin}>
              Add Admin
            </button>
          </>
        )}
      </div>
      {showToast && <Toast message={toastMessage} onCloseToast={handleCloseToast} messageType={messageType} />}
    </div>
  );
}

export default AdminAddPage;
