import React, { useEffect } from "react";
import avatar from "../assets/avatar.jpg";
import ResearchHighlights from "./ResearchHighlights";
import HorizontalBar from "./HorizontalBar";

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
          A Ph.D. student in Earth Systems and Geoinformation Sciences at George
          Mason University, Fairfax, Virginia. My study focuses on modeling
          socio-economic impacts from critical infrastructure (power, satellite
          systems, and aviation) failure due to adverse space weather
          activities.
          <br />
          <br />
          The research takes a multi-disciplinary approach, integrating
          physics-based heliospheric models, geophysical ground conductivity
          models, and econometric modeling complemented by geospatial
          algorithms. The research is supervised and advised by{" "}
          <a
            href="https://www.linkedin.com/in/edwardoughton"
            target="_blank"
            rel="no opener noreferrer"
            className="text-blue-600 hover:text-blue-800"
          >
            Dr. Edward Oughton
          </a>
          <br />
          <br />
          Other research interests include web-based GIS, spatial statistics,
          hyperspectral imaging, and geospatial systems modeling. Apart from my
          academic pursuits, I am a proficient Python developer and a data
          analyst with R.
          <br />
          <br />I also have intermediate skills in JavaScript development,
          particularly for spatial cloud computing, with an emphasis on building
          spatial data lakes and deploying GIS projects as web applications.
          This blend of academic research and practical technical expertise
          defines my multifaceted approach in tackling complex problems.
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
        <ResearchHighlights /> {/* Research Highlights component */}
      </div>
    </div>
  );
};

export default ProfileSidebar;
