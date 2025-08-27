import React, { useState } from 'react';
import { Dice6, DollarSign, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

const rarities = [
  { name: 'Common', chance: 60, color: 'bg-gray-500' },
  { name: 'Uncommon', chance: 25, color: 'bg-green-500' },
  { name: 'Rare', chance: 12, color: 'bg-blue-500' },
  { name: 'Epic', chance: 2.5, color: 'bg-purple-500' },
  { name: 'Legendary', chance: 0.5, color: 'bg-orange-500' },
];

const GachaScreen = () => {
  const [balance] = useState(250);
  const [pityCount] = useState(23);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleSinglePull = () => {
    setIsSpinning(true);
    // Simulate gacha animation
    setTimeout(() => {
      setIsSpinning(false);
    }, 3000);
  };

  const handleTenPull = () => {
    setIsSpinning(true);
    // Simulate longer animation for 10x pull
    setTimeout(() => {
      setIsSpinning(false);
    }, 5000);
  };

  return (
    <div className="flex flex-col min-h-full p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3 pt-4">
        <Dice6 size={24} className="text-primary" />
        <h1 className="text-xl font-semibold">Random Pet Gacha</h1>
      </div>

      {/* Balance Display */}
      <Card className="petpixel-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-center space-x-2">
            <DollarSign size={20} className="text-primary" />
            <span className="text-2xl font-semibold">{balance} USDC</span>
          </div>
        </CardContent>
      </Card>

      {/* Gacha Machine */}
      <Card className="petpixel-card">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className={`w-48 h-48 mx-auto petpixel-card rounded-full flex items-center justify-center ${isSpinning ? 'animate-pulse' : ''}`}>
              {isSpinning ? (
                <div className="text-center">
                  <Dice6 size={64} className="animate-spin text-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Rolling...</p>
                </div>
              ) : (
                <div className="text-center">
                  <Dice6 size={64} className="text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Mystery Pet</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Drop Rates */}
      <Card className="petpixel-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Drop Rates</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="grid grid-cols-5 gap-2">
            {rarities.map((rarity) => (
              <div key={rarity.name} className="text-center space-y-2">
                <div className={`w-8 h-8 ${rarity.color} rounded mx-auto`}></div>
                <div>
                  <p className="text-xs font-semibold">{rarity.name}</p>
                  <p className="text-xs text-muted-foreground">{rarity.chance}%</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pity Counter */}
      <Card className="petpixel-card">
        <CardContent className="p-4">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Pity Counter</span>
              <span className="font-semibold">{pityCount}/100</span>
            </div>
            <Progress value={pityCount} className="h-2" />
            <p className="text-xs text-muted-foreground">
              Guaranteed Legendary in {100 - pityCount} pulls
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Pull Options */}
      <div className="space-y-3 pb-4">
        <Button 
          className="w-full petpixel-gradient text-primary-foreground font-semibold h-12"
          onClick={handleSinglePull}
          disabled={isSpinning || balance < 10}
        >
          <Dice6 size={20} className="mr-2" />
          Single Pull - 10 USDC
        </Button>
        
        <Button 
          className="w-full petpixel-gradient text-primary-foreground font-semibold h-12 relative overflow-hidden"
          onClick={handleTenPull}
          disabled={isSpinning || balance < 90}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"></div>
          <Zap size={20} className="mr-2 relative z-10" />
          <span className="relative z-10">10x Pull - 90 USDC</span>
          <Badge className="ml-2 bg-orange-500 text-white relative z-10">SAVE 10</Badge>
        </Button>

        <Button 
          variant="outline" 
          className="w-full border-primary/50 text-primary hover:bg-primary/10 h-12"
          disabled={isSpinning}
        >
          Free Daily Pull
        </Button>
      </div>
    </div>
  );
};

export default GachaScreen;