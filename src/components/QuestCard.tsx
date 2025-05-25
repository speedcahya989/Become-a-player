
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Star } from 'lucide-react';
import { playSound, showNotification } from '../utils/gameUtils';

interface Quest {
  id: number;
  title: string;
  description: string;
  xpReward: number;
  goldReward: number;
  timeLeft: string;
  status: 'active' | 'completed' | 'expired';
  difficulty: 'Mudah' | 'Sedang' | 'Sulit';
  statBonus: string;
}

interface QuestCardProps {
  quest: Quest;
  type: 'daily' | 'weekly' | 'main' | 'event';
}

const QuestCard: React.FC<QuestCardProps> = ({ quest, type }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Mudah': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Sedang': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Sulit': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'daily': return 'bg-blue-500/20 text-blue-400';
      case 'weekly': return 'bg-purple-500/20 text-purple-400';
      case 'main': return 'bg-orange-500/20 text-orange-400';
      case 'event': return 'bg-pink-500/20 text-pink-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'daily': return 'HARIAN';
      case 'weekly': return 'MINGGUAN';
      case 'main': return 'UTAMA';
      case 'event': return 'EVENT';
      default: return type.toUpperCase();
    }
  };

  const isCompleted = quest.status === 'completed';
  const isExpired = quest.status === 'expired';

  const handleStartQuest = () => {
    if (!isCompleted && !isExpired) {
      playSound('questStart');
      showNotification('Quest dimulai!', `Kamu telah memulai quest: ${quest.title}`);
    }
  };

  return (
    <div className={`quest-card ${isCompleted ? 'opacity-75' : ''} ${isExpired ? 'opacity-50 border-red-500/50' : ''}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <h4 className="font-orbitron font-bold text-lg">{quest.title}</h4>
            <Badge variant="outline" className={getDifficultyColor(quest.difficulty)}>
              {quest.difficulty}
            </Badge>
            <Badge variant="secondary" className={getTypeColor(type)}>
              {getTypeLabel(type)}
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm mb-2">{quest.description}</p>
          <p className="text-xs text-accent">{quest.statBonus}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-primary">{quest.xpReward} XP</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
            <span className="text-sm font-bold text-yellow-400">{quest.goldReward} Gold</span>
          </div>
        </div>
        
        {quest.timeLeft !== "Tanpa batas" && (
          <div className="flex items-center gap-1 text-sm">
            <Clock className="w-4 h-4" />
            <span className={isExpired ? 'text-red-400' : 'text-muted-foreground'}>
              {quest.timeLeft}
            </span>
          </div>
        )}
      </div>

      <Button 
        onClick={handleStartQuest}
        className={`w-full font-orbitron text-sm py-2 ${
          isCompleted 
            ? 'bg-green-600 hover:bg-green-700' 
            : isExpired 
            ? 'bg-red-600/50 cursor-not-allowed' 
            : 'bg-primary hover:bg-primary/80 neon-glow'
        }`}
        disabled={isCompleted || isExpired}
      >
        {isCompleted ? 'SELESAI' : isExpired ? 'KADALUARSA' : 'MULAI QUEST'}
      </Button>
    </div>
  );
};

export default QuestCard;
