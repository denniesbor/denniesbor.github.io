import React, { useState, useRef, useEffect } from 'react';

const MapLegend = ({ activeLayers }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const legendRef = useRef(null);

  const handleMouseDown = (e) => {
    if (!legendRef.current) return;
    
    const rect = legendRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;

    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  return (
    <div
      ref={legendRef}
      className="fixed bg-gray-900/95 backdrop-blur border border-gray-700 p-4 rounded-lg shadow-2xl text-white text-xs z-[1000] w-64 font-sans transition-shadow duration-300 hover:shadow-3xl"
      style={{
        left: position.x || 'auto',
        top: position.y || 'auto',
        right: position.x ? 'auto' : '1.5rem',
        bottom: position.y ? 'auto' : '1.5rem',
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none'
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Drag Handle */}
      <div className="flex items-center justify-between mb-3 border-b border-gray-700 pb-2">
        <h4 className="font-bold text-gray-300 uppercase tracking-widest text-xs">
          Legend
        </h4>
        <i className="fas fa-grip-vertical text-gray-500 text-sm cursor-grab active:cursor-grabbing"></i>
      </div>

      {/* 1. TRANSMISSION LINES */}
      {activeLayers.lines && (
        <div className="mb-4">
          <div className="flex justify-between mb-1 text-gray-400">
            <span>Grid Stress (V/km)</span>
          </div>
          <div className="h-2 w-full bg-gradient-to-r from-[#60a5fa] via-[#eab308] to-[#ef4444] rounded mb-1"></div>
          <div className="flex justify-between text-[10px] text-gray-500 font-mono">
            <span>0.1</span>
            <span>2.5</span>
            <span>&gt;5.0 V/km</span>
          </div>
        </div>
      )}

      {/* 2. SUBSTATION RISK */}
      {activeLayers.vulnerability && (
        <div className="mb-4">
          <div className="mb-2 text-gray-400">Failure Probability</div>
          <div className="space-y-1">
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-[#dc2626] mr-2 shadow-[0_0_8px_#dc2626]"></span>
              <span>75% - 100% (Critical)</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-[#ea580c] mr-2"></span>
              <span>50% - 75% (High)</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-[#facc15] mr-2"></span>
              <span>25% - 50% (Moderate)</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-[#22c55e] mr-2 opacity-80"></span>
              <span>0% - 25% (Low)</span>
            </div>
          </div>
        </div>
      )}

      {/* 3. E-FIELD */}
      {activeLayers.eField && (
        <div className="mb-2 animate-in fade-in zoom-in duration-300">
          <div className="flex justify-between mb-1 text-gray-400">
            <span>E-Field Amplitude</span>
          </div>
          <div className="h-2 w-full bg-gradient-to-r from-[#000004] via-[#b73779] to-[#fcfdbf] rounded mb-1"></div>
          <div className="flex justify-between text-[10px] text-gray-500 font-mono">
            <span>0</span>
            <span>2.0</span>
            <span>&gt;4.0 V/km</span>
          </div>
        </div>
      )}

      {/* 4. B-FIELD */}
      {activeLayers.bField && (
        <div className="mb-2 animate-in fade-in zoom-in duration-300">
          <div className="flex justify-between mb-1 text-gray-400">
            <span>B-Field Amplitude</span>
          </div>
          <div className="h-2 w-full bg-gradient-to-r from-[#082f49] via-[#0ea5e9] to-[#cffafe] rounded mb-1"></div>
          <div className="flex justify-between text-[10px] text-gray-500 font-mono">
            <span>0</span>
            <span>250</span>
            <span>&gt;500 nT</span>
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