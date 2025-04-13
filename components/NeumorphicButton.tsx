"use client";

import { cn } from "@/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface NeumorphicButtonProps {
  onClick: () => void;
  icon: ReactNode;
  color?: "primary" | "danger" | "secondary";
  position?: "left" | "center" | "right";
  isActive?: boolean;
  pulseEffect?: ReactNode;
  className?: string;
}

export default function NeumorphicButton({
  onClick,
  icon,
  color = "primary",
  position = "center",
  isActive = false,
  pulseEffect,
  className,
}: NeumorphicButtonProps) {
  // Define color schemes
  const colorSchemes = {
    primary: {
      bg: "bg-emerald-500",
      shadow: "rgba(67, 160, 71, 0.8)",
      activeShadow: "rgba(46, 125, 50, 0.9)",
      textColor: "text-white",
    },
    secondary: {
      bg: "bg-blue-500",
      shadow: "rgba(59, 130, 246, 0.8)",
      activeShadow: "rgba(37, 99, 235, 0.9)",
      textColor: "text-white",
    },
    danger: {
      bg: "bg-red-500",
      shadow: "rgba(239, 68, 68, 0.8)",
      activeShadow: "rgba(220, 38, 38, 0.9)",
      textColor: "text-white",
    },
  };

  // Define position styles
  const positionStyles = {
    left: "left-6 bottom-6",
    center: "left-1/2 -translate-x-1/2 bottom-12", // Slightly higher for iPhone-like positioning
    right: "right-6 bottom-6",
  };

  const scheme = colorSchemes[color];

  return (
    <motion.button
      className={cn(
        "fixed z-50 flex items-center justify-center",
        "aspect-square rounded-full shadow-lg",
        "focus:outline-none focus:ring-2 focus:ring-ring",
        "relative overflow-hidden",
        scheme.bg,
        scheme.textColor,
        positionStyles[position],
        className
      )}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      style={{
        // Ensure the button maintains its circular shape with fixed dimensions
        width: '64px',
        height: '64px',
        minWidth: '64px',
        minHeight: '64px',
        maxWidth: '64px',
        maxHeight: '64px',
        borderRadius: '50%',
        boxShadow: isActive 
          ? `0px 0px 15px ${scheme.shadow},
             inset 2px 2px 5px rgba(0, 0, 0, 0.3),
             inset -2px -2px 5px rgba(255, 255, 255, 0.1)`
          : `12px 12px 24px rgba(0, 0, 0, 0.2), 
             -8px -8px 20px rgba(255, 255, 255, 0.3), 
             inset 2px 2px 5px rgba(255, 255, 255, 0.2), 
             inset -3px -3px 7px rgba(0, 0, 0, 0.1)`
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