"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const BubbleChart = ({ data }) => {
  const chartRef = useRef(null);
  const [selectedBubble, setSelectedBubble] = useState(null); // State untuk bubble yang dipilih

  useEffect(() => {
    const width = 800;
    const height = 600;

    d3.select(chartRef.current).select("svg").remove();

    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("background-color", "#111");

    const radiusScale = d3
      .scaleSqrt()
      .domain([0, d3.max(data, (d) => Math.abs(d.value))])
      .range([10, 50]);

    const simulation = d3
      .forceSimulation(data)
      .force("charge", d3.forceManyBody().strength(5))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "collision",
        d3.forceCollide((d) => radiusScale(Math.abs(d.value)) + 2)
      )
      .on("tick", ticked);

    const nodes = svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("r", (d) => radiusScale(Math.abs(d.value)))
      .attr("fill", (d) => (d.color === "green" ? "#4caf50" : "#f44336"))
      .attr("stroke", "#111")
      .attr("stroke-width", 2)
      .style("cursor", "pointer")
      .on("click", (event, d) => {
        setSelectedBubble(d); // Set bubble yang dipilih saat diklik
      });

    const labels = svg
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .text((d) => d.name)
      .attr("text-anchor", "middle")
      .attr("fill", "#fff")
      .style("font-size", "12px");

    function ticked() {
      nodes.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

      labels.attr("x", (d) => d.x).attr("y", (d) => d.y + 4);
    }
  }, [data]);

  return (
    <div>
      <div ref={chartRef}></div>

      {/* Modal */}
      {selectedBubble && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={() => setSelectedBubble(null)} // Tutup modal saat area luar diklik
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "10px",
              padding: "20px",
              textAlign: "center",
              width: "300px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <h2>{selectedBubble.name}</h2>
            <p>
              Value: {selectedBubble.value}
              <br />
              Color: {selectedBubble.color}
            </p>
            <button
              style={{
                marginTop: "10px",
                padding: "10px 20px",
                border: "none",
                backgroundColor: "#4caf50",
                color: "#fff",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() => setSelectedBubble(null)} // Tutup modal saat tombol diklik
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BubbleChart;
