import { useState, useRef } from "react";
import { Upload, Loader2, CheckCircle, AlertTriangle, XCircle, Leaf } from "lucide-react";
import { usePlantAnalysis, PlantAnalysis } from "@/hooks/usePlantAnalysis";

const statusConfig = {
  Healthy: { icon: CheckCircle, label: "Healthy", colorClass: "text-health-good", bgClass: "bg-health-good/10" },
  "Needs Attention": { icon: AlertTriangle, label: "Needs Attention", colorClass: "text-health-warning", bgClass: "bg-health-warning/10" },
  Unhealthy: { icon: XCircle, label: "Unhealthy", colorClass: "text-health-bad", bgClass: "bg-health-bad/10" },
};

const ImageUploadAnalysis = () => {
  const [image, setImage] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const { analysis, loading, error, analyze } = usePlantAnalysis();

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) handleFile(file);
  };

  const handleAnalyze = () => {
    if (image) analyze(image);
  };

  const reset = () => {
    setImage(null);
  };

  const config = analysis ? statusConfig[analysis.health] || statusConfig["Needs Attention"] : null;
  const StatusIcon = config?.icon;

  return (
    <section id="ai-analysis" className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="font-heading text-3xl font-bold text-foreground mb-2">
          🔍 AI Plant Health Analysis
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Upload a photo for real AI-powered health diagnosis using AI.
        </p>
      </div>

      <div className="max-w-2xl mx-auto grid gap-6">
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="glass-card p-8"
        >
          {!image ? (
            <div
              onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed border-border rounded-2xl p-12 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
                <Upload size={28} className="text-muted-foreground" />
              </div>
              <p className="font-medium text-foreground mb-1">Drop your plant photo here</p>
              <p className="text-sm text-muted-foreground">or click to browse • JPG, PNG supported</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden">
                <img src={image} alt="Uploaded plant" className="w-full max-h-80 object-cover" />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleAnalyze}
                  disabled={loading}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl nature-gradient text-primary-foreground font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Analyzing with AI...
                    </>
                  ) : (
                    <>
                      <Leaf size={18} />
                      Analyze Plant
                    </>
                  )}
                </button>
                <button
                  onClick={reset}
                  className="px-5 py-3 rounded-2xl bg-secondary text-secondary-foreground font-semibold text-sm hover:bg-secondary/80 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          )}

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
        </div>

        {error && (
          <div className="glass-card p-4 border-l-4 border-l-destructive animate-scale-in">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {analysis && config && StatusIcon && (
          <div className="glass-card p-6 animate-scale-in">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl ${config.bgClass} flex items-center justify-center`}>
                <StatusIcon size={20} className={config.colorClass} />
              </div>
              <div>
                <h4 className="font-heading font-semibold text-foreground">{analysis.plantName}</h4>
                <p className={`text-sm font-medium ${config.colorClass}`}>
                  {config.label} • {analysis.confidence}% confidence
                </p>
              </div>
            </div>

            {analysis.issue !== "None" && (
              <div className="bg-health-warning/10 rounded-xl p-3 mb-4">
                <p className="text-sm font-medium text-foreground">⚠️ Issue: {analysis.issue}</p>
                <p className="text-sm text-muted-foreground">{analysis.action}</p>
              </div>
            )}

            {analysis.issue === "None" && (
              <div className="bg-health-good/10 rounded-xl p-3 mb-4">
                <p className="text-sm font-medium text-foreground">✅ No issues detected</p>
                <p className="text-sm text-muted-foreground">{analysis.action}</p>
              </div>
            )}

            <div className="space-y-2">
              {analysis.details.map((s, i) => (
                <div key={i} className="flex items-start gap-2 bg-secondary/50 rounded-xl p-3">
                  <span className="text-primary mt-0.5">•</span>
                  <p className="text-sm text-foreground">{s}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ImageUploadAnalysis;
