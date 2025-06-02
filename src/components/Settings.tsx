
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '../contexts/LanguageContext';
import { Settings as SettingsIcon, User, Bell, Palette, Info } from 'lucide-react';

const Settings = () => {
  const { language, setLanguage, t } = useLanguage();
  const [settings, setSettings] = useState({
    notifications: true,
    autoSave: true,
    darkMode: true,
    soundEffects: false,
    animations: true
  });

  const handleSettingChange = (key: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-orbitron font-bold hologram-text mb-2">{t('tab.settings')}</h2>
        <p className="text-muted-foreground">{t('settings.subtitle')}</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4 glass">
          <TabsTrigger value="general" className="font-orbitron transition-all duration-300">
            <SettingsIcon className="w-4 h-4 mr-2" />
            {t('settings.general')}
          </TabsTrigger>
          <TabsTrigger value="profile" className="font-orbitron transition-all duration-300">
            <User className="w-4 h-4 mr-2" />
            {t('settings.profile')}
          </TabsTrigger>
          <TabsTrigger value="notifications" className="font-orbitron transition-all duration-300">
            <Bell className="w-4 h-4 mr-2" />
            {t('settings.notifications')}
          </TabsTrigger>
          <TabsTrigger value="about" className="font-orbitron transition-all duration-300">
            <Info className="w-4 h-4 mr-2" />
            {t('settings.about')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6 animate-fade-in">
          <div className="glass rounded-lg p-6 space-y-6">
            <h3 className="font-orbitron font-bold text-xl">{t('settings.general')}</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="language" className="font-orbitron">{t('settings.language')}</Label>
                <div className="flex gap-2 mt-2">
                  <Button
                    variant={language === 'id' ? 'default' : 'outline'}
                    onClick={() => setLanguage('id')}
                    className="font-orbitron"
                  >
                    Bahasa Indonesia
                  </Button>
                  <Button
                    variant={language === 'en' ? 'default' : 'outline'}
                    onClick={() => setLanguage('en')}
                    className="font-orbitron"
                  >
                    English
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-orbitron">{t('settings.autoSave')}</Label>
                  <p className="text-sm text-muted-foreground">{t('settings.autoSaveDesc')}</p>
                </div>
                <Switch
                  checked={settings.autoSave}
                  onCheckedChange={() => handleSettingChange('autoSave')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-orbitron">{t('settings.animations')}</Label>
                  <p className="text-sm text-muted-foreground">{t('settings.animationsDesc')}</p>
                </div>
                <Switch
                  checked={settings.animations}
                  onCheckedChange={() => handleSettingChange('animations')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-orbitron">{t('settings.soundEffects')}</Label>
                  <p className="text-sm text-muted-foreground">{t('settings.soundEffectsDesc')}</p>
                </div>
                <Switch
                  checked={settings.soundEffects}
                  onCheckedChange={() => handleSettingChange('soundEffects')}
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="profile" className="mt-6 animate-fade-in">
          <div className="glass rounded-lg p-6 space-y-6">
            <h3 className="font-orbitron font-bold text-xl">{t('settings.profile')}</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="username" className="font-orbitron">{t('settings.username')}</Label>
                <Input
                  id="username"
                  defaultValue="Player"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="email" className="font-orbitron">{t('settings.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="player@example.com"
                  className="mt-2"
                />
              </div>

              <div className="flex gap-2">
                <Button className="font-orbitron">{t('button.save')}</Button>
                <Button variant="outline" className="font-orbitron">{t('button.reset')}</Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6 animate-fade-in">
          <div className="glass rounded-lg p-6 space-y-6">
            <h3 className="font-orbitron font-bold text-xl">{t('settings.notifications')}</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-orbitron">{t('settings.questReminders')}</Label>
                  <p className="text-sm text-muted-foreground">{t('settings.questRemindersDesc')}</p>
                </div>
                <Switch
                  checked={settings.notifications}
                  onCheckedChange={() => handleSettingChange('notifications')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-orbitron">{t('settings.achievementAlerts')}</Label>
                  <p className="text-sm text-muted-foreground">{t('settings.achievementAlertsDesc')}</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-orbitron">{t('settings.levelUpNotifications')}</Label>
                  <p className="text-sm text-muted-foreground">{t('settings.levelUpNotificationsDesc')}</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="about" className="mt-6 animate-fade-in">
          <div className="glass rounded-lg p-6 space-y-6">
            <h3 className="font-orbitron font-bold text-xl">{t('settings.about')}</h3>
            
            <div className="space-y-4">
              <div className="text-center space-y-4">
                <div className="text-6xl">🎮</div>
                <h4 className="text-2xl font-orbitron font-bold hologram-text">{t('app.title')}</h4>
                <p className="text-muted-foreground">{t('app.subtitle')}</p>
                
                <div className="flex justify-center gap-2 flex-wrap">
                  <Badge variant="outline" className="font-orbitron">v1.0.0</Badge>
                  <Badge variant="outline" className="font-orbitron">React</Badge>
                  <Badge variant="outline" className="font-orbitron">TypeScript</Badge>
                  <Badge variant="outline" className="font-orbitron">Tailwind CSS</Badge>
                </div>
              </div>

              <div className="text-center text-sm text-muted-foreground space-y-2">
                <p>{t('about.description')}</p>
                <p>{t('about.motivation')}</p>
                <p className="font-orbitron text-primary">{t('about.creator')}</p>
              </div>

              <div className="border-t border-border/50 pt-4 text-center">
                <p className="text-xs text-muted-foreground">
                  {t('about.version')} • {t('about.buildDate')}
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
