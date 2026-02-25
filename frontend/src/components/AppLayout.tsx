import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from '@tanstack/react-router';
import { BookOpen, Crown, Menu, X } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import ThemeToggle from './ThemeToggle';
import LogoutButton from './LogoutButton';
import { Button } from '@/components/ui/button';

export default function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else if (saved === 'light') {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-sm shadow-xs">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => navigate({ to: '/dashboard' })}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden border border-gold/40 shadow-gold">
                <img
                  src="/assets/generated/history-tales-logo.dim_256x256.png"
                  alt="History Tales"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-serif font-bold text-lg text-foreground group-hover:text-primary transition-colors hidden sm:block">
                History Tales
              </span>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              <button
                onClick={() => navigate({ to: '/dashboard' })}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  isActive('/dashboard')
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                Stories
              </button>
              <button
                onClick={() => navigate({ to: '/subscription' })}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  isActive('/subscription')
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Crown className="h-3.5 w-3.5" />
                Premium
              </button>
            </nav>

            {/* Right Controls */}
            <div className="flex items-center gap-2">
              <LanguageSelector />
              <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
              <div className="hidden sm:block">
                <LogoutButton variant="ghost" showLabel={false} />
              </div>
              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden h-9 w-9"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card px-4 py-3 space-y-1">
            <button
              onClick={() => { navigate({ to: '/dashboard' }); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              Stories
            </button>
            <button
              onClick={() => { navigate({ to: '/subscription' }); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-muted transition-colors flex items-center gap-2"
            >
              <Crown className="h-4 w-4 text-gold" />
              Premium
            </button>
            <div className="pt-1 border-t border-border">
              <LogoutButton variant="ghost" showLabel={true} />
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/80 py-6 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4 text-gold" />
              <span className="font-serif">History Tales</span>
              <span>·</span>
              <span>© {new Date().getFullYear()}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Built with{' '}
              <span className="text-destructive">♥</span>{' '}
              using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== 'undefined' ? window.location.hostname : 'history-tales'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
