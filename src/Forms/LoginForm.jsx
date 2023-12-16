import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../FormStyles/LoginForm.css";

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:4000/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, redirectTo } = response.data;
        onLogin({ email, token, redirectTo: "/" });
        toast.success(`User Logged in`);

        navigate("/dashboard");
      } else {
        setError(
          response.data.message || "Invalid credentials. Please try again."
        );
        toast.error(error, { position: toast.POSITION.TOP_RIGHT });
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Please fill these fields");
      toast.error(error, { position: toast.POSITION.TOP_RIGHT });
    }
  };

  return (
    <div className="login-container container mt-5">
      <h2>Login</h2>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email:
        </label>
        <input
          type="text"
          id="email"
          className={`form-control ${error && "is-invalid"}`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password:
        </label>
        <input
          type="password"
          id="password"
          className={`form-control ${error && "is-invalid"}`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
      <button className="btn btn-primary" onClick={handleLogin}>
        Login
      </button>
      <p>
        Don't have an account?{" "}
        <Link to="/">
          {" "}
          <span style={{ color: "dodgerblue" }}>Register</span>
        </Link>
      </p>
      <Link to="/forgotPassword">
        <p>Forgot Password?</p>
      </Link>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
