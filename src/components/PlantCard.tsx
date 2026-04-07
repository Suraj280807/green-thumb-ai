import { Droplets, Sun, Heart } from "lucide-react";
import { useState } from "react";

interface PlantCardProps {
  name: string;
  image: string;
  careTips: string;
  waterFrequency: string;
  sunlight: string;
  season: string;
}

const PlantCard = ({ name, image, careTips, waterFrequency, sunlight, season }: PlantCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="glass-card overflow-hidden group hover:scale-[1.02] transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          width={512}
          height={640}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center transition-colors hover:bg-card"
        >
          <Heart
            size={16}
            className={isFavorite ? "fill-destructive text-destructive" : "text-muted-foreground"}
          />
        </button>
        <span className="absolute bottom-3 left-3 px-2 py-1 rounded-lg bg-primary/90 text-primary-foreground text-xs font-medium">
          {season}
        </span>
      </div>

      <div className="p-4">
        <h4 className="font-heading font-semibold text-foreground mb-2">{name}</h4>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{careTips}</p>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs text-sky">
            <Droplets size={13} />
            <span>{waterFrequency}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-sun">
            <Sun size={13} />
            <span>{sunlight}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;
