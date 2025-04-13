"use client";

import { cn } from "@/utils";
import { motion } from "framer-motion";
import { Mic, MicOff } from "lucide-react";
import { useEffect, useState } from "react";
import { AutoSizer } from "react-virtualized";

interface MicButtonProps {
  isMuted: boolean;
  fft: number[];
  onToggleMute: () => void;
  className?: string;
}

export default function MicButton({
  isMuted,
  fft,
  onToggleMute,
  className,
}: MicButtonProps) {
  const [scale, setScale] = useState(1);
  
  // Calculate the average FFT value for pulsing effect
  const avgFft = fft.length > 0 
    ? fft.reduce((sum, val) => sum + val, 0) / fft.length 
    : 0;
  
  // Update scale based on FFT values when not muted
  useEffect(() => {
    if (!isMuted && avgFft > 0) {
      // Scale between 1 and 1.2 based on FFT
      const newScale = 1 + Math.min(avgFft / 2, 0.2);
      setScale(newScale);
    } else {
      setScale(1);
    }
  }, [isMuted, avgFft]);

  return (
    <motion.button
      className={cn(
        "fixed bottom-6 left-6 z-50 flex items-center justify-center",
        "size-16 rounded-full bg-primary text-primary-foreground shadow-lg",
        "hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring",
        "transition-colors relative overflow-hidden",
        className
      )}
      onClick={onToggleMute}
      animate={{
        scale: scale,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 15
      }}
    >
      {/* FFT Visualization as a circular overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <AutoSizer>
          {({ width, height }) => (
            <motion.svg
              viewBox={`0 0 ${width} ${height}`}
              width={width}
              height={height}
              className="absolute inset-0"
            >
              {/* Create circular FFT visualization */}
              {Array.from({ length: 24 }).map((_, index) => {
                const value = (fft[index] ?? 0) / 4;
                const angle = (index / 24) * Math.PI * 2;
                const radius = width / 2;
                const barLength = value * (radius * 0.4);
                
                // Calculate start and end points for the line
                const innerX = radius + Math.cos(angle) * (radius * 0.6);
                const innerY = radius + Math.sin(angle) * (radius * 0.6);
                const outerX = radius + Math.cos(angle) * (radius * 0.6 + barLength);
                const outerY = radius + Math.sin(angle) * (radius * 0.6 + barLength);
                
                return (
                  <motion.line
                    key={`mic-fft-${index}`}
                    x1={innerX}
                    y1={innerY}
                    x2={outerX}
                    y2={outerY}
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeOpacity={0.5}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: !isMuted ? 1 : 0 }}
                  />
                );
              })}
              
              {/* Inner circle */}
              <circle
                cx={width / 2}
                cy={height / 2}
                r={width * 0.3}
                fill="currentColor"
                fillOpacity={0.2}
              />
            </motion.svg>
          )}
        </AutoSizer>
      </div>
      
      {/* Mic Icon */}
      <div className="relative z-10">
        {isMuted ? (
          <MicOff className="size-6" />
        ) : (
          <Mic className="size-6" />
        )}
      </div>
    </motion.button>
  );
}