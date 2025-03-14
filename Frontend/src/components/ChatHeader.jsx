import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../store/ThemeContext';
import { useAuth } from '../store/AuthContext';
import toast from 'react-hot-toast';

const ChatHeader = ({ status }) => {
  const { isDarkTheme } = useTheme();
  const { isLoggedIn, logout } = useAuth();
 
  const navigate = useNavigate();

 
    const {user }=useAuth();

  const handleLogout = () => {
    const reply=window.confirm("Are you sure you want to logout?");
    if(reply){
      logout();
      navigate("/login");
      toast.success("Logged out successfully");
    }    
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div
      className={`flex justify-between items-center font-mono p-4 ${
        isDarkTheme
          ? "bg-gray-800 text-white"
          : "bg-white text-gray-800 "
      }`}
    >
      <button
        className={`${
          isDarkTheme
            ? "bg-gray-700 hover:bg-gray-600"
            : "bg-gray-200 hover:bg-gray-300"
        } text-current font-bold py-2 px-4 rounded`}
      >
        Open Modal
      </button>
      <h1 className="text-xl font-semibold">{status}</h1>
      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <>
            <Link to="/profile">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-600 to-red-600 p-[2px]">
                
              </div>
            </Link>
            <div className="ml-2 bg-gradient-to-r from-gray-500 to-red-500 bg-clip-text text-transparent font-semibold">
            Hello, 
            
            {isLoggedIn && user.userName}
            {!isLoggedIn && "User"}
            </div >
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-gray-600 to-red-600 hover:from-gray-500 hover:to-red-500 text-white transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={handleLogin}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-gray-600 to-red-600 hover:from-gray-500 hover:to-red-500 text-white transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;  