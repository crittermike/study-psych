# AP Psychology Study App

## Project Overview
A React (Vite) single-page app for studying AP Psychology — Memory, Cognition, and Perception. Deployed to GitHub Pages at https://crittermike.github.io/study-psych/.

## Tech Stack
- **Framework**: React 19 with Vite 7
- **Styling**: Plain CSS (no framework), dark theme with purple/violet accent gradient
- **State**: React hooks + localStorage for persistence
- **Audio**: Web Audio API synth sounds (no external files)
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
  utils/
    sound.js             # Web Audio API sound effects
    achievements.js      # Achievement definitions & unlock logic
    leaderboard.js       # Personal bests tracking
    helpers.js           # shuffle, formatTime, normText, isCorrectTerm
  components/
    Home.jsx             # Dashboard with ring chart, category progress bars
    Flashcards.jsx       # SRS-powered flashcards with confidence rating (1-4)
    WriteIt.jsx          # Type-the-term from definition
    FillBlank.jsx        # Fill in blanked keyword from definition
    Matching.jsx         # Timed term↔definition pairing game
    PracticeTest.jsx     # Multiple-choice timed quiz
    MixedTest.jsx        # Combined MC + write + blank + scenario questions
    CompareContrast.jsx  # Side-by-side confused pairs with quiz
    HardestTerms.jsx     # Auto-deck from lowest-accuracy terms
    Leaderboard.jsx      # Achievements, best scores, streaks
    CategoryFilter.jsx   # Reusable category pill filter
```

## Key Data Structures

### Term object (`data/terms.js`)
Each term has: `term`, `def`, `cat` (category), `blank` (keyword for fill-in-the-blank), `accept[]` (alternative accepted answers for write-it), `example` (real-world AP scenario).

Currently 129 terms across 17 categories: Perception, Gestalt, Attention, Depth, Memory Types, Memory Models, Encoding, Strategies, Retention, Retrieval, Forgetting, Distortion, Thinking, Problem Solving, Intelligence, Assessment, Mindset.

### Progress (`hooks/useProgress.js`)
Stored in `localStorage` under key `ap_progress`. Per-term object: `{ conf, seen, correct, interval, ease, nextReview, lastReview }`. Uses a simplified SM-2 spaced repetition algorithm.

### Confused Pairs (`data/terms.js`)
`CONFUSED_PAIRS` array of `[termA, termB]` for Compare & Contrast mode. 30 pairs of commonly confused AP Psych concepts.

## Build & Deploy
```bash
npm install        # Install dependencies
npm run dev        # Dev server (hot reload)
npm run build      # Production build → dist/
```
Pushing to `main` triggers automatic GitHub Pages deploy via Actions.

## Adding/Editing Terms
Edit `src/data/terms.js`. Each term needs all 6 fields. If adding a new category, it auto-appears in filters. Update `CONFUSED_PAIRS` if adding related terms. Old localStorage progress won't apply to renamed terms (progress keys match term names exactly).
