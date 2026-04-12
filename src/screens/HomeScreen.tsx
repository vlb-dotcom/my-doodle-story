import React from 'react';
import { useDiary } from '@/context/DiaryContext';
import defaultAvatar from '@/assets/default-avatar.png';
import { StarDoodle, HeartDoodle, DoodleDivider } from '@/components/DoodleDecorations';

export default function HomeScreen() {
  const { avatar, episodes, navigate } = useDiary();
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  const latestEpisode = episodes[0];

  return (
    <div className="mobile-frame flex flex-col px-5 py-6 paper-texture min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="font-caveat text-2xl text-pencil leading-tight">
            Hey, {avatar?.name || 'Doodler'}! {avatar?.expression}
          </h1>
          <p className="font-hand text-sm text-muted-foreground">{today}</p>
        </div>
        <div className="w-12 h-12 rounded-full bg-card border-2 border-pencil overflow-hidden shadow-md">
          <img src={defaultAvatar} alt="avatar" width={48} height={48} className="object-contain" />
        </div>
      </div>

      {/* Today prompt - sticky note */}
      <div className="sticky-note sticky-note-yellow mb-6 p-5">
        <h2 className="font-caveat text-xl text-pencil mb-1">
          ✏️ What happened today?
        </h2>
        <p className="font-body text-sm text-pencil/70 mb-4">
          Tell me about your day and I'll turn it into a doodle episode!
        </p>
        <button
          onClick={() => navigate('new-episode')}
          className="btn-doodle btn-doodle-primary"
        >
          + New Episode
        </button>
      </div>

      <DoodleDivider />

      {/* Latest episode - sticky note */}
      {latestEpisode && (
        <button
          onClick={() => navigate(`episode-${latestEpisode.id}`)}
          className="sticky-note sticky-note-blue w-full text-left p-5 mb-4 hover:rotate-[0.5deg] transition-transform"
        >
          <h3 className="font-caveat text-lg text-pencil mb-2 flex items-center gap-2">
            <StarDoodle className="text-primary w-4 h-4" />
            Latest Episode
          </h3>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">{latestEpisode.mood}</span>
            <h4 className="font-hand text-base text-pencil">{latestEpisode.title}</h4>
          </div>
          <p className="font-body text-xs text-pencil/50 mb-1">{latestEpisode.date}</p>
          <p className="font-body text-sm text-pencil/80 line-clamp-2">{latestEpisode.content}</p>
        </button>
      )}

      {/* Quick actions */}
      <div className="mt-auto pt-4 flex gap-3">
        <button
          onClick={() => navigate('notebook')}
          className="btn-doodle flex-1 flex items-center justify-center gap-2"
        >
          📖 My Notebook
        </button>
        <button
          onClick={() => navigate('avatar')}
          className="btn-doodle flex items-center justify-center"
        >
          ✨
        </button>
      </div>
    </div>
  );
}
