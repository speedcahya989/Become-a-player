
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'id' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  id: {
    // Header
    'app.title': 'BECOME A PLAYER',
    'app.subtitle': 'Tingkatkan Diri Dengan Quest',
    
    // Tabs
    'tab.quest': 'Quest',
    'tab.shop': 'Toko',
    'tab.stats': 'Stats',
    'tab.achievements': 'Prestasi',
    'tab.buffs': 'Buff/Debuff',
    'tab.settings': 'Setting',
    
    // Quest
    'quest.add': 'Tambah Quest',
    'quest.settings': 'Pengaturan Quest',
    'quest.title': 'Papan Quest',
    'quest.subtitle': 'Pilih jalur menuju kehebatan',
    'quest.daily': 'Harian',
    'quest.weekly': 'Mingguan',
    'quest.main': 'Utama',
    'quest.event': 'Event',
    'quest.form.title': 'Judul Quest',
    'quest.form.description': 'Deskripsi',
    'quest.form.type': 'Tipe Quest',
    'quest.form.difficulty': 'Tingkat Kesulitan',
    'quest.form.xp': 'XP Reward',
    'quest.form.gold': 'Gold Reward',
    'quest.form.stats': 'Bonus Stats',
    'quest.form.duration': 'Durasi Pengerjaan (menit)',
    'quest.form.expire': 'Kadaluarsa',
    'quest.form.expire.daily': 'Kadaluarsa setiap jam',
    'quest.form.expire.weekly': 'Kadaluarsa setiap',
    'quest.form.expire.main': 'Tidak ada kadaluarsa',
    'quest.form.expire.event': 'Kadaluarsa pada',
    'quest.difficulty.easy': 'Mudah',
    'quest.difficulty.medium': 'Sedang',
    'quest.difficulty.hard': 'Sulit',
    
    // Stats
    'stats.title': 'Statistik',
    'stats.subtitle': 'Ringkasan perkembangan karakter Anda',
    'stats.attributes': 'Atribut Karakter',
    'stats.weekly': 'Progress Mingguan',
    'stats.progress': 'Progress Tracker',
    'stats.mood': 'Mood Tracker',
    'stats.experience': 'Experience',
    'stats.level': 'Level',
    'stats.rank': 'Rank',
    'stats.rank.novice': 'Pemula',
    'stats.rank.apprentice': 'Murid',
    'stats.rank.journeyman': 'Pengembara',
    'stats.rank.expert': 'Ahli',
    'stats.rank.master': 'Master',
    'stats.rank.grandmaster': 'Grand Master',
    'stats.rank.legend': 'Legenda',
    
    // Shop
    'shop.title': 'Toko Legendaris',
    'shop.subtitle': 'Beli item untuk meningkatkan performa',
    'shop.rewards': 'Reward',
    'shop.powerups': 'Power-ups',
    'shop.buy': 'BELI',
    'shop.owned': 'DIMILIKI',
    'shop.weekly': 'Mingguan',
    
    // Buffs/Debuffs
    'buffs.title': 'Buff & Debuff',
    'buffs.subtitle': 'Kelola efek aktif dan pelajari semua efek yang tersedia',
    'buffs.active': 'Efek Aktif',
    'buffs.all': 'Daftar Semua',
    'buffs.list': 'Daftar Semua Buff',
    'buffs.debuffs': 'Daftar Semua Debuff',
    'buffs.none': 'Tidak ada efek aktif saat ini',
    
    // Settings
    'settings.title': 'Pengaturan',
    'settings.subtitle': 'Kelola preferensi dan data permainan',
    'settings.language': 'Pengaturan Bahasa',
    'settings.language.description': 'Pilih bahasa yang digunakan dalam aplikasi',
    'settings.language.indonesian': 'Bahasa Indonesia',
    'settings.language.english': 'English',
    'settings.audio': 'Pengaturan Audio',
    'settings.audio.description': 'Mainkan suara saat berinteraksi',
    'settings.notifications': 'Pengaturan Notifikasi',
    'settings.notifications.description': 'Tampilkan notifikasi saat ada kejadian',
    'settings.danger': 'Zona Bahaya',
    'settings.reset': 'Reset Progress',
    'settings.reset.description': 'Hapus semua progress, XP, Gold, dan pencapaian. Tindakan ini tidak dapat dibatalkan!',
    'settings.reset.button': 'RESET SEMUA PROGRESS',
    'settings.active': 'AKTIF',
    'settings.inactive': 'NONAKTIF',
    
    // Buttons
    'button.cancel': 'BATAL',
    'button.confirm': 'YA, RESET SEMUANYA',
    'button.save': 'SIMPAN',
    'button.edit': 'EDIT',
    'button.delete': 'HAPUS',
    'button.add': 'TAMBAH',
    'button.update': 'UPDATE',
    
    // Status
    'status.sound': 'Status Suara',
    'status.notifications': 'Status Notifikasi',
    
    // Common
    'common.time.hour': 'jam',
    'common.time.day': 'hari',
    'common.time.week': 'minggu',
    'common.no.data': 'Tidak ada data tersedia',
    'common.loading': 'Memuat...',
  },
  en: {
    // Header
    'app.title': 'BECOME A PLAYER',
    'app.subtitle': 'Level Up Yourself With Quests',
    
    // Tabs
    'tab.quest': 'Quest',
    'tab.shop': 'Shop',
    'tab.stats': 'Stats',
    'tab.achievements': 'Achievements',
    'tab.buffs': 'Buff/Debuff',
    'tab.settings': 'Settings',
    
    // Quest
    'quest.add': 'Add Quest',
    'quest.settings': 'Quest Settings',
    'quest.title': 'Quest Board',
    'quest.subtitle': 'Choose your path to greatness',
    'quest.daily': 'Daily',
    'quest.weekly': 'Weekly',
    'quest.main': 'Main',
    'quest.event': 'Event',
    'quest.form.title': 'Quest Title',
    'quest.form.description': 'Description',
    'quest.form.type': 'Quest Type',
    'quest.form.difficulty': 'Difficulty Level',
    'quest.form.xp': 'XP Reward',
    'quest.form.gold': 'Gold Reward',
    'quest.form.stats': 'Bonus Stats',
    'quest.form.duration': 'Duration (minutes)',
    'quest.form.expire': 'Expiration',
    'quest.form.expire.daily': 'Expires every hour',
    'quest.form.expire.weekly': 'Expires every',
    'quest.form.expire.main': 'No expiration',
    'quest.form.expire.event': 'Expires on',
    'quest.difficulty.easy': 'Easy',
    'quest.difficulty.medium': 'Medium',
    'quest.difficulty.hard': 'Hard',
    
    // Stats
    'stats.title': 'Statistics',
    'stats.subtitle': 'Summary of your character development',
    'stats.attributes': 'Character Attributes',
    'stats.weekly': 'Weekly Progress',
    'stats.progress': 'Progress Tracker',
    'stats.mood': 'Mood Tracker',
    'stats.experience': 'Experience',
    'stats.level': 'Level',
    'stats.rank': 'Rank',
    'stats.rank.novice': 'Novice',
    'stats.rank.apprentice': 'Apprentice',
    'stats.rank.journeyman': 'Journeyman',
    'stats.rank.expert': 'Expert',
    'stats.rank.master': 'Master',
    'stats.rank.grandmaster': 'Grand Master',
    'stats.rank.legend': 'Legend',
    
    // Shop
    'shop.title': 'Legendary Shop',
    'shop.subtitle': 'Buy items to boost your performance',
    'shop.rewards': 'Rewards',
    'shop.powerups': 'Power-ups',
    'shop.buy': 'BUY',
    'shop.owned': 'OWNED',
    'shop.weekly': 'Weekly',
    
    // Buffs/Debuffs
    'buffs.title': 'Buff & Debuff',
    'buffs.subtitle': 'Manage active effects and learn about all available effects',
    'buffs.active': 'Active Effects',
    'buffs.all': 'All Effects',
    'buffs.list': 'All Buffs List',
    'buffs.debuffs': 'All Debuffs List',
    'buffs.none': 'No active effects currently',
    
    // Settings
    'settings.title': 'Settings',
    'settings.subtitle': 'Manage preferences and game data',
    'settings.language': 'Language Settings',
    'settings.language.description': 'Choose the language used in the application',
    'settings.language.indonesian': 'Bahasa Indonesia',
    'settings.language.english': 'English',
    'settings.audio': 'Audio Settings',
    'settings.audio.description': 'Play sounds when interacting',
    'settings.notifications': 'Notification Settings',
    'settings.notifications.description': 'Show notifications when events occur',
    'settings.danger': 'Danger Zone',
    'settings.reset': 'Reset Progress',
    'settings.reset.description': 'Delete all progress, XP, Gold, and achievements. This action cannot be undone!',
    'settings.reset.button': 'RESET ALL PROGRESS',
    'settings.active': 'ACTIVE',
    'settings.inactive': 'INACTIVE',
    
    // Buttons
    'button.cancel': 'CANCEL',
    'button.confirm': 'YES, RESET EVERYTHING',
    'button.save': 'SAVE',
    'button.edit': 'EDIT',
    'button.delete': 'DELETE',
    'button.add': 'ADD',
    'button.update': 'UPDATE',
    
    // Status
    'status.sound': 'Sound Status',
    'status.notifications': 'Notification Status',
    
    // Common
    'common.time.hour': 'hour',
    'common.time.day': 'day',
    'common.time.week': 'week',
    'common.no.data': 'No data available',
    'common.loading': 'Loading...',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('id');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
