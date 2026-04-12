import React, { useState, useEffect } from 'react';
import writingPencil from '@/assets/writing-pencil.png';

const messages = [
  'Opening your diary...',
  'Picking up the pencil...',
  'Sketching your day...',
  'Adding some doodles...',
  'Almost done! ✨',
];

export default function ProcessingScreen() {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMsgIndex(prev => (prev < messages.length - 1 ? prev + 1 : prev));
    }, 600);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mobile-frame flex flex-col items-center justify-center px-6 paper-texture min-h-screen">
      {/* Pencil animation */}
      <div className="animate-wiggle mb-8">
        <img src={writingPencil} alt="Writing..." width={160} height={160} className="drop-shadow-md" />
      </div>

      {/* Progress line */}
      <div className="w-48 h-1 bg-muted rounded-full mb-6 overflow-hidden">
        <div className="h-full bg-primary rounded-full animate-pencil-write" />
      </div>

      {/* Message */}
      <p className="font-caveat text-2xl text-pencil text-center animate-pulse">
        {messages[msgIndex]}
      </p>
      <p className="font-body text-xs text-muted-foreground mt-2">
        Turning your words into art...
      </p>
    </div>
  );
}
