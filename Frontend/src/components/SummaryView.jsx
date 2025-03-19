import { MdOutlineCancelPresentation } from "react-icons/md";
import { useTheme } from "../store/ThemeContext";

const SummaryView = ({ message, isOpen, setIsOpen }) => {
  const { isDarkTheme } = useTheme();

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className={`p-6 rounded-lg shadow-lg w-96 ${
              isDarkTheme
                ? "bg-gray-800 text-gray-100"
                : "bg-white text-gray-900"
            }`}
          >
            <div className="flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className={`px-4 py-2 rounded-md ${
                  isDarkTheme
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-300 text-gray-800 hover:bg-gray-400"
                }`}
              >
                <MdOutlineCancelPresentation />
              </button>
            </div>
            <h2 className="text-lg font-semibold mb-4">Summary</h2>
            <p className="text-gray-400">{message}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default SummaryView;
