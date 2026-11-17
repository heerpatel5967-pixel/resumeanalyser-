export const DEMO_RESUME = {
  fileName: "Alexander_Chen_Senior_Engineer_Resume.pdf",
  fileSize: "248 KB",
  uploadedAt: "Today at 02:45 PM",
  applicantName: "Alexander Chen",
  targetRole: "Senior Frontend / Full Stack Engineer",
  atsScore: 84,
  matchRating: "High Match",
  extractedText: `ALEXANDER CHEN
San Francisco, CA • alex.chen@example.com • linkedin.com/in/alexchen • github.com/alexchen

PROFESSIONAL SUMMARY
Dynamic and results-driven Software Engineer with 5+ years of experience building scalable, high-performance web applications using React, TypeScript, Node.js, and modern cloud technologies. Passionate about micro-frontends, design systems, and web performance optimization with a proven record of enhancing UI responsiveness by 42%.

EXPERIENCE

Senior Frontend Engineer | TechSphere Innovations | Jan 2022 – Present
• Architected enterprise SaaS dashboard in React 18, Next.js, and Tailwind CSS serving 150K+ daily active users, improving page load speeds by 38%.
• Led a cross-functional squad of 6 engineers across sprint planning, PR reviews, and frontend CI/CD automation pipelines via GitHub Actions.
• Decreased bundle size by 45% through dynamic code-splitting, tree-shaking, and asset compression strategies.
• Spearheaded migration from monolithic state store to Zustand and TanStack Query, reducing unnecessary component re-renders by 60%.

Full Stack Developer | CloudNova Solutions | Jun 2019 – Dec 2021
• Built and maintained RESTful and GraphQL APIs using Node.js, Express, and PostgreSQL handling 2M+ monthly queries.
• Developed reusable component library compliant with WCAG 2.1 AA accessibility guidelines adopted across 4 internal product suites.
• Collaborated with product designers in Figma to translate complex interactive wireframes into pixel-perfect modular components.
• Integrated Stripe billing API and automated webhook handlers for subscriptions with 99.98% processing reliability.

EDUCATION
B.S. in Computer Science | University of California, Berkeley | 2015 – 2019
• Magna Cum Laude • Dean's Honors List • Chair of Web Development Club

TECHNICAL SKILLS
• Languages: TypeScript, JavaScript (ES6+), Python, HTML5, CSS3/SCSS, SQL
• Frameworks & Libraries: React, Next.js, Redux Toolkit, Zustand, Vue.js, Tailwind CSS, Node.js, Express
• Tools & Platforms: Docker, AWS (S3, CloudFront, Lambda), Git, Vite, Webpack, Jest, Cypress, Vercel
• Concepts: Micro-frontends, REST & GraphQL, CI/CD, Responsive Design, Web Vitals, Agile/Scrum`,
  scoreBreakdown: [
    { category: "Keyword Match", score: 88, max: 100, status: "Good", color: "#00D9FF" },
    { category: "ATS Formatting", score: 94, max: 100, status: "Excellent", color: "#10B981" },
    { category: "Quantifiable Impact", score: 72, max: 100, status: "Needs Improvement", color: "#F59E0B" },
    { category: "Skills Breadth", score: 82, max: 100, status: "Good", color: "#7357FF" },
  ],
  radarData: [
    { subject: "Keywords", A: 88, fullMark: 100 },
    { subject: "Formatting", A: 94, fullMark: 100 },
    { subject: "Impact Metrics", A: 72, fullMark: 100 },
    { subject: "Experience Flow", A: 85, fullMark: 100 },
    { subject: "Skills Match", A: 82, fullMark: 100 },
    { subject: "Brevity & Tone", A: 89, fullMark: 100 },
  ],
  trendData: [
    { version: "v1.0 (Initial)", score: 64 },
    { version: "v1.1 (+Metrics)", score: 71 },
    { version: "v1.2 (+Keywords)", score: 79 },
    { version: "v1.3 (Current)", score: 84 },
    { version: "Goal Target", score: 95 },
  ],
  detectedKeywords: [
    "React", "TypeScript", "Next.js", "Node.js", "Tailwind CSS", "Zustand",
    "GraphQL", "REST APIs", "Docker", "AWS", "CI/CD", "Web Vitals", "PostgreSQL"
  ],
  missingKeywords: [
    "Kubernetes", "NextAuth / OAuth2", "Redis Caching", "Microservices Architecture",
    "System Design", "Terraform", "Monitoring (Datadog/Sentry)"
  ],
  keyFindings: {
    strengths: [
      "Clear contact information and consistent standard headings that parse cleanly in ATS systems.",
      "Effective use of strong action verbs (Architected, Spearheaded, Decreased, Led).",
      "Excellent technical core stack alignment for Senior Frontend and Full Stack positions.",
      "Standard chronological work history with explicit start and end dates."
    ],
    improvements: [
      "CloudNova section lacks quantifiable revenue or user metric outcomes in bullet #3 and #4.",
      "Add 2-3 cloud orchestration keywords (e.g., Kubernetes or Docker Swarm) for senior infrastructure alignment.",
      "Include a brief certifications or continuous learning section if applicable (e.g. AWS Certified Developer)."
    ]
  }
};

