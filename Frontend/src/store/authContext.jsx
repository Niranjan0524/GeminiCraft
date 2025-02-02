import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') || false);
  const [user, setUser] = useState(localStorage.getItem('user')||null);
  const [token,setToken]=useState(localStorage.getItem('token')||null);


  const login = (data) => {
    console.log("inside context",data);
    
    setIsLoggedIn(true);
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem('user',JSON.stringify(data.user));
    localStorage.setItem('isLoggedIn',true);
    localStorage.setItem('token',data.token);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStrorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout,token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 