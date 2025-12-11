import React, { useState } from "react";
import { Link } from "react-router-dom";
import papers from "../../api/papers";
import LivePreviewModal from "../viewers/LivePreviewModal";

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
  const [showModal, setShowModal] = useState(false);

  const getStatusColor = () => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-700 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800";
      case "Revision": return "bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800";
      case "Preprint": return "bg-orange-100 text-orange-700 border-orange-300 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800";
      case "Archived": return "bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700";
      default: return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getRoleColor = () => {
    return role === "Primary Author" 
      ? "bg-green-50 text-green-700 border-green-300 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900" 
      : "bg-blue-50 text-blue-700 border-blue-300 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900";
  };

  return (
    <div className={`p-5 border rounded-lg hover:shadow-md transition-shadow dark:border-gray-700 ${
      featured ? 'bg-blue-50 border-blue-300 dark:bg-blue-900/10 dark:border-blue-800' : 'bg-white border-gray-200 dark:bg-gray-900'
    }`}>
      
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-3">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex-1 leading-tight">{title}</h3>
        <div className="flex gap-2 flex-shrink-0 flex-wrap">
          {status && (
            <span className={`text-xs px-2 py-1 rounded border font-medium ${getStatusColor()}`}>
              {status}
            </span>
          )}
          {role && (
            <span className={`text-xs px-2 py-1 rounded border font-medium ${getRoleColor()}`}>
              {role}
            </span>
          )}
        </div>
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
        {isExpanded ? description : `${description.substring(0, 140)}...`}
        <button 
          onClick={() => setIsExpanded(!isExpanded)} 
          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 ml-1 font-medium hover:underline"
        >
          {isExpanded ? "Show less" : "Read more"}
        </button>
      </div>

      {/* Inline Preview - Only for Featured Articles */}
      {featured && resultsLink && (
        <div className="mb-4 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
          <div className="bg-gray-900 dark:bg-black px-4 py-2 flex items-center justify-between border-b border-gray-800">
            <span className="text-xs font-mono text-gray-300 flex items-center font-semibold">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Live Preview
            </span>
            
            <a 
              href={resultsLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white transition"
              title="Open in new tab"
            >
              <i className="fas fa-external-link-alt text-xs"></i>
            </a>
          </div>
          
          <div className="bg-white dark:bg-gray-800 relative">
            <div className="absolute inset-0 flex items-center justify-center -z-10">
              <i className="fas fa-circle-notch fa-spin text-gray-300 text-2xl"></i>
            </div>
            
            <iframe
              src={resultsLink}
              className="w-full h-[400px] bg-white"
              title={`${title} Preview`}
              allow="accelerometer; gyroscope; fullscreen"
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            />
          </div>
        </div>
      )}
      
      <div className="flex gap-2 flex-wrap items-center mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
        
        {resultsLink && resultsType === "internal" && (
          <Link
            to={resultsLink}
            className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded font-medium transition shadow-sm"
          >
            <i className="fas fa-expand-alt"></i>
            Full Dashboard
          </Link>
        )}
        
        {resultsLink && resultsType === "external" && (
          /* FIX 1: Added missing opening <a> tag */
          <a 
            href={resultsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded font-medium transition shadow-sm"
          >
            <i className="fas fa-expand-alt"></i>
            Full Dashboard
          </a>
        )}

        {/* Floating Preview Button - Only for Non-Featured */}
        {!featured && resultsLink && (
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800 text-xs px-3 py-1.5 rounded font-medium transition"
          >
            <i className="fas fa-eye"></i>
            Quick Preview
          </button>
        )}

        {githubLink && (
          <a 
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 text-xs px-3 py-1.5 rounded font-medium transition ml-auto"
          >
            <i className="fab fa-github"></i>
            Code
          </a>
        )}

        {paperLink && paperLink !== "NA" && (
          /* FIX 2: Added missing opening <a> tag */
          <a 
            href={paperLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 text-xs px-3 py-1.5 rounded font-medium transition"
          >
            <i className="fas fa-file-alt"></i>
            Paper
          </a>
        )}
      </div>

      {/* Floating Modal - Only for Non-Featured */}
      {!featured && showModal && resultsLink && (
        <LivePreviewModal 
          url={resultsLink} 
          title={title} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </div>
  );
};

const ResearchHighlights = () => {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white border-b pb-3 dark:border-gray-800">
        Research Highlights
      </h2>
      <div className="space-y-6">
        {papers.map((research, index) => (
          <ResearchHighlight key={index} {...research} />
        ))}
      </div>
    </div>
  );
};

export default ResearchHighlights;