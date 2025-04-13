"use client";
import { useVoice } from "@humeai/voice-react";
import { Mic, MicOff, Phone, Video } from "lucide-react";
import { useState } from "react";
import NeumorphicButton from "./NeumorphicButton";
import CircularFFT from "./CircularFFT";

export default function Controls() {
  const { disconnect, status, isMuted, unmute, mute, micFft } = useVoice();
  const [videoEnabled, setVideoEnabled] = useState(false);

  // Only show controls when connected
  if (status.value !== "connected") {
    return null;
  }

  return (
    <>
      {/* Mic Button (Left) */}
      <NeumorphicButton
        icon={isMuted ? <MicOff className="size-6" /> : <Mic className="size-6" />}
        color="primary"
        position="left"
        isActive={!isMuted}
        onClick={() => {
          if (isMuted) {
            unmute();
          } else {
            mute();
          }
        }}
        pulseEffect={<CircularFFT fft={micFft} isActive={!isMuted} />}
      />

      {/* End Call Button (Center) */}
      <NeumorphicButton
        icon={<Phone className="size-6" />}
        color="danger"
        position="center"
        onClick={() => disconnect()}
      />

      {/* Video Button (Right) */}
      <NeumorphicButton
        icon={<Video className="size-6" />}
        color="secondary"
        position="right"
        isActive={videoEnabled}
        onClick={() => setVideoEnabled(!videoEnabled)}
      />
    </>
  );
}
