
// Sound effects untuk berbagai aksi RPG
export const playSound = (soundType: string) => {
  // Untuk implementasi sound, kita bisa menggunakan Web Audio API atau library seperti Howler.js
  // Sementara ini kita log untuk debugging
  console.log(`🔊 Playing sound: ${soundType}`);
  
  // Simulasi berbagai jenis suara RPG
  const soundMap: { [key: string]: string } = {
    'questStart': '🎯 Quest dimulai!',
    'questComplete': '🎉 Quest selesai!',
    'levelUp': '⭐ Level naik!',
    'buttonClick': '🔘 Klik button',
    'shopPurchase': '💰 Pembelian toko',
    'buffActivate': '✨ Buff aktif',
    'debuffActivate': '💀 Debuff aktif',
    'xpGain': '📈 XP bertambah',
    'goldGain': '🪙 Gold bertambah'
  };

  const soundDescription = soundMap[soundType] || `🔊 ${soundType}`;
  
  // Untuk development, kita tampilkan di console
  // Nanti bisa diganti dengan actual audio files
  if (typeof window !== 'undefined') {
    console.log(`Sound Effect: ${soundDescription}`);
  }
};

// Sistem notifikasi in-game
export const showNotification = (title: string, message: string, type: 'success' | 'warning' | 'info' | 'error' = 'info') => {
  console.log(`📢 Notification: ${title} - ${message}`);
  
  // Implementasi notifikasi menggunakan browser notification atau toast
  if (typeof window !== 'undefined' && 'Notification' in window) {
    // Request permission jika belum ada
    if (Notification.permission === 'granted') {
      new Notification(title, {
        body: message,
        icon: '/favicon.ico', // Gunakan icon aplikasi
        badge: '/favicon.ico'
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification(title, {
            body: message,
            icon: '/favicon.ico',
            badge: '/favicon.ico'
          });
        }
      });
    }
  }
  
  // Fallback: tampilkan sebagai console log dengan emoji
  const typeEmoji = {
    'success': '✅',
    'warning': '⚠️',
    'info': 'ℹ️',
    'error': '❌'
  };
  
  console.log(`${typeEmoji[type]} ${title}: ${message}`);
};

// Utility untuk format waktu
export const formatTimeLeft = (timeString: string): string => {
  // Convert time format dari "6h 30m" ke format Indonesia
  return timeString
    .replace(/h/g, 'j')
    .replace(/m/g, 'm')
    .replace(/d/g, 'h');
};

// Utility untuk format mata uang
export const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('id-ID');
};

// Utility untuk mendapatkan greeting berdasarkan waktu
export const getTimeGreeting = (): string => {
  const hour = new Date().getHours();
  
  if (hour < 5) return 'Selamat dini hari';
  if (hour < 11) return 'Selamat pagi';
  if (hour < 15) return 'Selamat siang';
  if (hour < 19) return 'Selamat sore';
  return 'Selamat malam';
};

// Utility untuk random motivational quotes
export const getMotivationalQuote = (): string => {
  const quotes = [
    'Setiap quest adalah langkah menuju versi terbaik dirimu!',
    'Level up dimulai dari keputusan hari ini!',
    'Konsistensi adalah kunci untuk menjadi Player sejati!',
    'Hari ini adalah kesempatan untuk meningkatkan stats hidupmu!',
    'Quest terkecil sekalipun membawa perubahan besar!',
    'Kamu adalah main character dalam game hidupmu sendiri!',
    'Setiap XP yang didapat adalah investasi untuk masa depan!',
    'Jangan takut gagal, itu hanya part of the learning process!'
  ];
  
  return quotes[Math.floor(Math.random() * quotes.length)];
};
