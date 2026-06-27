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
  leverage?: {
    without: string[];
    with: string[];
    note: string;
  };
}

export const apps: Project[] = [
  {
    id: 'coachiq',
    name: 'CoachIQ',
    tagline: 'No product like this exists. CoachIQ knows this specific player — their history, their body, their stage of development — before it reads a single question.',
    description:
      'The knowledge behind it spans NBA, NCAA, EuroLeague, and FIBA: methodology from coaching clinics most coaches never attend, research papers nobody reads, and decades of professional practice that previously could only reach 20 players at a time. Now it reaches anyone. And it gets smarter about each one after every session. The agent reads what this player worked on, how it felt, and what their coach has noted — before generating a single word. A player at 10pm with a sore knee and 20 minutes gets an answer that knows them.',
    url: 'https://coach-iq.org/',
    accessType: 'public',
    accessNote: 'Live at coach-iq.org — free to start, 10 sessions, no card required',
    status: 'live-mvp',
    tech: ['React 19', 'TypeScript', 'Vite', 'Firebase Auth', 'Firestore', 'Cloud Functions v2', 'React Router DOM', 'Pinecone', 'Anthropic Claude Sonnet 4.6', 'Recharts', 'Paddle', 'FCM', 'PWA'],
    stats: [
      { label: 'Exists anywhere else', value: 'Nothing like it' },
      { label: 'Knowledge source', value: 'NBA · NCAA · EuroLeague · FIBA — not the internet' },
      { label: 'Agent architecture', value: '4 agents — Player, Coach, Parent, Evaluator — role-specific context injection, automatic routing by user role' },
      { label: 'Agent reads before responding', value: 'Full player history — drills, feel, skill stages, coach notes' },
      { label: 'KB chunks', value: '112 across 10 categories — ingested, vectorized, threshold-gated' },
      { label: 'Retrieval', value: '0.33 → 0.83 — wrong model caught, correct methodology or nothing' },
      { label: 'Subscription tiers', value: '9 — Player, Coach, and Parent plans across 3 tiers each. One-time message packs available.' },
    ],
    problem:
      'Generic AI chatbots know basketball in general. They give the same answer to every player. They forget what was said last session. They have no idea what a specific player worked on, what felt hard, or what their actual development history looks like. Any chatbot can answer a basketball question — none of them coach a specific person.\n\nBuilding a RAG system that actually retrieves the right content is harder than it looks. Semantic embedding search fails on conversational language — "I fancy working on finishing moves today" is far from "Euro step 1.12 PPP effectiveness" in vector space. The wrong embedding model returns 0.33 similarity scores and wrong-category content. The agent answers confidently from that noise.',
    solution:
      'Before every response, the agent rewrites the player\'s message into basketball analytical vocabulary before it hits the vector database. It retrieves from a knowledge base built on professional methodology — 112 chunks across 10 categories, each one answering a question a player or coach will actually ask. A score threshold blocks anything below 0.75 — the agent receives correct content or nothing. Then it reads this specific player\'s Firestore record: recent drills, how each one felt, current skill stages, active sequence, coach notes. It responds in the player\'s language. After the session, it updates the record. The next session it already knows more.',
    features: [
      { title: 'The retrieval problem nobody talks about', description: 'Most AI coaching fails here silently. Early retrieval scores were 0.33 — the agent was finding basketball-sounding content and answering confidently from it. Wrong. Switching embedding models and building a query rewriting layer pushed scores to 0.83+. A score threshold now means the agent receives correct methodology or nothing. It never hallucinates from wrong-category content. The difference between 0.33 and 0.83 is the difference between a product that coaches and one that sounds like it does.' },
      { title: 'Query rewriting — the layer most RAG systems skip', description: 'A player types "my knee hurts and I have 20 minutes, show me something for my weak hand near the rim." That sentence, sent directly to a vector database, retrieves almost nothing useful. Conversational language and analytical content live in different parts of the embedding space. The pipeline rewrites the message into basketball vocabulary before it touches the database — rules-based, zero cost, deterministic. The player gets an answer from the right content without ever knowing the translation happened.' },
      { title: 'A knowledge base built to answer questions, not store data', description: 'Every document answers a question a player or coach will actually ask. The reasoning behind why box-outs win games. The psychology of correcting a player in front of teammates. What ICE coverage accomplishes against ball screens and when DROP is the better call. When a coach asks what to teach first — the agent retrieves the reasoning, then coaches from it. Structured workout data lives in the database, delivered exactly as written. The separation is intentional: reasoning belongs in a knowledge base, precision belongs in a database.' },
      { title: 'Two roles. One app. Completely different agent.', description: 'A coach and a player open the same application. The underlying model is the same. What the agent knows before it reads a single question is completely different. A coach gets team metrics, player profiles, coaching orientation, team health, and team composition injected into every conversation. A player gets personal drill history, skill progression stages, active sequence state, and feel trend. The agent reads who is asking before it reads what they\'re asking.' },
      { title: 'One API call. Multiple outcomes.', description: 'The agent returns structured data, not plain text. One call produces a coaching response, a drill record, a skill stage update, and a session log — each written to a separate database path simultaneously. The player sees a conversation. The system sees structured data. Nothing is inferred, nothing gets lost across long sessions.' },
      { title: 'Skill progression tracked inside the conversation', description: '75 specific skills across 9 areas, each at one of three stages: learning it, getting consistent, executing under pressure. As a player reports back how a drill went, the system updates the record and recalculates what they\'re ready for next. The agent always knows where a player is in their development — not from chat history, from a database record updated after every session.' },
      { title: 'It holds all your constraints simultaneously', description: 'Sore knee. No partner. 20 minutes. The agent doesn\'t give a drill that ignores two of those to satisfy one. It finds what fits all three. Physical limitations stay active until the player explicitly lifts them. Position stated once locks every recommendation for the session. The agent treats stated constraints as hard rules, not suggestions.' },
      { title: 'Subscription infrastructure — payment gate, plan switching, message packs', description: '9 subscription tiers across player, coach, and parent roles, built on Paddle (Merchant of Record — handles VAT, international tax, PCI compliance). Webhook pipeline handles the full lifecycle: subscription created, updated, cancelled, expired, and one-time transaction completed. Two-wallet message model: monthly cap resets each cycle; one-time message packs never expire and work even without an active subscription. Payment gate enforced server-side in the query Cloud Function before any AI call — cap computed from base plan + pack bonus.' },
      { title: 'Push notifications on a PWA — the hard version that actually works', description: 'Implemented reliable Firebase Cloud Messaging push notifications for CoachIQ PWA. Solved the core Android delivery problem: FCM silently fails when the payload includes a notification field — data-only payloads with explicit service worker background handling are required. Implemented correct service worker activation sequencing before token registration. Works under default balanced battery settings without requiring manual configuration on standard Android devices. Verified on desktop (Chrome, Firefox) and Android PWA with Chrome fully closed.' },
      { title: 'The agent drafts your next action — you confirm and send', description: 'When a coach says "send Jordan a message about his footwork" or "broadcast tomorrow\'s practice time," the agent doesn\'t just acknowledge the request. It drafts the exact message, returns it as a structured field alongside the coaching response, and renders it as a card with Copy and Send buttons. Send navigates directly to the pre-filled compose view — coach edits and confirms. Auto-execute was an option; the decision not to take it was deliberate. Coaches control the final text. One Cloud Function response produces a coaching answer and a ready-to-send draft simultaneously. Works for team broadcasts and per-player direct messages.' },
      { title: 'Multi-coach staff — shared team, private threads, transparent data access', description: 'A head coach invites an assistant via a one-time token. Server-side, a single resolver function maps any caller to their effective coaching identity — assistants transparently read and write to the head coach\'s Firestore paths with no client-side changes needed. Player evaluations are a shared pool across all staff. Direct messages are private per coach — each assistant maintains their own thread with each player at a separate path. The agent reads the caller\'s user doc, detects the assistant role, and adjusts context accordingly. Firestore security rules enforce every boundary.' },
    ],
    metrics: [
      { label: 'Retrieval score', before: '0.33 — wrong-category content, confident wrong answers', after: '0.83+ — correct methodology, or nothing' },
      { label: 'What the agent knows about this player', before: 'Nothing — starts fresh every session', after: 'Full history: drills, feel, skill stages, coach notes' },
      { label: 'Conversational query to vector database', before: '"I fancy finishing moves today" → noise', after: 'Rewritten to basketball vocabulary before Pinecone' },
      { label: 'Wrong-category content reaching the agent', before: 'Every query — no filter', after: 'Zero — blocked at 0.75 threshold' },
      { label: 'Coach context before responding', before: 'None', after: 'Team metrics, player profiles, coaching orientation, team health' },
      { label: 'Skill progression tracking', before: 'Not tracked', after: '75 skills, 3 stages — updated from session data automatically' },
      { label: 'Payment gate', before: 'Not enforced', after: 'Server-side cap check — base plan + carry-over bonus, before any AI call' },
    ],
    architecture: 'Four-agent system via Firebase Cloud Functions v2 (europe-west1): Player agent (chat + drill assignment), Coach agent (team-centric — roster, health, composition, schedule injected per conversation), Parent agent (read-only child context — skill stages, My Stats, upcoming events), Evaluator agent (silent diagnostic — runs on every response, checks 8 rules, stores failures to Firebase). Client sends { question, role, history[], uid } → rewriteQuery() extracts basketball concept keywords → Pinecone semantic search (multilingual-e5-large, 1024d, dynamic topK 3–5, threshold 0.75) → Claude Sonnet 4.6 with system prompt + profile context + KB chunks + session history. buildProfileContext(uid) reads users/{uid}, drills, and skillProgression in parallel — assembles name, age, level, position, goal, feel trend, active sequence state, and skill stages (I/R/M). Agent returns structured JSON: { answer, drill?, feel?, drill_assessment?, profile_update?, action? }. action field carries draft-and-confirm payloads (send_broadcast / send_dm) — client renders confirmation card, navigates to pre-filled compose view on send. Multi-coach staff: resolveEffectiveCoachId() maps assistant callers to head coach identity server-side — assistants access HC Firestore paths transparently, private DM threads maintained per coach. Subscription gate enforced server-side before any AI call — cap computed from base plan + pack bonus via Paddle webhook pipeline. Full messaging infrastructure: sendBroadcast + sendDirectMessage CFs, FCM push for all roles, per-role unread tracking hooks, Cloud Scheduler for event RSVP reminders. KB: 112 chunks across 10 categories (standard ≤350 words, e5-large 507-token ceiling). React 19 + TypeScript + Vite + React Router DOM. Mobile-first, inline styles with theme.ts. Recharts for progress charts.',
    linesOfCode: 7500,
    buildTime: 'Active development · Subscriptions live',
    leverage: {
      without: [
        '3–5 engineers, 4–6 months of development',
        'Dozens of coaching interviews to encode the methodology',
        'A research team to process 1,000+ hours of basketball analytics',
        'A linguistics team for multilingual support',
        'Separate data pipelines for each content type',
      ],
      with: [
        'Built solo over evenings — architecture, knowledge curation, RAG optimization, coaching logic',
        'The knowledge is the accumulated work of generations of coaches across four professional leagues — curated, not invented',
        'AI made it possible to synthesize and distribute what previously lived in clinics, research papers, and coaches\' heads',
        'Multilingual by architecture — no translation team needed',
        'Every system designed, built, tested, and deployed by one person',
      ],
      note: 'AI did not create the coaching knowledge. It made it possible for one person to synthesize, distribute, and personalize what generations of coaches built — to every player, in every language, at any hour. The knowledge belongs to the game. The engineering is what finally made it accessible.',
    },
  },
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
      { label: 'Role design', value: '7 roles — each sees exactly what they need, nothing more' },
      { label: 'Approval modes', value: '5 per site — from auto-approve to strict schedules' },
      { label: 'Languages', value: '4 (EN, HE, AR, RU)' },
      { label: 'Auth layers', value: 'Device + PIN + GPS — three independent verifications' },
      { label: 'Device control', value: 'Every device individually approved before first use' },
      { label: 'Neutral witness', value: 'Observer role — full read access, zero write access' },
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
    buildTime: '31 days',
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
      'Household coordination fails not because families lack apps — it fails because every app either routes everything through one person or lets everyone ignore things equally. WishBasket is built around a different model: a pull system where anyone can request, anyone can claim, and every outcome is permanent. Accountability is in the data structure, not in social pressure. Backed by a shared live inventory, an automatic shopping list, and push notifications delivered by Cloud Functions — not by the app being open.',
    url: 'https://wishbasket.app/',
    accessType: 'public',
    status: 'production',
    tech: ['React 19', 'TypeScript', 'Vite', 'Firebase Firestore', 'Firebase Auth', 'Firebase Storage', 'Cloud Functions v2', 'FCM', 'i18next', 'PWA'],
    stats: [
      { label: 'Accountability', value: 'Named promise + permanent outcome log' },
      { label: 'Activity log', value: 'Immutable — rule-enforced' },
      { label: 'Languages', value: '3 (EN, HE, RU) + RTL' },
      { label: 'Dietary tracking', value: 'Kosher + Halal — baked into data model' },
      { label: 'Item statuses', value: '5 built-in + unlimited custom' },
      { label: 'Push notifications', value: '5 trigger types — works when app is closed' },
    ],
    problem:
      'The real problem isn\'t forgetting to buy milk. It\'s that household coordination is asymmetric: one person carries the cognitive load for everyone, and when something gets dropped there\'s no record of whether it was ever heard. Every shared notes app and grocery list tool adds a place to write things down. None of them change the underlying dynamic — someone still has to manage the list, chase people, and absorb the blame when things fall through. The person who always remembers keeps remembering. Everyone else keeps forgetting.',
    solution:
      'Redesign the accountability model, not the list. Any member drops a request — it\'s visible to everyone immediately. Any other member claims it — their name is attached before the outcome, not after. The result is stored in a separate promiseLogs collection, and Firestore rules block any modification to it. "According to the app" becomes a phrase with actual weight because no one can edit what the app recorded. Push notifications mean the family learns about low stock or a completed shopping trip from the server, not from a group chat message half the family will scroll past.',
    features: [
      { title: 'Immutability as architecture, not policy', description: 'The activity log isn\'t protected by a "don\'t delete" button in the UI — update and delete are blocked at the Firestore security rule level. The distinction matters: application-layer immutability is a promise that any future code change can break. Rule-level immutability is a guarantee the application cannot override. "According to the app" becomes a phrase that actually means something.' },
      { title: 'One notification for twenty writes — a schema decision, not a debounce', description: '"Done Shopping" batch-commits up to 20 item updates in a single Firestore writeBatch. A naive Cloud Function trigger on each item write would fire 20 separate notifications. The fix wasn\'t retry logic or client-side debouncing — it was changing the data model. After the batch commits, the client writes one document to a shoppingTrips collection. One document creation, one Cloud Function trigger, one notification. A distributed systems problem solved with schema design.' },
      { title: 'FCM on a PWA — the version that actually works on Android', description: 'Firebase Cloud Messaging has a silent failure mode: include a notification field in the FCM payload and background delivery stops working on Android without any error. Data-only payloads with explicit service worker background handling are required. Getting this right also means sequencing navigator.serviceWorker.ready before token registration — not using the register() return value. The result works under default battery settings, no manual phone configuration, app fully closed.' },
      { title: '"Not Buying" — a data model insight, not a UI feature', description: 'When a family decides they\'re no longer buying something, the obvious answers are wrong: delete loses history, hide adds stateful complexity, filter needs ongoing maintenance. The right answer is a first-class status that removes the item from the shopping list, keeps it in the inventory, communicates intent to every family member, and sorts to the bottom where it stays out of the way. One status, no special-casing anywhere in the codebase.' },
      { title: 'Custom statuses without special-casing', description: 'ItemStatus is typed as string throughout the app. Built-in statuses ("in_stock", "need_to_buy") and admin-defined custom statuses flow through identical code paths — the same components, the same sort logic, the same Firestore queries. The sort priority function handles all custom statuses with one condition: status !== \'in_stock\'. Adding a new built-in status requires touching one function. Adding a custom status requires no code at all.' },
      { title: 'Pull system, not an admin bottleneck', description: 'Most household coordination routes through one person who becomes the single point of failure. The Wish Basket is a pull system: anyone drops a request, anyone else can claim it — their name attached, the outcome permanent. No central coordinator decides who handles what. The architecture reflects the actual social dynamic of a family rather than imposing a workflow on it.' },
      { title: 'Folder permissions that scale without per-item queries', description: 'allowedFolders[] lives on the user doc and is applied once when the folder tree loads. Every downstream component — item lists, search results, shopping list, notifications — scopes automatically to the filtered set. There are no per-item permission checks. Adding 500 items to a folder costs nothing in permission overhead.' },
      { title: 'RTL and dietary tracking as first-class concerns', description: 'Hebrew RTL isn\'t a late addition or a CSS patch — document.documentElement.dir flips at language switch and all layouts use logical properties. Kosher and halal fields are in the data model from day one, not bolted on when someone asked. The app was designed for Israeli families from the start; the architecture reflects that rather than treating it as an edge case.' },
    ],
    metrics: [
      { label: '"Did anyone see my request?" conversations', before: 'Daily', after: 'Open the log' },
      { label: 'Shopping trip coordination', before: '"What do we need?" text chain', after: 'Open Shopping Mode' },
      { label: 'Knowing stock ran out', before: 'Standing in the store', after: 'Push notification before you leave' },
      { label: 'Disputed household tasks', before: 'No record', after: 'Timestamp + who + what' },
      { label: 'Cognitive load on one person', before: 'Entire household', after: 'Shared across roles' },
    ],
    architecture: 'React 19 SPA. Firebase Firestore with IndexedDB offline persistence — reads from cache, writes queue and sync on reconnect. Immutability enforced at the security rule level: update and delete are blocked on /logs. Request & Promise outcomes tracked in a separate /promiseLogs collection (outcome: kept | declined). FCM push notifications via Cloud Functions v2 (me-west1): onDocumentUpdated on items/{itemId} fires 4 notification types; onDocumentCreated on shoppingTrips/{tripId} fires the consolidated "Shopping Done" notification — client writes one shoppingTrips doc after the batch commit rather than triggering per-item. Data-only FCM payloads with service worker background handling in firebase-messaging-sw.js (FCM compat SDK). Per-user notificationPrefs on users/{uid}. Custom statuses stored on the org doc as CustomStatus[]; ItemStatus typed as string so built-in and custom statuses flow through the same components without special-casing. Emoji data in src/data/emojiCategories.ts — 10 categories, ~150 emojis. Role access via allowedFolders[] on the user doc, filtered once at the folder tree. Google OAuth + email/password. i18next with document.documentElement.dir for Hebrew RTL.',
    linesOfCode: 12500,
    buildTime: 'Shipped to production',
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
    tagline: 'AI-assisted facilities management — ask questions, track everything, miss nothing',
    description:
      'Multi-tenant PWA for facilities and maintenance teams. Tracks consumables and assets across any org structure — folders by floor, room, warehouse, or department. Ask any question in plain English and get a direct answer from your live data. Every stock change is atomic and permanent: who changed it, when, how much, why. Building occupants submit requests through a dedicated Customer Portal — location pre-filled from their profile, status updates visible in real time. In active use by the facilities maintenance team at CyberArc.',
    url: 'https://inventory-e5daa.web.app/',
    accessType: 'request',
    accessNote: 'Live app in active use by the facilities maintenance team at CyberArc — contact for access credentials',
    status: 'production',
    tech: ['React 19', 'TypeScript', 'Vite', 'Firebase Firestore', 'Firebase Auth', 'Firebase Storage', 'Cloud Functions v2', 'FCM', 'Anthropic SDK', 'Recharts', 'jsPDF', 'xlsx', 'dnd-kit', 'Zustand', 'PWA'],
    stats: [
      { label: 'AI assistant', value: 'Natural language queries — Claude Sonnet + agentic tool use' },
      { label: 'Audit log', value: 'Immutable — Firestore rule-enforced' },
      { label: 'Stock updates', value: 'Atomic — quantity + log or neither' },
      { label: 'Item types', value: 'Consumables + assets (one system)' },
      { label: 'In production', value: 'CyberArc — facilities team, daily active use' },
      { label: 'Push notifications', value: '3 trigger types — new ticket, status change, low stock' },
      { label: 'Customer Portal', value: 'Building occupants submit & track requests — location pre-filled from profile' },
    ],
    problem:
      'Facilities teams track physical stock — supplies, tools, equipment — through spreadsheets, paper lists, or memory. Nobody knows who took what or when. Low stock goes unnoticed until something is missing mid-job. No audit trail. No separation between who restocks shelves and who manages inventory.',
    solution:
      'Every stock change is a permanent, atomic record. Folder-level access control means staff only sees what they\'re assigned. Every update — who, when, delta, reason — is written to an immutable log enforced at the database rule level, not the application layer. When something is off, the answer is already there.',
    features: [
      { title: 'Natural Language AI Query', description: 'Ask any question about inventory, tickets, or consumption in plain English. Cloud Function uses Claude Sonnet with agentic tool use — the model picks which Firestore collection(s) to query and with what parameters, executes the queries, then synthesises a direct answer. No regex routing, no keyword matching. Handles semantic variations a rules-based approach never could.' },
      { title: 'AI Report Narrative', description: 'Report downloads include a 2-3 sentence executive summary generated by Claude Haiku from pre-computed stats (consumed, received, top items, zero-stock). Adds context managers would otherwise write manually.' },
      { title: 'Immutable Audit Log', description: 'Every stock change logged with who, when, before, after — update and delete blocked at the Firestore security rule level, not in the UI. Ground truth.' },
      { title: 'Consumables + Assets', description: 'One system for two types: consumables track quantity and low-stock thresholds; assets carry serial number, status (working / needs technician / decommissioned), and an assignee.' },
      { title: 'Consumption Analytics', description: 'Monthly bar charts per item across the last 12 months. 3-month rolling average drives automatic reorder suggestions — shown inline on the stock update screen.' },
      { title: 'PDF + Excel Reports', description: 'Date range + folder filter. Excel for data, PDF with item thumbnails for documentation. Managers capped at 5 image reports per month — reset monthly, tracked per user.' },
      { title: 'Folder-Level Access Control', description: 'Staff and managers see only their assigned folders. One allowedFolders[] array on the user doc, filtered once at the folder tree — all item lists, reports, and alerts scope downstream from there.' },
      { title: 'Bulk Move + Copy', description: 'Multi-select items across a folder and move or copy them in a single writeBatch. Admin reorganizes the entire inventory without touching items one by one.' },
      { title: 'Drag-and-Drop Folder Order', description: 'Admin drags folders into logical order via dnd-kit — sort order persisted to Firestore immediately.' },
      { title: 'Data Backup / Export', description: 'Full org export (all folders + items) as a structured JSON file. Admin-only recovery tool — no cloud dependency for data portability.' },
      { title: 'Customer Portal — Building Occupants as First-Class Users', description: 'Tenants submit requests from their phone, track status live, and rate the outcome — no WhatsApp, no chasing the front desk. Location is saved once in their profile and pre-filled on every request. One tap to confirm, one tap to send. Customer tickets flow into the same maintenance queue with a 🏢 badge and a dedicated filter tab.' },
      { title: 'Maintenance Ticket System', description: 'Staff reports an issue with a title, photo, location, and optional note — instantly visible to the org. Managers commit, escalate, or resolve. Tickets can be assigned to a specific team member; every assignment change is logged automatically ("Reassigned from X to Y · by Z"). Full update thread per ticket. PDF export for management review.' },
      { title: 'Scheduled Events', description: 'Create future maintenance tasks or inspections with a target date. The event stays dormant in the Upcoming filter until that date — visible without cluttering active work. Activates automatically when the date arrives. Completed with a note when done. Team-visible with no personal calendar required.' },
      { title: 'Push Notifications via Cloud Functions v2', description: 'Three Cloud Function triggers: new ticket created (skips reporter), ticket status changed, item crosses the low-stock threshold. Fan-out to all org members via sendEachForMulticast. Data-only FCM payloads handled by a custom service worker — reliable background delivery on Android without special device configuration.' },
    ],
    metrics: [
      { label: 'Finding who changed a stock level', before: 'Ask around', after: 'Open the audit log' },
      { label: 'Low stock awareness', before: 'Noticed when empty', after: 'Alert badge before it runs out' },
      { label: 'Monthly consumption report', before: 'Manual spreadsheet', after: 'One tap — PDF or Excel with AI summary' },
      { label: 'Answering "what did we use last month?"', before: 'Export, filter, calculate', after: 'Ask in plain English, get answer in seconds' },
      { label: 'Onboarding new team member', before: 'Full access or nothing', after: 'Assign specific folders only' },
    ],
    architecture: 'React 19 SPA. Firestore with onSnapshot real-time listeners across 4 collections. writeBatch for atomic stock updates — quantity change and immutable log entry written together or not at all. Firestore security rules enforce: (1) logs are append-only, update/delete blocked; (2) every document scoped to orgId, enforced server-side. Folder visibility filtered once at the folder tree via allowedFolders[] on the user doc — no per-item permission checks as inventory scales. Customer Portal: customer role intercepted at the app router before main routes — profileComplete gate shows CustomerProfileSetup if incomplete, then MyRequestsPage full-screen. Admin configures locationFields[] on the org doc (label, required, placeholder) — zero code changes per deployment. Customers see only their own tickets via onSnapshot without orderBy (avoids composite index requirement); client-side sort by createdAt. Stale modal fix applied to both customer and maintenance views: selectedId stored, live ticket derived from snapshot array on each render. arrayUnion for customer note appends. Firestore rules: customers can read and update their own tickets only; staff sees all org tickets. Google OAuth + email/password via Firebase Auth. Zustand for auth state. jsPDF + jspdf-autotable for PDF, xlsx for Excel. dnd-kit for folder drag-and-drop. Cloud Functions v2 (me-west1): onDocumentCreated on issues/{issueId} fans out new-ticket push notifications; onDocumentUpdated fires on status changes and when items cross their low-stock threshold — sendEachForMulticast delivers to all org members. Data-only FCM payloads with firebase-messaging-sw.js for reliable background delivery. Ticket images uploaded to Firebase Storage at ticket-images/{orgId}/{filename}. Scheduled events stored as status: scheduled in the issues collection — client-side date comparison resolves dormant vs. active state without a Cloud Function. PWA with auto-update via version.json polling.',
    linesOfCode: 15500,
    buildTime: '~3 weeks',
    screenshots: [
      { file: '/inventory_b.png', caption: 'Folder tree — real org structure at CyberArc, nested by location with item counts' },
      { file: '/inventory_f.png', caption: 'Stock update modal — current quantity, delta or exact, monthly consumption chart, and reorder suggestion in one screen' },
      { file: '/inventory_j.png', caption: 'Item list — real inventory in production use, asset photos, status badges, and last-updated timestamps' },
      { file: '/inventory_g.png', caption: 'Ticket system — 31 maintenance issues tracked by status: open, in progress, escalated, resolved' },
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
      { label: 'Role isolation', value: 'Coach notes physically separated from player data at database level' },
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
    buildTime: '~6 weeks',
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
    buildTime: '<2 weeks',
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
      { label: 'Notifications', value: 'Automated reminders in each resident\'s own language' },
      { label: 'Security', value: 'Building data enforced server-side — never leaks between buildings' },
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
    architecture: 'Multi-tenant SaaS. Firebase Realtime Database with role-based security rules — building data access enforced server-side, no workaround possible at the application layer. Cloud Functions handle automated notifications and user management server-side in each resident\'s language. PWA with service worker for offline support. No build step — files served directly via Firebase Hosting.',
    linesOfCode: 22000,
    buildTime: '~2 months',
    screenshots: [
      { file: '/baiti_resident_tutorial.jpg', caption: 'Hebrew, English, Russian — residents use the app in their own language' },
      { file: '/baiti_building_budget.jpg', caption: 'Building budget tracking with income, expenses, and live balance' },
      { file: '/baiti_user_guides.jpg', caption: 'Built-in guides for every role — no support calls needed' },
    ],
  },
  {
    id: 'outboundagent',
    name: 'OutboundAgent',
    tagline: 'An autonomous sales agent for technical founders who know how to build but not how to sell.',
    description:
      'Most technical founders freeze when the product is done and it\'s time to sell it. OutboundAgent runs the outbound process end-to-end — it audits product-market fit using live web research, generates LinkedIn connection requests and DMs the moment you paste a prospect profile, tracks every prospect through an 11-stage pipeline, and carries commitments and strategy forward session to session. The agent\'s entire behavior is driven by 20 Markdown spec files injected dynamically per session path. Changing what it does means editing a file, not the code.',
    url: 'https://headofsalesagent.firebaseapp.com/login',
    accessType: 'request',
    accessNote: 'Live app — contact for access credentials',
    status: 'live-mvp',
    tech: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS v4', 'Zustand', 'Firebase Auth', 'Firestore', 'Cloud Functions v2', 'Anthropic Claude Sonnet 4.6', 'React Router v7', 'React Hook Form', 'Zod', 'SSE streaming', 'PWA'],
    stats: [
      { label: 'Behavior spec files', value: '20 Markdown files — zero code changes to change agent behavior' },
      { label: 'Session routing paths', value: '10 — new user, returning, strategy, content, objection, pricing, stuck, and more' },
      { label: 'Prospect pipeline', value: '11 stages across two parallel tracks — social selling and cold outreach' },
      { label: 'Asset types generated', value: '5 — LinkedIn connection requests, DMs, emails, posts, comments' },
      { label: 'Session memory', value: 'Full — commitments, strategy, self-eval scores, and outcomes carried session to session' },
      { label: 'Web search', value: 'Live — agent audits product-market fit with real research before every strategy session' },
    ],
    problem:
      'Technical founders know how to build. They don\'t know how to sell. The gap between a working product and first revenue isn\'t a product problem — it\'s a sales problem. Generic AI tools can answer sales questions but they don\'t know your specific product, don\'t remember what you tried last week, don\'t track whether your prospects responded, and don\'t hold you accountable. Every conversation starts from zero.',
    solution:
      'OutboundAgent routes each session through a decision tree — needs strategy? generating content? handling an objection? pricing conversation? — and injects only the relevant spec files into the agent context. It audits product-market fit with live web search before giving advice. Paste a LinkedIn profile and a connection request is generated immediately. Every prospect flows through an 11-stage pipeline, auto-updated when assets are generated. Commitments made in one session are read back in the next. Behavior is configuration, not code — 20 Markdown files define every decision the agent makes.',
    features: [
      { title: 'Spec-driven agent behavior', description: '20 Markdown files define the agent\'s entire decision-making process — routing logic, tone rules, evaluation criteria, strategy frameworks, objection handling, and output formats. Changing what the agent does means editing a spec file, not touching code. INDEX.md routes the session path; EVALUATION.md, STRATEGY.md, and OUTPUT.md are injected conditionally based on where the founder is in their process.' },
      { title: 'Live web research built in', description: 'Claude web search is enabled on every session. Before giving strategy advice, the agent searches for current market data, competitor positioning, and ICP signals specific to the founder\'s product. Not static knowledge — live research on every call.' },
      { title: 'Paste profile → message generated', description: 'Founder pastes a LinkedIn profile. Agent parses name, role, company, industry, and company size — then generates a personalized connection request or DM immediately. Prospect record created automatically in Firestore. Progress counter increments. Zero manual logging.' },
      { title: 'Persistent session memory', description: 'Commitments, strategy decisions, self-evaluation scores (1–9), and improvement proposals are written to Firestore after every session via [SESSION_LOG] markers in the agent response. The next session reads the full history before turn 1. The agent never asks the same questions twice.' },
      { title: '11-stage prospect pipeline, two tracks', description: 'Social selling track: watching → engaging → warm → DM-ready → converted. Cold outreach track: identified → researched → contacted → followed up → responded → meeting booked → closed. Pipeline status auto-updates when assets are generated. Real-time Firestore listeners sync the sidebar instantly.' },
      { title: 'Decision tree routing — 10 session paths', description: 'INDEX.md routes every session into one of 10 paths based on user context and turn number: new-user, returning, pre-revenue, has-traction, needs-strategy, needs-content, objection, pricing, stuck, full-session. Each path loads a different set of spec files. The agent never loads context it doesn\'t need.' },
      { title: 'SSE streaming with live status', description: 'Agent responses stream via Server-Sent Events from Cloud Function to client. UI shows "Running product audit...", "Searching market data...", "Generating outreach..." tied to which spec files were loaded and which tools are running. Not just a spinner — the status reflects what the agent is actually doing.' },
      { title: 'Prompt caching on spec files', description: 'Spec files are injected with cache_control: ephemeral — spec content is cached at the API level and reused across turns in the same session. Reduces latency and token cost on every follow-up message without any change to agent behavior.' },
    ],
    metrics: [
      { label: 'Sales knowledge personalization', before: 'Generic — same advice to every founder', after: 'Product-specific — reads your product context before every response' },
      { label: 'Prospect tracking', before: 'Manual spreadsheet or nothing', after: '11-stage pipeline, two tracks, auto-updated on asset generation' },
      { label: 'Session continuity', before: 'Every conversation starts from zero', after: 'Commitments, strategy, and outcomes carried forward automatically' },
      { label: 'LinkedIn outreach', before: 'Written manually — hours per prospect', after: 'Paste profile → message generated in seconds' },
      { label: 'Changing agent behavior', before: 'Code change + redeploy', after: 'Edit a Markdown spec file' },
      { label: 'Market research per session', before: 'Not done — too slow', after: 'Automatic — live web search before every strategy session' },
    ],
    architecture: 'Three-tier: React 19 frontend (Zustand + 5 custom hooks), Firebase Cloud Functions v2 backend (Node.js, europe-west1), Anthropic Claude Sonnet 4.6 with web search. Frontend: three-panel layout — left sidebar (sessions + prospect pipeline), center (streaming chat), right (strategy context panel) — responsive mobile with slide-overs and hamburger nav. Custom hooks: useSession (message threading + Firestore persistence + localStorage cache), useProspects (real-time onSnapshot listener), useSessionList, useAuth (Firebase auth lifecycle + name collection on signup). Backend: single /agent-turn endpoint — system prompt constructed dynamically from spec files based on session path and turn number. INDEX.md always loaded; EVALUATION.md, STRATEGY.md, OUTPUT.md, and KNOWLEDGE.md injected conditionally per routing decision. Claude runs with web search tool enabled. Agent emits [SESSION_LOG]{JSON}[/SESSION_LOG] markers — CF parses and writes structured session data (commitment, strategy, self-eval score, improvement proposal) to Firestore. Asset detection via [ASSET]/[/ASSET] markers — prospect records created and pipeline updated automatically. Prompt caching: cache_control ephemeral on all spec file injections. Firestore schema: /users/{uid}/projects/{productId}/sessions/{date}/messages/{msgId} + /prospects/{id}/interactions/{id}. React Hook Form + Zod for product intake validation. React Router v7 for auth-gated routing.',
    linesOfCode: 6500,
    buildTime: 'Active development · Built solo',
    leverage: {
      without: [
        '3–5 engineers to build the full sales automation pipeline',
        'A sales methodology consultant to encode the routing decision tree',
        'A copywriter to generate outreach templates per persona and industry',
        'A market research team for competitor and ICP analysis',
        'A CRM integration team for prospect pipeline tracking',
      ],
      with: [
        'Built solo — architecture, spec design, agent routing, full Firestore pipeline',
        '20 Markdown files encode the entire sales methodology — configuration, not code',
        'Claude API with live web search replaces market research on every session',
        'Asset generation replaces copywriter — paste a profile, get a personalized message',
        'Firestore pipeline replaces CRM for early-stage founders',
      ],
      note: 'AI made it possible to encode a complete outbound sales process into 20 spec files and ship a working autonomous agent solo. The methodology behind OutboundAgent comes from real B2B sales experience — AI made it executable, personalized, and deployable to any founder with any product.',
    },
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
  tagline: 'The accumulated methodology of professional basketball. One system, publicly accessible for the first time.',
  description:
    'This knowledge was not created here. It was built by generations of coaches across NBA, NCAA, EuroLeague, and FIBA — tested in thousands of games, argued over in film sessions, refined through decades of professional practice worldwide. It existed scattered across clinics most coaches never attend, research papers nobody reads, and the heads of coaches who could only reach 20 players at a time. The Championship Coaching Blueprint synthesized it into one visual, data-backed system and made it publicly accessible.',
  url: 'https://court-iq.org/resources/index.html',
  stats: [
    { label: 'Available anywhere else', value: 'Nothing like it' },
    { label: 'Data sources', value: 'NBA · NCAA · EuroLeague · FIBA' },
    { label: 'Access', value: 'Free — no account, no paywall' },
    { label: 'Interactive guides', value: '27 HTML guides with data visualizations' },
    { label: 'In-depth playbooks', value: '12 detailed implementation docs' },
    { label: 'Chart visualizations', value: '20+ data-backed' },
    { label: 'Interconnected topics', value: '100+' },
  ],
  what: 'A visual knowledge system that synthesizes 20+ years of basketball research — NBA, NCAA, European leagues, published books, coaching articles, and public datasets — into one organized, data-backed resource. Not just "what to do" but "here is WHY, with the data to prove it."',
  unique:
    'Nothing like this exists anywhere on the internet. Most coaches — even experienced ones — will never encounter 20% of what\'s documented here through traditional education or coaching clinics. Every recommendation is backed by points-per-possession data, correlation analysis, and real game evidence.',
  aiRole:
    'AI made two things possible. First: processing decades of scattered research — books, articles, game footage analysis, published datasets across four leagues — into one coherent system. What would take a research team months took weeks. Second: translating complex analytical findings into visual presentations coaches can actually use without a data science background. The knowledge is the accumulated work of the professional basketball world. AI made it possible to synthesize and present it at a scale one person could not do alone.',
  categories: [
    { name: 'Offensive Systems', pages: 3, description: 'Transition offense (1.228 PPP statistical case), pick-and-roll, offensive performance. Complete implementation roadmaps with PPP validation.' },
    { name: 'Defensive Systems', pages: 5, description: 'Pack-line defense, zone coverage, 8 pick-and-roll coverages ranked by effectiveness (ICE: 0.84 PPP), full 1-2-2 press and Diamond Press implementations.' },
    { name: 'Skills Development', pages: 3, description: 'Shooting mechanics, analytics-based shot selection, 8 inside finishing moves with technique breakdowns.' },
    { name: 'Analysis & Strategy', pages: 3, description: 'Pass analysis, shot zone PPP/PPS by location and defender distance, strategic correlations. Championship team patterns decoded.' },
    { name: 'Basketball Systems', pages: 3, description: 'Data-driven 2025 system, deep correlations & strategic insights, read-and-react offense framework.' },
    { name: 'Player Development', pages: 3, description: 'Rebounding analytics and technique, inside finishing moves, pick-and-roll reads — data-backed progressions across all positions.' },
    { name: 'Coaching Playbooks', pages: 4, description: 'Full implementation guides: Pack Line Defense (11-week installation), 1-2-2 Press, Diamond Press (8 variations, VCU Havoc comparison), Transition Offense.' },
  ],
  impact: [
    'Nothing like this exists anywhere on the internet — most experienced coaches will never encounter 20% of what\'s documented here through traditional education or clinics',
    'Not opinion — every recommendation backed by points-per-possession data from real games',
    'Cutting = 1.58 PPP vs standing still = 0.87 PPP — the data behind why movement beats waiting',
    'ICE coverage: 0.84 PPP allowed vs HEDGE: 0.91 PPP — the numbers behind which pick-and-roll defense to run and when',
    'Championship team patterns: 72% switch-heavy defensive trend — decoded with evidence',
    'Age-appropriate progressions from youth (8yr) to college — what to teach, when, and why in that order',
  ],
};