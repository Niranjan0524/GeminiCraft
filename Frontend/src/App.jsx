import { BrowserRouter ,Routes,Route } from 'react-router-dom';
import ChatLayout from './layout/chatLayout';
import Chat from './components/chat';

function App() {
  return (
  <>
    <BrowserRouter>
        <div>
        <Routes>          
          <Route path="/" element={<ChatLayout />} >
            <Route path="/" element={< Chat/>} />
            <Route path="/conversation/:id" element={< Chat/>} />
          </Route>
        </Routes>
        </div>
    </BrowserRouter>
  </>
  );
}

export default App;
