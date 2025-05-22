"use client";

interface VoiceConfig {
  id: string;
  name: string;
  description: string;
  previewUrl?: string;
}

export const fetchAvailableVoices = async (): Promise<VoiceConfig[]> => {
  try {
    const response = await fetch('/api/voiceConfigs');
    if (!response.ok) throw new Error('Failed to fetch voice configs');
    return await response.json();
  } catch (error) {
    console.error('Error fetching voice configs:', error);
    return [];
  }
};

export const storeSelectedVoice = (configId: string) => {
  localStorage.setItem('selectedVoice', configId);
};

export const getStoredVoice = (): string | null => {
  return localStorage.getItem('selectedVoice');
};
