import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  PlusIcon, 
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { ChatContext } from '../store/chatContext';
import { useContext } from 'react';
import TitleComponent from './TitleComponent';
import { MdDelete } from "react-icons/md";
import Notification from './Notification';
import { FaToggleOff } from "react-icons/fa6";
import { FaToggleOn } from "react-icons/fa6";
import { useTheme } from '../store/themeContext';
import { useAuth } from '../store/authContext';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [conversations, setConversations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { isDarkTheme, toggleTheme } = useTheme();
    const [notification,setNotification] =useState("")
    const {isLoggedIn} = useAuth();
    const navigate= useNavigate();
  const {chats,addAllChats,addChat,deleteChat,updateChat}=useContext(ChatContext);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };


  const handleDelete = (id) => {
    console.log("Deleteing: ",id);
    // showNotification("Chat Deleted");
    fetch(`http://localhost:3000/api/conversation/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => {
        console.log(data);
        deleteChat(id);
        showNotification("Chat Deleted");
      })
      .catch((error) => {
        console.error("Error deleting chat:", error);
      });
  };

  useEffect(() => {
  
    const fetchConversations = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:3000/api/conversation');
        const data = await response.json();
        addAllChats(data.conversations);    

      } catch (error) {
        console.error("Error loading conversations:", error);
        setConversations([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConversations();
  }, []); // Empty dependency array so it only runs once on mount

  const [showSettings, setShowSettings] = useState(false);

  const handleThemeChange = () => {
    toggleTheme();
  };


  const handleProfile=()=>{
    console.log("Profile clicked");
    if(isLoggedIn){
      navigate("/profile");
    }
    setNotification("Please login to view profile")
  }




  return (
    <div
      className={`${
        isDarkTheme ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'
      } h-[100.3vh] ${
        isCollapsed ? "w-16" : "w-120"
      } transition-all duration-300 ease-in-out relative flex flex-col font-mono`}
    >
   
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!isCollapsed && (
          <span className="font-semibold text-3xl bg-gradient-to-r from-gray-500 to-red-500 bg-clip-text text-transparent">
            GeminiCraft
          </span>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`${
            isCollapsed ? "mx-auto" : ""
          } bg-gray-800 rounded-lg p-2 hover:bg-gray-700 transition-colors`}
        >
          {isCollapsed ? (
            <ChevronRightIcon className="h-4 w-4" />
          ) : (
            <ChevronLeftIcon className="h-4 w-4" />
          )}
        </button>
      </div>

      <div className="p-4">
        <Link
          to="/"
          className="flex items-center gap-2 bg-gradient-to-r from-gray-600 to-red-600 hover:from-gray-500 hover:to-red-500
          rounded-full p-3 transition-transform transform hover:scale-105 shadow-lg"
        >
          <PlusIcon className="h-6 w-6 text-white" />
          {!isCollapsed && (
            <span className="text-white font-medium">New Chat</span>
          )}
        </Link>
      </div>

      <div className="flex-1 px-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
        <h2
          className={`text-gray-400 text-xs uppercase px-2 mb-2 
            ${isCollapsed ? "hidden" : "block"}`}
        >
          Recent Conversations
        </h2>
        {isLoading ? (
          <div className="text-gray-400 text-sm px-2">Loading...</div>
        ) : chats.length > 0 ? (
          chats.map((chat) => (
            <div className="flex items-center">
              <Link
                key={chat._id}
                to={`/conversation/${chat._id}`}
                className="flex items-center gap-2 px-2 py-3 rounded-lg hover:bg-gradient-to-r 
              hover:from-gray-700 hover:to-gray-600 transition-colors duration-200 mb-1 flex-grow"
              >
                <ChatBubbleLeftRightIcon className="h-5 w-5 text-gray-400" />
                {!isCollapsed && (
                  <TitleComponent
                    title={chat.title}
                    startTime={chat.startTime}
                  />
                )}
              </Link>
              <MdDelete
                className="ml-auto cursor-pointer hover:text-gray-200 hover:scale-150 transition-transform duration-200"
                onClick={() => handleDelete(chat._id)}
              />
            </div>
          ))
        ) : (
          <div className="text-gray-400 text-sm px-2">No conversations yet</div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-gray-700 relative">
        <div className="space-y-2"></div>
        <button
          className="flex items-center gap-2 w-full px-2 py-3 rounded-lg 
            hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-600 transition-colors duration-200"
          onClick={() => setShowSettings(!showSettings)}
        >
          <Cog6ToothIcon className="h-5 w-5 text-gray-400" />
          {!isCollapsed && <span>Settings</span>}
        </button>
        <button
          className="flex items-center gap-2 w-full px-2 py-3 rounded-lg 
            hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-600 transition-colors duration-200"
        >
          <ArrowLeftOnRectangleIcon className="h-5 w-5 text-gray-400" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
      {showSettings && (
        <div className={`absolute right-0 bottom-16 ${
          isDarkTheme ? 'bg-gray-800 text-gray-100' : 'bg-gray-100 text-gray-800'
        } rounded-lg shadow-lg p-4 w-48`}>
          <ul className="space-y-2" >
            <li className={`${isDarkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} p-2 rounded`}>
              <div className='flex justify-between'>
                Theme
                <div className="flex" onClick={handleThemeChange}>
                  {isDarkTheme ? <FaToggleOn size={25}/> : <FaToggleOff size={25} />}
                </div>
              </div>
            </li>
            
            <li className={`${isDarkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} p-2 rounded`} 
            onClick={handleProfile}>Profile</li>
            
            <li className={`${isDarkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} p-2 rounded`}>Contribute</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sidebar;

