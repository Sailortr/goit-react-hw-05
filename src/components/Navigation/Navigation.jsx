import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
  return (
    <nav className="navbar">
      <h1 className="logo"> GoIT React Movies Project</h1>
      <ul className="nav-links">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/movies"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default Navigation;
