import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";
import FileUpload from "./components/FileUpload";
import useAuth from "./hooks/useAuth";

function App() {
  const user = useAuth();

  return (
    <div className="w-full">
      <Router>
        <Routes>
          {/* Redirect to upload-file if user exists in local storage */}
          {user ? (
            <>
              <Route path="/" element={<Navigate to="/upload-file" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/upload-file" element={<FileUpload />} />
            </>
          ) : (
            <Route path="/signup" element={<SignUp />} />
          )}
          <Route path="*" element={<SignIn />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
