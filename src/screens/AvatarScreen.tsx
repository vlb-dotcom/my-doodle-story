import React, { useState } from 'react';
import { useDiary } from '@/context/DiaryContext';
import defaultAvatar from '@/assets/default-avatar.png';
import { StarDoodle } from '@/components/DoodleDecorations';

const hairStyles = ['Messy', 'Curly', 'Straight', 'Spiky', 'Ponytail'];
const expressions = ['😊', '😎', '🤓', '😄', '🥰'];
const accessories = ['None', 'Glasses', 'Hat', 'Bow', 'Headband'];

export default function AvatarScreen() {
  const { navigate, setAvatar, setOnboarded } = useDiary();
  const [name, setName] = useState('');
  const [hair, setHair] = useState('Messy');
  const [expression, setExpression] = useState('😊');
  const [accessory, setAccessory] = useState('None');

  const handleDone = () => {
    setAvatar({ name: name || 'Doodler', hairStyle: hair, expression, accessory });
    setOnboarded(true);
    navigate('home');
  };

  return (
    <div className="mobile-frame flex flex-col px-6 py-8 paper-texture min-h-screen">
      <h1 className="font-caveat text-3xl text-pencil text-center mb-1">
        Create Your Doodle Self!
      </h1>
      <p className="font-body text-sm text-muted-foreground text-center mb-6">
        This is how you'll appear in your diary episodes
      </p>

      {/* Avatar preview */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="w-36 h-36 rounded-full bg-card border-[3px] border-pencil flex items-center justify-center overflow-hidden shadow-lg">
            <img src={defaultAvatar} alt="Your avatar" width={120} height={120} className="object-contain" />
          </div>
          <span className="absolute -bottom-2 -right-2 text-3xl">{expression}</span>
          <StarDoodle className="absolute -top-3 -left-3 text-primary opacity-50 animate-wiggle" />
        </div>
      </div>

      {/* Name */}
      <div className="notebook-page p-4 mb-4">
        <label className="font-hand text-base text-pencil block mb-2 pl-12">Your name:</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="What should we call you?"
          className="w-full bg-transparent border-b-2 border-dashed border-muted-foreground/30 font-hand text-lg text-pencil placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary pl-12 py-1"
        />
      </div>

      {/* Hair style */}
      <div className="mb-4">
        <p className="font-hand text-base text-pencil mb-2">Hair style:</p>
        <div className="flex flex-wrap gap-2">
          {hairStyles.map(h => (
            <button
              key={h}
              onClick={() => setHair(h)}
              className={`sticker transition-all ${hair === h ? 'bg-primary text-primary-foreground scale-105' : 'bg-card text-pencil border border-border'}`}
            >
              {h}
            </button>
          ))}
        </div>
      </div>

      {/* Expression */}
      <div className="mb-4">
        <p className="font-hand text-base text-pencil mb-2">Default expression:</p>
        <div className="flex gap-3">
          {expressions.map(e => (
            <button
              key={e}
              onClick={() => setExpression(e)}
              className={`text-2xl p-2 rounded-full transition-all ${expression === e ? 'bg-highlight scale-110 shadow-md' : 'hover:scale-105'}`}
            >
              {e}
            </button>
          ))}
        </div>
      </div>

      {/* Accessory */}
      <div className="mb-8">
        <p className="font-hand text-base text-pencil mb-2">Accessory:</p>
        <div className="flex flex-wrap gap-2">
          {accessories.map(a => (
            <button
              key={a}
              onClick={() => setAccessory(a)}
              className={`sticker transition-all ${accessory === a ? 'bg-secondary text-secondary-foreground scale-105' : 'bg-card text-pencil border border-border'}`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      {/* Continue */}
      <button onClick={handleDone} className="btn-doodle btn-doodle-primary w-full text-lg py-3 mt-auto">
        That's Me! →
      </button>
    </div>
  );
}
