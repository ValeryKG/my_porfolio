# ADD PROJECT TO PORTFOLIO
> Claude Code: read this file completely before writing a single line of code or copy.
> Version: 1.1 — 2026-04-17

---

## THE ONE RULE THAT OVERRIDES EVERYTHING

**The spec is not the source of truth. The source code is.**

Specs describe intent. Source files describe reality. An app that has been
running for weeks has drifted from its spec — features added, features changed,
things never built. Writing portfolio copy from a spec produces entries that are
wrong, generic, and miss what's actually unique.

**Read the code. Then write.**

---

## STEP 1 — IDENTIFY THE PROJECT

The user will tell you which project to add. Call it X.
Find the project directory. If you are not sure where it is, ask before proceeding.

---

## STEP 2 — READ THE SOURCE FILES IN THIS EXACT ORDER

Do not skip steps. Do not assume. Read and report what you find.

### 2a — Data model
```
Read: src/types/index.ts   (or src/types.ts)
```
This tells you what is actually stored. Fields not here do not exist.
Note anything that was NOT in the spec — those are often the most interesting features.

### 2b — App shell and routing
```
Read: src/App.tsx
```
This tells you which pages actually exist and what the routing logic is.
Note: auth guards, special states (WaitingForAccess, Onboarding, etc.), any
role-based routing. What's here is real. What's missing from here was never built.

### 2c — Pages
```
Bash: ls src/pages/
```
Every file here is a real screen. Every screen in the spec that isn't here was not built.

### 2d — Components — look for surprises
```
Bash: ls src/components/   (and all subdirectories)
```
Component folders reveal features. A `requests/` folder means the request system
shipped. A `gamification/` folder means it shipped. A folder that exists in the
spec but not here means it didn't ship.

### 2e — Custom hooks
```
Bash: ls src/hooks/
```
Custom hooks = custom features. A hook not in the spec means something was added
during development. These are often the most technically interesting things.

### 2f — Real line count
```
Bash: find src -name "*.tsx" -o -name "*.ts" | xargs wc -l | tail -1
```
Round to nearest 100. Use this number. Do not use estimates from planning docs.

### 2g — Build timeline
```
Bash: git log --oneline | wc -l          (total commits)
Bash: git log --format="%ai" | tail -1   (first commit date)
Bash: git log --format="%ai" | head -1   (latest commit date)
```
Calculate calendar days from first to latest commit. This is the build time.

---

## STEP 3 — REPORT WHAT YOU FOUND

Before writing any portfolio copy, report back:

```
PROJECT: [name]
Lines of code: [number from wc -l]
First commit: [date]
Latest commit: [date]
Calendar days: [calculated]
Total commits: [number]

Pages found in src/pages/:
- [list every file]

Notable component folders:
- [list any folders that suggest specific features]

Custom hooks:
- [list all]

Data model — key interfaces:
- [list interface names and notable fields]

Things in source NOT in spec:
- [list anything that looks like it was added during development]

Things in spec NOT in source:
- [list anything planned but not found in code]
```

Wait for confirmation before proceeding to Step 4.
If anything is unclear or missing, ask now — not after writing copy.

---

## STEP 4 — EXTRACT THE PORTFOLIO DATA

Using what you found in Step 3, extract the following.
Every field must come from source files, not the spec.

