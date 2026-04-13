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

      {/* Today prompt card */}
      <div className="notebook-page p-5 mb-5">
        <div className="pl-10">
          <h2 className="font-caveat text-xl text-pencil mb-1">
            ✏️ What happened today?
          </h2>
          <p className="font-body text-sm text-muted-foreground mb-4">
            Tell me about your day and I'll turn it into a doodle episode!
          </p>
          <button
            onClick={() => navigate('new-episode')}
            className="btn-doodle btn-doodle-primary"
          >
            + New Episode
          </button>
        </div>
      </div>

      {/* Streak / Activity */}
      <div className="doodle-border rounded-xl bg-card/60 px-4 py-3 mb-5 flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <span className="text-base animate-wiggle inline-block">🔥</span>
          <div>
            <span className="font-caveat text-base text-pencil font-bold">{Math.min(episodes.length, 3)}-day streak</span>
          </div>
        </div>
        <span className="font-body text-pencil/30">·</span>
        <div className="flex items-center gap-1.5">
          <span className="text-base">📝</span>
          <span className="font-hand text-sm text-pencil">{episodes.length} episodes</span>
        </div>
        <span className="font-body text-pencil/30">·</span>
        <div className="flex items-center gap-1.5">
          <span className="text-base">📅</span>
          <span className="font-hand text-sm text-muted-foreground">{episodes.length > 0 ? 'yesterday' : 'never'}</span>
        </div>
      </div>

      <DoodleDivider />

      {/* Latest episode preview */}
      {latestEpisode && (
        <div className="mb-4">
          <h3 className="font-caveat text-lg text-pencil mb-3 flex items-center gap-2">
            <StarDoodle className="text-primary w-4 h-4" />
            Latest Episode
          </h3>
          <button
            onClick={() => navigate(`episode-${latestEpisode.id}`)}
            className="w-full text-left notebook-page p-4 hover:shadow-lg transition-shadow"
          >
            <div className="pl-10">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{latestEpisode.mood}</span>
                <h4 className="font-hand text-base text-pencil">{latestEpisode.title}</h4>
              </div>
              <p className="font-body text-xs text-muted-foreground mb-1">{latestEpisode.date}</p>
              <p className="font-body text-sm text-pencil/80 line-clamp-2">{latestEpisode.content}</p>
            </div>
          </button>
        </div>
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
