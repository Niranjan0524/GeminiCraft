import { Children } from "react";
import { useContext,useReducer } from "react";
import { createContext } from "react";
import {chatReducer} from './chatReducer';

export const ChatContext=createContext();

export const ChatProvider=({children})=>{


  const [chats,dispatch]=useReducer(chatReducer,[]);
  
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