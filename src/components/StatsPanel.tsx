
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const StatsPanel = () => {
  const stats = {
    STR: { current: 18, max: 50, description: "Kekuatan fisik dan daya tahan" },
    DEX: { current: 15, max: 50, description: "Kelincahan dan koordinasi" },
    INT: { current: 22, max: 50, description: "Pengetahuan dan kemampuan belajar" },
    WIS: { current: 20, max: 50, description: "Kebijaksanaan dan pengambilan keputusan" },
    CHA: { current: 16, max: 50, description: "Keterampilan sosial dan pengaruh" }
  };

  const weeklyProgress = {
    questsCompleted: 23,
    questsTarget: 35,
    xpGained: 2840,
    goldEarned: 1520,
    streakDays: 7
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
      label: "Nilai Saat Ini",
      color: "hsl(var(--primary))",
    },
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-orbitron font-bold hologram-text mb-2">Statistik</h2>
        <p className="text-muted-foreground">Ringkasan perkembangan karakter Anda</p>
      </div>

      {/* Character Stats Radar Chart */}
      <div className="glass rounded-lg p-6">
        <h3 className="text-xl font-orbitron font-bold mb-4">Atribut Karakter</h3>
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
                domain={[0, 50]} 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                className="text-muted-foreground"
              />
              <Radar
                name="Nilai"
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
                  'Nilai'
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
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
          {Object.entries(stats).map(([statName, statData]) => (
            <div key={statName} className="text-center">
              <div className="font-orbitron font-bold text-primary">{statName}</div>
              <div className="text-sm">{statData.current}/{statData.max}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Progress */}
      <div className="glass rounded-lg p-6">
        <h3 className="text-xl font-orbitron font-bold mb-4">Progress Mingguan</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
            <div className="text-center">
              <div className="text-2xl font-orbitron font-bold text-primary">
                {weeklyProgress.questsCompleted}
              </div>
              <div className="text-sm text-muted-foreground">Quest Selesai</div>
              <div className="text-xs text-muted-foreground mt-1">
                Target: {weeklyProgress.questsTarget}
              </div>
            </div>
          </div>

          <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
            <div className="text-center">
              <div className="text-2xl font-orbitron font-bold text-green-400">
                {weeklyProgress.xpGained}
              </div>
              <div className="text-sm text-muted-foreground">XP Diperoleh</div>
              <div className="text-xs text-green-400 mt-1">+12% dari minggu lalu</div>
            </div>
          </div>

          <div className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/20">
            <div className="text-center">
              <div className="text-2xl font-orbitron font-bold text-yellow-400">
                {weeklyProgress.goldEarned}
              </div>
              <div className="text-sm text-muted-foreground">Gold Diperoleh</div>
              <div className="text-xs text-yellow-400 mt-1">+8% efisiensi</div>
            </div>
          </div>

          <div className="bg-orange-500/10 rounded-lg p-4 border border-orange-500/20">
            <div className="text-center">
              <div className="text-2xl font-orbitron font-bold text-orange-400">
                {weeklyProgress.streakDays}
              </div>
              <div className="text-sm text-muted-foreground">Streak Hari</div>
              <div className="text-xs text-orange-400 mt-1">Rekor pribadi!</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;
