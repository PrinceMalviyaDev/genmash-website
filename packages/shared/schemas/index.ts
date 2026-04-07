import { z } from 'zod';
import {
  PROJECT_TYPES,
  BUDGET_RANGES,
  TIMELINES,
  CONTACT_SUBJECTS,
  JOB_TYPES,
  JOB_LOCATIONS,
  BLOG_STATUSES,
  QUOTE_STATUSES,
  APPLICATION_STATUSES,
  ADMIN_ROLES,
} from '../constants';

// Contact form
export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.enum(CONTACT_SUBJECTS),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});
export type ContactFormData = z.infer<typeof contactSchema>;

// Quote request form
export const quoteSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(7, 'Enter a valid phone number'),
  company: z.string().optional(),
  projectType: z.enum(PROJECT_TYPES),
  projectSubtype: z.string().optional(),
  budgetRange: z.enum(BUDGET_RANGES),
  timeline: z.enum(TIMELINES),
  description: z.string().min(50, 'Please describe your project in at least 50 characters'),
  referenceLinks: z.string().optional(),
  ndaRequired: z.boolean().default(false),
  source: z.string().optional(),
});
export type QuoteFormData = z.infer<typeof quoteSchema>;

// Job application form
export const applicationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(7, 'Enter a valid phone number'),
  role: z.string().min(1, 'Please select a role'),
  experience: z.string().min(1, 'Please enter your experience'),
  portfolioUrl: z.string().url('Enter a valid URL').optional().or(z.literal('')),
  coverLetter: z.string().optional(),
});
export type ApplicationFormData = z.infer<typeof applicationSchema>;

// Newsletter subscription
export const subscriberSchema = z.object({
  email: z.string().email('Invalid email address'),
});
export type SubscriberFormData = z.infer<typeof subscriberSchema>;

// Admin login
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});
export type LoginFormData = z.infer<typeof loginSchema>;

// Project (admin)
export const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  clientName: z.string().min(1, 'Client name is required'),
  projectType: z.enum(PROJECT_TYPES),
  description: z.string().min(10, 'Description is required'),
  thumbnail: z.string().optional(),
  technologies: z.array(z.string()).min(1, 'At least one technology is required'),
  isVisible: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  order: z.number().default(0),
  caseStudy: z
    .object({
      overview: z.string().optional(),
      problem: z.string().optional(),
      solution: z.string().optional(),
      features: z.array(z.string()).optional(),
      architecture: z.string().optional(),
      screenshots: z.array(z.string()).optional(),
      results: z.string().optional(),
      metrics: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
      liveUrl: z.string().optional(),
      clientTestimonial: z.string().optional(),
    })
    .optional(),
});
export type ProjectFormData = z.infer<typeof projectSchema>;

// Blog post (admin)
export const blogPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  excerpt: z.string().min(10, 'Excerpt is required'),
  content: z.string().min(50, 'Content is too short'),
  featuredImage: z.string().optional(),
  author: z.object({
    name: z.string().min(1),
    avatar: z.string().optional(),
    bio: z.string().optional(),
  }),
  category: z.string().min(1, 'Category is required'),
  tags: z.array(z.string()).default([]),
  status: z.enum(BLOG_STATUSES).default('draft'),
  scheduledAt: z.string().optional(),
});
export type BlogPostFormData = z.infer<typeof blogPostSchema>;

// Service (admin)
export const serviceSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  icon: z.string().min(1, 'Icon is required'),
  shortDescription: z.string().min(10, 'Short description is required'),
  fullDescription: z.string().min(50, 'Full description is required'),
  technologies: z.array(z.string()).min(1),
  process: z
    .array(z.object({ step: z.number(), title: z.string(), description: z.string() }))
    .optional(),
  timeline: z.string().optional(),
  startingPrice: z.string().optional(),
  faqs: z.array(z.object({ question: z.string(), answer: z.string() })).optional(),
  isActive: z.boolean().default(true),
  order: z.number().default(0),
});
export type ServiceFormData = z.infer<typeof serviceSchema>;

// Testimonial (admin)
export const testimonialSchema = z.object({
  clientName: z.string().min(1, 'Client name is required'),
  company: z.string().min(1, 'Company is required'),
  companyLogo: z.string().optional(),
  designation: z.string().optional(),
  photo: z.string().optional(),
  review: z.string().min(10, 'Review is required'),
  rating: z.number().min(1).max(5),
  projectType: z.string().optional(),
  videoUrl: z.string().url().optional().or(z.literal('')),
  isFeatured: z.boolean().default(false),
  isVisible: z.boolean().default(true),
});
export type TestimonialFormData = z.infer<typeof testimonialSchema>;

// Job posting (admin)
export const jobPostingSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  department: z.string().min(1, 'Department is required'),
  location: z.enum(JOB_LOCATIONS),
  experienceLevel: z.string().min(1, 'Experience level is required'),
  jobType: z.enum(JOB_TYPES),
  description: z.string().min(50, 'Description is too short'),
  requirements: z.array(z.string()).min(1),
  responsibilities: z.array(z.string()).min(1),
  perks: z.array(z.string()).optional(),
  isActive: z.boolean().default(true),
});
export type JobPostingFormData = z.infer<typeof jobPostingSchema>;

// Pricing plan (admin)
export const pricingPlanSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  icon: z.string().optional(),
  targetAudience: z.string().min(1, 'Target audience is required'),
  startingPrice: z.string().min(1, 'Price is required'),
  features: z.array(z.object({ text: z.string(), included: z.boolean() })).min(1),
  timeline: z.string().optional(),
  isPopular: z.boolean().default(false),
  isActive: z.boolean().default(true),
  order: z.number().default(0),
});
export type PricingPlanFormData = z.infer<typeof pricingPlanSchema>;

// Team member (admin)
export const teamMemberSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.string().min(1, 'Role is required'),
  photo: z.string().optional(),
  bio: z.string().optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
  order: z.number().default(0),
  isVisible: z.boolean().default(true),
});
export type TeamMemberFormData = z.infer<typeof teamMemberSchema>;

// Client (admin)
export const clientSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  logo: z.string().optional(),
  industry: z.string().optional(),
  projectType: z.string().optional(),
  linkedProject: z.string().optional(),
  isVisible: z.boolean().default(true),
  order: z.number().default(0),
});
export type ClientFormData = z.infer<typeof clientSchema>;