### Identity
- App name (from the UI, not the spec)
- Live URL (ask the user — not committed to source)
- Access type: public or request-only (check App.tsx auth flow)
- One-sentence problem (what does it replace or fix — from the user's context)
- Status: production / live-mvp / in-development

### The numbers that stop a reader
Pick the most impressive specific number from the codebase:
- Line count (real, from wc -l)
- Number of user roles (from types or routing)
- Number of languages (from i18n config)
- A specific technical number: ADR count, rule lines, algorithm count, etc.
- Build time in days

### Hard problems solved
Look for evidence of non-obvious solutions in:
- Any ADR files (app_md/ARCHITECTURE-DECISIONS.md)
- Comments in source that explain why something was done a specific way
- Hooks that solve edge cases (useInstallPrompt, useOfflineSync, etc.)
- Patterns that differ from the obvious approach

Format each hard problem as:
```
Name: [short label]
Situation: [what breaks if you get this wrong]
Wrong approach: [what the naive solution is and why it fails]
What was done: [the actual decision and why it works]
```

### Features list (4–8 items)
Only features confirmed in source. One title + one sentence each.
Focus on features that prove the problem was solved — not standard CRUD.

### Before / After metrics
Only include if real or reasonably estimated.
Empty table is worse than no table.

### Architecture paragraph
One paragraph for a technical reader.
State management approach, database structure, auth method, key libraries.
What would surprise a senior engineer? What did you NOT use and why?

---

## STEP 5 — WRITE THE PORTFOLIO ENTRY

Now open the portfolio project and add the entry to `src/data.ts`.

Follow the existing `Project` interface exactly:
```typescript
{
  id: string
  name: string
  tagline: string
  description: string
  url: string
  accessType: 'public' | 'request'
  accessNote?: string
  status: 'production' | 'live-mvp' | 'in-development'
  tech: string[]
  stats: { label: string; value: string }[]
  problem: string
  solution: string
  features: { title: string; description: string }[]
  metrics: { label: string; before: string; after: string }[]
  architecture: string
  linesOfCode: number
  buildTime: string
  screenshots?: { file: string; caption: string }[]
}
```

Place the app in the correct position in the array.
Current order: TimeClock GPS → StockPilot → Baiti → HomeBase → CourtIQ → MyHours → Basketball Blueprint.

---

## STEP 6 — QUALITY CHECK BEFORE FINISHING

Read the entry you just wrote and check every line against this list:

### Must be true
- [ ] Every feature listed exists in `src/pages/` or `src/components/`
- [ ] Line count matches `wc -l` output
- [ ] Build time matches git log dates
- [ ] No feature claimed that only exists in the spec
- [ ] URL confirmed with user (not guessed)
- [ ] Status badge is accurate

### Must not appear
- [ ] "Production app, real problems" — says nothing
- [ ] "Full-stack solution" — meaningless
- [ ] "Scalable and maintainable" — everyone claims this
- [ ] "Modern tech stack" — so does every tutorial
- [ ] Any sentence that could describe an app you have never seen
- [ ] Line count from a planning doc instead of wc -l

### Language check
- [ ] Tagline is specific, not catchy — describes what it does, not how it feels
- [ ] Problem section describes the actual broken situation before the app
- [ ] Architecture paragraph would mean something to a senior engineer
- [ ] Hard problems use situation → wrong approach → what was done format

---

## STEP 7 — SAVE A CURRENT STATE FILE

After writing the portfolio entry, save this file in the project root:

```
[PROJECT-ROOT]/[APPNAME]-CURRENT-STATE.md
```

Contents:
```markdown
# [AppName] — Current State
> Generated: [date]
> Source of truth for next portfolio update.
> Do not update this manually — regenerate from source files.

## Confirmed from source

**Lines of code:** [number]
**First commit:** [date]
**Build time:** [days] calendar days
**Total commits:** [number]

## Routes (from App.tsx)
[list]

## Data model (from types/index.ts)
[list interfaces and key fields]

## Pages (from src/pages/)
[list]

## Notable components / hooks
[list anything that reveals a non-obvious feature]

## Hard problems — confirmed in code
[list with evidence of where in code]

## NOT built (in spec but not in source)
[list]

## Portfolio entry written
[date] — added to data.ts
```

This file is the starting point for the next update.
Next time: read this file first, then spot-check against source if the app has changed.

---

## WHAT NOT TO DO — EVER

- Read only the spec and write from that
- Assume a feature exists because it was planned
- Use line counts from planning estimates
- Write "production app, real problems"
- Lead with the tech stack or "PWA" — that is not the differentiator
- Call something invite-only if the auth flow in App.tsx allows open registration
- Skip the git log step and guess the build time
- Start writing before reporting findings and getting confirmation