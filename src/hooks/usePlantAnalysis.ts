import { useState, useCallback } from "react";

export interface PlantAnalysis {
  plantName: string;
  health: "Healthy" | "Unhealthy" | "Needs Attention";
  confidence: number;
  issue: string;
  action: string;
  details: string[];
}

export function usePlantAnalysis() {
  const [analysis, setAnalysis] = useState<PlantAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = useCallback(async (imageBase64: string) => {
    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/plant-analysis`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ imageBase64 }),
        }
      );

      if (res.status === 429) {
        throw new Error("Rate limited — please wait a moment and try again.");
      }
      if (res.status === 402) {
        throw new Error("AI credits exhausted. Please add funds in Settings.");
      }
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Analysis failed");
      }

      const data = await res.json();
      setAnalysis(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Analysis failed");
    } finally {
      setLoading(false);
    }
  }, []);

  return { analysis, loading, error, analyze };
}
