import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navigation = ({ toggleSidebar }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-[#F8F9FA] w-full relative z-50 border-b border-gray-200 md:border-none">
      
      {/* --- LEFT SIDE: Mobile Menu + Desktop Home --- */}
      <div className="flex items-center">
        {/* Mobile Hamburger */}
        <button 
          className="md:hidden p-2 text-gray-600 hover:text-blue-600 focus:outline-none" 
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
        </button>

        {/* Desktop Home Link */}
        <Link to="/" className="hidden md:flex items-center ml-4 text-gray-700 hover:text-blue-600 font-medium">
          <i className="fas fa-home mr-2 text-lg"></i>
          Home
        </Link>
      </div>
      
      {/* --- CENTER/RIGHT: Desktop Navigation --- */}
      <div className="hidden md:flex items-center ml-auto space-x-8">
        <Link to="/portfolio" className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors">
          <i className="fas fa-briefcase mr-2 text-lg"></i>
          Portfolio
        </Link>
        <Link to="/presentations" className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors">
          <i className="fas fa-chalkboard-teacher mr-2 text-lg"></i>
          Presentations
        </Link>
        <Link to="/thoughts" className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors">
          <i className="fas fa-lightbulb mr-2 text-lg"></i>
          Thoughts
        </Link>
        <Link to="/resume" className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors">
          <i className="fas fa-file-pdf mr-2 text-lg"></i>
          Resume
        </Link>
      </div>

      {/* --- RIGHT SIDE: Mobile Profile Button --- */}
      {location.pathname === "/" && (
        <button
          className="md:hidden flex items-center p-2 text-blue-600 hover:text-blue-800 focus:outline-none"
          onClick={toggleSidebar}
          aria-label="Toggle Profile"
        >
          <span className="text-sm font-bold mr-2">Profile</span>
          <i className="fas fa-user-circle text-2xl"></i>
        </button>
      )}
      
      {/* --- MOBILE DROPDOWN MENU --- */}
      <div
        className={`absolute top-full left-0 w-full bg-white shadow-lg border-b border-gray-100 md:hidden transition-all duration-300 origin-top transform ${
          isMenuOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
        }`}
      >
        <div className="flex flex-col p-4 space-y-2">
          <Link 
            to="/" 
            className="flex items-center px-4 py-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600" 
            onClick={toggleMenu}
          >
            <i className="fas fa-home w-8 text-center mr-2"></i> Home
          </Link>
          <Link 
            to="/portfolio" 
            className="flex items-center px-4 py-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600" 
            onClick={toggleMenu}
          >
            <i className="fas fa-briefcase w-8 text-center mr-2"></i> Portfolio
          </Link>
          <Link 
            to="/presentations" 
            className="flex items-center px-4 py-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600" 
            onClick={toggleMenu}
          >
            <i className="fas fa-chalkboard-teacher w-8 text-center mr-2"></i> Presentations
          </Link>
          <Link 
            to="/thoughts" 
            className="flex items-center px-4 py-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600" 
            onClick={toggleMenu}
          >
            <i className="fas fa-lightbulb w-8 text-center mr-2"></i> Thoughts
          </Link>
          <Link 
            to="/resume" 
            className="flex items-center px-4 py-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600" 
            onClick={toggleMenu}
          >
            <i className="fas fa-file-pdf w-8 text-center mr-2"></i> Resume
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;