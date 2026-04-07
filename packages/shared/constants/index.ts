export const PROJECT_TYPES = [
  'web',
  'mobile',
  'ai',
  'automation',
  'game',
  'desktop',
] as const;

export const BUDGET_RANGES = [
  'Under $1,000',
  '$1,000 - $5,000',
  '$5,000 - $15,000',
  '$15,000 - $50,000',
  '$50,000+',
] as const;

export const TIMELINES = [
  'ASAP',
  '1-3 months',
  '3-6 months',
  '6+ months',
  'Flexible',
] as const;

export const JOB_TYPES = [
  'full-time',
  'part-time',
  'contract',
  'internship',
] as const;

export const JOB_LOCATIONS = ['remote', 'indore', 'hybrid'] as const;

export const QUOTE_STATUSES = [
  'new',
  'in_review',
  'quoted',
  'won',
  'lost',
] as const;

export const APPLICATION_STATUSES = [
  'new',
  'reviewing',
  'shortlisted',
  'rejected',
  'hired',
] as const;

export const BLOG_STATUSES = ['draft', 'published', 'scheduled'] as const;

export const ADMIN_ROLES = ['super_admin', 'editor', 'viewer'] as const;

export const CONTACT_SUBJECTS = [
  'General Inquiry',
  'Project Discussion',
  'Support',
  'Partnership',
  'Other',
] as const;

export const SERVICES_LIST = [
  { title: 'Website Development', slug: 'website-development', icon: 'Globe' },
  { title: 'Website Maintenance', slug: 'website-maintenance', icon: 'Wrench' },
  { title: 'Website Renovation', slug: 'website-renovation', icon: 'RefreshCw' },
  { title: 'Mobile App Development', slug: 'mobile-app-development', icon: 'Smartphone' },
  { title: 'AI/ML Development', slug: 'ai-ml-development', icon: 'Brain' },
  { title: 'AI Agents & Automation', slug: 'ai-agents-automation', icon: 'Bot' },
  { title: 'Chatbot Development', slug: 'chatbot-development', icon: 'MessageSquare' },
  { title: 'Game Development', slug: 'game-development', icon: 'Gamepad2' },
  { title: 'Desktop Applications', slug: 'desktop-applications', icon: 'Monitor' },
  { title: 'Enterprise Software', slug: 'enterprise-software', icon: 'Building2' },
  { title: 'Cloud & DevOps', slug: 'cloud-devops', icon: 'Cloud' },
  { title: 'UI/UX Design', slug: 'ui-ux-design', icon: 'Palette' },
  { title: 'API Development', slug: 'api-development', icon: 'Code' },
] as const;

export const TECH_CATEGORIES = [
  {
    name: 'Frontend Development',
    technologies: ['React', 'Next.js', 'Vue.js', 'Angular', 'Tailwind CSS', 'TypeScript'],
  },
  {
    name: 'Backend Development',
    technologies: ['Node.js', 'Express.js', 'Python', 'Django', 'FastAPI', 'NestJS'],
  },
  {
    name: 'Mobile Development',
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
  },
  {
    name: 'AI / Machine Learning',
    technologies: ['TensorFlow', 'PyTorch', 'OpenAI', 'LangChain', 'Hugging Face'],
  },
  {
    name: 'Automation & AI Agents',
    technologies: ['n8n', 'LangGraph', 'CrewAI', 'Zapier'],
  },
  {
    name: 'Cloud & DevOps',
    technologies: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'GitHub Actions', 'Vercel'],
  },
  {
    name: 'Databases',
    technologies: ['MongoDB', 'PostgreSQL', 'Redis', 'Firebase', 'MySQL'],
  },
  {
    name: 'Game Development',
    technologies: ['Unity', 'Unreal Engine', 'Godot'],
  },
] as const;

export const COMPANY_STATS = [
  { label: 'Projects Completed', value: 100, suffix: '+' },
  { label: 'Happy Clients', value: 50, suffix: '+' },
  { label: 'Years Experience', value: 5, suffix: '+' },
  { label: 'Technologies', value: 30, suffix: '+' },
] as const;

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Technologies', href: '/technologies' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
] as const;
