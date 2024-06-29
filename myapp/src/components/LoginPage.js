import React, { useState } from 'react';
import { LoginUser } from '../api';
import { useNavigate } from 'react-router-dom';
import { useUser } from './context/UserContext';
import Toast from './Toast';
import Loading from './Loading';
import ForgotPopup from './ForgotPopup';

function LoginPage() {
  const { setUserData } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('customer');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [messageType, setMessageType] = useState('error');
  const [loading, setLoading] = useState(false);
  const [showForgotPopup, setShowForgotPopup] = useState(false);

  const handleShowToast = (message, type) => {
    setMessageType(type);
    setToastMessage(message);
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
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
      handleShowToast('All fields are required', 'error');
      return;
    }

    const userData = {
      email: email,
      password: password,
      userType: userType
    };

    setLoading(true);

    setTimeout(async () => {
      try {
        const foundUser = await LoginUser(userData);

        if (foundUser) {
          handleShowToast('Login Success', 'success');
          setUserData(foundUser);

          if (foundUser.userType.toLowerCase() === "customer") {
            navigate("/");
          } else if (foundUser.userType.toLowerCase() === "seller" && foundUser.isVerified == true) {
       
            navigate("/seller/seller-dashboard");
          }
          else{
            handleShowToast("Your Account is not verified", 'error');
          }
        } else {
          handleShowToast("Your Password or Email is Wrong!", 'error');
        }
      } catch (error) {
        console.error("Error logging in:", error);
        handleShowToast("Error logging in. Please try again later.", 'error');
      } finally {
        setLoading(false);
      }
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-4">Login</h2>
      <div className="w-80 bg-white p-8 rounded-lg shadow-lg border border-gray-300">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Loading />
          </div>
        ) : (
          <>
            {/* Email Input */}
            <label className="input input-bordered flex items-center gap-2 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
              <input type="text" className="grow" placeholder="Email"
                value={email}
                onChange={handleEmailChange}
              />
            </label>

            <label className="input input-bordered flex items-center gap-2 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 1 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
              <input type="password" className="grow"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Password"
              />
            </label>
            <div className='flex justify-end underline decoration-blue-500 text-blue-700 font-small'>
              <button onClick={() => setShowForgotPopup(true)}>
                Forgot Password?
              </button>
            </div>

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
              
            </div>

            {/* Login Button */}
            <button
              className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600"
              onClick={handleLogin}
            >
              Login
            </button>
          </>
        )}
      </div>
      {showToast && (
        <Toast message={toastMessage} onCloseToast={handleCloseToast} messageType={messageType} />
      )}

      {showForgotPopup && (
        <ForgotPopup onClose={() => setShowForgotPopup(false)} />
      )}
    </div>
  );
}

export default LoginPage;