export const RECENT_ANALYSES = [
  {
    id: "ana-101",
    fileName: "Alexander_Chen_Senior_Engineer_Resume.pdf",
    targetRole: "Senior Frontend Engineer",
    date: "14 Nov 2026",
    score: 84,
    status: "Completed",
    keywordsMatched: "18 / 24",
    badge: "Active",
  },
  {
    id: "ana-102",
    fileName: "Alex_Chen_FullStack_v2.docx",
    targetRole: "Full Stack Engineer",
    date: "10 Nov 2026",
    score: 79,
    status: "Completed",
    keywordsMatched: "16 / 24",
    badge: "Archived",
  },
  {
    id: "ana-103",
    fileName: "AlexChen_Product_Engineer_Draft.pdf",
    targetRole: "Frontend Lead",
    date: "04 Nov 2026",
    score: 71,
    status: "Needs Revision",
    keywordsMatched: "13 / 24",
    badge: "Archived",
  },
  {
    id: "ana-104",
    fileName: "Chen_Resume_Old_2025.pdf",
    targetRole: "Software Engineer II",
    date: "28 Oct 2026",
    score: 64,
    status: "Low Score",
    keywordsMatched: "11 / 24",
    badge: "Archived",
  }
];

export const CAREER_ROLES = [
  {
    id: "role-1",
    title: "Senior Frontend Engineer",
    department: "Product Engineering",
    matchScore: 92,
    demandLevel: "Very High",
    salaryRange: "$150,000 – $195,000",
    description: "Build robust, customer-facing client architectures, state management systems, and high-performance web components.",
    skillsRequired: ["React", "TypeScript", "Next.js", "State Architecture", "Web Performance", "Testing"],
    skillsMatched: ["React", "TypeScript", "Next.js", "Web Performance"],
    missingSkills: ["Microservices", "Playwright E2E"],
    marketTrend: "+24% YoY Openings",
    difficulty: "Moderate",
  },
  {
    id: "role-2",
    title: "Full Stack AI Application Engineer",
    department: "AI & Innovation Labs",
    matchScore: 86,
    demandLevel: "Explosive Demand",
    salaryRange: "$165,000 – $215,000",
    description: "Bridge generative AI models, vector stores, and modern frontend interfaces to create intuitive AI copilot workflows.",
    skillsRequired: ["React", "Node.js", "Python", "Vector Databases", "LangChain/LlamaIndex", "OpenAI / Claude APIs"],
    skillsMatched: ["React", "Node.js", "Python"],
    missingSkills: ["Vector Databases (Pinecone)", "RAG Architectures", "LangChain"],
    marketTrend: "+58% YoY Openings",
    difficulty: "High",
  },
  {
    id: "role-3",
    title: "Frontend Architect & Design Systems Lead",
    department: "Core Platform",
    matchScore: 78,
    demandLevel: "High",
    salaryRange: "$175,000 – $220,000",
    description: "Own the organization-wide component library, accessibility guidelines, CI/CD package deployment, and DX tooling.",
    skillsRequired: ["Figma Tokens", "Storybook", "Accessibility (a11y)", "Monorepos (Turborepo)", "Rollup/Vite"],
    skillsMatched: ["Storybook", "Accessibility (a11y)", "Vite"],
    missingSkills: ["Turborepo Monorepos", "Design Token Automation", "Changesets"],
    marketTrend: "+18% YoY Openings",
    difficulty: "High",
  },
  {
    id: "role-4",
    title: "Engineering Manager / Tech Lead",
    department: "Engineering Leadership",
    matchScore: 71,
    demandLevel: "Moderate",
    salaryRange: "$190,000 – $240,000",
    description: "Lead technical roadmap, mentor mid-level developers, collaborate with PMs, and drive agile delivery sprints.",
    skillsRequired: ["Technical Strategy", "Mentorship", "Agile/Scrum", "Resource Planning", "Cross-team Alignment"],
    skillsMatched: ["Mentorship", "Agile/Scrum"],
    missingSkills: ["Performance Reviews", "Budget Management", "Executive Stakeholder Comms"],
    marketTrend: "+12% YoY Openings",
    difficulty: "Very High",
  }
];

