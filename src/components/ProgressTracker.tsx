
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CalendarDays, Trophy, Target, TrendingUp, Activity, Star } from 'lucide-react';

const ProgressTracker = () => {
  const [progressData] = useState({
    weeklyProgress: {
      questsCompleted: 12,
      questsTarget: 20,
      xpGained: 850,
      goldEarned: 420,
      streakDays: 5
    },
    monthlyStats: {
      totalQuests: 45,
      totalXP: 3250,
      totalGold: 1680,
      averageDaily: 8.5,
      bestStreak: 12
    },
    recentActivities: [
      { id: 1, type: 'quest_completed', title: 'Olahraga Pagi', xp: 50, gold: 25, timestamp: '2 jam lalu' },
      { id: 2, type: 'level_up', title: 'Naik ke Level 15', xp: 100, gold: 0, timestamp: '1 hari lalu' },
      { id: 3, type: 'achievement', title: 'Konsisten 5 Hari', xp: 200, gold: 100, timestamp: '1 hari lalu' },
      { id: 4, type: 'quest_completed', title: 'Baca 20 Halaman', xp: 40, gold: 20, timestamp: '2 hari lalu' },
      { id: 5, type: 'buff_acquired', title: 'Buff Motivasi Aktif', xp: 0, gold: 0, timestamp: '3 hari lalu' }
    ],
    skillProgress: [
      { name: 'Strength', current: 15, target: 20, progress: 75 },
      { name: 'Intelligence', current: 18, target: 25, progress: 72 },
      { name: 'Wisdom', current: 12, target: 15, progress: 80 },
      { name: 'Charisma', current: 10, target: 18, progress: 56 },
      { name: 'Dexterity', current: 14, target: 20, progress: 70 },
      { name: 'Constitution', current: 16, target: 22, progress: 73 }
    ]
  });

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'quest_completed': return <Target className="w-4 h-4 text-green-400" />;
      case 'level_up': return <TrendingUp className="w-4 h-4 text-blue-400" />;
      case 'achievement': return <Trophy className="w-4 h-4 text-yellow-400" />;
      case 'buff_acquired': return <Star className="w-4 h-4 text-purple-400" />;
      default: return <Activity className="w-4 h-4 text-gray-400" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'quest_completed': return 'bg-green-500/20 text-green-400';
      case 'level_up': return 'bg-blue-500/20 text-blue-400';
      case 'achievement': return 'bg-yellow-500/20 text-yellow-400';
      case 'buff_acquired': return 'bg-purple-500/20 text-purple-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-orbitron font-bold hologram-text mb-2">Progress Tracker</h2>
        <p className="text-muted-foreground">Pantau perkembangan dan pencapaian Anda</p>
      </div>

      {/* Weekly Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-orbitron flex items-center gap-2">
              <Target className="w-4 h-4" />
              Quest Mingguan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-2xl font-bold">{progressData.weeklyProgress.questsCompleted}</span>
                <span className="text-sm text-muted-foreground">/ {progressData.weeklyProgress.questsTarget}</span>
              </div>
              <Progress value={(progressData.weeklyProgress.questsCompleted / progressData.weeklyProgress.questsTarget) * 100} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {Math.round((progressData.weeklyProgress.questsCompleted / progressData.weeklyProgress.questsTarget) * 100)}% tercapai
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-orbitron flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              Streak Harian
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-end gap-1">
                <span className="text-2xl font-bold">{progressData.weeklyProgress.streakDays}</span>
                <span className="text-sm text-muted-foreground">hari</span>
              </div>
              <div className="flex gap-1">
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-4 h-4 rounded ${
                      i < progressData.weeklyProgress.streakDays ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Best: {progressData.monthlyStats.bestStreak} hari
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-orbitron flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              XP & Gold
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-primary text-sm">XP: {progressData.weeklyProgress.xpGained}</span>
                <span className="text-yellow-400 text-sm">Gold: {progressData.weeklyProgress.goldEarned}</span>
              </div>
              <div className="text-xs text-muted-foreground">
                <p>Total bulan ini:</p>
                <p>XP: {progressData.monthlyStats.totalXP} | Gold: {progressData.monthlyStats.totalGold}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skill Progress */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="font-orbitron">Progress Skill</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {progressData.skillProgress.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{skill.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {skill.current}/{skill.target}
                  </span>
                </div>
                <Progress value={skill.progress} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="font-orbitron">Aktivitas Terbaru</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {progressData.recentActivities.map(activity => (
              <div key={activity.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/20">
                {getActivityIcon(activity.type)}
                <div className="flex-1">
                  <p className="font-medium text-sm">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                </div>
                <div className="flex gap-2">
                  {activity.xp > 0 && (
                    <Badge variant="outline" className="text-primary border-primary/30">
                      +{activity.xp} XP
                    </Badge>
                  )}
                  {activity.gold > 0 && (
                    <Badge variant="outline" className="text-yellow-400 border-yellow-400/30">
                      +{activity.gold} Gold
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressTracker;
