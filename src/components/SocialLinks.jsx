// src/components/SocialLinks.jsx
import React from "react";

const SocialLinks = () => {
  return (
    <div className="text-center py-8">
      <h2 className="text-xl mb-4">Connect with Me</h2>
      <div className="flex justify-center space-x-6">
        <a
          href="https://linkedin.com/in/your-profile"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-linkedin fa-2x"></i>
        </a>
        <a
          href="https://github.com/your-username"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-github fa-2x"></i>
        </a>
        <a href="mailto:your.email@example.com">
          <i className="fas fa-envelope fa-2x"></i>
        </a>
        {/* Add more social links as needed */}
      </div>
    </div>
  );
};

export default SocialLinks;
