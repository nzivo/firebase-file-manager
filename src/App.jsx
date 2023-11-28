import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";
import "./App.css";
import FileUpload from "./components/FileUpload";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload-file" element={<FileUpload />} />
        {/* Specify a default route for the root path */}
        <Route path="/" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
