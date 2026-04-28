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
    tagline: 'GPS-verified shift tracking where every clock-in is tied to a verified device, a verified location, and a neutral witness',
    description:
      'Multi-tenant SaaS for GPS-verified employee time tracking — built for the contractor economy where every hour gets disputed. Any company deploys it: admin configures sites with GPS fences and per-site approval rules, managers run their teams, workers clock in from individually approved devices. Seven roles cover every stakeholder, including an Observer — a neutral third party who sees all data and cannot change anything. Built first for the Israeli construction and facilities market. 4 languages, Hebrew default.',
    url: 'https://temeclok-gps.web.app/',
    accessType: 'request',
    accessNote: 'Live app in active use — contact for access credentials',
    status: 'production',
    tech: ['React 19', 'TypeScript', 'Vite', 'Firebase Firestore', 'Firebase Storage', 'Tailwind CSS', 'React i18next', 'jsPDF', 'xlsx', 'date-fns', 'bcrypt', 'PWA'],
    stats: [
      { label: 'User Roles', value: '7' },
      { label: 'Approval Modes', value: '5 per site' },
      { label: 'Languages', value: '4 (EN, HE, AR, RU)' },
      { label: 'Auth Layers', value: 'Device + PIN + GPS' },
      { label: 'Access Control', value: 'Every device admin-approved' },
      { label: 'Neutral Witness', value: 'Observer role — read-only' },
    ],
    problem:
      'Employers and employees distrust each other. Workers get cheated on hours. Contractors lie about timelines and staffing. No neutral ground where everyone sees the same data. Paper timesheets are easy to fake — and there\'s no third party who can verify what actually happened.',
    solution:
      'Three-layer verification: every clock-in requires an approved device, a valid GPS position, and passes per-site approval rules. An Observer role gives any neutral third party — client, contractor rep, union — full read-only visibility into all records. Everyone sees the same truth. Trust through transparency, not surveillance.',
    features: [
      { title: 'Device-Level Fraud Prevention', description: 'Every device is registered, fingerprinted with a UUID stored in IndexedDB, and must be individually approved by admin before first use. Revoke a device and it\'s locked out immediately. Worker PINs are hashed with bcrypt — no plain-text credentials anywhere in the system.' },
      { title: 'The Observer Role', description: 'A read-only role designed for the neutral third party — a client, contractor rep, or union observer. Sees all time records, all sites, all workers across the org. Cannot edit anything. One role that eliminates "he said / she said" without granting any write access.' },
      { title: 'Per-Site GPS Geofencing + 5 Approval Modes', description: 'Each site has its own GPS radius. Each site independently chooses its validation strategy: auto-approve, GPS-check-only, hours-range validation, expected-hours with tolerance windows, or strict shift schedules. A cleaning company and a construction site play by different rules.' },
      { title: 'Accountant Dashboard', description: 'Dedicated role and full dashboard for payroll analysis — worker summaries, site summaries, financial breakdowns filtered by date range. PDF and Excel export with translated headers. Accountants see what they need, nothing else.' },
      { title: 'Time Record Review + Flag Workflow', description: 'Every clock-in/out captures GPS accuracy, distance from site, and timing deviation. Anomalies auto-flag the record. Managers review flagged records — approve, reject, or edit with a note. Full audit trail: who reviewed, when, what changed.' },
      { title: 'Multi-Tenant SaaS, 4 Languages', description: 'Any org deploys it — admin creates companies and sites, managers own their teams, workers are assigned to sites. UI fully localized in English, Hebrew, Arabic, and Russian. Hebrew is the default language; built first for the Israeli construction and facilities market.' },
    ],
    metrics: [
      { label: 'Manager weekly time on timesheets', before: '12 hours', after: '2 hours' },
      { label: 'Payroll disputes', before: '12/month', after: '<1/month' },
      { label: 'Timesheet errors', before: '5% of records', after: '<0.1%' },
      { label: 'Buddy punching', before: 'Undetectable', after: 'Impossible (GPS + device)' },
      { label: 'New employee onboarding', before: '30 minutes', after: '5 minutes' },
    ],
    architecture: 'React 19 SPA with Context-based state management. Firestore real-time listeners (onSnapshot) across 5 collections. Custom PIN auth with bcrypt — no Firebase Auth used; device token (UUID v4) stored in IndexedDB for persistent device identity across sessions. PWA with auto-update via version.json polling. Role-based route protection via ProtectedRoute — validates device approval status on every navigation. jsPDF + xlsx for role-specific exports with i18next-translated headers.',
    linesOfCode: 18639,
    buildTime: '31 days (evenings only)',
    screenshots: [
      { file: '/gps_PIN_screen.jpg', caption: 'Secure PIN entry — 4 languages, works on any device' },
      { file: '/gps_manager_live_status.jpg', caption: 'Manager sees who is clocked in right now, in real time' },
      { file: '/gps_site_config.jpg', caption: 'Per-site GPS radius configuration — precise location enforcement' },
    ],
  },
  {
    id: 'wishbasket',
    name: 'WishBasket',
    tagline: 'Make a wish. Someone owns it. The family sees everything.',
    description:
      'Family home management app built around one unique idea: the Wish Basket. Any family member can request something — food, a household item, anything — and any other member can step up, put their name on it, and own the outcome. Backed by a shared live inventory, one-tap status updates, and an immutable log that ends every "did anyone see my request?" conversation.',
    url: 'https://wishbasket.app/',
    accessType: 'public',
    status: 'production',
    tech: ['React 19', 'TypeScript', 'Vite', 'Firebase Firestore', 'Firebase Auth', 'i18next', 'jsPDF'],
    stats: [
      { label: 'Accountability', value: 'Named promise + permanent outcome log' },
      { label: 'Activity log', value: 'Immutable — rule-enforced' },
      { label: 'Languages', value: '3 (EN, HE, RU) + RTL' },
      { label: 'Dietary tracking', value: 'Kosher + Halal — baked into data model' },
      { label: 'Item statuses', value: '4 built-in + unlimited custom' },
    ],
    problem:
      'Household requests live in someone\'s memory, a WhatsApp message, or verbal air. A child asks for something and it vanishes. Nobody knows if it was heard. The person who always remembers carries the entire cognitive load. There\'s no neutral record — so every dispute is a word-against-word argument.',
    solution:
      'The Wish Basket: any family member drops a request, any other member can claim it — their name attached, the outcome logged. Not an admin bottleneck. A pull system where anyone steps up. Backed by a live shared inventory and an immutable log nobody can edit or delete. The family has one source of truth, and accountability is built into the architecture.',
    features: [
      { title: 'Wish Basket (Request & Promise)', description: 'Any member drops a wish — a request for any item. Any other family member can Promise to fulfill it — their name attached. When they follow through: "kept". If not: "declined". No admin bottleneck. The whole family sees who stepped up and whether they did it. Outcomes stored in a separate promiseLogs collection, permanent.' },
      { title: 'One-Tap Status Cycle', description: '4 states: In Stock → Low → Out → Need to Buy. Tap the badge, done. No modal, no form, no typing. The spec rule: if it takes more than two taps, redesign it.' },
      { title: 'Shopping Mode', description: 'Tap "Start Shopping" — the app shows only what\'s needed, grouped by folder (Fridge, Pantry, Bathroom). Tap an item, it disappears. Counter counts down. Gets opened every store trip without reminders.' },
      { title: 'Immutable Activity Log', description: 'Every status change recorded at the database rule level — update and delete are blocked on the logs collection. "According to the app" becomes a real phrase that ends arguments.' },
      { title: 'Folder-Level Permissions', description: 'Admin assigns which folders each member can see. New family members see nothing until granted access. One allowedFolders array on the user doc — filtered once at the folder tree, no per-item query cost.' },
      { title: 'Custom Statuses', description: 'Beyond the 4 built-in states, admins can define their own statuses with a custom label and color — stored on the org doc, available org-wide. ItemStatus is typed as string so built-in and custom statuses work identically throughout the app.' },
      { title: 'Kosher & Halal Status', description: 'Optional per-item fields for kosher category (meat/dairy/pareve) and halal status — baked into the data model from day one, not bolted on. Shows only when set. Designed for Israeli and Arab-Israeli families.' },
    ],
    metrics: [
      { label: '"Did anyone see my request?" conversations', before: 'Daily', after: 'Open the log' },
      { label: 'Shopping trip coordination', before: '"What do we need?" text chain', after: 'Open Shopping Mode' },
      { label: 'Disputed household tasks', before: 'No record', after: 'Timestamp + who + what' },
      { label: 'Cognitive load on one person', before: 'Entire household', after: 'Shared across roles' },
    ],
    architecture: 'React 19 SPA. Firebase Firestore with IndexedDB offline persistence — reads from cache, writes queue and sync on reconnect. Immutability enforced at the security rule level: update and delete are blocked on /logs. Request & Promise outcomes tracked in a separate /promiseLogs collection (outcome: kept | declined) — decoupled from the main inventory log. Custom statuses stored on the org doc as a CustomStatus[] array; ItemStatus typed as string so built-in and custom statuses flow through the same components without special-casing. Role access via allowedFolders[] on the user doc, filtered once at the folder tree — no per-item queries as inventory scales. Google OAuth + email/password. i18next with document.documentElement.dir for Hebrew RTL.',
    linesOfCode: 9100,
    buildTime: '~2 weeks (evenings only)',
    screenshots: [
      { file: '/Wishbasket_a.png', caption: 'Inventory tab — items with food images, quantity controls, and status badges' },
      { file: '/Wishbasket_b.png', caption: 'Global search across all folders — filtered by status or personal folder' },
      { file: '/Wishbasket_c.png', caption: 'Request sheet — drop a wish with a note and folder, any family member can claim it' },
      { file: '/Wishbasket_d.png', caption: 'Shopping List in action — items check off as you go, done counter at the bottom' },
      { file: '/Wishbasket_e.png', caption: 'Folder management — reorder, rename, add personal or shared folders' },
    ],
  },
  {
    id: 'stockpilot',
    name: 'StockPilot',
    tagline: 'Inventory tracking with an audit trail nobody can edit',
    description:
      'Multi-tenant PWA for facilities and maintenance teams. Tracks consumables and physical assets across any org structure — folders by floor, room, warehouse, or department. Every stock change is atomic and permanent: who changed it, when, how much, why. In active use by the facilities maintenance team at Palo Alto Networks.',
    url: 'https://inventory-e5daa.web.app/',
    accessType: 'request',
    accessNote: 'Live app in active use by the facilities maintenance team at Palo Alto Networks — contact for access credentials',
    status: 'production',
    tech: ['React 19', 'TypeScript', 'Vite', 'Firebase Firestore', 'Firebase Auth', 'Firebase Storage', 'Recharts', 'jsPDF', 'xlsx', 'dnd-kit', 'Zustand', 'PWA'],
    stats: [
      { label: 'Audit log', value: 'Immutable — Firestore rule-enforced' },
      { label: 'Stock updates', value: 'Atomic — quantity + log or neither' },
      { label: 'Item types', value: 'Consumables + assets (one system)' },
      { label: 'In production', value: 'Palo Alto Networks facilities team' },
      { label: 'Items tracked', value: '189+ active inventory' },
      { label: 'Consumption analytics', value: 'Monthly charts + reorder suggestions' },
    ],
    problem:
      'Facilities teams track physical stock — supplies, tools, equipment — through spreadsheets, paper lists, or memory. Nobody knows who took what or when. Low stock goes unnoticed until something is missing mid-job. No audit trail. No separation between who restocks shelves and who manages inventory.',
    solution:
      'Every stock change is a permanent, atomic record. Folder-level access control means staff only sees what they\'re assigned. Every update — who, when, delta, reason — is written to an immutable log enforced at the database rule level, not the application layer. When something is off, the answer is already there.',
    features: [
      { title: 'Immutable Audit Log', description: 'Every stock change logged with who, when, before, after — update and delete blocked at the Firestore security rule level, not in the UI. Ground truth.' },
      { title: 'Consumables + Assets', description: 'One system for two types: consumables track quantity and low-stock thresholds; assets carry serial number, status (working / needs technician / decommissioned), and an assignee.' },
      { title: 'Consumption Analytics', description: 'Monthly bar charts per item across the last 12 months. 3-month rolling average drives automatic reorder suggestions — shown inline on the stock update screen.' },
      { title: 'PDF + Excel Reports', description: 'Date range + folder filter. Excel for data, PDF with item thumbnails for documentation. Managers capped at 5 image reports per month — reset monthly, tracked per user.' },
      { title: 'Folder-Level Access Control', description: 'Staff and managers see only their assigned folders. One allowedFolders[] array on the user doc, filtered once at the folder tree — all item lists, reports, and alerts scope downstream from there.' },
      { title: 'Bulk Move + Copy', description: 'Multi-select items across a folder and move or copy them in a single writeBatch. Admin reorganizes the entire inventory without touching items one by one.' },
      { title: 'Drag-and-Drop Folder Order', description: 'Admin drags folders into logical order via dnd-kit — sort order persisted to Firestore immediately.' },
      { title: 'Data Backup / Export', description: 'Full org export (all folders + items) as a structured JSON file. Admin-only recovery tool — no cloud dependency for data portability.' },
      { title: 'Maintenance Ticket System', description: 'Staff report issues directly in the app — title, location, and status tracked through open → committed → resolved. Full update thread per ticket. PDF report export for management review.' },
    ],
    metrics: [
      { label: 'Finding who changed a stock level', before: 'Ask around', after: 'Open the audit log' },
      { label: 'Low stock awareness', before: 'Noticed when empty', after: 'Alert badge before it runs out' },
      { label: 'Monthly consumption report', before: 'Manual spreadsheet', after: 'One tap — PDF or Excel' },
      { label: 'Onboarding new team member', before: 'Full access or nothing', after: 'Assign specific folders only' },
    ],
    architecture: 'React 19 SPA. Firestore with onSnapshot real-time listeners across 4 collections. writeBatch for atomic stock updates — quantity change and immutable log entry written together or not at all. Firestore security rules enforce: (1) logs are append-only, update/delete blocked; (2) every document scoped to orgId, enforced server-side. Folder visibility filtered once at the folder tree via allowedFolders[] on the user doc — no per-item permission checks as inventory scales. Google OAuth + email/password via Firebase Auth. Zustand for auth state. jsPDF + jspdf-autotable for PDF, xlsx for Excel. dnd-kit for folder drag-and-drop. PWA with auto-update via version.json polling.',
    linesOfCode: 10258,
    buildTime: '~3 weeks (evenings only)',
    screenshots: [
      { file: '/inventory_b.png', caption: 'Folder tree — real org structure at Palo Alto Networks, nested by location with item counts' },
      { file: '/inventory_f.png', caption: 'Stock update modal — current quantity, delta or exact, monthly consumption chart, and reorder suggestion in one screen' },
      { file: '/inventory_d.png', caption: 'Global search — 189 items across all folders, filterable by type, with images and serial numbers' },
      { file: '/inventory_e.png', caption: 'Edit item form — consumable vs asset type selector with conditional fields, low-stock threshold, image upload' },
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
      { label: 'Skill library', value: '176 curated skills & drills' },
      { label: 'Org model', value: 'Dual — personal workspace + club' },
      { label: 'Coach privacy', value: 'Scouting notes never reach the player' },
      { label: 'Community sharing', value: '3-tier — private / org / public' },
      { label: 'Role isolation', value: '4 roles, 286-line Firestore rule set' },
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
      { label: 'Price', value: 'Free forever — no premium tier' },
      { label: 'Proof of work', value: 'GPS timestamp on every record' },
      { label: 'Works offline', value: 'IndexedDB queue, auto-sync' },
      { label: 'Languages', value: '4 (EN, HE, AR, RU) + RTL' },
      { label: 'Currencies', value: '5 supported' },
      { label: 'Export', value: 'PDF + Excel, in your language' },
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
      { label: 'Collection rate', value: '70–80% → 90–95%' },
      { label: 'Reminders', value: 'Automatic — in each resident\'s language' },
      { label: 'Languages', value: '3 (HE, EN, RU) + RTL' },
      { label: 'Server logic', value: '5 Cloud Functions' },
      { label: 'Security rules', value: '449 lines — Realtime DB' },
      { label: 'Tech stack', value: 'Vanilla JS — no framework' },
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
  url: 'https://court-iq.org/resources/index.html',
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