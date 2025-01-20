import React from "react";
import BubbleChart from "../components/BubbleChart";

export default function Home() {
  const data = [
    { name: "ARC", value: 56.2, color: "green" },
    { name: "DEEP", value: 86.8, color: "green" },
    { name: "BIO", value: -41, color: "red" },
    { name: "AIXBT", value: 35.8, color: "green" },
    { name: "BRETT", value: -23.9, color: "red" },
    { name: "CHEX", value: 32.6, color: "green" },
  ];

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Crypto Bubble Chart</h1>
      <BubbleChart data={data} />
    </div>
  );
}
