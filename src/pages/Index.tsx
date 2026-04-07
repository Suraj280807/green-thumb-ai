import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WeatherCard from "@/components/WeatherCard";
import PlantRecommendations from "@/components/PlantRecommendations";
import ImageUploadAnalysis from "@/components/ImageUploadAnalysis";
import SmartSuggestions from "@/components/SmartSuggestions";
import Footer from "@/components/Footer";
import { Calendar, MapPin, Bell } from "lucide-react";

const QuickStats = () => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto -mt-8 relative z-20 px-4">
    {[
      { icon: MapPin, label: "Location", value: "San Francisco", color: "text-primary" },
      { icon: Calendar, label: "Season", value: "Spring", color: "text-leaf" },
      { icon: Bell, label: "Reminders", value: "3 Active", color: "text-sun" },
    ].map((stat) => (
      <div key={stat.label} className="glass-card p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0">
          <stat.icon size={18} className={stat.color} />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{stat.label}</p>
          <p className="font-heading font-semibold text-sm text-foreground">{stat.value}</p>
        </div>
      </div>
    ))}
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-16">
        <HeroSection />
        <QuickStats />

        <section id="dashboard" className="py-16 px-4 max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-2">
              🌤️ Today's Dashboard
            </h2>
            <p className="text-muted-foreground">
              Your garden at a glance — weather, tips, and care reminders.
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <WeatherCard />
          </div>
        </section>

        <PlantRecommendations />
        <ImageUploadAnalysis />
        <SmartSuggestions />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
