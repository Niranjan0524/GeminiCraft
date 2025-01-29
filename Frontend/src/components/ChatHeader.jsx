
const ChatHeader =({status})=>{

  return (
    <>
      <div className="flex justify-between items-center font-mono p-4 bg-gray-900 text-white">
        <button className="bg-gray-700 hover:bg-Gray-900 text-white font-bold py-2 px-4 rounded">
          Open Modal
        </button>
        <h1 className="text-xl font-semibold">{status}</h1>
        <div className="flex items-center">
          <img
            src="/ProfilePic.png"
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <span className="ml-2">Niranjan</span>
        </div>
      </div>
    </>
  );
}

export default ChatHeader;  