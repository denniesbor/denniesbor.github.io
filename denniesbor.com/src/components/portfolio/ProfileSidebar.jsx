import React, { useEffect } from "react";
// Image import removed as requested
import { Link } from "react-router-dom";

const ProfileSidebar = ({ isOpen, toggleSidebar }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    // Cleanup to ensure scrolling is restored if component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed top-0 left-0 h-full transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 custom-width md:h-auto z-50 md:z-0`}
    >
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 -z-10"
          onClick={toggleSidebar}
        />
      )}

      <div className="h-full md:py-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6 h-full md:h-auto md:sticky md:top-4 md:max-h-[calc(100vh-2rem)] overflow-y-auto">
          <button
            className="md:hidden absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            onClick={toggleSidebar}
          >
            <i className="fas fa-times"></i>
          </button>

          {/* Updated Source to static path */}
          <img
            src="/profile.jpg"
            alt="Dennies Bor"
            className="rounded-full w-24 h-24 mx-auto mb-4 border-2 border-gray-200"
          />

          <h3 className="text-center font-bold text-lg mb-4 text-gray-800">
            Dennies Bor
          </h3>

          <div className="text-sm text-gray-600 leading-relaxed space-y-3 mb-4">
            <p>
              Computational scientist at George Mason University working on
              infrastructure resilience and space weather impacts. Develops
              physics-based models combining numerical methods, signal
              processing, and economic analysis to quantify cascading risks in
              critical systems.
            </p>
            <p>
              Research spans computational physics (particle dynamics, PDEs),
              geospatial computing (LiDAR, GIS), econometric modeling
              (Input-Output, CGE), and full-stack scientific computing. Advised
              by{" "}
              {/* Fixed broken anchor tag */}
              <a
                href="https://www.linkedin.com/in/edwardoughton"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                Dr. Edward Oughton
              </a>
              .
            </p>
            <p>
              Technical stack: Python scientific computing, React/Go web
              development, AWS deployment, numerical optimization (Pyomo,
              IPOPT), and high-performance computing.
            </p>
          </div>

          <div className="flex justify-center space-x-4 mb-4 pb-4 border-b border-gray-200">
            {/* Fixed broken anchor tags below */}
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