import React from "react";

const ResearchHighlight = ({ title, description, githubLink, paperLink }) => {
  return (
    <div className="flex flex-col space-y-2 p-4">
      <h3 className="text-lg font-bold">{title}</h3>
      <p>{description}</p>
      <div className="flex space-x-4">
        {githubLink && (
          <a href={githubLink} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        )}
        {paperLink && (
          <a href={paperLink} target="_blank" rel="noopener noreferrer">
            Paper
          </a>
        )}
      </div>
    </div>
  );
};

const ResearchHighlights = () => {
  // Example research data
  const researchData = [
    {
      title: "Exoplanet Atmospheres Analysis",
      description:
        "In-depth study of atmospheric compositions of exoplanets using spectroscopy techniques.",
      githubLink: "https://github.com/exoplanet-atmospheres",
      paperLink: "https://exoplanet-atmospheres-paper.com",
      resultImage: "https://link-to-result-image-1.com",
    },
    {
      title: "Dark Matter Distribution Models",
      description:
        "Developing new models for understanding the distribution of dark matter in the universe.",
      githubLink: "https://github.com/dark-matter-models",
      paperLink: "https://dark-matter-models-paper.com",
      resultImage: "https://link-to-result-image-2.com",
    },
    {
      title: "Quantum Entanglement Communication",
      description:
        "Exploring the potential of quantum entanglement for long-distance communication in space.",
      githubLink: "https://github.com/quantum-entanglement-communication",
      paperLink: "https://quantum-entanglement-communication-paper.com",
      resultImage: "https://link-to-result-image-3.com",
    },
    {
      title: "AI for Spacecraft Trajectory Optimization",
      description:
        "Utilizing artificial intelligence to enhance the efficiency of spacecraft trajectory planning.",
      githubLink: "https://github.com/ai-spacecraft-trajectory",
      paperLink: "https://ai-spacecraft-trajectory-paper.com",
      resultImage: "https://link-to-result-image-4.com",
    },
  ];

  return (
    <div className="py-8">
      <h2 className="text-xl mb-4">Research Highlights</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {researchData.map((research, index) => (
          <div
            key={index}
            className="flex border-r border-gray-300 last:border-r-0"
          >
            <ResearchHighlight {...research} />
          </div>
        ))}
      </div>
    </div>
  );
};


export default ResearchHighlights;
