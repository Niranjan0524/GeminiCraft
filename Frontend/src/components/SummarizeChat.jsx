

import { MdSummarize } from "react-icons/md";
import { useAuth } from "../store/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SummaryView from "./SummaryView";

const SummarizeChat = ({ id }) => {

  console.log("SummarizeChat component rendered with id:", id);
  const { user, isLoggedIn, token } = useAuth();
  const navigate = useNavigate();
  const [summarizeStatus, setSummarizeStatus] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSummarize = (id) => {
    console.log("Summarizing chat id: ", id);
    const toastId = toast.loading("Summarizing chat...");


    if (isLoggedIn) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat/summarize/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Summary data:", data);
          toast.success(data.message, { id: toastId });
          setSummarizeStatus(true);
        })
        .catch((err) => {
          console.log("Error summarizing chat", err);
          toast.error("Error in Summarizing chat, Please try after some time", {
            id: toastId,
          });
        });

      const toastId2 = toast.loading("Getting user summary...");
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/summary`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("user Summary", data);
          toast.success("user Summary fetched", { id: toastId2 });
          setSummarizeStatus(true);
           toast.success("Please Refresh The Page");
        })
        .catch((err) => {
          console.log("Error getting user summary", err);
          toast.error("Error getting user summary", { id: toastId2 });
         
        });
    } else {
      toast.error("Please Login to summarize chat", { id: toastId });
      navigate("/login");
    }
  };

  const handleViewSummary = () => {
    console.log("Viewing Summary of chat id: ", id);
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (user && user.summaries) {
      const summary = user.summaries.find((conv) => conv.conversationId === id);
      setMessage(summary ? summary.data : "");
    }
  }, [id, user.summaries, summarizeStatus]);

  return (
    <>
      { !summarizeStatus && 
      user?.summaries?.find((conv) => conv.conversationId === id) 
      ? (
        <div>
          <button
            className="border border-red-300 shadow-md rounded-lg p-6 relative px-6 py-2 text-lg font-bold text-grey bg-gradient-to-r from-grey-400 to-red-900 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
            onClick={handleViewSummary}
          >
            <div className="flex">
              <MdSummarize className="h-6 w-6 mr-2" />
              View Summary
            </div>
          </button>

          {isOpen && (
            <SummaryView
              message={message}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          )}
        </div>
      ) : (
        <button
          className="border border-red-300 shadow-md rounded-lg p-6 relative px-6 py-2 text-lg font-bold text-grey bg-gradient-to-r from-grey-400 to-red-900 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
          onClick={() => {
            handleSummarize(id);
          }}
        >
          <div className="flex">
            <MdSummarize className="h-6 w-6 mr-2" />
            Summarize
          </div>
        </button>
      )}
    </>
  );
};

export default SummarizeChat;