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
                className={"z-50 flex items-center justify-center"}
                style={{
                  backgroundColor: "#4CAF50", // Lily pad green color
                  borderRadius: "50%", // Make it round
                  width: "120px",
                  height: "120px",
                  fontSize: "1.2rem",
                  fontWeight: "600",
                  boxShadow: "0 4px 14px rgba(0, 0, 0, 0.2)",
                }}
                onClick={() => {
                  if (isConnecting) return; // Prevent multiple clicks
                  
                  setIsConnecting(true);
                  connect()
                    .then(() => {
                      console.log("Connection established successfully");
                    })
                    .catch((error) => {
                      console.error("Failed to connect:", error);
                      // Could add user-facing error handling here
                    })
                    .finally(() => {
                      setIsConnecting(false);
                    });
                }}
                disabled={isConnecting}
              >
                <span>{isConnecting ? "Connecting..." : "Reflect"}</span>
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
