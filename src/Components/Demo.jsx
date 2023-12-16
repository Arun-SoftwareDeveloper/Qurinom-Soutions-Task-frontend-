import React, { useState } from "react";
import "../Styles/Demo.css";

const Demo = () => {
  const [projectDescription, setProjectDescription] = useState("");

  const handleDescriptionChange = (e) => {
    setProjectDescription(e.target.value);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Demo Dashboard</h1>
      </header>

      <main className="main">
        <section className="project-section">
          <h2>Project Description</h2>
          <p>
            {" "}
            summary begins with an introductory sentence that states the text's
            title, author and main point of the text as you see it. A summary is
            written in your own words. A summary contains only the ideas of the
            original text. Do not insert any of your own opinions,
            interpretations, deductions or comments into a summary.
          </p>
        </section>

        <section className="about-section">
          <h2>About the Project</h2>
          <p>This is a demo dashboard created using React.</p>
        </section>

        <section className="buttons-section">
          <button className="common-button">How</button>
          <button className="common-button">About</button>
          <button className="common-button">Login</button>
          <button className="common-button">Create Account</button>
        </section>
      </main>
    </div>
  );
};

export default Demo;
