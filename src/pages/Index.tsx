import React from 'react';
import { DiaryProvider, useDiary } from '@/context/DiaryContext';
import OnboardingScreen from '@/screens/OnboardingScreen';
import AvatarScreen from '@/screens/AvatarScreen';
import HomeScreen from '@/screens/HomeScreen';
import NewEpisodeScreen from '@/screens/NewEpisodeScreen';
import ProcessingScreen from '@/screens/ProcessingScreen';
import EpisodeResultScreen from '@/screens/EpisodeResultScreen';
import NotebookScreen from '@/screens/NotebookScreen';
import EpisodeDetailScreen from '@/screens/EpisodeDetailScreen';

function DiaryApp() {
  const { currentScreen } = useDiary();

  if (currentScreen === 'onboarding') return <OnboardingScreen />;
  if (currentScreen === 'avatar') return <AvatarScreen />;
  if (currentScreen === 'home') return <HomeScreen />;
  if (currentScreen === 'new-episode') return <NewEpisodeScreen />;
  if (currentScreen === 'processing') return <ProcessingScreen />;
  if (currentScreen === 'result') return <EpisodeResultScreen />;
  if (currentScreen === 'notebook') return <NotebookScreen />;
  if (currentScreen.startsWith('episode-')) {
    const id = currentScreen.replace('episode-', '');
    return <EpisodeDetailScreen episodeId={id} />;
  }

  return <OnboardingScreen />;
}

const Index = () => (
  <DiaryProvider>
    <DiaryApp />
  </DiaryProvider>
);

export default Index;
