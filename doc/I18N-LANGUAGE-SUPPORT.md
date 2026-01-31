# Portfolio — Language Support (i18n)

**What:** Added English and Hebrew support to the portfolio.  
**Why:** Same reason as in your other apps — no one gets left behind. Hebrew is your primary market (Israel), English reaches everyone else. EN is default.

---

## Why i18next?

You already use it in TimeClock GPS and MyHours. Same library, same pattern, same JSON structure. No learning curve — you already know how this works.

The alternative would be to hardcode text directly into components. That works for one language. The moment you need a second language, you'd have to go through every single component and pull text out manually. By setting up i18next now — before we write any components — every component we build tomorrow just uses `t('key')` and it works in both languages automatically.

---

## What We Added

Three things:

1. **The library** — `i18next` + `react-i18next`
2. **Two JSON files** — one per language, all the text lives here
3. **One config file** — tells i18next where to find the translations and what the default language is

---

## File Structure

```
src/
├── i18n.ts              ← config: sets up i18next, tells it about EN and HE
├── locales/
│   ├── en.json          ← all English text
│   └── he.json          ← all Hebrew text (same keys, Hebrew values)
└── main.tsx             ← one added line: imports i18n.ts so it loads before anything else
```

---

## How It Works

### The JSON Files (en.json / he.json)

All text in the portfolio is stored here as key-value pairs. The **keys are the same** in both files. Only the **values change**.

Example:

```json
// en.json
{
  "nav": {
    "apps": "Applications",
    "basketball": "Basketball"
  },
  "hero": {
    "title": "Production apps. Real problems. Real solutions."
  }
}

// he.json
{
  "nav": {
    "apps": "אפליקציות",
    "basketball": "כדורסל"
  },
  "hero": {
    "title": "אפליקציות בפועל. בעיות אמיתיות. פתרונות אמיתיים."
  }
}
```

Keys are organized in groups that match the components:
- `nav` → navigation bar text
- `hero` → landing section text
- `apps` → app list section text
- `appDetail` → individual app page text
- `basketball` → basketball section text
- `contact` → contact modal text

**Why groups?** When you need to change or add text later, you go to the group that matches the component. Easy to find, easy to maintain.

---

### The Config File (i18n.ts)

```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import he from './locales/he.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    he: { translation: he },
  },
  lng: 'en',              // default language — English
  fallbackLng: 'en',      // if a key is missing in Hebrew, show English instead
  interpolation: {
    escapeValue: false,   // React already handles this, no need to do it twice
  },
});
```

**What each line does:**

- `resources` — tells i18next where the translation files are. Each language has a key (`en`, `he`) and its JSON file.
- `lng: 'en'` — when someone opens the site, they see English first.
- `fallbackLng: 'en'` — safety net. If we forget to translate a key into Hebrew, it shows the English version instead of a blank or an error.
- `escapeValue: false` — React already prevents injection attacks. This line tells i18next not to do it again (would cause double-escaping).

---

### The Import in main.tsx

```typescript
import './i18n'   // ← this line
```

This one line loads and initializes i18next **before** the App component renders. If this line wasn't here, every `t('key')` call in the app would fail because i18next wouldn't be ready yet.

---

## How Components Will Use It

Tomorrow when we build components, every piece of text uses this pattern:

```typescript
import { useTranslation } from 'react-i18next';

export default function Nav() {
  const { t } = useTranslation();

  return (
    <nav>
      <span>{t('nav.apps')}</span>        // → "Applications" or "אפליקציות"
      <span>{t('nav.basketball')}</span>   // → "Basketball" or "כדורסל"
    </nav>
  )
}
```

`t('nav.apps')` looks up the key `nav.apps` in whichever language is currently active and returns the correct text. The component itself doesn't know or care which language is active — it just asks for the key.

---

## How Language Switching Works

```typescript
const { i18n } = useTranslation();

i18n.changeLanguage('he');  // switch to Hebrew
i18n.changeLanguage('en');  // switch to English
```

When `changeLanguage` is called, every component that uses `t()` automatically re-renders with the new language. No page reload, no manual updates — it just works.

---

## Why Not Just Two Versions of Each Component?

Bad idea. Example with just one button:

```typescript
// ❌ Without i18n — two versions of everything
function Nav({ lang }) {
  if (lang === 'en') return <span>Applications</span>
  if (lang === 'he') return <span>אפליקציות</span>
}
```

Now imagine doing this for every single piece of text across 6 components. And then adding a third language later. i18next solves this cleanly:

```typescript
// ✅ With i18n — one component, works in any language
function Nav() {
  const { t } = useTranslation();
  return <span>{t('nav.apps')}</span>
}
```

Same component. Zero changes needed if we ever add a third language — just create a new JSON file.

---

## What We Installed

```bash
npm install i18next react-i18next
```

- **i18next** — the core library that manages translations and language switching
- **react-i18next** — the React integration. Gives us the `useTranslation` hook that components use

---

## Summary

| What | Why |
|------|-----|
| i18next library | Already used in your other apps, no learning curve |
| JSON files for text | Single place to manage all text, easy to maintain |
| Keys organized in groups | Maps to components — easy to find and update |
| English as default | Primary audience, international reach |
| Hebrew as second language | Your market is Israel |
| fallbackLng: 'en' | Safety net — missing Hebrew keys show English, never blank |
| Setup before components | Every component we build tomorrow works in both languages from day one |
