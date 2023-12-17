import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import RegisterForm from "./Forms/RegisterForm";
import LoginForm from "./Forms/LoginForm";
import ForgotPasswordForm from "./Forms/ForgotPasswordForm";
import ResetPasswordForm from "./Forms/ResetPassword";
import Dashboard from "./Components/DashBoard";
import Demo from "./Components/Demo";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setUser(storedUser);
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }, []);

  const handleLogin = (userData) => {
    console.log("User logged in:", userData);
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      setUser(null);
      localStorage.removeItem("user");
      toast.error("User Logout");
    }
  };

  return (
    <div>
      <Router>
        <Routes>
          {" "}
          <Route path="/" element={<Demo />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/forgotPassword" element={<ForgotPasswordForm />} />
          <Route path="/resetPassword" element={<ResetPasswordForm />} />
          {user ? (
            <Route
              path="/dashboard"
              element={<Dashboard user={user} onLogout={handleLogout} />}
            />
          ) : (
            <Route path="/dashboard" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
