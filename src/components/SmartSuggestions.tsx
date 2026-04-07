import { useState, useEffect } from "react";
import { Loader2, Leaf, MoveRight } from "lucide-react";
import { useGardenAdvice } from "@/hooks/useGardenAdvice";
import { WeatherData } from "@/hooks/useWeather";

const PLANT_TYPES = [
  "Monstera",
  "Snake Plant",
  "Peace Lily",
  "Succulent",
  "Lavender",
  "Tulsi",
  "Money Plant",
  "Basil",
  "Rose",
  "Tomato",
];

interface SmartSuggestionsProps {
  weather: WeatherData | null;
}

const SmartSuggestions = ({ weather }: SmartSuggestionsProps) => {
  const [selectedPlant, setSelectedPlant] = useState("Monstera");
  const { advice, loading, error, fetchAdvice } = useGardenAdvice();

  useEffect(() => {
    if (weather) {
      fetchAdvice(
        weather.temperature,
        weather.humidity,
        weather.rainfall,
        weather.rainProbability,
        selectedPlant
      );
    }
  }, [weather, selectedPlant, fetchAdvice]);

  const getAdviceEmoji = (text: string) => {
    if (text.includes("water") || text.includes("Water") || text.includes("💧")) return "💧";
    if (text.includes("rain") || text.includes("🌧")) return "🌧️";
    if (text.includes("sun") || text.includes("☀")) return "☀️";
    if (text.includes("frost") || text.includes("❄") || text.includes("cold") || text.includes("Cool")) return "❄️";
    if (text.includes("humid") || text.includes("💨")) return "💨";
    if (text.includes("fungal") || text.includes("rot")) return "⚠️";
    if (text.includes("shade")) return "🏠";
    if (text.includes("drain")) return "🪴";
    return "🌱";
  };

  return (
    <section id="suggestions" className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="font-heading text-3xl font-bold text-foreground mb-2">
          🧠 Smart Garden Advice
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Real-time care suggestions based on your weather and plant selection.
        </p>
      </div>

      {/* Plant selector */}
      <div className="max-w-2xl mx-auto mb-6">
        <label className="block text-sm font-medium text-foreground mb-2">Select your plant:</label>
        <div className="flex flex-wrap gap-2">
          {PLANT_TYPES.map((plant) => (
            <button
              key={plant}
              onClick={() => setSelectedPlant(plant)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                selectedPlant === plant
                  ? "nature-gradient text-primary-foreground shadow-md"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {plant}
            </button>
          ))}
        </div>
      </div>

      {/* Advice cards */}
      <div className="max-w-2xl mx-auto space-y-3">
        {loading && (
          <div className="glass-card p-8 text-center">
            <Loader2 size={24} className="animate-spin text-primary mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Getting advice...</p>
          </div>
        )}

        {error && (
          <div className="glass-card p-4 border-l-4 border-l-destructive">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {!loading && !weather && (
          <div className="glass-card p-8 text-center">
            <Leaf size={32} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Waiting for weather data to generate advice...</p>
          </div>
        )}

        {!loading && advice?.advice.map((text, i) => (
          <div
            key={i}
            className="glass-card border-l-4 border-l-primary p-4 flex items-center gap-4 animate-fade-up hover:scale-[1.01] transition-transform duration-200"
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0">
              <span className="text-lg">{getAdviceEmoji(text)}</span>
            </div>
            <p className="flex-1 text-sm text-foreground">{text}</p>
            <MoveRight size={16} className="text-muted-foreground shrink-0" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SmartSuggestions;
