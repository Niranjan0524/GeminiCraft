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
import { ChatContext } from '../store/ChatContext';
import { useContext } from 'react';
import TitleComponent from './TitleComponent';
import { MdDelete } from "react-icons/md";
import { FaToggleOff } from "react-icons/fa6";
import { FaToggleOn } from "react-icons/fa6";
import { useTheme } from '../store/ThemeContext';
import { useAuth } from '../store/AuthContext';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [conversations, setConversations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { isDarkTheme, toggleTheme } = useTheme();
    const [notification,setNotification] =useState("")
    const {isLoggedIn,token,logout} = useAuth();
    const navigate= useNavigate();
  const {chats,addAllChats,addChat,deleteChat,deleteAllChats,updateChat}=useContext(ChatContext);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };


  const handleDelete = (id) => {
    console.log("Deleteing: ",id);
    console.log("Token inside handleDelete:",token);
    // showNotification("Chat Deleted");
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/conversation/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
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
        console.log("Token inside fetchConversations:",token);
        if(!token || token === null){
          console.log("Token not found");
          deleteAllChats();        
          setConversations([]);
          
          return ;
        }
        else{
          

      
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/conversation`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        console.log("Data from the server in sidebar:",data);
        addAllChats(data.conversations);   
      }
      } catch (error) {
        console.error("Error loading conversations:", error);
        setConversations([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConversations();
  }, [token]); 

  const [showSettings, setShowSettings] = useState(false);

  const handleThemeChange = () => {
    toggleTheme();
  };


  const handleProfile=()=>{
    console.log("Profile clicked");
    if(isLoggedIn){
      navigate("/profile");
    }
    else
    {
      navigate("/login");
    }
  }

  const handleDashboard=()=>{
    console.log("Dashboard clicked");
    if(isLoggedIn){
      navigate("/dashboard");
    }
  }

  const handleLogout=()=>{
    console.log("Loggin Out");
    const reply =window.confirm("Are you sure you want to logout?");
    if(reply){
      logout();
      navigate("/login");
    }
    else{
      console.log("Cancelled");
      
    }
  }


  return (
    <div
      className={`${
        isDarkTheme
          ? "bg-gradient-to-b from-gray-800 to-gray-900 text-white"
          : "bg-gradient-to-b from-white-200 to-gray-800 text-gray-900"
      } h-[100.3vh] ${
        isCollapsed ? "w-16" : "w-120"
      }  relative flex flex-col font-mono max-w-[38rem] transition-opacity duration-800 ease-in `}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!isCollapsed && (
          <span className="font-semibold text-3xl bg-gradient-to-r from-gray-500 to-red-500 bg-clip-text text-transparent">
            ChatNova
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
            <div className="flex items-center" key={chat._id}>
              <Link
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
        
        <div className="space-y-2">
        
          <button
            className="flex items-center gap-2 w-full px-2 py-3 rounded-lg 
            hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-600 transition-colors duration-200"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Cog6ToothIcon className="h-5 w-5 text-gray-400" />
            {!isCollapsed && <span>Settings</span>}
          </button>
            {chats.length>0 ?
             <div>
          
          <button
            className="flex items-center gap-2 w-full px-2 py-3 rounded-lg 
            hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-600 transition-colors duration-200"
            onClick={handleDashboard}
          >
            <Cog6ToothIcon className="h-5 w-5 text-gray-400" />
            {!isCollapsed && <span>Dashboard</span>}
            {!isCollapsed && (
              <span className=" ml-auto px-3 py-1 text-xs font-bold text-white uppercase rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 shadow-md hover:shadow-lg transition-shadow ">
                New
              </span>
            )}
          </button>
          
            <button
              className="flex items-center gap-2 w-full px-2 py-3 rounded-lg 
            hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-600 transition-colors duration-200"
              onClick={handleLogout}
            >
              <ArrowLeftOnRectangleIcon className="h-5 w-5 text-gray-400" />

              {!isCollapsed && <span>Logout</span>}
            </button>
          </div>:
          <div> </div>
          }
          </div>
      </div>
      {showSettings && (
        <div
          className={`absolute right-0 bottom-16 ${
            isDarkTheme
              ? "bg-gray-800 text-gray-100"
              : "bg-gray-100 text-gray-800"
          } rounded-lg shadow-lg p-4 w-48`}
        >
          <ul className="space-y-2">
            <li
              className={`${
                isDarkTheme ? "hover:bg-gray-700" : "hover:bg-gray-200"
              } p-2 rounded`}
            >
              <div className="flex justify-between">
                Theme
                <div className="flex" onClick={handleThemeChange}>
                  {isDarkTheme ? (
                    <FaToggleOn size={25} />
                  ) : (
                    <FaToggleOff size={25} />
                  )}
                </div>
              </div>
            </li>

            <li
              className={`${
                isDarkTheme ? "hover:bg-gray-700" : "hover:bg-gray-200"
              } p-2 rounded`}
              onClick={handleProfile}
            >
              Profile
            </li>

            <li
              className={`${
                isDarkTheme ? "hover:bg-gray-700" : "hover:bg-gray-200"
              } p-2 rounded`}
            >
              <a
                href="https://github.com/Niranjan0524/GeminiCraft"
                target="_blank"
              >
                Contribute
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sidebar;