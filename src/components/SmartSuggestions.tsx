import { Droplets, Scissors, Sun, Wind, MoveRight, Sprout } from "lucide-react";

const suggestions = [
  {
    icon: Droplets,
    emoji: "💧",
    title: "Water today",
    description: "Temperature is above 22°C and no rain expected.",
    urgency: "high" as const,
  },
  {
    icon: Scissors,
    emoji: "✂️",
    title: "Trim leaves",
    description: "Some yellowing detected on lower leaves of your Peace Lily.",
    urgency: "medium" as const,
  },
  {
    icon: Sun,
    emoji: "☀️",
    title: "Move to sunlight",
    description: "Your Succulent needs more direct light for optimal growth.",
    urgency: "high" as const,
  },
  {
    icon: Wind,
    emoji: "🌬️",
    title: "Improve ventilation",
    description: "Humidity is high — open windows to prevent mold.",
    urgency: "low" as const,
  },
  {
    icon: Sprout,
    emoji: "🌱",
    title: "Fertilize this week",
    description: "It's growing season — add nutrients to promote healthy growth.",
    urgency: "medium" as const,
  },
];

const urgencyColors = {
  high: "border-l-health-bad bg-health-bad/5",
  medium: "border-l-health-warning bg-health-warning/5",
  low: "border-l-primary bg-primary/5",
};

const SmartSuggestions = () => {
  return (
    <section id="suggestions" className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="font-heading text-3xl font-bold text-foreground mb-2">
          🧠 Smart Suggestions
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Actionable care tips combining weather, plant data, and AI insights.
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-3">
        {suggestions.map((s, i) => (
          <div
            key={i}
            className={`glass-card border-l-4 ${urgencyColors[s.urgency]} p-4 flex items-center gap-4 animate-fade-up hover:scale-[1.01] transition-transform duration-200`}
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0">
              <span className="text-lg">{s.emoji}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-heading font-semibold text-foreground text-sm">{s.title}</h4>
              <p className="text-xs text-muted-foreground">{s.description}</p>
            </div>
            <MoveRight size={16} className="text-muted-foreground shrink-0" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SmartSuggestions;
