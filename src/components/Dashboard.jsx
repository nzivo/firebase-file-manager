import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Retrieve userId from localStorage when the component mounts
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const { uid } = JSON.parse(storedUser);
      setUserId(uid);
    }
  }, []);
  console.log(userId);

  useEffect(() => {
    const fetchFiles = async () => {
      // Check if userId is available before making the query
      if (userId) {
        try {
          const filesCollection = collection(db, `files/${userId}/userFiles`);
          const filesSnapshot = await getDocs(filesCollection);
          const filesData = filesSnapshot.docs.map((doc) => doc.data());
          setFiles(filesData);
        } catch (error) {
          console.error("Error fetching files:", error);
        }
      }
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
