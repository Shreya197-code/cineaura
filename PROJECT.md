# PROJECT.md — CineAura

Single source of truth for understanding the current CineAura codebase.

## 1. Overview

CineAura is a movie discovery web app: users authenticate, browse curated movie rows sourced from TMDB, watch trailers, and search for movies using an AI-assisted (GPT-4o-mini) natural-language search. It is currently a client-heavy React SPA with Firebase for auth and hosting.

## 2. Current Tech Stack

- **React 19** — UI library
- **JavaScript** (no TypeScript yet)
- **React Router DOM v7** — client-side routing
- **Redux Toolkit** — global state
- **Tailwind CSS v3** — styling
- **Firebase Authentication** — sign up / sign in / session
- **TMDB API** — movie catalog, images, trailers
- **OpenAI GPT-4o-mini** — natural-language movie search
- **Lucide React** — icon set

## 3. Current Features

- Email/password sign up and sign in (Firebase Auth)
- Form validation on login/signup (`validate.js`)
- Protected routing — unauthenticated users can't reach `/browse`
- TMDB-driven movie rows: Now Playing, Popular
- Hero section with autoplaying trailer + title/description
- Movie cards → posters via TMDB image CDN
- GPT-powered search: natural-language query → GPT suggests titles → matched against TMDB results
- Multilingual UI toggle (`languageConstants.js`, `configSlice.js`)
- Profile menu with sign-out

## 4. Folder / Component Structure

```
src/
├── App.js                     # Root, router setup, Redux Provider
├── components/
│   ├── Body.js                # Top-level route switch
│   ├── Browse.js               # Authenticated home screen
│   ├── Header.js                # Nav, logo, profile menu, GPT search toggle
│   ├── Login.js                  # Login/signup form
│   ├── MainContainer.js           # Hero: background video + title
│   ├── SecondaryContainer.js       # Stacks MovieList rows below hero
│   ├── VideoBackground.js          # YouTube trailer embed for hero
│   ├── VideoTitle.js               # Hero title/description overlay
│   ├── MovieList.js                # Horizontal scrollable row of MovieCards
│   ├── MovieCard.js                 # Single poster card
│   ├── GPTSearch.js                  # GPT search page/layout
│   ├── GPTSearchBar.js                # Search input for GPT search
│   ├── GPTMoviesSuggestion.js          # Renders GPT-matched results
│   ├── Profilemenu.js                  # Avatar dropdown
│   └── protectedroute.js                # Route guard wrapper
├── hooks/
│   ├── useMovieTrailer.js         # Fetch trailer for a movie ID
│   ├── useNowPlayingMovies.js       # Fetch + dispatch "now playing" list
│   └── usePopularMovies.js           # Fetch + dispatch "popular" list
├── utils/
│   ├── appStore.js                 # configureStore, combines slices
│   ├── userSlice.js                  # Auth user state
│   ├── movieSlice.js                   # TMDB movie lists + trailer video
│   ├── gptSlice.js                       # GPT search results state
│   ├── configSlice.js                      # Language / UI config state
│   ├── languageConstants.js                 # i18n strings
│   ├── firebase.js                            # Firebase init/config
│   ├── openai.js                                # OpenAI client setup
│   ├── validate.js                                # Form validation helpers
│   └── constants.js                                 # Hardcoded API constants/endpoints
```

## 5. Authentication Flow

1. User submits Login/Signup form → `validate.js` checks input client-side.
2. Firebase Auth call (`createUserWithEmailAndPassword` / `signInWithEmailAndPassword`).
3. On success, Firebase's `onAuthStateChanged` listener (likely in `Body.js` or `App.js`) dispatches user info into `userSlice`.
4. `protectedroute.js` reads `userSlice` state; redirects to `/login` if absent, else renders the wrapped route (`Browse`).
5. Sign-out clears `userSlice` and redirects to `/login`.

## 6. TMDB Data Flow

1. `useNowPlayingMovies` / `usePopularMovies` fire on mount inside `Browse`/`MainContainer`.
2. Each hook calls the relevant TMDB REST endpoint (API key from `constants.js`, called **directly from the browser**).
3. Response is dispatched into `movieSlice` (e.g. `nowPlayingMovies`, `popularMovies`).
4. `MainContainer` reads the first now-playing movie for hero background; `useMovieTrailer` fetches its trailer video ID and dispatches it into `movieSlice.trailerVideo`.
5. `SecondaryContainer` reads each list from `movieSlice` and renders one `MovieList` per category, each rendering `MovieCard`s using TMDB's image CDN base URL + `poster_path`.

## 7. GPT Search Flow

1. User types a natural-language query into `GPTSearchBar` (e.g. "funny movies with a road trip").
2. Query + a list of language options is sent to OpenAI (`openai.js` client) asking GPT-4o-mini to return matching movie titles.
3. For each returned title, the app makes a TMDB search call to resolve it to a real TMDB movie object (poster, id, etc.).
4. Results are dispatched into `gptSlice` and rendered by `GPTMoviesSuggestion`.

## 8. Redux Architecture

Single store (`appStore.js`) combining 4 slices:

| Slice | Responsibility |
|---|---|
| `userSlice` | Current authenticated user (uid, displayName, email) |
| `movieSlice` | TMDB lists (now playing, popular), hero trailer video |
| `gptSlice` | GPT search query results |
| `configSlice` | Current UI language / config |

No middleware beyond RTK defaults; no persisted state (resets on reload except via Firebase session persistence).

## 9. Important Reusable Components

- `MovieCard` — used by every row and GPT results; the primary "content unit" of the app.
- `MovieList` — generic horizontal row renderer, takes a title + array of movies.
- `protectedroute.js` — the only auth gate; any new authenticated page should be wrapped in it.
- `useMovieTrailer` — the only trailer-fetch hook; reusable for any movie ID, not just the hero.

## 10. Current Limitations / Technical Debt

- **No custom backend.** TMDB and OpenAI are called directly from the client — API keys are exposed in the bundle (see security note in ANTIGRAVITY.md).
- **Hardcoded page layout.** Which rows appear, in what order, and their titles are fixed in `SecondaryContainer`/`Browse` JSX — not data-driven.
- **No personalization.** Every user sees the identical Browse screen regardless of behavior or preference.
- **No TypeScript** — no compile-time contract between components, hooks, and Redux state shape.
- **No tests** beyond CRA's default testing-library boilerplate.
- **No loading/error/skeleton states** documented as standardized patterns (inconsistent handling likely across components).

## 11. Target Future Architecture

```
User → Authentication → Preferences / Behavior → Personalization
     → SDUI configuration → UI JSON → React renderer → Personalized UI
```

See `FUTURE_ARCHITECTURE.md` for the full explanation. No implementation yet — this is direction only.

## 12. What Must Be Preserved

- Firebase Authentication flow and session handling
- TMDB data correctness (categories, posters, trailers)
- GPT search functionality
- Redux as the state management approach
- Existing component names/responsibilities, unless a change is explicitly requested

## 13. What Can Be Improved

- Move TMDB/OpenAI calls behind a backend to stop exposing API keys
- Extract hardcoded row config into data (first step toward SDUI)
- Introduce consistent loading/error/empty states
- Introduce design tokens (see `DESIGN.md`) instead of ad hoc Tailwind classes
- Add basic component/unit tests