export const SKILL_GAPS = [
  {
    skill: "AI Integration & RAG Workflows",
    category: "Emerging Tech",
    priority: "High",
    targetScore: 90,
    currentLevel: 45,
    estimatedTimeToLearn: "3 - 4 weeks",
    recommendedCourse: "Building GenAI Apps with LangChain & Vector Embeddings",
    impact: "+14% Potential Salary Boost",
  },
  {
    skill: "Kubernetes & Cloud Orchestration",
    category: "DevOps & Cloud",
    priority: "Medium",
    targetScore: 85,
    currentLevel: 30,
    estimatedTimeToLearn: "2 - 3 weeks",
    recommendedCourse: "CKAD: Certified Kubernetes Application Developer",
    impact: "+10% Candidate Filter Passing",
  },
  {
    skill: "Advanced End-to-End Testing (Playwright)",
    category: "Quality Assurance",
    priority: "Medium",
    targetScore: 95,
    currentLevel: 60,
    estimatedTimeToLearn: "1 - 2 weeks",
    recommendedCourse: "Playwright Automation Mastery with CI Integration",
    impact: "+8% ATS Technical Verification",
  },
  {
    skill: "Micro-frontends & Monorepo Tooling",
    category: "Architecture",
    priority: "High",
    targetScore: 90,
    currentLevel: 55,
    estimatedTimeToLearn: "2 weeks",
    recommendedCourse: "Turborepo & Module Federation in Production",
    impact: "+12% Senior Role Match",
  }
];

export const RESUME_IMPROVEMENTS = [
  {
    id: "imp-1",
    category: "Impact & Quantifiable Metrics",
    section: "Work Experience – TechSphere Innovations",
    issue: "One of your bullet points describes responsibilities without showing business or customer impact.",
    beforeText: "Responsible for managing dashboard components and fixing frontend bugs reported by users in Jira.",
    afterText: "Resolved 90+ critical frontend issues and redesigned core dashboard components, lowering customer churn by 14% and raising CSAT from 3.8 to 4.7/5.",
    impactScore: "+8 ATS Points",
    tag: "High Impact",
    explanation: "Recruiters and ATS algorithms prioritize quantifiable results (%, numbers, currency, time saved) over passive task descriptions.",
    applied: false
  },
  {
    id: "imp-2",
    category: "Action Verbs & Brevity",
    section: "Work Experience – CloudNova Solutions",
    issue: "Weak opening phrase 'Assisted team with' diminishes your engineering ownership.",
    beforeText: "Assisted senior developers with building backend endpoints and helped integrate the payment system.",
    afterText: "Engineered 12 secure RESTful endpoints in Node.js and integrated Stripe webhook workflows, processing $450K+ in monthly customer transactions with zero downtime.",
    impactScore: "+6 ATS Points",
    tag: "Ownership",
    explanation: "Replace passive phrases like 'Assisted with' or 'Helped with' with active engineering verbs such as 'Engineered', 'Architected', or 'Spearheaded'.",
    applied: false
  },
  {
    id: "imp-3",
    category: "Tech Stack & Keyword Density",
    section: "Technical Skills Section",
    issue: "Technical skills are listed without context regarding testing frameworks and cloud deployment.",
    beforeText: "Skills: JavaScript, React, CSS, Node, AWS, Git",
    afterText: "Core Stack: TypeScript, React 18, Next.js, Node.js, Zustand • Testing: Jest, Cypress, React Testing Library • Cloud/DevOps: AWS (S3, CloudFront), Docker, CI/CD Actions",
    impactScore: "+5 ATS Points",
    tag: "Keywords",
    explanation: "Categorizing your skills into clean taxonomy clusters improves ATS parsing accuracy by up to 35% compared to comma-separated blocks.",
    applied: false
  },
  {
    id: "imp-4",
    category: "Executive Summary Polish",
    section: "Professional Summary",
    issue: "Current summary is a generic statement that doesn't highlight your specialized domain strength.",
    beforeText: "Hardworking software engineer looking for a challenging role in a fast-paced environment where I can grow my skills.",
    afterText: "Results-driven Senior Frontend Engineer with 5+ years of experience architecting high-traffic React/Next.js SaaS applications, reducing load times by 38% for 150K+ DAU.",
    impactScore: "+7 ATS Points",
    tag: "First Impression",
    explanation: "ATS and human hiring managers scan the top 3 inches in 6 seconds. Lead with years of experience, core stack, and standout metric accomplishments.",
    applied: false
  }
];

