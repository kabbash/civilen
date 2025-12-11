"use client";

import config from "../../../sanity.config";

export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h2>Loading {config.title || "Sanity Studio"}...</h2>
      </div>
    </div>
  );
}



