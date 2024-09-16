import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="navLinks">
        <li><NavLink to="/home" activeClassName="active">Home</NavLink></li>
        <li><NavLink to="/discover" activeClassName="active">Discover</NavLink></li>
        <li><NavLink to="/games" activeClassName="active">Games</NavLink></li>
        <li><NavLink to="/grow" activeClassName="active">Grow</NavLink></li>
        <li><NavLink to="/news" activeClassName="active">News</NavLink></li>
        <li><NavLink to="/community" activeClassName="active">Community</NavLink></li>
      </ul>
    </nav>
  );
};

export default NavBar;