# DESIGN.md — CineAura Visual Direction

CineAura should feel like a **premium, modern, cinematic movie discovery platform** — not a clone of Netflix or any other existing product. This document is the single source of truth for visual decisions.

## 1. Visual Style

- Dark, cinematic base — content (posters, stills) should feel like it's glowing against a near-black backdrop.
- Premium, editorial feel — generous whitespace/negative space around hero content, not cramped.
- Modern typography — a clean geometric or humanist sans, confident and large for headlines, restrained for body text.
- Strong visual hierarchy — hero > row titles > cards > metadata, always visually obvious which is which.
- Large cinematic hero — full-bleed backdrop/trailer with a gradient scrim so text stays legible over any image.
- High-quality posters treated as the "hero" of every card — nothing should visually compete with them.
- Subtle gradients — used for scrims and depth cues, never as decoration for its own sake.
- Controlled glass effects (frosted/blurred translucent panels) — used sparingly, e.g. header-on-scroll, modals — not on every surface.
- Rounded cards — soft, consistent radius, not sharp corners, not pill-shaped.
- Soft borders — low-contrast hairlines to separate surfaces without hard edges.
- Smooth hover effects — scale + shadow lift on cards, no jarring color flips.

CineAura's identity marker: a distinct accent color (not Netflix red) applied consistently to interactive elements, focus states, and the GPT search entry point.

## 2. Design Tokens

Define these as CSS variables / Tailwind theme extensions — never as one-off hex values in components.

| Token | Purpose |
|---|---|
| `--color-background` | App-wide base background (near-black) |
| `--color-surface` | Card / row background, one step lighter than background |
| `--color-surface-elevated` | Modals, dropdowns, glass panels — lighter still, with blur |
| `--color-accent` | Primary interactive color (buttons, links, active states, GPT search) |
| `--color-accent-muted` | Hover/pressed variant of accent |
| `--color-text` | Primary text, near-white, not pure white |
| `--color-text-muted` | Secondary text — metadata, descriptions, timestamps |
| `--color-border` | Hairline borders between surfaces |
| `--color-error` | Form errors, failed states |
| `--color-success` | Confirmation states |
| `--radius-sm` / `--radius-md` / `--radius-lg` | Card, button, modal corner radii respectively |
| `--shadow-card` / `--shadow-elevated` | Resting card shadow vs. modal/dropdown shadow |
| `--space-*` | Spacing scale (4/8/12/16/24/32/48/64px) reused everywhere instead of arbitrary Tailwind values |
| `--font-display` | Headline/hero typeface |
| `--font-body` | Body/UI typeface |
| `--font-size-*` | Type scale from caption → hero headline |

## 3. Component Guidelines

**Header**
Transparent over hero, gains a blurred dark background once the page scrolls. Logo left, nav/search center-right, profile menu far right. Sticky.

**Hero**
Full-viewport-width backdrop (image or autoplaying trailer), bottom-anchored gradient scrim, title in display type, 1–2 line description truncated, primary CTA (Play/More Info) with clear affordance.

**Movie Card**
Poster-first, rounded corners, rests flat; on hover scales up slightly with an elevated shadow and reveals title/metadata that was hidden at rest. Consistent aspect ratio across the whole app.

**Movie Carousel / Movie List**
Horizontal scroll, row title in a consistent heading style above it, partial next-card visible at the edge to signal scrollability, arrow affordances appear on hover (desktop) only.

**Search / GPT Search**
Visually distinguished from standard search (e.g. subtle accent glow or icon) since it's an AI-assisted flow — but should not look like a "chatbot" bolted on; it should feel native to the browsing experience.

**Buttons**
Two variants only: primary (filled, accent) and secondary (outline/ghost). Consistent height and radius. No more than these two plus a text/link style.

**Profile Menu**
Small avatar trigger, dropdown with glass surface, minimal items (profile, language, sign out).

**Loading / Skeleton**
Skeleton shapes matching the real content's geometry (card-shaped placeholders, not spinners, for row content); a spinner is acceptable only for full-page/auth transitions.

**Empty States**
Short, friendly copy + a single suggested action (e.g. "No results — try a different search"). Never a bare blank screen.

**Error States**
Calm, non-alarming tone; clear next step (retry button); use `--color-error` sparingly, only on the actual error indicator, not the whole surface.

## 4. Responsive Design

- **Mobile**: single-column hero text, smaller card sizes, horizontal scroll rows remain but with tighter peek, header collapses to logo + menu icon.
- **Tablet**: hero and rows scale proportionally; header shows full nav without collapsing.
- **Desktop**: full hero treatment, hover-revealed row arrows, maximum card sizes, header fully expanded.

Design mobile-first; scale up spacing/typography at breakpoints rather than redesigning layouts per breakpoint.

## 5. Animation

Animations should feel cinematic and restrained — support the content, never distract from it.

- **Card hover**: scale (subtle, ~1.03–1.06x) + shadow lift, ~150–200ms ease-out.
- **Page transitions**: soft cross-fade between routes, no slides/bounces.
- **Hero transitions**: gentle cross-fade when hero content changes (e.g. featured movie rotates).
- **Loading animation**: skeleton shimmer, low-contrast, slow.
- **Modal transitions**: fade + slight scale-in, backdrop fades in behind it.

**Accessibility & reduced motion**: all animations must respect `prefers-reduced-motion` (disable scale/shimmer, keep only opacity fades where motion is reduced). Maintain WCAG AA contrast for text over images/gradients (use scrims). Ensure focus states are visible (accent-colored outline, never removed). All interactive elements must be reachable and operable via keyboard.
