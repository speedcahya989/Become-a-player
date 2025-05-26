
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { Edit2, Camera } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const PlayerProfile = () => {
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
      label: "Nilai Saat Ini",
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
                <DialogTitle className="font-orbitron">Edit Profile</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="avatar">Avatar</Label>
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
                  <Label htmlFor="name">Nama</Label>
                  <Input
                    id="name"
                    value={editForm.name}
                    onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="class">Kelas</Label>
                  <Input
                    id="class"
                    value={editForm.class}
                    onChange={(e) => setEditForm(prev => ({ ...prev, class: e.target.value }))}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSaveProfile} className="flex-1">Simpan</Button>
                  <Button variant="outline" onClick={() => setIsEditingProfile(false)}>Batal</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <h2 className="text-xl font-orbitron font-bold">{playerData.name}</h2>
        <p className="text-muted-foreground">{playerData.class}</p>
        
        <div className="flex items-center justify-center gap-2 mt-2">
          <Badge variant="outline" className="font-orbitron">
            LVL {playerData.level}
          </Badge>
          <Badge 
            variant="secondary" 
            className="font-orbitron"
            style={{ boxShadow: '0 0 3px hsl(var(--primary)), 0 0 6px hsl(var(--primary))' }}
          >
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

export default PlayerProfile;
