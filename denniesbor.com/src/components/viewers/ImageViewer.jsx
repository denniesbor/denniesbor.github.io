import React from 'react';

const ImageViewer = ({ url, alt, onNext, onPrev, hasNavigation }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-black/5">
      <img 
        src={url} 
        alt={alt} 
        className="max-h-full max-w-full object-contain shadow-lg"
      />
      
      {hasNavigation && (
        <>
          <button 
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-3 text-gray-500 hover:text-black bg-white/50 hover:bg-white rounded-full transition shadow-sm"
          >
            <i className="fas fa-chevron-left text-2xl"></i>
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 text-gray-500 hover:text-black bg-white/50 hover:bg-white rounded-full transition shadow-sm"
          >
            <i className="fas fa-chevron-right text-2xl"></i>
          </button>
        </>
      )}
    </div>
  );
};

export default ImageViewer;