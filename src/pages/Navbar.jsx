import React from "react";
import { Link } from "react-router-dom";
import "../assets/navbar.css";

export function Navbar() {
  return (
    <div className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Now Playing
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/top-movies" className="nav-link">
            Top Movies
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/watch-list" className="nav-link">
            My Watch List
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/favorites" className="nav-link">
            My Favorites
          </Link>
        </li>
      </ul>
    </div>
  );
}
