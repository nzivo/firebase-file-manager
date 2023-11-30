import React from "react";
import { Link } from "react-router-dom";
import { Dashboard, Upload } from "../assets";

const AsideBar = () => {
  return (
    <aside className="fixed inset-y-0 left-0 bg-white shadow-md max-h-screen w-60">
      <div className="flex flex-col justify-between h-full">
        <div className="flex-grow">
          <div className="px-4 py-6 text-center border-b">
            <h1 className="text-xl font-bold leading-none">
              <span className="text-indigo-700">Firebase File Manager</span> App
            </h1>
          </div>
          <div className="p-4">
            <ul className="space-y-1">
              <li>
                <Link
                  className="flex items-center hover:bg-indigo-200 rounded-xl font-bold text-sm text-indigo-900 py-3 px-4"
                  to="/dashboard"
                >
                  <img
                    src={Dashboard}
                    alt="Safsar X"
                    className=" h-[18px] pr-4"
                  />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/upload-file"
                  className="flex bg-white hover:bg-indigo-200 rounded-xl font-bold text-sm text-gray-900 py-3 px-4"
                >
                  <img src={Upload} alt="Safsar X" className=" h-[18px] pr-4" />
                  Upload File
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AsideBar;
