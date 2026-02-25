import React from 'react';
import { useUserPreferences, type AppLanguage } from '../hooks/useUserPreferences';
import { Button } from '@/components/ui/button';

const LANGUAGES: { code: AppLanguage; label: string; native: string }[] = [
  { code: 'en', label: 'EN', native: 'English' },
  { code: 'hi', label: 'HI', native: 'हिन्दी' },
  { code: 'gu', label: 'GU', native: 'ગુજરાતી' },
];

export default function LanguageSelector() {
  const { preferredLanguage, setLanguage, isUpdating } = useUserPreferences();

  return (
    <div className="flex items-center gap-1 rounded-md border border-border bg-muted/50 p-0.5">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          disabled={isUpdating}
          title={lang.native}
          className={`
            px-2.5 py-1 rounded text-xs font-bold tracking-wider transition-all duration-200
            ${
              preferredLanguage === lang.code
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
