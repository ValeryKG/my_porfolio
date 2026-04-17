export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  url: string;
  accessType: 'public' | 'request';
  accessNote?: string;
  tech: string[];
  stats: { label: string; value: string }[];
  problem: string;
  solution: string;
  features: { title: string; description: string }[];
  metrics: { label: string; before: string; after: string }[];
  architecture: string;
  linesOfCode: number;
  buildTime: string;
  status: 'production' | 'live-mvp' | 'in-development';
  screenshots?: { file: string; caption: string }[];
}

export const apps: Project[] = [
  {
    id: 'timeclock',
    name: 'TimeClock GPS',
    tagline: 'Time tracking with real accountability',
    description:
      'Enterprise PWA for GPS-verified employee time tracking. Built on trust and transparency — every role sees the same truth. 7 user roles, 5 approval modes, real-time dashboards.',
    url: 'https://temeclok-gps.web.app/',
    accessType: 'request',
    accessNote: 'Live app in active use — contact for access credentials',
    status: 'production',
    tech: ['React 19', 'TypeScript', 'Vite', 'Firebase Firestore', 'Tailwind CSS', 'PWA', 'bcrypt'],
    stats: [
      { label: 'Lines of Code', value: '18,600' },
      { label: 'User Roles', value: '7' },
      { label: 'Approval Modes', value: '5' },
      { label: 'Languages', value: '4' },
      { label: 'Components', value: '26' },
      { label: 'Build Time', value: '31 days evenings' },
    ],
    problem:
      'Employers and employees distrust each other. Workers get cheated on hours. Contractors lie about timelines and staffing. No neutral ground where everyone sees the same data. Paper timesheets are easy to fake.',
    solution:
      'GPS-verified clock in/out with an Observer role — a neutral third party who sees everything. Every stakeholder sees the same truth. Trust through transparency, not surveillance.',
    features: [
      { title: 'GPS Verification', description: 'Haversine distance calculation. Configurable radius per site. Auto-detects which site based on location.' },
      { title: '5 Approval Modes', description: 'Auto-approve, GPS-check, hours-range, expected-hours, strict-shifts. Each site configured independently.' },
      { title: 'Observer Role', description: 'Neutral third party sees all data. Eliminates "he said / she said". Everyone accountable.' },
      { title: 'Live Status Dashboard', description: 'Real-time view of who\'s on site right now. Updates within 1 second via Firestore listeners.' },
      { title: 'Device Approval', description: 'PIN + bcrypt hashing. Manager must approve each device. Prevents unauthorized access.' },
      { title: 'Reports & Export', description: 'PDF and Excel export. Multi-language headers. Filter by site, worker, date range.' },
    ],
    metrics: [
      { label: 'Manager weekly time on timesheets', before: '12 hours', after: '2 hours' },
      { label: 'Payroll disputes', before: '12/month', after: '<1/month' },
      { label: 'Timesheet errors', before: '5% of records', after: '<0.1%' },
      { label: 'Buddy punching', before: 'Undetectable', after: 'Impossible (GPS)' },
      { label: 'New employee onboarding', before: '30 minutes', after: '5 minutes' },
    ],
    architecture: 'React 19 SPA with Context-based state management. Firestore real-time listeners (onSnapshot) across 5 collections. Custom PIN auth with bcrypt — no Firebase Auth used. IndexedDB for device token persistence. PWA with auto-update system via version.json polling. Role-based route protection.',
    linesOfCode: 18600,
    buildTime: '31 days (evenings only)',
    screenshots: [
      { file: '/gps_PIN_screen.jpg', caption: 'Secure PIN entry — 4 languages, works on any device' },
      { file: '/gps_manager_live_status.jpg', caption: 'Manager sees who is clocked in right now, in real time' },
      { file: '/gps_site_config.jpg', caption: 'Per-site GPS radius configuration — precise location enforcement' },
    ],
  },
  {
    id: 'baiti',
    name: 'Baiti',
    tagline: 'Building management done right',
    description:
      'Production PWA that replaces WhatsApp chaos for Israeli apartment buildings. Automated payment tracking, multi-language notifications, and professional reporting — all in one place.',
    url: 'https://baiti.co.il/',
    accessType: 'request',
    accessNote: 'Production app serving real buildings — contact for access credentials',
    status: 'production',
    tech: ['Vanilla JS', 'Firebase Realtime DB', 'Cloud Functions', 'FCM', 'Tailwind CSS', 'PWA'],
    stats: [
      { label: 'Lines of Code', value: '22,000' },
      { label: 'Languages', value: '3' },
      { label: 'User Roles', value: '3' },
      { label: 'Cloud Functions', value: '5' },
      { label: 'Security Rules', value: '449 lines' },
      { label: 'Build Time', value: '~2 months evenings' },
    ],
    problem:
      'Israeli building committees (Va\'ad Bayit) manage 20–100+ apartments using WhatsApp groups, paper notices, and Excel spreadsheets. Payment collection takes hours. Residents speaking Hebrew, Russian, and English get left behind. Announcements get lost.',
    solution:
      'One-click payment tracking, automatic reminders in each resident\'s language, push notifications, PDF reports, and a privacy-tier system that respects everyone\'s preferences.',
    features: [
      { title: 'Payment Dashboard', description: 'One-tap toggle per apartment. Visual progress bar. Collection rate jumps from 70% to 90%+.' },
      { title: 'Automatic Reminders', description: 'System sends reminders 7 days, 1 day, and on due date. Zero effort from manager.' },
      { title: 'Multi-Language', description: 'Hebrew, English, Russian. Write once — every resident reads in their language. RTL support included.' },
      { title: 'Special Projects', description: 'Renovations tracked separately from monthly bills. Residents see progress, photos, and payment status.' },
      { title: 'Privacy Tiers', description: '3 levels of visibility. Buildings choose how much residents see. Manager always has full access.' },
      { title: 'PDF Reports', description: 'One-click professional reports for building owners, committee meetings, or audits.' },
    ],
    metrics: [
      { label: 'Payment tracking', before: '2–3 hours/month', after: '5 minutes' },
      { label: 'Sending reminders', before: '1–2 hours', after: 'Automatic' },
      { label: 'Posting announcements', before: '30 minutes', after: '2 minutes' },
      { label: 'Generating reports', before: '1 hour', after: '10 seconds' },
      { label: 'Payment collection rate', before: '70–80%', after: '90–95%' },
    ],
    architecture: 'Multi-tenant SaaS. Firebase Realtime Database with role-based security rules (449 lines). 5 Cloud Functions handle notifications and user management server-side. PWA with service worker for offline support. No build step — files served directly via Firebase Hosting.',
    linesOfCode: 22000,
    buildTime: '~2 months (evenings only)',
    screenshots: [
      { file: '/baiti_resident_tutorial.jpg', caption: 'Hebrew, English, Russian — residents use the app in their own language' },
      { file: '/baiti_building_budget.jpg', caption: 'Building budget tracking with income, expenses, and live balance' },
      { file: '/baiti_user_guides.jpg', caption: 'Built-in guides for every role — no support calls needed' },
    ],
  },
  {
    id: 'basketball-portal',
    name: 'Basketball Player Development',
    tagline: 'One platform. Every role in the gym.',
    description:
      'Multi-tenant SaaS PWA for basketball clubs. Managers run their org, coaches assess players and build skill curricula, players track development and complete practice sessions — all in one role-aware platform backed by a 176-skill library, live scouting history, progress charts, a full schedule calendar, and community resource sharing.',
    url: 'https://court-iq.org/',
    accessType: 'public',
    accessNote: 'Coaches and players can register directly. Manager accounts require an invite link — contact to request one.',
    status: 'live-mvp',
    tech: ['React 18', 'TypeScript', 'Vite', 'Firebase Firestore', 'Firebase Auth', 'Tailwind CSS v4'],
    stats: [
      { label: 'Lines of Code', value: '~20,000' },
      { label: 'User Roles', value: '4' },
      { label: 'Skills & Drills', value: '176' },
      { label: 'Security Rule Lines', value: '286' },
      { label: 'Components', value: '50+' },
      { label: 'Build Time', value: '~6 weeks evenings' },
    ],
    problem:
      'Basketball clubs manage player development through WhatsApp groups, paper evaluation sheets, and scattered spreadsheets. Coaches have no structured way to track skill progress over time. Players don\'t know what to work on or how they\'re improving. Managers have no visibility across their organization.',
    solution:
      'A role-based platform where every participant gets their own tailored workspace. Managers control the org and curate skills, coaches run sessions and track player progress with full scouting history, players complete workouts and see their development — all connected through shared Firestore data with strict role-based security.',
    features: [
      { title: 'Role-Based Dashboards', description: 'Admin, Manager, Coach, Player — each role sees exactly what they need. Protected routes, Firestore security rules, and separate data paths enforce isolation.' },
      { title: 'Scouting History', description: 'Every coach assessment creates a timestamped snapshot. Full progress timeline with skill delta indicators (↑↓★). Private coach notes never reach the player.' },
      { title: 'Practice Sessions + Logging', description: 'Coaches assign structured sessions. Players log stats (attempts, makes, time) and ratings per skill. Coach logging panel captures observations separately — never overwrites player data.' },
      { title: 'Progress Tracking Charts', description: 'Per-skill line charts (Recharts) across all 3 dashboards. Coach and player data merged into one view. Category filter, trend lines, and coach-set focus skills highlighted.' },
      { title: 'Full Schedule Calendar', description: 'Month / week / agenda views. Full event CRUD with RSVP and attendee names, venue management, practice templates, and conflict detection.' },
      { title: 'Community & Resource Sharing', description: '3-tier sharing system: org-private, personal, and public community. Coaches share skill lists and curated links. Soft and hard ban system keeps the community clean.' },
    ],
    metrics: [
      { label: 'Tracking player skill progress', before: 'Memory or paper notes', after: 'Full timestamped history with deltas' },
      { label: 'Sharing a skill curriculum', before: 'PDF in WhatsApp group', after: 'One-click share to players' },
      { label: 'Building a practice plan', before: '2–3 hours of research', after: 'Import from any document' },
      { label: 'Evaluating players', before: 'Paper form → lost', after: 'Digital history + private coach notes' },
      { label: 'Player self-awareness', before: 'Verbal feedback only', after: 'Visible skill timeline in dashboard' },
    ],
    architecture: 'Multi-tenant SaaS with dual-org model — every coach holds a personal workspace (personalOrgId) and optionally joins a club org (orgId), keeping private and club work fully separated. Firestore subcollections per org enforce data isolation. scoutingHistory subcollection stores timestamped skill snapshots with private/public note split. Skill lists shared via writeBatch across users/{uid}/skillLists and organizations/{orgId}/skillLists. 176-skill/drill global library with PPP/impact/teachability metadata and isDrill filter. PDF parsing pipeline extracts skill names into named lists. 3-tier resource sharing (org / personal / community) with soft ban (bannedFromSharing) and hard ban (accountDisabled) enforced at auth layer. Schedule with Firestore event CRUD, RSVP, venue docs, and template system. PWA with manifest, icons, and apple-touch-icon. Recharts-powered progress tracking across all 3 dashboards. Legal pages (/terms + /privacy) with required consent stored in user doc. React 18 + TypeScript + Vite, deployed on Firebase Hosting.',
    linesOfCode: 20000,
    buildTime: '~6 weeks (evenings only)',
    screenshots: [
      { file: '/courtIq_a.jpg', caption: 'Player dashboard — assigned workouts, progress tracking, scouting reports' },
      { file: '/courtIq_b.jpg', caption: 'Session view — defensive skill list with coach observation logging' },
      { file: '/courtIq_c.jpg', caption: '176 skills and drills — filtered by category, age group, and impact' },
    ],
  },
  {
    id: 'myhours',
    name: 'MyHours',
    tagline: 'Your hours. Your proof. Your money.',
    description:
      'Personal time tracking PWA for hourly workers and freelancers. GPS-verified, works offline, supports multiple jobs. Free forever — no premium tier, no limits.',
    url: 'https://myhours-abe10.web.app/',
    accessType: 'public',
    status: 'production',
    tech: ['React 18', 'TypeScript', 'Vite', 'Firebase', 'Tailwind CSS', 'PWA', 'IndexedDB'],
    stats: [
      { label: 'Lines of Code', value: '5,700' },
      { label: 'Languages', value: '4' },
      { label: 'Custom Hooks', value: '6' },
      { label: 'Export Formats', value: '2 (PDF, Excel)' },
      { label: 'Currencies', value: '5' },
      { label: 'Build Time', value: '<2 weeks evenings' },
    ],
    problem:
      'Hourly workers and freelancers have no proof of hours worked. Employers dispute times. Freelancers with multiple jobs lose track. Existing apps are freemium with annoying limits or English-only.',
    solution:
      'GPS-timestamped clock in/out. Multiple workplaces with independent settings. Offline-first so it works anywhere. 100% free, 4 languages, exports to PDF and Excel.',
    features: [
      { title: 'GPS Clock In/Out', description: 'One tap. Records exact time and location. Undeniable proof you were there.' },
      { title: 'Multiple Workplaces', description: '8 settings per job: rate, currency, overtime rules, break duration, time rounding.' },
      { title: 'Offline First', description: 'IndexedDB queue stores actions locally. Syncs automatically when back online. Never lose data.' },
      { title: 'Smart Reports', description: 'Automatic earnings calculation. Overtime with multiplier. Time rounding. Filter by week, month, custom range.' },
      { title: '100% Free', description: 'No freemium. No premium tier. No limits. GPS included. Everything included.' },
      { title: 'Multi-Language', description: 'English, Hebrew, Arabic, Russian. RTL support. Reports export in your language.' },
    ],
    metrics: [
      { label: 'Weekly hours calculation', before: '15–30 min', after: 'Instant' },
      { label: 'Creating timesheet', before: '20–30 min', after: '30 seconds' },
      { label: 'Paycheck verification', before: '30–60 min', after: '5 minutes' },
      { label: 'Annual wage protection', before: '$0 proof', after: '$600–$2,000+' },
    ],
    architecture: 'React 18 SPA. 6 custom hooks encapsulate all data logic (useAuth, useTimeLogs, useWorkPlaces, useGeolocation, usePWA). Firebase Firestore with real-time onSnapshot. IndexedDB for offline action queue with automatic sync. Service worker with cache-first strategy for app shell.',
    linesOfCode: 5700,
    buildTime: '<2 weeks (evenings only)',
    screenshots: [
      { file: '/myHours_a.jpg', caption: 'GPS timestamps prove where and when you worked — free, 4 languages' },
      { file: '/myHours_b.jpg', caption: 'Time logs across multiple workplaces with full history' },
      { file: '/myHours_c.jpg', caption: 'Monthly earnings summary with PDF and Excel export' },
    ],
  },
];

