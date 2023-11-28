import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Dashboard = ({ userId }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const filesCollection = collection(db, `files/${userId}/userFiles`);
      const filesSnapshot = await getDocs(filesCollection);
      const filesData = filesSnapshot.docs.map((doc) => doc.data());
      setFiles(filesData);
    };

    fetchFiles();
  }, [userId]);

  return (
    <div>
      <h2>User Dashboard</h2>
      <ul>
        {files.map((file) => (
          <li key={file.name}>
            {file.name} - Pages: {file.pages}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
