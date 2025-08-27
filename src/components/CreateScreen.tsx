import React, { useState } from "react";
import { Camera, Upload, Loader2, RefreshCw } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";
import { ImageWithFallback } from "./figma/ImageWithFallback";

type CreationState = "upload" | "processing" | "result";

const CreateScreen = () => {
  const [state, setState] = useState<CreationState>("upload");
  const [progress, setProgress] = useState(0);
  const [petName, setPetName] = useState("");
  const [detectedBreed, setDetectedBreed] = useState("Golden Retriever Mix");

  const handleUpload = () => {
    setState("processing");
    setProgress(0);

    // Simulate processing with progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setState("result");
          setDetectedBreed("Golden Retriever Mix");
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  const handleRegenerate = () => {
    setState("processing");
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setState("result");
          return 100;
        }
        return prev + 3;
      });
    }, 40);
  };

  const handleSave = () => {
    // Reset to upload state after saving
    setState("upload");
    setPetName("");
    setProgress(0);
  };

  return (
    <div className="flex flex-col min-h-full p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3 pt-4">
        <Camera size={24} className="text-primary" />
        <h1 className="text-xl font-semibold">Create Your Pet</h1>
      </div>

      {/* Upload State */}
      {state === "upload" && (
        <div className="flex-1 flex flex-col justify-center space-y-6">
          <Card className="petpixel-card">
            <CardContent className="p-8">
              <div
                className="border-2 border-dashed border-border rounded-lg p-12 text-center space-y-4 cursor-pointer hover:border-primary/50 transition-colors"
                onClick={handleUpload}
              >
                <Upload size={48} className="mx-auto text-muted-foreground" />
                <div>
                  <h3 className="font-semibold mb-2">Upload Pet Photo</h3>
                  <p className="text-sm text-muted-foreground">
                    Tap to take photo or select from gallery
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Processing State */}
      {state === "processing" && (
        <div className="flex-1 flex flex-col justify-center space-y-6">
          <Card className="petpixel-card">
            <CardContent className="p-8 text-center space-y-6">
              <div className="w-24 h-24 mx-auto">
                <Loader2 size={96} className="animate-spin text-primary" />
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold">Analyzing your pet...</h3>
                <p className="text-sm text-muted-foreground">
                  Converting your photo into a unique pixel pet
                </p>
                <Progress value={progress} className="w-full" />
                <p className="text-xs text-muted-foreground">
                  {progress}% complete
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Result State */}
      {state === "result" && (
        <div className="flex-1 space-y-6">
          <Card className="petpixel-card">
            <CardContent className="p-6">
              {/* Pet Preview */}
              <div className="text-center space-y-4 mb-6">
                <div className="w-40 h-40 mx-auto bg-gradient-to-br from-amber-400 via-orange-500 to-red-600 rounded-2xl p-3 shadow-2xl">
                  <div className="w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-green-400 to-blue-500 p-2">
                    <img
                      src="/pixel-dog.png"
                      alt="Pixel Pet"
                      className="w-full h-full rounded-lg object-contain"
                      style={{ imageRendering: "pixelated" }}
                      onError={(e) => {
                        console.log("Image failed to load");
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <Input
                    placeholder="Name your pet"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    className="petpixel-input text-center font-semibold text-lg"
                  />
                  <div className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full px-4 py-2 border border-blue-400/30">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <p className="text-sm text-blue-300 font-medium">
                      Detected: {detectedBreed}
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats Grid - OpenSea Style */}
              <div className="space-y-4 mb-6">
                <h3 className="text-center font-semibold text-lg text-primary">
                  Pet Traits
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {/* Health Trait */}
                  <div className="petpixel-card p-4 rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
                    <div className="text-center space-y-2">
                      <div className="text-xs text-blue-400 font-medium uppercase tracking-wide">
                        Health
                      </div>
                      <div className="text-xl font-bold text-foreground">
                        85
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Top 15%
                      </div>
                    </div>
                  </div>

                  {/* Happiness Trait */}
                  <div className="petpixel-card p-4 rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
                    <div className="text-center space-y-2">
                      <div className="text-xs text-yellow-400 font-medium uppercase tracking-wide">
                        Happiness
                      </div>
                      <div className="text-xl font-bold text-foreground">
                        92
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Top 8%
                      </div>
                    </div>
                  </div>

                  {/* Energy Trait */}
                  <div className="petpixel-card p-4 rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
                    <div className="text-center space-y-2">
                      <div className="text-xs text-orange-400 font-medium uppercase tracking-wide">
                        Energy
                      </div>
                      <div className="text-xl font-bold text-foreground">
                        78
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Top 35%
                      </div>
                    </div>
                  </div>

                  {/* Loyalty Trait */}
                  <div className="petpixel-card p-4 rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
                    <div className="text-center space-y-2">
                      <div className="text-xs text-purple-400 font-medium uppercase tracking-wide">
                        Loyalty
                      </div>
                      <div className="text-xl font-bold text-foreground">
                        95
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Top 2%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Special Abilities - Keep this part! */}
                <div className="mt-6 space-y-3">
                  <h4 className="text-center font-medium text-primary">
                    Special Abilities
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="petpixel-card p-3 rounded-lg border border-border/50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">🌟</span>
                          <span className="text-sm font-medium text-foreground">
                            Fetch Master
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          Rare
                        </span>
                      </div>
                    </div>
                    <div className="petpixel-card p-3 rounded-lg border border-border/50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">🎾</span>
                          <span className="text-sm font-medium text-foreground">
                            Playful
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          Common
                        </span>
                      </div>
                    </div>
                    <div className="petpixel-card p-3 rounded-lg border border-border/50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">🛡️</span>
                          <span className="text-sm font-medium text-foreground">
                            Loyal Guardian
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          Epic
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons - Back to Original */}
              <div className="space-y-3">
                <Button
                  className="w-full petpixel-gradient text-primary-foreground font-semibold"
                  onClick={handleSave}
                >
                  Save to Collection
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-primary/50 text-primary hover:bg-primary/10"
                  onClick={handleRegenerate}
                >
                  <RefreshCw size={16} className="mr-2" />
                  Regenerate
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CreateScreen;
