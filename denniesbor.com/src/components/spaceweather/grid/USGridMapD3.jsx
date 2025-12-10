import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

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

const USGridMapD3 = ({ lines, substations, magnetometers, vulnerability, eField, bField, activeScenarioId }) => {
  const svgRef = useRef();
  const tooltipRef = useRef();
  const containerRef = useRef();
  const [usData, setUsData] = useState(null);
  
  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json')
      .then(response => response.json())
      .then(data => setUsData(data));
  }, []);

  useEffect(() => {
    if (!usData || !svgRef.current) return;

    const width = 960;
    const height = 600;

    const projection = d3.geoAlbersUsa()
      .scale(1200)
      .translate([width / 2, height / 2]);

    const pathGenerator = d3.geoPath().projection(projection);

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const g = svg.append("g");

    const zoom = d3.zoom()
      .scaleExtent([1, 8])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);

    const tooltip = d3.select(tooltipRef.current);

    const showTooltip = (event, html) => {
      const containerRect = containerRef.current.getBoundingClientRect();
      tooltip.style("opacity", 1)
        .html(html)
        .style("left", (event.clientX - containerRect.left + 10) + "px")
        .style("top", (event.clientY - containerRect.top - 10) + "px");
    };

    const hideTooltip = () => {
      tooltip.style("opacity", 0);
    };

    // Draw US States
    const states = topojson.feature(usData, usData.objects.states);
    
    g.append("g")
      .selectAll("path")
      .data(states.features)
      .enter()
      .append("path")
      .attr("d", pathGenerator)
      .attr("fill", "#f8f9fa")
      .attr("stroke", "#cbd5e1")
      .attr("stroke-width", 1);

    // Draw Transmission Lines
    if (lines) {
      const voltageKey = activeScenarioId ? `V_${activeScenarioId}` : 'V';
      
      g.append("g")
        .selectAll("path")
        .data(lines.features)
        .enter()
        .append("path")
        .attr("d", pathGenerator)
        .attr("fill", "none")
        .attr("stroke", d => {
          const voltage = d.properties[voltageKey] || 0;
          return getLineColor(voltage);
        })
        .attr("stroke-width", d => {
          const nominalVoltage = d.properties.V || 345;
          return nominalVoltage >= 765 ? 2 : nominalVoltage >= 500 ? 1.5 : 0.8;
        })
        .attr("opacity", d => {
          const voltage = d.properties[voltageKey] || 0;
          return voltage > 0.1 ? 1.0 : 0.3;
        })
        .on("mouseover", (event, d) => {
          const voltage = d.properties[voltageKey] || 0;
          showTooltip(event, `<div class="font-bold">Line ${d.id}</div><div>${voltage.toFixed(2)} V/km</div>`);
        })
        .on("mousemove", (event, d) => {
          const voltage = d.properties[voltageKey] || 0;
          showTooltip(event, `<div class="font-bold">Line ${d.id}</div><div>${voltage.toFixed(2)} V/km</div>`);
        })
        .on("mouseout", hideTooltip);
    }

    // Draw Fields
    if ((eField || bField) && magnetometers) {
        const fieldType = eField ? 'E' : 'B';
        const fieldData = eField || bField;
        const threshold = fieldType === 'E' ? 0.05 : 10.0;
        
        g.append("g")
          .selectAll("circle")
          .data(magnetometers.filter((d, i) => fieldData.val && fieldData.val[i] >= threshold))
          .enter()
          .append("circle")
          .attr("cx", d => {
             const p = projection([d.lon, d.lat]);
             return p ? p[0] : null;
          })
          .attr("cy", d => {
             const p = projection([d.lon, d.lat]);
             return p ? p[1] : null;
          })
          .attr("r", (d) => {
             const val = fieldData.val[magnetometers.indexOf(d)];
             if (fieldType === 'E') return val > 2.0 ? 8 : 4;
             return val > 300 ? 8 : 4;
          })
          .attr("fill", (d) => {
             const val = fieldData.val[magnetometers.indexOf(d)];
             return fieldType === 'E' ? getEFieldColor(val) : getBFieldColor(val);
          })
          .attr("opacity", 0.7)
          .style("display", d => projection([d.lon, d.lat]) ? "block" : "none")
          .on("mouseover", (event, d) => {
            const idx = magnetometers.indexOf(d);
            const val = fieldData.val[idx];
            const unit = fieldType === 'E' ? 'V/km' : 'nT';
            showTooltip(event, `<div class="font-bold">${d.name} (ID: ${d.id})</div><div>${fieldType}-Field: <b>${val.toFixed(2)} ${unit}</b></div>`);
          })
          .on("mousemove", (event, d) => {
            const idx = magnetometers.indexOf(d);
            const val = fieldData.val[idx];
            const unit = fieldType === 'E' ? 'V/km' : 'nT';
            showTooltip(event, `<div class="font-bold">${d.name} (ID: ${d.id})</div><div>${fieldType}-Field: <b>${val.toFixed(2)} ${unit}</b></div>`);
          })
          .on("mouseout", hideTooltip);
    }

    // Draw Substations
    if (substations && (vulnerability || (!eField && !bField))) {
      g.append("g")
        .selectAll("circle")
        .data(substations)
        .enter()
        .append("circle")
        .attr("cx", d => {
           const p = projection([d.lon, d.lat]);
           return p ? p[0] : null;
        })
        .attr("cy", d => {
           const p = projection([d.lon, d.lat]);
           return p ? p[1] : null;
        })
        .attr("r", d => {
           if (!vulnerability) return 2;
           const prob = vulnerability[String(d.id)] || 0;
           const pct = prob * 100;
           if (pct >= 75) return 8;
           if (pct >= 50) return 6;
           if (pct >= 25) return 5;
           return 3;
        })
        .attr("fill", d => {
           if (!vulnerability) return "#64748b";
           const prob = vulnerability[String(d.id)] || 0;
           const pct = prob * 100;
           if (pct >= 75) return "#dc2626";
           if (pct >= 50) return "#ea580c";
           if (pct >= 25) return "#facc15";
           return "#22c55e";
        })
        .attr("opacity", d => {
           if (!vulnerability) return 0.3;
           const prob = vulnerability[String(d.id)] || 0;
           const pct = prob * 100;
           if (pct >= 75) return 1.0;
           if (pct >= 50) return 0.9;
           if (pct >= 25) return 0.8;
           return 0.5;
        })
        .style("display", d => projection([d.lon, d.lat]) ? "block" : "none")
        .on("mouseover", (event, d) => {
          const riskVal = vulnerability ? (vulnerability[String(d.id)] * 100).toFixed(1) : null;
          showTooltip(event, `<div class="font-bold">${d.name} (ID: ${d.id})</div>${vulnerability ? `<div>Prob: <span style="font-weight:bold">${riskVal}%</span></div>` : '<div class="text-xs text-gray-500 italic">No Data</div>'}`);
        })
        .on("mousemove", (event, d) => {
          const riskVal = vulnerability ? (vulnerability[String(d.id)] * 100).toFixed(1) : null;
          showTooltip(event, `<div class="font-bold">${d.name} (ID: ${d.id})</div>${vulnerability ? `<div>Prob: <span style="font-weight:bold">${riskVal}%</span></div>` : '<div class="text-xs text-gray-500 italic">No Data</div>'}`);
        })
        .on("mouseout", hideTooltip);
    }

    // Draw Magnetometers
    if (magnetometers && !eField && !bField) {
       const symbolGenerator = d3.symbol().type(d3.symbolTriangle).size(60);
       
       g.append("g")
         .selectAll("path")
         .data(magnetometers)
         .enter()
         .append("path")
         .attr("d", symbolGenerator)
         .attr("transform", d => {
            const p = projection([d.lon, d.lat]);
            return p ? `translate(${p[0]},${p[1]})` : null;
         })
         .attr("fill", "#d946ef")
         .attr("stroke", "#fff")
         .attr("stroke-width", 1)
         .on("mouseover", (event, d) => {
           showTooltip(event, `<div class="font-bold">${d.name}</div><div>ID: ${d.id}</div>`);
         })
         .on("mousemove", (event, d) => {
           showTooltip(event, `<div class="font-bold">${d.name}</div><div>ID: ${d.id}</div>`);
         })
         .on("mouseout", hideTooltip);
    }

  }, [usData, lines, substations, magnetometers, vulnerability, eField, bField, activeScenarioId]);

  return (
    <div ref={containerRef} className="relative w-full h-[calc(90vh-200px)]">
      <svg 
        ref={svgRef} 
        viewBox="0 0 960 600" 
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full cursor-move"
      ></svg>
      
      <div 
        ref={tooltipRef}
        className="absolute pointer-events-none bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg z-50"
        style={{ opacity: 0, transition: 'opacity 0.2s' }}
      ></div>
      
      <div className="absolute bottom-2 right-2 bg-gray-800/80 text-white text-[10px] px-2 py-1 rounded">
        Scroll to zoom • Drag to pan
      </div>
    </div>
  );
};

export default USGridMapD3;