
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Settings, RotateCcw, Volume2, VolumeX, Bell, BellOff, Languages } from 'lucide-react';
import { playSound, showNotification } from '../utils/gameUtils';
import { useLanguage } from '../contexts/LanguageContext';

const SettingsComponent = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (newLanguage: 'id' | 'en') => {
    setLanguage(newLanguage);
    playSound('buttonClick');
    showNotification('Language Changed', `Language changed to ${newLanguage === 'id' ? 'Indonesian' : 'English'}`);
  };

  const handleSoundToggle = () => {
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled) {
      playSound('buttonClick');
    }
    showNotification('Pengaturan Audio', `Suara ${!soundEnabled ? 'diaktifkan' : 'dinonaktifkan'}`);
  };

  const handleNotificationToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
    playSound('buttonClick');
    showNotification('Pengaturan Notifikasi', `Notifikasi ${!notificationsEnabled ? 'diaktifkan' : 'dinonaktifkan'}`);
  };

  const handleResetProgress = () => {
    // Logic untuk reset progress akan ditambahkan nanti
    playSound('questComplete');
    showNotification('Progress Direset', 'Semua progress telah dihapus! Mulai petualangan baru.');
    setIsResetDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-orbitron font-bold hologram-text mb-2">{t('settings.title')}</h2>
        <p className="text-muted-foreground">{t('settings.subtitle')}</p>
      </div>

      <div className="grid gap-6">
        {/* Language Settings */}
        <div className="glass rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Languages className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-orbitron font-bold">{t('settings.language')}</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{t('settings.language')}</p>
                <p className="text-sm text-muted-foreground">{t('settings.language.description')}</p>
              </div>
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-48 font-orbitron">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass">
                  <SelectItem value="id" className="font-orbitron">{t('settings.language.indonesian')}</SelectItem>
                  <SelectItem value="en" className="font-orbitron">{t('settings.language.english')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Audio Settings */}
        <div className="glass rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Volume2 className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-orbitron font-bold">{t('settings.audio')}</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Efek Suara RPG</p>
                <p className="text-sm text-muted-foreground">{t('settings.audio.description')}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSoundToggle}
                className={`font-orbitron ${soundEnabled ? 'bg-green-600/20 border-green-500/50' : 'bg-red-600/20 border-red-500/50'}`}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 mr-2" /> : <VolumeX className="w-4 h-4 mr-2" />}
                {soundEnabled ? t('settings.active') : t('settings.inactive')}
              </Button>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="glass rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-orbitron font-bold">{t('settings.notifications')}</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Notifikasi Game</p>
                <p className="text-sm text-muted-foreground">{t('settings.notifications.description')}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNotificationToggle}
                className={`font-orbitron ${notificationsEnabled ? 'bg-green-600/20 border-green-500/50' : 'bg-red-600/20 border-red-500/50'}`}
              >
                {notificationsEnabled ? <Bell className="w-4 h-4 mr-2" /> : <BellOff className="w-4 h-4 mr-2" />}
                {notificationsEnabled ? t('settings.active') : t('settings.inactive')}
              </Button>
            </div>
          </div>
        </div>

        {/* Game Status */}
        <div className="glass rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Settings className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-orbitron font-bold">{t('settings.status')}</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">{t('status.sound')}</span>
              <Badge variant={soundEnabled ? "default" : "secondary"} className="font-orbitron">
                {soundEnabled ? t('settings.active') : t('settings.inactive')}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">{t('status.notifications')}</span>
              <Badge variant={notificationsEnabled ? "default" : "secondary"} className="font-orbitron">
                {notificationsEnabled ? t('settings.active') : t('settings.inactive')}
              </Badge>
            </div>
          </div>
        </div>

        {/* Reset Progress */}
        <div className="glass rounded-lg p-6 border-red-500/30">
          <div className="flex items-center gap-3 mb-4">
            <RotateCcw className="w-6 h-6 text-red-400" />
            <h3 className="text-xl font-orbitron font-bold text-red-400">{t('settings.danger')}</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-red-300">{t('settings.reset')}</p>
              <p className="text-sm text-muted-foreground">{t('settings.reset.description')}</p>
            </div>
            
            <Dialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive" className="font-orbitron bg-red-600 hover:bg-red-700">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  {t('settings.reset.button')}
                </Button>
              </DialogTrigger>
              <DialogContent className="glass">
                <DialogHeader>
                  <DialogTitle className="font-orbitron text-red-400">Konfirmasi Reset</DialogTitle>
                  <DialogDescription>
                    Apakah kamu yakin ingin menghapus semua progress? Tindakan ini akan menghapus:
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Semua XP dan Level</li>
                      <li>Semua Gold dan item</li>
                      <li>Riwayat quest dan pencapaian</li>
                      <li>Stats karakter</li>
                    </ul>
                    <br />
                    <strong className="text-red-400">Tindakan ini tidak dapat dibatalkan!</strong>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsResetDialogOpen(false)} className="font-orbitron">
                    {t('button.cancel')}
                  </Button>
                  <Button variant="destructive" onClick={handleResetProgress} className="font-orbitron bg-red-600 hover:bg-red-700">
                    {t('button.confirm')}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsComponent;
