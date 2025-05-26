
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Star, Play, Pause, Square } from 'lucide-react';
import { playSound, showNotification } from '../utils/gameUtils';

interface Quest {
  id: number;
  title: string;
  description: string;
  xpReward: number;
  goldReward: number;
  timeLeft: string;
  status: 'active' | 'completed' | 'expired' | 'in-progress';
  difficulty: 'Mudah' | 'Sedang' | 'Sulit';
  statBonus: string;
  duration?: number; // in minutes
}

interface QuestCardProps {
  quest: Quest;
  type: 'daily' | 'weekly' | 'main' | 'event';
}

const QuestCard: React.FC<QuestCardProps> = ({ quest, type }) => {
  const [questStatus, setQuestStatus] = useState(quest.status);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer => {
          if (timer <= 1) {
            setIsRunning(false);
            setQuestStatus('completed');
            playSound('questComplete');
            showNotification('Quest Selesai!', `Kamu telah menyelesaikan: ${quest.title}`);
            return 0;
          }
          return timer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timer, quest.title]);

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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartQuest = () => {
    if (questStatus === 'active') {
      setTimer((quest.duration || 30) * 60); // Convert minutes to seconds
      setIsRunning(true);
      setQuestStatus('in-progress');
      playSound('questStart');
      showNotification('Quest dimulai!', `Timer dimulai untuk: ${quest.title}`);
    }
  };

  const handlePauseQuest = () => {
    setIsRunning(!isRunning);
    playSound('buttonClick');
  };

  const handleStopQuest = () => {
    setIsRunning(false);
    setTimer(0);
    setQuestStatus('active');
    playSound('buttonClick');
  };

  const isCompleted = questStatus === 'completed';
  const isExpired = questStatus === 'expired';
  const isInProgress = questStatus === 'in-progress';

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

      {/* Timer Display */}
      {isInProgress && (
        <div className="mb-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
          <div className="flex items-center justify-between">
            <span className="text-sm font-orbitron">Timer:</span>
            <span className="text-xl font-orbitron font-bold text-primary">
              {formatTime(timer)}
            </span>
          </div>
          <div className="flex gap-2 mt-2">
            <Button size="sm" variant="outline" onClick={handlePauseQuest}>
              {isRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            </Button>
            <Button size="sm" variant="outline" onClick={handleStopQuest}>
              <Square className="w-3 h-3" />
            </Button>
          </div>
        </div>
      )}

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
        className={`w-full font-orbitron text-xs py-1.5 transition-all ${
          isCompleted 
            ? 'bg-green-600 hover:bg-green-700' 
            : isExpired 
            ? 'bg-red-600/50 cursor-not-allowed' 
            : isInProgress
            ? 'bg-blue-600 hover:bg-blue-700'
            : 'bg-primary hover:bg-primary/80'
        }`}
        style={{ boxShadow: isCompleted || isExpired || isInProgress ? 'none' : '0 0 4px hsl(var(--primary)), 0 0 8px hsl(var(--primary))' }}
        disabled={isCompleted || isExpired || isInProgress}
        size="sm"
      >
        {isCompleted ? 'SELESAI' : isExpired ? 'KADALUARSA' : isInProgress ? 'BERJALAN' : 'MULAI'}
      </Button>
    </div>
  );
};

export default QuestCard;
