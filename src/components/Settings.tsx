
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '../contexts/LanguageContext';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const Settings = () => {
  const { language, setLanguage, t } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleReset = () => {
    console.log('Resetting all progress...');
    // Here you would implement the actual reset logic
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-orbitron font-bold hologram-text mb-2">{t('settings.title')}</h2>
        <p className="text-muted-foreground">{t('settings.subtitle')}</p>
      </div>

      {/* Language Settings */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="font-orbitron">{t('settings.language')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">{t('settings.language.description')}</p>
          
          <div className="flex gap-2">
            <Button
              variant={language === 'id' ? 'default' : 'outline'}
              onClick={() => setLanguage('id')}
              className="font-orbitron"
            >
              {t('settings.language.indonesian')}
            </Button>
            <Button
              variant={language === 'en' ? 'default' : 'outline'}
              onClick={() => setLanguage('en')}
              className="font-orbitron"
            >
              {t('settings.language.english')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Audio Settings */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="font-orbitron">{t('settings.audio')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">{t('settings.audio.description')}</p>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">{t('status.sound')}</span>
              <Badge 
                variant="outline" 
                className={`ml-2 ${soundEnabled ? 'text-green-400 border-green-400/30' : 'text-red-400 border-red-400/30'}`}
              >
                {soundEnabled ? t('settings.active') : t('settings.inactive')}
              </Badge>
            </div>
            <Switch
              checked={soundEnabled}
              onCheckedChange={setSoundEnabled}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="font-orbitron">{t('settings.notifications')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">{t('settings.notifications.description')}</p>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">{t('status.notifications')}</span>
              <Badge 
                variant="outline" 
                className={`ml-2 ${notificationsEnabled ? 'text-green-400 border-green-400/30' : 'text-red-400 border-red-400/30'}`}
              >
                {notificationsEnabled ? t('settings.active') : t('settings.inactive')}
              </Badge>
            </div>
            <Switch
              checked={notificationsEnabled}
              onCheckedChange={setNotificationsEnabled}
            />
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="glass border-red-500/20">
        <CardHeader>
          <CardTitle className="font-orbitron text-red-400">{t('settings.danger')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-orbitron font-bold mb-2">{t('settings.reset')}</h4>
            <p className="text-sm text-muted-foreground mb-4">
              {t('settings.reset.description')}
            </p>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="destructive" 
                  className="font-orbitron"
                >
                  {t('settings.reset.button')}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="glass">
                <AlertDialogHeader>
                  <AlertDialogTitle className="font-orbitron">Konfirmasi Reset</AlertDialogTitle>
                  <AlertDialogDescription>
                    {t('settings.reset.description')}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="font-orbitron">{t('button.cancel')}</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleReset}
                    className="font-orbitron bg-red-600 hover:bg-red-700"
                  >
                    {t('button.confirm')}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
