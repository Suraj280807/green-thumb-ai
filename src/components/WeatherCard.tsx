import { Cloud, Droplets, Sun, Thermometer, Wind, CloudRain, CloudSun, CloudSnow, Loader2 } from "lucide-react";
import { WeatherData } from "@/hooks/useWeather";

interface WeatherCardProps {
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
}

const getWeatherIcon = (condition: string) => {
  const c = condition.toLowerCase();
  if (c.includes("rain") || c.includes("drizzle")) return CloudRain;
  if (c.includes("cloud")) return CloudSun;
  if (c.includes("snow")) return CloudSnow;
  if (c.includes("clear")) return Sun;
  return Cloud;
};

const getWateringAdvice = (weather: WeatherData) => {
  if (weather.rainfall > 5 || weather.rainProbability > 60)
    return { text: "Skip watering — rain expected 🌧️", color: "text-rain" };
  if (weather.temperature > 32 && weather.humidity < 40)
    return { text: "Water in the evening 💧", color: "text-sun" };
  if (weather.humidity < 35)
    return { text: "Increase watering frequency 💨", color: "text-sky" };
  if (weather.temperature < 15)
    return { text: "Reduce watering ❄️", color: "text-sky" };
  return { text: "Water as usual 💧", color: "text-primary" };
};

const WeatherCard = ({ weather, loading, error }: WeatherCardProps) => {
  if (loading) {
    return (
      <div className="glass-card p-6 animate-fade-up flex items-center justify-center min-h-[280px]">
        <div className="text-center">
          <Loader2 size={28} className="animate-spin text-primary mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Loading weather...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-card p-6 animate-fade-up">
        <p className="text-sm text-destructive text-center">{error}</p>
      </div>
    );
  }

  if (!weather) return null;

  const WeatherIcon = getWeatherIcon(weather.condition);
  const advice = getWateringAdvice(weather);

  return (
    <div className="glass-card p-6 animate-fade-up">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-heading font-semibold text-foreground text-lg">Weather</h3>
          <p className="text-sm text-muted-foreground">
            {weather.cityName}{weather.country ? `, ${weather.country}` : ""}
          </p>
        </div>
        <div className="w-12 h-12 rounded-2xl sky-gradient flex items-center justify-center">
          <WeatherIcon size={22} className="text-primary-foreground" />
        </div>
      </div>

      <div className="flex items-end gap-1 mb-1">
        <span className="text-4xl font-bold font-heading text-foreground">{weather.temperature}°</span>
        <span className="text-muted-foreground text-sm mb-1">C</span>
      </div>
      <p className="text-sm text-muted-foreground capitalize mb-1">{weather.description}</p>
      <p className="text-xs text-muted-foreground mb-5">Feels like {weather.feelsLike}°C</p>

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
