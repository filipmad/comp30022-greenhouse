import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <nav className="navbar">
      <ul className="navLinks">
        <li><NavLink to="/home" activeclassname="active">Home</NavLink></li>
        <li><NavLink to="/discover" activeclassname="active">Discover</NavLink></li>
        <li><NavLink to="/games" activeclassname="active">Games</NavLink></li>
        <li><NavLink to="/grow" activeclassname="active">Grow</NavLink></li>
        <li><NavLink to="/news" activeclassname="active">News</NavLink></li>
        <li><NavLink to="/community" activeclassname="active">Community</NavLink></li>
      </ul>
    </nav>
  );
};