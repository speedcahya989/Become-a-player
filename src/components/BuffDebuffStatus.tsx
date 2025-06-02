
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Info, TrendingUp, Zap, TrendingDown, Frown } from 'lucide-react';

const BuffDebuffStatus = () => {
  const activeBuffs = [
    { 
      name: 'Fokus', 
      duration: '2j 30m', 
      type: 'buff',
      description: 'Meningkatkan XP yang didapat dari quest sebesar 20%',
      effect: '+20% XP',
      icon: TrendingUp
    },
    { 
      name: 'Momentum', 
      duration: '45m', 
      type: 'buff',
      description: 'Meningkatkan kecepatan penyelesaian quest',
      effect: '+15% Kecepatan',
      icon: Zap
    }
  ];

  const activeDebuffs = [
    { 
      name: 'Lelah', 
      duration: '1j 15m', 
      type: 'debuff',
      description: 'Mengurangi XP yang didapat dari quest sebesar 10%',
      effect: '-10% XP',
      icon: Frown
    }
  ];

  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {activeBuffs.map((buff, index) => {
        const IconComponent = buff.icon;
        return (
          <Badge 
            key={index}
            variant="outline" 
            className="border-blue-400/50 text-blue-300 font-orbitron text-xs flex items-center gap-1"
            style={{ boxShadow: '0 0 3px rgba(59, 130, 246, 0.5), 0 0 6px rgba(59, 130, 246, 0.3)' }}
          >
            <IconComponent className="w-3 h-3" />
            {buff.name} ({buff.duration})
          </Badge>
        );
      })}
      
      {activeDebuffs.map((debuff, index) => {
        const IconComponent = debuff.icon;
        return (
          <Badge 
            key={index}
            variant="outline" 
            className="border-red-400/50 text-red-300 font-orbitron text-xs flex items-center gap-1"
            style={{ boxShadow: '0 0 3px rgba(239, 68, 68, 0.5), 0 0 6px rgba(239, 68, 68, 0.3)' }}
          >
            <IconComponent className="w-3 h-3" />
            {debuff.name} ({debuff.duration})
          </Badge>
        );
      })}
      
      {(activeBuffs.length > 0 || activeDebuffs.length > 0) && (
        <Dialog open={showDetails} onOpenChange={setShowDetails}>
          <DialogTrigger asChild>
            <Badge variant="outline" className="text-muted-foreground font-orbitron text-xs cursor-pointer hover:bg-muted/20">
              <Info className="w-3 h-3 mr-1" />
              Detail
            </Badge>
          </DialogTrigger>
          <DialogContent className="glass">
            <DialogHeader>
              <DialogTitle className="font-orbitron">Detail Buff & Debuff</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {activeBuffs.length > 0 && (
                <div>
                  <h4 className="font-orbitron font-bold text-blue-400 mb-2">Buff Aktif</h4>
                  {activeBuffs.map((buff, index) => {
                    const IconComponent = buff.icon;
                    return (
                      <div key={index} className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20 mb-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-orbitron font-bold text-blue-300 flex items-center gap-2">
                            <IconComponent className="w-4 h-4" />
                            {buff.name}
                          </span>
                          <span className="text-sm text-blue-400">{buff.effect}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{buff.description}</p>
                        <p className="text-xs text-blue-400 mt-1">Sisa: {buff.duration}</p>
                      </div>
                    );
                  })}
                </div>
              )}
              
              {activeDebuffs.length > 0 && (
                <div>
                  <h4 className="font-orbitron font-bold text-red-400 mb-2">Debuff Aktif</h4>
                  {activeDebuffs.map((debuff, index) => {
                    const IconComponent = debuff.icon;
                    return (
                      <div key={index} className="p-3 bg-red-500/10 rounded-lg border border-red-500/20 mb-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-orbitron font-bold text-red-300 flex items-center gap-2">
                            <IconComponent className="w-4 h-4" />
                            {debuff.name}
                          </span>
                          <span className="text-sm text-red-400">{debuff.effect}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{debuff.description}</p>
                        <p className="text-xs text-red-400 mt-1">Sisa: {debuff.duration}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
      
      {activeBuffs.length === 0 && activeDebuffs.length === 0 && (
        <Badge variant="outline" className="text-muted-foreground font-orbitron text-xs">
          Tidak ada efek aktif
        </Badge>
      )}
    </div>
  );
};

export default BuffDebuffStatus;
