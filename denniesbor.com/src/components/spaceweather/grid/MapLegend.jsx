import React from 'react';

const MapLegend = ({ activeLayers }) => {
  return (
    <div className="absolute bottom-6 right-6 bg-gray-900/95 backdrop-blur border border-gray-700 p-4 rounded-lg shadow-2xl text-white text-xs z-[1000] w-64 font-sans transition-all duration-300">
      <h4 className="font-bold mb-3 text-gray-300 uppercase tracking-widest border-b border-gray-700 pb-1">Legend</h4>

      {/* 1. TRANSMISSION LINES (Grid Stress) - Always visible if Lines are ON */}
      {activeLayers.lines && (
        <div className="mb-4">
          <div className="flex justify-between mb-1 text-gray-400">
            <span>Grid Stress (V/km)</span>
          </div>
          {/* Blue -> Yellow -> Red Gradient */}
          <div className="h-2 w-full bg-gradient-to-r from-[#60a5fa] via-[#eab308] to-[#ef4444] rounded mb-1"></div>
          <div className="flex justify-between text-[10px] text-gray-500 font-mono">
            <span>0.1</span>
            <span>2.5</span>
            <span>&gt;5.0 V/km</span>
          </div>
        </div>
      )}

      {/* 2. SUBSTATION RISK (Only visible in Substation Mode) */}
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

      {/* 3. E-FIELD (Only visible in Magnetometer Mode + E-Field Selected) */}
      {activeLayers.eField && (
        <div className="mb-2 animate-in fade-in zoom-in duration-300">
          <div className="flex justify-between mb-1 text-gray-400">
            <span>E-Field Amplitude</span>
          </div>
          {/* Dark -> Purple -> Orange -> Yellow */}
          <div className="h-2 w-full bg-gradient-to-r from-[#000004] via-[#b73779] to-[#fcfdbf] rounded mb-1"></div>
          <div className="flex justify-between text-[10px] text-gray-500 font-mono">
            <span>0</span>
            <span>2.0</span>
            <span>&gt;4.0 V/km</span>
          </div>
        </div>
      )}

      {/* 4. B-FIELD (Only visible in Magnetometer Mode + B-Field Selected) */}
      {activeLayers.bField && (
        <div className="mb-2 animate-in fade-in zoom-in duration-300">
          <div className="flex justify-between mb-1 text-gray-400">
            <span>B-Field Amplitude</span>
          </div>
          {/* Dark Blue -> Blue -> Cyan -> White */}
          <div className="h-2 w-full bg-gradient-to-r from-[#082f49] via-[#0ea5e9] to-[#cffafe] rounded mb-1"></div>
          <div className="flex justify-between text-[10px] text-gray-500 font-mono">
            <span>0</span>
            <span>250</span>
            <span>&gt;500 nT</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapLegend;