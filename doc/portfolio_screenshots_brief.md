# Portfolio Screenshots — Implementation Brief

## Goal
Add screenshot carousels to the portfolio so each app card and detail page shows real UI proof.
The portfolio already has a professional, clean aesthetic (navy/white, minimal, desktop + mobile layouts).
Screenshots must feel native to that design — not bolted on.

## What We Have
12 screenshots already placed in `public/screenshots/`:

**Baiti** (purple theme, Israeli building management):
- `baiti_building_budget.jpg` — Building Budget screen, ₪300 balance, Add Transaction form
- `baiti_resident_tutorial.jpg` — Resident Tutorial with Hebrew/English/Russian language toggle
- `baiti_user_guides.jpg` — User Guides with Building Manager and Resident guide cards

**TimeClock GPS** (purple/blue theme, workforce time tracking):
- `gps_PIN_screen.jpg` — PIN entry screen with live clock, 4 languages (EN/עב/ع/РУ)
- `gps_manager_live_status.jpg` — Manager dashboard, Live Status tab, Today's Activity
- `gps_site_config.jpg` — Edit Site modal with real GPS coordinates and radius settings

**MyHours** (blue theme, personal time tracking):
- `myHours_a.jpg` — "Why MyHours?" landing page, 6 value props, EN/HE/AR/RU in navbar
- `myHours_b.jpg` — Time Logs with Basketball Haim + CyberArc workplaces, 214h 30m total
- `myHours_c.jpg` — Reports summary March 2026, ₪1500.00 estimated earnings, Export PDF/Excel

**CourtIQ** (dark navy theme, basketball player development):
- `courtIq_a.jpg` — Player Dashboard with Coach Workouts, progress bar, Scouting Reports
- `courtIq_b.jpg` — Sessions — Player view, skill list with defensive skills, progress tracking
- `courtIq_c.jpg` — Skills Library, 176 available, PPP ratings, category/age filters

---

## Data Changes — src/data.ts

Add a `screenshots` field to the `Project` interface:

```typescript
screenshots?: { file: string; caption: string }[];
```

Add screenshots arrays to each project in the `apps` array:

**baiti:**
```typescript
screenshots: [
  { file: '/screenshots/baiti_resident_tutorial.jpg', caption: 'Hebrew, English, Russian — residents use the app in their own language' },
  { file: '/screenshots/baiti_building_budget.jpg', caption: 'Building budget tracking with income, expenses, and live balance' },
  { file: '/screenshots/baiti_user_guides.jpg', caption: 'Built-in guides for every role — no support calls needed' },
]
```

**timeclock:**
```typescript
screenshots: [
  { file: '/screenshots/gps_PIN_screen.jpg', caption: 'Secure PIN entry — 4 languages, works on any device' },
  { file: '/screenshots/gps_manager_live_status.jpg', caption: 'Manager sees who is clocked in right now, in real time' },
  { file: '/screenshots/gps_site_config.jpg', caption: 'Per-site GPS radius configuration — precise location enforcement' },
]
```

**basketball-portal:**
```typescript
screenshots: [
  { file: '/screenshots/courtIq_a.jpg', caption: 'Player dashboard — assigned workouts, progress tracking, scouting reports' },
  { file: '/screenshots/courtIq_b.jpg', caption: 'Session view — defensive skill list with coach observation logging' },
  { file: '/screenshots/courtIq_c.jpg', caption: '176 skills and drills — filtered by category, age group, and impact' },
]
```

**myhours:**
```typescript
screenshots: [
  { file: '/screenshots/myHours_a.jpg', caption: 'GPS timestamps prove where and when you worked — free, 4 languages' },
  { file: '/screenshots/myHours_b.jpg', caption: 'Time logs across multiple workplaces with full history' },
  { file: '/screenshots/myHours_c.jpg', caption: 'Monthly earnings summary with PDF and Excel export' },
]
```

---

## Component Changes

### 1. AppsList.tsx — Thumbnail on each card

Add a screenshot thumbnail at the top of each app card (above the title).
Show only the **first screenshot** from the array as a static preview.

Requirements:
- Image height: `160px`, width: `100%`, `object-fit: cover`, `border-radius: '8px 8px 0 0'`
- The card already has `padding: '32px'` — move the image **outside/above** the padding area
- No caption on the card thumbnail — just the visual
- If no screenshots exist, render nothing (graceful fallback)
- Keep all existing card hover effects and click behavior unchanged

### 2. AppDetail.tsx — Screenshot carousel on project detail page

Add a carousel section **after the hero banner** and **before the stats grid**.

Requirements:

**Layout:**
- Max width matches the rest of the detail page (`1100px`, `margin: '0 auto'`, `padding: '0 24px'`)
- Each slide shows one screenshot centered
- Image max height: `480px`, `object-fit: contain`, background: `var(--color-bg-subtle)` or `#f8f9fa`
- Rounded corners: `12px`
- Caption below image: small text, muted color (`var(--color-text-muted)`), centered, `font-size: '0.85rem'`, `margin-top: '12px'`

**Navigation:**
- Previous / Next arrow buttons on left and right sides
- Dot indicators below caption — one dot per slide, active dot uses `var(--color-accent)`
- Arrow buttons: subtle, not aggressive — outline style or simple chevrons
- If only one screenshot, hide navigation entirely

**Behavior:**
- No auto-advance — user controls it
- Touch/swipe support for mobile (touchstart / touchend delta)
- Keyboard: left/right arrow keys when carousel is focused

**Styling rules — must match existing portfolio aesthetic:**
- No new colors — use only existing CSS variables from `index.css`
- No shadows that clash with the existing card style
- No heavy borders — keep it light and minimal
- The carousel should feel like it belongs, not like a widget dropped in

### 3. Mobile components — src/components/mobile/

Apply the same changes to the mobile equivalents:
- `mobile/AppsList.tsx` — same thumbnail treatment
- `mobile/AppDetail.tsx` — same carousel, adjusted for mobile width (full width, smaller arrows)

---

## CSS Variables Available (from index.css)
Use these — do not hardcode colors:
- `var(--color-navy)` — primary dark
- `var(--color-accent)` — blue accent
- `var(--color-bg)` — page background
- `var(--color-border)` — subtle border
- `var(--color-text-muted)` — secondary text
- `var(--color-shadow-hover)` — card hover shadow

---

## What NOT to do
- Do not add a lightbox or modal — keep it simple
- Do not add lazy loading libraries — native `loading="lazy"` on img tags is enough
- Do not change any existing layout, spacing, or color
- Do not add external dependencies
- Do not auto-advance the carousel
- Do not show more than one screenshot at a time

---

## Validation
After implementation:
1. Each app card in AppsList shows a thumbnail at the top
2. Clicking any card opens AppDetail with a working carousel
3. Carousel navigates with arrows and dots
4. Swipe works on mobile
5. If screenshots array is empty or missing, no errors, no broken layout
6. Both desktop and mobile component trees updated
