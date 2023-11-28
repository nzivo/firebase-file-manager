// src/components/FileUpload.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { PDFDocument } from "pdf-lib";

const FileUpload = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);
  const [pages, setPages] = useState(0);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

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
      try {
        // Use pdf-lib to get the number of pages in the PDF
        const buffer = await selectedFile.arrayBuffer();
        const pdfDoc = await PDFDocument.load(buffer);
        const pdfPages = pdfDoc.getPageCount();
        setPages(pdfPages);
      } catch (error) {
        console.error("Error reading PDF file:", error);
      }
    } else {
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
    } else {
      setPages(0);
    }
  };

  const handleUpload = async () => {
    if (!userId) {
      console.error("UserId not available");
      return;
    }

    // Upload the file to Firebase Storage
    const storage = getStorage();
    const storageRef = ref(storage, `files/${userId}/${file.name}`);
    await uploadBytes(storageRef, file);

    // Get the download URL
    const downloadURL = await getDownloadURL(storageRef);

    // Notify analytics (replace with your analytics implementation)
    console.log("File uploaded. Analytics event: FILE_UPLOAD", {
      userId,
      file,
    });

    // Callback to parent component
    // onFileUpload({ file: file.name, pages, downloadURL });
    navigate("/dashboard");
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
          Upload File
        </h1>

        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
          sunt dolores deleniti inventore quaerat mollitia?
        </p>

        <form className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
          <p className="text-center text-lg font-medium">
            Select or drag and drop file
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
                  Drag & Drop your files here
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

          <div>
            <label htmlFor="password" className="sr-only">
              Number of Pages
            </label>

            <div className="relative">
              <input
                type="number"
                value={pages}
                onChange={(e) => setPages(e.target.value)}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter number of pages"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleUpload}
            className="block w-full rounded-lg bg-purple-600 px-5 py-3 text-sm font-medium text-white"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default FileUpload;
