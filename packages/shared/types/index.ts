import type {
  PROJECT_TYPES,
  BUDGET_RANGES,
  TIMELINES,
  JOB_TYPES,
  JOB_LOCATIONS,
  QUOTE_STATUSES,
  APPLICATION_STATUSES,
  BLOG_STATUSES,
  ADMIN_ROLES,
  CONTACT_SUBJECTS,
} from '../constants';

export type ProjectType = (typeof PROJECT_TYPES)[number];
export type BudgetRange = (typeof BUDGET_RANGES)[number];
export type Timeline = (typeof TIMELINES)[number];
export type JobType = (typeof JOB_TYPES)[number];
export type JobLocation = (typeof JOB_LOCATIONS)[number];
export type QuoteStatus = (typeof QUOTE_STATUSES)[number];
export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];
export type BlogStatus = (typeof BLOG_STATUSES)[number];
export type AdminRole = (typeof ADMIN_ROLES)[number];
export type ContactSubject = (typeof CONTACT_SUBJECTS)[number];

export interface IProject {
  _id: string;
  title: string;
  slug: string;
  clientName: string;
  projectType: ProjectType;
  description: string;
  thumbnail: string;
  technologies: string[];
  isVisible: boolean;
  isFeatured: boolean;
  order: number;
  caseStudy?: ICaseStudy;
  createdAt: string;
  updatedAt: string;
}

export interface ICaseStudy {
  overview: string;
  problem: string;
  solution: string;
  features: string[];
  architecture: string;
  screenshots: string[];
  results: string;
  metrics: { label: string; value: string }[];
  liveUrl: string;
  clientTestimonial: string;
}

export interface IService {
  _id: string;
  title: string;
  slug: string;
  icon: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  process: { step: number; title: string; description: string }[];
  timeline: string;
  startingPrice: string;
  faqs: { question: string; answer: string }[];
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface IBlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  category: string;
  tags: string[];
  status: BlogStatus;
  publishedAt: string;
  scheduledAt?: string;
  readTime: number;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface ITestimonial {
  _id: string;
  clientName: string;
  company: string;
  companyLogo: string;
  designation: string;
  photo: string;
  review: string;
  rating: number;
  projectType: string;
  videoUrl?: string;
  isFeatured: boolean;
  isVisible: boolean;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface IClient {
  _id: string;
  name: string;
  logo: string;
  industry: string;
  projectType: string;
  linkedProject?: string;
  isVisible: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface IPricingPlan {
  _id: string;
  name: string;
  icon: string;
  targetAudience: string;
  startingPrice: string;
  features: { text: string; included: boolean }[];
  timeline: string;
  isPopular: boolean;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface ITeamMember {
  _id: string;
  name: string;
  role: string;
  photo: string;
  bio: string;
  linkedin: string;
  github: string;
  order: number;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IJobPosting {
  _id: string;
  title: string;
  slug: string;
  department: string;
  location: JobLocation;
  experienceLevel: string;
  jobType: JobType;
  description: string;
  requirements: string[];
  responsibilities: string[];
  perks: string[];
  isActive: boolean;
  postedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface IApplication {
  _id: string;
  jobPosting: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  experience: string;
  portfolioUrl: string;
  resume: string;
  coverLetter: string;
  status: ApplicationStatus;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface IContactMessage {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  isRead: boolean;
  repliedAt?: string;
  createdAt: string;
}

export interface IQuoteRequest {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  projectSubtype: string;
  budgetRange: string;
  timeline: string;
  description: string;
  referenceLinks: string;
  attachment: string;
  ndaRequired: boolean;
  source: string;
  status: QuoteStatus;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface ISiteSettings {
  _id: string;
  companyName: string;
  tagline: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  googleMapsEmbed: string;
  socialLinks: {
    linkedin: string;
    github: string;
    twitter: string;
    instagram: string;
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    ogImage: string;
  };
  officeHours: string;
  updatedAt: string;
}

export interface IPaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface IApiResponse<T> {
  success: boolean;
  data: T;
}

export interface IApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown[];
  };
}
