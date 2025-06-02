import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const ShopSettings = () => {
  const [customRewards, setCustomRewards] = useState<any[]>([]);
  const [isAddingReward, setIsAddingReward] = useState(false);
  const [editingReward, setEditingReward] = useState<any>(null);
  const [rewardForm, setRewardForm] = useState({
    name: '',
    description: '',
    price: 0,
    category: 'reward',
    rarity: 'Common',
    icon: '🎁'
  });

  const resetForm = () => {
    setRewardForm({
      name: '',
      description: '',
      price: 0,
      category: 'reward',
      rarity: 'Common',
      icon: '🎁'
    });
  };

  const handleSaveReward = () => {
    if (rewardForm.name && rewardForm.description) {
      const rewardData = {
        ...rewardForm,
        id: editingReward ? editingReward.id : Date.now(),
        status: 'available'
      };

      if (editingReward) {
        setCustomRewards(prev => prev.map(r => r.id === editingReward.id ? rewardData : r));
        setEditingReward(null);
      } else {
        setCustomRewards(prev => [...prev, rewardData]);
      }

      resetForm();
      setIsAddingReward(false);
    }
  };

  const handleEditReward = (reward: any) => {
    setRewardForm({
      name: reward.name,
      description: reward.description,
      price: reward.price,
      category: reward.category,
      rarity: reward.rarity,
      icon: reward.icon
    });
    setEditingReward(reward);
    setIsAddingReward(true);
  };

  const handleDeleteReward = (rewardId: number) => {
    setCustomRewards(prev => prev.filter(r => r.id !== rewardId));
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      case 'Rare': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Epic': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Legendary': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-orbitron font-bold hologram-text">Pengaturan Toko</h2>
      </div>

      <div className="grid gap-4">
        {customRewards.map(reward => (
          <div key={reward.id} className="glass rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-2xl">{reward.icon}</span>
                  <h4 className="font-orbitron font-bold text-lg">{reward.name}</h4>
                  <Badge variant="outline" className={getRarityColor(reward.rarity)}>
                    {reward.rarity}
                  </Badge>
                  <Badge variant="secondary" className={reward.category === 'powerup' ? 'bg-purple-500/20 text-purple-400' : 'bg-green-500/20 text-green-400'}>
                    {reward.category.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm mb-2">{reward.description}</p>
                <div className="flex gap-4 text-sm">
                  <span className="text-yellow-400">Price: {reward.price} Gold</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleEditReward(reward)}>
                  <Edit2 className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDeleteReward(reward.id)}>
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
        
        {customRewards.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>Belum ada reward kustom. Tambahkan reward pertama Anda!</p>
          </div>
        )}
      </div>

      {/* Add Reward Button - Moved to Bottom */}
      <div className="flex justify-center mt-8">
        <Dialog open={isAddingReward} onOpenChange={(open) => {
          setIsAddingReward(open);
          if (!open) {
            setEditingReward(null);
            resetForm();
          }
        }}>
          <DialogTrigger asChild>
            <Button className="font-orbitron" size="lg">
              <Plus className="w-4 h-4 mr-2" />
              Tambah Reward
            </Button>
          </DialogTrigger>
          <DialogContent className="glass max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-orbitron">
                {editingReward ? 'Edit Reward' : 'Tambah Reward Baru'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="reward-name">Nama Reward</Label>
                <Input
                  id="reward-name"
                  value={rewardForm.name}
                  onChange={(e) => setRewardForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Masukkan nama reward"
                />
              </div>
              <div>
                <Label htmlFor="reward-desc">Deskripsi</Label>
                <Textarea
                  id="reward-desc"
                  value={rewardForm.description}
                  onChange={(e) => setRewardForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Masukkan deskripsi reward"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="reward-price">Harga (Gold)</Label>
                <Input
                  id="reward-price"
                  type="number"
                  value={rewardForm.price}
                  onChange={(e) => setRewardForm(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="reward-category">Kategori</Label>
                <select 
                  id="reward-category"
                  value={rewardForm.category}
                  onChange={(e) => setRewardForm(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full p-2 bg-background border border-border rounded-md"
                >
                  <option value="reward">Reward</option>
                  <option value="powerup">Power-up</option>
                </select>
              </div>
              <div>
                <Label htmlFor="reward-rarity">Rarity</Label>
                <select 
                  id="reward-rarity"
                  value={rewardForm.rarity}
                  onChange={(e) => setRewardForm(prev => ({ ...prev, rarity: e.target.value }))}
                  className="w-full p-2 bg-background border border-border rounded-md"
                >
                  <option value="Common">Common</option>
                  <option value="Rare">Rare</option>
                  <option value="Epic">Epic</option>
                  <option value="Legendary">Legendary</option>
                </select>
              </div>
              <div>
                <Label htmlFor="reward-icon">Icon (Emoji)</Label>
                <Input
                  id="reward-icon"
                  value={rewardForm.icon}
                  onChange={(e) => setRewardForm(prev => ({ ...prev, icon: e.target.value }))}
                  placeholder="🎁"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button onClick={handleSaveReward} className="flex-1">
                {editingReward ? 'Update' : 'Tambah'} Reward
              </Button>
              <Button variant="outline" onClick={() => {
                setIsAddingReward(false);
                setEditingReward(null);
                resetForm();
              }}>
                Batal
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ShopSettings;
