import React, { useState } from 'react';
import { useDiary } from '@/context/DiaryContext';
import { StarDoodle, HeartDoodle, SwirlDoodle, DoodleDivider } from '@/components/DoodleDecorations';
import defaultAvatar from '@/assets/default-avatar.png';

export default function AccountScreen() {
  const { avatar, episodes, navigate } = useDiary();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const stats = [
    { label: 'Episodes', value: episodes.length, emoji: '📝' },
    { label: 'Streak', value: '5 days', emoji: '🔥' },
    { label: 'Joined', value: 'Apr 2026', emoji: '📅' },
  ];

  const menuItems = [
    { label: 'Edit My Avatar', emoji: '🎨', action: () => navigate('avatar') },
    { label: 'My Notebook', emoji: '📓', action: () => navigate('notebook') },
    { label: 'Export Diary', emoji: '📤', action: () => {} },
    { label: 'Diary Reminders', emoji: '⏰', action: () => {} },
    { label: 'Help & Support', emoji: '💬', action: () => {} },
    { label: 'About Doodle Diary', emoji: '✨', action: () => {} },
  ];

  return (
    <div className="mobile-frame paper-texture min-h-screen pb-10 relative">
      {/* Decorations */}
      <div className="absolute top-6 right-6 opacity-30"><StarDoodle /></div>
      <div className="absolute top-40 left-4 opacity-20"><SwirlDoodle /></div>

      {/* Header */}
      <div className="px-5 pt-6 pb-2 flex items-center justify-between">
        <button
          onClick={() => navigate('home')}
          className="btn-doodle px-3 py-1 text-sm"
        >
          ← Back
        </button>
        <h2 className="text-xl text-foreground" style={{ fontFamily: 'var(--font-caveat)' }}>
          My Account
        </h2>
        <div className="w-16" />
      </div>

      {/* Profile card */}
      <div className="mx-5 mt-4 notebook-page p-5 pl-14 flex flex-col items-center text-center relative">
        <div className="relative mb-3">
          <img
            src={defaultAvatar}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-3 border-primary bg-card shadow-md"
          />
          <div className="absolute -bottom-1 -right-1 text-2xl">
            {avatar?.expression || '😊'}
          </div>
        </div>
        <h3
          className="text-2xl text-foreground font-bold"
          style={{ fontFamily: 'var(--font-caveat)' }}
        >
          {avatar?.name || 'Doodler'}
        </h3>
        <p className="text-sm text-muted-foreground" style={{ fontFamily: 'var(--font-hand)' }}>
          Chief Doodle Officer 🖊️
        </p>

        {/* Stats */}
        <div className="flex gap-6 mt-4 w-full justify-center">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <div className="text-lg">{s.emoji}</div>
              <div className="text-lg font-bold text-foreground" style={{ fontFamily: 'var(--font-caveat)' }}>
                {s.value}
              </div>
              <div className="text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-hand)' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Toggles */}
      <div className="mx-5 mt-5 notebook-page p-4 pl-14 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground flex items-center gap-2" style={{ fontFamily: 'var(--font-hand)' }}>
            🌙 Dark Mode
          </span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-12 h-7 rounded-full border-2 border-border relative transition-colors ${
              darkMode ? 'bg-primary' : 'bg-muted'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-background shadow-sm absolute top-0.5 transition-transform ${
                darkMode ? 'translate-x-5' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground flex items-center gap-2" style={{ fontFamily: 'var(--font-hand)' }}>
            🔔 Daily Reminders
          </span>
          <button
            onClick={() => setNotifications(!notifications)}
            className={`w-12 h-7 rounded-full border-2 border-border relative transition-colors ${
              notifications ? 'bg-primary' : 'bg-muted'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-background shadow-sm absolute top-0.5 transition-transform ${
                notifications ? 'translate-x-5' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Menu */}
      <div className="mx-5 mt-5 notebook-page p-4 pl-14 space-y-1">
        {menuItems.map((item, i) => (
          <button
            key={i}
            onClick={item.action}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left hover:bg-muted/60 transition-colors"
          >
            <span className="text-lg">{item.emoji}</span>
            <span className="text-sm text-foreground" style={{ fontFamily: 'var(--font-hand)' }}>
              {item.label}
            </span>
          </button>
        ))}
      </div>

      <DoodleDivider />

      {/* Log out */}
      <div className="mx-5 mt-2">
        <button
          onClick={() => navigate('login')}
          className="btn-doodle w-full text-center"
          style={{ color: 'hsl(var(--doodle-red))' }}
        >
          Log Out 👋
        </button>
      </div>

      <div className="flex justify-center mt-4 opacity-30">
        <HeartDoodle />
      </div>

      <p className="text-center text-xs text-muted-foreground mt-2" style={{ fontFamily: 'var(--font-hand)' }}>
        Made with ❤️ and doodles v1.0
      </p>
    </div>
  );
}
