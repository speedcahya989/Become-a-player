import React, { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Trophy, Zap, Crown, Heart, Smile, Meh, Frown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getRankColors } from '../utils/rankUtils';

const StatsPanel = () => {
  const { t } = useLanguage();
  
  const stats = {
    STR: { current: 180, max: 1000, description: t('stats.str.description') },
    DEX: { current: 150, max: 1000, description: t('stats.dex.description') },
    INT: { current: 220, max: 1000, description: t('stats.int.description') },
    WIS: { current: 200, max: 1000, description: t('stats.wis.description') },
    CHA: { current: 160, max: 1000, description: t('stats.cha.description') },
    CON: { current: 140, max: 1000, description: t('stats.con.description') }
  };

  const playerData = {
    experience: 12450,
    experienceToNext: 15000,
    level: 15,
    rank: 'B+',
    rankProgress: 65
  };

  const weeklyProgress = {
    questsCompleted: 23,
    questsTarget: 35,
    xpGained: 2840,
    goldEarned: 1520,
    streakDays: 7
  };

  const [moodData] = useState({
    currentMood: 'happy',
    moodHistory: [
      { day: t('common.days.mon'), mood: 'happy', value: 8 },
      { day: t('common.days.tue'), mood: 'neutral', value: 6 },
      { day: t('common.days.wed'), mood: 'happy', value: 9 },
      { day: t('common.days.thu'), mood: 'sad', value: 4 },
      { day: t('common.days.fri'), mood: 'happy', value: 8 },
      { day: t('common.days.sat'), mood: 'happy', value: 9 },
      { day: t('common.days.sun'), mood: 'neutral', value: 7 }
    ]
  });

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'happy': return <Smile className="w-6 h-6 text-green-400" />;
      case 'neutral': return <Meh className="w-6 h-6 text-yellow-400" />;
      case 'sad': return <Frown className="w-6 h-6 text-red-400" />;
      default: return <Meh className="w-6 h-6 text-gray-400" />;
    }
  };

  // Prepare data for radar chart
  const radarData = Object.entries(stats).map(([statName, statData]) => ({
    stat: statName,
    value: statData.current,
    fullMark: statData.max,
    description: statData.description
  }));

  const chartConfig = {
    value: {
      label: t('stats.currentValue'),
      color: "hsl(var(--primary))",
    },
  };

  const { backgroundColor, textColor, shadow } = getRankColors(playerData.rank);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-orbitron font-bold hologram-text mb-2">{t('stats.title')}</h2>
        <p className="text-muted-foreground">{t('stats.subtitle')}</p>
      </div>

      {/* Player Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass border-primary/30">
          <CardContent className="p-4 text-center">
            <Zap className="w-8 h-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-orbitron font-bold text-primary">
              {playerData.experience.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">{t('stats.experience')}</div>
            <Progress 
              value={(playerData.experience / playerData.experienceToNext) * 100} 
              className="h-2 mt-2" 
            />
            <div className="text-xs text-muted-foreground mt-1">
              {(playerData.experienceToNext - playerData.experience).toLocaleString()} {t('stats.toNextLevel')}
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-blue-500/30">
          <CardContent className="p-4 text-center">
            <Trophy className="w-8 h-8 mx-auto mb-2 text-blue-400" />
            <div className="text-2xl font-orbitron font-bold text-blue-400">
              {playerData.level}
            </div>
            <div className="text-sm text-muted-foreground">{t('stats.level')}</div>
          </CardContent>
        </Card>

        <Card className="glass border-purple-500/30">
          <CardContent className="p-4 text-center">
            <Crown className="w-8 h-8 mx-auto mb-2 text-purple-400" />
            <Badge 
              variant="outline" 
              className={`font-orbitron font-bold text-2xl px-6 py-3 border-2 ${backgroundColor} ${textColor} ${shadow} transform hover:scale-105 transition-transform`}
            >
              {playerData.rank}
            </Badge>
            <div className="text-sm text-muted-foreground mt-2">{t('stats.rank')}</div>
            <Progress value={playerData.rankProgress} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card className="glass border-green-500/30">
          <CardContent className="p-4 text-center">
            <Heart className="w-8 h-8 mx-auto mb-2 text-pink-400" />
            <div className="flex items-center justify-center gap-2 mb-2">
              {getMoodIcon(moodData.currentMood)}
            </div>
            <div className="text-sm text-muted-foreground">{t('stats.mood')}</div>
          </CardContent>
        </Card>
      </div>

      {/* Character Stats Radar Chart */}
      <div className="glass rounded-lg p-6">
        <h3 className="text-xl font-orbitron font-bold mb-4">{t('stats.attributes')}</h3>
        <div className="h-80">
          <ChartContainer config={chartConfig}>
            <RadarChart data={radarData}>
              <PolarGrid className="stroke-border/30" />
              <PolarAngleAxis 
                dataKey="stat" 
                className="text-foreground font-orbitron font-bold text-sm"
                tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
              />
              <PolarRadiusAxis 
                angle={0} 
                domain={[0, 1000]} 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                className="text-muted-foreground"
              />
              <Radar
                name={t('stats.value')}
                dataKey="value"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.3}
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
              />
              <ChartTooltip 
                content={<ChartTooltipContent />}
                formatter={(value, name, props) => [
                  `${value}/${props.payload.fullMark}`,
                  t('stats.value')
                ]}
                labelFormatter={(label, payload) => {
                  const item = payload?.[0]?.payload;
                  return item ? (
                    <div>
                      <div className="font-orbitron font-bold">{label}</div>
                      <div className="text-xs text-muted-foreground">{item.description}</div>
                    </div>
                  ) : label;
                }}
              />
            </RadarChart>
          </ChartContainer>
        </div>
        
        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-4">
          {Object.entries(stats).map(([statName, statData]) => (
            <div key={statName} className="text-center">
              <div className="font-orbitron font-bold text-primary">{statName}</div>
              <div className="text-sm">{statData.current}/{statData.max}</div>
              <Progress value={(statData.current / statData.max) * 100} className="h-1 mt-1" />
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Progress */}
      <div className="glass rounded-lg p-6">
        <h3 className="text-xl font-orbitron font-bold mb-4">{t('stats.weekly')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
            <div className="text-center">
              <div className="text-2xl font-orbitron font-bold text-primary">
                {weeklyProgress.questsCompleted}
              </div>
              <div className="text-sm text-muted-foreground">{t('stats.questsCompleted')}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {t('stats.target')}: {weeklyProgress.questsTarget}
              </div>
            </div>
          </div>

          <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
            <div className="text-center">
              <div className="text-2xl font-orbitron font-bold text-green-400">
                {weeklyProgress.xpGained}
              </div>
              <div className="text-sm text-muted-foreground">{t('stats.xpGained')}</div>
              <div className="text-xs text-green-400 mt-1">{t('stats.weeklyIncrease')}</div>
            </div>
          </div>

          <div className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/20">
            <div className="text-center">
              <div className="text-2xl font-orbitron font-bold text-yellow-400">
                {weeklyProgress.goldEarned}
              </div>
              <div className="text-sm text-muted-foreground">{t('stats.goldEarned')}</div>
              <div className="text-xs text-yellow-400 mt-1">{t('stats.efficiency')}</div>
            </div>
          </div>

          <div className="bg-orange-500/10 rounded-lg p-4 border border-orange-500/20">
            <div className="text-center">
              <div className="text-2xl font-orbitron font-bold text-orange-400">
                {weeklyProgress.streakDays}
              </div>
              <div className="text-sm text-muted-foreground">{t('stats.streakDays')}</div>
              <div className="text-xs text-orange-400 mt-1">{t('stats.personalRecord')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mood Tracker */}
      <div className="glass rounded-lg p-6">
        <h3 className="text-xl font-orbitron font-bold mb-4">{t('stats.mood')}</h3>
        <div className="grid grid-cols-7 gap-2">
          {moodData.moodHistory.map((entry, index) => (
            <div key={index} className="text-center p-3 rounded-lg bg-muted/10 border border-muted/20">
              <div className="text-xs text-muted-foreground mb-2">{entry.day}</div>
              <div className="flex justify-center mb-2">
                {getMoodIcon(entry.mood)}
              </div>
              <div className="text-xs font-orbitron">{entry.value}/10</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;
