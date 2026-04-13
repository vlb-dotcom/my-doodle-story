import React, { useState } from 'react';
import { useDiary } from '@/context/DiaryContext';
import { StarDoodle, HeartDoodle, SwirlDoodle } from '@/components/DoodleDecorations';
import doodleCover from '@/assets/doodle-diary-cover.png';

export default function LoginScreen() {
  const { navigate } = useDiary();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = () => {
    // Mock: just navigate to onboarding/home
    navigate(isSignUp ? 'onboarding' : 'home');
  };

  return (
    <div className="mobile-frame paper-texture min-h-screen flex flex-col items-center justify-center px-6 py-10 relative overflow-hidden">
      {/* Decorations */}
      <div className="absolute top-8 right-8 opacity-40">
        <StarDoodle />
      </div>
      <div className="absolute bottom-16 left-6 opacity-30">
        <HeartDoodle />
      </div>
      <div className="absolute top-24 left-10 opacity-20">
        <SwirlDoodle />
      </div>

      {/* Logo / Title */}
      <div className="text-center mb-8 animate-float">
        <img src={doodleCover} alt="My Doodle Diary" className="w-36 h-auto mx-auto mb-3 rounded-lg shadow-lg" />
        <p className="text-muted-foreground mt-2" style={{ fontFamily: 'var(--font-hand)' }}>
          Your magical personal notebook ✨
        </p>
      </div>

      {/* Card */}
      <div className="notebook-page w-full max-w-sm p-6 pl-14 relative">
        {/* Tab switcher */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setIsSignUp(false)}
            className={`flex-1 py-2 rounded-lg text-base transition-all ${
              !isSignUp
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-muted text-muted-foreground'
            }`}
            style={{ fontFamily: 'var(--font-hand)' }}
          >
            Log In
          </button>
          <button
            onClick={() => setIsSignUp(true)}
            className={`flex-1 py-2 rounded-lg text-base transition-all ${
              isSignUp
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-muted text-muted-foreground'
            }`}
            style={{ fontFamily: 'var(--font-hand)' }}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-sm text-muted-foreground mb-1" style={{ fontFamily: 'var(--font-hand)' }}>
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="What should we call you?"
                className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                style={{ fontFamily: 'var(--font-body)' }}
              />
            </div>
          )}

          <div>
            <label className="block text-sm text-muted-foreground mb-1" style={{ fontFamily: 'var(--font-hand)' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              style={{ fontFamily: 'var(--font-body)' }}
            />
          </div>

          <div>
            <label className="block text-sm text-muted-foreground mb-1" style={{ fontFamily: 'var(--font-hand)' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="shhh... it's a secret 🤫"
              className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              style={{ fontFamily: 'var(--font-body)' }}
            />
          </div>

          {!isSignUp && (
            <button
              className="text-sm text-primary hover:underline block ml-auto"
              style={{ fontFamily: 'var(--font-hand)' }}
            >
              Forgot password? 🤔
            </button>
          )}

          <button
            onClick={handleSubmit}
            className="btn-doodle btn-doodle-primary w-full text-lg mt-2"
          >
            {isSignUp ? "Let's Go! 🎉" : 'Open My Diary 📖'}
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-hand)' }}>
            or continue with
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Social buttons */}
        <div className="flex gap-3">
          <button className="btn-doodle flex-1 flex items-center justify-center gap-2 text-sm">
            <span className="text-lg">🍎</span> Apple
          </button>
          <button className="btn-doodle flex-1 flex items-center justify-center gap-2 text-sm">
            <span className="text-lg">🔵</span> Google
          </button>
        </div>
      </div>

      {/* Footer */}
      <p className="text-xs text-muted-foreground mt-6 text-center" style={{ fontFamily: 'var(--font-hand)' }}>
        By continuing, you agree to our doodle terms 📝
      </p>
    </div>
  );
}
