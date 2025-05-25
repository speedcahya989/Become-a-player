import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import QuestCard from './QuestCard';

const QuestBoard = () => {
  const [quests] = useState({
    daily: [
      {
        id: 1,
        title: "Morning Exercise",
        description: "Complete 30 minutes of physical activity",
        xpReward: 50,
        goldReward: 25,
        timeLeft: "6h 30m",
        status: "active" as const,
        difficulty: "Easy" as const,
        statBonus: "STR +1"
      },
      {
        id: 2,
        title: "Read 20 Pages",
        description: "Read at least 20 pages of any book",
        xpReward: 40,
        goldReward: 20,
        timeLeft: "12h 15m",
        status: "active" as const,
        difficulty: "Easy" as const,
        statBonus: "INT +1"
      },
      {
        id: 3,
        title: "Meditate",
        description: "10 minutes of mindfulness meditation",
        xpReward: 35,
        goldReward: 15,
        timeLeft: "8h 45m",
        status: "completed" as const,
        difficulty: "Easy" as const,
        statBonus: "WIS +1"
      }
    ],
    weekly: [
      {
        id: 4,
        title: "Learn New Skill",
        description: "Spend 3 hours learning something new",
        xpReward: 200,
        goldReward: 100,
        timeLeft: "3d 12h",
        status: "active" as const,
        difficulty: "Medium" as const,
        statBonus: "INT +3"
      },
      {
        id: 5,
        title: "Social Connection",
        description: "Have meaningful conversation with 3 people",
        xpReward: 150,
        goldReward: 75,
        timeLeft: "5d 8h",
        status: "active" as const,
        difficulty: "Medium" as const,
        statBonus: "CHA +2"
      }
    ],
    main: [
      {
        id: 6,
        title: "Master Programming",
        description: "Complete advanced programming course",
        xpReward: 1000,
        goldReward: 500,
        timeLeft: "No limit",
        status: "active" as const,
        difficulty: "Hard" as const,
        statBonus: "INT +10, DEX +5"
      }
    ],
    event: [
      {
        id: 7,
        title: "New Year Resolution",
        description: "Set and plan your goals for the year",
        xpReward: 300,
        goldReward: 150,
        timeLeft: "2d 6h",
        status: "active" as const,
        difficulty: "Medium" as const,
        statBonus: "WIS +5"
      }
    ]
  });

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-orbitron font-bold hologram-text mb-2">Quest Board</h2>
        <p className="text-muted-foreground">Choose your path to greatness</p>
      </div>

      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="grid w-full grid-cols-4 glass">
          <TabsTrigger value="daily" className="font-orbitron">Daily</TabsTrigger>
          <TabsTrigger value="weekly" className="font-orbitron">Weekly</TabsTrigger>
          <TabsTrigger value="main" className="font-orbitron">Main</TabsTrigger>
          <TabsTrigger value="event" className="font-orbitron">Event</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="mt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-orbitron font-bold">Daily Quests</h3>
              <span className="text-sm text-muted-foreground">Resets in 6h 30m</span>
            </div>
            <div className="grid gap-4">
              {quests.daily.map(quest => (
                <QuestCard key={quest.id} quest={quest} type="daily" />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="weekly" className="mt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-orbitron font-bold">Weekly Quests</h3>
              <span className="text-sm text-muted-foreground">Resets in 3d 12h</span>
            </div>
            <div className="grid gap-4">
              {quests.weekly.map(quest => (
                <QuestCard key={quest.id} quest={quest} type="weekly" />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="main" className="mt-6">
          <div className="space-y-4">
            <h3 className="text-xl font-orbitron font-bold">Main Quests</h3>
            <div className="grid gap-4">
              {quests.main.map(quest => (
                <QuestCard key={quest.id} quest={quest} type="main" />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="event" className="mt-6">
          <div className="space-y-4">
            <h3 className="text-xl font-orbitron font-bold">Event Quests</h3>
            <div className="grid gap-4">
              {quests.event.map(quest => (
                <QuestCard key={quest.id} quest={quest} type="event" />
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QuestBoard;
