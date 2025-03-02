import { BrowserRouter ,Routes,Route } from 'react-router-dom';
import ChatLayout from './layout/chatLayout';
import Chat from './components/chat';
import { ChatProvider } from './store/chatContext';
import { ThemeProvider } from './store/themeContext';
import Profile from './components/Profile';
import { AuthProvider } from './store/authContext';
import Login from './components/Login';
import Signup from './components/Signup';
import { Toaster } from 'react-hot-toast';

function App() {
  console.log("backend url", import.meta.env.VITE_BACKEND_URL);
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <ChatProvider>
            <div>
              <Toaster />
              <Routes>
                <Route path="/" element={<ChatLayout />}>
                  <Route path="/conversation/:id" element={<Chat />} />
                  <Route path="/" element={<Chat />} />
                </Route>
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </div>
          </ChatProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
