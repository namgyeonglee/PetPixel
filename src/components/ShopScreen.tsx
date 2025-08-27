import React, { useState } from 'react';
import { ShoppingCart, DollarSign, Heart, Zap, Shield, Package, Stethoscope } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const digitalItems = [
  {
    id: 1,
    name: 'Food Pack',
    price: 5,
    description: '+20 Health, +10 Energy',
    icon: Heart,
    category: 'health'
  },
  {
    id: 2,
    name: 'Energy Toy',
    price: 8,
    description: '+30 Energy, +15 Happiness',
    icon: Zap,
    category: 'energy'
  },
  {
    id: 3,
    name: 'Health Potion',
    price: 12,
    description: '+50 Health instantly',
    icon: Shield,
    category: 'health'
  },
  {
    id: 4,
    name: 'Accessory Box',
    price: 25,
    description: 'Random cosmetic item',
    icon: Package,
    category: 'cosmetic'
  }
];

const physicalProducts = [
  {
    id: 5,
    name: 'Vet Coupon',
    price: 50,
    description: '20% off next vet visit',
    icon: Stethoscope,
    category: 'service'
  },
  {
    id: 6,
    name: 'Premium Food',
    price: 35,
    description: 'Real pet food delivery',
    icon: Heart,
    category: 'food'
  }
];

const ShopScreen = () => {
  const [balance] = useState(250);
  const [activeTab, setActiveTab] = useState('digital');

  const handlePurchase = (item: any) => {
    console.log(`Purchasing ${item.name} for ${item.price} USDC`);
  };

  const items = activeTab === 'digital' ? digitalItems : physicalProducts;

  return (
    <div className="flex flex-col min-h-full p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3 pt-4">
        <ShoppingCart size={24} className="text-primary" />
        <h1 className="text-xl font-semibold">Pet Care & Shop</h1>
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

      {/* Daily Special Banner */}
      <Card className="petpixel-gradient">
        <CardContent className="p-4 text-center">
          <Badge className="bg-orange-500 text-white mb-2">Daily Special</Badge>
          <h3 className="font-semibold text-primary-foreground">Food Pack Bundle</h3>
          <p className="text-sm text-primary-foreground/80">3 Food Packs for 12 USDC</p>
        </CardContent>
      </Card>

      {/* Category Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <TabsList className="grid w-full grid-cols-2 petpixel-card">
          <TabsTrigger value="digital" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Digital Items
          </TabsTrigger>
          <TabsTrigger value="physical" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Physical Products
          </TabsTrigger>
        </TabsList>

        <TabsContent value="digital" className="space-y-4 mt-6">
          {digitalItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.id} className="petpixel-card">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 petpixel-card rounded-lg flex items-center justify-center">
                      <Icon size={24} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <div className="text-right space-y-2">
                      <p className="font-semibold text-primary">{item.price} USDC</p>
                      <Button 
                        size="sm" 
                        className="petpixel-gradient text-primary-foreground"
                        onClick={() => handlePurchase(item)}
                      >
                        Buy
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="physical" className="space-y-4 mt-6">
          {physicalProducts.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.id} className="petpixel-card">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 petpixel-card rounded-lg flex items-center justify-center">
                      <Icon size={24} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <div className="text-right space-y-2">
                      <p className="font-semibold text-primary">{item.price} USDC</p>
                      <Button 
                        size="sm" 
                        className="petpixel-gradient text-primary-foreground"
                        onClick={() => handlePurchase(item)}
                      >
                        Buy
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ShopScreen;