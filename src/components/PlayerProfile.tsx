import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { Edit2, Coins } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '../contexts/LanguageContext';

const PlayerProfile = () => {
  const { t } = useLanguage();
  
  const [playerData, setPlayerData] = useState({
    name: "Player",
    class: "Self-Improver",
    level: 15,
    rank: "B+",
    xp: 2350,
    xpToNext: 3000,
    gold: 1250,
    avatar: "",
    stats: {
      STR: 18,
      DEX: 15,
      INT: 22,
      WIS: 20,
      CHA: 16
    }
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState({
    name: playerData.name,
    class: playerData.class,
    avatar: playerData.avatar
  });

  const xpPercentage = (playerData.xp / playerData.xpToNext) * 100;

  const radarData = Object.entries(playerData.stats).map(([statName, value]) => ({
    stat: statName,
    value: value,
    fullMark: 50
  }));

  const chartConfig = {
    value: {
      label: t('stats.attributes'),
      color: "hsl(var(--primary))",
    },
  };

  const handleSaveProfile = () => {
    setPlayerData(prev => ({
      ...prev,
      name: editForm.name,
      class: editForm.class,
      avatar: editForm.avatar
    }));
    setIsEditingProfile(false);
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditForm(prev => ({
          ...prev,
          avatar: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const getRankStyle = (rank: string) => {
    const rankStyles = {
      'SS': 'bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white font-black border-none shadow-[0_0_20px_rgba(255,215,0,0.8)] animate-pulse text-lg px-6 py-2',
      'S': 'bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold border-none shadow-[0_0_15px_rgba(147,51,234,0.7)] text-lg px-5 py-2',
      'A+': 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold border-none shadow-[0_0_12px_rgba(59,130,246,0.6)] text-base px-4 py-1.5',
      'A': 'bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold border-none shadow-[0_0_10px_rgba(59,130,246,0.5)] px-4 py-1.5',
      'B+': 'bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold border-none shadow-[0_0_8px_rgba(34,197,94,0.5)] px-3 py-1',
      'B': 'bg-gradient-to-r from-green-400 to-green-500 text-white font-medium border-none shadow-[0_0_6px_rgba(34,197,94,0.4)] px-3 py-1',
      'C+': 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-medium border-none shadow-[0_0_6px_rgba(245,158,11,0.4)] px-3 py-1',
      'C': 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-medium border-none shadow-[0_0_4px_rgba(245,158,11,0.3)] px-3 py-1',
      'D+': 'bg-gradient-to-r from-gray-500 to-gray-600 text-white font-normal border-none px-3 py-1',
      'D': 'bg-gradient-to-r from-gray-400 to-gray-500 text-white font-normal border-none px-3 py-1',
      'F+': 'bg-gradient-to-r from-red-400 to-red-500 text-white font-normal border-none px-3 py-1',
      'F-': 'bg-gradient-to-r from-red-600 to-red-700 text-white font-normal border-none px-3 py-1'
    };
    return rankStyles[rank] || rankStyles['F-'];
  };

  return (
    <div className="glass rounded-lg p-6 space-y-6">
      {/* Avatar & Basic Info */}
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-4">
          {playerData.avatar ? (
            <img 
              src={playerData.avatar} 
              alt="Avatar" 
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-orbitron font-black">
              {playerData.name[0]}
            </div>
          )}
          
          <Dialog open={isEditingProfile} onOpenChange={setIsEditingProfile}>
            <DialogTrigger asChild>
              <Button 
                size="sm" 
                className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full p-0"
                variant="secondary"
              >
                <Edit2 className="w-3 h-3" />
              </Button>
            </DialogTrigger>
            <DialogContent className="glass">
              <DialogHeader>
                <DialogTitle className="font-orbitron">{t('button.edit')} {t('profile.title')}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="avatar">{t('profile.avatar')}</Label>
                  <div className="flex items-center gap-4 mt-2">
                    {editForm.avatar ? (
                      <img src={editForm.avatar} alt="Preview" className="w-16 h-16 rounded-full object-cover" />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-lg font-orbitron font-black">
                        {editForm.name[0]}
                      </div>
                    )}
                    <div>
                      <Input
                        id="avatar"
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <Label htmlFor="name">{t('profile.name')}</Label>
                  <Input
                    id="name"
                    value={editForm.name}
                    onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="class">{t('profile.class')}</Label>
                  <Input
                    id="class"
                    value={editForm.class}
                    onChange={(e) => setEditForm(prev => ({ ...prev, class: e.target.value }))}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSaveProfile} className="flex-1">{t('button.save')}</Button>
                  <Button variant="outline" onClick={() => setIsEditingProfile(false)}>{t('button.cancel')}</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <h2 className="text-xl font-orbitron font-bold">{playerData.name}</h2>
        <p className="text-muted-foreground">{playerData.class}</p>
        
        <div className="flex items-center justify-center gap-2 mt-2">
          <Badge variant="outline" className="font-orbitron">
            {t('stats.level')} {playerData.level}
          </Badge>
          <Badge 
            variant="secondary" 
            className={`font-orbitron ${getRankStyle(playerData.rank)}`}
          >
            {playerData.rank}
          </Badge>
        </div>
      </div>

      {/* XP Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>{t('stats.experience')}</span>
          <span className="text-primary">{playerData.xp}/{playerData.xpToNext}</span>
        </div>
        <Progress value={xpPercentage} className="h-3" />
      </div>

      {/* Gold with Icon */}
      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-lg border border-yellow-500/30">
        <div className="flex items-center gap-2">
          <Coins className="w-5 h-5 text-yellow-400" />
          <span className="font-orbitron">{t('common.gold')}</span>
        </div>
        <span className="text-yellow-400 font-bold text-lg">{playerData.gold}</span>
      </div>

      {/* Stats Radar Chart */}
      <div className="space-y-3">
        <h3 className="font-orbitron font-bold text-center">{t('stats.attributes')}</h3>
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
                name={t('stats.value')}
                dataKey="value"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.2}
                strokeWidth={1.5}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 1, r: 2 }}
              />
              <ChartTooltip 
                content={<ChartTooltipContent />}
                formatter={(value) => [`${value}/50`, t('stats.value')]}
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
        <div className="text-xs text-muted-foreground mb-2">{t('stats.nextLevel')}</div>
        <div className="text-2xl font-orbitron font-bold hologram-text">
          {Math.round(xpPercentage)}%
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;
