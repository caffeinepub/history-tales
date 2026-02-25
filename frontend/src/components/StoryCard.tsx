import React from 'react';
import { BookOpen, ChevronRight } from 'lucide-react';
import type { Story } from '../backend';
import type { AppLanguage } from '../hooks/useUserPreferences';
import { getStoryTitle, getStorySummary } from '../lib/storyUtils';

interface StoryCardProps {
  story: Story;
  index: number;
  language: AppLanguage;
  onClick: () => void;
}

const CATEGORY_ICONS = ['🏛️', '⚔️', '🌍', '👑', '🗺️', '📜', '🔱', '🏺'];
const CATEGORY_COLORS = [
  'from-amber-900/20 to-amber-700/10',
  'from-red-900/20 to-red-700/10',
  'from-emerald-900/20 to-emerald-700/10',
  'from-purple-900/20 to-purple-700/10',
];

export default function StoryCard({ story, index, language, onClick }: StoryCardProps) {
  const title = getStoryTitle(story, language);
  const summary = getStorySummary(story, language);
  const icon = CATEGORY_ICONS[index % CATEGORY_ICONS.length];

  return (
    <article
      className="story-card cursor-pointer group"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-2xl">
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-serif font-semibold text-lg text-foreground leading-snug mb-1.5 group-hover:text-primary transition-colors line-clamp-2">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
              {summary}
            </p>
          </div>
          <ChevronRight className="flex-shrink-0 h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all mt-1" />
        </div>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="px-5 py-2.5 flex items-center gap-2">
        <BookOpen className="h-3.5 w-3.5 text-gold" />
        <span className="text-xs text-muted-foreground font-medium">Read Story</span>
      </div>
    </article>
  );
}
