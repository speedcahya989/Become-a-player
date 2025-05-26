
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
      duration: 1200,
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
    }
  ]);

  const [allBuffsDebuffs] = useState([
    {
      id: 1,
      name: 'Motivasi Tinggi',
      type: 'buff',
      description: 'Meningkatkan XP yang didapat dari quest sebesar 25%',
      effect: '+25% XP Gain',
      icon: Zap,
      color: 'text-blue-400',
      rarity: 'common'
    },
    {
      id: 2,
      name: 'Fokus Mendalam',
      type: 'buff',
      description: 'Mengurangi waktu pengerjaan quest sebesar 20%',
      effect: '-20% Quest Time',
      icon: Brain,
      color: 'text-purple-400',
      rarity: 'uncommon'
    },
    {
      id: 3,
      name: 'Semangat Berapi',
      type: 'buff',
      description: 'Meningkatkan chance critical success pada quest',
      effect: '+30% Crit Chance',
      icon: Flame,
      color: 'text-orange-400',
      rarity: 'rare'
    },
    {
      id: 4,
      name: 'Pelindung Mental',
      type: 'buff',
      description: 'Mencegah debuff negatif selama 1 jam',
      effect: 'Debuff Immunity',
      icon: Shield,
      color: 'text-green-400',
      rarity: 'common'
    },
    {
      id: 5,
      name: 'Healing Aura',
      type: 'buff',
      description: 'Menghilangkan semua debuff aktif',
      effect: 'Remove All Debuffs',
      icon: Heart,
      color: 'text-pink-400',
      rarity: 'uncommon'
    },
    {
      id: 6,
      name: 'Time Freeze',
      type: 'buff',
      description: 'Quest tidak memiliki batas waktu selama 30 menit',
      effect: 'No Time Limits',
      icon: Snowflake,
      color: 'text-cyan-400',
      rarity: 'rare'
    },
    {
      id: 7,
      name: 'Kelelahan',
      type: 'debuff',
      description: 'Mengurangi gold yang didapat sebesar 15%',
      effect: '-15% Gold Gain',
      icon: Clock,
      color: 'text-red-400',
      rarity: 'common'
    },
    {
      id: 8,
      name: 'Stress Mental',
      type: 'debuff',
      description: 'Mengurangi XP yang didapat sebesar 20%',
      effect: '-20% XP Gain',
      icon: Brain,
      color: 'text-red-400',
      rarity: 'uncommon'
    },
    {
      id: 9,
      name: 'Demotivasi',
      type: 'debuff',
      description: 'Meningkatkan waktu pengerjaan quest sebesar 30%',
      effect: '+30% Quest Time',
      icon: Clock,
      color: 'text-red-400',
      rarity: 'rare'
    },
    {
      id: 10,
      name: 'Kebingungan',
      type: 'debuff',
      description: 'Mengurangi chance critical success pada quest',
      effect: '-25% Crit Chance',
      icon: Brain,
      color: 'text-red-400',
      rarity: 'common'
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

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-400';
      case 'uncommon': return 'text-green-400';
      case 'rare': return 'text-blue-400';
      case 'epic': return 'text-purple-400';
      case 'legendary': return 'text-orange-400';
      default: return 'text-gray-400';
    }
  };

  const buffs = allBuffsDebuffs.filter(item => item.type === 'buff');
  const debuffs = allBuffsDebuffs.filter(item => item.type === 'debuff');

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-orbitron font-bold hologram-text mb-2">Buff & Debuff</h2>
        <p className="text-muted-foreground">Kelola efek aktif dan pelajari semua efek yang tersedia</p>
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

      {/* All Buffs */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="font-orbitron text-blue-400">Daftar Semua Buff</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {buffs.map(buff => {
              const IconComponent = buff.icon;
              
              return (
                <div
                  key={buff.id}
                  className="p-4 rounded-lg border border-blue-500/20 bg-blue-500/5"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <IconComponent className={`w-6 h-6 ${buff.color}`} />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-orbitron font-bold">{buff.name}</h4>
                          <Badge variant="outline" className={getRarityColor(buff.rarity)}>
                            {buff.rarity.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{buff.description}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-blue-400 border-blue-400/30">
                      {buff.effect}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* All Debuffs */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="font-orbitron text-red-400">Daftar Semua Debuff</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {debuffs.map(debuff => {
              const IconComponent = debuff.icon;
              
              return (
                <div
                  key={debuff.id}
                  className="p-4 rounded-lg border border-red-500/20 bg-red-500/5"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <IconComponent className={`w-6 h-6 ${debuff.color}`} />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-orbitron font-bold">{debuff.name}</h4>
                          <Badge variant="outline" className={getRarityColor(debuff.rarity)}>
                            {debuff.rarity.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{debuff.description}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-red-400 border-red-400/30">
                      {debuff.effect}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="glass rounded-lg p-4 text-center">
        <p className="text-sm text-muted-foreground">
          Buff dapat dibeli di menu Toko • Debuff akan hilang seiring waktu atau dengan item khusus
        </p>
      </div>
    </div>
  );
};

export default BuffDebuffList;
