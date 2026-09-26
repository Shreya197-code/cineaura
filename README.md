# 🎬 CineAura — AI-Powered Movie Discovery Platform

[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Redux Toolkit](https://img.shields.io/badge/Redux--Toolkit-2.11-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

**CineAura** is a premium, cinematic movie discovery platform modeled after modern streaming experiences. It combines real-time movie cataloging from TMDB, video trailer autoplay, Firebase authentication with Email + OTP password recovery, multilingual UI support, and an AI-powered natural-language movie search engine driven by OpenAI.

---

## ✨ Features

* **🔐 Authentication & Protected Routes**
  * Email & password sign-up / sign-in with regex validation ([`validate.js`](file:///c:/Users/shrey/OneDrive/Desktop/projext/cineaura/src/utils/validate.js)).
  * Route guard ([`protectedroute.js`](file:///c:/Users/shrey/OneDrive/Desktop/projext/cineaura/src/components/protectedroute.js)) enforcing session checks with full-page loading transitions.
  * **Forgot Password & OTP Verification:** Firebase Auth `sendPasswordResetEmail` integration paired with 6-digit OTP verification.

* **🎬 Hero Showcase & Video Trailers**
  * Autoplay background YouTube trailers dynamically resolved per featured movie ID.
  * Dual-directional scrim overlays ensuring text legibility (WCAG AA compliant contrast).

* **🤖 AI-Powered GPT Movie Search**
  * Natural language search engine powered by `gpt-4o-mini` (e.g. *"Retro 80s sci-fi space thrillers"*).
  * Automatically resolves GPT movie recommendations into real TMDB catalog objects with posters and metadata.

* **🍿 Curated Movie Carousels**
  * Horizontal scrollable rows (Now Playing, Popular, Trending, Upcoming) with partial next-card peek.
  * Smooth card hover scale & shadow lift animations (`hover:scale-[1.04] hover:shadow-elevated`).
  * Desktop hover scroll chevron controls (`ChevronLeft` / `ChevronRight`).

* **🌍 Multilingual UI Support**
  * Dynamic interface language switching: 🇬🇧 English (`en`), 🇮🇳 Hindi (`hi`), 🇪🇸 Spanish (`es`), and 🇵🇰 Urdu (`ur`).

* **⚡ Skeleton Loaders & Design System**
  * Geometry-matched shimmer skeleton loaders for hero section & movie rows during data fetching.
  * Centralized CSS variables & Tailwind theme extensions per [`DESIGN.md`](file:///c:/Users/shrey/OneDrive/Desktop/projext/cineaura/DESIGN.md).

---

## 🛠️ Technology Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Core** | React 19 (`react`, `react-dom`) | Single Page Application framework |
| **Routing** | React Router DOM v7 | Client-side routing with guarded routes |
| **State Management** | Redux Toolkit (`react-redux`) | Centralized app store for user, movies, config, and GPT search |
| **Styling** | Tailwind CSS v3 & PostCSS | Glassmorphic dark UI, CSS variables, responsive design |
| **Authentication** | Firebase Auth | Email/Password auth, session persistence, password reset |
| **Movie Metadata** | TMDB REST API | Real-time movie catalogs, image CDN, YouTube trailer keys |
| **AI Engine** | OpenAI API (`openai`) | Natural language query processing via `gpt-4o-mini` |
| **Icons** | Lucide React | Modern vector icon set |

---

## 📐 Architecture & Data Flow

```mermaid
flowchart TD
    User([User Client]) --> Header[Header Component]
    User --> Router{React Router v7}

    Router -->|/| Login[Login / SignUp / Forgot Password]
    Router -->|/browse| AuthGuard{Protected Route Guard}
    
    AuthGuard -->|Authenticated| Browse[Browse Page]
    AuthGuard -->|Unauthenticated| Login

    Login -->|Auth Actions| Firebase[Firebase Auth]
    Firebase -->|onAuthStateChanged| UserSlice[Redux User Slice]

    Browse --> MainContainer[Hero Main Container]
    Browse --> SecondaryContainer[Secondary Carousels]
    Browse --> GPTSearch[GPT AI Search Engine]

    MainContainer -->|Fetch Trailer Key| TMDB[TMDB API]
    SecondaryContainer -->|Fetch Catalog Rows| TMDB
    TMDB --> MovieSlice[Redux Movie Slice]

    GPTSearch -->|Search Prompt| OpenAI[OpenAI API (gpt-4o-mini)]
    OpenAI -->|5 Titles| TMDB
    TMDB -->|Resolved Movie Objects| GPTSlice[Redux GPT Slice]

    Header -->|Language Toggle| ConfigSlice[Redux Config Slice]
```

---

## 📁 Project Directory Structure

```
cineaura/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   └── logo_cineaura.png
├── src/
│   ├── components/
│   │   ├── App.js                # Main router setup & Provider wrapper
│   │   ├── Browse.js             # Authenticated dashboard entry point
│   │   ├── Header.js             # Fixed frosted top navigation bar
│   │   ├── Login.js              # Auth form (Sign In, Sign Up, Forgot Password & OTP)
│   │   ├── MainContainer.js      # Hero section container (video + title)
│   │   ├── SecondaryContainer.js # Vertical layout stack for movie carousels
│   │   ├── VideoBackground.js    # YouTube trailer iframe embed with scrim overlays
│   │   ├── VideoTitle.js         # Hero title, overview, and CTA buttons
│   │   ├── MovieList.js          # Horizontal scrollable carousel with chevron navigation
│   │   ├── MovieCard.js          # Poster card component with hover scale animation
│   │   ├── GPTSearch.js          # GPT search background layout container
│   │   ├── GPTSearchBar.js       # AI search input bar connecting to OpenAI & TMDB
│   │   ├── GPTMoviesSuggestion.js# Renders AI recommendations & shimmer loaders
│   │   ├── Profilemenu.js        # User profile glass dropdown menu
│   │   └── protectedroute.js     # Route protection & auth loading spinner
│   ├── hooks/
│   │   ├── useMovieTrailer.js    # Custom hook fetching YouTube trailer keys
│   │   ├── useNowPlayingMovies.js# Custom hook fetching current theater movies
│   │   └── usePopularMovies.js   # Custom hook fetching popular movies
│   ├── utils/
│   │   ├── appStore.js           # Central Redux Toolkit store setup
│   │   ├── userSlice.js          # Redux slice for user auth state
│   │   ├── movieslice.js         # Redux slice for TMDB movie catalog
│   │   ├── gptslice.js           # Redux slice for GPT search state & results
│   │   ├── configslice.js        # Redux slice for app language configuration
│   │   ├── constants.js          # Endpoints, CDN URLs, and env variable references
│   │   ├── languageConstants.js  # Multilingual translations (en, hi, es, ur)
│   │   ├── firebase.js           # Firebase app initialization
│   │   ├── openai.js             # OpenAI SDK client configuration
│   │   └── validate.js           # Form validation helper functions
│   ├── index.css                 # CSS variables & base design tokens
│   └── index.js                  # Application entry point
├── .env                          # Centralized environment variables
├── ANTIGRAVITY.md                # Operating guidelines & constraints
├── DESIGN.md                     # Visual system & design tokens documentation
├── PROJECT.md                    # Architecture & single source of truth
└── tailwind.config.js            # Tailwind theme extensions
```

---

## 🚀 Quick Start & Installation

### Prerequisites
* **Node.js** v18+ 
* **npm** v9+

### 1. Clone Repository
```bash
git clone https://github.com/Shreya197-code/cineaura.git
cd cineaura
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables Configuration
Create a `.env` file in the root directory and specify your API credentials:

```env
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
REACT_APP_TMDB_KEY=your_tmdb_read_access_token
REACT_APP_OPENAI_KEY=your_openai_api_key
```

### 4. Run Development Server
```bash
npm start
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser to view the application.

---

## 🎨 Design Tokens Summary

| Token | CSS Variable / Tailwind | Description |
| :--- | :--- | :--- |
| **Background** | `--color-background` / `bg-background` | App-wide base background (`#09090b`) |
| **Surface** | `--color-surface` / `bg-surface` | Card background (`#13131a`) |
| **Elevated Surface** | `--color-surface-elevated` / `bg-surface-elevated` | Frosted glass containers (`rgba(22, 22, 30, 0.85)`) |
| **Accent** | `--color-accent` / `bg-accent` / `text-accent` | Primary cyan identity color (`#06b6d4`) |
| **Text Primary** | `--color-text` / `text-text` | Near-white primary body text (`#f4f4f5`) |
| **Text Muted** | `--color-text-muted` / `text-text-muted` | Secondary metadata text (`#a1a1aa`) |
| **Hairline Border** | `--color-border` / `border-border` | Low-contrast boundary lines (`rgba(255, 255, 255, 0.1)`) |

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🤝 Acknowledgements

* [TMDB API](https://www.themoviedb.org/) for movie data, images, and trailers.
* [OpenAI](https://openai.com/) for natural language AI search via `gpt-4o-mini`.
* [Firebase](https://firebase.google.com/) for authentication services.

