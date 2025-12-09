import React, { useState } from 'react';
import PresentationCard from '../components/viewers/PresentationCard';
import PdfViewer from '../components/viewers/PdfViewer';
import { presentations } from '../api/presentations';

const Presentations = () => {
  const [selectedPdf, setSelectedPdf] = useState(null);

  return (
    <div className="w-full py-8 mb-16">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">Presentations</h1>
        <p className="text-gray-600">
          Academic defenses, conference talks, and technical documents.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {presentations.map((item) => (
          <PresentationCard 
            key={item.id} 
            data={item} 
            onOpenViewer={(clickedItem) => setSelectedPdf(clickedItem)} 
          />
        ))}
      </div>

      {selectedPdf && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedPdf(null)}
        >
          <div 
            className="bg-white rounded-xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center px-4 py-3 border-b bg-gray-50">
              <div className="flex items-center overflow-hidden">
                <i className="fas fa-file-pdf mr-3 text-lg text-red-500"></i>
                <h3 className="text-lg font-bold truncate text-gray-800">{selectedPdf.title}</h3>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Download Button */}
                <a 
                  href={selectedPdf.link} 
                  download
                  className="flex items-center text-gray-600 hover:text-blue-600 px-3 py-1 border rounded text-sm transition hover:bg-white bg-gray-50"
                >
                    <i className="fas fa-download mr-2"></i> Download
                </a>

                {/* Close Button */}
                <button 
                  onClick={() => setSelectedPdf(null)} 
                  className="text-gray-400 hover:text-red-500 text-3xl leading-none px-2 ml-2"
                >
                  &times;
                </button>
              </div>
            </div>

            {/* Viewer Content */}
            <div className="flex-1 overflow-hidden bg-gray-100 relative">
              <PdfViewer url={selectedPdf.link} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Presentations;