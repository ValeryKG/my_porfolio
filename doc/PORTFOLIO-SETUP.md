# Portfolio — VS Code Project Setup

---

## Before You Start

Make sure you have:
- VS Code open
- Node.js installed (if you built MyHours/TimeClock you already have it)
- Terminal access in VS Code (Menu → Terminal → New Terminal)

---

## Step 1 — Pick Your Folder

Open VS Code.

Go to **File → Open Folder** and navigate to where you want the portfolio project to live. Pick or create a folder — for example something like `Projects` where your other apps are.

This is just your parent folder. The next step creates the actual project folder inside it.

---

## Step 2 — Open Terminal

In VS Code go to:

**Menu → Terminal → New Terminal**

You should see a terminal panel at the bottom. Make sure the path shown matches the folder you opened in Step 1.

---

## Step 3 — Create the Project

Type this in the terminal and press Enter:

```bash
npm create vite@latest portfolio -- --template react-ts
```

**What happens:**
- Vite creates a new folder called `portfolio`
- Inside it puts React + TypeScript already configured
- You'll see some output in terminal confirming it worked

When it finishes you should see something like:

```
✓  Created portfolio
```

---

## Step 4 — Go Into the Project Folder

```bash
cd portfolio
```

Now your terminal is inside the `portfolio` folder. Everything from here runs inside this folder.

---

## Step 5 — Install Dependencies

```bash
npm install
```

**What happens:** Downloads all the base packages into `node_modules`. Takes 10–30 seconds depending on internet speed.

---

## Step 6 — Install Tailwind CSS

```bash
npm install tailwindcss @tailwindcss/vite
```

Same styling we use in your other apps.

---

## Step 7 — Open the Project in VS Code

Now open this new project folder in VS Code:

**File → Open Folder → navigate to `portfolio`**

You should now see the project structure in the left sidebar:

```
portfolio/
├── node_modules/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── package.json
├── tsconfig.json
└── vite.config.ts
```

This is the default Vite template. We modify it in the next steps.

---

## Step 8 — Update vite.config.ts

Open **vite.config.ts** (in the root of the project).

**Delete everything** in it and paste:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

**Why:** Tells Vite to use Tailwind. Without this, Tailwind classes won't work.

---

## Step 9 — Replace src/index.css

Open **src/index.css**.

**Delete everything** and paste:

```css
@import "tailwindcss";

@layer base {
  :root {
    --color-bg: #0a0a0f;
    --color-surface: #12121a;
    --color-surface-hover: #1a1a2a;
    --color-border: #2a2a3a;
    --color-text: #e8e8ec;
    --color-text-muted: #6b6b7b;
    --color-accent: #4f9eff;
    --color-accent-dim: rgba(79, 158, 255, 0.12);
    --color-green: #34d399;
    --color-green-dim: rgba(52, 211, 153, 0.12);
    --color-orange: #fb923c;
    --color-orange-dim: rgba(251, 146, 60, 0.12);
  }

  * {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background: var(--color-bg);
    color: var(--color-text);
    font-family: 'IBM Plex Mono', 'Courier New', monospace;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }
}
```

**Why:** Our design system. Dark theme, monospace font, color variables every component will use.

---

## Step 10 — Delete Files We Don't Need

Delete these files/folders from the sidebar (right-click → Delete):

- **src/App.css** — we don't need it, index.css handles everything
- **src/assets/** — entire folder, just has a default React logo
- **public/vite.svg** — default Vite logo, not needed

---

## Step 11 — Replace src/main.tsx

Open **src/main.tsx**.

**Delete everything** and paste:

```typescript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

**Why:** Almost the same as default but removes reference to App.css which we deleted.

---

## Step 12 — Replace src/App.tsx

Open **src/App.tsx**.

**Delete everything** and paste:

```typescript
export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <h1 style={{ padding: '40px', fontWeight: 300, fontSize: '1.5rem' }}>
        Portfolio — setup working ✓
      </h1>
    </div>
  )
}
```

**Why:** Temporary placeholder. Just to confirm everything works before we build real components.

---

## Step 13 — Test

Open terminal in VS Code and run:

```bash
npm run dev
```

Open browser, go to:

```
http://localhost:5173
```

**You should see:**
- Dark background
- Text saying "Portfolio — setup working ✓"
- No errors in terminal

---

## If Something Is Wrong

**Blank white page:**
- Check that src/App.css is deleted
- Check main.tsx doesn't import App.css

**Tailwind not working (colors not applying):**
- Check vite.config.ts has the tailwindcss import
- Check index.css starts with `@import "tailwindcss";`

**Terminal errors:**
- Run `npm install` again
- Check you're inside the `portfolio` folder

---

## Done ✓

When Step 13 works, tell me. Next step we create the data file with all project information — that's where Baiti, TimeClock, MyHours, and Basketball content goes.
