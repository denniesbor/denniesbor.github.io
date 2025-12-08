import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// --- COLOR SCALES (Same as before) ---
const getEFieldColor = (val) => {
    if (val > 4.0) return '#fcfdbf'; 
    if (val > 2.0) return '#fc8961'; 
    if (val > 1.0) return '#b73779'; 
    if (val > 0.5) return '#51127c'; 
    return '#000004';
};

const getBFieldColor = (val) => {
    if (val > 1000) return '#ecfeff'; 
    if (val > 500)  return '#67e8f9'; 
    if (val > 250)  return '#06b6d4'; 
    if (val > 100)  return '#0ea5e9'; 
    if (val > 50)   return '#1e40af'; 
    return '#0f172a';
};

const getLineColor = (val) => {
    if (val > 5.0) return '#ef4444'; 
    if (val > 2.5) return '#f97316'; 
    if (val > 1.0) return '#eab308'; 
    if (val > 0.1) return '#60a5fa'; 
    return '#334155';
};

const getSubstationStyle = (subId, vulnerability) => {
    if (!vulnerability) return { color: '#64748b', radius: 2, opacity: 0.3 };
    
    const prob = vulnerability[String(subId)] || 0;
    const pct = prob * 100;

    let color = '#22c55e';
    let radius = 3;
    let opacity = 0.5;

    if (pct >= 75) { color = '#dc2626'; radius = 8; opacity = 1.0; } 
    else if (pct >= 50) { color = '#ea580c'; radius = 6; opacity = 0.9; } 
    else if (pct >= 25) { color = '#facc15'; radius = 5; opacity = 0.8; }

    return { color, radius, opacity };
};

const PowerGridMap = ({ lines, substations, magnetometers, vulnerability, eField, bField, activeScenarioId }) => {

    // Lines
    const getLineStyle = (feature) => {
        const voltageKey = activeScenarioId ? `V_${activeScenarioId}` : 'V';
        const inducedVoltage = feature.properties[voltageKey] || 0; 
        const nominalVoltage = feature.properties.V || 345;
        let weight = nominalVoltage >= 765 ? 4 : nominalVoltage >= 500 ? 3 : 1.5;

        return {
            color: getLineColor(inducedVoltage),
            weight: weight,
            opacity: inducedVoltage > 0.1 ? 1.0 : 0.3,
        };
    };

    // Fields (Mags)
    const renderScalarField = (fieldData, type) => {
        if (!fieldData || !fieldData.val || !magnetometers) return null;

        return magnetometers.map((mt, idx) => {
            if (idx >= fieldData.val.length) return null;
            const val = fieldData.val[idx];
            const threshold = type === 'E' ? 0.05 : 10.0;
            if (val < threshold) return null;

            const color = type === 'E' ? getEFieldColor(val) : getBFieldColor(val);
            const radius = val > (type === 'E' ? 2.0 : 300) ? 8 : 4;
            const unit = type === 'E' ? 'V/km' : 'nT';

            return (
                <CircleMarker
                    key={`${type}-${mt.id}`}
                    center={[mt.lat, mt.lon]}
                    radius={radius}
                    pathOptions={{ color, fillColor: color, fillOpacity: 0.7, stroke: false }}
                >
                    {/* HOVER TOOLTIP */}
                    <Tooltip sticky direction="top">
                        <div className="text-center">
                            <div className="font-bold text-xs">{mt.name} (ID: {mt.id})</div>
                            <div className="text-xs">
                                {type === 'E' ? 'E-Field' : 'B-Field'}: 
                                <b> {val.toFixed(2)} {unit}</b>
                            </div>
                        </div>
                    </Tooltip>
                </CircleMarker>
            );
        });
    };

    return (
        <MapContainer 
            center={[39.8283, -98.5795]} 
            zoom={4} 
            style={{ height: '100%', width: '100%', zIndex: 0 }}
            className="bg-gray-900"
        >
            <TileLayer
                attribution='&copy; CARTO'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />

            {/* Layer 1: Fields */}
            {eField && renderScalarField(eField, 'E')}
            {bField && renderScalarField(bField, 'B')}

            {/* Layer 2: Lines */}
            {lines && (
                <GeoJSON 
                    key={`lines-${activeScenarioId}`} 
                    data={lines} 
                    style={getLineStyle}
                    onEachFeature={(feature, layer) => {
                        const key = activeScenarioId ? `V_${activeScenarioId}` : 'V';
                        const val = feature.properties[key] || 0;
                        layer.bindTooltip(
                            `Line ${feature.id}: ${val.toFixed(2)} V/km`,
                            { sticky: true, direction: 'top' }
                        );
                    }}
                />
            )}

            {/* Layer 3: Substations */}
            {substations && (vulnerability || (!eField && !bField)) && (
                substations.map(sub => {
                    const style = getSubstationStyle(sub.id, vulnerability);
                    const riskVal = vulnerability ? (vulnerability[String(sub.id)] * 100).toFixed(1) : null;
                    
                    return (
                        <CircleMarker
                            key={`sub-${sub.id}`}
                            center={[sub.lat, sub.lon]}
                            radius={style.radius}
                            pathOptions={{ 
                                color: style.color, 
                                fillColor: style.color, 
                                fillOpacity: style.opacity, 
                                stroke: false 
                            }}
                        >
                            {/* HOVER TOOLTIP */}
                            <Tooltip sticky direction="top">
                                <div className="text-center">
                                    <div className="font-bold text-xs">{sub.name} (ID: {sub.id})</div>
                                    {vulnerability ? (
                                        <div className="text-xs">
                                            Prob: <span style={{color: style.color, fontWeight: 'bold'}}>{riskVal}%</span>
                                        </div>
                                    ) : (
                                        <div className="text-[10px] text-gray-500 italic">No Data</div>
                                    )}
                                </div>
                            </Tooltip>
                        </CircleMarker>
                    )
                })
            )}

        </MapContainer>
    );
};

export default PowerGridMap;