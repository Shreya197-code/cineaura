# FUTURE_ARCHITECTURE.md — Where CineAura Is Going

This document explains the intended future direction for CineAura's architecture. **Nothing here should be implemented yet** — it exists so future work (by a person or an AI agent) understands the destination without jumping ahead of `ANTIGRAVITY.md`'s restrictions.

## 1. Current vs. Future

**Current:**

```
React → Hardcoded page layout → API data → Components
```

Every user who opens `/browse` gets the exact same row order, the exact same titles, sourced from the exact same TMDB endpoints, assembled by JSX that lives in `SecondaryContainer`/`Browse`.

**Future:**

```
User → Authentication → User preferences → User behavior
     → Personalization engine → SDUI configuration
     → UI JSON → Component registry → React components
```

The layout itself becomes data returned by a server, and that data can differ per user.

## 2. Personalization vs. SDUI vs. Personalized SDUI

**Personalization** determines **WHAT** content a user receives — e.g. which genres, which specific movies, which recommendations are surfaced to *this* user based on their preferences/behavior. It doesn't change the screen's structure, only its content.

**SDUI (Server-Driven UI)** determines **HOW** the UI structure is assembled — e.g. whether the screen shows a hero + 3 rows or a hero + 5 rows, what order sections appear in, whether a promotional banner is present. It doesn't care who's looking, only what shape the screen takes.

**Personalized SDUI** combines both: the server decides both the structure *and* the content for a specific user, so two different users can receive genuinely different screens from the same React codebase.

## 3. Example: Two Users, One App

**User A** (behavior suggests sci-fi/action fan):

```
Hero (sci-fi lead title)
→ Sci-Fi recommendations
→ Action movies
→ Trending
```

**User B** (behavior suggests comedy/romance fan, has watch history):

```
Hero (comedy lead title)
→ Comedy recommendations
→ Romance movies
→ Continue Watching
```

Both users load the identical React application and identical component code. Only the **UI JSON configuration** returned by the server differs — the components are generic and don't know or care whose screen they're rendering.

## 4. Future Component Types

A future component registry should support at least:

- `hero`
- `movie_carousel`
- `movie_grid`
- `movie_card`
- `banner`
- `text`
- `image`
- `button`
- `search`
- `recommendation_section`

Each maps to a React component that accepts a config object and renders itself — no component reaches into global app logic to decide whether it should exist; that decision is made upstream, by the server response.

## 5. Example Future UI JSON *(future design only — not implemented)*

```json
{
  "screen": "browse",
  "user_segment": "sci_fi_action_fan",
  "components": [
    { "type": "hero", "movie_id": "603692" },
    { "type": "movie_carousel", "title": "Sci-Fi For You", "data_source": "personalized:sci_fi" },
    { "type": "movie_carousel", "title": "Action Movies", "data_source": "personalized:action" },
    { "type": "movie_carousel", "title": "Trending Now", "data_source": "trending" },
    { "type": "banner", "variant": "gpt_search_prompt" }
  ]
}
```

This is illustrative only. Field names, the personalization engine, and the component registry are not designed yet and should not be built from this snippet directly.

## 6. Existing CineAura Components That Should Eventually Become Reusable SDUI Components

| Current component | Future SDUI role |
|---|---|
| `MainContainer` / `VideoBackground` / `VideoTitle` | Becomes the `hero` component type |
| `SecondaryContainer` | Becomes the generic renderer that maps JSON `components[]` to React components (replaces its current hardcoded row list) |
| `MovieList` | Becomes `movie_carousel` |
| `MovieCard` | Stays as the rendering unit inside `movie_carousel` / `movie_grid` / recommendation sections |
| `GPTSearch` / `GPTSearchBar` | Becomes (or informs) the `search` component type, and a future personalization signal source |
| `GPTMoviesSuggestion` | A pattern for `recommendation_section` |

The eventual work is to make these components accept **config-driven props** instead of hardcoded ones, and to introduce a server that returns the JSON describing which of them to render, in what order, with what data. That work is out of scope for now — see `ANTIGRAVITY.md`.
