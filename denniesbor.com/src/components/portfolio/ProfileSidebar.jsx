import React, { useEffect } from "react";
import avatar from "../../assets/avatar.jpg";
import ResearchHighlights from "../portfolio/ResearchHighlights";
import HorizontalBar from "../common/HorizontalBar";
import { Link } from "react-router-dom";

const ProfileSidebar = ({ isOpen, toggleSidebar }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-100 p-8 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 custom-width md:h-auto overflow-y-auto`}
    >
      <button
        className="md:hidden absolute top-4 right-4 text-2xl font-bold"
        onClick={toggleSidebar}
      >
        <i className="fas fa-times"></i>
      </button>
      <div className="md:sticky top-0">
        <img
          src={avatar}
          alt="Profile"
          className="rounded-full w-32 h-32 md:w-24 md:h-24 mx-auto mb-4"
        />
        <HorizontalBar />
        <p className="text-justify mt-4 leading-loose">
          Computational scientist specializing in Earth systems modeling, geospatial analysis, 
          and space weather impacts. Ph.D. candidate at George Mason University developing 
          physics-based models to quantify socio-economic risks from infrastructure failures.
          <br />
          <br />
          Research combines computational physics, signal processing, econometric modeling, 
          and geospatial algorithms to solve complex problems in critical infrastructure 
          resilience. Advised by{" "}
          <a
            href="https://www.linkedin.com/in/edwardoughton"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
          >
            Dr. Edward Oughton
          </a>.
          <br />
          <br />
          Core expertise: Python scientific computing, spatial analysis (GIS/remote sensing), 
          numerical methods, and high-performance computing. Experienced deploying scalable 
          research infrastructure on cloud platforms (AWS, GCP) and building reproducible 
          scientific workflows.
        </p>
        <div className="flex space-x-4 mt-4 mb-4 justify-center">
          <a
            href="https://twitter.com/bordennies"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black-500 social-link"
            title="Twitter"
          >
            <i className="fab fa-twitter"></i>
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
        <HorizontalBar />
        <div className="mt-4 text-center">
          <Link
            to="/resume"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            <i className="fas fa-file-pdf mr-2"></i>
            View Resume
          </Link>
        </div>
        <HorizontalBar />
        <ResearchHighlights />
      </div>
    </div>
  );
};

export default ProfileSidebar;