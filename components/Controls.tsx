"use client";
import { useVoice } from "@humeai/voice-react";
import { Mic, MicOff, Phone, Send, Video, Volume2, VolumeX, Pause, Play, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchAvailableVoices, storeSelectedVoice, getStoredVoice } from "@/utils/voiceConfig";
import CircularFFT from "./CircularFFT";
import { cn } from "@/utils";
import { motion, AnimatePresence } from "framer-motion";

interface VoiceConfig {
  id: string;
  name: string;
  description: string;
  previewUrl?: string;
}

export default function Controls() {
  const { disconnect, status, isMuted, unmute, mute, micFft } = useVoice();
  const [availableVoices, setAvailableVoices] = useState<VoiceConfig[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  const [showVoiceMenu, setShowVoiceMenu] = useState(false);

  useEffect(() => {
    const storedVoice = getStoredVoice();
    if (storedVoice) setSelectedVoice(storedVoice);

    fetchAvailableVoices().then(voices => {
      setAvailableVoices(voices);
      if (!storedVoice && voices.length > 0) {
        setSelectedVoice(voices[0].id);
      }
    });
  }, []);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Only show controls when connected
  if (status.value !== "connected") {
    return null;
  }

  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
  };

  const handleSendTextInput = () => {
    if (textInput.trim()) {
      // In a real implementation, this would send the text to the assistant
      console.log("Sending text:", textInput);
      setTextInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendTextInput();
    }
  };

  const toggleAudioMute = () => {
    // In a real implementation, this would mute/unmute the audio
    setIsAudioMuted(!isAudioMuted);
    console.log("Audio muted:", !isAudioMuted);
  };

  const togglePauseResume = () => {
    // In a real implementation, this would pause/resume the assistant
    setIsPaused(!isPaused);
    console.log("Assistant paused:", !isPaused);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 flex flex-col items-center gap-4 p-4 z-50">
      {/* Voice Selector */}
      {availableVoices.length > 0 && (
        <div className="relative">
          <button 
            onClick={() => setShowVoiceMenu(!showVoiceMenu)}
            className="flex items-center gap-2 bg-card/90 rounded-full px-4 py-2 shadow-lg"
          >
            <span>{availableVoices.find(v => v.id === selectedVoice)?.name || 'Select Voice'}</span>
            <ChevronDown className="size-4" />
          </button>
          
          {showVoiceMenu && (
            <div className="absolute bottom-full mb-2 w-full bg-card rounded-lg shadow-lg overflow-hidden">
              {availableVoices.map(voice => (
                <button
                  key={voice.id}
                  onClick={() => {
                    setSelectedVoice(voice.id);
                    storeSelectedVoice(voice.id);
                    setShowVoiceMenu(false);
                  }}
                  className={`w-full text-left px-4 py-2 hover:bg-accent ${voice.id === selectedVoice ? 'bg-primary text-primary-foreground' : ''}`}
                >
                  {voice.name}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Main Controls */}
      <div className="flex items-center gap-4 bg-card/90 rounded-full p-2 px-6 shadow-lg">
      {/* Text drawer - Row 1, spans all columns when visible */}
      <AnimatePresence>
        {isMuted && (
          <motion.div 
            className="col-span-3 flex items-center gap-2 bg-card/90 rounded-full p-2 pl-4 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <input
              type="text"
              value={textInput}
              onChange={handleTextInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-1 bg-transparent border-none focus:outline-none text-foreground"
            />
            <button 
              onClick={handleSendTextInput}
              className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Send className="size-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Row 2: Control Buttons */}
      <div className="flex justify-start items-end">
        {/* Left: Mic Button */}
        <ControlButton
          icon={isMuted ? <MicOff className="size-6" /> : <Mic className="size-6" />}
          color="bg-emerald-500 text-white"
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
      </div>

      <div className="flex justify-center items-end">
        {/* Center: End Call Button (slightly higher) */}
        <div className="pb-6">
          <ControlButton
            icon={<Phone className="size-6" />}
            color="bg-red-500 text-white"
            onClick={() => disconnect()}
          />
        </div>
      </div>

      <div className="flex justify-end items-end gap-2">
        {/* Right: Additional Controls */}
        <div className="flex flex-col gap-2 items-end">
          {/* Audio Mute Button (smaller) */}
          <ControlButton
            icon={isAudioMuted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
            color={isAudioMuted ? "bg-red-500 text-white" : "bg-green-500 text-white"}
            isActive={!isAudioMuted}
            onClick={toggleAudioMute}
            size="small"
          />
          
          {/* Pause/Resume Button (smaller) */}
          <ControlButton
            icon={isPaused ? <Play className="size-5" /> : <Pause className="size-5" />}
            color={isPaused ? "bg-green-500 text-white" : "bg-blue-500 text-white"}
            isActive={!isPaused}
            onClick={togglePauseResume}
            size="small"
          />
        </div>
        
        {/* Video Button */}
        <ControlButton
          icon={<Video className="size-6 opacity-70" />}
          color="bg-blue-500 text-white"
          isActive={videoEnabled}
          onClick={() => {
            setVideoEnabled(!videoEnabled);
            console.log("Video enabled:", !videoEnabled);
          }}
        />
      </div>
      </div>
    </div>
  );
}

// Reusable control button component
function ControlButton({
  icon,
  color,
  isActive = false,
  onClick,
  pulseEffect,
  size = "normal",
}: {
  icon: React.ReactNode;
  color: string;
  isActive?: boolean;
  onClick: () => void;
  pulseEffect?: React.ReactNode;
  size?: "small" | "normal";
}) {
  const buttonSize = size === "small" ? "w-10 h-10" : "w-16 h-16";
  
  return (
    <motion.button
      className={cn(
        "flex items-center justify-center",
        buttonSize,
        "rounded-full shadow-lg",
        "focus:outline-none focus:ring-2 focus:ring-ring",
        "relative overflow-hidden aspect-square",
        color
      )}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      style={{
        boxShadow: isActive 
          ? `0px 0px 15px rgba(255, 255, 255, 0.3),
             inset 2px 2px 5px rgba(0, 0, 0, 0.3),
             inset -2px -2px 5px rgba(255, 255, 255, 0.1)`
          : `12px 12px 24px rgba(0, 0, 0, 0.2), 
             -8px -8px 20px rgba(255, 255, 255, 0.3), 
             inset 2px 2px 5px rgba(255, 255, 255, 0.2), 
             inset -3px -3px 7px rgba(0, 0, 0, 0.1)`,
        minWidth: size === "small" ? "40px" : "64px",
        minHeight: size === "small" ? "40px" : "64px",
        maxWidth: size === "small" ? "40px" : "64px",
        maxHeight: size === "small" ? "40px" : "64px",
        borderRadius: "50%"
      }}
      initial={{ y: 100, opacity: 0 }}
      animate={{ 
        y: 0, 
        opacity: 1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
    >
      {/* Button texture overlay */}
      <div
        className="absolute inset-0 opacity-20 rounded-full pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 30% 30%, transparent 10%, rgba(255, 255, 255, 0.1) 10%, rgba(255, 255, 255, 0.1) 20%, transparent 30%)",
          backgroundSize: "30px 30px",
          backgroundRepeat: "repeat",
        }}
      />
      
      {/* Stamped-in effect for the icon */}
      <div className="relative z-10 flex items-center justify-center">
        {/* Shadow layer for stamped-in effect */}
        <div className="absolute -translate-y-[1px] -translate-x-[1px] opacity-30 text-black">
          {icon}
        </div>
        
        {/* Main icon */}
        <div className="relative">
          {icon}
        </div>
      </div>
      
      {/* Optional pulse effect (for mic FFT, etc.) */}
      {pulseEffect && (
        <div className="absolute inset-0 pointer-events-none">
          {pulseEffect}
        </div>
      )}
    </motion.button>
  );
}
