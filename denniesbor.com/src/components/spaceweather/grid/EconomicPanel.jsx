import React, { useState } from 'react';
import EconomicChart from './EconomicChart';

const EconomicPanel = ({ economics, scenarioLabel }) => {
  const [chartMode, setChartMode] = useState('stacked'); // 'stacked' or 'dodged'

  const totalImpact = economics ? economics.reduce((acc, curr) => acc + Math.abs(curr.total), 0) : 0;
  const totalP95 = economics ? economics.reduce((acc, curr) => acc + Math.abs(curr.p95 || curr.total), 0) : 0;
  const errorMargin = totalP95 - totalImpact;
  
  const fmt = (n) => (n / 1000).toFixed(1);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex flex-col p-5 overflow-hidden">
      <div className="flex items-center justify-between mb-4 border-b pb-2 shrink-0">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
          Economic Impact
        </h3>
        
        {/* Chart Mode Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setChartMode('stacked')}
            className={`px-3 py-1 text-xs rounded transition ${
              chartMode === 'stacked'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            <i className="fas fa-layer-group mr-1"></i>
            Stacked
          </button>
          <button
            onClick={() => setChartMode('dodged')}
            className={`px-3 py-1 text-xs rounded transition ${
              chartMode === 'dodged'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            <i className="fas fa-columns mr-1"></i>
            Dodged
          </button>
        </div>
      </div>
      
      {/* KPI Card */}
      <div className="bg-slate-900 text-white rounded-lg p-4 text-center mb-4 shadow-inner shrink-0">
        <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">
            Total Daily Loss
        </div>
        <div className="text-4xl font-bold text-white mb-1">
            ${fmt(totalImpact)} <span className="text-lg font-normal text-slate-400">Bn</span>
        </div>
        <div className="text-xs font-mono text-slate-500">
            ± ${fmt(errorMargin)} Bn (95% CI)
        </div>
      </div>

      <div className="flex justify-between items-end mb-2 shrink-0">
          <div>
            <span className="text-sm font-semibold text-gray-700 block">Top Impacted Sectors</span>
            <span className="text-[10px] text-gray-400 block uppercase">{scenarioLabel}</span>
          </div>
          <div className="text-[10px] text-gray-400 italic">
              Hover bars for details
          </div>
      </div>

      <div className="flex-1 min-h-0 w-full relative">
         <EconomicChart data={economics} mode={chartMode} />
      </div>
    </div>
  );
};

export default EconomicPanel;