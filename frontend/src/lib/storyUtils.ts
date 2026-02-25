import type { Story, MultilingualContent } from '../backend';
import type { AppLanguage } from '../hooks/useUserPreferences';

export function getLocalizedText(content: MultilingualContent, lang: AppLanguage): string {
  if (lang === 'hi' && content.hindi) return content.hindi;
  if (lang === 'gu' && content.gujarati) return content.gujarati;
  return content.english || '';
}

export function getStoryTitle(story: Story, lang: AppLanguage): string {
  return getLocalizedText(story.title, lang);
}

export function getStorySummary(story: Story, lang: AppLanguage): string {
  return getLocalizedText(story.summary, lang);
}

export function getStoryContent(story: Story, lang: AppLanguage): string {
  return getLocalizedText(story.content, lang);
}

export function getStoryIndex(stories: Story[], index: number): Story | undefined {
  return stories[index];
}
