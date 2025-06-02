import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit2, Trash2, Zap, Coins, Dumbbell, Brain, Users, Eye, Heart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import QuestCard from './QuestCard';

type QuestType = 'daily' | 'weekly' | 'main' | 'event';

const QuestBoard = () => {
  const { t } = useLanguage();
  
  const [defaultQuests, setDefaultQuests] = useState({
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
        statBonus: "STR",
        statValue: 1,
        isDefault: true,
        isAIGenerated: false
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
        statBonus: "INT",
        statValue: 1,
        isDefault: true,
        isAIGenerated: false
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
        statBonus: "INT",
        statValue: 3,
        isDefault: true,
        isAIGenerated: false
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
        statBonus: "INT",
        statValue: 10,
        isDefault: true,
        isAIGenerated: false
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
        statBonus: "WIS",
        statValue: 5,
        isDefault: true,
        isAIGenerated: false
      }
    ]
  });

  const [customQuests, setCustomQuests] = useState<any[]>([]);
  const [isAddingQuest, setIsAddingQuest] = useState(false);
  const [editingQuest, setEditingQuest] = useState<any>(null);
  const [questForm, setQuestForm] = useState({
    title: '',
    description: '',
    xpReward: 0,
    goldReward: 0,
    difficulty: 'Mudah',
    statBonus: 'STR',
    statValue: 1,
    type: 'daily' as QuestType,
    duration: 1,
    expireHour: '00:00',
    expireDate: '',
    isAIGenerated: false,
  });

  const resetForm = () => {
    setQuestForm({
      title: '',
      description: '',
      xpReward: 0,
      goldReward: 0,
      difficulty: 'Mudah',
      statBonus: 'STR',
      statValue: 1,
      type: 'daily' as QuestType,
      duration: 1,
      expireHour: '00:00',
      expireDate: '',
      isAIGenerated: false,
    });
  };

  const getStatIcon = (stat: string) => {
    switch (stat) {
      case 'STR': return <Dumbbell className="w-4 h-4 text-red-400" />;
      case 'DEX': return <Zap className="w-4 h-4 text-yellow-400" />;
      case 'INT': return <Brain className="w-4 h-4 text-blue-400" />;
      case 'WIS': return <Eye className="w-4 h-4 text-purple-400" />;
      case 'CHA': return <Users className="w-4 h-4 text-green-400" />;
      case 'CON': return <Heart className="w-4 h-4 text-pink-400" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  const handleSaveQuest = () => {
    if (questForm.title && questForm.description) {
      const questData = {
        ...questForm,
        id: editingQuest ? editingQuest.id : Date.now(),
        status: 'active' as const,
        timeLeft: `${questForm.expireHour}`,
        isDefault: editingQuest?.isDefault || false
      };

      if (editingQuest) {
        if (editingQuest.isDefault) {
          setDefaultQuests(prev => ({
            ...prev,
            [questForm.type]: prev[questForm.type].map(q => 
              q.id === editingQuest.id ? questData : q
            )
          }));
        } else {
          setCustomQuests(prev => prev.map(q => q.id === editingQuest.id ? questData : q));
        }
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
      statBonus: quest.statBonus || 'STR',
      statValue: quest.statValue || 1,
      type: quest.type as QuestType || 'daily',
      duration: quest.duration || 1,
      expireHour: quest.expireHour || '00:00',
      expireDate: quest.expireDate || '',
      isAIGenerated: quest.isAIGenerated || false,
    });
    setEditingQuest(quest);
    setIsAddingQuest(true);
  };

  const handleDeleteQuest = (questId: number, isDefault: boolean, type: string) => {
    if (isDefault) {
      setDefaultQuests(prev => ({
        ...prev,
        [type]: prev[type as keyof typeof prev].filter(q => q.id !== questId)
      }));
    } else {
      setCustomQuests(prev => prev.filter(q => q.id !== questId));
    }
  };

  const getAllQuests = (type: string) => {
    const defaultQuestsOfType = defaultQuests[type as keyof typeof defaultQuests] || [];
    const customQuestsOfType = customQuests.filter(quest => quest.type === type);
    return [...defaultQuestsOfType, ...customQuestsOfType];
  };

  const renderExpirationFields = () => {
    switch (questForm.type) {
      case 'daily':
        return (
          <div>
            <Label htmlFor="expire-hour">{t('quest.form.expire.daily')}</Label>
            <Input
              id="expire-hour"
              type="time"
              value={questForm.expireHour}
              onChange={(e) => setQuestForm(prev => ({ ...prev, expireHour: e.target.value }))}
            />
          </div>
        );
      case 'weekly':
        return (
          <div className="space-y-2">
            <Label>{t('quest.form.expire.weekly')}</Label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="expire-hour" className="text-xs">Jam</Label>
                <Input
                  id="expire-hour"
                  type="time"
                  value={questForm.expireHour}
                  onChange={(e) => setQuestForm(prev => ({ ...prev, expireHour: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="expire-date" className="text-xs">Tanggal</Label>
                <Input
                  id="expire-date"
                  type="date"
                  value={questForm.expireDate}
                  onChange={(e) => setQuestForm(prev => ({ ...prev, expireDate: e.target.value }))}
                />
              </div>
            </div>
          </div>
        );
      case 'main':
        return (
          <div>
            <Label className="text-muted-foreground">{t('quest.form.expire.main')}</Label>
          </div>
        );
      case 'event':
        return (
          <div className="space-y-2">
            <Label>{t('quest.form.expire.event')}</Label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="expire-hour" className="text-xs">Jam</Label>
                <Input
                  id="expire-hour"
                  type="time"
                  value={questForm.expireHour}
                  onChange={(e) => setQuestForm(prev => ({ ...prev, expireHour: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="expire-date" className="text-xs">Tanggal</Label>
                <Input
                  id="expire-date"
                  type="date"
                  value={questForm.expireDate}
                  onChange={(e) => setQuestForm(prev => ({ ...prev, expireDate: e.target.value }))}
                />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-orbitron font-bold hologram-text mb-2">{t('quest.title')}</h2>
        <p className="text-muted-foreground">{t('quest.subtitle')}</p>
      </div>

      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="grid w-full grid-cols-4 glass">
          <TabsTrigger value="daily" className="font-orbitron transition-all duration-500">{t('quest.daily')}</TabsTrigger>
          <TabsTrigger value="weekly" className="font-orbitron transition-all duration-500">{t('quest.weekly')}</TabsTrigger>
          <TabsTrigger value="main" className="font-orbitron transition-all duration-500">{t('quest.main')}</TabsTrigger>
          <TabsTrigger value="event" className="font-orbitron transition-all duration-500">{t('quest.event')}</TabsTrigger>
        </TabsList>

        {(['daily', 'weekly', 'main', 'event'] as QuestType[]).map(tabValue => (
          <TabsContent key={tabValue} value={tabValue} className="mt-6 animate-slide-in-futuristic">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-orbitron font-bold">Quest {t(`quest.${tabValue}`)}</h3>
                {tabValue !== 'main' && (
                  <span className="text-sm text-muted-foreground">Reset dalam 6j 30m</span>
                )}
              </div>
              <div className="grid gap-4">
                {getAllQuests(tabValue).map(quest => (
                  <div key={quest.id} className="relative">
                    <QuestCard quest={quest} type={tabValue} />
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-6 w-6 p-0"
                        onClick={() => handleEditQuest({...quest, type: tabValue})}
                      >
                        <Edit2 className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="h-6 w-6 p-0"
                        onClick={() => handleDeleteQuest(quest.id, quest.isDefault || false, tabValue)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Add Quest Button - Moved to bottom */}
              <div className="flex justify-center pt-4">
                <Dialog open={isAddingQuest} onOpenChange={(open) => {
                  setIsAddingQuest(open);
                  if (!open) {
                    setEditingQuest(null);
                    resetForm();
                  }
                }}>
                  <DialogTrigger asChild>
                    <Button className="font-orbitron">
                      <Plus className="w-4 h-4 mr-2" />
                      {t('quest.add')}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="glass max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="font-orbitron">
                        {editingQuest ? `${t('button.edit')} Quest` : t('quest.add')}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="quest-title">{t('quest.form.title')}</Label>
                          <Input
                            id="quest-title"
                            value={questForm.title}
                            onChange={(e) => setQuestForm(prev => ({ ...prev, title: e.target.value }))}
                            placeholder={t('quest.form.title')}
                          />
                        </div>
                        <div>
                          <Label htmlFor="quest-desc">{t('quest.form.description')}</Label>
                          <Textarea
                            id="quest-desc"
                            value={questForm.description}
                            onChange={(e) => setQuestForm(prev => ({ ...prev, description: e.target.value }))}
                            placeholder={t('quest.form.description')}
                            rows={3}
                          />
                        </div>
                        <div>
                          <Label htmlFor="quest-type">{t('quest.form.type')}</Label>
                          <select 
                            id="quest-type"
                            value={questForm.type}
                            onChange={(e) => setQuestForm(prev => ({ ...prev, type: e.target.value as QuestType }))}
                            className="w-full p-2 bg-background border border-border rounded-md"
                          >
                            <option value="daily">{t('quest.daily')}</option>
                            <option value="weekly">{t('quest.weekly')}</option>
                            <option value="main">{t('quest.main')}</option>
                            <option value="event">{t('quest.event')}</option>
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="quest-difficulty">{t('quest.form.difficulty')}</Label>
                          <select 
                            id="quest-difficulty"
                            value={questForm.difficulty}
                            onChange={(e) => setQuestForm(prev => ({ ...prev, difficulty: e.target.value }))}
                            className="w-full p-2 bg-background border border-border rounded-md"
                          >
                            <option value="Mudah">{t('quest.difficulty.easy')}</option>
                            <option value="Sedang">{t('quest.difficulty.medium')}</option>
                            <option value="Sulit">{t('quest.difficulty.hard')}</option>
                          </select>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="ai-generated"
                            checked={questForm.isAIGenerated}
                            onChange={(e) => setQuestForm(prev => ({ ...prev, isAIGenerated: e.target.checked }))}
                            className="rounded border border-border"
                          />
                          <Label htmlFor="ai-generated" className="text-sm">Quest dibuat oleh AI</Label>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="quest-xp" className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-primary" />
                            {t('quest.form.xp')}
                          </Label>
                          <Input
                            id="quest-xp"
                            type="number"
                            value={questForm.xpReward}
                            onChange={(e) => setQuestForm(prev => ({ ...prev, xpReward: parseInt(e.target.value) || 0 }))}
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <Label htmlFor="quest-gold" className="flex items-center gap-2">
                            <Coins className="w-4 h-4 text-yellow-400" />
                            {t('quest.form.gold')}
                          </Label>
                          <Input
                            id="quest-gold"
                            type="number"
                            value={questForm.goldReward}
                            onChange={(e) => setQuestForm(prev => ({ ...prev, goldReward: parseInt(e.target.value) || 0 }))}
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <Label className="flex items-center gap-2">
                            {getStatIcon(questForm.statBonus)}
                            {t('quest.form.stats')}
                          </Label>
                          <div className="grid grid-cols-2 gap-2">
                            <select 
                              value={questForm.statBonus}
                              onChange={(e) => setQuestForm(prev => ({ ...prev, statBonus: e.target.value }))}
                              className="p-2 bg-background border border-border rounded-md"
                            >
                              <option value="STR">STR</option>
                              <option value="DEX">DEX</option>
                              <option value="INT">INT</option>
                              <option value="WIS">WIS</option>
                              <option value="CHA">CHA</option>
                              <option value="CON">CON</option>
                            </select>
                            <Input
                              type="number"
                              value={questForm.statValue}
                              onChange={(e) => setQuestForm(prev => ({ ...prev, statValue: parseInt(e.target.value) || 1 }))}
                              min="1"
                              placeholder="1"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="quest-duration">{t('quest.form.duration')}</Label>
                          <Input
                            id="quest-duration"
                            type="number"
                            value={questForm.duration}
                            onChange={(e) => setQuestForm(prev => ({ ...prev, duration: parseInt(e.target.value) || 1 }))}
                            min="1"
                            placeholder="1"
                          />
                        </div>
                        {renderExpirationFields()}
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button onClick={handleSaveQuest} className="flex-1">
                        {editingQuest ? t('button.update') : t('button.add')} Quest
                      </Button>
                      <Button variant="outline" onClick={() => {
                        setIsAddingQuest(false);
                        setEditingQuest(null);
                        resetForm();
                      }}>
                        {t('button.cancel')}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default QuestBoard;
