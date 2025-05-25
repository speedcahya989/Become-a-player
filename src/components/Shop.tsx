
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Shop = () => {
  const [playerGold] = useState(1250);
  
  const shopItems = [
    {
      id: 1,
      name: "Energy Booster",
      description: "Gain +20% XP for the next 3 quests",
      price: 100,
      type: "consumable",
      rarity: "common"
    },
    {
      id: 2,
      name: "Time Extension",
      description: "Extend quest deadline by 2 hours",
      price: 150,
      type: "utility",
      rarity: "common"
    },
    {
      id: 3,
      name: "Lucky Charm",
      description: "Double gold rewards for 1 day",
      price: 300,
      type: "buff",
      rarity: "rare"
    },
    {
      id: 4,
      name: "Motivation Pill",
      description: "Remove all debuffs instantly",
      price: 250,
      type: "utility",
      rarity: "uncommon"
    },
    {
      id: 5,
      name: "XP Multiplier",
      description: "2x XP for next 5 completed quests",
      price: 500,
      type: "buff",
      rarity: "epic"
    },
    {
      id: 6,
      name: "Shield of Focus",
      description: "Immunity to debuffs for 3 days",
      price: 400,
      type: "protection",
      rarity: "rare"
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-400/50 bg-gray-400/10';
      case 'uncommon': return 'border-green-400/50 bg-green-400/10';
      case 'rare': return 'border-blue-400/50 bg-blue-400/10';
      case 'epic': return 'border-purple-400/50 bg-purple-400/10';
      case 'legendary': return 'border-orange-400/50 bg-orange-400/10';
      default: return 'border-gray-400/50 bg-gray-400/10';
    }
  };

  const handlePurchase = (item: any) => {
    console.log(`Purchasing ${item.name} for ${item.price} gold`);
    // Here you would implement the actual purchase logic
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-orbitron font-bold hologram-text mb-2">Shop</h2>
        <div className="flex items-center justify-center gap-2">
          <div className="w-6 h-6 rounded-full bg-yellow-400"></div>
          <span className="text-xl font-bold text-yellow-400">{playerGold} Gold</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {shopItems.map(item => (
          <div 
            key={item.id} 
            className={`glass rounded-lg p-4 transition-all duration-300 hover:scale-105 border-2 ${getRarityColor(item.rarity)}`}
          >
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-orbitron font-bold">{item.name}</h3>
                <Badge variant="outline" className={`text-xs ${getRarityColor(item.rarity)}`}>
                  {item.rarity.toUpperCase()}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
              <Badge variant="secondary" className="text-xs">
                {item.type}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
                <span className="font-bold text-yellow-400">{item.price}</span>
              </div>
              
              <Button 
                size="sm"
                className={`font-orbitron ${
                  playerGold >= item.price 
                    ? 'bg-primary hover:bg-primary/80 neon-glow' 
                    : 'bg-muted cursor-not-allowed opacity-50'
                }`}
                disabled={playerGold < item.price}
                onClick={() => handlePurchase(item)}
              >
                {playerGold >= item.price ? 'BUY' : 'INSUFFICIENT GOLD'}
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="glass rounded-lg p-4 text-center">
        <p className="text-sm text-muted-foreground">
          Shop inventory resets daily at midnight
        </p>
      </div>
    </div>
  );
};

export default Shop;
