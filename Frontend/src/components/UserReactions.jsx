
import { useState } from "react";

//before icons:
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { LuCopy } from "react-icons/lu";

//after icons:
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { TfiReload } from "react-icons/tfi";
import { IoCopy } from "react-icons/io5";

const UserReaction = ({content,role}) => {
  const [buttons] = useState([
    { id: 1, label: "Copy" },
    { id: 2, label: "Retry" },
    { id: 3, label: "Dislike" },
  ]);

const [iconsState, setIconsState] = useState({like: false, dislike: false, copy: false, retry: false});

const handleIconClick = (icon) => {
    setIconsState((prevState) => {
      const newState = { ...prevState, [icon]: !prevState[icon] };
      if (icon === 'like' && newState.like) {
        newState.dislike = false;
      } else if (icon === 'dislike' && newState.dislike) {
        newState.like = false;
      }
      return newState;
    });
  }

  const handleCopy = async (text, index) => {
    handleIconClick('copy');  
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };


  return (
    <>
      <div className="flex items-center justify-start space-x-2 mt-5 "> 
        <div className="relative group">
        <button
        className="p-1  text-white rounded-full hover:bg-gray-800 transition-colors"
        title="Liked"
        aria-label="Copy to Text..."
        onClick={() => { handleIconClick('like') }}
        >
        {iconsState.like === false ? <AiOutlineLike className="h-4 w-4" /> : <AiFillLike className="h-4 w-4" />}
        </button>
        <span className="absolute bottom-full mb-1 hidden group-hover:block text-xs text-white bg-black p-1 rounded">Like</span>
      </div>
      <div className="relative group">
        <button
        className="p-1  text-white rounded-full hover:bg-gray-800 transition-colors"
        title="Dislike to Rewind"
        aria-label="Dislike to Rewind"
        onClick={() => { handleIconClick('dislike') }}
        >
        {iconsState.dislike === false ? <AiOutlineDislike className="h-4 w-4" /> : <AiFillDislike className="h-4 w-4" />}
        </button>
        <span className="absolute bottom-full mb-1 hidden group-hover:block text-xs text-white bg-black p-1 rounded">Dislike</span>
      </div>
      <div className="relative group">
        <button
        className="p-1  text-white rounded-full hover:bg-gray-800 transition-colors"
        title="Copy to Text..."
        aria-label="Copy to Text..."
        onClick={() => { handleCopy(content) }}
        
        >
        {iconsState.copy === false ? <LuCopy className="h-4 w-4" /> : <IoCopy className="h-4 w-4" />}
        </button>

        {iconsState.copy===false? <span className="absolute bottom-full mb-1 hidden group-hover:block text-xs text-white bg-black p-1 rounded">Copy</span>:<span className="absolute bottom-full mb-1 hidden group-hover:block text-xs text-white bg-black p-1 rounded">Copied</span>}
      </div>
      <div className="relative group">
        <button
        className="p-1  text-white rounded-full hover:bg-gray-800 transition-colors"
        title="Try Again"
        aria-label="Try Again"
        onClick={() => { handleIconClick('retry') }}
        >
        <TfiReload className="h-4 w-4" />
        </button>
        <span className="absolute bottom-full mb-1 hidden group-hover:block text-xs text-white bg-black p-1 rounded">Retry</span>
      </div>
      </div>
    </>
    );
};

export default UserReaction;
