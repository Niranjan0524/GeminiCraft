import { BrowserRouter ,Routes,Route } from 'react-router-dom';
import ChatLayout from './layout/chatLayout';
import Chat from './components/chat';
import { ChatProvider } from './store/chatContext';
import { ThemeProvider } from './store/themeContext';
import Profile from './components/Profile';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ChatProvider>
          <div>
            <Routes>
              <Route path="/" element={<ChatLayout />}>
                <Route path="/conversation/:id" element={<Chat />} />
                <Route path="/" element={<Chat />} />                
              </Route>
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </ChatProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
