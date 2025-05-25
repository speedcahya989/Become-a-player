
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import QuestCard from './QuestCard';

const QuestBoard = () => {
  const [quests] = useState({
    daily: [
      {
        id: 1,
        title: "Olahraga Pagi",
        description: "Selesaikan aktivitas fisik selama 30 menit",
        xpReward: 50,
        goldReward: 25,
        timeLeft: "6j 30m",
        status: "active" as const,
        difficulty: "Mudah" as const,
        statBonus: "STR +1"
      },
      {
        id: 2,
        title: "Baca 20 Halaman",
        description: "Baca minimal 20 halaman buku apapun",
        xpReward: 40,
        goldReward: 20,
        timeLeft: "12j 15m",
        status: "active" as const,
        difficulty: "Mudah" as const,
        statBonus: "INT +1"
      },
      {
        id: 3,
        title: "Meditasi",
        description: "10 menit meditasi mindfulness",
        xpReward: 35,
        goldReward: 15,
        timeLeft: "8j 45m",
        status: "completed" as const,
        difficulty: "Mudah" as const,
        statBonus: "WIS +1"
      }
    ],
    weekly: [
      {
        id: 4,
        title: "Pelajari Skill Baru",
        description: "Habiskan 3 jam mempelajari sesuatu yang baru",
        xpReward: 200,
        goldReward: 100,
        timeLeft: "3h 12j",
        status: "active" as const,
        difficulty: "Sedang" as const,
        statBonus: "INT +3"
      },
      {
        id: 5,
        title: "Koneksi Sosial",
        description: "Bercakap bermakna dengan 3 orang",
        xpReward: 150,
        goldReward: 75,
        timeLeft: "5h 8j",
        status: "active" as const,
        difficulty: "Sedang" as const,
        statBonus: "CHA +2"
      }
    ],
    main: [
      {
        id: 6,
        title: "Kuasai Programming",
        description: "Selesaikan kursus programming lanjutan",
        xpReward: 1000,
        goldReward: 500,
        timeLeft: "Tanpa batas",
        status: "active" as const,
        difficulty: "Sulit" as const,
        statBonus: "INT +10, DEX +5"
      }
    ],
    event: [
      {
        id: 7,
        title: "Resolusi Tahun Baru",
        description: "Tetapkan dan rencanakan tujuan untuk tahun ini",
        xpReward: 300,
        goldReward: 150,
        timeLeft: "2h 6j",
        status: "active" as const,
        difficulty: "Sedang" as const,
        statBonus: "WIS +5"
      }
    ]
  });

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-orbitron font-bold hologram-text mb-2">Papan Quest</h2>
        <p className="text-muted-foreground">Pilih jalur menuju kehebatan</p>
      </div>

      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="grid w-full grid-cols-4 glass">
          <TabsTrigger value="daily" className="font-orbitron">Harian</TabsTrigger>
          <TabsTrigger value="weekly" className="font-orbitron">Mingguan</TabsTrigger>
          <TabsTrigger value="main" className="font-orbitron">Utama</TabsTrigger>
          <TabsTrigger value="event" className="font-orbitron">Event</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="mt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-orbitron font-bold">Quest Harian</h3>
              <span className="text-sm text-muted-foreground">Reset dalam 6j 30m</span>
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
              <h3 className="text-xl font-orbitron font-bold">Quest Mingguan</h3>
              <span className="text-sm text-muted-foreground">Reset dalam 3h 12j</span>
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
            <h3 className="text-xl font-orbitron font-bold">Quest Utama</h3>
            <div className="grid gap-4">
              {quests.main.map(quest => (
                <QuestCard key={quest.id} quest={quest} type="main" />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="event" className="mt-6">
          <div className="space-y-4">
            <h3 className="text-xl font-orbitron font-bold">Quest Event</h3>
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
