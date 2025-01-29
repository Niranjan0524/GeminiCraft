import { useState } from "react";
import { MdOutlineSend, MdContentCopy } from "react-icons/md";
import { ChatContext } from "../store/chatContext";
import { useContext } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import SkeletalLoader from "./SkeletalLoader";
import ReactMarkdown from "react-markdown";
import React from "react";
import { IoCheckmark } from "react-icons/io5";

import UserReaction from "./UserReactions";
import ChatHeader from "./ChatHeader";
import { useNavigate } from "react-router-dom";
import { useTheme } from '../store/themeContext';


const Chat = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const { addAllChats, chats, addChat, deleteChat, updateChat } =
    useContext(ChatContext);
  const [currentChat, setCurrentChat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState("gemini-1.5-flash");
  const [copiedIndex, setCopiedIndex] = useState(null);

  const navigate = useNavigate();
  const { isDarkTheme } = useTheme();

  useEffect(() => {
    if (id) {
      const chat = chats.find((chat) => chat._id === id);
      if (chat) {
        setCurrentChat(chat);
        setMessages(chat.messages);
      } else {
        fetch(`http://localhost:3000/api/conversation`)
          .then((response) => response.json())
          .then((data) => {
            console.log("data from the server", data);
            addAllChats(data.conversations);
            const chat = data.conversations.find((chat) => chat._id === id);

            setCurrentChat(chat);

            setMessages(chat.messages);
          })
          .catch((error) => {
            console.error("Error fetching conversation:", error);
          });
      }
    } else {
      setCurrentChat({});
      setMessages([]);
    }
  }, [id]);

    useEffect(() => {
      if (currentChat === null) {
        navigate("/");
      }
    }, [currentChat,deleteChat, navigate]);

  const handleModelchange =(e)=>{
    // console.log("Model Changed");
    console.log(e.target.value);
    // setModel(e.target.value);
  }

  const handleSend = () => {
    if (input.trim() === "") return;

    setInput("");
    setMessages([...messages, { content: input, role: "user" }]);
    if (messages.length === 0) {
      fetch("http://localhost:3000/api/conversation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: input,
          model: model,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          addChat(data.conversation1);
          setCurrentChat(data.conversation1);
          setMessages(data.conversation1.messages);
          navigate(`/conversation/${data.conversation1._id}`);
        })
        .catch((error) => {
          console.error("Error sending message:", error);
        })
        .finally(() => {
          setInput("");
        });
    } else {
      setLoading(true);
      fetch(`http://localhost:3000/api/conversation/${currentChat._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: input,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          updateChat(data.conversations);
          setMessages(data.conversations.messages);
          setCurrentContent(data.content);
        })
        .catch((error) => {
          console.error("Error sending message:", error);
        })
        .finally(() => {
          setInput("");
          setLoading(false);
        });
    }
  };

  const handleCopy = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <>
      <ChatHeader
        status={messages.length === 0 ? "New Chat" : currentChat.title}
      />
      <div className={`flex flex-col h-[90vh] ${
        isDarkTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'
      } font-mono items-center justify-center`}>
        <div className="flex flex-col w-full max-w-3xl h-full">
          <div className="flex-1 overflow-y-auto p-2 w-full overflow-auto scrollbar scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-600">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center w-full">
                  <p className="text-gray-500 mb-4">
                    Start a new conversation...
                  </p>
                  <div className="flex items-center w-full">
                    <input
                      type="text"
                      className={`flex-1 p-4 rounded-full ${
                        isDarkTheme 
                          ? 'bg-gray-700 text-white' 
                          : 'bg-white text-gray-800 border border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      placeholder="Type your message..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    />
                    <select
                      className="ml-2 p-2 min-w-[100px] bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500 hover:ring-2 hover:ring-pink-500"
                      onChange={handleModelchange}
                    >
                      <option className="ml-2 p-3" value="gemini-1.5-flash">
                        gemini-1.5-flash
                      </option>
                      <option className="ml-2 p-3" value="gemini-1.5-flash-8B">
                        gemini-1.5-flash-8B
                      </option>
                      <option className="ml-2 p-3" value="gemini-1.5-pro">
                        gemini-1.5-pro
                      </option>
                    </select>
                    <button
                      className={`ml-2 p-4 ${
                        isDarkTheme
                          ? 'bg-gradient-to-r from-gray-600 to-red-600 hover:from-gray-500 hover:to-red-500'
                          : 'bg-gradient-to-r from-gray-200 to-red-400 hover:from-gray-100 hover:to-red-300'
                      } text-white rounded-full transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-500 active:scale-95`}
                      onClick={handleSend}
                    >
                      <MdOutlineSend className={`h-6 w-6 ${
                        isDarkTheme ? 'text-white' : 'text-gray-800'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {messages.map((message, index) => (
                  <>
                  <div
                    key={index}
                    className={`group relative inline-block w-full max-w-full p-4 my-2 rounded-lg break-words ${
                      message.role === "user"
                        ? "self-end text-right"
                        : "self-start text-left"
                    }`}
                  >                  
                      
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                    <div>
                    {message.role !== "user" && <UserReaction content={message.content} />}
                  </div>
                  </>
                ))}
                {loading && <SkeletalLoader />}
              </>
            )}
          </div>
          {messages.length > 0 && (
            <div className="p-4 border-t border-gray-700">
              <div className="flex items-center w-full">
                <input
                  type="text"
                  className={`flex-1 p-4 rounded-full ${
                    isDarkTheme 
                      ? 'bg-gray-700 text-white' 
                      : 'bg-white text-gray-800 border border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                />
                <select className="ml-2 p-2 min-w-[150px] bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500 hover:ring-2 hover:ring-red-500 transition-transform transform hover:scale-106 shadow-lg">
                  <option className="ml-2 p-3" value="gemini-1.5-flash">
                    gemini-1.5-flash
                  </option>
                  <option className="ml-2 p-3" value="gemini-1.5-flash-8B">
                    gemini-1.5-flash-8B
                  </option>
                  <option className="ml-2 p-3" value="gemini-1.5-pro">
                    gemini-1.5-pro
                  </option>
                </select>
                <button
                  className={`ml-2 p-4 ${
                    isDarkTheme
                      ? 'bg-gradient-to-r from-gray-600 to-red-600 hover:from-gray-500 hover:to-red-500'
                      : 'bg-gradient-to-r from-gray-200 to-red-400 hover:from-gray-100 hover:to-red-300'
                  } text-white rounded-full transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-500 active:scale-95`}
                  onClick={handleSend}
                >
                  <MdOutlineSend className={`h-6 w-6 ${
                    isDarkTheme ? 'text-white' : 'text-gray-800'
                  }`} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Chat;
