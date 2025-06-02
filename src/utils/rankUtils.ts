
export const getRankColors = (rank: string) => {
  const lowerRank = rank.toLowerCase();
  
  if (lowerRank.includes('f')) {
    return {
      backgroundColor: 'bg-white border-white',
      textColor: 'text-black',
      shadow: 'shadow-lg shadow-white/20'
    };
  } else if (lowerRank.includes('e')) {
    return {
      backgroundColor: 'bg-green-500 border-green-400',
      textColor: 'text-white',
      shadow: 'shadow-lg shadow-green-500/40'
    };
  } else if (lowerRank.includes('d')) {
    return {
      backgroundColor: 'bg-blue-500 border-blue-400',
      textColor: 'text-white',
      shadow: 'shadow-lg shadow-blue-500/40'
    };
  } else if (lowerRank.includes('c')) {
    return {
      backgroundColor: 'bg-purple-500 border-purple-400',
      textColor: 'text-white',
      shadow: 'shadow-lg shadow-purple-500/40'
    };
  } else if (lowerRank.includes('b')) {
    return {
      backgroundColor: 'bg-orange-500 border-orange-400',
      textColor: 'text-white',
      shadow: 'shadow-lg shadow-orange-500/40'
    };
  } else if (lowerRank.includes('a')) {
    return {
      backgroundColor: 'bg-red-500 border-red-400',
      textColor: 'text-white',
      shadow: 'shadow-lg shadow-red-500/40'
    };
  } else if (lowerRank.includes('s') && !lowerRank.includes('ss')) {
    return {
      backgroundColor: 'bg-gradient-to-r from-yellow-400 to-yellow-600 border-yellow-400',
      textColor: 'text-black',
      shadow: 'shadow-lg shadow-yellow-500/50'
    };
  } else if (lowerRank.includes('ss')) {
    return {
      backgroundColor: 'bg-black border-gray-700',
      textColor: 'text-white',
      shadow: 'shadow-lg shadow-black/60'
    };
  }
  
  // Default fallback
  return {
    backgroundColor: 'bg-gray-500 border-gray-400',
    textColor: 'text-white',
    shadow: 'shadow-lg shadow-gray-500/40'
  };
};
