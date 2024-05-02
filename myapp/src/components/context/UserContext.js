import React, { createContext, useState, useContext,useEffect } from 'react';
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    const user = localStorage.getItem('user');
    if(user === "undefined"){
      return null;

    }else{
      return JSON.parse(user)
    }
   
  });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(userData));
  }, [userData]);
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);