export const INTERVIEW_QUESTIONS = [
  {
    id: "q-1",
    category: "Technical",
    role: "Senior Frontend Engineer",
    difficulty: "Advanced",
    question: "How would you diagnose and optimize a React web application suffering from severe frame drops and sluggish re-renders during high-frequency user interactions?",
    overview: "Tests understanding of React reconciliation, React Profiler, virtualization, memoization, and browser rendering pipeline.",
    starAnswer: {
      situation: "In our SaaS telemetry dashboard, charts and tabular lists lagged noticeably whenever real-time websocket packets arrived (50 updates/sec).",
      task: "Identify the root cause of render bottlenecks and maintain steady 60 FPS without dropping incoming data points.",
      action: "Used Chrome DevTools Performance panel and React DevTools Profiler to identify deep component subtrees re-rendering unnecessarily. Implemented TanStack Virtual for long datasets, throttled socket emissions with RxJS, and moved high-frequency state slices into un-proxied Zustand stores outside the main React render loop.",
      result: "Reduced average frame render time from 48ms down to 8ms, completely eliminated UI freezing, and lowered CPU usage by 55%."
    },
    keyTips: [
      "Mention specific diagnostic tools (React DevTools Profiler, Chrome Performance Tab, Lighthouse).",
      "Differentiate between memoization (useMemo/useCallback) and structural optimization (virtualization, debouncing).",
      "Mention real-world metrics like FPS or frame time."
    ]
  },
  {
    id: "q-2",
    category: "Technical",
    role: "Full Stack Engineer",
    difficulty: "Intermediate",
    question: "Explain the difference between Optimistic UI updates and Pessimistic UI updates. When would you choose one over the other?",
    overview: "Assesses architecture decision-making, user experience sensibility, and error rollback strategies in client-server apps.",
    starAnswer: {
      situation: "Users reported noticeable delays when clicking 'Like', 'Bookmark', or 'Mark as Read' due to 350ms backend latency.",
      task: "Improve perceived responsiveness while preventing state desynchronization in case of network drops.",
      action: "Implemented optimistic mutations via TanStack Query: immediately updating client cache and visual state on button click, while keeping a rollback snapshot. If the server response failed or timed out, the cache rolled back automatically with a non-intrusive toast notification.",
      result: "Perceived interaction latency dropped from 350ms to 0ms (instantaneous), increasing daily user engagement by 22%."
    },
    keyTips: [
      "Emphasize the rollback mechanism: an optimistic UI without rollback is a bug in the making.",
      "Identify operations unsuitable for optimistic UI (e.g. credit card charging, deleting sensitive records)."
    ]
  },
  {
    id: "q-3",
    category: "Behavioral / HR",
    role: "All Engineering Roles",
    difficulty: "Intermediate",
    question: "Describe a situation where you had a strong technical disagreement with a peer or team lead about an architecture choice. How did you resolve it?",
    overview: "Evaluates emotional intelligence, data-driven reasoning, collaborative attitude, and ability to disagree and commit.",
    starAnswer: {
      situation: "During our dashboard v2 rewrite, a lead architect pushed to adopt a complex Redux-Saga workflow, whereas I advocated for a lightweight Zustand + React Query setup.",
      task: "Align the engineering squad without causing friction, project delays, or unnecessary codebase bloat.",
      action: "Rather than debating in Slack, I built two minimal proof-of-concept prototypes solving our core dashboard use cases. I measured bundle size, boilerplate lines of code, and onboarding ramp-up time for junior devs, then presented the data objectively in our tech RFC forum.",
      result: "The team unanimously agreed that the lightweight stack met all async caching needs while saving 30% dev hours. The lead thanked me for providing concrete data rather than opinion."
    },
    keyTips: [
      "Never speak negatively about colleagues; frame differences around business and developer goals.",
      "Highlight data, benchmarks, or prototypes as the conflict resolution medium.",
      "Showcase respect for leadership and willingness to commit once a decision is made."
    ]
  },
  {
    id: "q-4",
    category: "Project-Based",
    role: "System & Architecture",
    difficulty: "Advanced",
    question: "Walk me through the most technically challenging bug or incident you resolved in production. What was the post-mortem outcome?",
    overview: "Gauges composure under pressure, root cause analysis capability, and systemic prevention methodology.",
    starAnswer: {
      situation: "On Black Friday peak traffic, our checkout page began sporadically freezing on mobile Safari browsers, triggering abandoned carts.",
      task: "Quickly mitigate customer impact, isolate the intermittent crash condition, and deploy a permanent fix under tight deadlines.",
      action: "Analyzed Sentry error spikes and isolated a memory leak occurring when recursive SVG animated icons re-rendered inside sticky table headers. I rolled back the decorative SVG component via feature flag within 15 minutes, reproduced the bug in a local WebKit environment, fixed the unmounted listener leak, and added automated Safari tests in CI.",
      result: "Checkout crash rate fell back to 0.01% within 20 minutes, safeguarding an estimated $180,000 in peak sales. Documented the root cause in an incident post-mortem shared company-wide."
    },
    keyTips: [
      "Highlight production triage speed (e.g., feature flag rollback first, debug second).",
      "Describe how you reproduced an elusive bug in a local test bed.",
      "Conclude with long-term prevention (CI tests, monitoring, post-mortem)."
    ]
  }
];
