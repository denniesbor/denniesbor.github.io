// src/components/Profile.jsx
import React from "react";
import avatar from "../assets/avatar.jpg"; // replace with your actual avatar path

const Profile = () => {
  return (
    <div className="flex flex-col items-center p-8 bg-[#F8F9FA]">
      <img
        src={avatar}
        alt="Profile"
        className="rounded-full w-32 h-32 md:w-24 md:h-24"
      />
      <p className="font-computer-modern">PhD Student in Space Sciences</p>
      <div className="flex space-x-4 mt-4">
        <a
          href="https://twitter.com/your-username"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500"
        >
          <i className="fab fa-twitter"></i>
        </a>
        <a
          href="https://linkedin.com/in/your-profile"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700"
        >
          <i className="fab fa-linkedin"></i>
        </a>
        <a
          href="https://github.com/your-username"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black"
        >
          <i className="fab fa-github"></i>
        </a>
      </div>
    </div>
  );
};

export default Profile;
