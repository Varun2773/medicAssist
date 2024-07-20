import React from "react";
import { Outlet, Link } from "react-router-dom";
import Home from "./Home";

function Head() {
  return (
    <>
      <div className="heading">
        <h1>
          Medic<br></br>Assist.
        </h1>
        <nav className="nav">
          <Link className="links" to="/">
            <p> Home</p>
          </Link>
        </nav>
      </div>
      <div className="container">
        <button className="cus-btn">
          <Link className="links" to="/image">
            <p>Image</p>
          </Link>
        </button>

        <button className="cus-btn">
          <Link className="links" to="/chat">
            <p>Text</p>
          </Link>
        </button>
      </div>

      <Outlet />
      <p className="footer">Crafted by Varun Mathiyalagan ©️ 2024</p>
    </>
  );
}

export default Head;
