
import React from 'react';
import { Badge } from '@/components/ui/badge';

const BuffDebuffStatus = () => {
  const activeBuffs = [
    { name: 'Focused', duration: '2h 30m', type: 'buff' },
    { name: 'Momentum', duration: '45m', type: 'buff' }
  ];

  const activeDebuffs = [
    { name: 'Fatigued', duration: '1h 15m', type: 'debuff' }
  ];

  return (
    <div className="flex items-center gap-2">
      {activeBuffs.map((buff, index) => (
        <Badge 
          key={index}
          variant="outline" 
          className="buff-glow border-blue-400/50 text-blue-300 font-orbitron"
        >
          ↑ {buff.name} ({buff.duration})
        </Badge>
      ))}
      
      {activeDebuffs.map((debuff, index) => (
        <Badge 
          key={index}
          variant="outline" 
          className="debuff-glow border-red-400/50 text-red-300 font-orbitron"
        >
          ↓ {debuff.name} ({debuff.duration})
        </Badge>
      ))}
      
      {activeBuffs.length === 0 && activeDebuffs.length === 0 && (
        <Badge variant="outline" className="text-muted-foreground font-orbitron">
          No active effects
        </Badge>
      )}
    </div>
  );
};

export default BuffDebuffStatus;
