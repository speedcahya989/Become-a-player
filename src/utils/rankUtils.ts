
export const getRankColors = (rank: string) => {
  const lowerRank = rank.toLowerCase();
  
  if (lowerRank.includes('f')) {
    return {
      backgroundColor: 'bg-white border-white',
      textColor: 'text-black',
      shadow: 'shadow-lg shadow-white/20',
      shadowColor: 'rgba(255, 255, 255, 0.4)'
    };
  } else if (lowerRank.includes('e')) {
    return {
      backgroundColor: 'bg-green-500 border-green-400',
      textColor: 'text-white',
      shadow: 'shadow-lg shadow-green-500/40',
      shadowColor: 'rgba(34, 197, 94, 0.4)'
    };
  } else if (lowerRank.includes('d')) {
    return {
      backgroundColor: 'bg-blue-500 border-blue-400',
      textColor: 'text-white',
      shadow: 'shadow-lg shadow-blue-500/40',
      shadowColor: 'rgba(59, 130, 246, 0.4)'
    };
  } else if (lowerRank.includes('c')) {
    return {
      backgroundColor: 'bg-purple-500 border-purple-400',
      textColor: 'text-white',
      shadow: 'shadow-lg shadow-purple-500/40',
      shadowColor: 'rgba(168, 85, 247, 0.4)'
    };
  } else if (lowerRank.includes('b')) {
    return {
      backgroundColor: 'bg-orange-500 border-orange-400',
      textColor: 'text-white',
      shadow: 'shadow-lg shadow-orange-500/40',
      shadowColor: 'rgba(249, 115, 22, 0.4)'
    };
  } else if (lowerRank.includes('a')) {
    return {
      backgroundColor: 'bg-red-500 border-red-400',
      textColor: 'text-white',
      shadow: 'shadow-lg shadow-red-500/40',
      shadowColor: 'rgba(239, 68, 68, 0.4)'
    };
  } else if (lowerRank.includes('s') && !lowerRank.includes('ss')) {
    return {
      backgroundColor: 'bg-gradient-to-r from-yellow-400 to-yellow-600 border-yellow-400',
      textColor: 'text-black',
      shadow: 'shadow-lg shadow-yellow-500/50',
      shadowColor: 'rgba(251, 191, 36, 0.5)'
    };
  } else if (lowerRank.includes('ss')) {
    return {
      backgroundColor: 'bg-black border-gray-700',
      textColor: 'text-white',
      shadow: 'shadow-lg shadow-black/60',
      shadowColor: 'rgba(0, 0, 0, 0.6)'
    };
  }
  
  // Default fallback
  return {
    backgroundColor: 'bg-gray-500 border-gray-400',
    textColor: 'text-white',
    shadow: 'shadow-lg shadow-gray-500/40',
    shadowColor: 'rgba(107, 114, 128, 0.4)'
  };
};
