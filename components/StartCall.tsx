import { useVoice } from "@humeai/voice-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";
import { useState } from "react";

/**
 * StartCall component displays a reflection start screen with a lily background
 * and a round green button that initiates the mindfulness session.
 */
export default function StartCall() {
  const { status, connect } = useVoice();
  const [isConnecting, setIsConnecting] = useState(false);

  return (
    <AnimatePresence>
      {status.value !== "connected" ? (
        <motion.div
          className={"fixed inset-0 p-4 flex items-center justify-center"}
          style={{
            backgroundImage: "url('/backgrounds/lily2.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          initial="initial"
          animate="enter"
          exit="exit"
          variants={{
            initial: { opacity: 0 },
            enter: { opacity: 1 },
            exit: { opacity: 0 },
          }}
        >
          <AnimatePresence>
            <motion.div
              variants={{
                initial: { scale: 0.5 },
                enter: { scale: 1 },
                exit: { scale: 0.5 },
              }}
            >
              <Button
                className={"z-50 flex items-center justify-center relative overflow-hidden"}
                style={{
                  background: "linear-gradient(145deg, #43a047, #4CAF50)", // Gradient for 3D effect
                  borderRadius: "50%", // Make it round
                  width: "120px",
                  height: "120px",
                  fontSize: "1.2rem",
                  fontWeight: "600",
                  boxShadow: "12px 12px 24px rgba(0, 0, 0, 0.2), -8px -8px 20px rgba(255, 255, 255, 0.3), inset 2px 2px 5px rgba(255, 255, 255, 0.2), inset -3px -3px 7px rgba(0, 0, 0, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  transform: "translateY(0px)",
                  transition: "all 0.2s ease",
                }}
                onClick={() => {
                  if (isConnecting) return; // Prevent multiple clicks
                  
                  setIsConnecting(true);
                  connect()
                    .then(() => {
                      console.log("Connection established successfully");
                    })
                    .catch((error: any) => {
                      console.error("Failed to connect:", error);
                      // Could add user-facing error handling here
                    })
                    .finally(() => {
                      setIsConnecting(false);
                    });
                }}
                disabled={isConnecting}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "12px 12px 30px rgba(0, 0, 0, 0.25), -8px -8px 20px rgba(255, 255, 255, 0.4), inset 2px 2px 5px rgba(255, 255, 255, 0.2), inset -3px -3px 7px rgba(0, 0, 0, 0.1)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0px)";
                  e.currentTarget.style.boxShadow = "12px 12px 24px rgba(0, 0, 0, 0.2), -8px -8px 20px rgba(255, 255, 255, 0.3), inset 2px 2px 5px rgba(255, 255, 255, 0.2), inset -3px -3px 7px rgba(0, 0, 0, 0.1)";
                }}
              >
                {/* Lily pad texture overlay */}
                <div
                  className="absolute inset-0 opacity-20 rounded-full"
                  style={{
                    backgroundImage: "radial-gradient(circle at 30% 30%, transparent 10%, rgba(0, 100, 0, 0.1) 10%, rgba(0, 100, 0, 0.1) 20%, transparent 30%)",
                    backgroundSize: "30px 30px",
                    backgroundRepeat: "repeat",
                    pointerEvents: "none"
                  }}
                />
                
                {/* Floating animation when not connecting */}
                {!isConnecting && (
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{
                      pointerEvents: "none",
                      opacity: 0.01
                    }}
                  />
                )}
                
                <span className="relative z-10">{isConnecting ? "Connecting..." : "Reflect"}</span>
                {isConnecting && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      border: "2px solid white",
                      opacity: 0.6
                    }}
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </Button>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
