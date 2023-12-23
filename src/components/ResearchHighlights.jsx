import React, { useState } from "react";
import papers from "../data/papers.json";

const ResearchHighlight = ({
  title,
  description,
  githubLink,
  paperLink,
  status,
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
      case "Archived":
        return "gray";
      default:
        return "black";
    }
  };

  return (
    <div className="flex flex-col space-y-2 p-4">
      <h3 className="text-lg font-bold capitalize">{title}</h3>
      <p className="text-justify">
        {isExpanded ? description : `${description.substring(0, 100)}... `}
        <button onClick={toggleDescription} className="text-blue-600 ml-2">
          {isExpanded ? "Less" : "More"}
        </button>
      </p>
      <div className="flex justify-evenly items-center text-sm">
        <span style={{ color: getStatusColor() }} className="italic">
          {status}
        </span>
        <div>
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 mr-2 italic"
            >
              GitHub
            </a>
          )}
          {paperLink !== "NA" && (
            <a
              href={paperLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 italic"
            >
              Paperlink
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
      {" "}
      {/* Ensure full width of the parent */}
      <h2 className="text-xl mb-4 text-center">Research Highlights</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {papers.map((research, index) => (
          <div
            key={index}
            className={`flex flex-1 ${
              index % papers.length !== papers.length - 1
                ? "border-r border-gray-300"
                : ""
            }`}
          >
            <ResearchHighlight {...research} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResearchHighlights;
