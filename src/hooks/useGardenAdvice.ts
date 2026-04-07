import { useState, useCallback } from "react";

export interface GardenAdvice {
  advice: string[];
  weatherConditions: {
    temperature: number;
    humidity: number;
    rain: number;
    rainProbability: number;
  };
  plantType: string;
  timestamp: string;
}

export function useGardenAdvice() {
  const [advice, setAdvice] = useState<GardenAdvice | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAdvice = useCallback(
    async (temperature: number, humidity: number, rain: number, rainProbability: number, plantType: string) => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/gardener-advice`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            },
            body: JSON.stringify({ temperature, humidity, rain, rainProbability, plantType }),
          }
        );

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed to get advice");
        }

        const data = await res.json();
        setAdvice(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to get advice");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { advice, loading, error, fetchAdvice };
}
