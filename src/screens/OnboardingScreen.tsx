import React from 'react';
import { useDiary } from '@/context/DiaryContext';
import notebookCover from '@/assets/notebook-cover.png';
import { StarDoodle, HeartDoodle } from '@/components/DoodleDecorations';

export default function OnboardingScreen() {
  const { navigate } = useDiary();

  return (
    <div className="mobile-frame flex flex-col items-center justify-center px-6 paper-texture min-h-screen relative overflow-hidden">
      {/* Floating decorations */}
      <StarDoodle className="absolute top-12 left-6 text-primary opacity-30 animate-float" />
      <HeartDoodle className="absolute top-20 right-8 text-eraser opacity-25 animate-float" style={{ animationDelay: '1s' }} />
      <StarDoodle className="absolute bottom-32 left-10 text-doodle-blue opacity-20 animate-float" style={{ animationDelay: '0.5s' }} />
      <HeartDoodle className="absolute bottom-40 right-6 text-primary opacity-20 animate-float" style={{ animationDelay: '1.5s' }} />

      {/* Notebook cover image */}
      <div className="animate-wiggle mb-6">
        <img
          src={notebookCover}
          alt="My Doodle Diary"
          width={280}
          height={360}
          className="drop-shadow-xl rounded-lg"
        />
      </div>

      {/* Tagline */}
      <p className="font-hand text-lg text-pencil text-center mb-2 max-w-[280px]">
        Your life, but in doodles ✨
      </p>
      <p className="font-body text-sm text-muted-foreground text-center mb-8 max-w-[260px]">
        Turn your everyday moments into illustrated diary episodes. It's like your life became a comic book!
      </p>

      {/* CTA */}
      <button
        onClick={() => navigate('avatar')}
        className="btn-doodle btn-doodle-primary text-lg px-8 py-3"
      >
        Open My Diary ✏️
      </button>

      <p className="font-hand text-xs text-muted-foreground mt-4 opacity-60">
        ~ no artistic talent required ~
      </p>
    </div>
  );
}
