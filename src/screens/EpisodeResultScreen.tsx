import React from 'react';
import { useDiary } from '@/context/DiaryContext';
import episodeSample from '@/assets/episode-sample.jpg';
import { StarDoodle, HeartDoodle } from '@/components/DoodleDecorations';

export default function EpisodeResultScreen() {
  const { episodes, navigate } = useDiary();
  const latest = episodes[0];

  if (!latest) return null;

  return (
    <div className="mobile-frame flex flex-col px-5 py-6 paper-texture min-h-screen relative">
      <StarDoodle className="absolute top-8 right-6 text-primary opacity-30 animate-float" />
      <HeartDoodle className="absolute top-16 left-6 text-eraser opacity-25 animate-float" style={{ animationDelay: '1s' }} />

      <h1 className="font-caveat text-3xl text-pencil text-center mb-1">
        Ta-da! ✨
      </h1>
      <p className="font-body text-sm text-muted-foreground text-center mb-5">
        Your doodle episode is ready!
      </p>

      {/* Episode card */}
      <div className="notebook-page p-5 mb-4">
        <div className="pl-10">
          {/* Date & mood */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{latest.mood}</span>
            <div>
              <h2 className="font-caveat text-xl text-pencil">{latest.title}</h2>
              <p className="font-hand text-xs text-muted-foreground">{latest.date}</p>
            </div>
          </div>

          {/* Illustration */}
          <div className="tape my-4">
            <img
              src={episodeSample}
              alt="Episode illustration"
              loading="lazy"
              width={800}
              height={600}
              className="w-full rounded-md border-2 border-pencil/20 shadow-md"
            />
          </div>

          {/* Content */}
          <p className="font-body text-sm text-pencil/80 leading-relaxed">
            {latest.content}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-auto">
        <button onClick={() => navigate('home')} className="btn-doodle flex-1">
          🏠 Home
        </button>
        <button onClick={() => navigate('notebook')} className="btn-doodle btn-doodle-primary flex-1">
          📖 Notebook
        </button>
      </div>
    </div>
  );
}
