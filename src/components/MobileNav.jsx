import React from "react";
import { Link } from "react-router-dom";
import { Dashboard, Upload } from "../assets";
import LanguageToggle from "./LanguageToggle";

const MobileNav = () => {
  return (
    <div className="flex md:hidden my-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <Link
              className="flex items-center hover:bg-indigo-200 rounded-xl font-bold text-sm text-indigo-900 py-3 px-4"
              to="/dashboard"
            >
              <img src={Dashboard} alt="Safsar X" className=" h-[18px] pr-4" />
            </Link>
          </div>
          {/* display @username */}
          <div className="text-lg font-bold">
            <Link
              className="flex items-center hover:bg-indigo-200 rounded-xl font-bold text-sm text-indigo-900 py-3 px-4"
              to="/upload-file"
            >
              <img src={Upload} alt="Safsar X" className=" h-[18px] pr-4" />
            </Link>
          </div>
          <div>
            <LanguageToggle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
