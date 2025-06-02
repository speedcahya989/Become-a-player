
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';

const StatsPanel = () => {
  const { t } = useLanguage();

  const playerStats = {
    level: 15,
    rank: "B+",
    totalXP: 8500,
    questsCompleted: 127,
    averageDaily: 85,
    streak: 12,
    stats: {
      STR: 180,
      DEX: 150,
      INT: 220,
      WIS: 200,
      CHA: 160
    }
  };

  const weeklyData = [
    { day: 'Sen', xp: 120, quests: 3 },
    { day: 'Sel', xp: 180, quests: 4 },
    { day: 'Rab', xp: 90, quests: 2 },
    { day: 'Kam', xp: 210, quests: 5 },
    { day: 'Jum', xp: 150, quests: 3 },
    { day: 'Sab', xp: 200, quests: 4 },
    { day: 'Min', xp: 170, quests: 4 }
  ];

  const chartConfig = {
    xp: {
      label: 'XP',
      color: "hsl(var(--primary))",
    },
    quests: {
      label: 'Quest',
      color: "hsl(var(--accent))",
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-orbitron font-bold hologram-text mb-2">{t('stats.title')}</h2>
        <p className="text-muted-foreground">{t('stats.subtitle')}</p>
      </div>

      {/* Player Level & Rank */}
      <div className="glass rounded-lg p-6">
        <div className="flex items-center justify-center gap-4 mb-6">
          <Badge variant="outline" className="font-orbitron text-lg px-4 py-2">
            {t('stats.level')} {playerStats.level}
          </Badge>
          <Badge variant="secondary" className="font-orbitron text-lg px-4 py-2">
            {playerStats.rank}
          </Badge>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 glass rounded-lg">
            <div className="text-2xl font-orbitron font-bold text-primary">{playerStats.totalXP.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">{t('stats.totalXP')}</div>
          </div>
          <div className="text-center p-4 glass rounded-lg">
            <div className="text-2xl font-orbitron font-bold text-green-400">{playerStats.questsCompleted}</div>
            <div className="text-sm text-muted-foreground">{t('stats.questsCompleted')}</div>
          </div>
          <div className="text-center p-4 glass rounded-lg">
            <div className="text-2xl font-orbitron font-bold text-yellow-400">{playerStats.averageDaily}</div>
            <div className="text-sm text-muted-foreground">{t('stats.averageDaily')}</div>
          </div>
          <div className="text-center p-4 glass rounded-lg">
            <div className="text-2xl font-orbitron font-bold text-orange-400">{playerStats.streak}</div>
            <div className="text-sm text-muted-foreground">{t('stats.streak')}</div>
          </div>
        </div>

        {/* Attributes */}
        <div className="space-y-4">
          <h3 className="font-orbitron font-bold text-center mb-4">{t('stats.attributes')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(playerStats.stats).map(([statName, value]) => (
              <div key={statName} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-orbitron font-bold">{statName}</span>
                  <span className="text-primary font-bold">{value}/50</span>
                </div>
                <Progress value={(value / 50) * 100} className="h-2" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Progress Chart */}
      <div className="glass rounded-lg p-6">
        <h3 className="font-orbitron font-bold mb-4">{t('stats.weeklyProgress')}</h3>
        <div className="h-64">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border/20" />
                <XAxis 
                  dataKey="day" 
                  className="text-muted-foreground font-orbitron"
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                />
                <YAxis 
                  className="text-muted-foreground font-orbitron"
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="xp" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>

      {/* Quest Completion Chart */}
      <div className="glass rounded-lg p-6">
        <h3 className="font-orbitron font-bold mb-4">{t('stats.questCompletion')}</h3>
        <div className="h-64">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border/20" />
                <XAxis 
                  dataKey="day" 
                  className="text-muted-foreground font-orbitron"
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                />
                <YAxis 
                  className="text-muted-foreground font-orbitron"
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar 
                  dataKey="quests" 
                  fill="hsl(var(--accent))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;
