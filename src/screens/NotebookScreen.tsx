import React, { useState, useMemo } from 'react';
import { useDiary } from '@/context/DiaryContext';
import episodeSample from '@/assets/episode-sample.jpg';
import { StarDoodle, HeartDoodle, SwirlDoodle } from '@/components/DoodleDecorations';

export default function NotebookScreen() {
  const { episodes, navigate } = useDiary();
  const [currentPage, setCurrentPage] = useState(0);
  const [flipping, setFlipping] = useState<'next' | 'prev' | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Get unique moods from episodes
  const uniqueMoods = useMemo(() => {
    const moods = [...new Set(episodes.map(ep => ep.mood))];
    return moods;
  }, [episodes]);

  // Filter episodes
  const filteredEpisodes = useMemo(() => {
    let result = episodes;
    if (selectedMood) {
      result = result.filter(ep => ep.mood === selectedMood);
    }
    return result;
  }, [episodes, selectedMood]);

  const totalPages = filteredEpisodes.length;
  const goToPage = (direction: 'next' | 'prev') => {
    const target = direction === 'next' ? currentPage + 1 : currentPage - 1;
    if (target < 0 || target >= totalPages) return;
    setFlipping(direction);
    setTimeout(() => {
      setCurrentPage(target);
      setFlipping(null);
    }, 400);
  };

  const episode = filteredEpisodes[currentPage];

  return (
    <div className="mobile-frame flex flex-col items-center justify-center min-h-screen px-4 py-6"
      style={{ background: 'linear-gradient(135deg, hsl(25 15% 22%), hsl(25 20% 16%))' }}
    >
      {/* Back button */}
      <button
        onClick={() => navigate('home')}
        className="absolute top-5 left-5 font-hand text-sm z-20"
        style={{ color: 'hsl(43 30% 75%)' }}
      >
        ← Back
      </button>

      {/* Filter toggle button */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="absolute top-5 right-5 font-hand text-sm z-20 px-3 py-1.5 rounded-full transition-all"
        style={{
          color: showFilters ? 'hsl(25 60% 48%)' : 'hsl(43 30% 75%)',
          background: showFilters ? 'hsl(40 35% 90%)' : 'hsl(25 25% 25% / 0.5)',
          border: `1.5px dashed ${showFilters ? 'hsl(25 60% 48% / 0.5)' : 'hsl(25 20% 40% / 0.3)'}`,
          transform: showFilters ? 'rotate(-2deg)' : 'rotate(0deg)',
        }}
      >
        🔍 Filter
      </button>

      {/* Filter panel */}
      {showFilters && (
        <div
          className="absolute top-14 right-4 z-30 p-3 rounded-xl font-hand"
          style={{
            background: 'hsl(42 38% 94%)',
            border: '2px dashed hsl(25 40% 60% / 0.4)',
            boxShadow: '3px 3px 0 hsl(25 30% 30% / 0.15), 0 4px 12px hsl(25 20% 10% / 0.2)',
            transform: 'rotate(0.5deg)',
            maxWidth: '240px',
          }}
        >
          {/* Tape decoration */}
          <div
            className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-14 h-4 rounded-sm z-10"
            style={{
              background: 'hsl(50 80% 80% / 0.7)',
              transform: 'rotate(-1deg)',
              boxShadow: '0 1px 2px hsl(25 20% 30% / 0.1)',
            }}
          />

          <p className="text-xs mb-2" style={{ color: 'hsl(25 15% 50%)' }}>
            ✨ Filter by mood:
          </p>

          <div className="flex flex-wrap gap-1.5">
            {/* All button */}
            <button
              onClick={() => { setSelectedMood(null); setCurrentPage(0); }}
              className="px-2.5 py-1 rounded-full text-xs transition-all"
              style={{
                background: !selectedMood ? 'hsl(25 60% 48%)' : 'hsl(40 30% 88%)',
                color: !selectedMood ? 'hsl(40 35% 96%)' : 'hsl(25 20% 35%)',
                border: `1.5px solid ${!selectedMood ? 'hsl(25 60% 40%)' : 'hsl(30 20% 75%)'}`,
                transform: !selectedMood ? 'scale(1.05) rotate(-1deg)' : 'scale(1)',
                boxShadow: !selectedMood ? '0 2px 4px hsl(25 60% 48% / 0.3)' : 'none',
              }}
            >
              All ✏️
            </button>
            {uniqueMoods.map(mood => (
              <button
                key={mood}
                onClick={() => { setSelectedMood(mood === selectedMood ? null : mood); setCurrentPage(0); }}
                className="px-2.5 py-1 rounded-full text-lg transition-all"
                style={{
                  background: selectedMood === mood ? 'hsl(25 60% 48%)' : 'hsl(40 30% 88%)',
                  border: `1.5px solid ${selectedMood === mood ? 'hsl(25 60% 40%)' : 'hsl(30 20% 75%)'}`,
                  transform: selectedMood === mood ? 'scale(1.15) rotate(-2deg)' : 'scale(1)',
                  boxShadow: selectedMood === mood ? '0 2px 6px hsl(25 60% 48% / 0.3)' : 'none',
                }}
              >
                {mood}
              </button>
            ))}
          </div>

          {selectedMood && (
            <p className="text-[10px] mt-2 italic" style={{ color: 'hsl(25 15% 55%)' }}>
              📖 {filteredEpisodes.length} episode{filteredEpisodes.length !== 1 ? 's' : ''} found
            </p>
          )}
        </div>
      )}

      {episode ? (
        <div className="w-full max-w-[380px] flex flex-col items-center gap-4">
          {/* The Book */}
          <div className="relative w-full" style={{ perspective: '1200px' }}>
            {/* Book shadow on the "desk" */}
            <div
              className="absolute -bottom-3 left-4 right-4 h-6 rounded-[50%] blur-xl opacity-50"
              style={{ background: 'hsl(25 20% 8%)' }}
            />

            <div
              className="relative rounded-r-lg rounded-l-sm overflow-hidden"
              style={{
                minHeight: '480px',
                background: 'hsl(40 35% 93%)',
                boxShadow: `
                  -6px 0 0 hsl(25 30% 32%),
                  -8px 0 0 hsl(25 25% 28%),
                  -9px 1px 0 hsl(25 20% 24%),
                  -10px 2px 0 hsl(25 20% 20%),
                  4px 4px 12px hsl(25 20% 8% / 0.5),
                  8px 8px 24px hsl(25 20% 8% / 0.3)
                `,
                border: '1px solid hsl(30 20% 78% / 0.5)',
                transformStyle: 'preserve-3d',
                transform: 'rotateY(-2deg)',
              }}
            >
              {/* Book spine edge with stitching */}
              <div
                className="absolute left-0 top-0 bottom-0 w-10 z-10"
                style={{
                  background: 'linear-gradient(to right, hsl(25 40% 30%), hsl(25 35% 38%) 40%, hsl(40 30% 88%) 100%)',
                  borderRight: '1px solid hsl(30 20% 70% / 0.5)',
                }}
              >
                {/* Stitching dots */}
                <div className="absolute right-2 top-4 bottom-4 flex flex-col justify-between items-center">
                  {[...Array(16)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 h-1 rounded-full"
                      style={{ background: 'hsl(25 30% 55% / 0.6)' }}
                    />
                  ))}
                </div>
              </div>

              {/* Page edges visible on right side */}
              <div
                className="absolute right-0 top-2 bottom-2 w-[3px] z-10"
                style={{
                  background: 'repeating-linear-gradient(to bottom, hsl(40 30% 90%), hsl(40 30% 90%) 2px, hsl(40 25% 85%) 2px, hsl(40 25% 85%) 4px)',
                  borderRadius: '0 2px 2px 0',
                }}
              />

              {/* Page content area */}
              <div
                className={`ml-10 mr-1 h-full flex flex-col p-5 relative ${
                  flipping === 'next'
                    ? 'animate-page-flip-out'
                    : flipping === 'prev'
                    ? 'animate-page-flip-in'
                    : ''
                }`}
                style={{
                  minHeight: '460px',
                  backgroundImage: `
                    repeating-linear-gradient(
                      transparent,
                      transparent 30px,
                      hsl(210 25% 78% / 0.2) 30px,
                      hsl(210 25% 78% / 0.2) 31px
                    )
                  `,
                  backgroundColor: 'hsl(42 38% 94%)',
                }}
              >
                {/* Red margin line */}
                <div
                  className="absolute left-4 top-0 bottom-0 w-[1.5px]"
                  style={{ background: 'hsl(0 50% 65% / 0.35)' }}
                />

                {/* Three hole punches */}
                <div className="absolute left-1 top-0 bottom-0 flex flex-col justify-around items-center py-12">
                  {[0, 1, 2].map(i => (
                    <div
                      key={i}
                      className="w-3 h-3 rounded-full"
                      style={{
                        background: 'hsl(25 30% 30%)',
                        boxShadow: 'inset 0 1px 2px hsl(25 20% 15% / 0.5)',
                      }}
                    />
                  ))}
                </div>

                {/* Date & page number */}
                <div className="flex items-center justify-between mb-2 ml-6 mr-1">
                  <span className="font-hand text-xs" style={{ color: 'hsl(25 15% 55%)' }}>
                    {episode.date}
                  </span>
                  <span className="font-hand text-xs italic" style={{ color: 'hsl(25 15% 60%)' }}>
                    pg. {currentPage + 1} / {totalPages}
                  </span>
                </div>

                {/* Mood & Title */}
                <div className="ml-6 mb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{episode.mood}</span>
                    <h2 className="font-caveat text-2xl leading-tight" style={{ color: 'hsl(25 20% 25%)' }}>
                      {episode.title}
                    </h2>
                  </div>
                  {/* Hand-drawn underline */}
                  <svg width="100%" height="6" className="ml-0 opacity-40">
                    <path
                      d="M0 4 Q30 0, 60 3 T120 2 T180 4 T240 2"
                      fill="none"
                      stroke="hsl(25 60% 48%)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                {/* Episode illustration — taped photo effect */}
                <div className="ml-6 mb-3 relative">
                  {/* Tape strips */}
                  <div
                    className="absolute -top-2 left-4 w-12 h-4 z-10 rounded-sm"
                    style={{
                      background: 'hsl(50 80% 80% / 0.65)',
                      transform: 'rotate(-3deg)',
                      boxShadow: '0 1px 2px hsl(25 20% 30% / 0.1)',
                    }}
                  />
                  <div
                    className="absolute -top-2 right-6 w-10 h-4 z-10 rounded-sm"
                    style={{
                      background: 'hsl(50 80% 80% / 0.65)',
                      transform: 'rotate(2deg)',
                      boxShadow: '0 1px 2px hsl(25 20% 30% / 0.1)',
                    }}
                  />
                  <img
                    src={episode.illustration || episodeSample}
                    alt={episode.title}
                    loading="lazy"
                    className="w-full h-32 object-cover rounded"
                    style={{
                      border: '3px solid hsl(40 30% 96%)',
                      boxShadow: '0 2px 8px hsl(25 20% 20% / 0.15)',
                      transform: 'rotate(0.5deg)',
                    }}
                  />
                </div>

                {/* Episode text */}
                <div className="ml-6 flex-1 overflow-y-auto pr-1">
                  <p
                    className="font-body text-sm leading-[31px]"
                    style={{ color: 'hsl(25 18% 30% / 0.85)' }}
                  >
                    {episode.content}
                  </p>
                </div>

                {/* Bottom corner doodle */}
                <div className="flex justify-end mt-2 mr-2 opacity-25">
                  <HeartDoodle className="w-4 h-4" style={{ color: 'hsl(340 50% 65%)' }} />
                </div>
              </div>
            </div>

            {/* Book cover corners (leather/hardcover feel) */}
            <div
              className="absolute top-0 right-0 w-5 h-5 z-20"
              style={{
                background: 'linear-gradient(135deg, transparent 50%, hsl(25 30% 28%) 50%)',
                borderRadius: '0 8px 0 0',
              }}
            />
            <div
              className="absolute bottom-0 right-0 w-5 h-5 z-20"
              style={{
                background: 'linear-gradient(225deg, transparent 50%, hsl(25 30% 28%) 50%)',
                borderRadius: '0 0 8px 0',
              }}
            />
          </div>

          {/* Page navigation */}
          <div className="flex items-center justify-between w-full mt-2 px-1">
            <button
              onClick={() => goToPage('prev')}
              disabled={currentPage === 0 || flipping !== null}
              className="font-hand text-sm px-4 py-2 rounded-lg transition-all disabled:opacity-20"
              style={{
                color: 'hsl(43 30% 85%)',
                background: 'hsl(25 25% 25% / 0.5)',
                border: '1px solid hsl(25 20% 40% / 0.3)',
              }}
            >
              ◂ Prev
            </button>

            {/* Page dots */}
            <div className="flex items-center gap-1.5">
              {filteredEpisodes.map((_, i) => (
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
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === currentPage ? '10px' : '6px',
                    height: i === currentPage ? '10px' : '6px',
                    background: i === currentPage ? 'hsl(25 60% 48%)' : 'hsl(43 30% 55%)',
                    boxShadow: i === currentPage ? '0 0 6px hsl(25 60% 48% / 0.5)' : 'none',
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => goToPage('next')}
              disabled={currentPage === totalPages - 1 || flipping !== null}
              className="font-hand text-sm px-4 py-2 rounded-lg transition-all disabled:opacity-20"
              style={{
                color: 'hsl(43 30% 85%)',
                background: 'hsl(25 25% 25% / 0.5)',
                border: '1px solid hsl(25 20% 40% / 0.3)',
              }}
            >
              Next ▸
            </button>
          </div>

          {/* Tap to read full */}
          <button
            onClick={() => navigate(`episode-${episode.id}`)}
            className="font-hand text-sm underline decoration-dotted underline-offset-4 transition-opacity hover:opacity-100 opacity-70"
            style={{ color: 'hsl(43 30% 75%)' }}
          >
            ✨ Tap to read full episode
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="text-5xl animate-float">📖</div>
          <p className="font-caveat text-xl" style={{ color: 'hsl(43 30% 80%)' }}>
            Your diary is empty...
          </p>
          <button onClick={() => navigate('new-episode')} className="btn-doodle btn-doodle-primary">
            ✏️ Write your first episode
          </button>
        </div>
      )}
    </div>
  );
}
