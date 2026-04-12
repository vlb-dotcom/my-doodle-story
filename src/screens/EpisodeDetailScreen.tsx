import React from 'react';
import { useDiary, Episode } from '@/context/DiaryContext';
import episodeSample from '@/assets/episode-sample.jpg';
import { StarDoodle, HeartDoodle, DoodleDivider } from '@/components/DoodleDecorations';

export default function EpisodeDetailScreen({ episodeId }: { episodeId: string }) {
  const { episodes, navigate } = useDiary();
  const episode = episodes.find(e => e.id === episodeId);

  if (!episode) {
    return (
      <div className="mobile-frame flex items-center justify-center paper-texture min-h-screen">
        <p className="font-hand text-pencil">Episode not found 😢</p>
      </div>
    );
  }

  return (
    <div className="mobile-frame flex flex-col px-5 py-6 paper-texture min-h-screen relative">
      <StarDoodle className="absolute top-10 right-4 text-primary opacity-20 animate-float" />

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => navigate('notebook')} className="font-hand text-primary text-sm">
          ← Notebook
        </button>
        <span className="text-2xl">{episode.mood}</span>
        <div className="w-16" />
      </div>

      {/* Page */}
      <div className="notebook-page p-5 flex-1">
        <div className="pl-10">
          <p className="font-hand text-xs text-muted-foreground mb-1">{episode.date}</p>
          <h1 className="font-caveat text-3xl text-pencil mb-4 sketch-underline">
            {episode.title}
          </h1>

          {/* Illustration */}
          <div className="tape my-5">
            <img
              src={episodeSample}
              alt="Episode illustration"
              loading="lazy"
              width={800}
              height={600}
              className="w-full rounded-md border-2 border-pencil/20 shadow-md"
            />
          </div>

          <DoodleDivider />

          {/* Story text */}
          <div
            className="font-body text-sm text-pencil/85 leading-[31px] mt-4"
            style={{
              backgroundImage: 'repeating-linear-gradient(transparent, transparent 30px, hsl(210 30% 80% / 0.3) 30px, hsl(210 30% 80% / 0.3) 31px)',
            }}
          >
            {episode.content}
          </div>

          {/* Footer doodle */}
          <div className="flex justify-center mt-8 opacity-30">
            <HeartDoodle className="text-eraser" />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 mt-4">
        <button onClick={() => navigate('home')} className="btn-doodle flex-1">
          🏠 Home
        </button>
        <button onClick={() => navigate('new-episode')} className="btn-doodle btn-doodle-primary flex-1">
          ✏️ New Episode
        </button>
      </div>
    </div>
  );
}
