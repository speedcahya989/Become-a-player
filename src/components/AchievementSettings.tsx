
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit2, Trash2, Trophy } from 'lucide-react';

const AchievementSettings = () => {
  const [customAchievements, setCustomAchievements] = useState<any[]>([]);
  const [isAddingAchievement, setIsAddingAchievement] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState<any>(null);
  const [achievementForm, setAchievementForm] = useState({
    title: '',
    description: '',
    xpReward: 0,
    goldReward: 0,
    requirement: '',
    category: 'progression',
    rarity: 'Bronze',
    icon: '🏆',
    targetValue: 1
  });

  const resetForm = () => {
    setAchievementForm({
      title: '',
      description: '',
      xpReward: 0,
      goldReward: 0,
      requirement: '',
      category: 'progression',
      rarity: 'Bronze',
      icon: '🏆',
      targetValue: 1
    });
  };

  const handleSaveAchievement = () => {
    if (achievementForm.title && achievementForm.description) {
      const achievementData = {
        ...achievementForm,
        id: editingAchievement ? editingAchievement.id : Date.now(),
        status: 'locked',
        progress: 0
      };

      if (editingAchievement) {
        setCustomAchievements(prev => prev.map(a => a.id === editingAchievement.id ? achievementData : a));
        setEditingAchievement(null);
      } else {
        setCustomAchievements(prev => [...prev, achievementData]);
      }

      resetForm();
      setIsAddingAchievement(false);
    }
  };

  const handleEditAchievement = (achievement: any) => {
    setAchievementForm({
      title: achievement.title,
      description: achievement.description,
      xpReward: achievement.xpReward,
      goldReward: achievement.goldReward,
      requirement: achievement.requirement,
      category: achievement.category,
      rarity: achievement.rarity,
      icon: achievement.icon,
      targetValue: achievement.targetValue
    });
    setEditingAchievement(achievement);
    setIsAddingAchievement(true);
  };

  const handleDeleteAchievement = (achievementId: number) => {
    setCustomAchievements(prev => prev.filter(a => a.id !== achievementId));
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Bronze': return 'bg-amber-700/20 text-amber-600 border-amber-700/30';
      case 'Silver': return 'bg-gray-400/20 text-gray-300 border-gray-400/30';
      case 'Gold': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Platinum': return 'bg-blue-300/20 text-blue-200 border-blue-300/30';
      case 'Diamond': return 'bg-cyan-400/20 text-cyan-300 border-cyan-400/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-orbitron font-bold hologram-text">Pengaturan Prestasi</h2>
        <Dialog open={isAddingAchievement} onOpenChange={(open) => {
          setIsAddingAchievement(open);
          if (!open) {
            setEditingAchievement(null);
            resetForm();
          }
        }}>
          <DialogTrigger asChild>
            <Button className="font-orbitron">
              <Plus className="w-4 h-4 mr-2" />
              Tambah Prestasi
            </Button>
          </DialogTrigger>
          <DialogContent className="glass max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-orbitron">
                {editingAchievement ? 'Edit Prestasi' : 'Tambah Prestasi Baru'}
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="achievement-title">Judul Prestasi</Label>
                  <Input
                    id="achievement-title"
                    value={achievementForm.title}
                    onChange={(e) => setAchievementForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Masukkan judul prestasi"
                  />
                </div>
                <div>
                  <Label htmlFor="achievement-desc">Deskripsi</Label>
                  <Textarea
                    id="achievement-desc"
                    value={achievementForm.description}
                    onChange={(e) => setAchievementForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Masukkan deskripsi prestasi"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="achievement-requirement">Syarat Pencapaian</Label>
                  <Input
                    id="achievement-requirement"
                    value={achievementForm.requirement}
                    onChange={(e) => setAchievementForm(prev => ({ ...prev, requirement: e.target.value }))}
                    placeholder="Contoh: Selesaikan 10 quest harian"
                  />
                </div>
                <div>
                  <Label htmlFor="achievement-target">Target Value</Label>
                  <Input
                    id="achievement-target"
                    type="number"
                    value={achievementForm.targetValue}
                    onChange={(e) => setAchievementForm(prev => ({ ...prev, targetValue: parseInt(e.target.value) || 1 }))}
                    placeholder="1"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="achievement-category">Kategori</Label>
                  <select 
                    id="achievement-category"
                    value={achievementForm.category}
                    onChange={(e) => setAchievementForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full p-2 bg-background border border-border rounded-md"
                  >
                    <option value="progression">Progression</option>
                    <option value="completion">Completion</option>
                    <option value="milestone">Milestone</option>
                    <option value="special">Special</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="achievement-rarity">Rarity</Label>
                  <select 
                    id="achievement-rarity"
                    value={achievementForm.rarity}
                    onChange={(e) => setAchievementForm(prev => ({ ...prev, rarity: e.target.value }))}
                    className="w-full p-2 bg-background border border-border rounded-md"
                  >
                    <option value="Bronze">Bronze</option>
                    <option value="Silver">Silver</option>
                    <option value="Gold">Gold</option>
                    <option value="Platinum">Platinum</option>
                    <option value="Diamond">Diamond</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="achievement-xp">XP Reward</Label>
                  <Input
                    id="achievement-xp"
                    type="number"
                    value={achievementForm.xpReward}
                    onChange={(e) => setAchievementForm(prev => ({ ...prev, xpReward: parseInt(e.target.value) || 0 }))}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="achievement-gold">Gold Reward</Label>
                  <Input
                    id="achievement-gold"
                    type="number"
                    value={achievementForm.goldReward}
                    onChange={(e) => setAchievementForm(prev => ({ ...prev, goldReward: parseInt(e.target.value) || 0 }))}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="achievement-icon">Icon (Emoji)</Label>
                  <Input
                    id="achievement-icon"
                    value={achievementForm.icon}
                    onChange={(e) => setAchievementForm(prev => ({ ...prev, icon: e.target.value }))}
                    placeholder="🏆"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button onClick={handleSaveAchievement} className="flex-1">
                {editingAchievement ? 'Update' : 'Tambah'} Prestasi
              </Button>
              <Button variant="outline" onClick={() => {
                setIsAddingAchievement(false);
                setEditingAchievement(null);
                resetForm();
              }}>
                Batal
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {customAchievements.map(achievement => (
          <div key={achievement.id} className="glass rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-2xl">{achievement.icon}</span>
                  <h4 className="font-orbitron font-bold text-lg">{achievement.title}</h4>
                  <Badge variant="outline" className={getRarityColor(achievement.rarity)}>
                    {achievement.rarity}
                  </Badge>
                  <Badge variant="secondary" className="bg-accent/20 text-accent">
                    {achievement.category.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm mb-2">{achievement.description}</p>
                <p className="text-xs text-muted-foreground mb-2">{achievement.requirement}</p>
                <div className="flex gap-4 text-sm">
                  <span className="text-primary">XP: {achievement.xpReward}</span>
                  <span className="text-yellow-400">Gold: {achievement.goldReward}</span>
                  <span className="text-muted-foreground">Target: {achievement.targetValue}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleEditAchievement(achievement)}>
                  <Edit2 className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDeleteAchievement(achievement.id)}>
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
        
        {customAchievements.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>Belum ada prestasi kustom. Tambahkan prestasi pertama Anda!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementSettings;
