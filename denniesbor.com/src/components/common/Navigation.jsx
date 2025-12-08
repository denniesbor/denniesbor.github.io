import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navigation = ({ toggleSidebar }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-[#F8F9FA] w-full relative">
      <div className="flex items-center">
        <button className="md:hidden flex items-center" onClick={toggleMenu}>
          <i className="fas fa-bars mr-2"></i>
        </button>
        <Link to="/" className="hidden md:flex items-center ml-4">
          <i className="fas fa-home mr-2"></i>
          Home
        </Link>
      </div>
      
      {/* Desktop Navigation - Right Side */}
      <div className="hidden md:flex items-center ml-auto space-x-4">
        <Link to="/portfolio" className="flex items-center">
          <i className="fas fa-briefcase mr-2"></i>
          Portfolio
        </Link>
        <Link to="/presentations" className="flex items-center">
          <i className="fas fa-chalkboard-teacher mr-2"></i>
          Presentations
        </Link>
        <Link to="/thoughts" className="flex items-center">
          <i className="fas fa-lightbulb mr-2"></i>
          Thoughts
        </Link>
        <Link to="/resume" className="flex items-center">
          <i className="fas fa-file-pdf mr-2"></i>
          Resume
        </Link>
      </div>
      
      {/* Mobile Menu Dropdown */}
      <div
        className={`absolute top-16 left-0 bg-white shadow-lg rounded-lg p-4 md:hidden w-full transition-transform duration-300 ease-in-out z-50 ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <Link to="/" className="block py-2" onClick={toggleMenu}>
          <i className="fas fa-home mr-2"></i>
          Home
        </Link>
        <Link to="/portfolio" className="block py-2" onClick={toggleMenu}>
          <i className="fas fa-briefcase mr-2"></i>
          Portfolio
        </Link>
        <Link to="/presentations" className="block py-2" onClick={toggleMenu}>
          <i className="fas fa-chalkboard-teacher mr-2"></i>
          Presentations
        </Link>
        <Link to="/thoughts" className="block py-2" onClick={toggleMenu}>
          <i className="fas fa-lightbulb mr-2"></i>
          Thoughts
        </Link>
        <Link to="/resume" className="block py-2" onClick={toggleMenu}>
          <i className="fas fa-file-pdf mr-2"></i>
          Resume
        </Link>
        {location.pathname === "/" && (
          <button
            className="block py-2 w-full text-left"
            onClick={() => {
              toggleMenu();
              toggleSidebar();
            }}
          >
            <i className="fas fa-user mr-2"></i>
            Profile
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;