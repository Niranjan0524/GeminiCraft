import { Link } from 'react-router-dom';
import { useTheme } from '../store/themeContext';

const ChatHeader = ({ status }) => {
  const { isDarkTheme } = useTheme();

  return (
    <div className={`flex justify-between items-center font-mono p-4 ${
      isDarkTheme ? 'bg-gray-900 text-white' : 'bg-white text-gray-800 border-b border-gray-200'
    }`}>
      <button className={`${
        isDarkTheme 
          ? 'bg-gray-700 hover:bg-gray-600' 
          : 'bg-gray-200 hover:bg-gray-300'
        } text-current font-bold py-2 px-4 rounded`}>
        Open Modal
      </button>
      <h1 className="text-xl font-semibold">{status}</h1>
      <div className="flex items-center">
        <Link to="/profile">
        <img
          src="/ProfilePic.png"
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
        </Link>
        <span className=" text-xl ml-2 bg-gradient-to-r from-gray-500 to-red-500 bg-clip-text text-transparent font-semibold">
          Hello, Niranjan
        </span>
      </div>
    </div>
  );
};

export default ChatHeader;  