import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const EconomicChart = ({ data, mode = 'stacked' }) => {
  const svgRef = useRef();
  const containerRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, data: null });

  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver(entries => {
      if (!entries || entries.length === 0) return;
      const { width, height } = entries[0].contentRect;
      setDimensions({ width, height });
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!data || data.length === 0 || dimensions.width === 0 || dimensions.height === 0) return;

    const svgEl = d3.select(svgRef.current);
    svgEl.selectAll("*").remove();

    const { width: w, height: h } = dimensions;

    const margin = { top: 10, right: 80, bottom: 40, left: 140 }; 
    const width = w - margin.left - margin.right;
    const height = h - margin.top - margin.bottom;

    const svg = svgEl
      .attr("width", w)
      .attr("height", h)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Process data - take absolute values
    const processedData = data
      .filter(d => d && typeof d.total === 'number' && !isNaN(d.total) && isFinite(d.total))
      .map(d => ({
        ...d,
        total: Math.abs(d.total),
        direct: Math.abs(d.direct || 0),
        indirect: Math.abs(d.indirect || 0)
      }));

    if (processedData.length === 0) {
      svg.append("text")
        .attr("x", width / 2)
        .attr("y", height / 2)
        .attr("text-anchor", "middle")
        .attr("fill", "#9ca3af")
        .text("No valid economic data available");
      return;
    }

    // Top 10 sectors
    const topSectors = [...processedData]
      .sort((a, b) => b.total - a.total)
      .slice(0, 10);

    // Y Scale
    const barPadding = mode === 'dodged' ? 0.3 : 0.2;
    const y = d3.scaleBand()
      .domain(topSectors.map(d => d.sector))
      .range([0, height])
      .padding(barPadding);

    // X Scale
    const maxValue = d3.max(topSectors, d => d.total) || 1;
    const x = d3.scaleLinear()
      .domain([0, maxValue * 1.1])
      .range([0, width]);

    // Grid lines
    svg.append("g")
      .attr("class", "grid")
      .call(d3.axisBottom(x).ticks(5).tickSize(height).tickFormat(""))
      .attr("stroke", "#f1f5f9")
      .attr("stroke-width", 1)
      .select(".domain").remove();

    const bars = svg.selectAll(".bar-group")
        .data(topSectors)
        .enter()
        .append("g");

    if (mode === 'stacked') {
      // STACKED MODE
      // Total bar (light blue background)
      bars.append("rect")
          .attr("y", d => y(d.sector))
          .attr("x", 0)
          .attr("height", y.bandwidth())
          .attr("width", d => x(d.total))
          .attr("fill", "#dbeafe") 
          .attr("rx", 4)
          .attr("stroke", "#93c5fd")
          .attr("stroke-width", 1)
          .style("transition", "all 0.2s")
          .on("mouseenter", (event, d) => {
              const rect = event.target.getBoundingClientRect();
              const container = containerRef.current.getBoundingClientRect();
              setTooltip({
                  visible: true,
                  x: rect.right - container.left,
                  y: rect.top - container.top + rect.height / 2,
                  data: d
              });
              d3.select(event.target)
                  .attr("fill", "#93c5fd")
                  .attr("stroke", "#3b82f6");
          })
          .on("mouseleave", (event) => {
              setTooltip(prev => ({ ...prev, visible: false }));
              d3.select(event.target)
                  .attr("fill", "#dbeafe")
                  .attr("stroke", "#93c5fd");
          });

      // Direct impact bar (dark blue foreground)
      bars.append("rect")
          .attr("y", d => y(d.sector))
          .attr("x", 0)
          .attr("height", y.bandwidth())
          .attr("width", d => x(d.direct))
          .attr("fill", "#2563eb")
          .attr("rx", 4)
          .attr("pointer-events", "none");

    } else {
      // DODGED MODE
      const barHeight = y.bandwidth() / 2.2;
      const barGap = y.bandwidth() * 0.1;

      // Direct bar
      bars.append("rect")
          .attr("y", d => y(d.sector) + barGap)
          .attr("x", 0)
          .attr("height", barHeight)
          .attr("width", d => x(d.direct))
          .attr("fill", "#dc2626")
          .attr("rx", 3)
          .attr("stroke", "#991b1b")
          .attr("stroke-width", 1)
          .style("transition", "all 0.2s")
          .on("mouseenter", (event, d) => {
              const rect = event.target.getBoundingClientRect();
              const container = containerRef.current.getBoundingClientRect();
              setTooltip({
                  visible: true,
                  x: rect.right - container.left,
                  y: rect.top - container.top + rect.height / 2,
                  data: { ...d, type: 'direct' }
              });
              d3.select(event.target).attr("fill", "#b91c1c");
          })
          .on("mouseleave", (event) => {
              setTooltip(prev => ({ ...prev, visible: false }));
              d3.select(event.target).attr("fill", "#dc2626");
          });

      // Indirect bar
      bars.append("rect")
          .attr("y", d => y(d.sector) + barHeight + barGap * 2)
          .attr("x", 0)
          .attr("height", barHeight)
          .attr("width", d => x(d.indirect))
          .attr("fill", "#f87171")
          .attr("rx", 3)
          .attr("stroke", "#dc2626")
          .attr("stroke-width", 1)
          .style("transition", "all 0.2s")
          .on("mouseenter", (event, d) => {
              const rect = event.target.getBoundingClientRect();
              const container = containerRef.current.getBoundingClientRect();
              setTooltip({
                  visible: true,
                  x: rect.right - container.left,
                  y: rect.top - container.top + rect.height / 2,
                  data: { ...d, type: 'indirect' }
              });
              d3.select(event.target).attr("fill", "#fca5a5");
          })
          .on("mouseleave", (event) => {
              setTooltip(prev => ({ ...prev, visible: false }));
              d3.select(event.target).attr("fill", "#f87171");
          });
    }

    // Y Axis (sector labels)
    svg.append("g")
        .call(d3.axisLeft(y).tickSize(0))
        .attr("font-size", "12px")
        .attr("font-weight", "500")
        .attr("color", "#1f2937")
        .selectAll("text")
        .attr("text-anchor", "end")
        .attr("dx", "-0.5em");
    
    svg.select(".domain").remove();

    // X Axis (dollar amounts)
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).ticks(5).tickFormat(d => `$${(d/1000).toFixed(1)}B`))
        .attr("font-family", "ui-monospace, monospace")
        .attr("font-size", "11px")
        .attr("color", "#6b7280")
        .selectAll("text")
        .attr("dy", "1em");
    
    svg.selectAll(".domain, .tick line").remove();

    // Value labels
    bars.append("text")
        .attr("x", d => x(d.total) + 5)
        .attr("y", d => y(d.sector) + y.bandwidth() / 2)
        .attr("dy", "0.35em")
        .attr("font-size", "11px")
        .attr("font-weight", "600")
        .attr("fill", "#1f2937")
        .text(d => `$${(d.total/1000).toFixed(1)}B`);

  }, [data, dimensions, mode]);

  return (
    <div ref={containerRef} className="relative w-full h-full">
        <svg ref={svgRef} className="w-full h-full"></svg>
        
        {tooltip.visible && tooltip.data && (
            <div 
                className="absolute z-50 bg-slate-800 text-white p-3 rounded-lg shadow-xl border border-slate-600 pointer-events-none text-xs w-52"
                style={{ 
                    top: tooltip.y, 
                    left: Math.min(tooltip.x + 15, dimensions.width - 220),
                    transform: 'translateY(-50%)' 
                }}
            >
                <div className="font-bold mb-2 border-b border-slate-600 pb-1 text-sm text-blue-300">
                    {tooltip.data.sector}
                </div>
                {tooltip.data.type ? (
                  // Dodged mode - show specific type
                  <div className="space-y-1">
                    <div className="flex justify-between">
                        <span className="text-slate-400">{tooltip.data.type === 'direct' ? 'Direct' : 'Indirect'}:</span>
                        <span className="font-semibold">${(tooltip.data[tooltip.data.type]/1000).toFixed(2)}B</span>
                    </div>
                  </div>
                ) : (
                  // Stacked mode - show all
                  <div className="space-y-1">
                    <div className="flex justify-between">
                        <span className="text-slate-400">Direct:</span>
                        <span className="font-semibold">${(tooltip.data.direct/1000).toFixed(2)}B</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-400">Indirect:</span>
                        <span className="font-semibold">${(tooltip.data.indirect/1000).toFixed(2)}B</span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-slate-600">
                        <span className="font-bold text-white">Total:</span>
                        <span className="font-bold text-blue-300">${(tooltip.data.total/1000).toFixed(2)}B</span>
                    </div>
                  </div>
                )}
            </div>
        )}
    </div>
  );
};

export default EconomicChart;