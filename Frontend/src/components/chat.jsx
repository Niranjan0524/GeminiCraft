import { useState } from "react";
import { MdOutlineSend } from "react-icons/md";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { role: "user", content: input }]);
      setInput("");
      // Simulate a response from the bot
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: "assistant", content: "This is a response from the bot." },
        ]);
      }, 1000);
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
