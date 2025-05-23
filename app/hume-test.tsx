"use client";

import { VoiceProvider, useVoice } from "@humeai/voice-react";
import React from "react";

function MinimalVoiceUI() {
  const { status, connect } = useVoice();

  return (
    <div style={{ padding: 40 }}>
      <h2>Minimal Hume Voice Test</h2>
      <div>Status: {status.value}</div>
      <button
        onClick={() => connect()}
        disabled={status.value === "connected"}
        style={{
          marginTop: 20,
          padding: "10px 20px",
          fontSize: 18,
          borderRadius: 8,
          background: "#4CAF50",
          color: "#fff",
          border: "none",
        }}
      >
        {status.value === "connected" ? "Connected" : "Connect"}
      </button>
    </div>
  );
}

export default function HumeTestPage() {
  return (
    <VoiceProvider>
      <MinimalVoiceUI />
    </VoiceProvider>
  );
}