# PORTFOLIO REBUILD — Claude Code Session Prompt
> Save this file in the portfolio project root.
> Run at the start of any portfolio update session.
> Version: 1.0 — 2026-04-16

---

## WHO THIS PORTFOLIO IS FOR

Before touching any code, understand who needs to recognize themselves in this portfolio.

This is NOT a portfolio for everyone. It is for one specific reader:

- A technical co-founder or CTO who needs one person to act as product manager, architect, and builder
- A startup or small company that has burned through developers who shipped unmaintainable code
- A non-technical founder who needs a complete product built, not a feature added
- A company serving Israeli, Russian-speaking, or Arabic-speaking markets who needs someone who understands those contexts from the inside
- A PM role at a company that ships real software and values analytical thinking over title chains

Everyone else is not the audience. Do not write for everyone else.

---

## WHAT MAKES THIS PERSON DIFFERENT — READ THIS BEFORE WRITING ANYTHING

These are facts, not claims. They come from the actual project files.

**1. Build velocity with full-time job constraints**
TimeClock GPS: 18,639 lines, 6 user roles, 5 GPS algorithms, bcrypt auth, 4 languages — 31 calendar days, evenings and weekends only.
HomeBase: 7,818 lines, production-grade PWA, real family in production — 6 calendar days.
These are not "fast for a solo developer." These are fast by any standard.

**2. A compounding methodology, not a collection of apps**
23 documents in a shared `Documents for Claude` library. Built incrementally from real bugs in real projects.
Every failure that mattered became a rule. Every rule applies to the next project.
The session protocol (doc 20) solves AI amnesia — forces context re-read before any coding.
The decision tree (doc 00) forces 6 staged gates before the first line of code.
This is not a checklist. It is a system that gets more precise with each project.

**3. Decisions documented, not forgotten**
StockPilot has 12 dated Architecture Decision Records. Each one documents:
- What the problem was
- What the wrong solution looked like
- What was chosen and why
- What this rules out going forward
This is a senior engineering practice. Most teams don't do it. This is done solo.

**4. Bugs become library updates**
HomeBase found two PWA install prompt edge cases during development.
Both failures updated docs 09 and 08 in the shared library.
The next project starts with those lessons already encoded.
That is compounding knowledge, not isolated problem-solving.

**5. Real markets, not demo markets**
Hebrew, Arabic, Russian, English — with full RTL layout support.
Not added as a feature. Baked into the architecture from day one.
These are markets most developers cannot serve even if they try.

**6. The Basketball Blueprint is a knowledge system, not a website**
43,160 lines of pure HTML. No framework. Chart.js data embedded directly.
Backed by 10 years of collected basketball statistics and 100+ pages of AI-assisted research.
Every system recommendation includes the PPP data explaining WHY it works.
There is no other coaching resource structured this way.

---

## WHAT THE PORTFOLIO MUST SHOW

### Section 1 — Hero

**Headline (update this):**
"18,600 lines. 6 user roles. 5 GPS algorithms. 31 days."

This is the first thing a reader sees. It must be specific enough to stop someone who understands what it means. Generic claims ("production apps, real problems") stop no one.

**Subheadline:**
"One person. A system that compounds. Four markets most developers can't serve."

**Stats row — replace current stats with:**
- `31 days` → TimeClock GPS build time (label: "Largest app, evenings only")
- `6 days` → HomeBase build time (label: "Latest app, production on day 6")
- `23 docs` → Shared methodology library (label: "Compounding knowledge system")

Do NOT use lines of code as a hero stat. It signals quantity, not quality.

---

### Section 2 — The System (NEW SECTION — add before app list)

This section does not exist yet. It must be added.

Title: "How it's built — not what"

Three cards:

**Card 1 — Before the first line**
"Every project starts with a 6-stage decision tree. Architecture questions answered. Data model documented. Design system locked. Legal pages live. Six gates. None are skippable. This is why the apps work in production — not because of talent, but because of sequence."

**Card 2 — Decisions that don't disappear**
"Every meaningful choice gets an Architecture Decision Record: what the problem was, what the wrong solution looked like, what was chosen and why. StockPilot has 12 of them. When the same pattern appears in a new app, the answer is already written."

