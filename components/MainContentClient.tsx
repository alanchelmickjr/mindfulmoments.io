"use client";

import React, { useState } from 'react'; // Removed useEffect
// Removed imports from @/utils/voiceConfig as they are no longer needed here
import dynamic from "next/dynamic";
import SwirlingPointsVisualization from './SwirlingPointsVisualization'; // Assuming it's in the same directory or correct path
import TextInputDrawer from './TextInputDrawer'; // Import the new component

// Dynamically import Chat as it was in page.tsx
const Chat = dynamic(() => import("@/components/Chat"), {
  ssr: false,
});

const MainContentClient: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [isTalking, setIsTalking] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleTextSubmit = (text: string) => {
    console.log("Text submitted from drawer:", text);
    // Here you would typically send the text to your chat backend or handle it as needed
  };

  return (
    <div className={"grow flex flex-col items-center justify-center relative"}>
      <div className="mb-8"> {/* Added margin for spacing, removed buttons */}
        <SwirlingPointsVisualization
          isListening={isListening} // Consider if this is still needed here
          isTalking={isTalking}     // Consider if this is still needed here
          width={400}
          height={400}
        />
      </div>

      {/* The Chat component can be placed below or alongside */}
      <div className="w-full max-w-md"> {/* Example styling for chat */}
        <Chat />
      </div>

      <TextInputDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSubmit={handleTextSubmit}
      />
    </div>
  );
};

export default MainContentClient;