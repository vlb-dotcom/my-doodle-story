import React, { useState } from 'react';
import { useDiary } from '@/context/DiaryContext';
import { ArrowDoodle } from '@/components/DoodleDecorations';

const moods = ['😊', '😅', '😢', '😡', '🥳', '😴', '🤔', '❤️', '⭐'];

export default function NewEpisodeScreen() {
  const { navigate, addEpisode } = useDiary();
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('😊');
  const [title, setTitle] = useState('');

  const handleSubmit = () => {
    if (!content.trim()) return;
    navigate('processing');
    
    // Simulate processing
    setTimeout(() => {
      addEpisode({
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        title: title || 'Today\'s Adventure',
        content,
        mood,
      });
      navigate('result');
    }, 3000);
  };

  return (
    <div className="mobile-frame flex flex-col px-5 py-6 paper-texture min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => navigate('home')} className="font-hand text-primary text-sm">
          ← Back
        </button>
        <h1 className="font-caveat text-2xl text-pencil">New Episode</h1>
        <div className="w-12" />
      </div>

      {/* Title */}
      <div className="notebook-page p-4 mb-4">
        <div className="pl-10">
          <label className="font-hand text-sm text-muted-foreground block mb-1">Episode Title (optional):</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Give today a title..."
            className="w-full bg-transparent border-b-2 border-dashed border-muted-foreground/30 font-caveat text-xl text-pencil placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary py-1"
          />
        </div>
      </div>

      {/* Mood */}
      <div className="mb-4">
        <p className="font-hand text-sm text-pencil mb-2">How are you feeling?</p>
        <div className="flex flex-wrap gap-2">
          {moods.map(m => (
            <button
              key={m}
              onClick={() => setMood(m)}
              className={`text-2xl p-2 rounded-full transition-all ${mood === m ? 'bg-highlight scale-110 shadow-md' : 'hover:scale-105'}`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="notebook-page p-4 flex-1 mb-4">
        <div className="pl-10 h-full flex flex-col">
          <label className="font-hand text-sm text-muted-foreground block mb-2">
            Tell me about your day... ✏️
          </label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Today was wild. So first, I woke up late because my alarm decided to take the day off too..."
            className="w-full flex-1 min-h-[180px] bg-transparent font-body text-sm text-pencil placeholder:text-muted-foreground/40 focus:outline-none resize-none leading-[31px]"
            style={{
              backgroundImage: 'repeating-linear-gradient(transparent, transparent 30px, hsl(210 30% 80% / 0.3) 30px, hsl(210 30% 80% / 0.3) 31px)',
            }}
          />
        </div>
      </div>

      {/* Microphone hint */}
      <div className="flex items-center justify-center gap-2 mb-4 opacity-50">
        <ArrowDoodle className="text-muted-foreground w-8" />
        <p className="font-hand text-xs text-muted-foreground">or use your keyboard's voice dictation!</p>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!content.trim()}
        className={`btn-doodle btn-doodle-primary w-full text-lg py-3 ${!content.trim() ? 'opacity-40 cursor-not-allowed' : ''}`}
      >
        Turn into a Doodle! ✨
      </button>
    </div>
  );
}
