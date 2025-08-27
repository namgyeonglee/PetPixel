import React, { useState } from 'react';
import { Camera, Dice6, MapPin, ShoppingCart, Diamond } from 'lucide-react';
import CreateScreen from './components/CreateScreen';
import GachaScreen from './components/GachaScreen';
import ExploreScreen from './components/ExploreScreen';
import ShopScreen from './components/ShopScreen';
import StakeScreen from './components/StakeScreen';

const tabs = [
  { id: 'create', label: 'Create', icon: Camera, component: CreateScreen },
  { id: 'gacha', label: 'Gacha', icon: Dice6, component: GachaScreen },
  { id: 'explore', label: 'Explore', icon: MapPin, component: ExploreScreen },
  { id: 'shop', label: 'Shop', icon: ShoppingCart, component: ShopScreen },
  { id: 'stake', label: 'Stake', icon: Diamond, component: StakeScreen },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('create');

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || CreateScreen;

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <ActiveComponent />
      </div>

      {/* Bottom Navigation */}
      <div className="petpixel-card border-t-2 border-border">
        <div className="flex justify-around items-center h-20 px-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center space-y-1 py-2 px-3 rounded-lg transition-all duration-200 min-w-[44px] min-h-[44px] ${
                  isActive 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon size={24} strokeWidth={2} />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}