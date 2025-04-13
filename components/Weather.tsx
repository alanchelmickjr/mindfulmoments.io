"use client";

import { useEffect, useState } from "react";
import { Cloud, CloudRain, CloudSnow, Sun, Thermometer } from "lucide-react";

type WeatherData = {
  temperature: number;
  unit: string;
  description?: string;
};

export const Weather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        // Default to San Francisco if geolocation is not available
        const location = "San Francisco";
        
        const response = await fetch("/api/fetchWeather", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            parameters: JSON.stringify({
              location,
              format: "fahrenheit",
            }),
          }),
        });

        const data = await response.json();
        
        if (data.success && data.data) {
          // Parse the temperature string (e.g., "70F")
          const tempString = data.data;
          const temperature = parseInt(tempString.replace(/[^0-9]/g, ""));
          const unit = tempString.replace(/[0-9]/g, "");
          
          setWeather({
            temperature,
            unit,
          });
        }
      } catch (error) {
        console.error("Error fetching weather:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
    
    // Refresh weather data every 30 minutes
    const intervalId = setInterval(fetchWeatherData, 30 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  // Function to determine the color based on temperature
  const getTemperatureColor = (temp: number): string => {
    if (temp <= 32) return "#0ea5e9"; // Cold (light blue)
    if (temp <= 50) return "#0284c7"; // Cool (blue)
    if (temp <= 65) return "#22c55e"; // Mild (green)
    if (temp <= 80) return "#eab308"; // Warm (yellow)
    if (temp <= 90) return "#f97316"; // Hot (orange)
    return "#ef4444"; // Very hot (red)
  };

  // Function to get the appropriate weather icon
  const getWeatherIcon = (temp: number) => {
    // This is a simplified version - in a real app, you'd use the weather description
    if (temp <= 32) return <CloudSnow className="h-4 w-4 text-white" />;
    if (temp <= 50) return <CloudRain className="h-4 w-4 text-white" />;
    if (temp <= 65) return <Cloud className="h-4 w-4 text-white" />;
    return <Sun className="h-4 w-4 text-white" />;
  };

  if (loading || !weather) {
    return (
      <div className="absolute top-3 right-4 z-50 flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse">
        <Thermometer className="h-5 w-5 text-gray-400 dark:text-gray-500" />
      </div>
    );
  }

  const ringColor = getTemperatureColor(weather.temperature);

  return (
    <div className="absolute top-2 right-4 z-50">
      <div
        className="relative flex items-center justify-center h-10 w-10 rounded-full bg-gray-800 dark:bg-gray-900"
        style={{
          boxShadow: `0 0 0 2px ${ringColor}`,
        }}
      >
        {getWeatherIcon(weather.temperature)}
        <div className="absolute -bottom-6 bg-gray-800 dark:bg-gray-900 text-white text-xs px-2 py-0.5 rounded-md">
          {weather.temperature}°{weather.unit}
        </div>
      </div>
    </div>
  );
};