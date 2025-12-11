import React, { useState, useRef, useEffect } from 'react';

const LivePreviewModal = ({ url, title, onClose }) => {
  const [position, setPosition] = useState({ x: window.innerWidth - 420, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const modalRef = useRef(null);

  if (!url) return null;

  const handleStart = (clientX, clientY) => {
    if (!modalRef.current) return;
    const rect = modalRef.current.getBoundingClientRect();
    setDragOffset({
      x: clientX - rect.left,
      y: clientY - rect.top
    });
    setIsDragging(true);
  };

  const handleMove = (clientX, clientY) => {
    if (!isDragging || isMaximized) return;
    const newX = Math.max(0, Math.min(clientX - dragOffset.x, window.innerWidth - 400));
    const newY = Math.max(0, Math.min(clientY - dragOffset.y, window.innerHeight - 100));
    setPosition({ x: newX, y: newY });
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  const handleMouseDown = (e) => {
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e) => {
    handleMove(e.clientX, e.clientY);
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, dragOffset]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  return (
    <div
      ref={modalRef}
      className={`fixed z-[9999] bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-300 dark:border-gray-700 overflow-hidden transition-all duration-300 ${
        isDragging ? 'cursor-grabbing' : 'cursor-default'
      }`}
      style={
        isMaximized
          ? {
              left: '20px',
              top: '20px',
              width: 'calc(100vw - 40px)',
              height: 'calc(100vh - 40px)',
            }
          : {
              left: `${position.x}px`,
              top: `${position.y}px`,
              width: '400px',
              height: isCollapsed ? 'auto' : '500px',
            }
      }
    >
      {/* Header Bar - Draggable */}
      <div
        className={`bg-gray-900 dark:bg-black px-4 py-2 flex items-center justify-between border-b border-gray-800 ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="relative flex h-2 w-2 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-xs font-mono text-gray-300 font-semibold truncate">
            {title || 'Live Preview'}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Collapse/Expand */}
          <button
            onClick={toggleCollapse}
            className="text-gray-400 hover:text-white transition"
            title={isCollapsed ? 'Expand' : 'Collapse'}
          >
            <i className={`fas ${isCollapsed ? 'fa-chevron-down' : 'fa-chevron-up'} text-xs`}></i>
          </button>

          {/* Maximize/Restore */}
          <button
            onClick={toggleMaximize}
            className="text-gray-400 hover:text-white transition"
            title={isMaximized ? 'Restore' : 'Maximize'}
          >
            <i className={`fas ${isMaximized ? 'fa-compress' : 'fa-expand'} text-xs`}></i>
          </button>

          {/* External Link - FIXED HERE */}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition"
            title="Open in new tab"
          >
            <i className="fas fa-external-link-alt text-xs"></i>
          </a>

          {/* Close */}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-400 transition"
            title="Close Preview"
          >
            <i className="fas fa-times text-sm"></i>
          </button>
        </div>
      </div>

      {/* Content - Only show if not collapsed */}
      {!isCollapsed && (
        <div className="bg-white dark:bg-gray-800 relative h-full">
          {/* Loading Spinner */}
          <div className="absolute inset-0 flex items-center justify-center -z-10">
            <i className="fas fa-circle-notch fa-spin text-gray-300 text-2xl"></i>
          </div>

          <iframe
            src={url}
            className="w-full h-full bg-white"
            title={`${title} Preview`}
            allow="accelerometer; gyroscope; fullscreen"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          />
        </div>
      )}
    </div>
  );
};

export default LivePreviewModal;