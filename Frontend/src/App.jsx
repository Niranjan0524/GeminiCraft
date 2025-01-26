import { BrowserRouter ,Routes,Route } from 'react-router-dom';
import ChatLayout from './layout/chatLayout';
import Chat from './components/chat';
import { ChatProvider } from './store/chatContext';

function App() {
  return (
    <>
      <BrowserRouter>
        <ChatProvider>
          <div>
            <Routes>
              <Route path="/" element={<ChatLayout />}>
                <Route path="/conversation/:id" element={<Chat />} />
                <Route path="/" element={<Chat />} />
              </Route>
            </Routes>
          </div>
        </ChatProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
