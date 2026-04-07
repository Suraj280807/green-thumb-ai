import { useState, useRef } from "react";
import { Upload, Camera, Loader2, CheckCircle, AlertTriangle, XCircle, Leaf } from "lucide-react";

interface AnalysisResult {
  status: "healthy" | "warning" | "unhealthy";
  confidence: number;
  suggestions: string[];
  plantName: string;
}

const mockAnalyze = (): Promise<AnalysisResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const results: AnalysisResult[] = [
        {
          status: "healthy",
          confidence: 92,
          plantName: "Monstera Deliciosa",
          suggestions: [
            "Your plant looks great! Continue current care routine.",
            "Consider rotating the pot weekly for even growth.",
            "Mist leaves occasionally for added humidity.",
          ],
        },
        {
          status: "warning",
          confidence: 78,
          plantName: "Peace Lily",
          suggestions: [
            "Slight yellowing on lower leaves detected.",
            "Reduce watering frequency — soil may be too moist.",
            "Move to a spot with more indirect light.",
          ],
        },
        {
          status: "unhealthy",
          confidence: 85,
          plantName: "Fiddle Leaf Fig",
          suggestions: [
            "Brown spots detected — possible overwatering.",
            "Check for root rot and repot if needed.",
            "Ensure proper drainage in the pot.",
            "Trim affected leaves to prevent spread.",
          ],
        },
      ];
      resolve(results[Math.floor(Math.random() * results.length)]);
    }, 2000);
  });
};

const statusConfig = {
  healthy: { icon: CheckCircle, label: "Healthy", colorClass: "text-health-good", bgClass: "bg-health-good/10" },
  warning: { icon: AlertTriangle, label: "Needs Attention", colorClass: "text-health-warning", bgClass: "bg-health-warning/10" },
  unhealthy: { icon: XCircle, label: "Unhealthy", colorClass: "text-health-bad", bgClass: "bg-health-bad/10" },
};

const ImageUploadAnalysis = () => {
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
      setResult(null);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) handleFile(file);
  };

  const analyze = async () => {
    setAnalyzing(true);
    const res = await mockAnalyze();
    setResult(res);
    setAnalyzing(false);
  };

  const reset = () => {
    setImage(null);
    setResult(null);
  };

  const StatusIcon = result ? statusConfig[result.status].icon : null;

  return (
    <section id="ai-analysis" className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="font-heading text-3xl font-bold text-foreground mb-2">
          🔍 AI Plant Health Analysis
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Upload a photo of your plant and get instant health insights.
        </p>
      </div>

      <div className="max-w-2xl mx-auto grid gap-6">
        {/* Upload area */}
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
                  onClick={analyze}
                  disabled={analyzing}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl nature-gradient text-primary-foreground font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-60"
                >
                  {analyzing ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Analyzing...
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

        {/* Result card */}
        {result && StatusIcon && (
          <div className="glass-card p-6 animate-scale-in">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl ${statusConfig[result.status].bgClass} flex items-center justify-center`}>
                <StatusIcon size={20} className={statusConfig[result.status].colorClass} />
              </div>
              <div>
                <h4 className="font-heading font-semibold text-foreground">{result.plantName}</h4>
                <p className={`text-sm font-medium ${statusConfig[result.status].colorClass}`}>
                  {statusConfig[result.status].label} • {result.confidence}% confidence
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {result.suggestions.map((s, i) => (
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
