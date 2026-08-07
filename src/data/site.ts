/** Single source of truth for identity, links, and the stack table. */

export const site = {
  name: 'Kyle Stuart',
  role: 'Manager, Analytics & AI Engineering',
  location: 'Metro-Atlanta, GA, USA',
  email: 'kstuart1992@gmail.com',
  linkedin: 'https://www.linkedin.com/in/kyle-stuart-va117/',
  github: 'https://github.com/Kstuart1992',
  resume: '/kyle-stuart-resume.pdf',
  url: 'https://kstuart1992.github.io',
  description:
    'Kyle Stuart builds and leads analytics and AI engineering teams — warehouse architecture on Snowflake and Databricks, transformation with dbt, and multi-agent AI systems in production.',
} as const;

export type StackGroup = {
  title: string;
  items: { name: string; yrs?: string }[];
};

export const stack: StackGroup[] = [
  {
    title: 'Warehouse & Lakehouse',
    items: [
      { name: 'Snowflake' },
      { name: 'Databricks', yrs: '4y' },
      { name: 'Microsoft Fabric', yrs: '2y' },
      { name: 'SQL Server / RDBMS', yrs: '10y+' },
      { name: 'Delta Lake' },
    ],
  },
  {
    title: 'Transformation',
    items: [
      { name: 'dbt', yrs: '2y' },
      { name: 'SQL', yrs: '10y+' },
      { name: 'PySpark', yrs: '5y' },
      { name: 'Azure Data Factory' },
      { name: 'Python', yrs: '5y' },
    ],
  },
  {
    title: 'Semantic & BI',
    items: [
      { name: 'Power BI', yrs: '10y+' },
      { name: 'DAX', yrs: '10y+' },
      { name: 'Databricks Genie' },
      { name: 'Tabular / semantic modeling' },
    ],
  },
  {
    title: 'AI Engineering',
    items: [
      { name: 'Microsoft AI Foundry' },
      { name: 'Copilot Studio' },
      { name: 'Agent Bricks', yrs: '1y' },
      { name: 'Multi-agent orchestration' },
      { name: 'RAG & retrieval design' },
    ],
  },
  {
    title: 'Cloud & Platform',
    items: [
      { name: 'Azure', yrs: '8y' },
      { name: 'GCP', yrs: '8y' },
      { name: 'Power Platform', yrs: '3y' },
      { name: 'MDM', yrs: '1y' },
      { name: 'SAP', yrs: '2y' },
    ],
  },
  {
    title: 'Delivery & Code',
    items: [
      { name: 'Git / CI-CD' },
      { name: 'YAML', yrs: '3y' },
      { name: 'TypeScript / React', yrs: '3y' },
      { name: 'R', yrs: '5y' },
      { name: 'Agile & SDLC' },
    ],
  },
];

export const domains = [
  'Automotive & Fleet Management',
  'Supply Chain & Logistics',
  'Insurance',
  'Pharmaceutical & Health Care',
  'Redistribution',
  'Business Finance & FP&A',
  'Business Strategy & OPEX',
  'Human Behavior',
];

export type Role = {
  title: string;
  org: string;
  when: string;
  where: string;
  bullets: string[];
};

export const experience: Role[] = [
  {
    title: 'Project Lead — Analytics & AI Engineering',
    org: 'Holman Enterprises',
    when: '2022 — Present',
    where: 'New Jersey · Remote',
    bullets: [
      'Built and lead the Analytics Engineering (13 reports) and AI Engineering (3 reports) teams from the ground up, establishing standards, development frameworks, and delivery practices.',
      'Architected a self-service data strategy on dbt, Databricks, and Power BI — modeled layers, contracts, and tests that let business teams serve themselves.',
      'Designed and implemented multi-agent architectures on Microsoft AI Foundry, Copilot Studio, and Databricks.',
      'Partner with executive stakeholders to align analytics and AI strategy with business transformation objectives.',
    ],
  },
  {
    title: 'Analytics & Cloud Consulting',
    org: 'Freelance / Self-Employed',
    when: '2019 — 2022',
    where: 'New Jersey · Hybrid',
    bullets: [
      'Designed and deployed Azure-based data platforms and cloud applications for small and mid-sized organizations.',
      'Planned and built analytics models using SQL Server, Power BI, and Azure Data Factory.',
      'Delivered end-to-end digital strategy and implementation consulting.',
    ],
  },
  {
    title: 'Operations Analyst',
    org: 'Northwood Insurance Corp',
    when: '2015 — 2018',
    where: 'New York · Remote',
    bullets: [
      'Performed operational and financial modeling and reporting across multiple business units.',
      'Developed reporting frameworks in Excel, Power BI, and SQL supporting strategic decisions, risk evaluation, and fraud detection.',
      'Worked with leadership to translate analytics findings into operational improvements.',
    ],
  },
  {
    title: 'Psychological Operations Specialist (37F)',
    org: 'US Army',
    when: '2009 — 2015',
    where: '',
    bullets: [
      'Conducted information and behavioral analysis operations supporting military objectives.',
      'Applied data analysis, behavioral research, and strategic communication techniques.',
      'Led and collaborated within high-pressure operational environments requiring rapid decision-making.',
    ],
  },
];

export const education = [
  {
    degree: 'Master of Professional Studies',
    field: 'Data Science & Applied Statistics',
    school: 'Cornell University',
    year: '2021',
  },
  {
    degree: 'Bachelor of Applied Science',
    field: 'Computer Science',
    school: 'Rowan University',
    year: '2014',
  },
];
