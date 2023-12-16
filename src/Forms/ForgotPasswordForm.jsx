import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../FormStyles/ForgotPasswordForm.css";
import backendApi from "../BackendAPi";

function ForgotPasswordForm() {
  const [formData, setFormData] = useState({
    email: "",
  });

  const [validationError, setValidationError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setValidationError(""); // Clear validation error when input changes
  };

  const handleForgotPasswordForm = async (e) => {
    e.preventDefault();

    // Simple input validations
    let isValid = true;
    const newValidationError = {};

    if (!formData.email) {
      newValidationError.email = "Email is required";
      isValid = false;
    }

    if (!isValid) {
      setValidationError(newValidationError.email);
      return;
    }

    try {
      const response = await axios.post(
        `${backendApi}/forgotPassword`,
        formData
      );

      if (response.status === 404) {
        toast.error("Not a registered user");
      } else if (response.status === 200) {
        toast.success("Reset link sent successfully. Check your email.");
      } else if (response.status === 404) {
        toast.error("User not found");
      }
    } catch (error) {
      toast.error("Internal Server Error");
    }
  };

  return (
    <div className="forgotPasswordForm-container container mt-4">
      <div className="row">
        <div className="col-md-12">
          <form className="form-group" onSubmit={handleForgotPasswordForm}>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              className={`form-control ${validationError && "is-invalid"}`}
              placeholder="enter your email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {validationError && (
              <div className="invalid-feedback">{validationError}</div>
            )}
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
            <p>Check your mail</p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ForgotPasswordForm;
