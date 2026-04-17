# New Project Intake — Portfolio Addition Template
> Fill this out for any new or in-progress project.
> When done, send it to Claude with: "Add this project to the portfolio using NEW-PROJECT-INTAKE.md"
> Version: 1.0 — 2026-04-17

---

## HOW TO USE THIS FILE

Fill every section. Leave nothing as "TBD" unless marked optional.
The portfolio reader is a technical co-founder or CTO. They skip generic claims.
Numbers stop them. Specific problems stop them. "Production app" does not.

---

## 1. IDENTITY

**Project name:**
<!-- The actual name shown in the app -->

**Tagline (one line, under 60 characters):**
<!-- What it does in the fewest words. Should be specific, not catchy. -->
<!-- Bad: "Your business, simplified" -->
<!-- Good: "GPS-verified time tracking for teams that don't trust spreadsheets" -->

**App ID (used in URL, lowercase, no spaces):**
<!-- e.g. timeclock, baiti, homebase -->

**Live URL:**
<!-- Full URL including https:// — or "not deployed yet" -->

**Access type:**
<!-- public (anyone can register) OR request (must contact you for access) -->

**Access note (if request-only):**
<!-- One sentence explaining why it's private and what the reader should do. -->
<!-- e.g. "Production app in active use — contact for access credentials" -->

---

## 2. BUILD REALITY — THE NUMBERS THAT MATTER

These go in the stats row. Be honest. Rounding is fine. Guessing is not.

**Lines of code (approximate):**
<!-- Run: find src -name "*.ts" -o -name "*.tsx" -o -name "*.js" | xargs wc -l -->
<!-- Or just your best estimate. 18,600 is more credible than "~20K" -->

**Build time:**
<!-- Format: "X days (evenings only)" or "X weeks (full-time)" -->
<!-- This is calendar days from first commit to first production use. Not dev hours. -->

**User roles (how many distinct permission levels):**

**Key scale number (pick the most impressive specific number):**
<!-- e.g. "286 security rule lines", "5 GPS algorithms", "12 ADRs", "176 skills in library" -->
<!-- What number would make a senior engineer stop and ask "wait, how?" -->

**Languages supported:**
<!-- Hebrew / Arabic / Russian / English — list only what's real -->

**Status:**
<!-- production (stable, no major development) -->
<!-- live-mvp (deployed, actively improving) -->
<!-- in-development (not yet deployed or in beta) -->

---

## 3. THE PROBLEM — WHY THIS EXISTS

Answer these. Don't summarize — describe the actual situation.

**Who suffers from this problem right now?**
<!-- Be specific. "Israeli building managers using WhatsApp" beats "property managers" -->

**What does the broken version look like before your app?**
<!-- What are they doing manually? What takes 2 hours? What gets lost? -->
<!-- This is the "before" state. Make it feel real. -->

**Why is this problem hard to solve?**
<!-- What makes it non-obvious? What did you have to understand about this market/context to build it? -->
<!-- e.g. "Hebrew RTL + Arabic RTL in the same app with dynamic content" -->
<!-- e.g. "3 simultaneous writes to the same document from different roles" -->

---

## 4. THE SOLUTION — WHAT YOU ACTUALLY BUILT

**One paragraph describing what the app does and why it works:**
<!-- Focus on the design decisions that made it work, not the feature list. -->
<!-- The feature list comes later. This is the "why it works" paragraph. -->

---

## 5. HARD PROBLEMS SOLVED — THE MOST IMPORTANT SECTION

List 1–3 specific technical or architectural problems that were non-obvious.
These are what separates this from a tutorial project.

**Hard problem 1:**
<!-- Name: what the problem was called or how you'd describe it in a PR -->
<!-- Situation: what broke or would break if you got this wrong -->
<!-- Wrong approach: what the obvious solution was and why it fails -->
<!-- What you did: the actual decision and why it was correct -->

**Hard problem 2 (optional):**
<!-- Same format -->

**Hard problem 3 (optional):**
<!-- Same format -->

Examples of what belongs here:
- Race condition: runTransaction vs writeBatch when two roles update the same record
- One-shot events: PWA install prompt fires once — handled wrong and it's gone forever
- Folder-level ACL without per-document queries that would blow the read budget
- Offline-first sync: IndexedDB + Firestore with conflict resolution
- GPS accuracy: Haversine formula + radius calibration per site
- Custom auth: bcrypt PIN instead of Firebase Auth — why and how

---

## 6. FEATURES LIST

List 4–8 features. Each gets a title and one sentence of description.
Focus on features that prove the problem was solved — not standard CRUD.

| Feature title | What it does (one sentence) |
|---|---|
| | |
| | |
| | |
| | |
| | |

---

## 7. BEFORE / AFTER METRICS

If you have real numbers or reasonable estimates, list them.
If you can't estimate, skip this — empty cells are worse than no table.

| What changed | Before | After |
|---|---|---|
| | | |
| | | |
| | | |

---

## 8. ARCHITECTURE

**One paragraph, technical audience, explaining how it's actually built:**
<!-- State management approach, database structure, auth method, key libraries. -->
<!-- What would surprise a senior engineer? What did you not use and why? -->
<!-- e.g. "No Redux — Context + useReducer with Firestore real-time listeners" -->
<!-- e.g. "No Firebase Auth — custom bcrypt PIN stored client-side in IndexedDB" -->

---

## 9. TECH STACK

List technologies used. Order: framework first, then DB, then auth, then infra/tools.

```
- 
- 
- 
- 
- 
```

---

## 10. SCREENSHOTS (OPTIONAL BUT VALUABLE)

If you have screenshots saved in `/public/`:

| Filename | Caption (what it shows, why it matters) |
|---|---|
| /yourapp_screen1.jpg | |
| /yourapp_screen2.jpg | |
| /yourapp_screen3.jpg | |

---

## 11. METHODOLOGY NOTES (OPTIONAL)

Fill only if applicable. These are rare and valuable to include.

**Architecture Decision Records:**
<!-- Did you write ADRs? How many? What was the most important one? -->

**Library updates from this project:**
<!-- Did a bug or edge case here improve your shared docs for future projects? -->
<!-- e.g. "PWA install prompt one-shot behavior → updated doc 09" -->

**What the next project will start knowing:**
<!-- What does this project teach that the previous ones didn't? -->

---

## 12. WHAT NOT TO SAY

When Claude writes the portfolio copy, it will avoid these.
If you catch any of them in the draft — flag it.

- "Production app, real problems" — says nothing
- "Full-stack solution" — meaningless
- "Scalable and maintainable" — everyone claims this
- "Modern tech stack" — so does every tutorial
- Any sentence that could describe an app you've never used

The reader is technical. Show the work. Let them conclude.

---

## READY TO ADD?

When this file is filled out, open a Claude Code session in the portfolio directory and say:

> "Read NEW-PROJECT-INTAKE.md and add this project to the portfolio. Follow the same structure as existing entries in data.ts and PORTFOLIO-REBUILD.md."

Claude will use this file to:
1. Add the entry to `src/data.ts`
2. Verify the structure matches the existing `Project` interface
3. Place the app in the correct position in the list
4. Flag anything that's missing or inconsistent before writing
