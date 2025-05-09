import { useState } from 'react';
import { useTheme } from '../store/ThemeContext';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeftIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon 
} from '@heroicons/react/24/outline';
import { useAuth } from '../store/AuthContext';
import { useContext } from 'react';
import { ChatContext } from '../store/ChatContext';


const Profile = () => {
    const { isDarkTheme } = useTheme();
    const [isEditing, setIsEditing] = useState(false);
    const [error,setError]=useState("");
   
    // const user=JSON.parse(localStorage.getItem("user"))||{name:"User"};
    const {user}=useAuth();
    const {chats}=useContext(ChatContext);
    
    console.log("user in profile section",user);   

    const [profileData, setProfileData] = useState({
      name: user.name || "user",
      email: user.email || "user@gmail.com",
      userName: user.userName || "newUser_default",
      preferredModel: "gemini-1.5-pro",
      totalChats:chats.length>0? chats.length:0,
      joinedDate: "Feb 2025",
    });
    const [editedData, setEditedData] = useState({...profileData});
    const navigate = useNavigate();
    const { logout,setUser } = useAuth();

    const handleEdit = () => {
        setIsEditing(true);
        setEditedData({...profileData});
    };

    const handleSave = () => {
        
        const token=localStorage.getItem('token')||null;
      
        if (editedData.userName !== user.userName) {
          fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/edit`, {
            method: "PUT",
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(editedData),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              if (data.success) {
                setIsEditing(false);
                setProfileData({ ...editedData });
                localStorage.setItem("user",JSON.stringify(editedData));  
                setUser(data.user);                  
              } else {
                console.log(data.message);
                setError(data.message);
              }
            })
            .catch((err) => {
              console.log(err);
              setError("Something went wrong");
            });
        } else {
          setIsEditing(false);
        }
        
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedData({...profileData});
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };


 

    return (
        <div className={`min-h-screen ${
            isDarkTheme ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-800'
        }`}>
            {/* Header */}
            <div className={`${
                isDarkTheme ? 'bg-gray-800' : 'bg-white'
            } p-4 shadow-lg`}>
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-gray-300">
                        <ArrowLeftIcon className="h-5 w-5" />
                        <span>Back to Chat</span>
                    </Link>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-500 to-red-500 bg-clip-text text-transparent">
                        Profile Settings
                    </h1>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-gray-600 to-red-600 hover:from-gray-500 hover:to-red-500 text-white transition-all duration-200 transform hover:scale-105 shadow-lg"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto mt-8 p-4">
                <div className={`${
                    isDarkTheme ? 'bg-gray-800' : 'bg-white'
                } rounded-lg shadow-xl p-6`}>
                    
                    {/* Profile Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <div className={`h-20 w-20 rounded-full bg-gradient-to-r from-gray-600 to-red-600 p-[2px]`}>
                                <div className={`h-full w-full rounded-full flex items-center justify-center text-2xl font-bold ${
                                    isDarkTheme ? 'bg-gray-800' : 'bg-white'
                                }`}>
                                    {/* {profileData.name} */}
                                </div>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">{user.name}</h2>
                                <p className={`${
                                    isDarkTheme ? 'text-gray-400' : 'text-gray-600'
                                }`}>
                                    {profileData.email}
                                </p>
                            </div>
                        </div>
                        {!isEditing ? (
                            <button
                                onClick={handleEdit}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-gray-600 to-red-600 hover:from-gray-500 hover:to-red-500 text-white transition-all duration-200 transform hover:scale-105 shadow-lg"
                            >
                                <PencilIcon className="h-5 w-5" />
                                Edit Profile
                            </button>
                        ) : (
                            <div className="flex gap-2">
                                <button
                                    onClick={handleSave}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-gray-600 to-red-600 hover:from-gray-500 hover:to-red-500 text-white transition-all duration-200 transform hover:scale-105 shadow-lg"
                                >
                                    <CheckIcon className="h-5 w-5" />
                                    Save
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white transition-all duration-200 transform hover:scale-105 shadow-lg"
                                >
                                    <XMarkIcon className="h-5 w-5" />
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Profile Details */}
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Profile Fields */}
                            <div className={`p-4 rounded-lg ${
                                isDarkTheme ? 'bg-gray-700' : 'bg-gray-50'
                            }`}>
                                <label className="block text-sm font-medium mb-2">Username</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editedData.userName}
                                        onChange={(e) => setEditedData({...editedData, userName: e.target.value})}
                                        className={`w-full p-2 rounded-md ${
                                            isDarkTheme 
                                                ? 'bg-gray-700 text-white' 
                                                : 'bg-white text-gray-800'
                                        } border border-gray-600 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200`}
                                    />
                                ) : (
                                    <p className="text-lg">{profileData.userName}</p>
                                )}
                            </div>

                            <div className={`p-4 rounded-lg ${
                                isDarkTheme ? 'bg-gray-700' : 'bg-gray-50'
                            }`}>
                                <label className="block text-sm font-medium mb-2">Preferred Model</label>
                                {isEditing ? (
                                    <select
                                        value={editedData.preferredModel}
                                        onChange={(e) => setEditedData({...editedData, preferredModel: e.target.value})}
                                        className={`w-full p-2 rounded-md ${
                                            isDarkTheme 
                                                ? 'bg-gray-700 text-white' 
                                                : 'bg-white text-gray-800'
                                        } border border-gray-600 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200`}
                                    >
                                        <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
                                        <option value="gemini-1.5-flash">Gemini 1.5 Flash</option>
                                        <option value="gemini-1.5-flash-8B">Gemini 1.5 Flash 8B</option>
                                    </select>
                                ) : (
                                    <p className="text-lg">{profileData.preferredModel}</p>
                                )}
                            </div>
                        </div>

                        {/* Stats Section */}
                        <div className={`mt-8 grid grid-cols-2 gap-4 p-4 rounded-lg ${
                            isDarkTheme ? 'bg-gray-700' : 'bg-gray-50'
                        }`}>
                            <div>
                                <h3 className="text-sm font-medium mb-1">Total Chats</h3>
                                <p className="text-2xl font-bold">{profileData.totalChats}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium mb-1">Member Since</h3>
                                <p className="text-2xl font-bold">{profileData.joinedDate}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile; 