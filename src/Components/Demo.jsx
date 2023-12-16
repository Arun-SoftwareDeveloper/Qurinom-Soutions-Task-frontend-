import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Demo.css";

function Demo() {
  return (
    <div className="demo-container container mt-4">
      <div className="row">
        <div className="col-md-12">
          <div className="col-md-4 mb-3">
            <Link to="/" className="btn btn-primary btn-block">
              Create Account
            </Link>
          </div>
          <div className="col-md-4 mb-3">
            <Link to="/login" className="btn btn-primary btn-block">
              Login
            </Link>
          </div>
          <div className="col-md-4 mb-3">
            <span className="btn btn-primary btn-block">Dashboard</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Demo;
