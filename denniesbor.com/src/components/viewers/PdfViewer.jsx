import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Worker configuration for pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PdfViewer = ({ url }) => {
  const [numPages, setNumPages] = useState(null);
  const [scale, setScale] = useState(1.0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setLoading(false);
    setError(null);
  }

  function onDocumentLoadError(error) {
    console.error("PDF Load Error:", error);
    setError(error.message);
    setLoading(false);
  }

  return (
    <div className="flex flex-col h-full bg-gray-500 border rounded-lg shadow-inner overflow-hidden">
      
      {/* Sticky Toolbar: Zoom Only */}
      <div className="sticky top-0 z-20 w-full bg-white border-b p-2 flex justify-center items-center shadow-md">
        <div className="flex items-center space-x-4 bg-gray-100 rounded-lg px-3 py-1 border">
            <button 
                onClick={() => setScale(s => Math.max(0.5, s - 0.1))}
                className="px-2 text-gray-700 hover:text-blue-600 font-bold text-lg"
                title="Zoom Out"
            >−</button>
            <span className="font-mono font-semibold text-sm min-w-[3rem] text-center select-none">
                {Math.round(scale * 100)}%
            </span>
            <button 
                onClick={() => setScale(s => Math.min(2.5, s + 0.1))}
                className="px-2 text-gray-700 hover:text-blue-600 font-bold text-lg"
                title="Zoom In"
            >+</button>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 relative flex justify-center">
        {loading && (
             <div className="absolute top-10 text-white font-semibold bg-black/30 px-4 py-2 rounded animate-pulse z-10">
                Loading Document...
             </div>
        )}
        
        {error && (
             <div className="absolute top-10 text-red-200 bg-red-900/80 px-4 py-2 rounded z-10">
                Error: {error}
             </div>
        )}
        
        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          className="flex flex-col items-center"
        >
          {/* Loop through all pages to create vertical scroll */}
          {Array.from(new Array(numPages), (el, index) => (
              <div key={`page_${index + 1}`} className="mb-6 shadow-2xl relative">
                <Page 
                    pageNumber={index + 1} 
                    scale={scale} 
                    renderTextLayer={true} 
                    renderAnnotationLayer={true}
                    className="bg-white"
                    loading={
                        <div className="bg-white w-[600px] h-[800px] flex items-center justify-center text-gray-400">
                            Loading Page {index + 1}...
                        </div>
                    }
                />
              </div>
          ))}
        </Document>
      </div>
    </div>
  );
};

export default PdfViewer;