import React, { createContext, useState, useContext } from 'react';
import { useEffect } from 'react';
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const IsTokenExpired=(token)=>{
    if(!token){
      return true;
    }

    const decodedToken=jwtDecode(token);
    const currentTime=Date.now()/1000;//basically it will convert the date to seconds

    return decodedToken.exp < currentTime;
  }
  const [user, setUser] = useState(localStorage.getItem("user") || null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(()=>{
    const token=localStorage.getItem('token')||null;
    if(IsTokenExpired(token)){
      logout();
    }
    setToken(token);
  },[token]);
 const [isLoggedIn, setIsLoggedIn] = useState(
   localStorage.getItem("isLoggedIn") || false
 );
  


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
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout,token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 