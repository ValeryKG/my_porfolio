# Portfolio Update Protocol — Read the Code First
> For Claude Code. Run this before writing any portfolio copy for an existing app.
> Version: 1.0 — 2026-04-17

---

## THE RULE

**Never use a spec or planning document as the source of truth for portfolio copy.**

Planning docs describe intent. Source files describe reality. An app in production for months has drifted from its spec — features added, features changed, things never built. Writing portfolio copy from the spec produces entries that are wrong, generic, or miss what's actually unique.

**Always read the actual source files first. Then write.**

---

## WHEN TO USE THIS PROTOCOL

Any time you are:
- Adding a new app to the portfolio
- Updating an existing portfolio entry
- Writing descriptions, features, or architecture for any app

**Even if the user just told you what to write — verify it against the code.**

---

## STEP 1 — FIND THE CURRENT STATE FILE

Each app project should have a `[APPNAME]-CURRENT-STATE.md` in its root.
This is the pre-read source of truth, updated from actual source files.

Check for it first:
```
Read: [project-root]/[APPNAME]-CURRENT-STATE.md
```

**If it exists:** use it as the starting point. Still spot-check key claims against source.

**If it doesn't exist:** run Step 2 to generate it. Save it for next time.

---

## STEP 2 — READ THESE FILES IN ORDER

Do this when there is no current state file, or when the app may have changed since the last snapshot.

### 2a. Types / Data model
```
Read: src/types/index.ts   (or src/types.ts)
```
This tells you what's actually stored. Fields that don't exist here don't exist.
Look for: interfaces, type aliases, any fields that weren't in the spec.

### 2b. Routes / App shell
```
Read: src/App.tsx
```
This tells you what pages actually exist and what the routing logic is.
Look for: which routes are live, auth guards, special states (WaitingForAccess, Onboarding etc).

### 2c. Page list
```
Bash: ls src/pages/
```
Every file here is a real screen. Every missing file is a screen that wasn't built.

### 2d. Component list — look for surprises
```
Bash: ls src/components/   (and subdirs)
```
Component folders often reveal features the spec didn't include.
A `requests/` folder means the request system is built. A `gamification/` folder means it shipped.

### 2e. Hooks
```
Bash: ls src/hooks/
```
Custom hooks = custom features. A hook that doesn't exist in the spec means something was added.

### 2f. Line count
```
Bash: find src -name "*.tsx" -o -name "*.ts" | xargs wc -l | tail -1
```
Get the real number. Round to nearest 100.

---

## STEP 3 — COMPARE TO THE SPEC

After reading the source, ask:
- What's in the source that wasn't in the spec? **(add to portfolio)**
- What's in the spec that isn't in the source? **(don't claim it)**
- What changed from the spec? **(use the real version)**

Common drift patterns:
- Features got more sophisticated (e.g. `pending → promised` instead of just `approved`)
- Fields got added to the data model (e.g. `minQuantity`, `needsRestock`)
- New hooks added for features that emerged during development
- Some spec features never got built (just don't mention them)

---

## STEP 4 — WRITE THE CURRENT STATE FILE

Save a `[APPNAME]-CURRENT-STATE.md` in the project root with:

```markdown
# [AppName] — Current State
> Generated: [date]
> Source of truth for portfolio copy.

## Identity
- URL, access type, status, build time, LOC

## Tech Stack (confirmed from source)

## Routes (confirmed from App.tsx)

## Data Model (confirmed from types/index.ts)
- List actual interfaces and fields — note anything NOT in the spec

## Features — What's Actually Built
- ✅ Built and confirmed
- ❌ In spec but not found in source

## Hard Problems Solved
- Only include what's verifiable from the code

## What's NOT Built Yet
- Honest list of spec items not found in source
```

---

## STEP 5 — WRITE PORTFOLIO COPY FROM THE STATE FILE

Now open `PORTFOLIO-REBUILD.md` and `NEW-PROJECT-INTAKE.md`.

Follow their guidance for:
- What the target reader cares about (CTO, technical co-founder)
- What NOT to say (generic claims, buzzwords)
- Which numbers stop a reader (build time, specific scale numbers)
- Hard problems format: situation → wrong approach → what was done

---

## WHAT NOT TO DO

- Do NOT read only the spec/planning doc and write from that
- Do NOT assume a feature exists because it was planned
- Do NOT use line counts from planning estimates — run `wc -l`
- Do NOT write "production app, real problems" — Section 12 of NEW-PROJECT-INTAKE.md
- Do NOT lead with the tech stack or "PWA" — that is not the differentiator
- Do NOT call something "invite-only" if the access type is public in the code

---

## CHECKLIST BEFORE WRITING ANY PORTFOLIO ENTRY

- [ ] Read `src/types/index.ts` — data model confirmed
- [ ] Read `src/App.tsx` — routes and auth states confirmed
- [ ] Listed `src/pages/` — all pages confirmed to exist
- [ ] Listed `src/components/` — no unnoticed feature folders
- [ ] Listed `src/hooks/` — no unnoticed custom features
- [ ] Line count run with `wc -l`
- [ ] Compared source to spec — drift documented
- [ ] Current state file written or updated
- [ ] Portfolio copy written from current state file, not spec
