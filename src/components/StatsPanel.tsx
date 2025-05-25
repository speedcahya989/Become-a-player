
import React from 'react';
import { Progress } from '@/components/ui/progress';

const StatsPanel = () => {
  const stats = {
    STR: { current: 18, max: 50, description: "Physical strength and endurance" },
    DEX: { current: 15, max: 50, description: "Agility and coordination" },
    INT: { current: 22, max: 50, description: "Knowledge and learning ability" },
    WIS: { current: 20, max: 50, description: "Wisdom and decision making" },
    CHA: { current: 16, max: 50, description: "Social skills and influence" }
  };

  const weeklyProgress = {
    questsCompleted: 23,
    questsTarget: 35,
    xpGained: 2840,
    goldEarned: 1520,
    streakDays: 7
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-orbitron font-bold hologram-text mb-2">Statistics</h2>
        <p className="text-muted-foreground">Your character development overview</p>
      </div>

      {/* Character Stats */}
      <div className="glass rounded-lg p-6">
        <h3 className="text-xl font-orbitron font-bold mb-4">Character Attributes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(stats).map(([statName, statData]) => (
            <div key={statName} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-orbitron font-bold">{statName}</span>
                <span className="text-primary font-bold">{statData.current}/{statData.max}</span>
              </div>
              <Progress value={(statData.current / statData.max) * 100} className="h-2" />
              <p className="text-xs text-muted-foreground">{statData.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Progress */}
      <div className="glass rounded-lg p-6">
        <h3 className="text-xl font-orbitron font-bold mb-4">Weekly Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
            <div className="text-center">
              <div className="text-2xl font-orbitron font-bold text-primary">
                {weeklyProgress.questsCompleted}
              </div>
              <div className="text-sm text-muted-foreground">Quests Done</div>
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
              <div className="text-sm text-muted-foreground">XP Gained</div>
              <div className="text-xs text-green-400 mt-1">+12% from last week</div>
            </div>
          </div>

          <div className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/20">
            <div className="text-center">
              <div className="text-2xl font-orbitron font-bold text-yellow-400">
                {weeklyProgress.goldEarned}
              </div>
              <div className="text-sm text-muted-foreground">Gold Earned</div>
              <div className="text-xs text-yellow-400 mt-1">+8% efficiency</div>
            </div>
          </div>

          <div className="bg-orange-500/10 rounded-lg p-4 border border-orange-500/20">
            <div className="text-center">
              <div className="text-2xl font-orbitron font-bold text-orange-400">
                {weeklyProgress.streakDays}
              </div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
              <div className="text-xs text-orange-400 mt-1">Personal best!</div>
            </div>
          </div>
        </div>
      </div>

      {/* Radar Chart Placeholder */}
      <div className="glass rounded-lg p-6">
        <h3 className="text-xl font-orbitron font-bold mb-4">Skill Distribution</h3>
        <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
          <div className="text-center">
            <div className="text-4xl mb-2">📊</div>
            <p className="text-muted-foreground">Radar Chart Coming Soon</p>
            <p className="text-xs text-muted-foreground mt-1">
              Visual representation of your stat balance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;
