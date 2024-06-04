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
          <i className="fas fa-bars mr-2"></i> {/* Bars icon */}
        </button>
        <Link to="/" className="hidden md:flex items-center ml-4">
          <i className="fas fa-home mr-2"></i> {/* Home icon */}
          Home
        </Link>
      </div>
      <div className="hidden md:flex items-center ml-auto">
        <Link to="/thoughts" className="flex items-center ml-4">
          <i className="fas fa-lightbulb mr-2"></i> {/* Thoughts icon */}
          Thoughts
        </Link>
      </div>
      <div
        className={`absolute top-16 left-0 bg-white shadow-lg rounded-lg p-4 md:hidden w-full transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <Link to="/" className="block py-2" onClick={toggleMenu}>
          <i className="fas fa-home mr-2"></i> {/* Home icon */}
          Home
        </Link>
        <Link to="/thoughts" className="block py-2" onClick={toggleMenu}>
          <i className="fas fa-lightbulb mr-2"></i> {/* Thoughts icon */}
          Thoughts
        </Link>
        {location.pathname === "/" && (
          <button
            className="block py-2 w-full text-left"
            onClick={() => {
              toggleMenu();
              toggleSidebar();
            }}
          >
            <i className="fas fa-user mr-2"></i> {/* Profile icon */}
            Profile
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
