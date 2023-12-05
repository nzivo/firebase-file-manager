// src/components/FileUpload.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { PDFDocument } from "pdf-lib";
import mammoth from "mammoth";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import Header from "./Header";
import AsideBar from "./AsideBar";
import { List, Grid } from "../assets";
import { useTranslation } from "react-i18next";
import { LoadingOutlined } from "@ant-design/icons";
import MobileNav from "./MobileNav";

const FileUpload = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);
  const [pages, setPages] = useState(0);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [isGridView, setIsGridView] = useState(true);
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const isHebrew = i18n.language === "he";

  useEffect(() => {
    // Retrieve userId from localStorage when the component mounts
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const { uid } = JSON.parse(storedUser);
      setUserId(uid);
    }
  }, []);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // You can determine file type and handle accordingly
    if (selectedFile.type === "application/pdf") {
      console.log("pdf");
      try {
        // Use pdf-lib to get the number of pages in the PDF
        const buffer = await selectedFile.arrayBuffer();
        const pdfDoc = await PDFDocument.load(buffer);
        const pdfPages = pdfDoc.getPageCount();
        setPages(pdfPages);
      } catch (error) {
        console.error("Error reading PDF file:", error);
      }
    } else if (
      selectedFile.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      selectedFile.type === "application/msword"
    ) {
      console.log("doc");
      // Handle DOCX and DOC files
      try {
        const reader = new FileReader();
        reader.onload = async (event) => {
          const arrayBuffer = event.target.result;
          const uint8Array = new Uint8Array(arrayBuffer);
          const docContent = new TextDecoder("utf-8").decode(uint8Array);

          // Convert DOCX to HTML using mammoth
          const { value: html } = await mammoth.extractRawText({ arrayBuffer });

          // Count pages based on the structure of HTML converted from DOCX
          const pageCount = countPagesFromDocxHTML(html);
          setPages(pageCount);
          console.log(pageCount);
        };
        reader.readAsArrayBuffer(selectedFile);
      } catch (error) {
        console.error("Error reading DOCX/DOC file:", error);
      }
    } else {
      console.log("image");
      // Handle other file types (images, Word documents, etc.)
      setPages(0); // Set the default value for non-PDF files
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);

    if (droppedFile.type === "application/pdf") {
      try {
        console.log("pdfdrop");
        const reader = new FileReader();
        reader.onload = async (event) => {
          const pdfBuffer = event.target.result;
          const pdfDoc = await PDFDocument.load(pdfBuffer);
          const pdfPages = pdfDoc.getPageCount();
          setPages(pdfPages);
        };
        reader.readAsArrayBuffer(droppedFile);
      } catch (error) {
        console.error("Error reading dropped PDF file:", error);
      }
    } else if (
      droppedFile.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      droppedFile.type === "application/msword"
    ) {
      // Handle DOCX and DOC files
      try {
        console.log("docdrop");
        const reader = new FileReader();
        reader.onload = async (event) => {
          const arrayBuffer = event.target.result;
          const uint8Array = new Uint8Array(arrayBuffer);
          const docContent = new TextDecoder("utf-8").decode(uint8Array);

          // Convert DOCX to HTML using mammoth
          const { value: html } = await mammoth.extractRawText({ arrayBuffer });

          // Count pages based on the structure of HTML converted from DOCX
          const pageCount = countPagesFromDocxHTML(html);
          setPages(pageCount);
        };
        reader.readAsArrayBuffer(droppedFile);
      } catch (error) {
        console.error("Error reading DOCX/DOC file:", error);
      }
    } else {
      console.log("imagedrop");
      setPages(0);
    }
  };

  // Function to count pages from HTML converted from DOCX
  const countPagesFromDocxHTML = (html) => {
    const charCount = html.length;

    // Assuming an average of 400 characters per page (you can adjust this value)
    const charsPerPage = 400;

    // Calculate the estimated page count
    let pageCount = Math.ceil(charCount / charsPerPage);

    pageCount = Math.max(pageCount, 1);

    return pageCount;
  };

  const handleUpload = async () => {
    if (!userId) {
      console.error("UserId not available");
      return;
    }

    const storage = getStorage();
    const storageRef = ref(storage, `files/${userId}/${file.name}`);

    try {
      setIsLoading(true);
      // Upload the file to Firebase Storage
      await uploadBytes(storageRef, file);
      console.log("File uploaded to Storage");

      // Get the download URL
      const downloadURL = await getDownloadURL(storageRef);
      console.log("Download URL obtained:", downloadURL);

      // Store metadata in Firestore (using default database)
      // const filesCollection = collection(db, `files`);
      const filesCollection = collection(db, `files/${userId}/userFiles`);

      const fileData = {
        userId: userId,
        name: file.name,
        pages: pages, // Assuming `pages` is the state that holds the number of pages
        url: downloadURL,
      };

      console.log("uploading", fileData, filesCollection);
      // Add a new document with the file metadata
      await addDoc(filesCollection, fileData);
      console.log("File metadata added to Firestore");

      // Notify analytics (replace with your analytics implementation)
      console.log("File uploaded. Analytics event: FILE_UPLOAD", {
        userId,
        file,
        downloadURL,
      });

      setIsLoading(false);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error uploading file:", error);
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
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-lg">
            <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
              {t("uploadFile")}
            </h1>

            <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Obcaecati sunt dolores deleniti inventore quaerat mollitia?
            </p>

            <form className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
              <p className="text-center text-lg font-medium">
                {t("selectFile")}
              </p>

              <div>
                <label htmlFor="email" className="sr-only">
                  File upload
                </label>

                <div
                  className="relative border border-dashed border-2 border-indigo-600 py-8 rounded-md"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="file-upload"
                    className="z-20 flex flex-col-reverse items-center justify-center w-full h-full cursor-pointer"
                  >
                    <p className="z-10 text-xs font-light text-center text-gray-500">
                      {t("dropFile")}
                    </p>
                    <svg
                      className="z-10 w-8 h-8 text-indigo-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
                    </svg>
                  </label>
                </div>
              </div>

              {/* Display the filename */}
              {file && (
                <p className="text-center text-gray-500 mt-2">{file.name}</p>
              )}

              <div>
                <label htmlFor="password" className="sr-only">
                  Number of Pages
                </label>

                <div className="relative">
                  <input
                    type="number"
                    value={pages}
                    onChange={(e) => setPages(e.target.value)}
                    className="bg-indigo-200 text-indigo-900 w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter number of pages"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleUpload}
                className="block w-full rounded-lg bg-purple-600 px-5 py-3 text-sm font-medium text-white"
              >
                {isLoading ? <LoadingOutlined /> : t("upload")}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FileUpload;
