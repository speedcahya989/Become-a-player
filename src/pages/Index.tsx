
import React, { useState } from 'react';
import PlayerProfile from '../components/PlayerProfile';
import QuestBoard from '../components/QuestBoard';
import BuffDebuffStatus from '../components/BuffDebuffStatus';
import ShopTabs from '../components/ShopTabs';
import StatsPanel from '../components/StatsPanel';
import Settings from '../components/Settings';
import QuestSettings from '../components/QuestSettings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const [activeTab, setActiveTab] = useState('quests');

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
                BECOME A PLAYER
              </h1>
              <p className="text-muted-foreground mt-1">Tingkatkan Diri Dengan Quest</p>
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
                <TabsTrigger value="quests" className="font-orbitron text-xs">Quest</TabsTrigger>
                <TabsTrigger value="shop" className="font-orbitron text-xs">Toko</TabsTrigger>
                <TabsTrigger value="stats" className="font-orbitron text-xs">Stats</TabsTrigger>
                <TabsTrigger value="achievements" className="font-orbitron text-xs">Prestasi</TabsTrigger>
                <TabsTrigger value="quest-settings" className="font-orbitron text-xs">Pengaturan</TabsTrigger>
                <TabsTrigger value="settings" className="font-orbitron text-xs">Setting</TabsTrigger>
              </TabsList>

              <TabsContent value="quests" className="mt-6">
                <QuestBoard />
              </TabsContent>

              <TabsContent value="shop" className="mt-6">
                <ShopTabs />
              </TabsContent>

              <TabsContent value="stats" className="mt-6">
                <StatsPanel />
              </TabsContent>

              <TabsContent value="achievements" className="mt-6">
                <div className="glass rounded-lg p-6">
                  <h3 className="text-xl font-orbitron font-bold mb-4">Sistem Prestasi</h3>
                  <p className="text-muted-foreground">Sistem prestasi akan segera hadir...</p>
                </div>
              </TabsContent>

              <TabsContent value="quest-settings" className="mt-6">
                <QuestSettings />
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
