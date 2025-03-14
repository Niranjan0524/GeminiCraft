import { useState, useEffect, useContext } from "react";
import { ChatContext } from "../store/ChatContext";
import { useTheme } from "../store/ThemeContext";
import { useAuth } from "../store/AuthContext";
import {
  ChatBubbleLeftRightIcon,
  UserIcon,
  ClockIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { MdSummarize } from "react-icons/md";


const Dashboard = () => {
  const { isDarkTheme } = useTheme();
  const { chats } = useContext(ChatContext);
  const { token } = useAuth();
  const [stats, setStats] = useState({
    totalChats: 0,
    totalMessages: 0,
    averageMessagesPerChat: 0,
    lastActive: "",
  });

  useEffect(() => {
    // Calculate dashboard statistics
    const totalChats = chats.length;
    const totalMessages = chats.reduce(
      (sum, chat) => sum + (chat.messages?.length || 0),
      0
    );
    const averageMessages = totalChats
      ? (totalMessages / totalChats).toFixed(1)
      : 0;
    const lastChat = chats[0]?.startTime
      ? new Date(chats[0].startTime).toLocaleDateString()
      : "Never";

    setStats({
      totalChats,
      totalMessages,
      averageMessagesPerChat: averageMessages,
      lastActive: lastChat,
    });
  }, [chats]);

  const handleSummarize=(id)=>{
    console.log("Summarizing chat id: ",id);

  }

  return (
    <div
      className={`min-h-screen ${
        isDarkTheme
          ? "bg-gradient-to-b from-gray-800 to-gray-900 text-white"
          : "bg-white text-gray-900"
      } p-8 font-mono`}
    >
      {/* Dashboard Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-500 to-red-500 bg-clip-text text-transparent">
          Dashboard Overview
        </h1>
        <p className="text-gray-400 mt-2">
          Your conversation analytics and statistics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Chats */}
        <div
          className={`${
            isDarkTheme ? "bg-gray-800" : "bg-gray-100"
          } rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Chats</p>
              <h2 className="text-2xl font-bold mt-2">{stats.totalChats}</h2>
            </div>
            <ChatBubbleLeftRightIcon className="h-8 w-8 text-red-500" />
          </div>
        </div>

        {/* Total Messages */}
        <div
          className={`${
            isDarkTheme ? "bg-gray-800" : "bg-gray-100"
          } rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Messages</p>
              <h2 className="text-2xl font-bold mt-2">{stats.totalMessages}</h2>
            </div>
            <DocumentTextIcon className="h-8 w-8 text-red-500" />
          </div>
        </div>

        {/* Average Messages */}
        <div
          className={`${
            isDarkTheme ? "bg-gray-800" : "bg-gray-100"
          } rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Avg Messages/Chat</p>
              <h2 className="text-2xl font-bold mt-2">
                {stats.averageMessagesPerChat}
              </h2>
            </div>
            <UserIcon className="h-8 w-8 text-red-500" />
          </div>
        </div>

        {/* Last Active */}
        <div
          className={`${
            isDarkTheme ? "bg-gray-800" : "bg-gray-100"
          } rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Last Active</p>
              <h2 className="text-2xl font-bold mt-2">{stats.lastActive}</h2>
            </div>
            <ClockIcon className="h-8 w-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Recent Conversations */}
      <div
        className={`${
          isDarkTheme ? "bg-gray-800" : "bg-gray-100"
        } rounded-lg p-6 shadow-lg mb-8`}
      >
        <h2 className="text-xl font-semibold mb-4">Recent Conversations</h2>
        <div className="space-y-4">
          {chats.slice(0, 5).map((chat) => (
            <div
              key={chat._id}
              className={`${
                isDarkTheme ? "bg-gray-700" : "bg-white"
              } p-4 rounded-lg shadow flex items-center justify-between`}
            >
              <div>
                <h3 className="font-medium">{chat.title}</h3>
                <p className="text-sm text-gray-400">
                  {new Date(chat.startTime).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="border border-red-300 shadow-md rounded-lg p-6 relative px-6 py-2 text-lg font-bold text-grey bg-gradient-to-r from-grey-400 to-red-900 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
                onClick={()=>{handleSummarize(chat._id)}}>
                  <div className="flex">
                    <MdSummarize className="h-6 w-6 mr-2" />
                    Summarize 
                  </div>
                </button>

                <span className="text-sm text-gray-400">
                  {chat.messages?.length || 0} messages
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;