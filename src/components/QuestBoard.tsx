
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Clock, Star, Target, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const QuestBoard = () => {
  const { t } = useLanguage();
  
  const [quests, setQuests] = useState([
    {
      id: 1,
      title: "Olahraga Pagi",
      description: "Lakukan olahraga selama 30 menit",
      category: "daily",
      difficulty: "easy",
      xp: 50,
      gold: 25,
      status: "active",
      deadline: "2024-01-15",
      icon: "🏃‍♂️"
    },
    {
      id: 2,
      title: "Baca Buku",
      description: "Baca minimal 20 halaman buku",
      category: "weekly",
      difficulty: "medium",
      xp: 100,
      gold: 50,
      status: "completed",
      deadline: "2024-01-20",
      icon: "📚"
    },
    {
      id: 3,
      title: "Proyek Coding",
      description: "Selesaikan fitur baru pada project",
      category: "monthly",
      difficulty: "hard",
      xp: 200,
      gold: 100,
      status: "active",
      deadline: "2024-01-31",
      icon: "💻"
    }
  ]);

  const [isAddingQuest, setIsAddingQuest] = useState(false);
  const [questForm, setQuestForm] = useState({
    title: '',
    description: '',
    category: 'daily',
    difficulty: 'easy',
    xp: 50,
    gold: 25,
    deadline: '',
    icon: '🎯'
  });

  const resetForm = () => {
    setQuestForm({
      title: '',
      description: '',
      category: 'daily',
      difficulty: 'easy',
      xp: 50,
      gold: 25,
      deadline: '',
      icon: '🎯'
    });
  };

  const handleSaveQuest = () => {
    if (questForm.title && questForm.description) {
      const newQuest = {
        ...questForm,
        id: Date.now(),
        status: 'active'
      };
      setQuests(prev => [...prev, newQuest]);
      resetForm();
      setIsAddingQuest(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 border-green-400';
      case 'medium': return 'text-yellow-400 border-yellow-400';
      case 'hard': return 'text-red-400 border-red-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const getQuestsByCategory = (category: string) => {
    return quests.filter(quest => quest.category === category);
  };

  const toggleQuestStatus = (questId: number) => {
    setQuests(prev => prev.map(quest => 
      quest.id === questId 
        ? { ...quest, status: quest.status === 'completed' ? 'active' : 'completed' }
        : quest
    ));
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-4">
          <h2 className="text-3xl font-orbitron font-bold hologram-text mb-2">{t('quest.title')}</h2>
          <Dialog open={isAddingQuest} onOpenChange={(open) => {
            setIsAddingQuest(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="font-orbitron">
                <Plus className="w-4 h-4 mr-2" />
                Tambah Quest
              </Button>
            </DialogTrigger>
            <DialogContent className="glass">
              <DialogHeader>
                <DialogTitle className="font-orbitron">{t('quest.addQuest')}</DialogTitle>
              </DialogHeader>
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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="quest-category">{t('quest.form.category')}</Label>
                    <select 
                      id="quest-category"
                      value={questForm.category}
                      onChange={(e) => setQuestForm(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full p-2 bg-background border border-border rounded-md"
                    >
                      <option value="daily">{t('quest.daily')}</option>
                      <option value="weekly">{t('quest.weekly')}</option>
                      <option value="monthly">{t('quest.monthly')}</option>
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
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="quest-xp">{t('quest.form.xp')}</Label>
                    <Input
                      id="quest-xp"
                      type="number"
                      value={questForm.xp}
                      onChange={(e) => setQuestForm(prev => ({ ...prev, xp: parseInt(e.target.value) || 0 }))}
                      placeholder="50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="quest-gold">{t('quest.form.gold')}</Label>
                    <Input
                      id="quest-gold"
                      type="number"
                      value={questForm.gold}
                      onChange={(e) => setQuestForm(prev => ({ ...prev, gold: parseInt(e.target.value) || 0 }))}
                      placeholder="25"
                    />
                  </div>
                  <div>
                    <Label htmlFor="quest-icon">{t('quest.form.icon')}</Label>
                    <Input
                      id="quest-icon"
                      value={questForm.icon}
                      onChange={(e) => setQuestForm(prev => ({ ...prev, icon: e.target.value }))}
                      placeholder="🎯"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="quest-deadline">{t('quest.form.deadline')}</Label>
                  <Input
                    id="quest-deadline"
                    type="date"
                    value={questForm.deadline}
                    onChange={(e) => setQuestForm(prev => ({ ...prev, deadline: e.target.value }))}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSaveQuest} className="flex-1">
                    {t('button.add')} Quest
                  </Button>
                  <Button variant="outline" onClick={() => setIsAddingQuest(false)}>
                    {t('button.cancel')}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <p className="text-muted-foreground">{t('quest.subtitle')}</p>
      </div>

      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="grid w-full grid-cols-3 glass">
          <TabsTrigger value="daily" className="font-orbitron transition-all duration-300">{t('quest.daily')}</TabsTrigger>
          <TabsTrigger value="weekly" className="font-orbitron transition-all duration-300">{t('quest.weekly')}</TabsTrigger>
          <TabsTrigger value="monthly" className="font-orbitron transition-all duration-300">{t('quest.monthly')}</TabsTrigger>
        </TabsList>

        {['daily', 'weekly', 'monthly'].map(category => (
          <TabsContent key={category} value={category} className="mt-6 animate-fade-in">
            <div className="space-y-4">
              <h3 className="text-xl font-orbitron font-bold">{t(`quest.${category}`)}</h3>
              
              <div className="grid gap-4">
                {getQuestsByCategory(category).map(quest => (
                  <div 
                    key={quest.id} 
                    className={`quest-card p-4 border-l-4 hover:border-l-primary transition-all duration-300 ${
                      quest.status === 'completed' ? 'opacity-75' : 'hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20'
                    }`}
                    style={{ 
                      borderLeftColor: quest.status === 'completed' ? 'hsl(var(--primary))' : 'transparent',
                      boxShadow: quest.status === 'active' ? '0 0 0 1px rgba(6, 182, 212, 0.2)' : 'none'
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="text-2xl">{quest.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className={`font-orbitron font-bold ${quest.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}>
                              {quest.title}
                            </h4>
                            <Badge variant="outline" className={getDifficultyColor(quest.difficulty)}>
                              {quest.difficulty}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{quest.description}</p>
                          <div className="flex items-center gap-4 text-xs">
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-primary" />
                              <span>{quest.xp} XP</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-yellow-400">🪙</span>
                              <span>{quest.gold} Gold</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-muted-foreground" />
                              <span>{quest.deadline}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant={quest.status === 'completed' ? 'secondary' : 'default'}
                        size="sm"
                        onClick={() => toggleQuestStatus(quest.id)}
                        className="font-orbitron"
                      >
                        {quest.status === 'completed' ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <Target className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
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

export default QuestBoard;
