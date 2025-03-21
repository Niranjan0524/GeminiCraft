import { MdOutlineCancelPresentation } from "react-icons/md";
import { useTheme } from "../store/ThemeContext";
import ReactMarkdown from "react-markdown";
import React from "react";

const SummaryView = ({ message, isOpen, setIsOpen }) => {
  const { isDarkTheme } = useTheme();

  return (
    <>
      {isOpen && (
        <div className="fixed  inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
          <div
            className={`relative p-6 rounded-lg shadow-lg max-w-xl h-96 overflow-hidden ${
              isDarkTheme
                ? "bg-gray-800 text-gray-100"
                : "bg-white text-gray-900"
            }`}
          >
            <div className="absolute top-0 left-0 right-0 p-4 bg-opacity-90 z-10 flex justify-between items-center border-b border-gray-700">
              <h2 className="text-lg font-semibold">Summary</h2>
              <button
                onClick={() => setIsOpen(false)}
                className={`p-2 rounded-md ${
                  isDarkTheme
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-300 text-gray-800 hover:bg-gray-400"
                }`}
              >
                <MdOutlineCancelPresentation className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-16 mb-4 p-4 overflow-y-auto h-[calc(100%-4rem)]">
              <ReactMarkdown>{message}</ReactMarkdown>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SummaryView;
