import React from 'react';
import { useDiary } from '@/context/DiaryContext';
import { StarDoodle, SwirlDoodle } from '@/components/DoodleDecorations';

export default function NotebookScreen() {
  const { episodes, navigate } = useDiary();

  return (
    <div className="mobile-frame flex flex-col px-5 py-6 paper-texture min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <button onClick={() => navigate('home')} className="font-hand text-primary text-sm">
          ← Back
        </button>
        <h1 className="font-caveat text-2xl text-pencil flex items-center gap-2">
          📖 My Notebook
        </h1>
        <div className="w-12" />
      </div>

      <p className="font-body text-xs text-muted-foreground text-center mb-5">
        {episodes.length} episode{episodes.length !== 1 ? 's' : ''} and counting...
      </p>

      {/* Episode list as notebook pages */}
      <div className="flex flex-col gap-4 flex-1">
        {episodes.map((ep, i) => (
          <button
            key={ep.id}
            onClick={() => navigate(`episode-${ep.id}`)}
            className="notebook-page p-4 text-left hover:shadow-lg transition-all hover:-translate-y-1 active:translate-y-0"
            style={{ transform: `rotate(${i % 2 === 0 ? '-0.5' : '0.5'}deg)` }}
          >
            <div className="pl-10 flex items-start gap-3">
              <span className="text-2xl mt-1">{ep.mood}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-caveat text-lg text-pencil leading-tight">{ep.title}</h3>
                <p className="font-hand text-xs text-muted-foreground">{ep.date}</p>
                <p className="font-body text-xs text-pencil/70 line-clamp-2 mt-1">{ep.content}</p>
              </div>
              {i === 0 && (
                <span className="sticker bg-highlight text-pencil text-xs shrink-0">New!</span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Decorations */}
      <div className="flex justify-center py-4 opacity-20">
        <SwirlDoodle className="text-pencil" />
        <StarDoodle className="text-primary mx-2" />
        <SwirlDoodle className="text-pencil scale-x-[-1]" />
      </div>
    </div>
  );
}
