import React, { useState } from "react";
import { Link } from "react-router-dom";
import papers from "../../api/papers"; // Adjust import path if needed

const ResearchHighlight = ({
  title,
  description,
  githubLink,
  paperLink,
  status,
  role,
  featured,
  resultsLink,
  resultsType,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const getStatusColor = () => {
    switch (status) {
      case "Active":
        return "green";
      case "Revision":
        return "blue";
      case "Preprint":
        return "orange";
      case "Archived":
        return "gray";
      default:
        return "black";
    }
  };

  const getRoleColor = () => {
    return role === "Primary Author" ? "green" : "blue";
  };

  return (
    <div className={`flex flex-col space-y-2 p-4 border-b border-gray-200 last:border-0 ${
      featured ? 'bg-blue-50 border-2 border-blue-200 rounded-lg mb-2' : ''
    }`}>
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-bold capitalize">{title}</h3>
        {role && (
          <span 
            className="text-xs px-2 py-1 rounded border ml-2 whitespace-nowrap"
            style={{ 
              color: getRoleColor(), 
              borderColor: getRoleColor(),
              backgroundColor: role === "Primary Author" ? "#f0fdf4" : "#eff6ff"
            }}
          >
            {role}
          </span>
        )}
      </div>

      <p className="text-justify">
        {isExpanded ? description : `${description.substring(0, 100)}... `}
        <button onClick={toggleDescription} className="text-blue-600 ml-2">
          {isExpanded ? "Less" : "More"}
        </button>
      </p>
      
      <div className="flex justify-between items-center text-sm flex-wrap gap-2">
        <span style={{ color: getStatusColor() }} className="italic font-semibold">
          {status}
        </span>
        
        <div className="flex gap-2 flex-wrap items-center">
          {/* Interactive Dashboard - Internal */}
          {resultsLink && resultsType === "internal" && (
            <Link
              to={resultsLink}
              className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <i className="fas fa-chart-line"></i>
              <span>Explore Interactive Dashboard</span>
              <i className="fas fa-arrow-right ml-1 transform group-hover:translate-x-1 transition-transform"></i>
            </Link>
          )}
          
          {/* Interactive Dashboard - External */}
          {resultsLink && resultsType === "external" && (
            <a
              href={resultsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <i className="fas fa-chart-line"></i>
              <span>Explore Interactive Dashboard</span>
              <i className="fas fa-external-link-alt ml-1 text-xs"></i>
            </a>
          )}

          {/* GitHub Link */}
          {githubLink && (
            <a 
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-900 border border-gray-300 hover:border-gray-400 px-3 py-1 rounded transition"
            >
              <i className="fab fa-github"></i>
              <span className="text-xs">Code</span>
            </a>
          )}

          {/* Paper Link */}
          {paperLink && paperLink !== "NA" && (
            <a
              href={paperLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-900 border border-gray-300 hover:border-gray-400 px-3 py-1 rounded transition"
            >
              <i className="fas fa-file-alt"></i>
              <span className="text-xs">Paper</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const ResearchHighlights = () => {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6 text-center border-b pb-3">Research Highlights</h2>
      <div className="space-y-2">
        {papers.map((research, index) => (
          <ResearchHighlight key={index} {...research} />
        ))}
      </div>
    </div>
  );
};

export default ResearchHighlights;