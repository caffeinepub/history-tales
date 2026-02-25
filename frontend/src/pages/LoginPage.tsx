import React from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { BookOpen, Shield, Globe, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FEATURES = [
  {
    icon: BookOpen,
    title: 'Rich Historical Stories',
    desc: 'Explore curated tales from civilizations across the globe',
  },
  {
    icon: Globe,
    title: 'Multilingual Content',
    desc: 'Read in English, Hindi, or Gujarati',
  },
  {
    icon: Headphones,
    title: 'Read Aloud (Premium)',
    desc: 'Listen to stories narrated in your language',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    desc: 'Your data is stored on-chain with Internet Identity',
  },
];

export default function LoginPage() {
  const { login, identity, isLoggingIn, isLoginError, loginError } = useInternetIdentity();
  const navigate = useNavigate();

  useEffect(() => {
    if (identity) {
      navigate({ to: '/dashboard' });
    }
  }, [identity, navigate]);

  return (
    <div
      className="min-h-screen flex flex-col lg:flex-row"
      style={{
        backgroundImage: `url('/assets/generated/splash-bg.dim_1200x800.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-sepia-900/70" />

      {/* Left Panel — Branding */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-8 lg:p-16 text-center lg:text-left">
        <div className="max-w-md">
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gold/60 shadow-gold">
              <img
                src="/assets/generated/history-tales-logo.dim_256x256.png"
                alt="History Tales"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="font-serif text-3xl font-bold text-sepia-100">History Tales</h1>
          </div>

          <p className="text-sepia-200 text-xl font-light leading-relaxed mb-8">
            Journey through the ages. Discover the stories that shaped our world.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3 text-left">
                <div className="flex-shrink-0 w-8 h-8 rounded-md bg-gold/20 border border-gold/30 flex items-center justify-center">
                  <Icon className="h-4 w-4 text-gold" />
                </div>
                <div>
                  <p className="text-sepia-100 text-sm font-semibold">{title}</p>
                  <p className="text-sepia-400 text-xs mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel — Login */}
      <div className="relative z-10 flex items-center justify-center p-8 lg:p-16">
        <div className="w-full max-w-sm">
          <div className="bg-card/95 backdrop-blur-sm rounded-2xl border border-border shadow-parchment p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="ornament-divider mb-4">
                <span className="ornament-divider-symbol">✦</span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
                Welcome Back
              </h2>
              <p className="text-muted-foreground text-sm">
                Sign in to continue your historical journey
              </p>
            </div>

            {/* Login Button */}
            <Button
              onClick={login}
              disabled={isLoggingIn}
              className="w-full h-12 text-base font-semibold gap-3 bg-primary hover:bg-primary/90 text-primary-foreground shadow-gold"
            >
              {isLoggingIn ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Shield className="h-5 w-5" />
                  Sign in with Internet Identity
                </>
              )}
            </Button>

            {isLoginError && (
              <p className="mt-3 text-center text-sm text-destructive">
                {loginError?.message || 'Login failed. Please try again.'}
              </p>
            )}

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-xs text-muted-foreground text-center leading-relaxed">
                Internet Identity provides secure, anonymous authentication without passwords or personal data.
              </p>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-sepia-400 mt-4">
            Built with{' '}
            <span className="text-red-400">♥</span>{' '}
            using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== 'undefined' ? window.location.hostname : 'history-tales'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
