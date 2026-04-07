import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://esm.sh/zod@3.23.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const QuerySchema = z.object({
  lat: z.string().transform(Number).pipe(z.number().min(-90).max(90)),
  lon: z.string().transform(Number).pipe(z.number().min(-180).max(180)),
});

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const API_KEY = Deno.env.get("OPENWEATHERMAP_API_KEY");
    if (!API_KEY) throw new Error("OPENWEATHERMAP_API_KEY is not configured");

    const url = new URL(req.url);
    const parsed = QuerySchema.safeParse({
      lat: url.searchParams.get("lat"),
      lon: url.searchParams.get("lon"),
    });

    if (!parsed.success) {
      return new Response(JSON.stringify({ error: "Invalid lat/lon parameters", details: parsed.error.flatten() }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { lat, lon } = parsed.data;

    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );

    if (!weatherRes.ok) {
      const errText = await weatherRes.text();
      console.error("OpenWeatherMap error:", weatherRes.status, errText);
      return new Response(JSON.stringify({ error: "Weather API error" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await weatherRes.json();

    const weather = {
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      windSpeed: Math.round((data.wind?.speed || 0) * 3.6), // m/s to km/h
      condition: data.weather?.[0]?.main || "Unknown",
      description: data.weather?.[0]?.description || "",
      icon: data.weather?.[0]?.icon || "01d",
      rainfall: data.rain?.["1h"] || data.rain?.["3h"] || 0,
      rainProbability: data.clouds?.all || 0, // cloud cover as proxy
      cityName: data.name,
      country: data.sys?.country,
    };

    return new Response(JSON.stringify(weather), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("weather error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
