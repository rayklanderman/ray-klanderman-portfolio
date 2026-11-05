/**
 * Grouped technical skills. Only list tools demonstrated in the project registry,
 * training records or verifiable credentials.
 */

export interface ExpertiseGroup {
  id: string;
  title: string;
  description: string;
  skills: string[];
}

export const EXPERTISE: ExpertiseGroup[] = [
  {
    id: 'ai-ml',
    title: 'Applied AI & Machine Learning',
    description: 'LLM applications, agents, multimodal models and classical ML, measured against clear metrics.',
    skills: [
      'LLM APIs (Groq, Mistral, OpenRouter, Gemini)',
      'Multimodal & vision models',
      'Agent orchestration (Vertex AI ADK, multi-agent pipelines)',
      'Retrieval-grounded generation with citations',
      'Structured outputs',
      'OCR (Google ML Kit, Mistral OCR)',
      'Recommender systems (SVD)',
      'Gradient boosting (LightGBM)',
      'Feature engineering',
      'Model evaluation (RMSE)',
    ],
  },
  {
    id: 'engineering',
    title: 'Software Engineering',
    description: 'Typed, tested web and mobile applications with server-side APIs.',
    skills: [
      'Python',
      'TypeScript',
      'JavaScript',
      'Dart',
      'React',
      'Next.js',
      'FastAPI',
      'Flutter',
      'Riverpod',
      'Streamlit',
      'REST APIs & webhooks',
      'Progressive Web Apps',
    ],
  },
  {
    id: 'data-cloud',
    title: 'Data & Cloud',
    description: 'Relational data, analytics and managed cloud platforms.',
    skills: [
      'SQL',
      'PostgreSQL',
      'Supabase',
      'Redis',
      'Pandas',
      'NumPy',
      'Power BI',
      'Tableau',
      'Google Cloud (Cloud Run, Vertex AI)',
      'Vercel',
      'Cloudflare Workers',
      'Kubernetes fundamentals (KCNA)',
    ],
  },
  {
    id: 'quality',
    title: 'Reliability & Responsible AI',
    description: 'The practices that make AI features safe to put in front of people.',
    skills: [
      'Automated testing (Vitest, Flutter tests)',
      'CI gates: type check, lint, test, build',
      'Row Level Security & access control',
      'Consent flows & data retention',
      'PII scrubbing',
      'Rate limits & budget caps',
      'Human-in-the-loop review',
      'Safety guardrails & escalation',
      'Accessibility (TalkBack, WCAG)',
    ],
  },
];
