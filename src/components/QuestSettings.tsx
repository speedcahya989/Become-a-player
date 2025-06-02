import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const QuestSettings = () => {
  const [customQuests, setCustomQuests] = useState<any[]>([]);
  const [isAddingQuest, setIsAddingQuest] = useState(false);
  const [editingQuest, setEditingQuest] = useState<any>(null);
  const [questForm, setQuestForm] = useState({
    title: '',
    description: '',
    xpReward: 0,
    goldReward: 0,
    difficulty: 'Mudah',
    statBonus: '',
    type: 'daily',
    duration: 30,
    expireAfter: 24
  });

  const resetForm = () => {
    setQuestForm({
      title: '',
      description: '',
      xpReward: 0,
      goldReward: 0,
      difficulty: 'Mudah',
      statBonus: '',
      type: 'daily',
      duration: 30,
      expireAfter: 24
    });
  };

  const handleSaveQuest = () => {
    if (questForm.title && questForm.description) {
      const questData = {
        ...questForm,
        id: editingQuest ? editingQuest.id : Date.now(),
        status: 'active'
      };

      if (editingQuest) {
        setCustomQuests(prev => prev.map(q => q.id === editingQuest.id ? questData : q));
        setEditingQuest(null);
      } else {
        setCustomQuests(prev => [...prev, questData]);
      }

      resetForm();
      setIsAddingQuest(false);
    }
  };

  const handleEditQuest = (quest: any) => {
    setQuestForm({
      title: quest.title,
      description: quest.description,
      xpReward: quest.xpReward,
      goldReward: quest.goldReward,
      difficulty: quest.difficulty,
      statBonus: quest.statBonus,
      type: quest.type,
      duration: quest.duration,
      expireAfter: quest.expireAfter
    });
    setEditingQuest(quest);
    setIsAddingQuest(true);
  };

  const handleDeleteQuest = (questId: number) => {
    setCustomQuests(prev => prev.filter(q => q.id !== questId));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Mudah': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Sedang': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Sulit': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'daily': return 'bg-blue-500/20 text-blue-400';
      case 'weekly': return 'bg-purple-500/20 text-purple-400';
      case 'main': return 'bg-orange-500/20 text-orange-400';
      case 'event': return 'bg-pink-500/20 text-pink-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-orbitron font-bold hologram-text">Pengaturan Quest</h2>
      </div>

      <div className="grid gap-4">
        {customQuests.map(quest => (
          <div key={quest.id} className="glass rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <h4 className="font-orbitron font-bold text-lg">{quest.title}</h4>
                  <Badge variant="outline" className={getDifficultyColor(quest.difficulty)}>
                    {quest.difficulty}
                  </Badge>
                  <Badge variant="secondary" className={getTypeColor(quest.type)}>
                    {quest.type.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm mb-2">{quest.description}</p>
                <div className="flex gap-4 text-sm">
                  <span className="text-primary">XP: {quest.xpReward}</span>
                  <span className="text-yellow-400">Gold: {quest.goldReward}</span>
                  <span className="text-accent">{quest.statBonus}</span>
                  <span className="text-muted-foreground">Durasi: {quest.duration}m</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleEditQuest(quest)}>
                  <Edit2 className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDeleteQuest(quest.id)}>
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
        
        {customQuests.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>Belum ada quest kustom. Tambahkan quest pertama Anda!</p>
          </div>
        )}
      </div>

      {/* Add Quest Button - Moved to Bottom */}
      <div className="flex justify-center mt-8">
        <Dialog open={isAddingQuest} onOpenChange={(open) => {
          setIsAddingQuest(open);
          if (!open) {
            setEditingQuest(null);
            resetForm();
          }
        }}>
          <DialogTrigger asChild>
            <Button className="font-orbitron" size="lg">
              <Plus className="w-4 h-4 mr-2" />
              Tambah Quest
            </Button>
          </DialogTrigger>
          <DialogContent className="glass max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-orbitron">
                {editingQuest ? 'Edit Quest' : 'Tambah Quest Baru'}
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="quest-title">Judul Quest</Label>
                  <Input
                    id="quest-title"
                    value={questForm.title}
                    onChange={(e) => setQuestForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Masukkan judul quest"
                  />
                </div>
                <div>
                  <Label htmlFor="quest-desc">Deskripsi</Label>
                  <Textarea
                    id="quest-desc"
                    value={questForm.description}
                    onChange={(e) => setQuestForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Masukkan deskripsi quest"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="quest-type">Tipe Quest</Label>
                  <select 
                    id="quest-type"
                    value={questForm.type}
                    onChange={(e) => setQuestForm(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full p-2 bg-background border border-border rounded-md"
                  >
                    <option value="daily">Harian</option>
                    <option value="weekly">Mingguan</option>
                    <option value="main">Utama</option>
                    <option value="event">Event</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="quest-difficulty">Tingkat Kesulitan</Label>
                  <select 
                    id="quest-difficulty"
                    value={questForm.difficulty}
                    onChange={(e) => setQuestForm(prev => ({ ...prev, difficulty: e.target.value }))}
                    className="w-full p-2 bg-background border border-border rounded-md"
                  >
                    <option value="Mudah">Mudah</option>
                    <option value="Sedang">Sedang</option>
                    <option value="Sulit">Sulit</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="quest-xp">XP Reward</Label>
                  <Input
                    id="quest-xp"
                    type="number"
                    value={questForm.xpReward}
                    onChange={(e) => setQuestForm(prev => ({ ...prev, xpReward: parseInt(e.target.value) || 0 }))}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="quest-gold">Gold Reward</Label>
                  <Input
                    id="quest-gold"
                    type="number"
                    value={questForm.goldReward}
                    onChange={(e) => setQuestForm(prev => ({ ...prev, goldReward: parseInt(e.target.value) || 0 }))}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="quest-stats">Bonus Stats (contoh: STR +1, INT +2)</Label>
                  <Input
                    id="quest-stats"
                    value={questForm.statBonus}
                    onChange={(e) => setQuestForm(prev => ({ ...prev, statBonus: e.target.value }))}
                    placeholder="STR +1"
                  />
                </div>
                <div>
                  <Label htmlFor="quest-duration">Durasi Pengerjaan (menit)</Label>
                  <Input
                    id="quest-duration"
                    type="number"
                    value={questForm.duration}
                    onChange={(e) => setQuestForm(prev => ({ ...prev, duration: parseInt(e.target.value) || 30 }))}
                    placeholder="30"
                  />
                </div>
                <div>
                  <Label htmlFor="quest-expire">Kadaluarsa Setelah (jam)</Label>
                  <Input
                    id="quest-expire"
                    type="number"
                    value={questForm.expireAfter}
                    onChange={(e) => setQuestForm(prev => ({ ...prev, expireAfter: parseInt(e.target.value) || 24 }))}
                    placeholder="24"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button onClick={handleSaveQuest} className="flex-1">
                {editingQuest ? 'Update' : 'Tambah'} Quest
              </Button>
              <Button variant="outline" onClick={() => {
                setIsAddingQuest(false);
                setEditingQuest(null);
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

export default QuestSettings;
