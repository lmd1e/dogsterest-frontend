import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Создайте этот файл для стилей

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/liked" className="navbar-link">Liked Posts</Link>
      </div>
    </nav>
  );
};

export default Navbar;