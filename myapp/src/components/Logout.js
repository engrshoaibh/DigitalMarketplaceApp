import React from 'react';
import { useUser } from './context/UserContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  const {setUserData} = useUser()
  const handleLogout = () => {
    // Perform any logout logic here
    // For example, clear local storage, reset state, etc.

    // Navigate to the desired location after logout
    setUserData(null)
    navigate('/'); // Replace '/login' with the path you want to navigate to
  };

  // Call handleLogout when logout button is clicked
  return (
    <button onClick={handleLogout} className="text-white">
      Logout
    </button>
  );
}

export default Logout;
