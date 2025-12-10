import React, { useState, useEffect } from 'react';
import Loading from "../components/common/Loading";
import { api } from "../api/portfolio";

import ScenarioSlider from "../components/spaceweather/ScenarioSlider";
import USGridMapD3 from "../components/spaceweather/grid/USGridMapD3";
import EconomicChart from "../components/spaceweather/grid/EconomicChart";
import MapLegend from "../components/spaceweather/grid/MapLegend";

const SpaceWeatherGrid = () => {
    const [loading, setLoading] = useState(true);
    const [scenarios, setScenarios] = useState([]);
    const [selectedScenarioId, setSelectedScenarioId] = useState(null);
    const [chartMode, setChartMode] = useState('stacked');

    const [layers, setLayers] = useState({
        lines: true,
        substations: true,
        magnetometers: false,
        eField: false,
        bField: false,
        vulnerability: true
    });

    const [topology, setTopology] = useState({ lines: null, substations: [], magnetometers: [] });
    const [vulnerability, setVulnerability] = useState(null);
    const [economics, setEconomics] = useState([]);
    const [fieldData, setFieldData] = useState({ e: null, b: null });

    useEffect(() => {
        const fetchInit = async () => {
            try {
                const [lines, subs, mags, scens] = await Promise.all([
                    api.getTransmissionLines(),
                    api.getSubstations(),
                    api.getMagnetometers(),
                    api.getSpaceWeatherScenarios()
                ]);
                setTopology({ lines, substations: subs, magnetometers: mags });
                setScenarios(scens);
                if (scens.length > 0) setSelectedScenarioId(scens[0].id);
            } catch (err) { console.error(err); }
        };
        fetchInit();
    }, []);

    useEffect(() => {
        if (!selectedScenarioId) return;
        const fetchScenarioData = async () => {
            try {
                const isSynthetic = selectedScenarioId.includes('yr');
                const scenarioDetail = await api.getSpaceWeatherScenario(selectedScenarioId);
                setFieldData({ e: scenarioDetail.e_field, b: scenarioDetail.b_field });

                if (isSynthetic) {
                    const [vuln, econ] = await Promise.all([
                        api.getGICVulnerability(selectedScenarioId),
                        api.getEconomicImpact(selectedScenarioId)
                    ]);
                    setVulnerability(vuln);
                    setEconomics(econ);
                } else {
                    setVulnerability(null);
                    setEconomics([]);
                }
                setLoading(false);
            } catch (err) { setLoading(false); }
        };
        fetchScenarioData();
    }, [selectedScenarioId]);

    const toggleLayer = (key) => {
        setLayers(prev => {
            const next = { ...prev };
            if (key === 'substations') {
                if (!prev.substations) {
                    next.substations = true;
                    next.magnetometers = false; next.eField = false; next.bField = false;
                    next.vulnerability = true;
                }
            } else if (key === 'magnetometers') {
                if (!prev.magnetometers) {
                    next.magnetometers = true;
                    next.substations = false; next.vulnerability = false;
                    if (!next.eField && !next.bField) next.eField = true;
                }
            } else if (key === 'vulnerability') {
                if (next.substations) next.vulnerability = !prev.vulnerability;
            } else if (key === 'eField') {
                if (next.magnetometers) { next.eField = !prev.eField; if(next.eField) next.bField = false; }
            } else if (key === 'bField') {
                if (next.magnetometers) { next.bField = !prev.bField; if(next.bField) next.eField = false; }
            } else if (key === 'lines') {
                next.lines = !prev.lines;
            }
            return next;
        });
    };

    if (loading) return <Loading />;

    const activeScenario = scenarios.find(s => s.id === selectedScenarioId);
    const isSynthetic = selectedScenarioId ? selectedScenarioId.includes('yr') : false;

    const totalImpact = economics.reduce((acc, curr) => acc + Math.abs(curr.total), 0);
    const totalP95 = economics.reduce((acc, curr) => acc + Math.abs(curr.p95 || curr.total), 0);
    const errorMargin = totalP95 - totalImpact;
    const fmt = (n) => (n / 1000).toFixed(1);

    return (
        <div className="w-full min-h-screen">
            <div className="w-full px-2 md:px-4 py-3">
                
                {/* Header */}
                <div className="mb-2 text-left border-b pb-2">
                    <h1 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center">
                        <i className="fas fa-bolt text-yellow-500 mr-2"></i>
                        Power Grid Resilience Monitor
                    </h1>
                    <p className="text-xs text-gray-500 mt-1 ml-8">
                       Geomagnetically Induced Current (GIC) Simulation & Economic Impact Analysis
                    </p>
                </div>

                {/* Scenario Slider */}
                <div className="mb-2">
                    <ScenarioSlider 
                        scenarios={scenarios}
                        selectedId={selectedScenarioId}
                        onChange={setSelectedScenarioId}
                    />
                </div>

                {/* Daily Loss KPI (Mobile only) */}
                {isSynthetic && economics.length > 0 && (
                    <div className="xl:hidden bg-slate-900 text-white rounded-lg p-3 text-center shadow-inner mb-2">
                        <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">
                            Total Daily Loss
                        </div>
                        <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                            ${fmt(totalImpact)} <span className="text-base font-normal text-slate-400">Bn</span>
                        </div>
                        <div className="text-xs font-mono text-slate-500">
                            ± ${fmt(errorMargin)} Bn (95% CI)
                        </div>
                    </div>
                )}

                {/* Main Content: Map + Economic Chart */}
                <div className="flex flex-col xl:flex-row gap-3 mb-2">
                    
                    {/* Left: Map - Direct rendering, no container */}
                    <div className="flex-1 min-w-0 xl:w-[60%] relative">
                        <USGridMapD3
                            lines={layers.lines ? topology.lines : null}
                            substations={layers.substations ? topology.substations : null}
                            magnetometers={layers.magnetometers ? topology.magnetometers : null}
                            vulnerability={layers.vulnerability ? vulnerability : null}
                            eField={layers.eField ? fieldData.e : null}
                            bField={layers.bField ? fieldData.b : null}
                            activeScenarioId={selectedScenarioId}
                        />
                        
                        {/* Daily Loss Overlay */}
                        {isSynthetic && economics.length > 0 && (
                            <div className="hidden xl:block absolute top-4 left-4 bg-slate-900/95 backdrop-blur text-white rounded-lg p-2 shadow-xl border border-slate-700 z-[900]">
                                <div className="text-[9px] text-slate-400 uppercase tracking-wider mb-1">
                                    Daily Loss
                                </div>
                                <div className="text-xl font-bold text-white">
                                    ${fmt(totalImpact)} <span className="text-xs font-normal text-slate-400">Bn</span>
                                </div>
                                <div className="text-[8px] font-mono text-slate-500">
                                    ± ${fmt(errorMargin)} Bn
                                </div>
                            </div>
                        )}

                        {/* Map Legend */}
                        <MapLegend activeLayers={layers} />
                    </div>

                    {/* Right: Economic Chart */}
                    {isSynthetic && economics.length > 0 && (
                        <div className="hidden xl:block xl:w-[40%] flex-shrink-0">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-[calc(90vh-200px)] flex flex-col p-3 overflow-hidden">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-2 border-b pb-2 shrink-0">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                        Economic Impact
                                    </h3>
                                    
                                    <div className="flex gap-1">
                                        <button
                                            onClick={() => setChartMode('stacked')}
                                            className={`px-2 py-1 text-[10px] rounded transition ${
                                                chartMode === 'stacked'
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                            }`}
                                            title="Stacked"
                                        >
                                            <i className="fas fa-layer-group"></i>
                                        </button>
                                        <button
                                            onClick={() => setChartMode('dodged')}
                                            className={`px-2 py-1 text-[10px] rounded transition ${
                                                chartMode === 'dodged'
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                            }`}
                                            title="Dodged"
                                        >
                                            <i className="fas fa-columns"></i>
                                        </button>
                                    </div>
                                </div>

                                {/* Legend */}
                                <div className="flex justify-between items-center mb-2 shrink-0">
                                    <span className="text-[10px] text-gray-400 uppercase">{activeScenario?.label}</span>
                                    
                                    <div className="flex items-center gap-2 text-[9px]">
                                        {chartMode === 'stacked' ? (
                                            <>
                                                <div className="flex items-center gap-1">
                                                    <div className="w-2 h-2 bg-blue-600 rounded"></div>
                                                    <span>Direct</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <div className="w-2 h-2 bg-blue-200 rounded border border-blue-400"></div>
                                                    <span>Total</span>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="flex items-center gap-1">
                                                    <div className="w-2 h-2 bg-red-600 rounded"></div>
                                                    <span>Direct</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <div className="w-2 h-2 bg-orange-500 rounded"></div>
                                                    <span>Indirect</span>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Chart */}
                                <div className="flex-1 min-h-0 w-full relative">
                                    <EconomicChart data={economics} mode={chartMode} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Layer Controls Below - Compact Single Row */}
                <div className="bg-white rounded-lg border border-gray-200 p-2 shadow-sm">
                    <div className="flex flex-wrap items-center gap-3 text-xs">
                        
                        {/* Base Layers */}
                        <div className="flex items-center gap-2">
                            <i className="fas fa-globe text-gray-400 text-sm"></i>
                            <label className="flex items-center gap-1 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={layers.lines}
                                    onChange={() => toggleLayer('lines')}
                                    className="w-3 h-3"
                                />
                                <span>Lines</span>
                            </label>
                        </div>

                        <div className="h-4 w-px bg-gray-300"></div>

                        {/* View Mode */}
                        <div className="flex items-center gap-2">
                            <i className="fas fa-eye text-gray-400 text-sm"></i>
                            <label className="flex items-center gap-1 cursor-pointer">
                                <input
                                    type="radio"
                                    checked={layers.substations}
                                    onChange={() => toggleLayer('substations')}
                                    className="w-3 h-3"
                                />
                                <span>Substations</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                                <input
                                    type="radio"
                                    checked={layers.magnetometers}
                                    onChange={() => toggleLayer('magnetometers')}
                                    className="w-3 h-3"
                                />
                                <span>Magnetometers</span>
                            </label>
                        </div>

                        {/* Risk Analysis */}
                        {layers.substations && (
                            <>
                                <div className="h-4 w-px bg-gray-300"></div>
                                <div className="flex items-center gap-2">
                                    <i className="fas fa-exclamation-triangle text-red-500 text-sm"></i>
                                    <label className="flex items-center gap-1 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={layers.vulnerability}
                                            onChange={() => toggleLayer('vulnerability')}
                                            className="w-3 h-3"
                                        />
                                        <span>Failure Risk</span>
                                    </label>
                                </div>
                            </>
                        )}

                        {/* Geomagnetic Fields */}
                        {layers.magnetometers && (
                            <>
                                <div className="h-4 w-px bg-gray-300"></div>
                                <div className="flex items-center gap-2">
                                    <i className="fas fa-wave-square text-purple-500 text-sm"></i>
                                    <label className="flex items-center gap-1 cursor-pointer">
                                        <input
                                            type="radio"
                                            checked={layers.eField}
                                            onChange={() => toggleLayer('eField')}
                                            className="w-3 h-3"
                                        />
                                        <span>E-Field</span>
                                    </label>
                                    <label className="flex items-center gap-1 cursor-pointer">
                                        <input
                                            type="radio"
                                            checked={layers.bField}
                                            onChange={() => toggleLayer('bField')}
                                            className="w-3 h-3"
                                        />
                                        <span>B-Field</span>
                                    </label>
                                </div>
                            </>
                        )}

                        {/* Scenario Info */}
                        <div className="ml-auto flex items-center gap-2 text-gray-500">
                            <i className="fas fa-info-circle"></i>
                            <span className="font-mono text-[11px]">{activeScenario?.label}</span>
                        </div>
                    </div>
                </div>

                {/* Mobile: Economic Chart */}
                {isSynthetic && economics.length > 0 && (
                    <div className="xl:hidden w-full h-[500px] mt-3">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full flex flex-col p-4 overflow-hidden">
                            <div className="flex items-center justify-between mb-3 border-b pb-2 shrink-0">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                    Economic Impact
                                </h3>
                                
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

                            <div className="flex justify-between items-end mb-2 shrink-0">
                                <span className="text-[10px] text-gray-400 uppercase">{activeScenario?.label}</span>
                                
                                <div className="flex items-center gap-2 text-[10px]">
                                    {chartMode === 'stacked' ? (
                                        <>
                                            <div className="flex items-center gap-1">
                                                <div className="w-3 h-3 bg-blue-600 rounded"></div>
                                                <span>Direct</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <div className="w-3 h-3 bg-blue-200 rounded border border-blue-400"></div>
                                                <span>Total</span>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex items-center gap-1">
                                                <div className="w-3 h-3 bg-red-600 rounded"></div>
                                                <span>Direct</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <div className="w-3 h-3 bg-orange-500 rounded"></div>
                                                <span>Indirect</span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="flex-1 min-h-0 w-full relative">
                                <EconomicChart data={economics} mode={chartMode} />
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default SpaceWeatherGrid;