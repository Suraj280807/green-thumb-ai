import { Cloud, Droplets, Sun, Thermometer, Wind, CloudRain } from "lucide-react";
import { useState, useEffect } from "react";

interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  condition: string;
  icon: "sun" | "cloud" | "rain";
}

const mockWeather: WeatherData = {
  temperature: 24,
  humidity: 65,
  rainfall: 2.5,
  windSpeed: 12,
  condition: "Partly Cloudy",
  icon: "cloud",
};

const weatherIcons = {
  sun: Sun,
  cloud: Cloud,
  rain: CloudRain,
};

const WeatherCard = () => {
  const [weather, setWeather] = useState<WeatherData>(mockWeather);
  const [location, setLocation] = useState("San Francisco, CA");

  const WeatherIcon = weatherIcons[weather.icon];

  const getWateringAdvice = () => {
    if (weather.rainfall > 5) return { text: "Skip watering today 🌧️", color: "text-rain" };
    if (weather.humidity > 80) return { text: "Reduce watering 💧", color: "text-sky" };
    if (weather.temperature > 30) return { text: "Water twice today ☀️", color: "text-sun" };
    return { text: "Water as usual 💧", color: "text-primary" };
  };

  const advice = getWateringAdvice();

  return (
    <div className="glass-card p-6 animate-fade-up">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-heading font-semibold text-foreground text-lg">Weather</h3>
          <p className="text-sm text-muted-foreground">{location}</p>
        </div>
        <div className="w-12 h-12 rounded-2xl sky-gradient flex items-center justify-center">
          <WeatherIcon size={22} className="text-primary-foreground" />
        </div>
      </div>

      <div className="flex items-end gap-1 mb-1">
        <span className="text-4xl font-bold font-heading text-foreground">{weather.temperature}°</span>
        <span className="text-muted-foreground text-sm mb-1">C</span>
      </div>
      <p className="text-sm text-muted-foreground mb-5">{weather.condition}</p>

      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { icon: Droplets, label: "Humidity", value: `${weather.humidity}%`, iconColor: "text-sky" },
          { icon: CloudRain, label: "Rain", value: `${weather.rainfall}mm`, iconColor: "text-rain" },
          { icon: Wind, label: "Wind", value: `${weather.windSpeed}km/h`, iconColor: "text-muted-foreground" },
        ].map((item) => (
          <div key={item.label} className="bg-secondary/50 rounded-xl p-3 text-center">
            <item.icon size={16} className={`${item.iconColor} mx-auto mb-1`} />
            <p className="text-xs text-muted-foreground">{item.label}</p>
            <p className="text-sm font-semibold text-foreground">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-leaf-light rounded-xl p-3">
        <p className="text-sm font-medium text-foreground">🌱 Care Tip</p>
        <p className={`text-sm font-semibold ${advice.color}`}>{advice.text}</p>
      </div>
    </div>
  );
};

export default WeatherCard;
