import React, { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';

export default function SplashScreen() {
  const navigate = useNavigate();
  const { identity, isInitializing } = useInternetIdentity();

  useEffect(() => {
    // Wait for auth to initialize, then redirect after 3 seconds
    const timer = setTimeout(() => {
      if (identity) {
        navigate({ to: '/dashboard' });
      } else {
        navigate({ to: '/login' });
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [identity, navigate]);

  // If still initializing, wait a bit longer before redirecting
  useEffect(() => {
    if (!isInitializing) return;
    // Reset handled by the main timer
  }, [isInitializing]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url('/assets/generated/splash-bg.dim_1200x800.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-sepia-900/60" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 animate-fade-up px-6 text-center">
        {/* Logo */}
        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gold/60 shadow-gold">
          <img
            src="/assets/generated/history-tales-logo.dim_256x256.png"
            alt="History Tales Logo"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="font-serif text-5xl font-bold text-sepia-100 tracking-wide drop-shadow-lg">
            History Tales
          </h1>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gold/60" />
            <span className="text-gold text-lg">✦</span>
            <div className="h-px w-16 bg-gold/60" />
          </div>
          <p className="text-sepia-300 text-lg font-light tracking-widest uppercase">
            Stories Across Time
          </p>
        </div>

        {/* Loading indicator */}
        <div className="flex gap-1.5 mt-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-gold/70 animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>

      {/* Bottom attribution */}
      <div className="absolute bottom-6 left-0 right-0 text-center">
        <p className="text-sepia-400 text-sm font-light tracking-wider">
          Explore the world's greatest stories
        </p>
      </div>
    </div>
  );
}
