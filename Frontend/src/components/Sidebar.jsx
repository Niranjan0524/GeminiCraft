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

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:3000/api/conversation');
        const data = await response.json();

        // Access the conversations array from the data object
        setConversations(Array.isArray(data.conversations) ? data.conversations : []);
      } catch (error) {
        console.error("Error loading conversations:", error);
        setConversations([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConversations();
  }, []); // Empty dependency array so it only runs once on mount

  // const conversations = [
  //   { id: 1, title: "React Components Discussion" },
  //   { id: 2, title: "Tailwind CSS Styling" },
  //   { id: 3, title: "API Integration Help" },
  // ];

  return (
    <div className={`bg-gray-900 text-white h-screen ${isCollapsed ? 'w-16' : 'w-64'} 
      transition-all duration-300 ease-in-out relative flex flex-col`}>
      
      {/* Header with Collapse Button */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        {!isCollapsed && <span className="font-semibold">Gemini Chat</span>}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`${isCollapsed ? 'mx-auto' : ''} bg-gray-700 rounded-lg p-2 hover:bg-gray-600 transition-colors`}
        >
          {isCollapsed ? 
            <ChevronRightIcon className="h-4 w-4" /> : 
            <ChevronLeftIcon className="h-4 w-4" />
          }
        </button>
      </div>

      {/* New Chat Button */}
      <div className="p-4">
        <Link to="/" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 
          rounded-lg p-3 transition-colors duration-200">
          <PlusIcon className="h-5 w-5" />
          {!isCollapsed && <span>New Chat</span>}
        </Link>
      </div>

      {/* Conversations List */}
      <div className="flex-1 px-2 overflow-y-auto">
        <h2 className={`text-gray-400 text-xs uppercase px-2 mb-2 
          ${isCollapsed ? 'hidden' : 'block'}`}>
          Recent Conversations
        </h2>
        {isLoading ? (
          <div className="text-gray-400 text-sm px-2">Loading...</div>
        ) : conversations.length > 0 ? (
          conversations.map((chat) => (
            <Link
              key={chat._id}
              to={`/conversation/${chat._id}`}
              className="flex items-center gap-2 px-2 py-3 rounded-lg hover:bg-gray-800 
                transition-colors duration-200 mb-1"
            >
              <ChatBubbleLeftRightIcon className="h-5 w-5 text-gray-400" />
              {!isCollapsed && (
                <span className="truncate">{chat.title}</span>
              )}
            </Link>
          ))
        ) : (
          <div className="text-gray-400 text-sm px-2">No conversations yet</div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-gray-800">
        <div className="space-y-2">
          <button className="flex items-center gap-2 w-full px-2 py-3 rounded-lg 
            hover:bg-gray-800 transition-colors duration-200">
            <Cog6ToothIcon className="h-5 w-5 text-gray-400" />
            {!isCollapsed && <span>Settings</span>}
          </button>
          <button className="flex items-center gap-2 w-full px-2 py-3 rounded-lg 
            hover:bg-gray-800 transition-colors duration-200">
            <ArrowLeftOnRectangleIcon className="h-5 w-5 text-gray-400" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;