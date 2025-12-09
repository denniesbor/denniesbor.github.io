import React, { useEffect } from "react";
import avatar from "../../assets/avatar.jpg";
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
      className={`fixed top-0 left-0 h-full transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 custom-width md:h-auto z-50 md:z-0`}
    >
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 -z-10"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar content */}
      <div className="h-full md:py-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6 h-full md:h-auto md:sticky md:top-4 md:max-h-[calc(100vh-2rem)] overflow-y-auto">
          
          {/* Close button for mobile */}
          <button
            className="md:hidden absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            onClick={toggleSidebar}
          >
            <i className="fas fa-times"></i>
          </button>

          {/* Profile Image */}
          <img
            src={avatar}
            alt="Profile"
            className="rounded-full w-24 h-24 mx-auto mb-4 border-2 border-gray-200"
          />

          {/* Name/Title */}
          <h3 className="text-center font-bold text-lg mb-4 text-gray-800">
            Dennies Bor
          </h3>

          {/* Bio */}
          <div className="text-sm text-gray-600 leading-relaxed space-y-3 mb-4">
            <p>
              Computational scientist specializing in Earth systems modeling, geospatial analysis, 
              and space weather impacts. Ph.D. candidate at George Mason University developing 
              physics-based models to quantify socio-economic risks from infrastructure failures.
            </p>
            <p>
              Research combines computational physics, signal processing, econometric modeling, 
              and geospatial algorithms. Advised by{" "}
              <a
                href="https://www.linkedin.com/in/edwardoughton"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                Dr. Edward Oughton
              </a>.
            </p>
            <p>
              Core expertise: Python scientific computing, spatial analysis (GIS/remote sensing), 
              numerical methods, and high-performance computing.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-4 mb-4 pb-4 border-b border-gray-200">
            <a
              href="https://twitter.com/bordennies"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-500 transition"
              title="Twitter"
            >
              <i className="fab fa-twitter text-xl"></i>
            </a>
            
            <a
              href="https://ke.linkedin.com/in/denniesbor"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-700 transition"
              title="LinkedIn"
            >
              <i className="fab fa-linkedin text-xl"></i>
            </a>
            
            <a
              href="https://github.com/denniesbor"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition"
              title="GitHub"
            >
              <i className="fab fa-github text-xl"></i>
            </a>
            
            <a
              href="https://scholar.google.com/citations?hl=en&user=mnet84cAAAAJ"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-red-600 transition"
              title="Google Scholar"
            >
              <i className="fas fa-graduation-cap text-xl"></i>
            </a>
          </div>

          {/* Resume Button */}
          <Link
            to="/resume"
            className="block text-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-semibold"
          >
            <i className="fas fa-file-pdf mr-2"></i>
            View Resume
          </Link>

        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;