import React, { useState } from 'react';
import { Camera, Upload, Loader2, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';

type CreationState = 'upload' | 'processing' | 'result';

const CreateScreen = () => {
  const [state, setState] = useState<CreationState>('upload');
  const [progress, setProgress] = useState(0);
  const [petName, setPetName] = useState('');
  const [detectedBreed, setDetectedBreed] = useState('Golden Retriever');

  const handleUpload = () => {
    setState('processing');
    setProgress(0);
    
    // Simulate processing with progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setState('result');
          setDetectedBreed('Golden Retriever');
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  const handleRegenerate = () => {
    setState('processing');
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setState('result');
          return 100;
        }
        return prev + 3;
      });
    }, 40);
  };

  const handleSave = () => {
    // Reset to upload state after saving
    setState('upload');
    setPetName('');
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
      {state === 'upload' && (
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
      {state === 'processing' && (
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
                <p className="text-xs text-muted-foreground">{progress}% complete</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Result State */}
      {state === 'result' && (
        <div className="flex-1 space-y-6">
          <Card className="petpixel-card">
            <CardContent className="p-6">
              {/* Pet Preview */}
              <div className="text-center space-y-4 mb-6">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                  <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=120&h=120&fit=crop&crop=face" 
                    alt="Pixel Pet"
                    className="w-30 h-30 rounded-lg object-cover pixelated"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </div>
                <div>
                  <Input
                    placeholder="Name your pet"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    className="petpixel-input text-center font-semibold"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Detected: {detectedBreed}
                  </p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="petpixel-card p-4 text-center">
                  <p className="text-2xl font-semibold text-primary">85</p>
                  <p className="text-xs text-muted-foreground">Health</p>
                </div>
                <div className="petpixel-card p-4 text-center">
                  <p className="text-2xl font-semibold text-primary">92</p>
                  <p className="text-xs text-muted-foreground">Happiness</p>
                </div>
                <div className="petpixel-card p-4 text-center">
                  <p className="text-2xl font-semibold text-primary">78</p>
                  <p className="text-xs text-muted-foreground">Energy</p>
                </div>
                <div className="petpixel-card p-4 text-center">
                  <p className="text-2xl font-semibold text-primary">95</p>
                  <p className="text-xs text-muted-foreground">Loyalty</p>
                </div>
              </div>

              {/* Action Buttons */}
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