import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://esm.sh/zod@3.23.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const BodySchema = z.object({
  temperature: z.number(),
  humidity: z.number(),
  rain: z.number(),
  rainProbability: z.number().optional().default(0),
  plantType: z.string().min(1).max(100),
});

// Plant-specific knowledge base
const plantRules: Record<string, string[]> = {
  succulent: [
    "Needs very little water 🌵",
    "Water only when soil is completely dry",
    "Requires well-draining soil",
    "Prefers bright, indirect to direct sunlight",
  ],
  tulsi: [
    "Needs daily sunlight ☀️",
    "Water regularly but avoid waterlogging",
    "Pinch tips to encourage bushy growth",
    "Protect from frost",
  ],
  "money plant": [
    "Avoid direct sunlight 🌿",
    "Water when top soil feels dry",
    "Can grow in water or soil",
    "Thrives in indirect light",
  ],
  monstera: [
    "Prefers bright indirect light",
    "Water when top 2 inches of soil are dry",
    "Mist leaves for humidity",
    "Wipe leaves to remove dust",
  ],
  "snake plant": [
    "Very drought-tolerant 🐍",
    "Water every 2-3 weeks",
    "Tolerates low to bright indirect light",
    "Avoid overwatering — root rot prone",
  ],
  "peace lily": [
    "Thrives in low to medium light",
    "Keep soil consistently moist",
    "Droops when thirsty — a natural indicator",
    "Loves humidity — mist regularly",
  ],
  lavender: [
    "Needs full sun — 6+ hours daily ☀️",
    "Well-drained, slightly alkaline soil",
    "Water deeply but infrequently",
    "Prune after flowering to maintain shape",
  ],
  basil: [
    "Needs 6-8 hours of sunlight",
    "Keep soil moist but not waterlogged",
    "Pinch off flower buds to extend harvest",
    "Sensitive to cold — bring indoors below 10°C",
  ],
  rose: [
    "Needs 6+ hours of direct sunlight 🌹",
    "Water deeply at the base, not on leaves",
    "Mulch to retain moisture",
    "Prune dead heads to encourage blooming",
  ],
  tomato: [
    "Full sun — 8+ hours daily 🍅",
    "Water consistently at the base",
    "Stake or cage for support",
    "Feed with balanced fertilizer biweekly",
  ],
};

function getWeatherAdvice(temp: number, humidity: number, rain: number, rainProb: number): string[] {
  const advice: string[] = [];

  // Rain-based rules
  if (rain > 5 || rainProb > 60) {
    advice.push("Do not water today — rain is expected or occurring 🌧️");
  } else if (rain > 2) {
    advice.push("Light rain detected — reduce watering amount 🌦️");
  }

  // Temperature + humidity rules
  if (temp > 32 && humidity < 40) {
    advice.push("Hot and dry conditions — water in the evening for best absorption 💧");
  } else if (temp > 35) {
    advice.push("Extreme heat — water twice daily, morning and evening 🌡️");
    advice.push("Consider providing shade cover for sensitive plants");
  } else if (temp > 28) {
    advice.push("Warm day — ensure adequate water, check soil moisture 🌤️");
  }

  // Humidity rules
  if (humidity < 35) {
    advice.push("Low humidity — increase watering frequency and consider misting leaves 💨");
  } else if (humidity > 85) {
    advice.push("Very high humidity — watch for fungal issues, improve air circulation 🍃");
    advice.push("Reduce watering — plants absorb moisture from the air");
  }

  // Cold rules
  if (temp < 5) {
    advice.push("Frost risk! Move potted plants indoors or cover them ❄️");
    advice.push("Do not water — frozen roots can't absorb water");
  } else if (temp < 15) {
    advice.push("Cool temperatures — avoid frequent watering, plants need less ❄️");
    advice.push("Water in the morning so soil can warm up during the day");
  }

  // Default if no specific conditions
  if (advice.length === 0) {
    advice.push("Conditions are moderate — follow your regular watering schedule 🌱");
    advice.push("Check soil moisture before watering — water when top inch is dry");
  }

  return advice;
}

function getPlantAdvice(plantType: string): string[] {
  const key = plantType.toLowerCase().trim();
  
  // Try exact match first
  if (plantRules[key]) return plantRules[key];
  
  // Try partial match
  for (const [plantKey, rules] of Object.entries(plantRules)) {
    if (key.includes(plantKey) || plantKey.includes(key)) return rules;
  }

  return [
    `General care for ${plantType}: check soil moisture before watering`,
    "Most plants prefer morning watering",
    "Ensure proper drainage to prevent root rot",
  ];
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json();
    const parsed = BodySchema.safeParse(body);

    if (!parsed.success) {
      return new Response(JSON.stringify({ error: "Invalid input", details: parsed.error.flatten() }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { temperature, humidity, rain, rainProbability, plantType } = parsed.data;

    const weatherAdvice = getWeatherAdvice(temperature, humidity, rain, rainProbability);
    const plantAdvice = getPlantAdvice(plantType);

    const response = {
      advice: [...weatherAdvice, ...plantAdvice],
      weatherConditions: {
        temperature,
        humidity,
        rain,
        rainProbability,
      },
      plantType,
      timestamp: new Date().toISOString(),
    };

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("gardener-advice error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
