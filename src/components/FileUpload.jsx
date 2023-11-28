// src/components/FileUpload.jsx
import React, { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const FileUpload = ({ userId, onFileUpload }) => {
  const [file, setFile] = useState(null);
  const [pages, setPages] = useState(0);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // You can determine file type and handle accordingly
    // For simplicity, assume all files are PDF for now
    if (selectedFile.type === "application/pdf") {
      // Use a PDF library to get the number of pages (e.g., pdf-lib)
      // Update the 'pages' state
    } else {
      // Handle other file types (images, Word documents, etc.)
    }
  };

  const handleUpload = async () => {
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
    onFileUpload({ file: file.name, pages, downloadURL });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <input
        type="number"
        value={pages}
        onChange={(e) => setPages(e.target.value)}
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
