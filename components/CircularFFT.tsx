"use client";

import { motion } from "framer-motion";
import { AutoSizer } from "react-virtualized";

interface CircularFFTProps {
  fft: number[];
  isActive: boolean;
}

export default function CircularFFT({ fft, isActive }: CircularFFTProps) {
  return (
    <AutoSizer>
      {({ width, height }) => (
        <motion.svg
          viewBox={`0 0 ${width} ${height}`}
          width={width}
          height={height}
          className="absolute inset-0"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            overflow: 'hidden'
          }}
        >
          {/* Create circular FFT visualization */}
          {Array.from({ length: 24 }).map((_, index) => {
            const value = (fft[index] ?? 0) / 4;
            const angle = (index / 24) * Math.PI * 2;
            const radius = Math.min(width, height) / 2;
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
                animate={{ 
                  opacity: isActive ? 1 : 0,
                  strokeWidth: isActive ? 2 : 0
                }}
                transition={{
                  duration: 0.2
                }}
              />
            );
          })}
          
          {/* Inner circle */}
          <circle
            cx={width / 2}
            cy={height / 2}
            r={Math.min(width, height) * 0.3}
            fill="currentColor"
            fillOpacity={0.2}
          />
        </motion.svg>
      )}
    </AutoSizer>
  );
}