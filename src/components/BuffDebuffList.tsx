
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Brain, Zap, Flame, Star, Clock, Shield, Frown, Timer, Heart, Snowflake, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const BuffDebuffList = () => {
  const { t } = useLanguage();
  
  const [activeEffects] = useState([
    {
      id: 1,
      name: '🧠 Focused',
      type: 'buff',
      description: '+20% XP dari semua quest hari itu',
      duration: 1200,
      maxDuration: 3600,
      effect: '+20% XP',
      icon: Brain,
      color: 'text-blue-400'
    },
    {
      id: 2,
      name: '💪 Energetic',
      type: 'buff',
      description: 'Tambahan +5 XP untuk semua quest selama 3 hari',
      duration: 2400,
      maxDuration: 3600,
      effect: '+5 XP',
      icon: Zap,
      color: 'text-green-400'
    }
  ]);

  const [allBuffsDebuffs] = useState([
    // Buffs
    {
      id: 1,
      name: '🧠 Focused',
      type: 'buff',
      description: '+20% XP dari semua quest hari itu',
      effect: '+20% XP',
      icon: Brain,
      color: 'text-blue-400',
      rarity: 'common'
    },
    {
      id: 2,
      name: '💪 Energetic',
      type: 'buff',
      description: 'Tambahan +5 XP untuk semua quest selama 3 hari',
      effect: '+5 XP',
      icon: Zap,
      color: 'text-green-400',
      rarity: 'common'
    },
    {
      id: 3,
      name: '🔥 Momentum',
      type: 'buff',
      description: 'XP dari quest dilipatgandakan 1.5x selama 1 hari',
      effect: '1.5x XP',
      icon: Flame,
      color: 'text-orange-400',
      rarity: 'rare'
    },
    {
      id: 4,
      name: '🌟 Lucky Streak',
      type: 'buff',
      description: 'Gold dari reward shop diskon 50% selama 2 hari',
      effect: '50% Diskon',
      icon: Star,
      color: 'text-yellow-400',
      rarity: 'rare'
    },
    {
      id: 5,
      name: '🕒 Time Master',
      type: 'buff',
      description: 'Boleh mengubah deadline quest harian 1 kali tanpa penalti',
      effect: 'Deadline Flex',
      icon: Clock,
      color: 'text-purple-400',
      rarity: 'uncommon'
    },
    {
      id: 6,
      name: '🔒 Shielded',
      type: 'buff',
      description: 'Debuff tidak aktif selama 1 hari',
      effect: 'Debuff Immunity',
      icon: Shield,
      color: 'text-cyan-400',
      rarity: 'uncommon'
    },
    
    // Debuffs
    {
      id: 7,
      name: '😫 Fatigued',
      type: 'debuff',
      description: 'Tidak bisa ambil quest level tinggi (XP > 30)',
      effect: 'Quest Limit',
      icon: Timer,
      color: 'text-red-400',
      rarity: 'common'
    },
    {
      id: 8,
      name: '⏳ Procrastinating',
      type: 'debuff',
      description: 'Tidak bisa membuka quest baru',
      effect: 'Quest Block',
      icon: Clock,
      color: 'text-red-400',
      rarity: 'uncommon'
    },
    {
      id: 9,
      name: '😞 Demotivated',
      type: 'debuff',
      description: 'Tidak boleh ke shop selama 3 hari',
      effect: 'Shop Block',
      icon: Frown,
      color: 'text-red-400',
      rarity: 'rare'
    },
    {
      id: 10,
      name: '🚫 Blocked',
      type: 'debuff',
      description: 'XP & gold berkurang 70% selama 1 hari',
      effect: '-70% Rewards',
      icon: X,
      color: 'text-red-400',
      rarity: 'rare'
    },
    {
      id: 11,
      name: '❄️ Frozen',
      type: 'debuff',
      description: 'Tidak bisa akses quest selama 1 hari',
      effect: 'Quest Freeze',
      icon: Snowflake,
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
        <h2 className="text-3xl font-orbitron font-bold hologram-text mb-2">{t('buffs.title')}</h2>
        <p className="text-muted-foreground">{t('buffs.subtitle')}</p>
      </div>

      {/* Active Effects */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="font-orbitron">{t('buffs.active')}</CardTitle>
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
              <p>{t('buffs.none')}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* All Buffs */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="font-orbitron text-blue-400">↑ {t('buffs.list')}</CardTitle>
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
          <CardTitle className="font-orbitron text-red-400">↓ {t('buffs.debuffs')}</CardTitle>
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
