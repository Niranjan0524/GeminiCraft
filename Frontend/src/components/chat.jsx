import { useState, useEffect, useContext } from "react";
import { MdOutlineSend } from "react-icons/md";
import { ChatContext } from "../store/chatContext";
import { useParams, useNavigate } from "react-router-dom";
import SkeletalLoader from "./SkeletalLoader";
import ReactMarkdown from "react-markdown";
import React from "react";
import UserReaction from "./UserReactions";
import ChatHeader from "./ChatHeader";
import { useTheme } from "../store/themeContext";
import Notification from "./Notification";


const Chat = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const { addAllChats, chats, addChat, updateChat, deleteChat } =
    useContext(ChatContext);
  const [currentChat, setCurrentChat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState("gemini-1.5-flash");
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
  }, [currentChat, navigate]);

  const handleModelChange = (e) => {
    console.log("Model Changed");
    console.log(e.target.value);
    setModel(e.target.value);
  };

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
          if (data.conversation1 && data.conversation1._id) {
            addChat(data.conversation1);
            setCurrentChat(data.conversation1);
            setMessages(data.conversation1.messages);
            navigate(`/conversation/${data.conversation1._id}`);
          } else {
            console.error("Invalid response data:", data);
          }
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

  return (
    <>
      <ChatHeader
        status={
          messages.length === 0 ? "New Chat" : currentChat?.title || "Chat"
        }
      />
      
      <div
        className={`flex flex-col h-[90vh] ${
          isDarkTheme ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        } font-mono items-center justify-center`}
      >
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
                      className="flex-1 p-4 rounded-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 hover:ring-2 hover:ring-pink-500"
                      placeholder="Type your message..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    />
                    <select
                      className="ml-2 p-2 min-w-[100px] bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500 hover:ring-2 hover:ring-pink-500"
                      onChange={handleModelChange}
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
                      className="ml-2 p-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onClick={handleSend}
                    >
                      <MdOutlineSend className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`inline-block w-full max-w-full p-4 my-2 rounded-lg break-words ${
                      message.role === "user"
                        ? "self-end text-right"
                        : "self-start text-left"
                    }`}
                  >
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                    {message.role !== "user" && <UserReaction />}
                  </div>
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
                  className="flex-1 p-4 rounded-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 hover:ring-2 hover:ring-pink-500"
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
                  className="ml-2 p-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={handleSend}
                >
                  <MdOutlineSend className="h-6 w-6" />
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


