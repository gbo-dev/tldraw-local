# tldraw-local

Local self-hosted [tldraw](https://github.com/tldraw/tldraw) whiteboard. Runs entirely offline, auto-saves your work, and shuts down when you're done.

## Quick start

```bash
npm install && npm run dev:managed
```

## Features

- **Full tldraw editor**: infinite canvas, drawing, shapes, text, arrows, sticky notes, images
- **Auto-save**: persisted to IndexedDB via `persistenceKey`; survives refresh and restart
- **Dark mode by default**: no blinding white screen
- **Self-hosted fonts**: Inter (UI) + Caveat (handwriting) via `@fontsource`, no external CDN calls
- **Auto-shutdown**: server quits after 15 minutes of inactivity; no lingering Node processes

## How auto-shutdown works

The dev server wraps Vite with an inactivity timer. The frontend sends a ping only while the tab is visible **and** you're actively using it (mouse, keyboard, scroll, click, touch). If you walk away, minimize, or close the tab, pings stop — and the server shuts down after 15 minutes.

| Condition | Timeout |
|-----------|---------|
| No user input (frontend stops pinging) | 2 minutes |
| No pings received (server shuts down) | 15 minutes |

## Scripts

- `npm run dev`: standard Vite dev server (no auto-shutdown)
- `npm run dev:managed`: managed server with auto-shutdown

## Desktop entry

Install the launcher to your app menu:

```bash
cp tldraw.desktop ~/.local/share/applications/
update-desktop-database ~/.local/share/applications/
```

The desktop file references `tldraw-icon.svg` for the app icon. The tldraw logo assets
are [available in their GitHub repo](https://github.com/tldraw/tldraw/tree/main/assets). Download an SVG and save it as `tldraw-icon.svg` in the repo root.

## Stack

- tldraw 5.x
- React 19 + Vite
- Inter + Caveat fonts (self-hosted via @fontsource)
- IndexedDB persistence
