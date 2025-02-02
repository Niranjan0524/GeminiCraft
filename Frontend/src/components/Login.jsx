import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../store/themeContext';
import { useAuth } from '../store/authContext';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';


const Login = () => {
    const { isDarkTheme } = useTheme();
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            fetch("http://localhost:3000/api/user/login",{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify(formData)
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data);

                if(data.user){
                    login(data);
                    navigate("/");
                }
                else{
                    setError(data.message);
                }
            })
            
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className={`min-h-screen ${
            isDarkTheme ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-800'
        } flex flex-col`}>
            {/* Header */}
            <div className={`${
                isDarkTheme ? 'bg-gray-800' : 'bg-white'
            } p-4 shadow-lg`}>
                <div className="max-w-md mx-auto flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-gray-300">
                        <ArrowLeftIcon className="h-5 w-5" />
                        <span>Back to Chat</span>
                    </Link>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-500 to-red-500 bg-clip-text text-transparent">
                        Welcome Back
                    </h1>
                </div>
            </div>

            {/* Login Form */}
            <div className="flex-1 flex items-center justify-center p-4">
                <div className={`w-full max-w-md ${
                    isDarkTheme ? 'bg-gray-800' : 'bg-white'
                } rounded-lg shadow-xl p-8`}>
                    <div className="mb-8 text-center">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-500 to-red-500 bg-clip-text text-transparent mb-2">
                            GeminiCraft
                        </h2>
                        <p className={`${
                            isDarkTheme ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                            Log In to continue to your account
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="text-red-500 text-sm text-center">
                                {error}
                            </div>
                        )}
                        
                        <div>
                            <label className="block text-sm font-medium mb-2">Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className={`w-full p-3 rounded-lg ${
                                    isDarkTheme 
                                        ? 'bg-gray-700 text-white border-gray-600' 
                                        : 'bg-gray-50 text-gray-800 border-gray-300'
                                } border focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200`}
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Password</label>
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                className={`w-full p-3 rounded-lg ${
                                    isDarkTheme 
                                        ? 'bg-gray-700 text-white border-gray-600' 
                                        : 'bg-gray-50 text-gray-800 border-gray-300'
                                } border focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200`}
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-gray-600 to-red-600 hover:from-gray-500 hover:to-red-500 text-white transition-all duration-200 transform hover:scale-105 shadow-lg font-medium"
                        >
                            Sign In
                        </button>

                        <div className="text-center text-sm">
                            <a href="#" className="text-gray-400 hover:text-red-500">
                                Forgot password?
                            </a>
                        </div>

                        <div className={`text-center text-sm ${
                            isDarkTheme ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-red-500 hover:text-red-400 font-medium">
                                Finally 
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;   