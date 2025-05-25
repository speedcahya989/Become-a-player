
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const CharacterProfile = () => {
  const playerData = {
    name: "Player",
    class: "Self-Improver",
    level: 15,
    rank: "B+",
    xp: 2350,
    xpToNext: 3000,
    gold: 1250,
    stats: {
      STR: 18,
      DEX: 15,
      INT: 22,
      WIS: 20,
      CHA: 16
    }
  };

  const xpPercentage = (playerData.xp / playerData.xpToNext) * 100;

  // Prepare data for radar chart
  const radarData = Object.entries(playerData.stats).map(([statName, value]) => ({
    stat: statName,
    value: value,
    fullMark: 50
  }));

  const chartConfig = {
    value: {
      label: "Nilai Saat Ini",
      color: "hsl(var(--primary))",
    },
  };

  return (
    <div className="glass rounded-lg p-6 space-y-6">
      {/* Avatar & Basic Info */}
      <div className="text-center">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-orbitron font-black">
          {playerData.name[0]}
        </div>
        <h2 className="text-xl font-orbitron font-bold">{playerData.name}</h2>
        <p className="text-muted-foreground">{playerData.class}</p>
        
        <div className="flex items-center justify-center gap-2 mt-2">
          <Badge variant="outline" className="font-orbitron">
            LVL {playerData.level}
          </Badge>
          <Badge variant="secondary" className="font-orbitron neon-glow">
            {playerData.rank}
          </Badge>
        </div>
      </div>

      {/* XP Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Experience</span>
          <span className="text-primary">{playerData.xp}/{playerData.xpToNext}</span>
        </div>
        <Progress value={xpPercentage} className="h-3" />
      </div>

      {/* Gold */}
      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-lg border border-yellow-500/30">
        <span className="font-orbitron">Gold</span>
        <span className="text-yellow-400 font-bold text-lg">{playerData.gold}</span>
      </div>

      {/* Stats Radar Chart */}
      <div className="space-y-3">
        <h3 className="font-orbitron font-bold text-center">Statistik Karakter</h3>
        <div className="h-48">
          <ChartContainer config={chartConfig}>
            <RadarChart data={radarData}>
              <PolarGrid className="stroke-border/20" />
              <PolarAngleAxis 
                dataKey="stat" 
                className="text-foreground font-orbitron font-bold text-xs"
                tick={{ fill: 'hsl(var(--foreground))', fontSize: 10 }}
              />
              <PolarRadiusAxis 
                angle={0} 
                domain={[0, 50]} 
                tick={false}
                className="text-muted-foreground"
              />
              <Radar
                name="Nilai"
                dataKey="value"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.2}
                strokeWidth={1.5}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 1, r: 2 }}
              />
              <ChartTooltip 
                content={<ChartTooltipContent />}
                formatter={(value) => [`${value}/50`, 'Nilai']}
              />
            </RadarChart>
          </ChartContainer>
        </div>
        
        {/* Stats Summary - Compact */}
        <div className="grid grid-cols-5 gap-1 text-xs">
          {Object.entries(playerData.stats).map(([statName, value]) => (
            <div key={statName} className="text-center">
              <div className="font-orbitron font-bold text-primary text-xs">{statName}</div>
              <div className="text-xs">{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Level Progress Indicator */}
      <div className="text-center">
        <div className="text-xs text-muted-foreground mb-2">Progress Level Berikutnya</div>
        <div className="text-2xl font-orbitron font-bold hologram-text">
          {Math.round(xpPercentage)}%
        </div>
      </div>
    </div>
  );
};

export default CharacterProfile;
