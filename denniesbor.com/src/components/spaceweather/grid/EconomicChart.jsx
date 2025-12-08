import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const EconomicChart = ({ data }) => {
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

    const margin = { top: 20, right: 30, bottom: 20, left: 160 }; 
    const width = w - margin.left - margin.right;
    const height = h - margin.top - margin.bottom;

    const svg = svgEl
      .attr("width", w)
      .attr("height", h)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const topSectors = [...data].sort((a, b) => a.total - b.total).slice(-10);

    const y = d3.scaleBand()
      .domain(topSectors.map(d => d.sector))
      .range([height, 0])
      .padding(0.3);

    const x = d3.scaleLinear()
      .domain([0, d3.max(topSectors, d => d.total) * 1.1])
      .range([0, width]);

    svg.append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(5).tickSize(-height).tickFormat(""))
      .attr("stroke", "#e5e7eb")
      .attr("stroke-dasharray", "3,3")
      .select(".domain").remove();

    const bars = svg.selectAll(".bar-group")
        .data(topSectors)
        .enter()
        .append("g");

    bars.append("rect")
        .attr("y", d => y(d.sector))
        .attr("x", 0)
        .attr("height", y.bandwidth())
        .attr("width", d => x(d.total))
        .attr("fill", "#bfdbfe") 
        .attr("rx", 3)
        .on("mouseenter", (event, d) => {
            setTooltip({
                visible: true,
                x: margin.left + x(d.total),
                y: margin.top + y(d.sector),
                data: d
            });
            d3.select(event.target).attr("fill", "#93c5fd");
        })
        .on("mouseleave", (event) => {
            setTooltip(prev => ({ ...prev, visible: false }));
            d3.select(event.target).attr("fill", "#bfdbfe");
        });

    bars.append("rect")
        .attr("y", d => y(d.sector))
        .attr("x", 0)
        .attr("height", y.bandwidth())
        .attr("width", d => x(d.direct))
        .attr("fill", "#2563eb")
        .attr("rx", 3)
        .attr("pointer-events", "none");

    svg.append("g")
        .call(d3.axisLeft(y).tickSize(0))
        .attr("font-size", "11px")
        .attr("font-weight", "600")
        .attr("color", "#374151")
        .select(".domain").remove();

    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).ticks(5).tickFormat(d => `$${(d/1000).toFixed(1)}B`))
        .attr("font-family", "monospace")
        .attr("font-size", "10px")
        .attr("color", "#6b7280")
        .select(".domain").remove();

  }, [data, dimensions]);

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[300px]">
        <svg ref={svgRef} className="w-full h-full overflow-visible"></svg>
        
        {tooltip.visible && tooltip.data && (
            <div 
                className="absolute z-50 bg-slate-800 text-white p-2 rounded shadow-lg border border-slate-600 pointer-events-none text-xs w-48"
                style={{ 
                    top: tooltip.y, 
                    left: Math.min(tooltip.x + 10, dimensions.width - 200),
                    transform: 'translateY(-20%)' 
                }}
            >
                <div className="font-bold mb-1 border-b border-slate-600 pb-1 text-blue-200">
                    {tooltip.data.sector}
                </div>
                <div className="grid grid-cols-2 gap-x-2 text-slate-300">
                    <span>Direct:</span>
                    <span className="text-right">${(tooltip.data.direct/1000).toFixed(2)}B</span>
                    <span>Indirect:</span>
                    <span className="text-right">${(tooltip.data.indirect/1000).toFixed(2)}B</span>
                    <span className="font-bold text-white mt-1">Total:</span>
                    <span className="text-right font-bold text-white mt-1">${(tooltip.data.total/1000).toFixed(2)}B</span>
                </div>
            </div>
        )}
    </div>
  );
};

export default EconomicChart;