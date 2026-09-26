# ANTIGRAVITY.md — Rules for Antigravity Working on CineAura

This file governs how an AI coding agent (Antigravity) should behave when modifying this repository. Read `docs/PROJECT.md` and `docs/DESIGN.md` before making changes.

## General

- Understand existing code before modifying it — read the relevant file(s) fully first.
- Do not rewrite the project unnecessarily; prefer the smallest change that accomplishes the task.
- Preserve existing functionality unless a change is explicitly requested.
- Make incremental changes — one concern per change/commit.
- Avoid unrelated changes (no drive-by refactors, renames, or formatting sweeps).
- Reuse existing components whenever possible (`MovieCard`, `MovieList`, `protectedroute.js`, hooks) instead of creating new ones that do the same thing.
- Do not create duplicate components.
- Do not introduce new dependencies without a clear, stated reason.

## UI

- Follow `docs/DESIGN.md` for all visual decisions.
- Use centralized design tokens (see DESIGN.md §2) — never hardcode a one-off color, spacing value, or radius.
- Keep UI consistent across pages — a button, card, or empty state should look and behave the same everywhere it appears.
- Make every new or modified component responsive (mobile/tablet/desktop, per DESIGN.md §4).
- Use accessible, semantic HTML (proper heading levels, `button` vs `div`, alt text on images, labeled form inputs).
- Do not repeat arbitrary colors/spacing values inline — if a value is used more than once, it belongs in the token system.
- Avoid excessive animation — follow DESIGN.md §5 and respect `prefers-reduced-motion`.

## Architecture

- Keep components modular — one responsibility per component.
- Keep API/data-fetching logic separate from presentational UI logic (hooks/services vs. components).
- Keep Redux responsibilities clear — don't add unrelated state to an existing slice; create a new slice if the concern is genuinely new.
- Reuse existing hooks (`useNowPlayingMovies`, `usePopularMovies`, `useMovieTrailer`) rather than writing parallel fetch logic.
- Avoid duplicated API calls — check whether data is already available in Redux state before fetching again.

## Security

- Never expose secret API keys in client-side code or commits.
- Never hardcode secrets, tokens, or credentials.
- Keep sensitive API operations (e.g. calls requiring a secret key) server-side where required, rather than calling them directly from the browser.
- Validate all user input, both client-side (existing `validate.js` pattern) and, if a backend is introduced, server-side too.

## Development Workflow

Before making any change:

1. Inspect the relevant existing file(s) in full.
2. Explain the intended change before writing code.
3. Make the smallest appropriate change to accomplish the task.
4. Verify existing functionality still works (auth, TMDB rows, trailer autoplay, GPT search).
5. Check responsive behavior at mobile/tablet/desktop breakpoints.
6. Check for console errors/warnings introduced by the change.

## Important Restrictions

- Do **not** implement SDUI yet. `docs/FUTURE_ARCHITECTURE.md` is direction-only, not a task list.
- Do **not** replace Firebase Authentication.
- Do **not** remove TMDB functionality.
- Do **not** remove GPT search functionality.
- Do **not** rewrite the entire project just to apply styling changes — apply DESIGN.md incrementally, component by component.
