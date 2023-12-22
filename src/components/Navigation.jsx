import React from "react";
import { Link } from "react-router-dom"; // Import Link

const Navigation = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-[#F8F9FA] w-full">
      {/* Left-aligned link */}
      <Link to="/" className="flex items-center">
        <i className="fas fa-home mr-2"></i> {/* Home icon */}
        Home
      </Link>

      {/* Right-aligned link */}
      <Link to="/thoughts" className="flex items-center">
        <i className="fas fa-lightbulb mr-2"></i> {/* Thoughts icon */}
        Thoughts
      </Link>
    </nav>
  );
};

export default Navigation;
