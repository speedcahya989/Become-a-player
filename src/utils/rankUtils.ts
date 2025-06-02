
export const getRankStyles = (rank: string) => {
  const normalizedRank = rank.toLowerCase().replace(/[\s-+]/g, '');
  
  const rankStyleMap: { [key: string]: { color: string; shadow: string } } = {
    // F ranks (white)
    'f': { color: 'text-white', shadow: 'drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' },
    'f-': { color: 'text-white', shadow: 'drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' },
    'f+': { color: 'text-white', shadow: 'drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' },
    
    // E ranks (green)
    'e': { color: 'text-green-400', shadow: 'drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]' },
    'e-': { color: 'text-green-400', shadow: 'drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]' },
    'e+': { color: 'text-green-400', shadow: 'drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]' },
    
    // D ranks (blue)
    'd': { color: 'text-blue-400', shadow: 'drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]' },
    'd-': { color: 'text-blue-400', shadow: 'drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]' },
    'd+': { color: 'text-blue-400', shadow: 'drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]' },
    
    // C ranks (purple)
    'c': { color: 'text-purple-400', shadow: 'drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]' },
    'c-': { color: 'text-purple-400', shadow: 'drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]' },
    'c+': { color: 'text-purple-400', shadow: 'drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]' },
    
    // B ranks (orange)
    'b': { color: 'text-orange-400', shadow: 'drop-shadow-[0_0_8px_rgba(251,146,60,0.8)]' },
    'b-': { color: 'text-orange-400', shadow: 'drop-shadow-[0_0_8px_rgba(251,146,60,0.8)]' },
    'b+': { color: 'text-orange-400', shadow: 'drop-shadow-[0_0_8px_rgba(251,146,60,0.8)]' },
    
    // A ranks (red)
    'a': { color: 'text-red-400', shadow: 'drop-shadow-[0_0_8px_rgba(248,113,113,0.8)]' },
    'a-': { color: 'text-red-400', shadow: 'drop-shadow-[0_0_8px_rgba(248,113,113,0.8)]' },
    'a+': { color: 'text-red-400', shadow: 'drop-shadow-[0_0_8px_rgba(248,113,113,0.8)]' },
    
    // S ranks (gold)
    's': { color: 'text-yellow-400', shadow: 'drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]' },
    's-': { color: 'text-yellow-400', shadow: 'drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]' },
    's+': { color: 'text-yellow-400', shadow: 'drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]' },
    
    // SS rank (black with special glow)
    'ss': { color: 'text-gray-900', shadow: 'drop-shadow-[0_0_12px_rgba(0,0,0,1)] drop-shadow-[0_0_24px_rgba(255,255,255,0.5)]' }
  };

  return rankStyleMap[normalizedRank] || { color: 'text-white', shadow: 'drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' };
};

export const getRankClass = (rank: string) => {
  const styles = getRankStyles(rank);
  return `${styles.color} ${styles.shadow} font-bold`;
};
