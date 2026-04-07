import { useState } from "react";
import { MapPin, Search, Loader2, Navigation } from "lucide-react";

interface LocationBarProps {
  locationName: string | null;
  loading: boolean;
  permissionDenied: boolean;
  error: string | null;
  onSearch: (city: string) => void;
  onDetect: () => void;
}

const LocationBar = ({ locationName, loading, permissionDenied, error, onSearch, onDetect }: LocationBarProps) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) onSearch(city.trim());
  };

  return (
    <div className="glass-card p-4 animate-fade-up">
      <div className="flex items-center gap-2 mb-3">
        <MapPin size={18} className="text-primary" />
        <h3 className="font-heading font-semibold text-foreground text-sm">Your Location</h3>
      </div>

      {locationName && !loading && (
        <p className="text-foreground font-medium mb-3">{locationName}</p>
      )}

      {loading && (
        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
          <Loader2 size={14} className="animate-spin" />
          <span>Detecting location...</span>
        </div>
      )}

      {error && (
        <p className="text-sm text-destructive mb-3">{error}</p>
      )}

      {(permissionDenied || error) && (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="flex-1 relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !city.trim()}
            className="px-4 py-2 rounded-xl nature-gradient text-primary-foreground text-sm font-medium disabled:opacity-50"
          >
            Search
          </button>
        </form>
      )}

      {!permissionDenied && !loading && (
        <button
          onClick={onDetect}
          className="flex items-center gap-1.5 text-xs text-primary hover:underline mt-1"
        >
          <Navigation size={12} />
          Re-detect location
        </button>
      )}
    </div>
  );
};

export default LocationBar;
