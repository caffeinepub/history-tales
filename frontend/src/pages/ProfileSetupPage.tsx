import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useSaveCallerUserProfile } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';

export default function ProfileSetupPage() {
  const navigate = useNavigate();
  const saveProfile = useSaveCallerUserProfile();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContinue = async () => {
    setIsSubmitting(true);
    try {
      await saveProfile.mutateAsync({
        preferredLanguage: 'en',
        isPremium: false,
      });
      navigate({ to: '/dashboard' });
    } catch {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="bg-card rounded-2xl border border-border shadow-parchment p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/20 mb-5">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>

          <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
            Welcome, Scholar!
          </h2>

          <div className="ornament-divider my-4">
            <span className="ornament-divider-symbol">✦</span>
          </div>

          <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
            You're about to embark on a journey through history. We'll set up your reading preferences so you can enjoy stories in your preferred language.
          </p>

          <Button
            onClick={handleContinue}
            disabled={isSubmitting}
            className="w-full gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Setting up...
              </>
            ) : (
              'Begin Your Journey'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
