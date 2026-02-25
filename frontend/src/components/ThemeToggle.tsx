import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export default function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onToggle}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="h-9 w-9"
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-gold" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  );
}
