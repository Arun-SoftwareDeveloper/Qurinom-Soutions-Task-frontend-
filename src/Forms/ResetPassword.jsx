import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import "../FormStyles/ResetPasswordForm.css";
import backendApi from "../BackendAPi";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
    resetToken: resetToken,
  });

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Validation
    let valid = true;
    const newErrors = { password: "", confirmPassword: "", resetToken: "" };

    // Password validation
    if (!password.trim()) {
      valid = false;
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      valid = false;
      newErrors.password = "Password must be at least 6 characters";
    }

    // Confirm Password validation
    if (!confirmPassword.trim()) {
      valid = false;
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (confirmPassword !== password) {
      valid = false;
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Reset Token validation
    if (!resetToken.trim()) {
      valid = false;
      newErrors.resetToken = "Reset Token is required";
    }

    setErrors(newErrors);

    if (!valid) {
      return;
    }

    try {
      // Make API request to reset password
      const response = await axios.post(`${backendApi}/resetPassword`, {
        resetToken: resetToken, // Include the reset token
        password,
      });

      // Handle success, e.g., display success message
      toast.success("Password reset successful", { position: "top-right" });
    } catch (error) {
      // Handle error, e.g., display error message
      toast.error("Error resetting password. Please try again.", {
        position: "top-right",
      });
      console.error("Error resetting password:", error);
    }
  };

  return (
    <div className="reset-container cotainer mt-4">
      <form className="auth-form">
        <label>
          Reset Token:
          <input
            type="text"
            value={resetToken}
            onChange={(e) => setResetToken(e.target.value)}
          />
          {errors.resetToken && (
            <div className="invalid-feedback">{errors.resetToken}</div>
          )}
        </label>
        <label>
          New Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`form-control ${errors.password && "is-invalid"}`}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </label>
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`form-control ${errors.confirmPassword && "is-invalid"}`}
          />
          {errors.confirmPassword && (
            <div className="invalid-feedback">{errors.confirmPassword}</div>
          )}
        </label>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleResetPassword}
        >
          Reset Password
        </button>
        <p>
          Remember your password? <Link to="/login">Login</Link>
        </p>

        {/* Toast Container */}
        <ToastContainer />
      </form>
    </div>
  );
};

export default ResetPassword;
