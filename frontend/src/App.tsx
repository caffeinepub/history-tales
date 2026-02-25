import React, { useEffect, useState } from 'react';
import {
  createRouter,
  createRoute,
  createRootRoute,
  RouterProvider,
  Outlet,
  redirect,
} from '@tanstack/react-router';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useQueries';
import AppLayout from './components/AppLayout';
import SplashScreen from './pages/SplashScreen';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import StoryDetailPage from './pages/StoryDetailPage';
import SubscriptionPage from './pages/SubscriptionPage';
import ProfileSetupPage from './pages/ProfileSetupPage';

// ─── Root Route ──────────────────────────────────────────────────────────────

const rootRoute = createRootRoute({
  component: Root,
});

function Root() {
  return <Outlet />;
}

// ─── Splash ──────────────────────────────────────────────────────────────────

const splashRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: SplashScreen,
});

// ─── Login ───────────────────────────────────────────────────────────────────

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
});

// ─── App Layout (authenticated) ──────────────────────────────────────────────

const appRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'app',
  component: AppLayout,
});

// ─── Dashboard ───────────────────────────────────────────────────────────────

const dashboardRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/dashboard',
  component: DashboardPage,
});

// ─── Story Detail ─────────────────────────────────────────────────────────────

const storyDetailRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/story/$id',
  component: StoryDetailPage,
});

// ─── Subscription ─────────────────────────────────────────────────────────────

const subscriptionRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/subscription',
  component: SubscriptionPage,
});

// ─── Profile Setup ────────────────────────────────────────────────────────────

const profileSetupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/setup',
  component: ProfileSetupPage,
});

// ─── Router ──────────────────────────────────────────────────────────────────

const routeTree = rootRoute.addChildren([
  splashRoute,
  loginRoute,
  profileSetupRoute,
  appRoute.addChildren([
    dashboardRoute,
    storyDetailRoute,
    subscriptionRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// ─── Auth Guard Wrapper ───────────────────────────────────────────────────────

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { identity, isInitializing } = useInternetIdentity();
  const profileQuery = useGetCallerUserProfile();

  const isAuthenticated = !!identity;
  const showProfileSetup =
    isAuthenticated &&
    !profileQuery.isLoading &&
    profileQuery.isFetched &&
    profileQuery.data === null;

  // Apply saved theme on mount
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (saved === 'light') {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gold/40">
            <img
              src="/assets/generated/history-tales-logo.dim_256x256.png"
              alt="Loading"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-primary/60 animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <AuthGuard>
      <RouterProvider router={router} />
    </AuthGuard>
  );
}
