import { useGetCallerUserProfile, useUpdateUserProfile } from './useQueries';

export type AppLanguage = 'en' | 'hi' | 'gu';

export function useUserPreferences() {
  const profileQuery = useGetCallerUserProfile();
  const updateMutation = useUpdateUserProfile();

  const preferredLanguage = (profileQuery.data?.preferredLanguage ?? 'en') as AppLanguage;
  const isPremium = profileQuery.data?.isPremium ?? false;

  const setLanguage = (lang: AppLanguage) => {
    updateMutation.mutate({ preferredLanguage: lang, isPremium });
  };

  const upgradeToPremium = () => {
    updateMutation.mutate({ preferredLanguage, isPremium: true });
  };

  return {
    preferredLanguage,
    isPremium,
    setLanguage,
    upgradeToPremium,
    isLoading: profileQuery.isLoading,
    isFetched: profileQuery.isFetched,
    isUpdating: updateMutation.isPending,
  };
}
