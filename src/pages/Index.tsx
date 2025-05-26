
import React, { useState } from 'react';
import PlayerProfile from '../components/PlayerProfile';
import QuestBoard from '../components/QuestBoard';
import BuffDebuffStatus from '../components/BuffDebuffStatus';
import ShopTabs from '../components/ShopTabs';
import StatsPanel from '../components/StatsPanel';
import Settings from '../components/Settings';
import AchievementSettings from '../components/AchievementSettings';
import ProgressTracker from '../components/ProgressTracker';
import BuffDebuffList from '../components/BuffDebuffList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '../contexts/LanguageContext';

const Index = () => {
  const [activeTab, setActiveTab] = useState('quests');
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-6">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-orbitron font-black hologram-text animate-glow">
                {t('app.title')}
              </h1>
              <p className="text-muted-foreground mt-1">{t('app.subtitle')}</p>
            </div>
            <BuffDebuffStatus />
          </div>
        </header>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Character Profile - Left Sidebar */}
          <div className="lg:col-span-1">
            <PlayerProfile />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-6 glass">
                <TabsTrigger value="quests" className="font-orbitron text-xs">{t('tab.quest')}</TabsTrigger>
                <TabsTrigger value="shop" className="font-orbitron text-xs">{t('tab.shop')}</TabsTrigger>
                <TabsTrigger value="stats" className="font-orbitron text-xs">{t('tab.stats')}</TabsTrigger>
                <TabsTrigger value="achievements" className="font-orbitron text-xs">{t('tab.achievements')}</TabsTrigger>
                <TabsTrigger value="buffs" className="font-orbitron text-xs">{t('tab.buffs')}</TabsTrigger>
                <TabsTrigger value="settings" className="font-orbitron text-xs">{t('tab.settings')}</TabsTrigger>
              </TabsList>

              <TabsContent value="quests" className="mt-6">
                <QuestBoard />
              </TabsContent>

              <TabsContent value="shop" className="mt-6">
                <ShopTabs />
              </TabsContent>

              <TabsContent value="stats" className="mt-6">
                <Tabs defaultValue="stats" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 glass mb-4">
                    <TabsTrigger value="stats" className="font-orbitron">{t('stats.title')}</TabsTrigger>
                    <TabsTrigger value="progress" className="font-orbitron">{t('stats.progress')}</TabsTrigger>
                  </TabsList>
                  <TabsContent value="stats">
                    <StatsPanel />
                  </TabsContent>
                  <TabsContent value="progress">
                    <ProgressTracker />
                  </TabsContent>
                </Tabs>
              </TabsContent>

              <TabsContent value="achievements" className="mt-6">
                <Tabs defaultValue="achievements" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 glass mb-4">
                    <TabsTrigger value="achievements" className="font-orbitron">Prestasi</TabsTrigger>
                    <TabsTrigger value="achievement-settings" className="font-orbitron">Pengaturan Prestasi</TabsTrigger>
                  </TabsList>
                  <TabsContent value="achievements">
                    <div className="glass rounded-lg p-6">
                      <h3 className="text-xl font-orbitron font-bold mb-4">Sistem Prestasi</h3>
                      <p className="text-muted-foreground">Sistem prestasi akan segera hadir...</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="achievement-settings">
                    <AchievementSettings />
                  </TabsContent>
                </Tabs>
              </TabsContent>

              <TabsContent value="buffs" className="mt-6">
                <BuffDebuffList />
              </TabsContent>

              <TabsContent value="settings" className="mt-6">
                <Settings />
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar - Quick Stats */}
          <div className="lg:col-span-1">
            <div className="glass rounded-lg p-4 mb-4">
              <h3 className="font-orbitron font-bold mb-3">Statistik Cepat</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">XP Hari Ini</span>
                  <span className="text-primary font-bold">+250</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Gold Diperoleh</span>
                  <span className="text-yellow-400 font-bold">+150</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Quest Selesai</span>
                  <span className="text-green-400 font-bold">5/8</span>
                </div>
              </div>
            </div>

            <div className="glass rounded-lg p-4">
              <h3 className="font-orbitron font-bold mb-3">Ringkasan Harian</h3>
              <div className="text-sm text-muted-foreground">
                <p>Progress yang bagus hari ini! Kamu berada di jalur yang tepat untuk mencapai target mingguan.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
