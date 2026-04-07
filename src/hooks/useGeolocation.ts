import { useState, useEffect, useCallback } from "react";

interface Location {
  lat: number;
  lon: number;
  name: string;
  country?: string;
  state?: string;
}

export function useGeolocation() {
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);

  const detectLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setPermissionDenied(true);
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const loc: Location = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          name: "Detecting...",
        };
        setLocation(loc);
        setLoading(false);

        // Reverse geocode via weather API (city name comes from weather response)
        try {
          const res = await fetch(
            `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/weather?lat=${loc.lat}&lon=${loc.lon}`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
              },
            }
          );
          if (res.ok) {
            const data = await res.json();
            setLocation((prev) =>
              prev ? { ...prev, name: data.cityName || "Unknown", country: data.country } : prev
            );
          }
        } catch {}
      },
      (err) => {
        setLoading(false);
        setPermissionDenied(true);
        if (err.code === 1) {
          setError("Location permission denied");
        } else {
          setError("Could not detect location");
        }
      },
      { enableHighAccuracy: false, timeout: 10000 }
    );
  }, []);

  const searchCity = useCallback(async (city: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/geocode?city=${encodeURIComponent(city)}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "City not found");
      }

      const data = await res.json();
      setLocation({
        lat: data.lat,
        lon: data.lon,
        name: data.name,
        country: data.country,
        state: data.state,
      });
      setPermissionDenied(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Search failed");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    detectLocation();
  }, [detectLocation]);

  return { location, loading, error, permissionDenied, detectLocation, searchCity };
}
