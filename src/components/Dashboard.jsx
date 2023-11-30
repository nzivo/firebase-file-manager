import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Img, PDF, Doc, List, Grid } from "../assets";
import Header from "./Header";
import AsideBar from "./AsideBar";
import { useTranslation } from "react-i18next";
import { LoadingOutlined } from "@ant-design/icons";
import MobileNav from "./MobileNav";

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isGridView, setIsGridView] = useState(true);
  const { t, i18n } = useTranslation();
  const isHebrew = i18n.language === "he";

  useEffect(() => {
    // Retrieve userId from localStorage when the component mounts
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const { uid } = JSON.parse(storedUser);
      setUserId(uid);
    }
  }, []);

  useEffect(() => {
    const fetchFiles = async () => {
      // Check if userId is available before making the query
      if (userId) {
        try {
          setIsLoading(true);
          const filesCollection = collection(db, `files/${userId}/userFiles`);
          const filesSnapshot = await getDocs(filesCollection);
          const filesData = filesSnapshot.docs.map((doc) => doc.data());
          setFiles(filesData);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching files:", error);
        }
      }
    };

    fetchFiles();
  }, [userId]);

  // Function to get file image based on file extension
  const getFileImage = (filename) => {
    const fileExtension = filename?.split(".").pop();
    switch (fileExtension?.toLowerCase()) {
      case "pdf":
        return PDF;
      case "doc":
      case "docx":
        return Doc;
      default:
        return Img;
    }
  };

  // Toggle between grid and list views
  const toggleView = () => {
    setIsGridView((prevIsGridView) => !prevIsGridView);
  };

  return (
    <div>
      <Header
        isGridView={isGridView}
        Grid={Grid}
        List={List}
        toggleView={toggleView}
      />
      <AsideBar />

      <main className={`${isHebrew ? "md:mr-60" : "md:ml-60"} max-h-screen`}>
        <MobileNav />
        <div className="px-6">
          <div className="max-w-4xl mx-auto overflow-y-hidden mt-12">
            <div className="bg-white rounded-3xl p-8 mb-5">
              {isLoading ? (
                <LoadingOutlined />
              ) : files.length === 0 ? (
                <p className="text-center text-gray-500 font-semibold">
                  {t("zeroFiles")}
                </p>
              ) : isGridView ? (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
                  {files.map((file) => (
                    <div
                      key={file.name}
                      className="p-4 bg-white border rounded-xl text-gray-800 space-y-2 items-center"
                    >
                      <img
                        src={getFileImage(file.name)}
                        alt="Safsar X"
                        className="h-[70px] mx-auto"
                      />
                      <p className="font-bold whitespace-normal whitespace-pre-line text-center">
                        {file.name.replace(/_/g, "\n")}
                      </p>
                      <p className="text-center">
                        <span className="font-bold">{t("pages")}: </span>
                        {file.pages}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-4 w-full">
                  <ul className="w-full">
                    {files.map((file) => (
                      <li
                        className="p-4 bg-white border rounded-xl text-gray-800 space-y-2 flex flex-row mb-4"
                        key={file.name}
                      >
                        {/* Column 1: Image */}
                        <div className="flex-shrink-0">
                          <img
                            src={getFileImage(file.name)}
                            alt="Safsar X"
                            className="h-[30px] mx-auto"
                          />
                        </div>

                        {/* Column 2: Title */}
                        <div className="flex-grow pl-4">
                          {/* Display truncated filename on mobile devices */}
                          <p className="font-bold whitespace-nowrap overflow-hidden overflow-ellipsis sm:hidden">
                            {file.name.substring(0, 10)}...
                          </p>

                          {/* Display full filename on larger devices */}
                          <p className="font-bold hidden sm:block">
                            {file.name}
                          </p>
                        </div>

                        {/* Column 3: Page Numbers */}
                        <div className="flex-shrink-0">
                          <p>
                            <span className="font-bold">{t("pages")}: </span>
                            {file.pages}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
