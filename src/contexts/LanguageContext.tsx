
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
    'settings.status': 'Status Game',
    'settings.danger': 'Zona Bahaya',
    'settings.reset': 'Reset Progress',
    'settings.reset.description': 'Hapus semua progress, XP, Gold, dan pencapaian. Tindakan ini tidak dapat dibatalkan!',
    'settings.reset.button': 'RESET SEMUA PROGRESS',
    'settings.active': 'AKTIF',
    'settings.inactive': 'NONAKTIF',
    
    // Buttons
    'button.cancel': 'BATAL',
    'button.confirm': 'YA, RESET SEMUANYA',
    
    // Status
    'status.sound': 'Status Suara',
    'status.notifications': 'Status Notifikasi',
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
    'settings.status': 'Game Status',
    'settings.danger': 'Danger Zone',
    'settings.reset': 'Reset Progress',
    'settings.reset.description': 'Delete all progress, XP, Gold, and achievements. This action cannot be undone!',
    'settings.reset.button': 'RESET ALL PROGRESS',
    'settings.active': 'ACTIVE',
    'settings.inactive': 'INACTIVE',
    
    // Buttons
    'button.cancel': 'CANCEL',
    'button.confirm': 'YES, RESET EVERYTHING',
    
    // Status
    'status.sound': 'Sound Status',
    'status.notifications': 'Notification Status',
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
