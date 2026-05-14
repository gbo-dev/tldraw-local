# tldraw-local

Local self-hosted tldraw whiteboard. Runs entirely offline, auto-saves your work, and shuts down when you're done.

## Quick start

```bash
npm install && npm run dev:managed
```

Or click the **tldraw** desktop entry to auto-start the server and open the browser.

## Features

- **Full tldraw editor** — infinite canvas, drawing, shapes, text, arrows, sticky notes, images
- **Auto-save** — persisted to IndexedDB via `persistenceKey`; survives refresh and restart
- **Dark mode by default** — no blinding white screen
- **Self-hosted fonts** — Inter (UI) + Caveat (handwriting) via `@fontsource`, no external CDN calls
- **Auto-shutdown** — server quits after 15 minutes of inactivity; no lingering Node processes
- **Desktop launcher** — `.desktop` entry for your app menu; starts server + opens browser in one click

## How auto-shutdown works

The dev server wraps Vite with an inactivity timer. The frontend sends a ping only while the tab is visible **and** you're actively using it (mouse, keyboard, scroll, click, touch). If you walk away, minimize, or close the tab, pings stop — and the server shuts down after 15 minutes.

| Condition | Timeout |
|-----------|---------|
| No user input (frontend stops pinging) | 2 minutes |
| No pings received (server shuts down) | 15 minutes |

## Scripts

- `npm run dev` — standard Vite dev server (no auto-shutdown)
- `npm run dev:managed` — managed server with auto-shutdown
- `npm run build` — production build
- `npm run preview` — preview production build

## Desktop entry

Install the launcher to your app menu:

```bash
cp tldraw.desktop ~/.local/share/applications/
update-desktop-database ~/.local/share/applications/
```

## Stack

- tldraw 5.x
- React 19 + Vite
- Inter + Caveat fonts (self-hosted via @fontsource)
- IndexedDB persistence
