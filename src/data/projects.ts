/**
 * Canonical project registry.
 *
 * Content rules (see README "Content sources"):
 * - Facts come from the owner-supplied project briefs and the portfolio's previous records.
 * - Every metric carries a `source` label (e.g. "README-reported", "Public leaderboard").
 * - Private repositories keep their URL out of the UI: `repo.visibility === 'private'`
 *   renders a "Source private" label, never a link.
 * - Never add a live URL, APK, award or metric that has not been confirmed.
 */

export type ProjectCategory = 'ai' | 'ml' | 'web' | 'mobile' | 'civic';

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  ai: 'Applied AI & Agents',
  ml: 'Machine Learning & Data',
  web: 'Web & SaaS',
  mobile: 'Mobile & Accessibility',
  civic: 'Civic & Social Impact',
};

export const CATEGORY_ORDER: ProjectCategory[] = ['ai', 'ml', 'web', 'mobile', 'civic'];

export type RepoVisibility = 'public' | 'private' | 'unknown';

export interface ProjectRepo {
  visibility: RepoVisibility;
  /** Only set for public repositories. */
  url?: string;
}

export interface ProjectResult {
  label: string;
  value: string;
  /** Where the figure comes from, shown next to it. */
  source: string;
}

export interface ArchitectureStep {
  step: string;
  detail: string;
}

export interface Challenge {
  title: string;
  detail: string;
}

export interface CaseStudy {
  problem: string;
  users: string;
  built: string[];
  architecture?: ArchitectureStep[];
  challenges?: Challenge[];
  quality?: string[];
  results?: ProjectResult[];
  limitations: string[];
}

export interface Project {
  slug: string;
  name: string;
  /** One line, shown under the name. */
  tagline: string;
  /** Two or three sentences, shown on cards and as the meta description. */
  summary: string;
  categories: ProjectCategory[];
  featured: boolean;
  order: number;
  /** Honest status label, e.g. "Public beta", "Mobile prototype". */
  status: string;
  /** Nature of the work: independent product, hackathon entry, course capstone, etc. */
  projectType: string;
  /** My role on the project, shown on cards and case studies. */
  role: string;
  years?: string;
  event?: string;
  award?: string;
  liveUrl?: string;
  /** Short note shown next to the live link, e.g. that sign-in is required. */
  liveNote?: string;
  videoUrl?: string;
  repo: ProjectRepo;
  techStack: string[];
  /** Two or three engineering highlights for cards. */
  highlights: string[];
  caseStudy: CaseStudy;
}

