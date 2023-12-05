import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Header = ({ isGridView, Grid, List, toggleView }) => {
  const storedUser = localStorage.getItem("user");
  const { t, i18n } = useTranslation();
  const isHebrew = i18n.language === "he";
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
    <header
      className={`w-full md:w-4.3/5 fixed ${
        isHebrew ? "md:left-0 md:right-60" : "md:right-0 md:left-60"
      } top-0 bg-indigo-50 py-3 px-4 h-16`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <button
              type="button"
              onClick={toggleView}
              className="flex items-center focus:outline-none rounded-lg text-gray-600 hover:text-indigo-600 focus:text-indigo-600 font-semibold p-2 border border-transparent hover:border-indigo-300 focus:border-indigo-300 transition"
            >
              <img
                src={isGridView ? List : Grid}
                alt={isGridView ? "List View" : "Grid View"}
                className="cursor-pointer h-[20px] px-4"
              />
              <span className="text-sm">
                {isGridView ? `${t("listView")}` : `${t("gridView")}`}
              </span>
            </button>
          </div>
          {/* display @username */}
          <div className="text-indigo-600 text-lg font-bold">@{userName}</div>
          <div>
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center focus:outline-none rounded-lg text-gray-600 hover:text-indigo-600 focus:text-indigo-600 font-semibold p-2 border border-transparent hover:border-indigo-300 focus:border-indigo-300 transition"
            >
              <span className="text-sm">{t("logOut")}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
