
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Languages, Volume2, Bell, AlertTriangle, RotateCcw, Info, CheckCircle, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

  const features = [
    t('about.feature.quest'),
    t('about.feature.leveling'),
    t('about.feature.rewards'),
    t('about.feature.buffs'),
    t('about.feature.ai'),
    t('about.feature.multilingual'),
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-orbitron font-bold hologram-text mb-2 flex items-center justify-center gap-3">
          <Languages className="w-8 h-8 text-primary" />
          {t('settings.title')}
        </h2>
        <p className="text-muted-foreground">{t('settings.subtitle')}</p>
      </div>

      <Tabs defaultValue="settings" className="w-full">
        <TabsList className="grid w-full grid-cols-2 glass mb-4">
          <TabsTrigger value="settings" className="font-orbitron transition-all duration-200 hover:scale-105">{t('settings.title')}</TabsTrigger>
          <TabsTrigger value="about" className="font-orbitron transition-all duration-200 hover:scale-105">{t('about.title')}</TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="animate-slide-in space-y-6">
          {/* Language Settings */}
          <Card className="glass border-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="font-orbitron flex items-center gap-2">
                <Languages className="w-5 h-5 text-blue-400" />
                {t('settings.language')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{t('settings.language.description')}</p>
              
              <div className="flex gap-3">
                <Button
                  variant={language === 'id' ? 'default' : 'outline'}
                  onClick={() => setLanguage('id')}
                  className="font-orbitron flex-1 h-12"
                  size="lg"
                >
                  🇮🇩 {t('settings.language.indonesian')}
                </Button>
                <Button
                  variant={language === 'en' ? 'default' : 'outline'}
                  onClick={() => setLanguage('en')}
                  className="font-orbitron flex-1 h-12"
                  size="lg"
                >
                  🇺🇸 {t('settings.language.english')}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Audio Settings */}
          <Card className="glass border-green-500/20 shadow-lg">
            <CardHeader>
              <CardTitle className="font-orbitron flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-green-400" />
                {t('settings.audio')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{t('settings.audio.description')}</p>
              
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/10 border border-muted/20">
                <div className="flex items-center gap-3">
                  <Volume2 className="w-5 h-5 text-green-400" />
                  <div>
                    <span className="font-medium">{t('status.sound')}</span>
                    <Badge 
                      variant="outline" 
                      className={`ml-2 ${soundEnabled ? 'text-green-400 border-green-400/30 bg-green-400/10' : 'text-red-400 border-red-400/30 bg-red-400/10'}`}
                    >
                      {soundEnabled ? t('settings.active') : t('settings.inactive')}
                    </Badge>
                  </div>
                </div>
                <Switch
                  checked={soundEnabled}
                  onCheckedChange={setSoundEnabled}
                  className="data-[state=checked]:bg-green-500"
                />
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="glass border-yellow-500/20 shadow-lg">
            <CardHeader>
              <CardTitle className="font-orbitron flex items-center gap-2">
                <Bell className="w-5 h-5 text-yellow-400" />
                {t('settings.notifications')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{t('settings.notifications.description')}</p>
              
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/10 border border-muted/20">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-yellow-400" />
                  <div>
                    <span className="font-medium">{t('status.notifications')}</span>
                    <Badge 
                      variant="outline" 
                      className={`ml-2 ${notificationsEnabled ? 'text-green-400 border-green-400/30 bg-green-400/10' : 'text-red-400 border-red-400/30 bg-red-400/10'}`}
                    >
                      {notificationsEnabled ? t('settings.active') : t('settings.inactive')}
                    </Badge>
                  </div>
                </div>
                <Switch
                  checked={notificationsEnabled}
                  onCheckedChange={setNotificationsEnabled}
                  className="data-[state=checked]:bg-yellow-500"
                />
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="glass border-red-500/30 shadow-lg shadow-red-500/10">
            <CardHeader>
              <CardTitle className="font-orbitron text-red-400 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                {t('settings.danger')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <div className="flex items-start gap-3">
                  <RotateCcw className="w-5 h-5 text-red-400 mt-1" />
                  <div className="flex-1">
                    <h4 className="font-orbitron font-bold mb-2 text-red-400">{t('settings.reset')}</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      {t('settings.reset.description')}
                    </p>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="destructive" 
                          className="font-orbitron bg-red-600 hover:bg-red-700 border-red-500"
                          size="lg"
                        >
                          <RotateCcw className="w-4 h-4 mr-2" />
                          {t('settings.reset.button')}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="glass border-red-500/30">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="font-orbitron text-red-400 flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5" />
                            Konfirmasi Reset
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-muted-foreground">
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
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about" className="animate-slide-in space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-orbitron font-bold hologram-text mb-2 flex items-center justify-center gap-3">
              <Info className="w-8 h-8 text-primary" />
              {t('about.title')}
            </h2>
            <p className="text-muted-foreground">{t('about.subtitle')}</p>
          </div>

          {/* Description Card */}
          <Card className="glass border-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="font-orbitron flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Become A Player
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {t('about.description')}
              </p>
            </CardContent>
          </Card>

          {/* Features Card */}
          <Card className="glass border-green-500/20 shadow-lg">
            <CardHeader>
              <CardTitle className="font-orbitron flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                {t('about.features')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/10 border border-muted/20">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Version & Credits Card */}
          <Card className="glass border-purple-500/20 shadow-lg">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                    {t('about.version')} 1.0.0
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t('about.developer')}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
