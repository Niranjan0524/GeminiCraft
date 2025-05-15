import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatLayout from "./layout/ChatLayout";
import { ThemeProvider } from "./store/ThemeContext"; // Ensure correct casing
import Profile from "./components/Profile";
import { AuthProvider } from "./store/AuthContext";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Toaster } from "react-hot-toast";
import { ChatProvider } from "./store/ChatContext"; 
import Chat from "./components/Chat";
import Dashboard from "./components/Dashboard";


function App() {

  
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
                <Route path="/dashboard" element={<Dashboard/>}/>
              </Routes>
            </div>
          </ChatProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
