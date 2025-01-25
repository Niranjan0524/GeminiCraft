import { useState } from "react";
import { MdOutlineSend } from "react-icons/md";
import { ChatContext } from "../store/chatContext";
import { useContext } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const {chats,addChat,updateChat}=useContext(ChatContext);
  const [currentChat,setCurrentChat]=useState({});
  
  const {id}=useParams();

  useEffect(()=>{
    if(id){
      const chat=chats.find(chat=>chat._id===id);
      setCurrentChat(chat);
      setMessages(chat.messages);
    }
    else{
      setCurrentChat({});
      setMessages([]);
    }
  },[id]);

  const handleSend = () => {
    setInput(input.trim());
    setInput("");
    if(messages.length===0){
      fetch("http://localhost:3000/api/conversation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: input,
          model: "gemini-1.5-flash",
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          addChat(data.conversation1);
          setCurrentChat(data.conversation1);

          setMessages(data.conversation1.messages);
        })
        .catch((error) => {
          console.error("Error sending message:", error);
        })
        .finally(() => {
          setInput("");
        });
  }
  else{

    fetch(`http://localhost:3000/api/conversation/${currentChat._id}`, {
      method: "PUT",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMessages(data.conversations.messages);
        setCurrentContent(data.content);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      })
      .finally(() => {  
        setInput("");
      });

  }

};

return (
  <div className="flex flex-col   h-screen bg-gray-900 text-white font-mono items-center justify-center">
    <div className="flex flex-col w-3/4 max-w-xl h-full">
      <div className="flex-1 overflow-y-auto p-2 w-full">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center w-full">
              <p className="text-gray-500 mb-4">Start a new conversation...</p>
              <div className="flex items-center w-full">
                <input
                  type="text"
                  className="flex-1 p-4 rounded-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 hover:ring-2 hover:ring-pink-500"
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                />
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
          messages.map((message, index) => (
            <div
              key={index}
              className={`inline-block w-full max-w-full p-4 my-2 rounded-lg break-words ${
                message.role === "user"
                  ? "self-end text-right"
                  : "self-start text-left"
              }`}
            >
              {message.content}
            </div>
          ))
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
);
};

export default Chat;
