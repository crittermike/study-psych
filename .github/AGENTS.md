# AP Psychology Study App

## Project Overview
A React (Vite) single-page app for studying AP Psychology — Social Psychology, Motivation, Emotion & Personality. Deployed to GitHub Pages at https://crittermike.github.io/study-psych/.

## Tech Stack
- **Framework**: React 19 with Vite 7
- **Styling**: Plain CSS (no framework), dark theme with purple/violet accent gradient
- **State**: React hooks + localStorage for persistence
- **Audio**: Web Audio API synth sounds (no external files)
- **Testing**: Vitest + @testing-library/react + @testing-library/jest-dom
- **Deploy**: GitHub Actions → GitHub Pages (`.github/workflows/deploy.yml`)
- **Base path**: `/study-psych/` (set in `vite.config.js`)

## Architecture
```
src/
  main.jsx              # Entry point
  App.jsx               # Root component, mode switching, achievement/leaderboard state
  App.css               # All styles (single file)
  data/terms.js          # Vocab data, categories, confused pairs
  hooks/useProgress.js   # SRS engine, localStorage persistence
  test/setup.js          # Test setup (localStorage mock, Web Audio mock)
  utils/
    sound.js             # Web Audio API sound effects
    achievements.js      # Achievement definitions & unlock logic (21 achievements)
    leaderboard.js       # Personal bests tracking
    helpers.js           # shuffle, formatTime, normText, isCorrectTerm
  components/
    Home.jsx             # Dashboard with ring chart, category progress bars
    Flashcards.jsx       # Flashcards with two study modes and side toggle
    WriteIt.jsx          # Type-the-term from definition
    FillBlank.jsx        # Fill in blanked keyword from definition
    Matching.jsx         # Timed term↔definition pairing game
    PracticeTest.jsx     # Multiple-choice timed quiz
    MixedTest.jsx        # Combined MC + write + blank + scenario questions
    CompareContrast.jsx  # Side-by-side confused pairs with quiz
    HardestTerms.jsx     # Auto-deck from lowest-accuracy terms
    Leaderboard.jsx      # Achievements, best scores, streaks
    CategoryFilter.jsx   # Reusable category dropdown filter
```

## Flashcard Study Modes
The Flashcards component supports two study modes (persisted in localStorage under `fc_study_mode`):
- **Keep / Discard (session)**: Hard cards go back in the deck, Easy cards are removed. Discarded cards persist across reloads (`fc_discarded` in localStorage). "Shuffle & Restart" or "Go Again" clears saved progress.
- **Spaced Review (srs)**: Rate difficulty (Again/Hard/Good/Easy) to schedule when you'll see each card again using a simplified SM-2 algorithm.

Users can also toggle which side to start on — Term → Definition or Definition → Term (persisted under `fc_start_side`).

## Key Data Structures

### Term object (`data/terms.js`)
Each term has: `term`, `def`, `cat` (category), `blank` (keyword for fill-in-the-blank), `accept[]` (alternative accepted answers for write-it), `example` (real-world AP scenario).

Currently 121 terms across 16 categories: Attributions, Social Perception, Prejudice & Discrimination, Attitudes & Cognition, Social Influence, Group Dynamics, Prosocial Behavior, Work & Organizational Psychology, Motivation, Arousal & Sensation Seeking, Motivational Conflicts, Emotion, Psychodynamic Theory, Defense Mechanisms, Humanistic & Social-Cognitive Psychology, Personality & Self.

### Progress (`hooks/useProgress.js`)
Stored in `localStorage` under key `ap_progress`. Per-term object: `{ conf, seen, correct, interval, ease, nextReview, lastReview }`. Uses a simplified SM-2 spaced repetition algorithm.

### Confused Pairs (`data/terms.js`)
`CONFUSED_PAIRS` array of `[termA, termB]` for Compare & Contrast mode. 40 pairs of commonly confused AP Psych concepts.

### localStorage Keys
| Key | Purpose |
|-----|---------|
| `ap_progress` | Per-term SRS progress data |
| `ap_achievements` | Unlocked achievements with timestamps |
| `ap_leaderboard` | Test scores, match times, streaks |
| `fc_study_mode` | Flashcard mode: `session` or `srs` |
| `fc_start_side` | Flashcard front: `term` or `def` |
| `fc_discarded` | Array of discarded term names (session mode) |

## Build, Test & Deploy
```bash
npm install        # Install dependencies
npm run dev        # Dev server (hot reload)
npm run build      # Production build → dist/
npm test           # Run tests (vitest)
npm run test:watch # Run tests in watch mode
```
Pushing to `main` triggers automatic GitHub Pages deploy via Actions.

## Adding/Editing Terms
Edit `src/data/terms.js`. Each term needs all 6 fields. If adding a new category, it auto-appears in filters. Update `CONFUSED_PAIRS` if adding related terms. Old localStorage progress won't apply to renamed terms (progress keys match term names exactly).

## Coding Conventions

- **No TypeScript** — plain JSX throughout. Do not introduce `.ts`/`.tsx` files.
- **No router** — mode switching via `useState('home')` in `App.jsx` with a `MODES` array. Navigation is `setMode('flashcards')`, not URL-based.
- **No external state library** — React hooks only (`useState`, `useCallback`, `useEffect`). No Redux, Zustand, etc.
- **No CSS framework** — single `App.css` file (dark theme, CSS custom properties). No Tailwind, styled-components, CSS modules.
- **No external audio files** — all sounds generated via Web Audio API oscillators in `utils/sound.js`.
- **Functional components only** — no class components anywhere.
- **ESLint**: Flat config (`eslint.config.js`), `react-hooks` and `react-refresh` plugins. `no-unused-vars` ignores identifiers starting with a capital letter (for unused component imports).

## Component Patterns

All study mode components follow a consistent pattern:
1. Build a deck (filtered by category if applicable)
2. Track current position via `idx` state
3. Show completion screen when deck is exhausted
4. Receive callbacks from `App.jsx`: `recordAnswer`, `onAchievement`, `onStreak`, `onTestComplete`, `onMatchComplete`

`CategoryFilter` is the only reusable component — used by Flashcards, WriteIt, and FillBlank.

## Keyboard Shortcuts

The `Flashcards` component registers keyboard listeners via `useEffect`:
- **Space** — flip the card
- **1–4** — rate confidence (in SRS mode: Again/Hard/Good/Easy; in session mode: Keep/Discard)
- **E** — toggle example visibility

## Testing Patterns

- Test files live alongside source: `*.test.js` / `*.test.jsx`
- Test environment: `jsdom` (configured in `vite.config.js`)
- `src/test/setup.js` mocks `localStorage` (get/set/removeItem/clear) and `AudioContext` (createOscillator, createGain, connect, start, stop)
- Tests use `@testing-library/react` — render, screen, fireEvent, within
- Current test coverage: `terms.test.js`, `useProgress.test.js`, `helpers.test.js`, `achievements.test.js`, `leaderboard.test.js`, `Flashcards.test.jsx`, `CategoryFilter.test.jsx`
- When adding new components or utils, add a corresponding `.test.js`/`.test.jsx` file following existing patterns
