import React from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ isGridView, Grid, List, toggleView }) => {
  const storedUser = localStorage.getItem("user");
  const navigate = useNavigate();
  const user = storedUser ? JSON.parse(storedUser) : null;
  // Extract the part before '@' from the email
  const userName = user?.email.split("@")[0];

  // Function to handle logout
  const handleLogout = () => {
    // Clear user from localStorage
    localStorage.removeItem("user");
    // Add additional logic for redirecting or any other actions on logout

    navigate("/signin");
  };
  return (
    <header className="fixed right-0 top-0 left-60 bg-indigo-50 py-3 px-4 h-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <button
              type="button"
              onClick={toggleView}
              className="flex items-center focus:outline-none rounded-lg text-gray-600 hover:text-indigo-600 focus:text-indigo-600 font-semibold p-2 border border-transparent hover:border-indigo-300 focus:border-indigo-300 transition"
            >
              <img
                src={isGridView ? Grid : List}
                alt={isGridView ? "Grid View" : "List View"}
                className="cursor-pointer h-[20px] px-4"
              />
              <span className="text-sm">
                {isGridView ? " GridView" : " ListView"}
              </span>
            </button>
          </div>
          {/* display @username */}
          <div className="text-lg font-bold">@{userName}</div>
          <div>
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center focus:outline-none rounded-lg text-gray-600 hover:text-indigo-600 focus:text-indigo-600 font-semibold p-2 border border-transparent hover:border-indigo-300 focus:border-indigo-300 transition"
            >
              <span className="text-sm">Logout</span>
              <span className="inline-flex items-center justify-center w-6 h-6 text-gray-600 text-xs rounded bg-white transition ml-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  className="bi bi-chevron-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
