# Specification

## Summary
**Goal:** Build "History Tales," a multilingual historical storytelling web app on the Internet Computer with Internet Identity authentication, a Motoko backend for story data and user preferences, and a rich parchment-and-ink themed React frontend.

**Planned changes:**
- Motoko backend actor pre-seeded with 4+ historical stories (title, summary, content in EN/HI/GU fields), exposing `getStories()`, `getStory(id)`, `setUserPreferences()`, and `getUserPreferences()` endpoints
- Internet Identity authentication with a login/welcome screen for unauthenticated users and sign-out option; user principal used to persist preferences
- Splash screen showing the app logo and "History Tales" title, auto-navigating after 3 seconds to login or dashboard
- Dashboard screen listing all stories with title and summary in the user's selected language (EN/HI/GU), a language selector, and a dark/light theme toggle in the header
- Story detail screen showing full content in the selected language with a premium-gated "Read Aloud" button using the browser Web Speech API (en-US, hi-IN, gu-IN) and a "Stop" button while speaking
- Premium subscription screen listing Monthly and Yearly tiers (ad-free, multilingual audio, exclusive biographies) with an "Upgrade" button that sets `isPremium` to true in the backend and shows a premium badge if already subscribed
- Rich parchment-and-ink visual theme (warm sepia/amber, gold accents, serif/antiqued typography, ornamental elements) applied uniformly in both light and dark modes via Tailwind config/CSS variables
- Static image assets (logo, splash background, dashboard hero banner) served from `frontend/public/assets/generated`

**User-visible outcome:** Users can sign in with Internet Identity, browse historical stories in English, Hindi, or Gujarati, read full story content, upgrade to premium to unlock text-to-speech narration, and enjoy a visually rich ancient-manuscript-inspired interface across all screens.
