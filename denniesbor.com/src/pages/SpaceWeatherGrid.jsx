import React, { useState, useEffect } from 'react';
import Loading from "../components/common/Loading";
import { api } from "../api/portfolio";

import ScenarioSlider from "../components/spaceweather/ScenarioSlider";
import PowerGridMap from "../components/spaceweather/grid/PowerGridMap";
import LayerControls from "../components/spaceweather/grid/LayerControls";
import EconomicPanel from "../components/spaceweather/grid/EconomicPanel";
import MapLegend from "../components/spaceweather/grid/MapLegend";

const SpaceWeatherGrid = () => {
    const [loading, setLoading] = useState(true);
    const [scenarios, setScenarios] = useState([]);
    const [selectedScenarioId, setSelectedScenarioId] = useState(null);

    // Layers
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

    // Init
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

    // Scenario Data
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

    // Toggle Logic
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

    return (
        <div className="w-full max-w-[1600px] mx-auto px-4 md:px-6 py-4">
            
            {/* 1. Header (Full Width) */}
            <div className="mb-4 text-left border-b pb-4">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                    <i className="fas fa-bolt text-yellow-500 mr-3"></i>
                    Power Grid Resilience Monitor
                </h1>
                <p className="text-sm text-gray-500 mt-1 ml-10">
                   Geomagnetically Induced Current (GIC) Simulation & Economic Impact Analysis
                </p>
            </div>

            {/* 2. Slider (Full Width) */}
            <div className="mb-6">
                <ScenarioSlider 
                    scenarios={scenarios}
                    selectedId={selectedScenarioId}
                    onChange={setSelectedScenarioId}
                />
            </div>

            {/* 3. Main Interface: Controls + Map */}
            <div className="flex flex-col lg:flex-row gap-6 h-[600px] mb-6">
                {/* Left: Controls */}
                <div className="w-full lg:w-72 flex-shrink-0 h-full">
                    <LayerControls 
                        layers={layers} 
                        toggleLayer={toggleLayer} 
                        activeScenario={activeScenario}
                    />
                </div>

                {/* Right: Map */}
                <div className="flex-1 h-full bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden relative z-0">
                    <PowerGridMap 
                        lines={layers.lines ? topology.lines : null}
                        substations={layers.substations ? topology.substations : null}
                        magnetometers={layers.magnetometers ? topology.magnetometers : null}
                        vulnerability={layers.vulnerability ? vulnerability : null}
                        eField={layers.eField ? fieldData.e : null}
                        bField={layers.bField ? fieldData.b : null}
                        activeScenarioId={selectedScenarioId}
                    />
                    <MapLegend activeLayers={layers} />
                </div>
            </div>

            {/* 4. Bottom: Economics (Full Width) */}
            <div className="w-full h-[400px] mb-12">
                <EconomicPanel 
                    economics={economics} 
                    scenarioLabel={activeScenario?.label} 
                />
            </div>

        </div>
    );
};

export default SpaceWeatherGrid;