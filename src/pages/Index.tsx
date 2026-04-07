import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LocationBar from "@/components/LocationBar";
import WeatherCard from "@/components/WeatherCard";
import PlantRecommendations from "@/components/PlantRecommendations";
import ImageUploadAnalysis from "@/components/ImageUploadAnalysis";
import SmartSuggestions from "@/components/SmartSuggestions";
import Footer from "@/components/Footer";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useWeather } from "@/hooks/useWeather";

const Index = () => {
  const { location, loading: geoLoading, error: geoError, permissionDenied, detectLocation, searchCity } = useGeolocation();
  const { weather, loading: weatherLoading, error: weatherError } = useWeather(
    location?.lat ?? null,
    location?.lon ?? null
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-16">
        <HeroSection />

        <section id="dashboard" className="py-16 px-4 max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-2">
              🌤️ Today's Dashboard
            </h2>
            <p className="text-muted-foreground">
              Live weather data and personalized garden care — powered by your location.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <LocationBar
              locationName={location ? `${location.name}${location.country ? `, ${location.country}` : ""}` : null}
              loading={geoLoading}
              permissionDenied={permissionDenied}
              error={geoError}
              onSearch={searchCity}
              onDetect={detectLocation}
            />
            <WeatherCard weather={weather} loading={weatherLoading} error={weatherError} />
          </div>
        </section>

        <PlantRecommendations />
        <ImageUploadAnalysis />
        <SmartSuggestions weather={weather} />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