**Card 3 — Failures that become rules**
"When HomeBase exposed two PWA install prompt edge cases, those bugs updated the shared guide library. The next app starts with those lessons already encoded. Six projects in — the system knows more than any single project does."

---

### Section 3 — Apps

**Apps to include (in this order):**
1. TimeClock GPS — most complex, flagship proof
2. StockPilot — best-documented, strongest ADR artifact
3. Baiti — longest-running, real production use
4. HomeBase — fastest build, newest, shows velocity
5. CourtIQ — basketball domain, unique market
6. MyHours — solo use case, freelancer market
7. Basketball Blueprint — knowledge system, separate category

**For StockPilot and HomeBase — add full entries to data.ts**

StockPilot entry must include:
- The `runTransaction` vs `writeBatch` race condition as a hard problem solved
- 12 ADRs as a methodology note
- Build time: 14 days, evenings
- Status: Live MVP, active development

HomeBase entry must include:
- The PWA install prompt one-shot bug as a hard problem solved
- The folder-level ACL without query complexity solution
- Build time: 6 days (first commit to production use)
- Status: Live, invite-only, real family use

**For Basketball Blueprint — reframe it**
Current framing: "a website about coaching"
Correct framing: "a knowledge system backed by 10 years of statistics"
The unique thing is not that it exists. It is that every recommendation includes the data explaining WHY. PPP figures, shot quality curves, coverage efficiency ratings — these are not decorations. They are the argument.

**Label in-progress apps honestly:**
Use a badge: "Live MVP — Active Development"
Do not pretend they are finished. Showing active velocity is more credible than a frozen portfolio.

---

### Section 4 — What does NOT belong

- "Production apps. Real problems. Real solutions." — remove. Means nothing specific.
- Lines of code as a headline stat — remove. Replace with time and scope.
- Any phrase that could be written by someone who has never shipped anything.
- Basketball section framed as "a knowledge system" without the data angle — the data IS the differentiator.

---

## TECHNICAL INSTRUCTIONS

### Files to update:
- `src/data.ts` — add StockPilot and HomeBase entries, update stats in TimeClock and Baiti
- `src/locales/en.json` — update hero title, subtitle, stats labels
- `src/locales/he.json` — same updates in Hebrew
- `src/components/Hero.tsx` — update stats row (3 new stats)
- `src/App.tsx` — add System section between Hero and AppsList
- Create new component: `src/components/SystemSection.tsx` (and mobile equivalent)

### New component — SystemSection.tsx
Three cards as described above.
Follow existing card style from AppsList: white background, border #e5e7eb, border-radius 16px.
Section label style: same as AppsList label — small caps, accent color, letter-spacing.
Section title: same weight/size as AppsList title.
Mobile version: stack cards vertically, same padding as other mobile components.

### Stats row in Hero — replace hardcoded values:
Current:
```
{ value: '4', label: 'Projects' },
{ value: '80K+', label: 'Lines of Code' },
{ value: '3', label: 'Production Apps' },
```
Replace with:
```
{ value: '31 days', label: 'Largest app, evenings only' },
{ value: '6 days', label: 'Latest app, production on day 6' },
{ value: '23 docs', label: 'Shared methodology library' },
```

### App status badges
Add `status` field to Project interface in data.ts:
```typescript
status: 'production' | 'live-mvp' | 'in-development'
```
Show badge on app cards for 'live-mvp' and 'in-development'.
'production' shows no badge (implies fully stable).

---

## BEFORE ENDING THE SESSION

- [ ] All new text matches existing typography and color system
- [ ] Mobile versions updated alongside desktop versions
- [ ] Hero stats updated in both en.json and he.json
- [ ] SystemSection renders correctly at 375px width
- [ ] StockPilot and HomeBase entries have the same data shape as existing entries
- [ ] No hardcoded colors — all values from CSS variables
- [ ] Test in incognito after deploy

---

## WHAT NOT TO CHANGE

- The dual desktop/mobile component tree — intentional architecture, do not collapse
- The existing app detail structure (problem / solution / features / metrics / architecture)
- The contact modal
- The basketball section structure — update content only, not structure
- Firebase hosting configuration
