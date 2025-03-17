import { Children } from "react";
import { useContext,useReducer } from "react";
import { createContext } from "react";
import {chatReducer} from './chatReducer';
import { useEffect } from "react";
import {useAuth} from './AuthContext';
import toast from "react-hot-toast";

export const ChatContext=createContext();

export const ChatProvider=({children})=>{

  const {token,isLoggedIn}=useAuth();
  const [chats,dispatch]=useReducer(chatReducer,[]);

  useEffect(()=>{
   if(isLoggedIn){
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/conversation`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        addAllChats(data.conversations);
               
      })
      .catch((error) => {
        console.error("Error fetching conversation:", error);
        toast.error("Error fetching chat history");
      });
    }
  },[token]);
  
  const addAllChats=(chats)=>{
    dispatch({
      type:'ADD_ALL_CHATS',
      payload:chats
    })    
  }
  const addChat=(chat)=>{
    
    dispatch({
      type:'ADD_CHAT',
      payload:chat
    })
    
  }

  const deleteChat=(id)=>{
    dispatch({
      type:'DELETE_CHAT',
      payload:id
    })
  }

  const updateChat=(chat)=>{
    dispatch({
      type:'UPDATE_CHAT',
      payload:chat
    })    
  }

   const deleteAllChats = () => {
     dispatch({
       type: "DELETE_ALL_CHATS",
     });
   };
   
   const fetchChats = (id) => {
    dispatch({
      type: "FETCH_CHATS",
      payload: id,
    });

  
  };

  return (
    <ChatContext.Provider
      value={{
        chats,
        deleteAllChats,
        addAllChats,
        addChat,
        deleteChat,
        updateChat,
        fetchChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}