
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit2, Trash2, Settings } from 'lucide-react';
import QuestCard from './QuestCard';

const QuestBoard = () => {
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

  const [quests] = useState({
    daily: [
      {
        id: 1,
        title: "Olahraga Pagi",
        description: "Selesaikan aktivitas fisik selama 30 menit",
        xpReward: 50,
        goldReward: 25,
        timeLeft: "6j 30m",
        status: "active" as const,
        difficulty: "Mudah" as const,
        statBonus: "STR +1"
      },
      {
        id: 2,
        title: "Baca 20 Halaman",
        description: "Baca minimal 20 halaman buku apapun",
        xpReward: 40,
        goldReward: 20,
        timeLeft: "12j 15m",
        status: "active" as const,
        difficulty: "Mudah" as const,
        statBonus: "INT +1"
      },
      {
        id: 3,
        title: "Meditasi",
        description: "10 menit meditasi mindfulness",
        xpReward: 35,
        goldReward: 15,
        timeLeft: "8j 45m",
        status: "completed" as const,
        difficulty: "Mudah" as const,
        statBonus: "WIS +1"
      }
    ],
    weekly: [
      {
        id: 4,
        title: "Pelajari Skill Baru",
        description: "Habiskan 3 jam mempelajari sesuatu yang baru",
        xpReward: 200,
        goldReward: 100,
        timeLeft: "3h 12j",
        status: "active" as const,
        difficulty: "Sedang" as const,
        statBonus: "INT +3"
      },
      {
        id: 5,
        title: "Koneksi Sosial",
        description: "Bercakap bermakna dengan 3 orang",
        xpReward: 150,
        goldReward: 75,
        timeLeft: "5h 8j",
        status: "active" as const,
        difficulty: "Sedang" as const,
        statBonus: "CHA +2"
      }
    ],
    main: [
      {
        id: 6,
        title: "Kuasai Programming",
        description: "Selesaikan kursus programming lanjutan",
        xpReward: 1000,
        goldReward: 500,
        timeLeft: "Tanpa batas",
        status: "active" as const,
        difficulty: "Sulit" as const,
        statBonus: "INT +10, DEX +5"
      }
    ],
    event: [
      {
        id: 7,
        title: "Resolusi Tahun Baru",
        description: "Tetapkan dan rencanakan tujuan untuk tahun ini",
        xpReward: 300,
        goldReward: 150,
        timeLeft: "2h 6j",
        status: "active" as const,
        difficulty: "Sedang" as const,
        statBonus: "WIS +5"
      }
    ]
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
        status: 'active',
        timeLeft: `${questForm.expireAfter}j 0m`
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
      duration: quest.duration || 30,
      expireAfter: quest.expireAfter || 24
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

  // Combine custom quests with default quests
  const getAllQuests = (type: string) => {
    const defaultQuests = quests[type as keyof typeof quests] || [];
    const customQuestsOfType = customQuests.filter(quest => quest.type === type);
    return [...defaultQuests, ...customQuestsOfType];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-center flex-1">
          <h2 className="text-3xl font-orbitron font-bold hologram-text mb-2">Papan Quest</h2>
          <p className="text-muted-foreground">Pilih jalur menuju kehebatan</p>
        </div>
        <Dialog open={isAddingQuest} onOpenChange={(open) => {
          setIsAddingQuest(open);
          if (!open) {
            setEditingQuest(null);
            resetForm();
          }
        }}>
          <DialogTrigger asChild>
            <Button className="font-orbitron">
              <Settings className="w-4 h-4 mr-2" />
              Pengaturan Quest
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

      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="grid w-full grid-cols-4 glass">
          <TabsTrigger value="daily" className="font-orbitron">Harian</TabsTrigger>
          <TabsTrigger value="weekly" className="font-orbitron">Mingguan</TabsTrigger>
          <TabsTrigger value="main" className="font-orbitron">Utama</TabsTrigger>
          <TabsTrigger value="event" className="font-orbitron">Event</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="mt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-orbitron font-bold">Quest Harian</h3>
              <span className="text-sm text-muted-foreground">Reset dalam 6j 30m</span>
            </div>
            <div className="grid gap-4">
              {getAllQuests('daily').map(quest => (
                <div key={quest.id} className="relative">
                  <QuestCard quest={quest} type="daily" />
                  {customQuests.some(cq => cq.id === quest.id) && (
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-6 w-6 p-0"
                        onClick={() => handleEditQuest(quest)}
                      >
                        <Edit2 className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="h-6 w-6 p-0"
                        onClick={() => handleDeleteQuest(quest.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="weekly" className="mt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-orbitron font-bold">Quest Mingguan</h3>
              <span className="text-sm text-muted-foreground">Reset dalam 3h 12j</span>
            </div>
            <div className="grid gap-4">
              {getAllQuests('weekly').map(quest => (
                <div key={quest.id} className="relative">
                  <QuestCard quest={quest} type="weekly" />
                  {customQuests.some(cq => cq.id === quest.id) && (
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-6 w-6 p-0"
                        onClick={() => handleEditQuest(quest)}
                      >
                        <Edit2 className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="h-6 w-6 p-0"
                        onClick={() => handleDeleteQuest(quest.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="main" className="mt-6">
          <div className="space-y-4">
            <h3 className="text-xl font-orbitron font-bold">Quest Utama</h3>
            <div className="grid gap-4">
              {getAllQuests('main').map(quest => (
                <div key={quest.id} className="relative">
                  <QuestCard quest={quest} type="main" />
                  {customQuests.some(cq => cq.id === quest.id) && (
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-6 w-6 p-0"
                        onClick={() => handleEditQuest(quest)}
                      >
                        <Edit2 className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="h-6 w-6 p-0"
                        onClick={() => handleDeleteQuest(quest.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="event" className="mt-6">
          <div className="space-y-4">
            <h3 className="text-xl font-orbitron font-bold">Quest Event</h3>
            <div className="grid gap-4">
              {getAllQuests('event').map(quest => (
                <div key={quest.id} className="relative">
                  <QuestCard quest={quest} type="event" />
                  {customQuests.some(cq => cq.id === quest.id) && (
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-6 w-6 p-0"
                        onClick={() => handleEditQuest(quest)}
                      >
                        <Edit2 className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="h-6 w-6 p-0"
                        onClick={() => handleDeleteQuest(quest.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Custom Quests Management Section */}
      {customQuests.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-orbitron font-bold mb-4">Quest Kustom Anda</h3>
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
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestBoard;
