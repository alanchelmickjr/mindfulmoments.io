declare module "@humeai/voice-react" {
  import * as React from "react";

  export interface VoiceProviderProps {
    auth?: { type: "apiKey"; value: string } | { type: "accessToken"; value: string };
    hostname?: string;
    configId?: string;
    onMessage?: (...args: any[]) => void;
    onToolCall?: (...args: any[]) => void;
    onError?: (...args: any[]) => void;
    children?: React.ReactNode;
  }

  export const VoiceProvider: React.FC<VoiceProviderProps>;
  export type ToolCallHandler = (...args: any[]) => Promise<any>;

  // Add useVoice hook as a generic export
  export function useVoice(): any;
}