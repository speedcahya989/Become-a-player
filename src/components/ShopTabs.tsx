
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Zap, Shield, Flame, Snowflake, Heart, Brain } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const ShopTabs = () => {
  const [playerGold] = useState(1250);
  const [weeklyPurchases, setWeeklyPurchases] = useState<{[key: number]: boolean}>({});
  
  const powerUps = [
    {
      id: 1,
      name: "Energy Booster",
      description: "Gain +20% XP for the next 3 quests",
      price: 100,
      type: "power-up",
      rarity: "common",
      weeklyLimit: true
    },
    {
      id: 2,
      name: "Time Extension",
      description: "Extend quest deadline by 2 hours",
      price: 150,
      type: "power-up",
      rarity: "common",
      weeklyLimit: true
    },
    {
      id: 3,
      name: "Lucky Charm",
      description: "Double gold rewards for 1 day",
      price: 300,
      type: "power-up",
      rarity: "rare",
      weeklyLimit: true
    }
  ];

  const buffs = [
    {
      id: 8,
      name: "Pelindung Mental",
      description: "Mencegah debuff negatif selama 1 jam",
      price: 50,
      type: "buff",
      rarity: "common",
      weeklyLimit: true,
      icon: Shield,
      color: "text-green-400"
    },
    {
      id: 9,
      name: "Healing Aura",
      description: "Menghilangkan semua debuff aktif",
      price: 75,
      type: "buff",
      rarity: "uncommon",
      weeklyLimit: true,
      icon: Heart,
      color: "text-pink-400"
    },
    {
      id: 10,
      name: "Time Freeze",
      description: "Quest tidak memiliki batas waktu selama 30 menit",
      price: 100,
      type: "buff",
      rarity: "rare",
      weeklyLimit: true,
      icon: Snowflake,
      color: "text-cyan-400"
    },
    {
      id: 11,
      name: "Motivasi Tinggi",
      description: "Meningkatkan XP yang didapat dari quest sebesar 25%",
      price: 80,
      type: "buff",
      rarity: "common",
      weeklyLimit: true,
      icon: Zap,
      color: "text-blue-400"
    },
    {
      id: 12,
      name: "Fokus Mendalam",
      description: "Mengurangi waktu pengerjaan quest sebesar 20%",
      price: 90,
      type: "buff",
      rarity: "uncommon",
      weeklyLimit: true,
      icon: Brain,
      color: "text-purple-400"
    },
    {
      id: 13,
      name: "Semangat Berapi",
      description: "Meningkatkan chance critical success pada quest",
      price: 120,
      type: "buff",
      rarity: "rare",
      weeklyLimit: true,
      icon: Flame,
      color: "text-orange-400"
    }
  ];

  const rewards = [
    {
      id: 4,
      name: "Motivation Pill",
      description: "Remove all debuffs instantly",
      price: 250,
      type: "reward",
      rarity: "uncommon",
      weeklyLimit: false
    },
    {
      id: 5,
      name: "XP Multiplier",
      description: "2x XP for next 5 completed quests",
      price: 500,
      type: "reward",
      rarity: "epic",
      weeklyLimit: false
    },
    {
      id: 6,
      name: "Shield of Focus",
      description: "Immunity to debuffs for 3 days",
      price: 400,
      type: "reward",
      rarity: "rare",
      weeklyLimit: false
    }
  ];

  const [customRewards, setCustomRewards] = useState<any[]>([]);
  const [isAddingReward, setIsAddingReward] = useState(false);
  const [newReward, setNewReward] = useState({
    name: '',
    description: '',
    price: 0,
    rarity: 'common'
  });

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
    if (item.weeklyLimit && weeklyPurchases[item.id]) {
      alert('Item ini sudah dibeli minggu ini!');
      return;
    }
    
    if (playerGold >= item.price) {
      console.log(`Purchasing ${item.name} for ${item.price} gold`);
      if (item.weeklyLimit) {
        setWeeklyPurchases(prev => ({ ...prev, [item.id]: true }));
      }
    }
  };

  const handleAddReward = () => {
    if (newReward.name && newReward.description && newReward.price > 0) {
      setCustomRewards(prev => [...prev, {
        ...newReward,
        id: Date.now(),
        type: 'custom',
        weeklyLimit: false
      }]);
      setNewReward({ name: '', description: '', price: 0, rarity: 'common' });
      setIsAddingReward(false);
    }
  };

  const renderShopItems = (items: any[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map(item => {
        const IconComponent = item.icon;
        
        return (
          <div 
            key={item.id} 
            className={`glass rounded-lg p-4 transition-all duration-300 hover:scale-105 border-2 ${getRarityColor(item.rarity)}`}
          >
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {IconComponent && <IconComponent className={`w-5 h-5 ${item.color}`} />}
                  <h3 className="font-orbitron font-bold">{item.name}</h3>
                </div>
                <Badge variant="outline" className={`text-xs ${getRarityColor(item.rarity)}`}>
                  {item.rarity.toUpperCase()}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
              <div className="flex gap-2">
                <Badge variant="secondary" className="text-xs">
                  {item.type}
                </Badge>
                {item.weeklyLimit && (
                  <Badge variant="outline" className="text-xs">
                    1x/minggu
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
                <span className="font-bold text-yellow-400">{item.price}</span>
              </div>
              
              <Button 
                size="sm"
                className={`font-orbitron text-xs ${
                  (playerGold >= item.price && (!item.weeklyLimit || !weeklyPurchases[item.id]))
                    ? 'bg-primary hover:bg-primary/80' 
                    : 'bg-muted cursor-not-allowed opacity-50'
                }`}
                style={{ boxShadow: (playerGold >= item.price && (!item.weeklyLimit || !weeklyPurchases[item.id])) ? '0 0 2px hsl(var(--primary))' : 'none' }}
                disabled={playerGold < item.price || (item.weeklyLimit && weeklyPurchases[item.id])}
                onClick={() => handlePurchase(item)}
              >
                {item.weeklyLimit && weeklyPurchases[item.id] ? 'DIBELI' : 
                 playerGold >= item.price ? 'BELI' : 'GOLD KURANG'}
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-orbitron font-bold hologram-text mb-2">Shop</h2>
        <div className="flex items-center justify-center gap-2">
          <div className="w-6 h-6 rounded-full bg-yellow-400"></div>
          <span className="text-xl font-bold text-yellow-400">{playerGold} Gold</span>
        </div>
      </div>

      <Tabs defaultValue="power-ups" className="w-full">
        <TabsList className="grid w-full grid-cols-3 glass">
          <TabsTrigger value="power-ups" className="font-orbitron">Power-Ups</TabsTrigger>
          <TabsTrigger value="buffs" className="font-orbitron">Buffs</TabsTrigger>
          <TabsTrigger value="rewards" className="font-orbitron">Rewards</TabsTrigger>
        </TabsList>

        <TabsContent value="power-ups" className="mt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-orbitron font-bold">Power-Ups (1x per minggu)</h3>
            </div>
            {renderShopItems(powerUps)}
          </div>
        </TabsContent>

        <TabsContent value="buffs" className="mt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-orbitron font-bold">Buffs (1x per minggu)</h3>
            </div>
            {renderShopItems(buffs)}
          </div>
        </TabsContent>

        <TabsContent value="rewards" className="mt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-orbitron font-bold">Rewards (Tanpa Batas)</h3>
              <Dialog open={isAddingReward} onOpenChange={setIsAddingReward}>
                <DialogTrigger asChild>
                  <Button size="sm" className="font-orbitron">
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Reward
                  </Button>
                </DialogTrigger>
                <DialogContent className="glass">
                  <DialogHeader>
                    <DialogTitle className="font-orbitron">Tambah Reward Kustom</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="reward-name">Nama Reward</Label>
                      <Input
                        id="reward-name"
                        value={newReward.name}
                        onChange={(e) => setNewReward(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Masukkan nama reward"
                      />
                    </div>
                    <div>
                      <Label htmlFor="reward-desc">Deskripsi</Label>
                      <Textarea
                        id="reward-desc"
                        value={newReward.description}
                        onChange={(e) => setNewReward(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Masukkan deskripsi reward"
                      />
                    </div>
                    <div>
                      <Label htmlFor="reward-price">Harga (Gold)</Label>
                      <Input
                        id="reward-price"
                        type="number"
                        value={newReward.price}
                        onChange={(e) => setNewReward(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="reward-rarity">Rarity</Label>
                      <select 
                        id="reward-rarity"
                        value={newReward.rarity}
                        onChange={(e) => setNewReward(prev => ({ ...prev, rarity: e.target.value }))}
                        className="w-full p-2 bg-background border border-border rounded-md"
                      >
                        <option value="common">Common</option>
                        <option value="uncommon">Uncommon</option>
                        <option value="rare">Rare</option>
                        <option value="epic">Epic</option>
                        <option value="legendary">Legendary</option>
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleAddReward} className="flex-1">Tambah</Button>
                      <Button variant="outline" onClick={() => setIsAddingReward(false)}>Batal</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            {renderShopItems([...rewards, ...customRewards])}
          </div>
        </TabsContent>
      </Tabs>

      <div className="glass rounded-lg p-4 text-center">
        <p className="text-sm text-muted-foreground">
          Power-ups dan Buffs reset setiap minggu • Rewards dapat dibeli berulang kali
        </p>
      </div>
    </div>
  );
};

export default ShopTabs;
