import React from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import { useGetStories } from '../hooks/useQueries';
import { useUserPreferences } from '../hooks/useUserPreferences';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import { getStoryTitle, getStoryContent, getStorySummary } from '../lib/storyUtils';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ArrowLeft, Volume2, VolumeX, Crown, BookOpen } from 'lucide-react';
import { useNavigate as useNav } from '@tanstack/react-router';

export default function StoryDetailPage() {
  const { id } = useParams({ from: '/app/story/$id' });
  const navigate = useNavigate();
  const { data: stories, isLoading } = useGetStories();
  const { preferredLanguage, isPremium } = useUserPreferences();
  const { speak, stop, isSpeaking, isSupported } = useTextToSpeech();

  const storyIndex = parseInt(id, 10);
  const story = stories?.[storyIndex];

  const title = story ? getStoryTitle(story, preferredLanguage) : '';
  const content = story ? getStoryContent(story, preferredLanguage) : '';
  const summary = story ? getStorySummary(story, preferredLanguage) : '';

  const handleReadAloud = () => {
    if (isSpeaking) {
      stop();
    } else {
      speak(content, preferredLanguage);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Skeleton className="h-8 w-32 mb-6" />
        <Skeleton className="h-10 w-3/4 mb-4" />
        <Skeleton className="h-5 w-full mb-2" />
        <Skeleton className="h-5 w-5/6 mb-8" />
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="container mx-auto px-4 py-16 text-center max-w-3xl">
        <BookOpen className="h-16 w-16 text-muted-foreground/40 mx-auto mb-4" />
        <h2 className="font-serif text-2xl font-bold text-foreground mb-2">Story Not Found</h2>
        <p className="text-muted-foreground mb-6">This story doesn't exist or has been removed.</p>
        <Button onClick={() => navigate({ to: '/dashboard' })} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Stories
        </Button>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Back Button */}
        <button
          onClick={() => navigate({ to: '/dashboard' })}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
          <span className="text-sm font-medium">Back to Stories</span>
        </button>

        {/* Story Header */}
        <article>
          <header className="mb-8">
            <div className="flex items-start justify-between gap-4 mb-4">
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground leading-tight flex-1">
                {title}
              </h1>

              {/* Read Aloud Button */}
              {isSupported && (
                isPremium ? (
                  <Button
                    onClick={handleReadAloud}
                    variant={isSpeaking ? 'destructive' : 'outline'}
                    size="sm"
                    className="flex-shrink-0 gap-2"
                  >
                    {isSpeaking ? (
                      <>
                        <VolumeX className="h-4 w-4" />
                        Stop
                      </>
                    ) : (
                      <>
                        <Volume2 className="h-4 w-4" />
                        Read Aloud
                      </>
                    )}
                  </Button>
                ) : (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-shrink-0 gap-2 opacity-70 cursor-pointer"
                        onClick={() => navigate({ to: '/subscription' })}
                      >
                        <Crown className="h-4 w-4 text-gold" />
                        Read Aloud
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="max-w-xs">
                      <p className="text-sm">
                        <strong>Premium feature.</strong> Upgrade to listen to stories read aloud in your language.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                )
              )}
            </div>

            {/* Ornamental divider */}
            <div className="ornament-divider">
              <span className="ornament-divider-symbol">✦</span>
            </div>

            {/* Summary */}
            <p className="text-muted-foreground text-lg leading-relaxed italic font-serif">
              {summary}
            </p>
          </header>

          {/* Story Content */}
          <div className="prose prose-stone dark:prose-invert max-w-none">
            <div className="text-foreground leading-relaxed text-base space-y-4">
              {content.split('\n\n').map((paragraph, i) => (
                <p key={i} className="leading-8">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="mt-10 pt-6 border-t border-border flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => navigate({ to: '/dashboard' })}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              All Stories
            </Button>

            {!isPremium && (
              <Button
                onClick={() => navigate({ to: '/subscription' })}
                className="gap-2 bg-primary text-primary-foreground"
              >
                <Crown className="h-4 w-4" />
                Upgrade to Premium
              </Button>
            )}
          </div>
        </article>
      </div>
    </TooltipProvider>
  );
}
