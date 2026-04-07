import { Leaf, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-garden.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Lush garden"
          className="w-full h-full object-cover"
          width={1920}
          height={800}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-up">
          <Sparkles size={14} className="text-primary" />
          <span className="text-sm font-medium text-primary">AI-Powered Plant Care</span>
        </div>

        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          Your Smart
          <span className="text-primary"> Gardening </span>
          Assistant
        </h1>

        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          Get weather-based care tips, plant recommendations, and AI health analysis — all in one beautiful dashboard.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <a
            href="#dashboard"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl nature-gradient text-primary-foreground font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Leaf size={18} />
            Get Started
          </a>
          <a
            href="#ai-analysis"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-card border border-border text-foreground font-semibold text-sm hover:bg-secondary transition-all duration-300"
          >
            Analyze Plant
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
