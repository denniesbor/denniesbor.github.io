import React, { useState, useRef, useEffect } from 'react';

const MapLegend = ({ activeLayers }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const legendRef = useRef(null);

  const handleStart = (clientX, clientY) => {
    if (!legendRef.current) return;
    
    const rect = legendRef.current.getBoundingClientRect();
    setDragOffset({
      x: clientX - rect.left,
      y: clientY - rect.top
    });
    setIsDragging(true);
  };

  const handleMove = (clientX, clientY) => {
    if (!isDragging) return;

    const newX = clientX - dragOffset.x;
    const newY = clientY - dragOffset.y;

    setPosition({ x: newX, y: newY });
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  // Mouse events
  const handleMouseDown = (e) => {
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e) => {
    handleMove(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // Touch events
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    e.preventDefault(); // Prevent scrolling while dragging
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, dragOffset]);

  return (
    <div
      ref={legendRef}
      className={`
        fixed bg-gray-900/95 dark:bg-gray-800/95 backdrop-blur border border-gray-700 dark:border-gray-600 
        p-3 xl:p-4 rounded-lg shadow-2xl text-white z-[1000] font-sans transition-shadow duration-300
        text-[10px] xl:text-xs w-48 xl:w-64
        ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}
        hover:shadow-3xl
      `}
      style={{
        left: position.x || 'auto',
        top: position.y || 'auto',
        right: position.x ? 'auto' : '0.5rem',
        bottom: position.y ? 'auto' : '0.5rem',
        userSelect: 'none',
        touchAction: 'none'
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* Drag Handle */}
      <div className="flex items-center justify-between mb-2 xl:mb-3 border-b border-gray-700 dark:border-gray-600 pb-1 xl:pb-2">
        <h4 className="font-bold text-gray-300 dark:text-gray-200 uppercase tracking-widest">
          Legend
        </h4>
        <i className="fas fa-grip-vertical text-gray-500 text-xs xl:text-sm cursor-grab active:cursor-grabbing"></i>
      </div>

      {/* 1. TRANSMISSION LINES */}
      {activeLayers.lines && (
        <div className="mb-3 xl:mb-4">
          <div className="flex justify-between mb-1 text-gray-400 dark:text-gray-300">
            <span>Grid Stress (V/km)</span>
          </div>
          <div className="h-1.5 xl:h-2 w-full bg-gradient-to-r from-[#60a5fa] via-[#eab308] to-[#ef4444] rounded mb-1"></div>
          <div className="flex justify-between text-[9px] xl:text-[10px] text-gray-500 dark:text-gray-400 font-mono">
            <span>0.1</span>
            <span>2.5</span>
            <span>&gt;5.0</span>
          </div>
        </div>
      )}

      {/* 2. SUBSTATION RISK */}
      {activeLayers.vulnerability && (
        <div className="mb-3 xl:mb-4">
          <div className="mb-1 xl:mb-2 text-gray-400 dark:text-gray-300">Failure Probability</div>
          <div className="space-y-0.5 xl:space-y-1">
            <div className="flex items-center">
              <span className="w-2 h-2 xl:w-3 xl:h-3 rounded-full bg-[#dc2626] mr-1 xl:mr-2 shadow-[0_0_8px_#dc2626]"></span>
              <span className="text-[9px] xl:text-[10px]">75% - 100% (Critical)</span>
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 xl:w-3 xl:h-3 rounded-full bg-[#ea580c] mr-1 xl:mr-2"></span>
              <span className="text-[9px] xl:text-[10px]">50% - 75% (High)</span>
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 xl:w-3 xl:h-3 rounded-full bg-[#facc15] mr-1 xl:mr-2"></span>
              <span className="text-[9px] xl:text-[10px]">25% - 50% (Moderate)</span>
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 xl:w-3 xl:h-3 rounded-full bg-[#22c55e] mr-1 xl:mr-2 opacity-80"></span>
              <span className="text-[9px] xl:text-[10px]">0% - 25% (Low)</span>
            </div>
          </div>
        </div>
      )}

      {/* 3. E-FIELD */}
      {activeLayers.eField && (
        <div className="mb-2 animate-in fade-in zoom-in duration-300">
          <div className="flex justify-between mb-1 text-gray-400 dark:text-gray-300">
            <span>E-Field Amplitude</span>
          </div>
          <div className="h-1.5 xl:h-2 w-full bg-gradient-to-r from-[#000004] via-[#b73779] to-[#fcfdbf] rounded mb-1"></div>
          <div className="flex justify-between text-[9px] xl:text-[10px] text-gray-500 dark:text-gray-400 font-mono">
            <span>0</span>
            <span>2.0</span>
            <span>&gt;4.0</span>
          </div>
        </div>
      )}

      {/* 4. B-FIELD */}
      {activeLayers.bField && (
        <div className="mb-2 animate-in fade-in zoom-in duration-300">
          <div className="flex justify-between mb-1 text-gray-400 dark:text-gray-300">
            <span>B-Field Amplitude</span>
          </div>
          <div className="h-1.5 xl:h-2 w-full bg-gradient-to-r from-[#082f49] via-[#0ea5e9] to-[#cffafe] rounded mb-1"></div>
          <div className="flex justify-between text-[9px] xl:text-[10px] text-gray-500 dark:text-gray-400 font-mono">
            <span>0</span>
            <span>250</span>
            <span>&gt;500</span>
          </div>
        </div>
      )}

      {/* Reset Position Button */}
      {(position.x !== 0 || position.y !== 0) && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setPosition({ x: 0, y: 0 });
          }}
          className="absolute top-2 right-2 text-gray-400 hover:text-white text-xs"
          title="Reset position"
        >
          <i className="fas fa-undo"></i>
        </button>
      )}
    </div>
  );
};

export default MapLegend;