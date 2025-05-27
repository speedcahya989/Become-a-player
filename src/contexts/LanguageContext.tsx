
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
    
    // Profile
    'profile.title': 'Profil',
    'profile.name': 'Nama',
    'profile.class': 'Kelas',
    'profile.avatar': 'Avatar',
    
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
    'stats.value': 'Nilai',
    'stats.currentValue': 'Nilai Saat Ini',
    'stats.nextLevel': 'Progress Level Berikutnya',
    'stats.toNextLevel': 'ke level berikutnya',
    'stats.questsCompleted': 'Quest Selesai',
    'stats.target': 'Target',
    'stats.xpGained': 'XP Diperoleh',
    'stats.weeklyIncrease': '+12% dari minggu lalu',
    'stats.goldEarned': 'Gold Diperoleh',
    'stats.efficiency': '+8% efisiensi',
    'stats.streakDays': 'Streak Hari',
    'stats.personalRecord': 'Rekor pribadi!',
    'stats.str.description': 'Kekuatan fisik dan daya tahan',
    'stats.dex.description': 'Kelincahan dan koordinasi',
    'stats.int.description': 'Pengetahuan dan kemampuan belajar',
    'stats.wis.description': 'Kebijaksanaan dan pengambilan keputusan',
    'stats.cha.description': 'Keterampilan sosial dan pengaruh',
    'stats.con.description': 'Daya tahan dan stamina',
    
    // Shop
    'shop.title': 'Toko Legendaris',
    'shop.subtitle': 'Beli item untuk meningkatkan performa',
    'shop.rewards': 'Reward',
    'shop.abilities': 'Kemampuan',
    'shop.buy': 'BELI',
    'shop.owned': 'DIMILIKI',
    'shop.weekly': 'Mingguan',
    'shop.item': 'Item',
    'shop.newItem': 'Item Baru',
    'shop.form.name': 'Nama Item',
    'shop.form.namePlaceholder': 'Masukkan nama item',
    'shop.form.description': 'Deskripsi',
    'shop.form.descriptionPlaceholder': 'Masukkan deskripsi item',
    'shop.form.price': 'Harga (Gold)',
    'shop.form.category': 'Kategori',
    'shop.form.rarity': 'Kelangkaan',
    'shop.form.icon': 'Ikon (Emoji)',
    'shop.rarity.common': 'Biasa',
    'shop.rarity.uncommon': 'Tidak Biasa',
    'shop.rarity.rare': 'Langka',
    'shop.rarity.epic': 'Epik',
    'shop.rarity.legendary': 'Legendaris',
    'shop.reward.pizza.description': 'Pesan pizza favorit tanpa rasa bersalah!',
    'shop.reward.movie.name': 'Film Bioskop',
    'shop.reward.movie.description': 'Nonton film terbaru di bioskop',
    'shop.ability.lightning.description': 'Meningkatkan kecepatan reaksi dalam situasi kritis',
    'shop.ability.crystal.description': 'Memberikan wawasan mendalam untuk mengambil keputusan terbaik',
    'shop.ability.flow.description': 'Masuk ke zona konsentrasi penuh selama aktivitas penting',
    'shop.ability.aim.description': 'Fokus laser untuk mencapai target dengan presisi tinggi',
    'shop.ability.stellar.description': 'Konsentrasi bintang yang tidak tergoyahkan',
    'shop.ability.aegis.description': 'Perlindungan kuat dari gangguan dan distraksi',
    
    // Buffs/Debuffs
    'buffs.title': 'Buff & Debuff',
    'buffs.subtitle': 'Kelola efek aktif dan pelajari semua efek yang tersedia',
    'buffs.active': 'Efek Aktif',
    'buffs.all': 'Daftar Semua',
    'buffs.list': 'Daftar Semua Buff',
    'buffs.debuffs': 'Daftar Semua Debuff',
    'buffs.none': 'Tidak ada efek aktif saat ini',
    'buffs.timeRemaining': 'Sisa waktu',
    'buffs.info': 'Buff dapat dibeli di menu Toko • Debuff akan hilang seiring waktu atau dengan item khusus',
    'buffs.focused.description': '+20% XP dari semua quest hari itu',
    'buffs.energetic.description': 'Tambahan +5 XP untuk semua quest selama 3 hari',
    'buffs.momentum.description': 'XP dari quest dilipatgandakan 1.5x selama 1 hari',
    'buffs.lucky.description': 'Gold dari reward shop diskon 50% selama 2 hari',
    'buffs.lucky.effect': '50% Diskon',
    'buffs.timemaster.description': 'Boleh mengubah deadline quest harian 1 kali tanpa penalti',
    'buffs.timemaster.effect': 'Deadline Flex',
    'buffs.shielded.description': 'Debuff tidak aktif selama 1 hari',
    'buffs.shielded.effect': 'Debuff Immunity',
    'debuffs.fatigued.description': 'Tidak bisa ambil quest level tinggi (XP > 30)',
    'debuffs.fatigued.effect': 'Quest Limit',
    'debuffs.procrastinating.description': 'Tidak bisa membuka quest baru',
    'debuffs.procrastinating.effect': 'Quest Block',
    'debuffs.demotivated.description': 'Tidak boleh ke shop selama 3 hari',
    'debuffs.demotivated.effect': 'Shop Block',
    'debuffs.blocked.description': 'XP & gold berkurang 70% selama 1 hari',
    'debuffs.blocked.effect': '-70% Rewards',
    'debuffs.frozen.description': 'Tidak bisa akses quest selama 1 hari',
    'debuffs.frozen.effect': 'Quest Freeze',
    'debuffs.tired.description': 'Mengurangi XP yang didapat dari quest sebesar 10%',
    'debuffs.tired.effect': '-10% XP',
    
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
    'common.gold': 'Gold',
    'common.days.mon': 'Sen',
    'common.days.tue': 'Sel',
    'common.days.wed': 'Rab',
    'common.days.thu': 'Kam',
    'common.days.fri': 'Jum',
    'common.days.sat': 'Sab',
    'common.days.sun': 'Min',
  },
  en: {
    // Header
    'app.title': 'BECOME A PLAYER',
    'app.subtitle': 'Level Up Yourself With Quests',
    
    // Profile
    'profile.title': 'Profile',
    'profile.name': 'Name',
    'profile.class': 'Class',
    'profile.avatar': 'Avatar',
    
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
    'stats.value': 'Value',
    'stats.currentValue': 'Current Value',
    'stats.nextLevel': 'Next Level Progress',
    'stats.toNextLevel': 'to next level',
    'stats.questsCompleted': 'Quests Completed',
    'stats.target': 'Target',
    'stats.xpGained': 'XP Gained',
    'stats.weeklyIncrease': '+12% from last week',
    'stats.goldEarned': 'Gold Earned',
    'stats.efficiency': '+8% efficiency',
    'stats.streakDays': 'Streak Days',
    'stats.personalRecord': 'Personal record!',
    'stats.str.description': 'Physical strength and endurance',
    'stats.dex.description': 'Agility and coordination',
    'stats.int.description': 'Knowledge and learning ability',
    'stats.wis.description': 'Wisdom and decision making',
    'stats.cha.description': 'Social skills and influence',
    'stats.con.description': 'Endurance and stamina',
    
    // Shop
    'shop.title': 'Legendary Shop',
    'shop.subtitle': 'Buy items to boost your performance',
    'shop.rewards': 'Rewards',
    'shop.abilities': 'Abilities',
    'shop.buy': 'BUY',
    'shop.owned': 'OWNED',
    'shop.weekly': 'Weekly',
    'shop.item': 'Item',
    'shop.newItem': 'New Item',
    'shop.form.name': 'Item Name',
    'shop.form.namePlaceholder': 'Enter item name',
    'shop.form.description': 'Description',
    'shop.form.descriptionPlaceholder': 'Enter item description',
    'shop.form.price': 'Price (Gold)',
    'shop.form.category': 'Category',
    'shop.form.rarity': 'Rarity',
    'shop.form.icon': 'Icon (Emoji)',
    'shop.rarity.common': 'Common',
    'shop.rarity.uncommon': 'Uncommon',
    'shop.rarity.rare': 'Rare',
    'shop.rarity.epic': 'Epic',
    'shop.rarity.legendary': 'Legendary',
    'shop.reward.pizza.description': 'Order your favorite pizza guilt-free!',
    'shop.reward.movie.name': 'Cinema Movie',
    'shop.reward.movie.description': 'Watch the latest movie at the cinema',
    'shop.ability.lightning.description': 'Enhances reaction speed in critical situations',
    'shop.ability.crystal.description': 'Provides deep insight for making the best decisions',
    'shop.ability.flow.description': 'Enter full concentration zone during important activities',
    'shop.ability.aim.description': 'Laser focus to achieve targets with high precision',
    'shop.ability.stellar.description': 'Unwavering stellar concentration',
    'shop.ability.aegis.description': 'Strong protection from disruptions and distractions',
    
    // Buffs/Debuffs
    'buffs.title': 'Buff & Debuff',
    'buffs.subtitle': 'Manage active effects and learn about all available effects',
    'buffs.active': 'Active Effects',
    'buffs.all': 'All Effects',
    'buffs.list': 'All Buffs List',
    'buffs.debuffs': 'All Debuffs List',
    'buffs.none': 'No active effects currently',
    'buffs.timeRemaining': 'Time remaining',
    'buffs.info': 'Buffs can be purchased in the Shop menu • Debuffs will disappear over time or with special items',
    'buffs.focused.description': '+20% XP from all quests for the day',
    'buffs.energetic.description': 'Additional +5 XP for all quests for 3 days',
    'buffs.momentum.description': 'Quest XP multiplied by 1.5x for 1 day',
    'buffs.lucky.description': 'Gold from reward shop 50% discount for 2 days',
    'buffs.lucky.effect': '50% Discount',
    'buffs.timemaster.description': 'Can change daily quest deadline once without penalty',
    'buffs.timemaster.effect': 'Deadline Flex',
    'buffs.shielded.description': 'Debuffs inactive for 1 day',
    'buffs.shielded.effect': 'Debuff Immunity',
    'debuffs.fatigued.description': 'Cannot take high level quests (XP > 30)',
    'debuffs.fatigued.effect': 'Quest Limit',
    'debuffs.procrastinating.description': 'Cannot open new quests',
    'debuffs.procrastinating.effect': 'Quest Block',
    'debuffs.demotivated.description': 'Cannot go to shop for 3 days',
    'debuffs.demotivated.effect': 'Shop Block',
    'debuffs.blocked.description': 'XP & gold reduced by 70% for 1 day',
    'debuffs.blocked.effect': '-70% Rewards',
    'debuffs.frozen.description': 'Cannot access quests for 1 day',
    'debuffs.frozen.effect': 'Quest Freeze',
    'debuffs.tired.description': 'Reduces XP gained from quests by 10%',
    'debuffs.tired.effect': '-10% XP',
    
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
    'common.gold': 'Gold',
    'common.days.mon': 'Mon',
    'common.days.tue': 'Tue',
    'common.days.wed': 'Wed',
    'common.days.thu': 'Thu',
    'common.days.fri': 'Fri',
    'common.days.sat': 'Sat',
    'common.days.sun': 'Sun',
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
