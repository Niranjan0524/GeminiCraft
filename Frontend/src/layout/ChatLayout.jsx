import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function ChatLayout() {

    return (
      <div className="flex">
        <Sidebar  />

        <div className="flex-1">
          <main>
            <Outlet /> {/* This is where Chat component will render */}
          </main>
        </div>
      </div>
    );
}

export default ChatLayout;

