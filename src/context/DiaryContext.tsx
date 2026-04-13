import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Episode {
  id: string;
  date: string;
  title: string;
  content: string;
  mood: string;
  illustration?: string;
}

interface AvatarConfig {
  name: string;
  hairStyle: string;
  expression: string;
  accessory: string;
}

interface DiaryState {
  onboarded: boolean;
  avatar: AvatarConfig | null;
  episodes: Episode[];
  currentScreen: string;
}

interface DiaryContextType extends DiaryState {
  setOnboarded: (v: boolean) => void;
  setAvatar: (a: AvatarConfig) => void;
  addEpisode: (e: Omit<Episode, 'id'>) => void;
  navigate: (screen: string) => void;
}

const DiaryContext = createContext<DiaryContextType | null>(null);

const sampleEpisodes: Episode[] = [
  {
    id: '1',
    date: 'April 10, 2026',
    title: 'The Great Coffee Disaster',
    content: 'So today I was trying to look cool carrying my coffee AND my laptop AND my phone, and naturally I spilled everything. The barista gave me that "I saw this coming" look. Classic Monday.',
    mood: '😅',
  },
  {
    id: '2',
    date: 'April 9, 2026',
    title: 'Dog Park Adventures',
    content: 'Took Biscuit to the dog park. He immediately found the biggest puddle and rolled in it like a tiny furry hippo. Other dog owners pretended not to judge. I pretended Biscuit wasn\'t mine.',
    mood: '🐕',
  },
  {
    id: '3',
    date: 'April 8, 2026',
    title: 'Cooking "Experiment"',
    content: 'Tried to make that fancy pasta from TikTok. Somehow turned it into soup. Not even good soup. Mom called mid-disaster and said "just order pizza." She knows me too well.',
    mood: '🍝',
  },
];

export function DiaryProvider({ children }: { children: ReactNode }) {
  const [onboarded, setOnboarded] = useState(false);
  const [avatar, setAvatar] = useState<AvatarConfig | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>(sampleEpisodes);
  const [currentScreen, setCurrentScreen] = useState('login');

  const addEpisode = (ep: Omit<Episode, 'id'>) => {
    setEpisodes(prev => [{ ...ep, id: Date.now().toString() }, ...prev]);
  };

  return (
    <DiaryContext.Provider value={{
      onboarded, avatar, episodes, currentScreen,
      setOnboarded, setAvatar, addEpisode,
      navigate: setCurrentScreen,
    }}>
      {children}
    </DiaryContext.Provider>
  );
}

export function useDiary() {
  const ctx = useContext(DiaryContext);
  if (!ctx) throw new Error('useDiary must be used within DiaryProvider');
  return ctx;
}
