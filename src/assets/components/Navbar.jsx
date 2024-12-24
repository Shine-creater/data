import React from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <nav className="navbar">
   <div className="navbar-container">
        <Link to="/" className="navbar-brand">MyApp</Link>
        <ul className="navbar-links">
          <li><Link to="/" className="navbar-link">Create Post</Link></li>
          <li><Link to="/all" className="navbar-link">All Post</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
