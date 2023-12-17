import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Demo.css";

const Demo = () => {
  const [username, setUsername] = useState("User");

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a href="#home" className="nav-link btn">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a href="#about" className="nav-link btn">
                About
              </a>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link btn">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link btn">
                Create Account
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div id="home" className="container mt-4">
        <h2>Welcome, {username}!</h2>
        <p>
          Welcome to our project! We're excited to have you on board. Feel free
          to explore and make the most of our dashboard. If you have any
          questions or need assistance, don't hesitate to reach out. Happy
          navigating!
        </p>
      </div>

      <div id="about" className="container mt-4">
        <h2>About Project</h2>
        <p>
          Explore a dynamic project management experience with our demo website.
          Users can seamlessly log in, create accounts, and navigate a
          feature-rich dashboard reminiscent of Jira sprints. The drag-and-drop
          task board empowers users to effortlessly add, edit, and delete cards.
          Enjoy the flexibility of adding information in various formats,
          including text, PDF, and more. Visit our live demo on Netlify and
          access the complete codebase on GitHub for an immersive hands-on
          experience.
        </p>
      </div>

      <div className="links container mt-4">
        <span>Frontend Source Code - </span>
        <a
          href="https://github.com/Arun-SoftwareDeveloper/Qurinom-Soutions-Task-frontend-"
          target="_blank"
          rel="noopener noreferrer"
        >
          Click Here
        </a>
        <div>
          <span>Backend Source Code - </span>
          <a
            href="https://github.com/Arun-SoftwareDeveloper/Qurinom-Solutions-Task-backend-"
            target="_blank"
            rel="noopener noreferrer"
          >
            Click Here
          </a>
        </div>
        <div>
          <span>Frontend Deploy Link - </span>
          <a
            href="https://sparkling-duckanoo-700a1b.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Click Here
          </a>
        </div>
        <div>
          <span>Backend Deploy Link - </span>
          <a
            href="https://qurinom-solutions-backend.onrender.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Click Here
          </a>
        </div>
      </div>
    </div>
  );
};

export default Demo;
