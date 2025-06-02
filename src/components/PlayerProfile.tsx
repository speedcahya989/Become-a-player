
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '../contexts/LanguageContext';
import { getRankColors } from '../utils/rankUtils';
import BuffDebuffStatus from './BuffDebuffStatus';

const PlayerProfile = () => {
  const { t } = useLanguage();

  const player = {
    name: "Player",
    level: 15,
    rank: "B+",
    currentXP: 750,
    nextLevelXP: 1000,
    gold: 1250,
    avatar: "👨‍💻",
    stats: {
      STR: 25,
      DEX: 30,
      INT: 35,
      WIS: 28,
      CHA: 22
    }
  };

  const { backgroundColor, textColor, shadow } = getRankColors(player.rank);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-orbitron font-bold hologram-text mb-2">{t('profile.title')}</h2>
        <p className="text-muted-foreground">{t('profile.subtitle')}</p>
      </div>

      <div className="glass rounded-lg p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Avatar */}
          <div className="text-center">
            <div 
              className="text-8xl mb-2 w-32 h-32 flex items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary/30 animate-subtle-glow-rank"
              style={{ 
                boxShadow: `0 0 20px rgba(6, 182, 212, 0.2), inset 0 0 20px rgba(6, 182, 212, 0.1)` 
              }}
            >
              {player.avatar}
            </div>
            <h3 className="text-2xl font-orbitron font-bold">{player.name}</h3>
            <Badge variant="outline" className="font-orbitron text-lg px-4 py-2 mt-2">
              {t('profile.level')} {player.level}
            </Badge>
            <Badge 
              variant="secondary" 
              className={`font-orbitron font-bold text-3xl px-8 py-4 border-3 mt-2 ${backgroundColor} ${textColor} animate-glow-text-slow`}
              style={{ 
                boxShadow: `0 0 15px ${getRankColors(player.rank).shadowColor}, inset 0 0 8px ${getRankColors(player.rank).shadowColor}` 
              }}
            >
              {player.rank}
            </Badge>
          </div>

          {/* Stats & Info */}
          <div className="flex-1 w-full">
            {/* XP Progress */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-orbitron font-bold">{t('profile.experience')}</span>
                <span className="text-primary font-bold">{player.currentXP}/{player.nextLevelXP} XP</span>
              </div>
              <Progress 
                value={(player.currentXP / player.nextLevelXP) * 100} 
                className="h-3 animate-subtle-glow-xp" 
              />
            </div>

            {/* Gold */}
            <div className="mb-6 text-center">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 px-4 py-2 rounded-lg border border-yellow-400/30">
                <span className="text-2xl">🪙</span>
                <span className="font-orbitron font-bold text-yellow-400 text-xl">{player.gold.toLocaleString()}</span>
                <span className="text-yellow-400/80">Gold</span>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-3">
              <h4 className="font-orbitron font-bold text-center">{t('profile.attributes')}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(player.stats).map(([statName, value]) => (
                  <div key={statName} className="space-y-1">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-orbitron font-bold">{statName}</span>
                      <span className="text-primary font-bold">{value}/1000</span>
                    </div>
                    <Progress value={(value / 1000) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Buff/Debuff Status */}
        <div className="mt-6 pt-6 border-t border-border/50">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-orbitron font-bold mb-2">{t('profile.status')}</h4>
              <BuffDebuffStatus />
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">{t('profile.statusDesc')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;
