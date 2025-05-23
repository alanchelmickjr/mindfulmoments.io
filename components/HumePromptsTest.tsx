"use client";

import { HumeClient } from "hume";
import React, { useEffect, useState } from "react";

interface Prompt {
  id: string;
  name: string;
  // Add other prompt properties if needed
}

export default function HumePromptsTest() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchPrompts() {
      setIsLoading(true);
      setError(null);
      try {
        const apiKey = process.env.NEXT_PUBLIC_HUME_API_KEY;
        if (!apiKey) {
          throw new Error("HUME_API_KEY is not set in environment variables.");
        }
        const client = new HumeClient({ apiKey });
        let page = await client.empathicVoice.prompts.listPrompts({
          pageNumber: 0,
          pageSize: 10,
        });

        const fetchedPrompts: Prompt[] = [];
        // TEMP: Log the page object to inspect its structure
        console.log("Hume prompt page object:", page);

        setPrompts(fetchedPrompts);
      } catch (e: any) {
        console.error("Failed to fetch prompts:", e);
        setError(e.message || "An unknown error occurred.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchPrompts();
  }, []);

  if (isLoading) {
    return <div>Loading prompts...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Hume Prompts Test</h2>
      {prompts.length > 0 ? (
        <ul>
          {prompts.map((prompt) => (
            <li key={prompt.id}>{prompt.name} (ID: {prompt.id})</li>
          ))}
        </ul>
      ) : (
        <p>No prompts found.</p>
      )}
    </div>
  );
}