export const PROJECTS: Project[] = [
  {
    slug: 'ai-health-chat',
    name: 'AI Health Chat',
    tagline: 'Multilingual health-information and triage-support assistant on web and WhatsApp',
    summary:
      'A public-beta assistant that gives educational health guidance in five languages, on an installable web app and on WhatsApp. It keeps track of an ongoing case across turns, escalates consistently when symptoms need professional care, and can produce a SOAP-style summary the user chooses to share with a clinician.',
    categories: ['ai', 'web', 'civic'],
    featured: true,
    order: 1,
    status: 'Public beta',
    projectType: 'Independent product',
    role: 'Founder · full-stack & AI engineer',
    years: '2024 – present',
    award: '1st place, Power Learn Project Class of 2024 graduate hackathon (December 2024)',
    liveUrl: 'https://aihealthchat.qzz.io/',
    videoUrl: 'https://youtu.be/Ic3GXYO-cS0',
    repo: { visibility: 'private' },
    techStack: [
      'React',
      'TypeScript',
      'Vite',
      'Supabase (PostgreSQL, RLS)',
      'Vercel',
      'Groq',
      'OpenRouter',
      'Mistral / Pixtral',
      'Meta WhatsApp integration',
    ],
    highlights: [
      'Five languages (English, Kiswahili, French, Spanish, Dutch) across a web PWA and WhatsApp',
      'Multi-turn case state, Medium/High detail modes and consistent safety escalation',
      'Supabase Row Level Security, server-side provider keys, consent and retention purging',
    ],
    caseStudy: {
      problem:
        'Many people look up health concerns on a phone first, often in a language other than English, and need to know when a symptom calls for professional care. General-purpose chatbots rarely keep a consistent picture of the case or apply the same safety rules in every language.',
      users:
        'People looking for general health information in English, Kiswahili, French, Spanish or Dutch, and the clinicians they later see, who can receive a structured summary the user chooses to share.',
      built: [
        'Web PWA and Meta WhatsApp integration served by the same assistant logic.',
        'Medium and High detail response modes with consistent safety escalation and a healthcare disclaimer.',
        'Conversation continuity and triage routing, with a multi-turn case state so follow-up questions refer back to the right case.',
        'Image analysis with Mistral/Pixtral, deliberately conservative and limited to first-aid level guidance.',
        'Biometric tracking: manual entry plus opted-in extraction from chat, with validation and trend charts.',
        'SOAP-style consultation reports built only from measured or logged vitals, with provenance for each value, and privacy-minded share links.',
        'Provider fallback across Groq, OpenRouter and Mistral so one provider outage does not take the assistant down.',
      ],
      architecture: [
        { step: 'Channels', detail: 'Installable web app (PWA) and a Meta WhatsApp webhook with request verification.' },
        { step: 'Orchestration', detail: 'Server-side routing, case state and detail modes; provider keys never reach the browser.' },
        { step: 'Models', detail: 'Groq and OpenRouter text models with fallback; Mistral/Pixtral for images.' },
        { step: 'Data', detail: 'Supabase PostgreSQL with Row Level Security, opt-in consent and retention purging.' },
        { step: 'Outputs', detail: 'Guidance with disclaimers and escalation; SOAP reports with vitals provenance; share links.' },
      ],
      challenges: [
        {
          title: 'Keeping a long conversation coherent',
          detail:
            'A structured case state carries symptoms and context between turns, so a follow-up like "it is worse today" is interpreted against the right case instead of starting over.',
        },
        {
          title: 'Applying the same safety rules in five languages',
          detail:
            'Escalation guardrails and disclaimers apply regardless of language or detail mode, and the test suite includes checks across all five languages.',
        },
        {
          title: 'Reports a clinician can trust',
          detail:
            'SOAP summaries only use vitals that were measured or logged and record where each value came from, rather than letting the model infer numbers.',
        },
      ],
      quality: [
        'Automated test suite, which the project README reports as 144 passing tests, including five-language checks.',
        'Supabase Row Level Security, server-side API keys, webhook verification and rate limits.',
        'Opt-in consent, retention purging and a visible healthcare disclaimer.',
      ],
      results: [
        { label: 'Hackathon', value: '1st place, PLP Class of 2024 graduate hackathon', source: 'Owner-reported, Dec 2024' },
        { label: 'Automated tests', value: '144 passing', source: 'README-reported' },
        { label: 'Languages', value: '5', source: 'Product feature' },
      ],
      limitations: [
        'Provides educational guidance and triage support. It is not a diagnostic tool, has not been clinically validated, and does not prescribe or replace a clinician.',
        'Image analysis is intentionally conservative and limited.',
        'Public beta: features and behaviour are still changing.',
      ],
    },
  },
  {
    slug: 'eyesense',
    name: 'EyeSense',
    tagline: 'AI visual assistance for blind and low-vision Android users',
    summary:
      'An Android-first Flutter app that describes scenes, reads printed text aloud fully offline, and answers spoken questions about a captured image. It was built around TalkBack, explicit consent before any image leaves the phone, and clear limits on what the AI may say.',
    categories: ['mobile', 'ai', 'civic'],
    featured: true,
    order: 2,
    status: 'Mobile prototype',
    projectType: 'Innovation showcase project',
    role: 'Full-stack & AI engineer',
    event: 'MUA Innovation Week 2026',
    years: '2026',
    repo: { visibility: 'public', url: 'https://github.com/RealDevRay/eyesense' },
    techStack: [
      'Flutter',
      'Dart',
      'Google ML Kit (on-device OCR)',
      'Cloudflare Workers',
      'TypeScript',
      'Groq (vision)',
      'Vitest',
    ],
    highlights: [
      'Offline OCR with Google ML Kit; scene description and image Q&A through a Groq vision model',
      'TalkBack semantics, interruptible text-to-speech, speech commands, high contrast and 200% text scale',
      'Cloudflare Worker with auth, rate limits, concurrency and budget caps; consent before cloud processing',
    ],
    caseStudy: {
      problem:
        'Blind and low-vision people need fast, spoken descriptions of printed text and their surroundings, through controls that work with a screen reader. They also need honesty about what an AI system cannot safely tell them.',
      users: 'Blind and low-vision Android users. The interface is available in English and Kiswahili.',
      built: [
        'Describe Scene, Read Text and Ask a Question flows, with Stop and Repeat controls throughout.',
        'Read Text runs fully offline with Google ML Kit, so printed text works without a connection.',
        'TalkBack semantics, interruptible text-to-speech, speech commands, a maximum-contrast theme, Atkinson Hyperlegible type and support for 200% text scale.',
        'A Cloudflare Worker that holds the shared provider key and enforces authorisation, rate limits, concurrency caps and a budget cap.',
        'Optional bring-your-own Groq key, kept in secure storage on the device.',
        'Explicit consent before an image is sent for cloud processing, and an output safety supervisor that filters what is spoken.',
      ],
      architecture: [
        { step: 'Capture', detail: 'Camera snapshot on the device; nothing is uploaded without consent.' },
        { step: 'On device', detail: 'Google ML Kit OCR for Read Text, fully offline.' },
        { step: 'Cloud (opt-in)', detail: 'Cloudflare Worker → Groq vision model for scene description and follow-up questions.' },
        { step: 'Safety', detail: 'Output policy supervisor removes unsafe guidance, such as navigation or road-crossing instructions.' },
        { step: 'Speech', detail: 'Interruptible text-to-speech designed to work alongside TalkBack.' },
      ],
      challenges: [
        {
          title: 'Not over-promising',
          detail:
            'The app refuses navigation and road-crossing guidance. A vision model cannot judge traffic or distance reliably enough for that.',
        },
        {
          title: 'Protecting a shared API key in a mobile app',
          detail:
            'The provider key lives in the Worker, not the APK. The Worker adds authorisation, rate limits, concurrency caps and a spending cap, and users can bring their own key instead.',
        },
        {
          title: 'Working without a connection',
          detail: 'Text reading uses on-device ML Kit, so the most common task keeps working offline.',
        },
      ],
      quality: [
        'The README reports 24 Flutter tests and 10 Worker tests passing.',
        'Consent prompt before cloud processing; secure storage for user-supplied keys.',
      ],
      results: [{ label: 'Automated tests', value: '24 Flutter · 10 Worker', source: 'README-reported' }],
      limitations: [
        'Prototype: on-device TalkBack testing and a formal contrast audit are still pending.',
        'The ReadingAgent summarisation step is a stub and has been deferred.',
        'No public APK has been released; this page describes the engineering, not a store listing.',
        'Not a navigation aid.',
      ],
    },
  },
  {
    slug: 'movie-recommendation',
    name: 'Movie Recommendation Project',
    tagline: 'Predicting unseen movie ratings from about 10 million user ratings',
    summary:
      'A hybrid recommender built for an ExploreAI Academy community competition on Kaggle, as the optional final project of the ALX Data Science programme. It combines 50-factor SVD with LightGBM on the full dataset and improved the public-leaderboard RMSE from 1.21 to 0.82 over eight submissions. I did all of the work myself, from data preparation and feature engineering to training and evaluating the model.',
    categories: ['ml'],
    featured: true,
    order: 3,
    status: 'Competition entry',
    projectType: 'Programme final project (optional)',
    role: 'Sole ML engineer: data, features, model training & evaluation',
    event: 'ALX Data Science · ExploreAI Academy community competition on Kaggle',
    years: '2026',
    repo: { visibility: 'public', url: 'https://github.com/rayklanderman/mrp-2026' },
    techStack: ['Python', 'LightGBM', 'SVD (matrix factorisation)', 'scikit-learn', 'Pandas', 'NumPy', 'SciPy'],
    highlights: [
      'Hybrid model: 50-factor SVD collaborative filtering feeding a LightGBM regressor',
      'Trained on about 10 million ratings with no sampling; 156 reported features',
      'Public-leaderboard RMSE 1.21 → 0.82 across eight submissions',
    ],
    caseStudy: {
      problem:
        'Predict the rating a user would give a film they have not rated yet, using their rating history and information about the films.',
      users:
        'A course competition scored by RMSE. The same approach applies to recommendation features in streaming and e-commerce catalogues.',
      built: [
        'A 50-factor SVD model that captures user and movie latent factors from the rating matrix.',
        'A LightGBM model that takes SVD outputs together with engineered features, making it a hybrid of collaborative and content signals.',
        'A feature set reported at 156 features, covering collaborative signals, content-based encodings and temporal patterns.',
        'Training on the full dataset of about 10 million ratings, without sampling.',
        'Eight leaderboard submissions, each tested against the previous best.',
      ],
      architecture: [
        { step: 'Data', detail: 'About 10 million user–movie ratings plus movie metadata.' },
        { step: 'Collaborative filtering', detail: '50-factor SVD on the rating matrix.' },
        { step: 'Features', detail: 'SVD outputs combined with engineered collaborative, content and temporal features.' },
        { step: 'Model', detail: 'LightGBM gradient-boosted regressor predicting the rating.' },
        { step: 'Evaluation', detail: 'RMSE, checked through public-leaderboard submissions.' },
      ],
      challenges: [
        {
          title: 'Working at full scale',
          detail: 'The models trained on all of the roughly 10 million ratings rather than a sample.',
        },
        {
          title: 'Combining two modelling families',
          detail:
            'SVD factors become inputs to a gradient-boosted model, so the model can learn from both collaborative and content signals.',
        },
      ],
      results: [
        { label: 'RMSE (baseline)', value: '1.21', source: 'Kaggle public leaderboard' },
        { label: 'RMSE (best)', value: '0.82', source: 'Kaggle public leaderboard, 8 submissions' },
      ],
      limitations: [
        'The 0.82 figure is a public-leaderboard score. It is not a final private-leaderboard result or a production metric.',
        'How much each feature group contributed to the final score has not been broken down here.',
      ],
    },
  },
  {
    slug: 'sauti-mtaani-nairobi',
    name: 'Sauti Mtaani Nairobi',
    tagline: 'Structured resident feedback for the Office of the Nairobi Woman Representative',
    summary:
      'A bilingual (English and Kiswahili) resident-feedback platform built for the Office of the Nairobi Woman Representative, Hon. Esther Passaris. Residents give consent and answer short ward-level polls. Staff see only aggregate, privacy-protected results, and AI suggestions always need a person to approve them.',
    categories: ['civic', 'web', 'ai'],
    featured: true,
    order: 4,
    status: 'Live web app',
    projectType: 'Civic platform',
    role: 'Full-stack & AI engineer',
    event: 'Built for the Office of the Nairobi Woman Representative',
    liveUrl: 'https://www.sautimtaani.site/',
    videoUrl: 'https://youtu.be/xKE3hNbTLGs',
    repo: { visibility: 'private' },
    techStack: ['Next.js', 'TypeScript', 'Supabase (PostgreSQL, RLS)', 'Groq', 'Vitest'],
    highlights: [
      'Consent-first ward polls in English and Kiswahili, with aggregate-only staff dashboards',
      'Suppression thresholds, digest-based anti-abuse and local PII scrubbing before any AI call',
      'Human oversight: AI theme and moderation suggestions need staff approval',
    ],
    caseStudy: {
      problem:
        'Residents rarely have a structured, privacy-respecting way to tell their representative’s office what matters in their ward. Staff need aggregate insight without handling individual personal data.',
      users: 'Nairobi residents, in English or Kiswahili, and authorised staff in the representative’s office.',
      built: [
        'Consent and privacy notices, then a short registration (ward, age band, gender) and a 2–4 question poll.',
        'Privacy-safe live results for residents, and aggregate-only dashboards for staff.',
        'Suppression thresholds so small groups are never shown in a way that could identify someone.',
        'Digest-based anti-abuse, so duplicate submissions can be detected without storing raw identifiers.',
        'A resident FAQ grounded in published facts.',
        'Optional Groq-based assistance with local PII scrubbing before text leaves the server, plus quotas and rate limits.',
        'Theme and moderation suggestions that are advisory only. AI never silently labels a submission or changes public content.',
      ],
      architecture: [
        { step: 'Resident app', detail: 'English/Kiswahili interface; consent, registration and short polls.' },
        { step: 'Server', detail: 'Validation, anti-abuse digests, quotas and rate limits.' },
        { step: 'Data', detail: 'Supabase PostgreSQL with Row Level Security.' },
        { step: 'Reporting', detail: 'Aggregates with suppression thresholds; staff dashboards never show individual responses.' },
        { step: 'AI assist', detail: 'PII scrubbed locally → Groq → suggestion queue → staff approval.' },
      ],
      challenges: [
        {
          title: 'Keeping humans in charge',
          detail:
            'AI produces suggestions, not decisions. Authorised staff approve any suggested tag or moderation action before it takes effect.',
        },
        {
          title: 'Privacy in small wards',
          detail: 'Suppression thresholds hide breakdowns that are too small to publish safely.',
        },
        {
          title: 'Abuse prevention without tracking people',
          detail: 'Digest-based checks limit repeat submissions without keeping raw identifiers.',
        },
      ],
      quality: [
        'CI gates for type checking, linting, Vitest tests and a production build (project README).',
        'Supabase Row Level Security; local PII scrubbing; quotas and rate limits on AI features.',
      ],
      limitations: [
        'Results come from a self-selected group of residents and are not a scientific poll.',
        'Taking part has no effect on eligibility for bursaries, programmes or other services.',
        'AI suggestions are advisory and only take effect after staff review.',
      ],
    },
  },
  {
    slug: 'tutalearn',
    name: 'TutaLearn',
    tagline: "AI-supported learning for Kenya's Competency-Based Curriculum (CBC)",
    summary:
      "A mobile-first learning platform for Kenya's CBC: grade-by-grade syllabus content, quizzes and exams, progress tracking and report cards, with an AI tutor that knows the learner's grade and subject. A content pipeline validates generated material and keeps it in draft until it is reviewed and published. WhatsApp and M-Pesa features are coming soon.",
    categories: ['ai', 'web', 'civic'],
    featured: true,
    order: 5,
    status: 'Live web app · active development',
    projectType: 'Independent product',
    role: 'Full-stack & AI engineer',
    liveUrl: 'https://tutalearn.qzz.io/',
    repo: { visibility: 'private' },
    techStack: ['Next.js', 'React', 'TypeScript', 'Supabase (Auth, PostgreSQL, RLS)', 'OpenRouter'],
    highlights: [
      'Grade syllabus content, quizzes and exams in place, with progress tracking, report cards and parent views',
      'Grade- and subject-aware AI tutoring',
      'Content pipeline with validation and draft review before publishing; automated tests and CI/CD',
    ],
    caseStudy: {
      problem:
        "Learners and parents following Kenya's CBC need curriculum-aligned practice and clear progress reporting. Generic AI tutors do not know which grade, subject or strand a learner is working on.",
      users: 'CBC learners and their parents or guardians.',
      built: [
        'Syllabus content for each CBC grade, with quizzes and exams (completed, owner-reported).',
        'Learner progress tracking, report cards and parent-facing views.',
        "AI tutoring that uses the learner's grade and subject as context.",
        'A curriculum operations pipeline: generated content is validated, held as a draft, then reviewed and published.',
        'Supabase Auth with PostgreSQL and Row Level Security for learner data.',
        'Integration architecture for WhatsApp and Safaricom Daraja (M-Pesa), ahead of launching those channels.',
      ],
      architecture: [
        { step: 'Content pipeline', detail: 'Generate → validate → draft → review → publish.' },
        { step: 'Data', detail: 'Supabase Auth and PostgreSQL with Row Level Security.' },
        { step: 'Learning app', detail: 'Next.js web app for lessons, assessments and progress.' },
        { step: 'Tutor', detail: 'LLM tutoring with grade and subject context.' },
        { step: 'Reporting', detail: 'Report cards and parent views built from progress data.' },
      ],
      challenges: [
        {
          title: 'Quality control for generated content',
          detail: 'Generated lessons go through validation and stay in draft until they are reviewed and published.',
        },
        {
          title: 'Context-aware tutoring',
          detail: "The tutor is scoped to the learner's grade and subject, so answers match what the learner is studying.",
        },
      ],
      quality: [
        'Automated tests and a CI/CD pipeline are in place (confirmed by the owner; test counts are not published here).',
        'Row Level Security on learner data.',
      ],
      limitations: [
        'WhatsApp and M-Pesa (Daraja) features are coming soon and are not live yet.',
        'In active development; offline use is limited.',
      ],
    },
  },
  {
    slug: 'luminae',
    name: 'Luminae',
    tagline: 'Five-agent research-paper analysis built on Mistral models',
    summary:
      'A Mistral Worldwide Hackathon entry that reads a research paper with Mistral OCR and runs five specialised agents over it: a methodology critique, a dataset audit, experiment suggestions and a grant outline, then a synthesis. Outputs are structured and cost-controlled, and they are meant as decision support.',
    categories: ['ai', 'web'],
    featured: true,
    order: 6,
    status: 'Live web app',
    projectType: 'Hackathon entry',
    role: 'Full-stack & AI engineer',
    event: 'Mistral Worldwide Hackathon',
    liveUrl: 'https://luminae.qzz.io/',
    videoUrl: 'https://youtu.be/ODygWunOA6Y',
    repo: { visibility: 'public', url: 'https://github.com/RealDevRay/luminae' },
    techStack: ['Mistral OCR', 'Mistral models', 'FastAPI', 'Python', 'Next.js', 'TypeScript', 'Supabase', 'Redis (Upstash)'],
    highlights: [
      'Five agents: Methodology Critic, Dataset Auditor, Experiment Designer, Synthesis Agent, Grant Generator',
      'Mistral OCR and figure understanding for multi-format document ingestion',
      'Structured outputs, Redis caching and budget middleware to cap API spend',
    ],
    caseStudy: {
      problem:
        'Reviewing a paper’s methodology, data and possible next experiments takes expert time. Students and small research teams benefit from a structured first pass before they spend that time.',
      users: 'Researchers, students and small research teams.',
      built: [
        'Document ingestion with Mistral OCR, including figures.',
        'Five specialised agents running over the parsed paper: Methodology Critic, Dataset Auditor, Experiment Designer, Grant Generator and a Synthesis Agent that combines their findings.',
        'Structured model outputs so every agent returns predictable, renderable results.',
        'FastAPI backend, Next.js frontend, Supabase PostgreSQL and Redis (Upstash) caching.',
        'Budget middleware that tracks and limits API usage.',
      ],
      architecture: [
        { step: 'Ingest', detail: 'Upload → Mistral OCR and figure understanding.' },
        { step: 'Analyse', detail: 'Four specialist agents run over the parsed document.' },
        { step: 'Synthesise', detail: 'Synthesis Agent combines the specialist outputs.' },
        { step: 'Control', detail: 'Structured outputs, Redis caching and budget middleware.' },
        { step: 'Store & present', detail: 'Supabase PostgreSQL; Next.js interface.' },
      ],
      challenges: [
        {
          title: 'Orchestrating several agents',
          detail: 'Specialist agents work in parallel and a synthesis step reconciles their findings into one report.',
        },
        {
          title: 'Predictable output',
          detail: 'Structured outputs keep each agent’s result in a consistent shape that the interface can render reliably.',
        },
        {
          title: 'Staying within a hackathon budget',
          detail: 'Caching avoids re-analysing the same paper, and budget middleware caps spend.',
        },
      ],
      results: [
        {
          label: 'Estimated cost',
          value: '≈ $0.05 per paper within a $15 hackathon budget',
          source: 'README estimate, not independently measured',
        },
      ],
      limitations: [
        'Outputs are AI-generated decision support. They are not verified research conclusions and can contain errors.',
        'Hackathon entry; no award or ranking is claimed.',
      ],
    },
  },
  {
    slug: 'urbanspark-ai',
    name: 'UrbanSpark AI',
    tagline: 'Creative assistant for young Kenyan entrepreneurs, in Sheng-English',
    summary:
      'A Flutter app concept for Kenyan entrepreneurs aged roughly 15–25. It turns a photo and a Sheng-English prompt into logo ideas, social posts, marketing copy, business suggestions and next steps.',
    categories: ['mobile', 'ai'],
    featured: false,
    order: 7,
    status: 'In development',
    projectType: 'Independent project',
    role: 'Full-stack & AI engineer',
    repo: { visibility: 'private' },
    techStack: ['Flutter', 'Dart', 'Riverpod', 'Supabase', 'Groq (multimodal)', 'Hive (offline cache)'],
    highlights: [
      'Image plus Sheng-English prompts for culturally relevant output',
      'Offline caching with Hive; Supabase backend',
    ],
    caseStudy: {
      problem:
        'Young entrepreneurs often lack the budget for branding and marketing help, and most AI tools do not understand Sheng.',
      users: 'Kenyan entrepreneurs aged roughly 15–25.',
      built: [
        'Flutter app with Riverpod state management.',
        'Multimodal prompts (image plus Sheng-English text) for logo concepts, social content, marketing copy and action steps.',
        'Hive offline caching and a Supabase backend.',
      ],
      limitations: ['In development and not publicly released.'],
    },
  },
  {
    slug: 'autoresearcher',
    name: 'AutoResearcher',
    tagline: 'Seven-agent workflow that turns a prompt into a cited research report',
    summary:
      'Capstone project for Google’s 5-Day AI Agents course: a hierarchical, seven-agent system built with the Vertex AI Agent Development Kit and Gemini. It researches the web with Tavily and compiles a citation-rich report to PDF with Pandoc and LaTeX.',
    categories: ['ai'],
    featured: false,
    order: 8,
    status: 'Course capstone',
    projectType: 'Course capstone',
    role: 'Full-stack & AI engineer',
    event: 'Google 5-Day AI Agents course',
    videoUrl: 'https://youtu.be/s5Sktg34uC0',
    repo: { visibility: 'public', url: 'https://github.com/rayklanderman/CapstoneProject-Autoresearcher' },
    techStack: ['Vertex AI ADK', 'Gemini 2.5 Pro', 'Gemini 2.5 Flash', 'Tavily', 'Pandoc', 'LaTeX', 'Jupyter'],
    highlights: ['Seven-agent hierarchy with web retrieval and citations', 'Report compiled to a LaTeX PDF'],
    caseStudy: {
      problem: 'Producing a sourced research report from a single question takes many manual steps.',
      users: 'Course project; applicable to anyone who needs a first-draft literature or market scan.',
      built: [
        'A seven-agent hierarchy built with the Vertex AI Agent Development Kit.',
        'Gemini 2.5 Pro and Flash for planning and writing; Tavily for web research.',
        'Pandoc and LaTeX to compile a citation-rich PDF.',
      ],
      limitations: ['Course capstone, not client or production work.'],
    },
  },
  {
    slug: 'postshifterpro',
    name: 'PostShifterPro',
    tagline: 'Turns a link or article into platform-ready social and newsletter drafts',
    summary:
      'Paste a URL or article and get four platform-specific drafts: an X thread, a LinkedIn post, a newsletter section and an Instagram caption, generated with Groq-hosted Llama models and ready to copy.',
    categories: ['ai', 'web'],
    featured: false,
    order: 9,
    status: 'Live web app',
    projectType: 'Independent project',
    role: 'Full-stack & AI engineer',
    liveUrl: 'https://postshifterpro.qzz.io/',
    repo: { visibility: 'unknown' },
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Groq', 'Cheerio'],
    highlights: ['Content extraction with Cheerio', 'Four platform variants with one-click copy'],
    caseStudy: {
      problem: 'Repurposing one piece of writing for several platforms is repetitive manual work.',
      users: 'Writers, marketers and small teams publishing across social platforms.',
      built: [
        'URL and article ingestion with Cheerio.',
        'Groq-hosted Llama generation of four platform-specific variants.',
        'One-click copy and real-time feedback in the interface.',
      ],
      limitations: ['Generated drafts should be reviewed before publishing.'],
    },
  },
  {
    slug: 'live-interviewer',
    name: 'Live Interviewer',
    tagline: 'Generates scenario-based interview questions for any role',
    summary:
      'A Next.js app that produces context-rich, scenario-driven interview questions for a given job role. It supports several model providers, recovers from API errors and installs as a PWA.',
    categories: ['ai', 'web'],
    featured: false,
    order: 10,
    status: 'Live web app',
    projectType: 'Independent project',
    role: 'Full-stack & AI engineer',
    liveUrl: 'https://liveinterviewer.vercel.app/',
    repo: { visibility: 'private' },
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Mistral', 'Groq', 'PWA'],
    highlights: ['Multi-model support (Mistral and Groq-hosted models)', 'API error recovery; installable PWA'],
    caseStudy: {
      problem: 'Interview preparation often relies on generic question lists that do not match the role.',
      users: 'Job seekers and interviewers preparing role-specific questions.',
      built: [
        'Role-specific, scenario-driven question generation.',
        'Support for several model providers, with recovery when an API call fails.',
        'Installable PWA.',
      ],
      limitations: ['Generated questions are a starting point and should be reviewed.'],
    },
  },
  {
    slug: 'serenity-ai',
    name: 'SerenityAI',
    tagline: 'AI wellness companion for reflection and mood tracking',
    summary:
      'A wellness companion that offers supportive conversation, mood tracking and journaling insights through agent-based workflows written in JacLang with Groq-hosted models.',
    categories: ['ai', 'web'],
    featured: false,
    order: 11,
    status: 'Live web app',
    projectType: 'Independent project',
    role: 'Full-stack & AI engineer',
    liveUrl: 'https://serenityai.qzz.io/',
    repo: { visibility: 'private' },
    techStack: ['React', 'TypeScript', 'JacLang', 'Groq'],
    highlights: ['Agent-based conversation, mood tracking and journaling insights'],
    caseStudy: {
      problem: 'People want low-friction ways to reflect on mood and wellbeing between other forms of support.',
      users: 'Adults looking for a reflective journaling and mood-tracking companion.',
      built: [
        'Supportive conversation powered by Groq-hosted models.',
        'Mood tracking, journaling insights and pattern analysis.',
        'Agent logic written in JacLang.',
      ],
      limitations: ['A wellness tool, not a substitute for professional mental-health care.'],
    },
  },
  {
    slug: 'codebase-genius',
    name: 'Codebase Genius',
    tagline: 'Generates documentation from a GitHub repository',
    summary:
      'Analyses a GitHub codebase with LLMs to draft documentation, and visualises the code structure as a graph.',
    categories: ['ai'],
    featured: false,
    order: 12,
    status: 'Live demo',
    projectType: 'Independent project',
    role: 'Full-stack & AI engineer',
    liveUrl: 'https://geniuscodebase.streamlit.app/',
    liveNote: 'Hosted on Streamlit Community Cloud; the app may need a moment to wake up.',
    repo: { visibility: 'public', url: 'https://github.com/rayklanderman/jaseci-proj' },
    techStack: ['Python', 'Google Gemini API', 'Streamlit', 'NetworkX', 'FastAPI', 'TypeScript'],
    highlights: ['LLM-generated documentation from repository analysis', 'Graph view of code structure with NetworkX'],
    caseStudy: {
      problem: 'Documentation for unfamiliar codebases is often missing or out of date.',
      users: 'Developers onboarding onto a new repository.',
      built: [
        'Repository analysis and LLM-drafted documentation with the Gemini API.',
        'Graph-based code-structure visualisation with NetworkX.',
        'Streamlit interface backed by FastAPI.',
      ],
      limitations: ['Generated documentation is a draft and should be reviewed against the code.'],
    },
  },
  {
    slug: 'kazi-connect',
    name: 'Kazi Connect',
    tagline: 'AI-assisted job matching for job seekers',
    summary:
      'A job marketplace that uses AI to match job seekers with suitable opportunities, with CV analysis, skill assessment, application tracking and personalised recommendations.',
    categories: ['web', 'ai'],
    featured: false,
    order: 13,
    status: 'Live web app',
    projectType: 'Independent project',
    role: 'Full-stack & AI engineer',
    liveUrl: 'https://kazi-connect.vercel.app/',
    repo: { visibility: 'private' },
    techStack: ['Next.js', 'TypeScript', 'Firebase', 'OpenAI', 'PWA'],
    highlights: ['CV analysis and personalised job recommendations', 'Application tracking; installable PWA'],
    caseStudy: {
      problem: 'Job seekers spend a lot of time finding roles that actually match their skills.',
      users: 'Job seekers in Kenya.',
      built: [
        'AI-assisted matching between candidate profiles and opportunities.',
        'CV analysis, skill assessment and application tracking.',
        'Next.js PWA with a Firebase backend.',
      ],
      limitations: ['Matching suggestions are recommendations, not hiring decisions.'],
    },
  },
];

export const sortedProjects = (): Project[] => [...PROJECTS].sort((a, b) => a.order - b.order);

export const featuredProjects = (): Project[] => sortedProjects().filter((p) => p.featured);

export const galleryProjects = (): Project[] => sortedProjects().filter((p) => !p.featured);

export const getProjectBySlug = (slug: string | undefined): Project | undefined =>
  slug ? PROJECTS.find((p) => p.slug === slug) : undefined;

export const projectPath = (slug: string): string => `/projects/${slug}`;

/** Previous/next navigation follows the display order. */
export const adjacentProjects = (slug: string): { prev?: Project; next?: Project } => {
  const list = sortedProjects();
  const index = list.findIndex((p) => p.slug === slug);
  if (index === -1) return {};
  return { prev: list[index - 1], next: list[index + 1] };
};

export const categoriesInUse = (projects: Project[]): ProjectCategory[] =>
  CATEGORY_ORDER.filter((c) => projects.some((p) => p.categories.includes(c)));

/** Repo URL suitable for a "View source" link; undefined unless the repo is public. */
export const publicRepoUrl = (project: Project): string | undefined =>
  project.repo.visibility === 'public' ? project.repo.url : undefined;
