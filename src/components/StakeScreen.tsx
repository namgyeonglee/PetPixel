import React, { useState } from 'react';
import { Diamond, TrendingUp, Plus, Minus } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';

const tiers = [
  {
    name: 'Bronze',
    minimum: 100,
    apy: 5.0,
    benefits: ['Basic rewards', '5% APY'],
    color: 'bg-orange-600'
  },
  {
    name: 'Silver',
    minimum: 500,
    apy: 6.0,
    benefits: ['Enhanced rewards', '6% APY', 'Priority support'],
    color: 'bg-gray-400'
  },
  {
    name: 'Gold',
    minimum: 1000,
    apy: 6.8,
    benefits: ['Premium rewards', '6.8% APY', 'Exclusive events'],
    color: 'bg-yellow-500'
  },
  {
    name: 'Platinum',
    minimum: 5000,
    apy: 8.0,
    benefits: ['Elite rewards', '8% APY', 'VIP access', 'Personal advisor'],
    color: 'bg-purple-500'
  }
];

const StakeScreen = () => {
  const [currentStaked] = useState(850);
  const [monthlyEarned] = useState(42.50);
  const [stakeAmount, setStakeAmount] = useState('');
  const currentAPY = 6.8;

  const getCurrentTier = () => {
    return tiers.find(tier => currentStaked >= tier.minimum && currentStaked < (tiers[tiers.indexOf(tier) + 1]?.minimum || Infinity)) || tiers[0];
  };

  const getNextTier = () => {
    const nextTierIndex = tiers.findIndex(tier => tier.minimum > currentStaked);
    return nextTierIndex !== -1 ? tiers[nextTierIndex] : null;
  };

  const calculateEarnings = (amount: number, apy: number) => {
    const monthly = (amount * apy / 100) / 12;
    const yearly = amount * apy / 100;
    return { monthly, yearly };
  };

  const stakeAmountNumber = parseFloat(stakeAmount) || 0;
  const projectedEarnings = calculateEarnings(stakeAmountNumber, currentAPY);

  const currentTier = getCurrentTier();
  const nextTier = getNextTier();
  const progressToNext = nextTier ? (currentStaked / nextTier.minimum) * 100 : 100;

  return (
    <div className="flex flex-col min-h-full p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3 pt-4">
        <Diamond size={24} className="text-primary" />
        <h1 className="text-xl font-semibold">Staking Rewards</h1>
      </div>

      {/* Staking Overview */}
      <Card className="petpixel-card">
        <CardHeader>
          <CardTitle className="text-base">Staking Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-semibold text-primary">${currentStaked}</p>
              <p className="text-sm text-muted-foreground">Currently Staked</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold text-primary">${monthlyEarned}</p>
              <p className="text-sm text-muted-foreground">Earned This Month</p>
            </div>
          </div>
          <div className="text-center p-4 petpixel-card rounded-lg">
            <div className="flex items-center justify-center space-x-2">
              <TrendingUp size={20} className="text-primary" />
              <span className="text-xl font-semibold">{currentAPY}% APY</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Tier & Progress */}
      <Card className="petpixel-card">
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 ${currentTier.color} rounded`}></div>
              <span className="font-semibold">{currentTier.name} Tier</span>
            </div>
            <Badge className="petpixel-gradient text-primary-foreground">
              {currentTier.apy}% APY
            </Badge>
          </div>
          
          {nextTier && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress to {nextTier.name}</span>
                <span className="font-semibold">${currentStaked}/${nextTier.minimum}</span>
              </div>
              <Progress value={Math.min(progressToNext, 100)} className="h-2" />
              <p className="text-xs text-muted-foreground text-center">
                ${nextTier.minimum - currentStaked} more to unlock {nextTier.name} tier
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tier Benefits */}
      <Card className="petpixel-card">
        <CardHeader>
          <CardTitle className="text-base">Tier Benefits</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-3">
            {tiers.map((tier) => (
              <div 
                key={tier.name}
                className={`p-3 rounded-lg border ${
                  tier.name === currentTier.name 
                    ? 'border-primary bg-primary/10' 
                    : 'petpixel-card'
                }`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <div className={`w-3 h-3 ${tier.color} rounded`}></div>
                  <span className="font-semibold text-sm">{tier.name}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-1">${tier.minimum}+</p>
                <p className="text-sm font-semibold text-primary">{tier.apy}% APY</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Calculator */}
      <Card className="petpixel-card">
        <CardHeader>
          <CardTitle className="text-base">Earnings Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="number"
            placeholder="Enter amount to stake"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
            className="petpixel-input"
          />
          
          {stakeAmountNumber > 0 && (
            <div className="grid grid-cols-2 gap-4 p-4 petpixel-card rounded-lg">
              <div className="text-center">
                <p className="text-lg font-semibold text-primary">
                  ${projectedEarnings.monthly.toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground">Monthly Earnings</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-primary">
                  ${projectedEarnings.yearly.toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground">Yearly Earnings</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Staking Actions */}
      <div className="space-y-3 pb-4">
        <Button className="w-full petpixel-gradient text-primary-foreground font-semibold h-12">
          <Plus size={20} className="mr-2" />
          Stake More
        </Button>
        <Button 
          variant="outline" 
          className="w-full border-primary/50 text-primary hover:bg-primary/10 h-12"
        >
          <Minus size={20} className="mr-2" />
          Withdraw
        </Button>
      </div>

      {/* Risk Disclaimer */}
      <div className="text-xs text-muted-foreground text-center p-4 petpixel-card rounded-lg">
        <p>
          <strong>Risk Disclaimer:</strong> Staking involves risks including potential loss of principal. 
          Funds may have lock-up periods. Past performance does not guarantee future results.
        </p>
      </div>
    </div>
  );
};

export default StakeScreen;