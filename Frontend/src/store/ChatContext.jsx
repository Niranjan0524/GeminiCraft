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
    dispathch({
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

  return (
    <ChatContext.Provider value={{chats,addAllChats,addChat,deleteChat,updateChat}}>
      {children}
    </ChatContext.Provider>
  );
}