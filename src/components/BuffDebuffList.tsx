
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Zap, Shield, Flame, Snowflake, Heart, Brain, Clock, X } from 'lucide-react';

const BuffDebuffList = () => {
  const [activeEffects] = useState([
    {
      id: 1,
      name: 'Motivasi Tinggi',
      type: 'buff',
      description: 'Meningkatkan XP yang didapat dari quest sebesar 25%',
      duration: 1200, // detik
      maxDuration: 3600,
      effect: '+25% XP Gain',
      icon: Zap,
      color: 'text-blue-400'
    },
    {
      id: 2,
      name: 'Fokus Mendalam',
      type: 'buff',
      description: 'Mengurangi waktu pengerjaan quest sebesar 20%',
      duration: 2400,
      maxDuration: 3600,
      effect: '-20% Quest Time',
      icon: Brain,
      color: 'text-purple-400'
    },
    {
      id: 3,
      name: 'Kelelahan',
      type: 'debuff',
      description: 'Mengurangi gold yang didapat sebesar 15%',
      duration: 800,
      maxDuration: 1800,
      effect: '-15% Gold Gain',
      icon: Clock,
      color: 'text-red-400'
    },
    {
      id: 4,
      name: 'Semangat Berapi',
      type: 'buff',
      description: 'Meningkatkan chance critical success pada quest',
      duration: 900,
      maxDuration: 1800,
      effect: '+30% Crit Chance',
      icon: Flame,
      color: 'text-orange-400'
    }
  ]);

  const [availableEffects] = useState([
    {
      id: 5,
      name: 'Pelindung Mental',
      type: 'buff',
      description: 'Mencegah debuff negatif selama 1 jam',
      cost: 50,
      duration: 3600,
      effect: 'Debuff Immunity',
      icon: Shield,
      color: 'text-green-400'
    },
    {
      id: 6,
      name: 'Healing Aura',
      type: 'buff',
      description: 'Menghilangkan semua debuff aktif',
      cost: 75,
      duration: 0,
      effect: 'Remove All Debuffs',
      icon: Heart,
      color: 'text-pink-400'
    },
    {
      id: 7,
      name: 'Time Freeze',
      type: 'buff',
      description: 'Quest tidak memiliki batas waktu selama 30 menit',
      cost: 100,
      duration: 1800,
      effect: 'No Time Limits',
      icon: Snowflake,
      color: 'text-cyan-400'
    }
  ]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}j ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  const getEffectBorderColor = (type: string) => {
    return type === 'buff' ? 'border-blue-500/30' : 'border-red-500/30';
  };

  const getEffectBgColor = (type: string) => {
    return type === 'buff' ? 'bg-blue-500/10' : 'bg-red-500/10';
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-orbitron font-bold hologram-text mb-2">Buff & Debuff</h2>
        <p className="text-muted-foreground">Kelola efek aktif pada karakter Anda</p>
      </div>

      {/* Active Effects */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="font-orbitron">Efek Aktif</CardTitle>
        </CardHeader>
        <CardContent>
          {activeEffects.length > 0 ? (
            <div className="grid gap-4">
              {activeEffects.map(effect => {
                const IconComponent = effect.icon;
                const progressPercentage = (effect.duration / effect.maxDuration) * 100;
                
                return (
                  <div
                    key={effect.id}
                    className={`p-4 rounded-lg border ${getEffectBorderColor(effect.type)} ${getEffectBgColor(effect.type)}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <IconComponent className={`w-6 h-6 ${effect.color}`} />
                        <div>
                          <h4 className="font-orbitron font-bold">{effect.name}</h4>
                          <p className="text-sm text-muted-foreground">{effect.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant="outline" 
                          className={effect.type === 'buff' ? 'text-blue-400 border-blue-400/30' : 'text-red-400 border-red-400/30'}
                        >
                          {effect.effect}
                        </Badge>
                        <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Sisa waktu: {formatTime(effect.duration)}</span>
                        <span>{Math.round(progressPercentage)}%</span>
                      </div>
                      <Progress value={progressPercentage} className="h-2" />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>Tidak ada efek aktif saat ini</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Available Buffs */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="font-orbitron">Buff Tersedia</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {availableEffects.map(effect => {
              const IconComponent = effect.icon;
              
              return (
                <div
                  key={effect.id}
                  className="p-4 rounded-lg border border-border bg-card/20"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <IconComponent className={`w-6 h-6 ${effect.color}`} />
                      <div>
                        <h4 className="font-orbitron font-bold">{effect.name}</h4>
                        <p className="text-sm text-muted-foreground">{effect.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-green-400 border-green-400/30">
                        {effect.effect}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      {effect.duration > 0 ? `Durasi: ${formatTime(effect.duration)}` : 'Efek instant'}
                    </div>
                    <Button size="sm" className="font-orbitron">
                      Beli ({effect.cost} Gold)
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BuffDebuffList;
