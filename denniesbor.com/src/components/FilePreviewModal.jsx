import React, { useState, useEffect } from "react";
import PdfViewer from "./viewers/PdfViewer";
import ImageViewer from "./viewers/ImageViewer";
import CodeViewer from "./viewers/CodeViewer";
import NotebookViewer from "./viewers/NotebookViewer";

const FilePreviewModal = ({ initialFile, allProjectFiles, onClose }) => {
  const [activeFile, setActiveFile] = useState(initialFile);

  useEffect(() => {
    setActiveFile(initialFile);
  }, [initialFile]);

  // Image Navigation Logic
  const images = allProjectFiles.filter(f => f.type === 'image');
  const currentImageIndex = images.findIndex(img => img.url === activeFile.url);

  const handleNextImage = () => {
    const nextIndex = (currentImageIndex + 1) % images.length;
    setActiveFile(images[nextIndex]);
  };

  const handlePrevImage = () => {
    const prevIndex = (currentImageIndex - 1 + images.length) % images.length;
    setActiveFile(images[prevIndex]);
  };

  if (!activeFile) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={onClose}>
      
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-7xl h-[90vh] flex flex-col overflow-hidden" 
        onClick={e => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 border-b bg-gray-50">
          <div className="flex items-center overflow-hidden">
            <i className={`fas ${activeFile.icon} mr-3 text-lg text-gray-500`}></i>
            <h3 className="text-lg font-bold truncate text-gray-800">{activeFile.name}</h3>
          </div>
          <div className="flex gap-3 ml-4">
            <a 
              href={activeFile.url} 
              download 
              className="flex items-center text-gray-600 hover:text-blue-600 px-3 py-1 border rounded text-sm transition hover:bg-white"
            >
                <i className="fas fa-download mr-2"></i> Download
            </a>
            <button onClick={onClose} className="text-gray-400 hover:text-red-500 text-3xl leading-none px-2">
                &times;
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto bg-gray-100 relative">
            
            {activeFile.type === 'pdf' && <PdfViewer url={activeFile.url} />}

            {activeFile.type === 'notebook' && <NotebookViewer url={activeFile.url} />}

            {activeFile.type === 'code' && (
                <CodeViewer url={activeFile.url} filename={activeFile.name} />
            )}

            {activeFile.type === 'image' && (
                <ImageViewer 
                    url={activeFile.url} 
                    alt={activeFile.name}
                    onNext={handleNextImage}
                    onPrev={handlePrevImage}
                    hasNavigation={images.length > 1}
                />
            )}
        </div>
      </div>
    </div>
  );
};

export default FilePreviewModal;