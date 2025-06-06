import  { createContext, useState, useContext } from 'react';
import { useEffect } from 'react';
import {jwtDecode} from "jwt-decode";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {


  const IsTokenExpired=(token)=>{
    if (!token || token===null) {
      return true;
    }

    console.log("Token inside isTokenExpired:",token);
    const decodedToken=jwtDecode(token);
    const currentTime=Date.now()/1000;

    return decodedToken.exp < currentTime;
  
  }
  const [user, setUser] = useState(localStorage.getItem("user") || null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading,setLoading]=useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") || false
  );


  useEffect(()=>{
    setLoading(true);
    const token=localStorage.getItem('token')||null;
 
    if(IsTokenExpired(token)){
      console.log("Token Expired and logging out");
     
      logout();
    }
    else{
      console.log("Token is not expired , signed in ");
      setToken(token);
     fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/getUser`,{
       method: "GET",
       headers: {
         Authorization: `Bearer ${token}`,
       },
     })
       .then((res) => res.json())
       .then((data) => {
         console.log("data", data);
         setUser(data.user);
          setIsLoggedIn(true);
         localStorage.setItem("user", JSON.stringify(data.user));
         localStorage.setItem("isLoggedIn", true);
       })
       .catch((err) => {
         setLoading(false);
         notify("Error fetching user data");
         console.log("error", err);
       });
       setLoading(false);
    }
  },[]);


  


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
    <AuthContext.Provider value={{ isLoggedIn, user,setUser, login, logout,token,loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 
