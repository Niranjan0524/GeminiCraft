import { Outlet } from 'react-router-dom';
import Sidebar from '../components/SideBar';

function ChatLayout() {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1">
                <Outlet /> {/* This is where Chat component will render */}
            </div>
        </div>
    );
}

export default ChatLayout;

