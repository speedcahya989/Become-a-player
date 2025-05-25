
import React, { useState } from 'react';
import CharacterProfile from '../components/CharacterProfile';
import QuestBoard from '../components/QuestBoard';
import BuffDebuffStatus from '../components/BuffDebuffStatus';
import Shop from '../components/Shop';
import StatsPanel from '../components/StatsPanel';
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
                RPG LIFE
              </h1>
              <p className="text-muted-foreground mt-1">Level up your real life</p>
            </div>
            <BuffDebuffStatus />
          </div>
        </header>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Character Profile - Left Sidebar */}
          <div className="lg:col-span-1">
            <CharacterProfile />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 glass">
                <TabsTrigger value="quests" className="font-orbitron">Quests</TabsTrigger>
                <TabsTrigger value="shop" className="font-orbitron">Shop</TabsTrigger>
                <TabsTrigger value="stats" className="font-orbitron">Stats</TabsTrigger>
                <TabsTrigger value="achievements" className="font-orbitron">Achievements</TabsTrigger>
              </TabsList>

              <TabsContent value="quests" className="mt-6">
                <QuestBoard />
              </TabsContent>

              <TabsContent value="shop" className="mt-6">
                <Shop />
              </TabsContent>

              <TabsContent value="stats" className="mt-6">
                <StatsPanel />
              </TabsContent>

              <TabsContent value="achievements" className="mt-6">
                <div className="glass rounded-lg p-6">
                  <h3 className="text-xl font-orbitron font-bold mb-4">Achievements</h3>
                  <p className="text-muted-foreground">Achievement system coming soon...</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar - Quick Stats */}
          <div className="lg:col-span-1">
            <div className="glass rounded-lg p-4 mb-4">
              <h3 className="font-orbitron font-bold mb-3">Quick Stats</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Today's XP</span>
                  <span className="text-primary font-bold">+250</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Gold Earned</span>
                  <span className="text-yellow-400 font-bold">+150</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Quests Done</span>
                  <span className="text-green-400 font-bold">5/8</span>
                </div>
              </div>
            </div>

            <div className="glass rounded-lg p-4">
              <h3 className="font-orbitron font-bold mb-3">Daily Summary</h3>
              <div className="text-sm text-muted-foreground">
                <p>Great progress today! You're on track to reach your weekly goals.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
