import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useUserPreferences } from '../hooks/useUserPreferences';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Check, Volume2, BookOpen, Sparkles, ArrowLeft } from 'lucide-react';

const PLANS = [
  {
    id: 'monthly',
    name: 'Monthly Premium',
    price: '₹99',
    period: '/month',
    description: 'Perfect for curious minds',
    badge: null,
    features: [
      'Ad-free reading experience',
      'Read Aloud in English, Hindi & Gujarati',
      'Access to all historical stories',
      'Language preference sync',
    ],
  },
  {
    id: 'yearly',
    name: 'Yearly Premium',
    price: '₹199',
    period: '/year',
    description: 'Best value — save 83%',
    badge: 'Best Value',
    features: [
      'Everything in Monthly',
      'Exclusive biographies & rare tales',
      'Priority access to new content',
      'Early access to new languages',
    ],
  },
];

const PREMIUM_FEATURES = [
  { icon: Volume2, title: 'Read Aloud', desc: 'Listen to stories in your language' },
  { icon: BookOpen, title: 'Exclusive Content', desc: 'Access rare historical biographies' },
  { icon: Sparkles, title: 'Ad-Free', desc: 'Uninterrupted reading experience' },
];

export default function SubscriptionPage() {
  const navigate = useNavigate();
  const { isPremium, upgradeToPremium, isUpdating, preferredLanguage } = useUserPreferences();

  const handleUpgrade = () => {
    upgradeToPremium();
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back */}
      <button
        onClick={() => navigate({ to: '/dashboard' })}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 group"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
        <span className="text-sm font-medium">Back to Stories</span>
      </button>

      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/20 mb-4">
          <Crown className="h-8 w-8 text-gold" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">
          Unlock Premium
        </h1>
        <div className="ornament-divider max-w-xs mx-auto">
          <span className="ornament-divider-symbol">✦</span>
        </div>
        <p className="text-muted-foreground text-lg mt-3 max-w-xl mx-auto">
          Elevate your historical journey with premium features designed for the true history enthusiast.
        </p>
      </div>

      {/* Already Premium */}
      {isPremium && (
        <div className="mb-8 rounded-xl border border-gold/40 bg-gradient-to-r from-primary/10 to-gold/10 p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Crown className="h-6 w-6 text-gold" />
            <h2 className="font-serif text-xl font-bold text-foreground">You are a Premium Member!</h2>
          </div>
          <p className="text-muted-foreground text-sm">
            Enjoy all premium features including Read Aloud, exclusive content, and ad-free reading.
          </p>
          <Badge className="mt-3 bg-gold/20 text-gold border-gold/30 hover:bg-gold/30">
            ✦ Premium Active
          </Badge>
        </div>
      )}

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {PREMIUM_FEATURES.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="rounded-xl border border-border bg-card p-5 text-center"
          >
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 mb-3">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-serif font-semibold text-foreground mb-1">{title}</h3>
            <p className="text-xs text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-2xl border-2 bg-card p-6 flex flex-col ${
              plan.badge
                ? 'border-gold/50 shadow-gold'
                : 'border-border'
            }`}
          >
            {plan.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-gold text-sepia-900 border-0 font-bold px-3">
                  {plan.badge}
                </Badge>
              </div>
            )}

            <div className="mb-5">
              <h3 className="font-serif text-xl font-bold text-foreground mb-1">{plan.name}</h3>
              <p className="text-muted-foreground text-sm mb-3">{plan.description}</p>
              <div className="flex items-baseline gap-1">
                <span className="font-serif text-4xl font-bold text-foreground">{plan.price}</span>
                <span className="text-muted-foreground text-sm">{plan.period}</span>
              </div>
            </div>

            <ul className="space-y-2.5 mb-6 flex-1">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm text-foreground">
                  <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  {feature}
                </li>
              ))}
            </ul>

            <Button
              onClick={handleUpgrade}
              disabled={isPremium || isUpdating}
              className={`w-full gap-2 ${
                plan.badge
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-gold'
                  : ''
              }`}
              variant={plan.badge ? 'default' : 'outline'}
            >
              {isUpdating ? (
                <>
                  <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                  Upgrading...
                </>
              ) : isPremium ? (
                <>
                  <Crown className="h-4 w-4" />
                  Already Premium
                </>
              ) : (
                <>
                  <Crown className="h-4 w-4" />
                  Get {plan.name}
                </>
              )}
            </Button>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <p className="text-center text-xs text-muted-foreground">
        This is a simulated upgrade for demonstration purposes. No real payment is processed.
      </p>
    </div>
  );
}
