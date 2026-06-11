# Bowling Plus Simulator — Context for Claude

## What this project is

A web simulator for a bowling message pipeline system. Built with Vite + React 18 + TypeScript.
Deployed target: Vercel / GitHub Pages.

The simulator serves two purposes:
1. Test and visualize the message pipeline during development
2. Generate Unity-compatible C# code and JSON config for the actual bowling alley game

## Project structure

```
src/
  engine/
    types.ts       — all interfaces and enums (GameState, Frame, GameContext, EventType, Message…)
    scoring.ts     — bowling scoring engine (buildFrames, isGameOver, maxPinsSecondThrow)
    context.ts     — buildContext(): computes derived state (streaks, phase, flags)
    events.ts      — detectEvent(): maps pins + context → EventType
    pipeline.ts    — selectMessage(): rotating variant selector per event type
  data/
    messages.ts    — 75 messages: 25 EventTypes × 3 variants, in Italian
                     voices: reactive | encouraging | educational
  generators/
    csharp.ts      — generateCSharp(): outputs complete Unity C# file
    json.ts        — generateJSON(): outputs grouped JSON config
  components/
    Scorecard.tsx       — 10-frame scorecard with X / / symbols
    ThrowInput.tsx      — buttons 0–10 + optional split buttons
    MessageDisplay.tsx  — current message with voice color coding
    MessageLog.tsx      — reverse-chronological log of all events
  App.tsx          — main app, state management, auto-simulate, export
  index.css        — dark theme styles
  main.tsx         — entry point
```

## Bowling scoring rules (implemented in scoring.ts)

- Frames 1–9: open (sum), spare (10 + next throw), strike (10 + next 2 throws)
- Frame 10: no bonuses. If strike on throw 1 → 3 throws allowed. If spare on throws 1-2 → 3 throws allowed. Otherwise 2 throws.
- Perfect game = 12 strikes = 300 points

## Message pipeline architecture

EventType (25 types) + GameContext → message pool (3 variants each) → rotating selector

Context variables computed by buildContext():
- `phase`: 'early' (frames 1-3) | 'mid' (4-7) | 'late' (8-10)
- `streakStrike` / `streakSpare`: consecutive count
- `hasHadStrike` / `hasHadSpare`: boolean, first time flags
- `isPerfectGamePath`: all strikes so far
- `prevFrameResult`: 'strike' | 'spare' | 'open' | null
- `isSplit`: manually flagged by user
- `pinsFirstThrow`: pins knocked on first throw of current frame
- `lowSeriesCount`: frames with < 4 pins

Message voices:
- `reactive` — immediate reaction (yellow/orange tint)
- `encouraging` — motivational (green tint)
- `educational` — teaching moment (blue tint)

## EventType list (25 types)

GUTTER_FIRST, GUTTER_REPEATED, LOW_1_3, MEDIUM_4_6, HIGH_7_9, SPLIT,
STRIKE_FIRST, STRIKE_DOUBLE, STRIKE_TURKEY, STRIKE_MULTI, STRIKE_COMEBACK,
STRIKE_PERFECT_PATH, GUTTER_AFTER_GUTTER, MISSED_SPARE, OPEN_FRAME,
SPARE_FIRST, SPARE_AFTER_GUTTER, SPARE_NORMAL, SPARE_CONSECUTIVE,
FRAME10_START, FRAME10_STRIKE, FRAME10_SPARE, FRAME10_FINAL,
LOW_SERIES, PERFECT_GAME_PATH

## Unity export

`generateCSharp()` in src/generators/csharp.ts produces a self-contained C# file with:
- `EventType` enum
- `MessageVoice` enum
- `BowlingMessage` class
- `BowlingMessageDatabase` static class (all 75 messages + SelectMessage with rotating logic)
- `BowlingScoring` static class (frame score calculation)

`generateJSON()` produces: `{ version: "1.0", events: { [EventType]: [{variant, voice, text}] } }`

## Design context

This pipeline was designed for a bowling alley lane screen (not a mobile app).
- Audience: beginners, reassuring and welcoming tone
- Visible to all players on the lane
- Only game events (no player change events)
- No handicap (HCP) logic
- Messages in Italian

The message matrix (25 events × 3 variants) was designed in a FigJam board ("Bowling Plus Grid").
Figma file ID for design assets: 7P40OUyZz0BeUxbHnwioK0

## Running locally

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
```

## Deployment

The project is ready for Vercel (connect GitHub repo, auto-deploy on push to main).
No environment variables required.
