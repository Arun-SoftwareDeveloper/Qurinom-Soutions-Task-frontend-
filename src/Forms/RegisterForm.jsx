import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../FormStyles/RegisterForm.css";

// ... (imports)

function RegisterForm() {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear validation message when user types
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleRegisterForm = async (e) => {
    e.preventDefault();

    // Simple input validations
    let isValid = true;
    const newValidationErrors = {};

    if (!formData.email) {
      newValidationErrors.email = "Email is required";
      isValid = false;
    }

    if (!formData.firstName) {
      newValidationErrors.firstName = "First name is required";
      isValid = false;
    }

    if (!formData.lastName) {
      newValidationErrors.lastName = "Last name is required";
      isValid = false;
    }

    if (!formData.password) {
      newValidationErrors.password = "Password is required";
      isValid = false;
    }

    if (!isValid) {
      setValidationErrors(newValidationErrors);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/register",
        formData
      );

      if (response.status === 400) {
        toast.error("Incorrect or missing password");
      } else if (response.status === 201) {
        toast.success("Registered successfully");
        navigate("/login");
      } else if (response.status === 409) {
        toast.error("User already exists");
      }
    } catch (error) {
      toast.error("Internal Server Error");
    }
  };

  return (
    <div className="regsiterForm-contianer container mt-4">
      <div className="row">
        <div className="col-md-12">
          <form className="form-group" onSubmit={handleRegisterForm}>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              className={`form-control ${
                validationErrors.email && "is-invalid"
              }`}
              placeholder="enter your email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {validationErrors.email && (
              <div className="invalid-feedback">{validationErrors.email}</div>
            )}

            <label htmlFor="firstName">FirstName:</label>
            <input
              type="text"
              className={`form-control ${
                validationErrors.firstName && "is-invalid"
              }`}
              placeholder="enter your firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            {validationErrors.firstName && (
              <div className="invalid-feedback">
                {validationErrors.firstName}
              </div>
            )}

            <label htmlFor="lastName">LastName:</label>
            <input
              type="text"
              className={`form-control ${
                validationErrors.lastName && "is-invalid"
              }`}
              placeholder="enter your lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
            {validationErrors.lastName && (
              <div className="invalid-feedback">
                {validationErrors.lastName}
              </div>
            )}

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              className={`form-control ${
                validationErrors.password && "is-invalid"
              }`}
              placeholder="enter your password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {validationErrors.password && (
              <div className="invalid-feedback">
                {validationErrors.password}
              </div>
            )}

            <button className="btn btn-primary" type="submit">
              Register
            </button>
            <p>
              If you already have an Account{" "}
              <Link to="/login">
                <span style={{ color: "dodgerblue" }}>Login</span>
              </Link>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default RegisterForm;
