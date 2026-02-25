import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useGetStories } from '../hooks/useQueries';
import { useUserPreferences } from '../hooks/useUserPreferences';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import StoryCard from '../components/StoryCard';
import { Skeleton } from '@/components/ui/skeleton';
import { BookOpen, Search, Crown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { getStoryTitle, getStorySummary } from '../lib/storyUtils';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: stories, isLoading, isError } = useGetStories();
  const { preferredLanguage, isPremium } = useUserPreferences();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStories = stories?.filter((story) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const title = getStoryTitle(story, preferredLanguage).toLowerCase();
    const summary = getStorySummary(story, preferredLanguage).toLowerCase();
    return title.includes(q) || summary.includes(q);
  });

  return (
    <div className="min-h-full">
      {/* Hero Banner */}
      <div className="relative h-48 sm:h-64 overflow-hidden">
        <img
          src="/assets/generated/dashboard-hero.dim_1200x400.png"
          alt="History Tales Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sepia-900/40 via-sepia-900/50 to-background" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-sepia-100 drop-shadow-lg mb-2">
            Chronicles of History
          </h1>
          <div className="flex items-center gap-3">
            <div className="h-px w-12 bg-gold/60" />
            <span className="text-gold text-sm">✦</span>
            <div className="h-px w-12 bg-gold/60" />
          </div>
          <p className="text-sepia-200 text-sm mt-2 font-light">
            Discover stories that shaped civilizations
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Premium Banner */}
        {!isPremium && (
          <div
            className="mb-6 rounded-xl border border-gold/30 bg-gradient-to-r from-primary/5 to-gold/5 p-4 flex items-center justify-between gap-4 cursor-pointer hover:border-gold/50 transition-colors"
            onClick={() => navigate({ to: '/subscription' })}
          >
            <div className="flex items-center gap-3">
              <Crown className="h-5 w-5 text-gold flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-foreground">Unlock Premium Features</p>
                <p className="text-xs text-muted-foreground">Read Aloud, ad-free experience & exclusive content</p>
              </div>
            </div>
            <span className="text-xs font-bold text-gold border border-gold/40 rounded-full px-3 py-1 flex-shrink-0">
              Upgrade
            </span>
          </div>
        )}

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search stories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-card border-border"
          />
        </div>

        {/* Section Header */}
        <div className="flex items-center gap-3 mb-5">
          <BookOpen className="h-5 w-5 text-gold" />
          <h2 className="font-serif text-xl font-semibold text-foreground">
            {searchQuery ? 'Search Results' : 'All Stories'}
          </h2>
          {stories && (
            <span className="text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5">
              {filteredStories?.length ?? 0}
            </span>
          )}
        </div>

        {/* Stories Grid */}
        {isLoading && (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-lg border border-border p-5">
                <div className="flex gap-4">
                  <Skeleton className="w-12 h-12 rounded-lg flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Failed to load stories. Please try again.</p>
          </div>
        )}

        {!isLoading && !isError && filteredStories && filteredStories.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-muted-foreground font-medium">
              {searchQuery ? 'No stories match your search.' : 'No stories available yet.'}
            </p>
          </div>
        )}

        {!isLoading && filteredStories && filteredStories.length > 0 && (
          <div className="space-y-3">
            {filteredStories.map((story, index) => (
              <StoryCard
                key={index}
                story={story}
                index={index}
                language={preferredLanguage}
                onClick={() => navigate({ to: '/story/$id', params: { id: String(index) } })}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
