
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Coins } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const ShopTabs = () => {
  const { t } = useLanguage();
  
  const [rewards, setRewards] = useState([
    {
      id: 1,
      name: "Film Premium",
      cost: 100,
      category: "entertainment",
      description: "Tonton film favorit di bioskop",
      icon: "🎬",
      rarity: "common"
    },
    {
      id: 2,
      name: "Makanan Enak",
      cost: 150,
      category: "food",
      description: "Beli makanan kesukaan",
      icon: "🍕",
      rarity: "uncommon"
    },
    {
      id: 3,
      name: "Game Baru",
      cost: 300,
      category: "entertainment",
      description: "Beli game yang sudah lama diinginkan",
      icon: "🎮",
      rarity: "rare"
    },
    {
      id: 4,
      name: "Buku Inspiratif",
      cost: 80,
      category: "education",
      description: "Investasi untuk pengetahuan",
      icon: "📚",
      rarity: "common"
    }
  ]);

  const [isAddingReward, setIsAddingReward] = useState(false);
  const [rewardForm, setRewardForm] = useState({
    name: '',
    cost: 0,
    category: 'entertainment',
    description: '',
    icon: '🎁',
    rarity: 'common'
  });

  const resetForm = () => {
    setRewardForm({
      name: '',
      cost: 0,
      category: 'entertainment',
      description: '',
      icon: '🎁',
      rarity: 'common'
    });
  };

  const handleSaveReward = () => {
    if (rewardForm.name && rewardForm.description) {
      const newReward = {
        ...rewardForm,
        id: Date.now()
      };
      setRewards(prev => [...prev, newReward]);
      resetForm();
      setIsAddingReward(false);
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-400 text-gray-300';
      case 'uncommon': return 'border-green-400 text-green-300';
      case 'rare': return 'border-blue-400 text-blue-300';
      case 'epic': return 'border-purple-400 text-purple-300';
      case 'legendary': return 'border-yellow-400 text-yellow-300';
      default: return 'border-gray-400 text-gray-300';
    }
  };

  const getRewardsByCategory = (category: string) => {
    return rewards.filter(reward => reward.category === category);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-4">
          <h2 className="text-3xl font-orbitron font-bold hologram-text mb-2">{t('shop.title')}</h2>
          <Dialog open={isAddingReward} onOpenChange={(open) => {
            setIsAddingReward(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="font-orbitron">
                <Plus className="w-4 h-4 mr-2" />
                Tambah Item
              </Button>
            </DialogTrigger>
            <DialogContent className="glass">
              <DialogHeader>
                <DialogTitle className="font-orbitron">{t('shop.addReward')}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="reward-name">{t('shop.form.name')}</Label>
                  <Input
                    id="reward-name"
                    value={rewardForm.name}
                    onChange={(e) => setRewardForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder={t('shop.form.name')}
                  />
                </div>
                <div>
                  <Label htmlFor="reward-desc">{t('shop.form.description')}</Label>
                  <Textarea
                    id="reward-desc"
                    value={rewardForm.description}
                    onChange={(e) => setRewardForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder={t('shop.form.description')}
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="reward-cost">{t('shop.form.cost')}</Label>
                    <Input
                      id="reward-cost"
                      type="number"
                      value={rewardForm.cost}
                      onChange={(e) => setRewardForm(prev => ({ ...prev, cost: parseInt(e.target.value) || 0 }))}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="reward-icon">{t('shop.form.icon')}</Label>
                    <Input
                      id="reward-icon"
                      value={rewardForm.icon}
                      onChange={(e) => setRewardForm(prev => ({ ...prev, icon: e.target.value }))}
                      placeholder="🎁"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="reward-category">{t('shop.form.category')}</Label>
                    <select 
                      id="reward-category"
                      value={rewardForm.category}
                      onChange={(e) => setRewardForm(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full p-2 bg-background border border-border rounded-md"
                    >
                      <option value="entertainment">{t('shop.entertainment')}</option>
                      <option value="food">{t('shop.food')}</option>
                      <option value="education">{t('shop.education')}</option>
                      <option value="lifestyle">{t('shop.lifestyle')}</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="reward-rarity">{t('shop.form.rarity')}</Label>
                    <select 
                      id="reward-rarity"
                      value={rewardForm.rarity}
                      onChange={(e) => setRewardForm(prev => ({ ...prev, rarity: e.target.value }))}
                      className="w-full p-2 bg-background border border-border rounded-md"
                    >
                      <option value="common">Common</option>
                      <option value="uncommon">Uncommon</option>
                      <option value="rare">Rare</option>
                      <option value="epic">Epic</option>
                      <option value="legendary">Legendary</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSaveReward} className="flex-1">
                    {t('button.add')} {t('shop.reward')}
                  </Button>
                  <Button variant="outline" onClick={() => setIsAddingReward(false)}>
                    {t('button.cancel')}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <p className="text-muted-foreground">{t('shop.subtitle')}</p>
      </div>

      <Tabs defaultValue="entertainment" className="w-full">
        <TabsList className="grid w-full grid-cols-4 glass">
          <TabsTrigger value="entertainment" className="font-orbitron transition-all duration-300">{t('shop.entertainment')}</TabsTrigger>
          <TabsTrigger value="food" className="font-orbitron transition-all duration-300">{t('shop.food')}</TabsTrigger>
          <TabsTrigger value="education" className="font-orbitron transition-all duration-300">{t('shop.education')}</TabsTrigger>
          <TabsTrigger value="lifestyle" className="font-orbitron transition-all duration-300">{t('shop.lifestyle')}</TabsTrigger>
        </TabsList>

        {['entertainment', 'food', 'education', 'lifestyle'].map(category => (
          <TabsContent key={category} value={category} className="mt-6 animate-fade-in">
            <div className="space-y-4">
              <h3 className="text-xl font-orbitron font-bold">{t(`shop.${category}`)}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getRewardsByCategory(category).map(reward => (
                  <div key={reward.id} className={`glass rounded-lg p-4 border-2 ${getRarityColor(reward.rarity)} hover:scale-105 transition-transform`}>
                    <div className="text-center mb-3">
                      <div className="text-4xl mb-2">{reward.icon}</div>
                      <h4 className="font-orbitron font-bold">{reward.name}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{reward.description}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Coins className="w-4 h-4 text-yellow-400" />
                        <span className="font-orbitron font-bold text-yellow-400">{reward.cost}</span>
                      </div>
                      <Badge variant="outline" className={getRarityColor(reward.rarity)}>
                        {reward.rarity}
                      </Badge>
                    </div>
                    
                    <Button className="w-full mt-3 font-orbitron">
                      {t('shop.buy')}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ShopTabs;
