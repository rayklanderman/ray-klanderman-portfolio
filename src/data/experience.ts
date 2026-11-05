/**
 * Professional history. Roles and training are kept in separate lists so that
 * programmes are never presented as salaried employment. Dates are as reconciled
 * with the owner; do not extend them without evidence.
 */

export interface ExperienceEntry {
  id: string;
  title: string;
  organisation: string;
  /** Nature of the engagement, e.g. "Contract". Omitted when not confirmed. */
  engagement?: string;
  period: string;
  location?: string;
  summary?: string;
  highlights?: string[];
  /** Slugs of related projects in the project registry. */
  relatedProjects?: string[];
}

export const ROLES: ExperienceEntry[] = [
  {
    id: 'devray',
    title: 'Software and AI Engineer',
    organisation: 'DevRay / AIHealth Labs',
    engagement: 'Freelance / independent',
    period: '2024 – Present',
    location: 'Nairobi, Kenya',
    summary:
      'I design, build and run my own AI and software products, from data model and backend to interface, testing and deployment.',
    highlights: [
      'Founder and lead engineer of AI Health Chat, a multilingual health-information assistant in public beta.',
      'Built web, mobile and multi-agent systems including TutaLearn, Sauti Mtaani Nairobi, EyeSense and Luminae.',
    ],
    relatedProjects: ['ai-health-chat', 'tutalearn', 'sauti-mtaani-nairobi', 'eyesense', 'luminae'],
  },
  {
    id: 'pap',
    title: 'Media Specialist',
    organisation: 'Pan-African Parliament',
    engagement: 'Contract',
    period: '2025',
    location: 'Midrand, South Africa',
  },
  {
    id: 'nwr',
    title: 'Digital Media Specialist',
    organisation: 'Office of the Nairobi Woman Representative',
    period: '2017 – 2024',
    location: 'Nairobi, Kenya',
  },
];

export const TRAINING: ExperienceEntry[] = [
  {
    id: 'alx',
    title: 'Data Science Apprenticeship',
    organisation: 'ALX Africa',
    engagement: 'Training programme',
    period: '2025 – 2026',
    summary:
      'Practical training and project work in Python, SQL, machine learning, analytics and model evaluation.',
    highlights: [
      'Programme highlight: built a hybrid recommender (LightGBM on SVD matrix factorisation, 10M ratings) reaching a public-leaderboard RMSE of 0.82 in a community prediction competition.',
    ],
    relatedProjects: ['movie-recommendation'],
  },
  {
    id: 'plp',
    title: 'Software Development Training',
    organisation: 'Power Learn Project',
    engagement: 'Training programme',
    period: '2024',
    summary: '16-week programme covering Python, web development, databases and Dart/Flutter.',
    highlights: [
      '1st place at the Class of 2024 graduate hackathon with the AI health assistant that grew into AI Health Chat.',
    ],
    relatedProjects: ['ai-health-chat'],
  },
];
