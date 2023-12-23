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
      <p className="font-computer-modern text-justify">
        I am a Ph.D. student at George Mason University, Fairfax, Virginia,
        majoring in Earth Systems and Geoinformation Sciences. My studies
        centers on Geospatial Programming and Algorithms, Spatial Statistics,
        Remote Sensing Image Processing, and Dynamic Systems Modeling. My
        current research, advised by{" "}
        <a
          href="https://www.linkedin.com/in/edwardoughton"
          target="_blank"
          className="text-blue-600 hover:text-blue-800"
        >
          Dr. Edward Oughton
        </a>{" "}
        explores the engineering and physics aspects of space weather and the
        economic impacts from critical infrastructure failure, such as
        satellites and power systems, when exposed to adverse space weather.
        Alongside my academic pursuits, I am a proficient Python developer and a
        data analyst with R. Additionally, I am an intermediate JavaScript
        developer, emphasizing building spatial data lakes, spatial cloud
        computing, and deploying GIS projects as web applications. This blend of
        academic research and practical technical expertise defines my
        multifaceted approach to understanding and solving complex spatial
        problems.
      </p>
      <div className="flex space-x-4 mt-4">
        <a
          href="https://twitter.com/bordennies"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black-500 social-link"
          title="Twitter"
        >
          <i className="fa-brands fa-x-twitter"></i>
        </a>
        <a
          href="https://ke.linkedin.com/in/denniesbor"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 social-link"
          title="LinkedIn"
        >
          <i className="fab fa-linkedin"></i>
        </a>
        <a
          href="https://github.com/denniesbor"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black social-link"
          title="GitHub"
        >
          <i className="fab fa-github"></i>
        </a>
        <a
          href="https://scholar.google.com/citations?hl=en&user=mnet84cAAAAJ"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black social-link"
          title="Google Scholar"
        >
          <i className="fas fa-graduation-cap"></i>
        </a>
      </div>
    </div>
  );
};

export default Profile;
