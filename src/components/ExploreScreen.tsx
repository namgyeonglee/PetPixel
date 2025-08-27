import React, { useState } from 'react';
import { MapPin, Filter, Heart, X, Star, Eye, Clock, Crown, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion, AnimatePresence } from 'motion/react';
import pixelDogImage from 'figma:asset/20e4f123ebc03fde1ee774b148fb07f97eb630a0.png';

const pets = [
  {
    id: 1,
    name: 'Luna',
    breed: 'Husky',
    rarity: 'Rare',
    match: 89,
    distance: '1.2km',
    realImage: 'https://images.unsplash.com/photo-1644073761721-554a34042348?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjByZXRyaWV2ZXIlMjBiZWFnbGUlMjBwdXBweXxlbnwxfHx8fDE3NTYzMDA4NDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    pixelChar: '🐺',
    pixelImage: pixelDogImage,
    rarityColor: 'bg-blue-500'
  },
  {
    id: 2,
    name: 'Max',
    breed: 'Golden Retriever',
    rarity: 'Common',
    match: 76,
    distance: '2.1km',
    realImage: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=300&fit=crop&crop=face',
    pixelChar: '🐕',
    rarityColor: 'bg-gray-500'
  },
  {
    id: 3,
    name: 'Bella',
    breed: 'French Bulldog',
    rarity: 'Epic',
    match: 94,
    distance: '0.8km',
    realImage: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=300&fit=crop&crop=face',
    pixelChar: '🐾',
    rarityColor: 'bg-purple-500'
  },
  {
    id: 4,
    name: 'Charlie',
    breed: 'Border Collie',
    rarity: 'Uncommon',
    match: 82,
    distance: '1.8km',
    realImage: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=300&h=300&fit=crop&crop=face',
    pixelChar: '🐺',
    rarityColor: 'bg-green-500'
  }
];

