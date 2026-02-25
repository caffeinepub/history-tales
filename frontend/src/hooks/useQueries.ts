import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Story, UserProfile } from '../backend';

// ─── Stories ────────────────────────────────────────────────────────────────

export function useGetStories() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Story[]>({
    queryKey: ['stories'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getStories();
    },
    enabled: !!actor && !actorFetching,
    staleTime: 5 * 60 * 1000,
  });
}

// ─── User Profile ────────────────────────────────────────────────────────────

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useUpdateUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      preferredLanguage,
      isPremium,
    }: {
      preferredLanguage: string;
      isPremium: boolean;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateUserProfile(preferredLanguage, isPremium);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}
