import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit2, Trash2, ShoppingCart, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const ShopTabs = () => {
  const { t } = useLanguage();
  
  const [rewards, setRewards] = useState([
    {
      id: 1,
      name: "Pizza Premium",
      description: t('shop.reward.pizza.description'),
      price: 150,
      category: "reward",
      rarity: "Common",
      icon: "🍕",
      canEdit: true
    },
    {
      id: 2,
      name: t('shop.reward.movie.name'),
      description: t('shop.reward.movie.description'),
      price: 200,
      category: "reward",
      rarity: "Rare",
      icon: "🎬",
      canEdit: true
    }
  ]);

  const [powerups, setPowerups] = useState([
    {
      id: 1,
      name: "⚡ Lightning Reflexes",
      description: t('shop.ability.lightning.description'),
      price: 100,
      category: "powerup",
      rarity: "Common",
      icon: "⚡",
      canEdit: false,
      cooldown: "Weekly",
      lastPurchased: null
    },
    {
      id: 2,
      name: "🔮 Crystal Vision", 
      description: t('shop.ability.crystal.description'),
      price: 150,
      category: "powerup",
      rarity: "Common",
      icon: "🔮",
      canEdit: false,
      cooldown: "Weekly",
      lastPurchased: null
    },
    {
      id: 3,
      name: "🌊 Flow State",
      description: t('shop.ability.flow.description'),
      price: 250,
      category: "powerup",
      rarity: "Rare",
      icon: "🌊",
      canEdit: false,
      cooldown: "Weekly",
      lastPurchased: null
    },
    {
      id: 4,
      name: "🎯 Perfect Aim",
      description: t('shop.ability.aim.description'),
      price: 200,
      category: "powerup",
      rarity: "Rare",
      icon: "🎯",
      canEdit: false,
      cooldown: "Weekly",
      lastPurchased: null
    },
    {
      id: 5,
      name: "🌟 Stellar Focus",
      description: t('shop.ability.stellar.description'),
      price: 180,
      category: "powerup",
      rarity: "Uncommon",
      icon: "🌟",
      canEdit: false,
      cooldown: "Weekly",
      lastPurchased: null
    },
    {
      id: 6,
      name: "🛡️ Aegis Shield",
      description: t('shop.ability.aegis.description'),
      price: 300,
      category: "powerup",
      rarity: "Uncommon",
      icon: "🛡️",
      canEdit: false,
      cooldown: "Weekly",
      lastPurchased: null
    }
  ]);

  const [isAddingItem, setIsAddingItem] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [itemForm, setItemForm] = useState({
    name: '',
    description: '',
    price: 0,
    category: 'reward',
    rarity: 'Common',
    icon: '🎁'
  });

  const resetForm = () => {
    setItemForm({
      name: '',
      description: '',
      price: 0,
      category: 'reward',
      rarity: 'Common',
      icon: '🎁'
    });
  };

  const handleSaveItem = () => {
    if (itemForm.name && itemForm.description) {
      const itemData = {
        ...itemForm,
        id: editingItem ? editingItem.id : Date.now(),
        canEdit: true,
        ...(itemForm.category === 'powerup' ? { cooldown: "Weekly", lastPurchased: null } : {})
      };

      if (editingItem) {
        if (itemForm.category === 'reward') {
          setRewards(prev => prev.map(r => r.id === editingItem.id ? itemData : r));
        } else {
          setPowerups(prev => prev.map(p => p.id === editingItem.id ? {
            ...itemData,
            cooldown: p.cooldown,
            lastPurchased: p.lastPurchased
          } : p));
        }
        setEditingItem(null);
      } else {
        if (itemForm.category === 'reward') {
          setRewards(prev => [...prev, itemData]);
        } else {
          setPowerups(prev => [...prev, { 
            ...itemData,
            cooldown: "Weekly",
            lastPurchased: null
          }]);
        }
      }

      resetForm();
      setIsAddingItem(false);
    }
  };

  const handleEditItem = (item: any) => {
    if (!item.canEdit) return;
    
    setItemForm({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      rarity: item.rarity,
      icon: item.icon
    });
    setEditingItem(item);
    setIsAddingItem(true);
  };

  const handleDeleteItem = (itemId: number, category: string) => {
    if (category === 'reward') {
      setRewards(prev => prev.filter(r => r.id !== itemId));
    } else {
      setPowerups(prev => prev.filter(p => p.id !== itemId));
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      case 'Uncommon': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Rare': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Epic': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Legendary': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const canPurchase = (item: any) => {
    if (item.category === 'powerup' && item.lastPurchased) {
      // Check if a week has passed since last purchase
      const daysSinceLastPurchase = Math.floor((Date.now() - item.lastPurchased) / (1000 * 60 * 60 * 24));
      return daysSinceLastPurchase >= 7;
    }
    return true;
  };

  const handlePurchase = (item: any) => {
    if (item.category === 'powerup') {
      setPowerups(prev => prev.map(p => 
        p.id === item.id ? { ...p, lastPurchased: Date.now() } : p
      ));
    }
    console.log(`Purchased: ${item.name}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-center flex-1">
          <h2 className="text-3xl font-orbitron font-bold hologram-text mb-2">{t('shop.title')}</h2>
          <p className="text-muted-foreground">{t('shop.subtitle')}</p>
        </div>
        <Dialog open={isAddingItem} onOpenChange={(open) => {
          setIsAddingItem(open);
          if (!open) {
            setEditingItem(null);
            resetForm();
          }
        }}>
          <DialogTrigger asChild>
            <Button className="font-orbitron">
              <Plus className="w-4 h-4 mr-2" />
              {t('button.add')} {t('shop.item')}
            </Button>
          </DialogTrigger>
          <DialogContent className="glass max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-orbitron">
                {editingItem ? `${t('button.edit')} ${t('shop.item')}` : `${t('button.add')} ${t('shop.newItem')}`}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="item-name">{t('shop.form.name')}</Label>
                <Input
                  id="item-name"
                  value={itemForm.name}
                  onChange={(e) => setItemForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder={t('shop.form.namePlaceholder')}
                />
              </div>
              <div>
                <Label htmlFor="item-desc">{t('shop.form.description')}</Label>
                <Textarea
                  id="item-desc"
                  value={itemForm.description}
                  onChange={(e) => setItemForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder={t('shop.form.descriptionPlaceholder')}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="item-price">{t('shop.form.price')}</Label>
                <Input
                  id="item-price"
                  type="number"
                  value={itemForm.price}
                  onChange={(e) => setItemForm(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="item-category">{t('shop.form.category')}</Label>
                <select 
                  id="item-category"
                  value={itemForm.category}
                  onChange={(e) => setItemForm(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full p-2 bg-background border border-border rounded-md"
                >
                  <option value="reward">{t('shop.rewards')}</option>
                  <option value="powerup">{t('shop.abilities')}</option>
                </select>
              </div>
              <div>
                <Label htmlFor="item-rarity">{t('shop.form.rarity')}</Label>
                <select 
                  id="item-rarity"
                  value={itemForm.rarity}
                  onChange={(e) => setItemForm(prev => ({ ...prev, rarity: e.target.value }))}
                  className="w-full p-2 bg-background border border-border rounded-md"
                >
                  <option value="Common">{t('shop.rarity.common')}</option>
                  <option value="Uncommon">{t('shop.rarity.uncommon')}</option>
                  <option value="Rare">{t('shop.rarity.rare')}</option>
                  <option value="Epic">{t('shop.rarity.epic')}</option>
                  <option value="Legendary">{t('shop.rarity.legendary')}</option>
                </select>
              </div>
              <div>
                <Label htmlFor="item-icon">{t('shop.form.icon')}</Label>
                <Input
                  id="item-icon"
                  value={itemForm.icon}
                  onChange={(e) => setItemForm(prev => ({ ...prev, icon: e.target.value }))}
                  placeholder="🎁"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button onClick={handleSaveItem} className="flex-1">
                {editingItem ? t('button.update') : t('button.add')} {t('shop.item')}
              </Button>
              <Button variant="outline" onClick={() => {
                setIsAddingItem(false);
                setEditingItem(null);
                resetForm();
              }}>
                {t('button.cancel')}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="rewards" className="w-full">
        <TabsList className="grid w-full grid-cols-2 glass">
          <TabsTrigger value="rewards" className="font-orbitron">{t('shop.rewards')}</TabsTrigger>
          <TabsTrigger value="powerups" className="font-orbitron">{t('shop.abilities')}</TabsTrigger>
        </TabsList>

        <TabsContent value="rewards" className="mt-6">
          <div className="grid gap-4">
            {rewards.map(reward => (
              <Card key={reward.id} className="glass relative">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-2xl">{reward.icon}</span>
                        <h4 className="font-orbitron font-bold text-lg">{reward.name}</h4>
                        <Badge variant="outline" className={getRarityColor(reward.rarity)}>
                          {t(`shop.rarity.${reward.rarity.toLowerCase()}`)}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm mb-3">{reward.description}</p>
                      <div className="flex items-center gap-4">
                        <span className="text-yellow-400 font-orbitron font-bold">{reward.price} {t('common.gold')}</span>
                        <Button className="font-orbitron">
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          {t('shop.buy')}
                        </Button>
                      </div>
                    </div>
                    {reward.canEdit && (
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEditItem(reward)}>
                          <Edit2 className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteItem(reward.id, 'reward')}>
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="powerups" className="mt-6">
          <div className="grid gap-4">
            {powerups.map(powerup => (
              <Card key={powerup.id} className="glass relative">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-2xl">{powerup.icon}</span>
                        <h4 className="font-orbitron font-bold text-lg">{powerup.name}</h4>
                        <Badge variant="outline" className={getRarityColor(powerup.rarity)}>
                          {t(`shop.rarity.${powerup.rarity.toLowerCase()}`)}
                        </Badge>
                        <Badge variant="outline" className="text-purple-400 border-purple-400/30">
                          <Clock className="w-3 h-3 mr-1" />
                          {t('shop.weekly')}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm mb-3">{powerup.description}</p>
                      <div className="flex items-center gap-4">
                        <span className="text-yellow-400 font-orbitron font-bold">{powerup.price} {t('common.gold')}</span>
                        <Button 
                          className="font-orbitron"
                          disabled={!canPurchase(powerup)}
                          onClick={() => handlePurchase(powerup)}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          {canPurchase(powerup) ? t('shop.buy') : t('shop.owned')}
                        </Button>
                      </div>
                    </div>
                    {powerup.canEdit && (
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEditItem(powerup)}>
                          <Edit2 className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteItem(powerup.id, 'powerup')}>
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ShopTabs;
