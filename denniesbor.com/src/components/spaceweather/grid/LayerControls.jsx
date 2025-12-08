import React from 'react';

const LayerControls = ({ layers, toggleLayer, activeScenario }) => {
  const isSynthetic = activeScenario?.id?.includes('yr');

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full p-5 flex flex-col overflow-y-auto">
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 border-b pb-2">
        Data Layers
      </h3>

      {/* --- SECTION 1: GLOBAL LAYERS --- */}
      <div className="mb-8">
        <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center">
            <i className="fas fa-globe text-slate-500 mr-2 w-4"></i> 
            Base Layers
        </h4>
        <div className="pl-2">
            <label className="flex items-center space-x-3 cursor-pointer group">
                <div className="relative flex items-center">
                    <input 
                        type="checkbox" 
                        checked={layers.lines} 
                        onChange={() => toggleLayer('lines')}
                        className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-gray-300 transition-all checked:border-blue-500 checked:bg-blue-500"
                    />
                    <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100">
                        <i className="fas fa-check text-[10px]"></i>
                    </div>
                </div>
                <span className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors">
                  Transmission Lines
                </span>
            </label>
        </div>
      </div>

      {/* --- SECTION 2: VIEW MODE SELECTOR --- */}
      <div className="mb-6 bg-gray-50 p-3 rounded-lg border border-gray-100">
          <h4 className="text-xs font-bold text-gray-500 mb-3 uppercase">Select View Mode</h4>
          
          {/* Mode A: Substations */}
          <label className="flex items-center space-x-3 cursor-pointer mb-3">
              <input 
                  type="radio" 
                  name="viewMode"
                  checked={layers.substations} 
                  onChange={() => toggleLayer('substations')}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
              />
              <span className={`text-sm ${layers.substations ? 'font-bold text-green-700' : 'text-gray-600'}`}>
                  Substations & Risk
              </span>
          </label>

          {/* Mode B: Magnetometers */}
          <label className="flex items-center space-x-3 cursor-pointer">
              <input 
                  type="radio" 
                  name="viewMode"
                  checked={layers.magnetometers} 
                  onChange={() => toggleLayer('magnetometers')}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
              />
              <span className={`text-sm ${layers.magnetometers ? 'font-bold text-purple-700' : 'text-gray-600'}`}>
                  Magnetometers & Fields
              </span>
          </label>
      </div>

      {/* --- SECTION 3: RISK ANALYSIS (Only if Substations ON) --- */}
      <div className={`mb-8 transition-opacity duration-300 ${!layers.substations ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
        <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center">
            <i className="fas fa-exclamation-triangle text-red-500 mr-2 w-4"></i> 
            Risk Analysis
        </h4>
        <div className="space-y-3 pl-2">
            <label className={`flex items-center space-x-3 cursor-pointer group ${!isSynthetic ? 'opacity-50 cursor-not-allowed' : ''}`}>
                <div className="relative flex items-center">
                    <input 
                        type="checkbox" 
                        checked={layers.vulnerability} 
                        onChange={() => toggleLayer('vulnerability')}
                        disabled={!isSynthetic || !layers.substations}
                        className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-gray-300 transition-all checked:border-red-500 checked:bg-red-500"
                    />
                    <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100">
                        <i className="fas fa-check text-[10px]"></i>
                    </div>
                </div>
                <span className="text-sm text-gray-600 group-hover:text-red-600 transition-colors">
                  Transformer Failure Risk
                </span>
            </label>

            {/* Risk Legend */}
            {isSynthetic && layers.vulnerability && (
              <div className="ml-7 p-3 bg-red-50/50 rounded-lg text-xs border border-red-100">
                  <div className="mb-2 font-semibold text-red-800">Failure Probability</div>
                  <div className="space-y-1">
                    <div className="flex items-center">
                        <span className="w-2 h-2 rounded-full bg-red-600 mr-2"></span> &gt; 0.75 (Critical)
                    </div>
                    <div className="flex items-center">
                        <span className="w-2 h-2 rounded-full bg-orange-500 mr-2"></span> 0.50 - 0.75
                    </div>
                    <div className="flex items-center">
                        <span className="w-2 h-2 rounded-full bg-yellow-400 mr-2"></span> 0.25 - 0.50
                    </div>
                    <div className="flex items-center">
                        <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span> &lt; 0.25 (Low)
                    </div>
                  </div>
              </div>
            )}
            {!isSynthetic && (
                <div className="ml-7 text-xs text-gray-400 italic">
                    Only available for synthetic scenarios
                </div>
            )}
        </div>
      </div>

      {/* --- SECTION 4: FIELDS (Only if Magnetometers ON) --- */}
      <div className={`mb-8 transition-opacity duration-300 ${!layers.magnetometers ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
        <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center">
            <i className="fas fa-wave-square text-indigo-500 mr-2 w-4"></i> 
            Geomagnetic Fields
        </h4>
        <div className="space-y-3 pl-2">
            
            {/* E-FIELD */}
            <label className="flex items-center space-x-3 cursor-pointer group">
                <div className="relative flex items-center">
                    <input 
                        type="checkbox" 
                        checked={layers.eField} 
                        onChange={() => toggleLayer('eField')}
                        disabled={!layers.magnetometers}
                        className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-gray-300 transition-all checked:border-indigo-500 checked:bg-indigo-500"
                    />
                    <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100">
                        <i className="fas fa-check text-[10px]"></i>
                    </div>
                </div>
                <span className="text-sm text-gray-600 group-hover:text-indigo-600 transition-colors">
                  E-Field (Electric)
                </span>
            </label>

            {/* B-FIELD */}
            <label className="flex items-center space-x-3 cursor-pointer group">
                <div className="relative flex items-center">
                    <input 
                        type="checkbox" 
                        checked={layers.bField} 
                        onChange={() => toggleLayer('bField')}
                        disabled={!layers.magnetometers}
                        className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-gray-300 transition-all checked:border-cyan-500 checked:bg-cyan-500"
                    />
                    <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100">
                        <i className="fas fa-check text-[10px]"></i>
                    </div>
                </div>
                <span className="text-sm text-gray-600 group-hover:text-cyan-600 transition-colors">
                  B-Field (Magnetic)
                </span>
            </label>

            {/* Field Note */}
            <div className="ml-7 text-xs text-gray-400 italic">
                {layers.eField ? 'Showing Electric Field Potential (V/km)' : 
                 layers.bField ? 'Showing Magnetic Flux Density (nT)' : 
                 'Select a field type to visualize'}
            </div>
        </div>
      </div>

    </div>
  );
};

export default LayerControls;