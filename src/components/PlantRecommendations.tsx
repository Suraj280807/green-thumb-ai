import { useState } from "react";
import PlantCard from "./PlantCard";
import monsteraImg from "@/assets/plant-monstera.jpg";
import snakeImg from "@/assets/plant-snake.jpg";
import peaceLilyImg from "@/assets/plant-peace-lily.jpg";
import succulentImg from "@/assets/plant-succulent.jpg";
import lavenderImg from "@/assets/plant-lavender.jpg";

const plants = [
  {
    name: "Monstera Deliciosa",
    image: monsteraImg,
    careTips: "Keep in bright, indirect light. Wipe leaves regularly to remove dust.",
    waterFrequency: "Weekly",
    sunlight: "Indirect",
    season: "Spring",
  },
  {
    name: "Snake Plant",
    image: snakeImg,
    careTips: "Very drought-tolerant. Perfect for beginners — thrives on neglect.",
    waterFrequency: "Bi-weekly",
    sunlight: "Low-High",
    season: "All Year",
  },
  {
    name: "Peace Lily",
    image: peaceLilyImg,
    careTips: "Loves humidity. Droops when thirsty — a natural watering reminder!",
    waterFrequency: "Weekly",
    sunlight: "Low Light",
    season: "Spring",
  },
  {
    name: "Echeveria",
    image: succulentImg,
    careTips: "Needs well-draining soil. Water only when soil is completely dry.",
    waterFrequency: "Bi-weekly",
    sunlight: "Full Sun",
    season: "Summer",
  },
  {
    name: "Lavender",
    image: lavenderImg,
    careTips: "Loves sun and well-drained soil. Trim after flowering to maintain shape.",
    waterFrequency: "Weekly",
    sunlight: "Full Sun",
    season: "Summer",
  },
];

const seasons = ["All", "Spring", "Summer", "Autumn", "Winter", "All Year"];

const PlantRecommendations = () => {
  const [selectedSeason, setSelectedSeason] = useState("All");

  const filtered = selectedSeason === "All"
    ? plants
    : plants.filter((p) => p.season === selectedSeason);

  return (
    <section id="plants" className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="font-heading text-3xl font-bold text-foreground mb-2">
          🌿 Recommended Plants
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Curated picks based on your local climate and season.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {seasons.map((season) => (
          <button
            key={season}
            onClick={() => setSelectedSeason(season)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              selectedSeason === season
                ? "nature-gradient text-primary-foreground shadow-md"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {season}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((plant) => (
          <PlantCard key={plant.name} {...plant} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-12">
          No plants found for this season. Try another filter!
        </p>
      )}
    </section>
  );
};

export default PlantRecommendations;
