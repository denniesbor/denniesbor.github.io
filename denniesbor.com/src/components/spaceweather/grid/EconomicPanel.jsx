import React from 'react';
import EconomicChart from './EconomicChart';

const EconomicPanel = ({ economics, scenarioLabel }) => {
  // Data comes in as Millions, so we aggregate here before converting to Billions for display.
  // We derive the error margin (CI) by comparing the P95 tail to the mean total.
  const totalImpact = economics ? economics.reduce((acc, curr) => acc + curr.total, 0) : 0;
  const totalP95 = economics ? economics.reduce((acc, curr) => acc + curr.p95, 0) : 0;
  const errorMargin = totalP95 - totalImpact;
  
  const fmt = (n) => (n / 1000).toFixed(1);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex flex-col p-5 overflow-hidden">
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 border-b pb-2">
        Economic Impact
      </h3>
      
      {/* KPI Card */}
      <div className="bg-slate-900 text-white rounded-lg p-4 text-center mb-6 shadow-inner shrink-0">
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

      {/* min-h-0 is critical here: without it, the flex container won't shrink properly, 
          breaking the D3 ResizeObserver in the child component. */}
      <div className="flex-1 min-h-0 w-full relative">
         <EconomicChart data={economics} />
      </div>
    </div>
  );
};

export default EconomicPanel;