export interface BasketballProject {
  id: string;
  name: string;
  tagline: string;
  description: string;
  url: string;
  stats: { label: string; value: string }[];
  what: string;
  unique: string;
  aiRole: string;
  categories: { name: string; pages: number; description: string }[];
  impact: string[];
}

export const basketball: BasketballProject = {
  id: 'basketball',
  name: 'Championship Coaching Blueprint',
  tagline: '20 years of research. One system.',
  description:
    'The most comprehensive basketball coaching knowledge system on the internet. 20+ years of research across NBA, NCAA, and Euro leagues synthesized into visual, data-backed coaching intelligence.',
  url: 'https://valerykg.github.io/Basketball-All/',
  stats: [
    { label: 'Years of Research', value: '20+' },
    { label: 'Lines of Content', value: '40,000+' },
    { label: 'Coaching Guides', value: '20+' },
    { label: 'Data Sources', value: 'NBA, NCAA, Euro' },
    { label: 'Chart Visualizations', value: '20+' },
    { label: 'Interconnected Topics', value: '100+' },
  ],
  what: 'A visual knowledge system that synthesizes 20+ years of basketball research — NBA, NCAA, European leagues, published books, coaching articles, and public datasets — into one organized, data-backed resource. Not just "what to do" but "here is WHY, with the data to prove it."',
  unique:
    'Nothing like this exists anywhere on the internet. Most coaches — even experienced ones — will never encounter 20% of what\'s documented here through traditional education or coaching clinics. Every recommendation is backed by points-per-possession data, correlation analysis, and real game evidence.',
  aiRole:
    'AI made two things possible that would otherwise be impossible: (1) Processing and synthesizing 20 years of scattered web data, books, articles, and datasets into a coherent system. (2) Transforming complex research into visual, easy-to-observe presentations without losing the depth. The knowledge and organization is 20 years of coaching experience. The synthesis and presentation is AI.',
  categories: [
    { name: 'Offensive Systems', pages: 3, description: 'Transition offense, pick-and-roll, offensive performance. Complete implementation roadmaps with PPP validation.' },
    { name: 'Defensive Systems', pages: 3, description: 'Pack-line defense, zone coverage, 8 pick-and-roll coverages ranked by effectiveness (ICE: 0.84 PPP).' },
    { name: 'Skills Development', pages: 3, description: 'Shooting mechanics, analytics-based shot selection, coaching blueprint with age-appropriate progressions.' },
    { name: 'Analysis & Strategy', pages: 3, description: 'Pass analysis, shot zone efficiency, strategic correlations. Championship team patterns decoded.' },
    { name: 'Basketball Systems', pages: 3, description: 'Data-driven 2025 system, deep correlations & strategic insights, read-and-react offense framework.' },
    { name: 'Player Development', pages: 2, description: 'Rebounding (offense & defense) and inside finishing moves with data-backed progressions.' },
    { name: 'Coaching Playbooks', pages: 2, description: 'Step-by-step implementation guides for Pack Line Defense and 1-2-2 Press systems.' },
  ],
  impact: [
    'Changes how you see the game — not opinion, data',
    'Every "why" answered with points-per-possession evidence',
    'Cutting = 1.58 PPP vs standing still = 0.87 PPP — and 50 more insights like this',
    'Championship team patterns: 72% switch-heavy defensive trend explained',
    'Age-appropriate progressions from youth (8yr) to college',
    'Saves coaches 100–400 hours of research annually',
  ],
};