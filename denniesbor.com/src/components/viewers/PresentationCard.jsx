import React from 'react';

const PresentationCard = ({ data, onOpenViewer }) => {
  const isWeb = data.type === 'web';

  const handleClick = (e) => {
    if (!isWeb) {
      e.preventDefault();
      onOpenViewer(data);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300">
      
      <div className="flex justify-between items-start mb-4">
        {/* Badge */}
        <span className={`
          text-xs font-bold uppercase tracking-wider px-2 py-1 rounded
          ${isWeb 
            ? 'bg-green-100 text-green-700' 
            : 'bg-red-100 text-red-700'
          }
        `}>
          {isWeb ? 'Web Slides' : 'PDF Document'}
        </span>
        <span className="text-sm text-gray-500 font-italic">
          {data.date}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-800 mb-2">
        {data.title}
      </h3>
      
      {data.subtitle && (
        <h4 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">
          {data.subtitle}
        </h4>
      )}

      {/* Description */}
      <p className="text-gray-600 text-sm leading-relaxed mb-5">
        {data.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {data.tags.map(tag => (
          <span key={tag} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
            #{tag}
          </span>
        ))}
      </div>

      {/* Action Button */}
      <a 
        href={data.link} 
        target="_blank" 
        rel="noopener noreferrer"
        onClick={handleClick}
        className={`
          inline-flex items-center gap-2 text-sm font-bold transition-colors
          ${isWeb ? 'text-green-700 hover:text-green-900' : 'text-red-700 hover:text-red-900'}
        `}
      >
        <i className={isWeb ? "fas fa-desktop" : "fas fa-file-pdf"}></i>
        {isWeb ? 'Launch Presentation' : 'Open Viewer'}
        <i className="fas fa-arrow-right text-xs ml-1"></i>
      </a>
    </div>
  );
};

export default PresentationCard;