const ExploreScreen = () => {
  const [currentPetIndex, setCurrentPetIndex] = useState(0);
  const [range, setRange] = useState([2.5]);
  const [visiblePets, setVisiblePets] = useState(pets);
  const [revealsLeft, setRevealsLeft] = useState(23);
  const [revealedPets, setRevealedPets] = useState<Set<number>>(new Set());
  const [showPremiumPrompt, setShowPremiumPrompt] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);

  const currentPet = visiblePets[currentPetIndex];
  const totalReveals = 30;
  const hoursUntilReset = 14;
  const minutesUntilReset = 23;
  const isRevealed = revealedPets.has(currentPet?.id);

  const handleReveal = async () => {
    if (revealsLeft <= 0) {
      setShowPremiumPrompt(true);
      return;
    }

    if (isRevealed || !currentPet) return;

    setIsRevealing(true);
    
    // Animate reveal
    setTimeout(() => {
      setRevealedPets(prev => new Set([...prev, currentPet.id]));
      setRevealsLeft(prev => prev - 1);
      setIsRevealing(false);
    }, 800);
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      console.log(`Liked ${currentPet?.name}`);
    }
    
    if (currentPetIndex < visiblePets.length - 1) {
      setCurrentPetIndex(currentPetIndex + 1);
    } else {
      setCurrentPetIndex(0);
    }
  };

  const handlePremiumUpgrade = () => {
    console.log('Upgrading to premium');
    setShowPremiumPrompt(false);
  };

  if (!currentPet) {
    return (
      <div className="flex flex-col min-h-full p-4 space-y-6">
        <div className="flex items-center space-x-3 pt-4">
          <MapPin size={24} className="text-primary" />
          <h1 className="text-xl font-semibold">Discover Nearby Pets</h1>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">No more pets in your area</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3 pt-4">
        <MapPin size={24} className="text-primary" />
        <h1 className="text-xl font-semibold">Discover Nearby Pets</h1>
      </div>

      {/* Reveal Counter */}
      <Card className="petpixel-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Eye size={20} className="text-primary" />
              <span className="font-semibold">Photo Reveals: {revealsLeft}/{totalReveals} left</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Clock size={16} />
              <span>Resets in {hoursUntilReset}h {minutesUntilReset}m</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" className="border-primary/50 text-primary">
          <Filter size={16} className="mr-2" />
          Filters
        </Button>
        <div className="text-sm text-muted-foreground">
          {range[0]}km range
        </div>
      </div>

      {/* Range Slider */}
      <Card className="petpixel-card">
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Search Range</span>
              <span className="font-semibold">{range[0]}km</span>
            </div>
            <Slider
              value={range}
              onValueChange={setRange}
              max={10}
              min={0.5}
              step={0.5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0.5km</span>
              <span>10km</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pet Card Stack */}
      <div className="flex-1 relative">
        <Card className="petpixel-card h-full relative overflow-hidden">
          <CardContent className="p-0 h-full">
            <div className="relative h-full">
              {/* Pet Image Section */}
              <div className="h-2/3 relative overflow-hidden">
                <div className="absolute top-4 right-4 z-10">
                  <Badge className={`${currentPet.rarityColor} text-white`}>
                    {currentPet.rarity}
                  </Badge>
                </div>

                <AnimatePresence mode="wait">
                  {!isRevealed ? (
                    // Pixel Only View
                    <motion.div
                      key="pixel-only"
                      initial={{ opacity: 1 }}
                      exit={{ x: -100, opacity: 0 }}
                      className="w-full h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center relative"
                    >
                      {currentPet.pixelImage ? (
                        <div className="w-full h-full flex items-center justify-center p-8">
                          <img 
                            src={currentPet.pixelImage}
                            alt="Pixel Pet"
                            className="max-w-full max-h-full object-contain"
                            style={{ 
                              imageRendering: 'pixelated',
                              filter: 'drop-shadow(0 0 20px rgba(210, 210, 255, 0.3))'
                            }}
                          />
                        </div>
                      ) : (
                        <div className="text-center">
                          <div className="text-8xl mb-4 filter drop-shadow-lg">
                            {currentPet.pixelChar}
                          </div>
                        </div>
                      )}
                      
                      {/* Overlay info */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 text-center">
                          <p className="text-white font-semibold">Pixel Character</p>
                          <p className="text-white/70 text-sm">Tap reveal to see real photo</p>
                        </div>
                      </div>
                      
                      {isRevealing && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute inset-0 flex items-center justify-center bg-primary/20"
                        >
                          <Sparkles size={48} className="text-primary animate-pulse" />
                        </motion.div>
                      )}
                    </motion.div>
                  ) : (
                    // Revealed View - Side by Side
                    <motion.div
                      key="revealed"
                      initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="w-full h-full flex"
                    >
                      {/* Real Photo */}
                      <div className="w-1/2 h-full relative">
                        <ImageWithFallback
                          src={currentPet.realImage}
                          alt={currentPet.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-green-500 text-white text-xs">
                            Revealed!
                          </Badge>
                        </div>
                      </div>
                      
                      {/* Pixel Version */}
                      <div className="w-1/2 h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
                        <div className="text-center">
                          {currentPet.pixelImage ? (
                            <div className="w-full h-full flex flex-col items-center justify-center">
                              <img 
                                src={currentPet.pixelImage}
                                alt="Pixel Pet"
                                className="max-w-full max-h-32 object-contain mb-2"
                                style={{ imageRendering: 'pixelated' }}
                              />
                              <p className="text-white text-xs">Pixel Ver.</p>
                            </div>
                          ) : (
                            <div>
                              <div className="text-6xl mb-2">
                                {currentPet.pixelChar}
                              </div>
                              <p className="text-white text-xs">Pixel Ver.</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Pet Info */}
              <div className="h-1/3 p-6 space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl font-semibold">{currentPet.name}</h2>
                    <div className="flex items-center space-x-1">
                      <Star size={16} className="text-primary" />
                      <span className="font-semibold">{currentPet.match}%</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{currentPet.breed} • {currentPet.distance}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center items-center space-x-4">
                  {/* Pass Button */}
                  <Button
                    size="lg"
                    variant="destructive"
                    className="w-12 h-12 rounded-full"
                    onClick={() => handleSwipe('left')}
                  >
                    <X size={20} />
                  </Button>

                  {/* Reveal Button */}
                  {!isRevealed && (
                    <Button
                      size="lg"
                      className={`h-12 px-6 rounded-full ${
                        revealsLeft > 0 
                          ? 'petpixel-gradient text-primary-foreground' 
                          : 'bg-muted text-muted-foreground cursor-not-allowed'
                      }`}
                      onClick={handleReveal}
                      disabled={isRevealing}
                    >
                      <Eye size={20} className="mr-2" />
                      {isRevealing ? 'Revealing...' : 
                       revealsLeft > 0 ? `Reveal (${revealsLeft} left)` : 'Limit Reached'}
                    </Button>
                  )}

                  {/* Like Button */}
                  <Button
                    size="lg"
                    className="w-12 h-12 rounded-full petpixel-gradient text-primary-foreground"
                    onClick={() => handleSwipe('right')}
                  >
                    <Heart size={20} />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Helper Text */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Match with pets for breeding opportunities
        </p>
      </div>

      {/* Premium Prompt Modal */}
      <AnimatePresence>
        {showPremiumPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowPremiumPrompt(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="petpixel-card rounded-xl p-6 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto petpixel-gradient rounded-full flex items-center justify-center">
                  <Crown size={32} className="text-primary-foreground" />
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2">Daily Limit Reached</h3>
                  <p className="text-muted-foreground text-sm">
                    You've used all 30 photo reveals today. Upgrade to Premium for unlimited reveals!
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="petpixel-card p-4 text-left">
                    <h4 className="font-semibold mb-2">Premium Benefits:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Unlimited daily photo reveals</li>
                      <li>• Priority matching algorithm</li>
                      <li>• Exclusive rare pet access</li>
                      <li>• Advanced breeding features</li>
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 petpixel-card rounded-lg">
                      <p className="text-sm text-muted-foreground">Monthly</p>
                      <p className="font-semibold text-primary">$4.99</p>
                    </div>
                    <div className="text-center p-3 petpixel-card rounded-lg border-2 border-primary">
                      <p className="text-sm text-muted-foreground">Annual</p>
                      <p className="font-semibold text-primary">$39.99</p>
                      <Badge className="bg-orange-500 text-white text-xs mt-1">Save 33%</Badge>
                    </div>
                  </div>

                  <Button 
                    className="w-full petpixel-gradient text-primary-foreground font-semibold"
                    onClick={handlePremiumUpgrade}
                  >
                    <Crown size={16} className="mr-2" />
                    Upgrade to Premium
                  </Button>

                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>Alternative ways to earn reveals:</p>
                    <p>• Watch ads: +3 reveals (3 ads/day max)</p>
                    <p>• Login streak: +5 every 7 days</p>
                    <p>• Successful matches: +2 reveals</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExploreScreen;