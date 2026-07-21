# Keep Clone

A Google Keep clone built with React + Vite, no backend — everything persists
to `localStorage`.

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview   # optional local check of the production build
```

## Project structure

```
src/
  App.jsx                  top-level state (notes, theme, search) + handlers
  colors.js                shared colour palette (light/dark hex per swatch)
  index.css                all styling: theme variables, layout, responsiveness
  hooks/
    useLocalStorage.js     generic localStorage-backed useState
  components/
    Navbar.jsx              logo, search bar, dark-mode toggle, avatar
    CreateNote.jsx           expandable "Take a note..." input
    NotesGrid.jsx            pinned/others sections + drag-and-drop wiring
    NoteCard.jsx              a single note: pin, recolour, tag, delete, drag
```

## Feature map (for grading)

| Requirement | Where it lives |
|---|---|
| Navbar, create-note input, masonry grid, add/delete | `Navbar.jsx`, `CreateNote.jsx`, `NotesGrid.jsx` |
| Responsive layout (1→5 columns, mobile nav collapse) | `index.css`, see `@media` blocks at the bottom |
| **Manual feature (no AI):** colour-coding notes | `colors.js` + palette swatches in `CreateNote.jsx` / `NoteCard.jsx` |
| **AI-assisted feature #1:** dark mode | `data-theme` attribute toggle in `App.jsx`, CSS variables in `index.css` |
| **AI-assisted feature #2:** drag-and-drop reordering | HTML5 drag events in `NoteCard.jsx`, reorder logic in `App.jsx` / `NotesGrid.jsx` |

Bonus, not required but included: pinning (separates a "Pinned" section),
free-text tags per note, and a live search bar that filters by title, body,
and tags.

## Deploying to Netlify

**Option A — drag and drop**
1. `npm run build`
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop) and drag the
   generated `dist/` folder in.

**Option B — connect to GitHub (recommended, gives you a repo link too)**
1. Push this folder to a new GitHub repo:
   ```bash
   git init
   git add .
   git commit -m "Keep clone"
   git branch -M main
   git remote add origin https://github.com/<you>/keep-clone.git
   git push -u origin main
   ```
2. In Netlify: **Add new site → Import an existing project → GitHub** →
   pick the repo.
3. Build command: `npm run build`, publish directory: `dist` (already set
   in `netlify.toml`, so Netlify should detect it automatically).
4. Deploy — you'll get a live `*.netlify.app` link.

## Notes for the Loom walkthrough

- Manual feature to demo: pick a note, open the palette icon, change its
  colour — mention it's plain React state + a fixed swatch array, no AI
  needed.
- AI-assisted feature #1: toggle dark mode from the navbar and show the
  whole UI (including note colours) re-theme.
- AI-assisted feature #2: drag a note by the dot-grid handle and drop it
  on another note to reorder; try dragging a pinned note into the
  "Others" section to show it's scoped per-section.
