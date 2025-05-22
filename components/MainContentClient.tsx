"use client";

import React, { useState } from 'react';
import dynamic from "next/dynamic";
import SwirlingPointsVisualization from './SwirlingPointsVisualization'; // Assuming it's in the same directory or correct path
import TextInputDrawer from './TextInputDrawer'; // Import the new component

// Dynamically import Chat as it was in page.tsx
const Chat = dynamic(() => import("@/components/Chat"), {
  ssr: false,
});

interface MainContentClientProps {
  accessToken: string;
}

const MainContentClient: React.FC<MainContentClientProps> = ({ accessToken }) => {
  const [isListening, setIsListening] = useState(false);
  const [isTalking, setIsTalking] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleTextSubmit = (text: string) => {
    console.log("Text submitted from drawer:", text);
    // Here you would typically send the text to your chat backend or handle it as needed
  };

  return (
    <div className={"grow flex flex-col items-center justify-center relative"}>
      <div className="absolute top-4 left-4 z-10 flex space-x-2">
        <button
          onClick={() => setIsListening(prev => !prev)}
          className={`px-4 py-2 rounded ${isListening ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
        >
          {isListening ? 'Stop Listening' : 'Start Listening'}
        </button>
        <button
          onClick={() => setIsTalking(prev => !prev)}
          className={`px-4 py-2 rounded ${isTalking ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
        >
          {isTalking ? 'Stop Talking' : 'Start Talking'}
        </button>
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="px-4 py-2 rounded bg-purple-500 text-white"
        >
          Open Text Input
        </button>
      </div>

      <div className="mb-8"> {/* Added margin for spacing */}
        <SwirlingPointsVisualization
          isListening={isListening}
          isTalking={isTalking}
          width={400}
          height={400}
        />
      </div>

      {/* The Chat component can be placed below or alongside */}
      <div className="w-full max-w-md"> {/* Example styling for chat */}
        <Chat accessToken={accessToken} />
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