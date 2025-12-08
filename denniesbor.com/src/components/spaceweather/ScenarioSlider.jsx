import React from 'react';

const ScenarioSlider = ({ scenarios, selectedId, onChange }) => {
  if (!scenarios || scenarios.length === 0) return null;

  const currentIndex = scenarios.findIndex(s => s.id === selectedId);
  const safeIndex = currentIndex === -1 ? 0 : currentIndex;

  const handleChange = (e) => {
    const newIndex = parseInt(e.target.value, 10);
    onChange(scenarios[newIndex].id);
  };

  return (
    <div className="bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-1">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Timeline
        </label>
        <div className="text-sm font-bold text-blue-700">
            {scenarios[safeIndex]?.label}
        </div>
      </div>
      
      <div className="relative w-full h-8">
        <input
          type="range"
          min="0"
          max={scenarios.length - 1}
          step="1"
          value={safeIndex}
          onChange={handleChange}
          className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 relative z-10 top-2"
        />
        
        {/* Ticks */}
        <div className="flex justify-between text-[9px] text-gray-400 mt-3 font-mono absolute top-2 left-0 w-full pointer-events-none px-1">
            {scenarios.map((s, idx) => {
                const shortLabel = s.id.includes('yr') ? s.id : s.label.split(' ')[0];
                const isActive = idx === safeIndex;

                return (
                    <div key={s.id} className="flex flex-col items-center w-6">
                        <div className={`h-1.5 w-0.5 mb-1 transition-colors ${isActive ? 'bg-blue-600 h-2' : 'bg-gray-300'}`}></div>
                        <span className={`transition-all ${isActive ? 'text-blue-700 font-bold' : ''}`}>
                            {shortLabel}
                        </span>
                    </div>
                );
            })}
        </div>
      </div>
    </div>
  );
};

export default ScenarioSlider;