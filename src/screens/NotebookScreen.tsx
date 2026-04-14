import React, { useState } from 'react';
import { useDiary } from '@/context/DiaryContext';
import episodeSample from '@/assets/episode-sample.jpg';
import { StarDoodle, HeartDoodle, SwirlDoodle } from '@/components/DoodleDecorations';

export default function NotebookScreen() {
  const { episodes, navigate } = useDiary();
  const [currentPage, setCurrentPage] = useState(0);
  const [flipping, setFlipping] = useState<'next' | 'prev' | null>(null);

  const totalPages = episodes.length;

  const goToPage = (direction: 'next' | 'prev') => {
    const target = direction === 'next' ? currentPage + 1 : currentPage - 1;
    if (target < 0 || target >= totalPages) return;
    setFlipping(direction);
    setTimeout(() => {
      setCurrentPage(target);
      setFlipping(null);
    }, 400);
  };

  const episode = episodes[currentPage];

  return (
    <div className="mobile-frame flex flex-col px-4 py-5 min-h-screen" style={{ backgroundColor: 'hsl(25 40% 35%)' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => navigate('home')} className="font-hand text-sm" style={{ color: 'hsl(43 30% 90%)' }}>
          ← Back
        </button>
        <h1 className="font-caveat text-xl flex items-center gap-2" style={{ color: 'hsl(43 30% 95%)' }}>
          📖 My Diary
        </h1>
        <span className="font-hand text-xs" style={{ color: 'hsl(43 30% 70%)' }}>
          {totalPages} pages
        </span>
      </div>

      {/* Book */}
      {episode ? (
        <div className="flex-1 flex flex-col">
          {/* Book cover frame */}
          <div
            className="relative flex-1 rounded-2xl overflow-hidden"
            style={{
              boxShadow: 'inset 0 0 30px hsl(25 30% 20% / 0.3), 4px 6px 20px hsl(25 20% 10% / 0.4)',
              border: '3px solid hsl(25 30% 28%)',
              background: 'hsl(var(--paper))',
            }}
          >
            {/* Spine decoration */}
            <div
              className="absolute left-0 top-0 bottom-0 w-8 z-10"
              style={{
                background: 'linear-gradient(to right, hsl(25 35% 30%), hsl(25 35% 40%), hsl(25 35% 30%))',
                borderRight: '2px solid hsl(25 30% 25%)',
              }}
            >
              <div className="h-full flex flex-col justify-center items-center gap-3 opacity-40">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-3 h-0.5 rounded-full" style={{ background: 'hsl(43 30% 70%)' }} />
                ))}
              </div>
            </div>

            {/* Page content */}
            <div
              className={`ml-8 h-full flex flex-col p-5 transition-all duration-400 ${
                flipping === 'next'
                  ? 'animate-page-flip-out'
                  : flipping === 'prev'
                  ? 'animate-page-flip-in'
                  : ''
              }`}
              style={{
                backgroundImage:
                  'repeating-linear-gradient(transparent, transparent 30px, hsl(210 30% 80% / 0.25) 30px, hsl(210 30% 80% / 0.25) 31px)',
              }}
            >
              {/* Red margin line */}
              <div
                className="absolute left-12 top-0 bottom-0 w-0.5"
                style={{ background: 'hsl(var(--doodle-red) / 0.35)' }}
              />

              {/* Date & page number header */}
              <div className="flex items-center justify-between mb-3 ml-4">
                <span className="font-hand text-xs text-muted-foreground">{episode.date}</span>
                <span className="font-hand text-xs text-muted-foreground">
                  pg. {currentPage + 1}
                </span>
              </div>

              {/* Mood & Title */}
              <div className="ml-4 mb-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{episode.mood}</span>
                  <h2 className="font-caveat text-2xl text-pencil sketch-underline leading-tight">
                    {episode.title}
                  </h2>
                </div>
              </div>

              {/* Episode illustration */}
              <div className="ml-4 mb-3 tape">
                <img
                  src={episode.illustration || episodeSample}
                  alt={episode.title}
                  loading="lazy"
                  className="w-full h-36 object-cover rounded-lg border-2 border-pencil/20 shadow-md"
                />
              </div>

              {/* Episode text */}
              <div className="ml-4 flex-1 overflow-y-auto">
                <p className="font-body text-sm text-pencil/85 leading-[31px]">
                  {episode.content}
                </p>
              </div>

              {/* Bottom doodle */}
              <div className="flex justify-center mt-3 opacity-20">
                <HeartDoodle className="text-eraser w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Page navigation */}
          <div className="flex items-center justify-between mt-4 px-2">
            <button
              onClick={() => goToPage('prev')}
              disabled={currentPage === 0 || flipping !== null}
              className="btn-doodle text-sm px-4 py-2 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ← Prev
            </button>

            {/* Page dots */}
            <div className="flex items-center gap-1.5">
              {episodes.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (i !== currentPage && !flipping) {
                      setFlipping(i > currentPage ? 'next' : 'prev');
                      setTimeout(() => {
                        setCurrentPage(i);
                        setFlipping(null);
                      }, 400);
                    }
                  }}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    background: i === currentPage ? 'hsl(var(--primary))' : 'hsl(43 30% 70%)',
                    transform: i === currentPage ? 'scale(1.4)' : 'scale(1)',
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => goToPage('next')}
              disabled={currentPage === totalPages - 1 || flipping !== null}
              className="btn-doodle text-sm px-4 py-2 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </div>

          {/* Tap to view detail */}
          <button
            onClick={() => navigate(`episode-${episode.id}`)}
            className="mt-3 font-hand text-sm text-center underline"
            style={{ color: 'hsl(43 30% 80%)' }}
          >
            ✨ Tap to read full episode
          </button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <p className="font-caveat text-xl" style={{ color: 'hsl(43 30% 80%)' }}>
            No episodes yet!
          </p>
          <button onClick={() => navigate('new-episode')} className="btn-doodle btn-doodle-primary">
            ✏️ Write your first episode
          </button>
        </div>
      )}
    </div>
  );
}
