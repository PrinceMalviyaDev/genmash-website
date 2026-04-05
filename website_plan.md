# GenMash Software Solutions -- Website Technical Plan

> **Version:** 1.0  
> **Created:** 2026-04-05  
> **Based on:** improved_features.md  

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Tech Stack Decision](#2-tech-stack-decisions)
3. [Folder Structure](#3-folder-structure)
4. [Database Design](#4-database-design)
5. [API Design](#5-api-design)
6. [Frontend Architecture](#6-frontend-architecture)
7. [Admin Panel Architecture](#7-admin-panel-architecture)
8. [Authentication & Authorization](#8-authentication--authorization)
9. [File Upload Strategy](#9-file-upload-strategy)
10. [Email & Notification System](#10-email--notification-system)
11. [SEO Strategy](#11-seo-strategy)
12. [Performance Strategy](#12-performance-strategy)
13. [Security Plan](#13-security-plan)
14. [Deployment Architecture](#14-deployment-architecture)
15. [Development Phases](#15-development-phases)
16. [Testing Strategy](#16-testing-strategy)
17. [Monitoring & Maintenance](#17-monitoring--maintenance)

---

## 1. Architecture Overview

### System Architecture

```
                    +------------------+
                    |   Cloudflare     |
                    |   CDN + DNS      |
                    +--------+---------+
                             |
              +--------------+--------------+
              |                             |
    +---------v---------+     +-------------v-----------+
    |   Next.js App     |     |   Express.js API        |
    |   (Vercel)        |     |   (Render/Railway)      |
    |                   |     |                         |
    |  - Public Pages   |     |  - REST API             |
    |  - Admin Panel    |     |  - Auth (JWT)           |
    |  - SSR/SSG        |     |  - File Upload          |
    |  - API Routes*    |     |  - Email Service        |
    +---------+---------+     +-----+----------+--------+
              |                     |          |
              |               +----v----+  +--v---------+
              |               | MongoDB |  | Cloudinary |
              |               | Atlas   |  | (Storage)  |
              |               +---------+  +------------+
              |
     +--------v--------+
     | Google Services  |
     | - Analytics      |
     | - reCAPTCHA      |
     | - Maps           |
     +------------------+
```

### Architecture Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Rendering | Next.js (SSG + SSR) | SEO-critical marketing site; SSG for static pages, SSR for dynamic content |
| API | Separate Express server | Decoupled backend allows independent scaling; admin API shouldn't be on Vercel edge |
| Database | MongoDB Atlas | Flexible schema fits CMS-like content; managed hosting reduces ops burden |
| Frontend hosting | Vercel | Zero-config Next.js deployment, edge CDN, preview deployments |
| Backend hosting | Render | Free tier for low-traffic API, easy deploy from GitHub |
| Storage | Cloudinary | Image optimization built-in (resize, format, CDN), generous free tier |

---

## 2. Tech Stack Decisions

### Frontend

| Tool | Version | Purpose |
|------|---------|---------|
| Next.js | 14.x (App Router) | Framework -- SSR, SSG, routing, API routes |
| TypeScript | 5.x | Type safety across the codebase |
| Tailwind CSS | 3.x | Utility-first styling |
| Framer Motion | 11.x | Animations (hero, scroll reveals, page transitions) |
| React Hook Form | 7.x | Form state management |
| Zod | 3.x | Schema validation (shared with backend) |
| Lucide React | latest | Icon library |
| Swiper | 11.x | Testimonials/portfolio carousel |
| next-seo | latest | SEO meta tag management |
| Tiptap | 2.x | Rich text editor (admin blog/case study editing) |

### Backend

| Tool | Version | Purpose |
|------|---------|---------|
| Node.js | 20 LTS | Runtime |
| Express.js | 4.x | HTTP framework |
| TypeScript | 5.x | Type safety |
| Mongoose | 8.x | MongoDB ODM |
| jsonwebtoken | 9.x | JWT auth tokens |
| bcryptjs | 2.x | Password hashing |
| Nodemailer | 6.x | Email sending |
| Multer | 1.x | Multipart file parsing |
| cloudinary | 2.x | Image upload and transformation |
| express-rate-limit | 7.x | API rate limiting |
| helmet | 7.x | Security headers |
| cors | 2.x | CORS configuration |
| zod | 3.x | Request validation |
| morgan | 1.x | HTTP request logging |

---

## 3. Folder Structure

### Monorepo Structure

```
genmash/
+-- packages/
|   +-- shared/                    # Shared code between frontend and backend
|       +-- schemas/               # Zod validation schemas
|       |   +-- contact.ts
|       |   +-- quote.ts
|       |   +-- blog.ts
|       |   +-- career.ts
|       +-- types/                 # TypeScript interfaces
|       |   +-- index.ts
|       +-- constants/             # Shared constants
|           +-- index.ts
|
+-- frontend/                      # Next.js application
|   +-- public/
|   |   +-- images/
|   |   +-- fonts/
|   |   +-- robots.txt
|   |   +-- sitemap.xml
|   +-- src/
|   |   +-- app/                   # Next.js App Router
|   |   |   +-- (public)/          # Route group: public pages
|   |   |   |   +-- page.tsx                    # Home
|   |   |   |   +-- about/page.tsx
|   |   |   |   +-- services/
|   |   |   |   |   +-- page.tsx                # Services list
|   |   |   |   |   +-- [slug]/page.tsx         # Service detail
|   |   |   |   +-- portfolio/
|   |   |   |   |   +-- page.tsx                # Portfolio grid
|   |   |   |   |   +-- [slug]/page.tsx         # Case study
|   |   |   |   +-- technologies/page.tsx
|   |   |   |   +-- pricing/page.tsx
|   |   |   |   +-- testimonials/page.tsx
|   |   |   |   +-- clients/page.tsx
|   |   |   |   +-- blog/
|   |   |   |   |   +-- page.tsx                # Blog list
|   |   |   |   |   +-- [slug]/page.tsx         # Blog detail
|   |   |   |   |   +-- category/[slug]/page.tsx
|   |   |   |   +-- careers/
|   |   |   |   |   +-- page.tsx                # Careers list
|   |   |   |   |   +-- [slug]/page.tsx         # Job detail
|   |   |   |   +-- contact/page.tsx
|   |   |   |   +-- get-quote/page.tsx
|   |   |   |   +-- privacy-policy/page.tsx
|   |   |   |   +-- terms/page.tsx
|   |   |   +-- admin/             # Route group: admin panel
|   |   |   |   +-- login/page.tsx
|   |   |   |   +-- dashboard/page.tsx
|   |   |   |   +-- portfolio/
|   |   |   |   |   +-- page.tsx               # List
|   |   |   |   |   +-- new/page.tsx           # Create
|   |   |   |   |   +-- [id]/edit/page.tsx     # Edit
|   |   |   |   +-- blog/
|   |   |   |   |   +-- page.tsx
|   |   |   |   |   +-- new/page.tsx
|   |   |   |   |   +-- [id]/edit/page.tsx
|   |   |   |   +-- testimonials/page.tsx
|   |   |   |   +-- clients/page.tsx
|   |   |   |   +-- services/page.tsx
|   |   |   |   +-- pricing/page.tsx
|   |   |   |   +-- team/page.tsx
|   |   |   |   +-- careers/page.tsx
|   |   |   |   +-- inquiries/page.tsx
|   |   |   |   +-- quotes/page.tsx
|   |   |   |   +-- settings/page.tsx
|   |   |   |   +-- media/page.tsx
|   |   |   |   +-- layout.tsx                # Admin layout with sidebar
|   |   |   +-- layout.tsx                     # Root layout
|   |   |   +-- not-found.tsx
|   |   |   +-- error.tsx
|   |   +-- components/
|   |   |   +-- ui/                # Base UI components
|   |   |   |   +-- Button.tsx
|   |   |   |   +-- Card.tsx
|   |   |   |   +-- Input.tsx
|   |   |   |   +-- Modal.tsx
|   |   |   |   +-- Badge.tsx
|   |   |   |   +-- Skeleton.tsx
|   |   |   |   +-- Toast.tsx
|   |   |   +-- layout/            # Layout components
|   |   |   |   +-- Header.tsx
|   |   |   |   +-- Footer.tsx
|   |   |   |   +-- MobileNav.tsx
|   |   |   |   +-- AdminSidebar.tsx
|   |   |   |   +-- AdminHeader.tsx
|   |   |   |   +-- Breadcrumb.tsx
|   |   |   +-- sections/          # Home page sections
|   |   |   |   +-- Hero.tsx
|   |   |   |   +-- ServicesOverview.tsx
|   |   |   |   +-- PortfolioPreview.tsx
|   |   |   |   +-- TechStack.tsx
|   |   |   |   +-- WhyChooseUs.tsx
|   |   |   |   +-- Stats.tsx
|   |   |   |   +-- TestimonialsCarousel.tsx
|   |   |   |   +-- ClientLogos.tsx
|   |   |   |   +-- CTABanner.tsx
|   |   |   |   +-- QuickContact.tsx
|   |   |   +-- forms/             # Form components
|   |   |   |   +-- ContactForm.tsx
|   |   |   |   +-- QuoteForm.tsx
|   |   |   |   +-- ApplicationForm.tsx
|   |   |   |   +-- NewsletterForm.tsx
|   |   |   +-- shared/            # Shared components
|   |   |       +-- SectionHeading.tsx
|   |   |       +-- ProjectCard.tsx
|   |   |       +-- ServiceCard.tsx
|   |   |       +-- TestimonialCard.tsx
|   |   |       +-- BlogCard.tsx
|   |   |       +-- JobCard.tsx
|   |   |       +-- ImageGallery.tsx
|   |   |       +-- AnimatedCounter.tsx
|   |   |       +-- ScrollReveal.tsx
|   |   |       +-- SEO.tsx
|   |   +-- lib/                   # Utilities and helpers
|   |   |   +-- api.ts             # API client (fetch wrapper)
|   |   |   +-- utils.ts           # General utilities
|   |   |   +-- constants.ts
|   |   +-- hooks/                 # Custom React hooks
|   |   |   +-- useScrollReveal.ts
|   |   |   +-- useMediaQuery.ts
|   |   +-- styles/
|   |       +-- globals.css        # Tailwind directives + custom CSS
|   +-- tailwind.config.ts
|   +-- next.config.ts
|   +-- tsconfig.json
|   +-- package.json
|
+-- backend/                       # Express.js API
|   +-- src/
|   |   +-- config/
|   |   |   +-- db.ts              # MongoDB connection
|   |   |   +-- cloudinary.ts      # Cloudinary config
|   |   |   +-- email.ts           # Nodemailer transporter
|   |   |   +-- env.ts             # Environment variable validation
|   |   +-- models/                # Mongoose models
|   |   |   +-- Project.ts
|   |   |   +-- CaseStudy.ts
|   |   |   +-- BlogPost.ts
|   |   |   +-- Service.ts
|   |   |   +-- Testimonial.ts
|   |   |   +-- Client.ts
|   |   |   +-- PricingPlan.ts
|   |   |   +-- TeamMember.ts
|   |   |   +-- JobPosting.ts
|   |   |   +-- Application.ts
|   |   |   +-- ContactMessage.ts
|   |   |   +-- QuoteRequest.ts
|   |   |   +-- Admin.ts
|   |   |   +-- Media.ts
|   |   |   +-- SiteSettings.ts
|   |   |   +-- Subscriber.ts
|   |   +-- routes/                # Express route definitions
|   |   |   +-- auth.ts
|   |   |   +-- projects.ts
|   |   |   +-- blog.ts
|   |   |   +-- services.ts
|   |   |   +-- testimonials.ts
|   |   |   +-- clients.ts
|   |   |   +-- pricing.ts
|   |   |   +-- team.ts
|   |   |   +-- careers.ts
|   |   |   +-- contact.ts
|   |   |   +-- quotes.ts
|   |   |   +-- media.ts
|   |   |   +-- settings.ts
|   |   |   +-- subscribers.ts
|   |   |   +-- dashboard.ts
|   |   +-- middleware/
|   |   |   +-- auth.ts            # JWT verification
|   |   |   +-- validate.ts        # Zod validation middleware
|   |   |   +-- upload.ts          # Multer config
|   |   |   +-- rateLimiter.ts
|   |   |   +-- errorHandler.ts
|   |   +-- services/              # Business logic layer
|   |   |   +-- emailService.ts
|   |   |   +-- uploadService.ts
|   |   +-- utils/
|   |   |   +-- slugify.ts
|   |   |   +-- pagination.ts
|   |   +-- app.ts                 # Express app setup
|   |   +-- server.ts              # Server entry point
|   +-- tsconfig.json
|   +-- package.json
|
+-- .github/
|   +-- workflows/
|       +-- ci.yml                 # Lint + test on PR
|       +-- deploy-frontend.yml    # Auto-deploy to Vercel
|       +-- deploy-backend.yml     # Auto-deploy to Render
+-- .gitignore
+-- package.json                   # Workspace root
+-- README.md
```

---

## 4. Database Design

### Collections & Schemas

#### `admins`
```
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (bcrypt hashed),
  role: Enum ["super_admin", "editor", "viewer"],
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

#### `projects` (Portfolio)
```
{
  _id: ObjectId,
  title: String,
  slug: String (unique, auto-generated),
  clientName: String,
  projectType: Enum ["web", "mobile", "ai", "automation", "game", "desktop"],
  description: String,
  thumbnail: String (Cloudinary URL),
  technologies: [String],
  isVisible: Boolean (default: true),
  isFeatured: Boolean (default: false),
  order: Number,
  caseStudy: {
    overview: String,
    problem: String,
    solution: String,
    features: [String],
    architecture: String,
    screenshots: [String] (Cloudinary URLs),
    results: String,
    metrics: [{ label: String, value: String }],
    liveUrl: String,
    clientTestimonial: String
  },
  createdAt: Date,
  updatedAt: Date
}
Index: { slug: 1 }, { projectType: 1 }, { isFeatured: 1, order: 1 }
```

#### `services`
```
{
  _id: ObjectId,
  title: String,
  slug: String (unique),
  icon: String,
  shortDescription: String,
  fullDescription: String (rich text / HTML),
  technologies: [String],
  process: [{ step: Number, title: String, description: String }],
  timeline: String,
  startingPrice: String,
  faqs: [{ question: String, answer: String }],
  isActive: Boolean (default: true),
  order: Number,
  createdAt: Date,
  updatedAt: Date
}
Index: { slug: 1 }, { isActive: 1, order: 1 }
```

#### `blog_posts`
```
{
  _id: ObjectId,
  title: String,
  slug: String (unique),
  excerpt: String,
  content: String (rich text / HTML),
  featuredImage: String (Cloudinary URL),
  author: {
    name: String,
    avatar: String,
    bio: String
  },
  category: String,
  tags: [String],
  status: Enum ["draft", "published", "scheduled"],
  publishedAt: Date,
  scheduledAt: Date,
  readTime: Number (minutes, auto-calculated),
  views: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
Index: { slug: 1 }, { status: 1, publishedAt: -1 }, { category: 1 }, { tags: 1 }
```

#### `testimonials`
```
{
  _id: ObjectId,
  clientName: String,
  company: String,
  companyLogo: String,
  designation: String,
  photo: String (Cloudinary URL),
  review: String,
  rating: Number (1-5),
  projectType: String,
  videoUrl: String (optional),
  isFeatured: Boolean (default: false),
  isVisible: Boolean (default: true),
  date: Date,
  createdAt: Date,
  updatedAt: Date
}
Index: { isFeatured: 1 }, { isVisible: 1 }
```

#### `clients`
```
{
  _id: ObjectId,
  name: String,
  logo: String (Cloudinary URL),
  industry: String,
  projectType: String,
  linkedProject: ObjectId (ref: projects, optional),
  isVisible: Boolean (default: true),
  order: Number,
  createdAt: Date,
  updatedAt: Date
}
Index: { isVisible: 1, order: 1 }
```

#### `pricing_plans`
```
{
  _id: ObjectId,
  name: String,
  icon: String,
  targetAudience: String,
  startingPrice: String,
  features: [{ text: String, included: Boolean }],
  timeline: String,
  isPopular: Boolean (default: false),
  isActive: Boolean (default: true),
  order: Number,
  createdAt: Date,
  updatedAt: Date
}
Index: { isActive: 1, order: 1 }
```

#### `team_members`
```
{
  _id: ObjectId,
  name: String,
  role: String,
  photo: String (Cloudinary URL),
  bio: String,
  linkedin: String,
  github: String,
  order: Number,
  isVisible: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
Index: { isVisible: 1, order: 1 }
```

#### `job_postings`
```
{
  _id: ObjectId,
  title: String,
  slug: String (unique),
  department: String,
  location: Enum ["remote", "indore", "hybrid"],
  experienceLevel: String,
  jobType: Enum ["full-time", "part-time", "contract", "internship"],
  description: String (rich text),
  requirements: [String],
  responsibilities: [String],
  perks: [String],
  isActive: Boolean (default: true),
  postedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
Index: { slug: 1 }, { isActive: 1 }
```

#### `applications`
```
{
  _id: ObjectId,
  jobPosting: ObjectId (ref: job_postings),
  name: String,
  email: String,
  phone: String,
  role: String,
  experience: String,
  portfolioUrl: String,
  resume: String (Cloudinary URL),
  coverLetter: String,
  status: Enum ["new", "reviewing", "shortlisted", "rejected", "hired"],
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
Index: { jobPosting: 1 }, { status: 1 }, { createdAt: -1 }
```

#### `contact_messages`
```
{
  _id: ObjectId,
  name: String,
  email: String,
  phone: String,
  subject: String,
  message: String,
  isRead: Boolean (default: false),
  repliedAt: Date,
  createdAt: Date
}
Index: { isRead: 1, createdAt: -1 }
```

#### `quote_requests`
```
{
  _id: ObjectId,
  name: String,
  email: String,
  phone: String,
  company: String,
  projectType: String,
  projectSubtype: String,
  budgetRange: String,
  timeline: String,
  description: String,
  referenceLinks: String,
  attachment: String (Cloudinary URL),
  ndaRequired: Boolean (default: false),
  source: String,
  status: Enum ["new", "in_review", "quoted", "won", "lost"],
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
Index: { status: 1, createdAt: -1 }
```

#### `media`
```
{
  _id: ObjectId,
  filename: String,
  url: String (Cloudinary URL),
  publicId: String (Cloudinary public ID),
  type: Enum ["image", "document", "video"],
  size: Number (bytes),
  uploadedBy: ObjectId (ref: admins),
  createdAt: Date
}
Index: { type: 1, createdAt: -1 }
```

#### `site_settings` (single document)
```
{
  _id: ObjectId,
  companyName: String,
  tagline: String,
  email: String,
  phone: String,
  whatsapp: String,
  address: String,
  googleMapsEmbed: String,
  socialLinks: {
    linkedin: String,
    github: String,
    twitter: String,
    instagram: String
  },
  seo: {
    defaultTitle: String,
    defaultDescription: String,
    ogImage: String
  },
  officeHours: String,
  updatedAt: Date
}
```

#### `subscribers`
```
{
  _id: ObjectId,
  email: String (unique),
  isActive: Boolean (default: true),
  subscribedAt: Date,
  unsubscribedAt: Date
}
Index: { email: 1 }, { isActive: 1 }
```

---

## 5. API Design

### Base URL
```
Production: https://api.genmash.com/api/v1
Development: http://localhost:5000/api/v1
```

### Public Endpoints (No Auth)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/services` | List active services |
| GET | `/services/:slug` | Service detail |
| GET | `/projects` | List visible projects (with filters) |
| GET | `/projects/featured` | Featured projects for home page |
| GET | `/projects/:slug` | Project + case study detail |
| GET | `/blog` | Published blog posts (paginated) |
| GET | `/blog/:slug` | Blog post detail |
| GET | `/blog/categories` | List blog categories |
| GET | `/testimonials` | Visible testimonials |
| GET | `/clients` | Visible client logos |
| GET | `/pricing` | Active pricing plans |
| GET | `/team` | Visible team members |
| GET | `/careers` | Active job postings |
| GET | `/careers/:slug` | Job posting detail |
| GET | `/settings` | Public site settings |
| POST | `/contact` | Submit contact form |
| POST | `/quotes` | Submit quote request |
| POST | `/careers/apply` | Submit job application |
| POST | `/subscribers` | Newsletter subscription |

### Admin Endpoints (JWT Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login` | Admin login |
| POST | `/auth/forgot-password` | Password reset request |
| POST | `/auth/reset-password` | Password reset |
| GET | `/auth/me` | Current admin profile |
| | | |
| GET | `/admin/dashboard` | Dashboard statistics |
| | | |
| GET/POST | `/admin/projects` | List / Create project |
| GET/PUT/DELETE | `/admin/projects/:id` | Read / Update / Delete project |
| PATCH | `/admin/projects/:id/reorder` | Change display order |
| | | |
| GET/POST | `/admin/blog` | List all / Create post |
| GET/PUT/DELETE | `/admin/blog/:id` | Read / Update / Delete post |
| | | |
| GET/POST | `/admin/services` | List / Create service |
| GET/PUT/DELETE | `/admin/services/:id` | Read / Update / Delete |
| | | |
| GET/POST | `/admin/testimonials` | List / Create |
| PUT/DELETE | `/admin/testimonials/:id` | Update / Delete |
| | | |
| GET/POST | `/admin/clients` | List / Create |
| PUT/DELETE | `/admin/clients/:id` | Update / Delete |
| | | |
| GET/POST | `/admin/pricing` | List / Create |
| PUT/DELETE | `/admin/pricing/:id` | Update / Delete |
| | | |
| GET/POST | `/admin/team` | List / Create |
| PUT/DELETE | `/admin/team/:id` | Update / Delete |
| | | |
| GET/POST | `/admin/careers` | List / Create |
| PUT/DELETE | `/admin/careers/:id` | Update / Delete |
| GET | `/admin/careers/:id/applications` | Applications for a job |
| PATCH | `/admin/applications/:id` | Update application status |
| | | |
| GET | `/admin/contact` | List contact messages |
| PATCH | `/admin/contact/:id` | Mark read / add reply |
| DELETE | `/admin/contact/:id` | Delete message |
| | | |
| GET | `/admin/quotes` | List quote requests |
| PATCH | `/admin/quotes/:id` | Update status / notes |
| DELETE | `/admin/quotes/:id` | Delete |
| | | |
| GET/POST | `/admin/media` | List / Upload media |
| DELETE | `/admin/media/:id` | Delete media |
| | | |
| GET/PUT | `/admin/settings` | Get / Update site settings |
| | | |
| GET | `/admin/subscribers` | List subscribers |

### API Conventions

- **Pagination:** `?page=1&limit=12` (default limit: 12)
- **Filtering:** `?projectType=web&technology=react`
- **Sorting:** `?sort=-createdAt` (prefix `-` for descending)
- **Search:** `?search=keyword`
- **Response format:**
  ```json
  {
    "success": true,
    "data": { ... },
    "pagination": {
      "page": 1,
      "limit": 12,
      "total": 48,
      "pages": 4
    }
  }
  ```
- **Error format:**
  ```json
  {
    "success": false,
    "error": {
      "code": "VALIDATION_ERROR",
      "message": "Email is required",
      "details": [...]
    }
  }
  ```

---

## 6. Frontend Architecture

### Rendering Strategy

| Page | Strategy | Revalidation |
|------|----------|-------------|
| Home | SSG | ISR: 60 seconds |
| About | SSG | ISR: 3600 seconds |
| Services list | SSG | ISR: 3600 seconds |
| Service detail | SSG (dynamic) | ISR: 3600 seconds |
| Portfolio | SSG | ISR: 60 seconds |
| Case study | SSG (dynamic) | ISR: 3600 seconds |
| Technologies | SSG | ISR: 3600 seconds |
| Pricing | SSG | ISR: 3600 seconds |
| Testimonials | SSG | ISR: 300 seconds |
| Clients | SSG | ISR: 3600 seconds |
| Blog list | SSG | ISR: 60 seconds |
| Blog detail | SSG (dynamic) | ISR: 60 seconds |
| Careers | SSG | ISR: 300 seconds |
| Contact | SSG | ISR: 86400 seconds |
| Get Quote | Static | N/A (form only) |
| Admin/* | CSR | N/A (client-side) |

### Component Design Principles

1. **Server Components by default** -- only add `"use client"` when interactivity is needed
2. **Colocate data fetching** -- fetch data in the page/layout component, pass to children as props
3. **Skeleton loading** -- use `loading.tsx` files for route-level suspense
4. **Image optimization** -- all images through `next/image` with Cloudinary loader
5. **Mobile-first** -- design breakpoints: 320px > 768px > 1024px > 1440px

### Design System

```
Colors:
  Primary:    #2563EB (Blue 600) -- brand, CTAs, links
  Secondary:  #0F172A (Slate 900) -- headings, dark sections
  Accent:     #10B981 (Emerald 500) -- success, highlights
  Background: #FFFFFF / #F8FAFC (Slate 50)
  Text:       #334155 (Slate 700)
  Muted:      #94A3B8 (Slate 400)

Typography:
  Headings: Inter (600, 700)
  Body:     Inter (400, 500)

Spacing:
  Section padding: py-16 md:py-24
  Container: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8

Border Radius:
  Cards: rounded-xl (12px)
  Buttons: rounded-lg (8px)
  Inputs: rounded-md (6px)

Shadows:
  Cards: shadow-sm hover:shadow-md transition
  Modals: shadow-2xl
```

---

## 7. Admin Panel Architecture

### Layout
- Sidebar navigation (collapsible on mobile)
- Top header with admin name, notifications bell, logout
- Main content area with breadcrumbs

### Key Admin UI Features

| Feature | Implementation |
|---------|---------------|
| Rich text editor | Tiptap with image upload, code blocks, headings, lists |
| Image upload | Drag-and-drop zone, preview, Cloudinary upload |
| Data tables | Sortable, filterable tables with pagination |
| Form validation | React Hook Form + Zod, inline error messages |
| Toast notifications | Success/error toasts for all CRUD operations |
| Confirmation dialogs | Before delete operations |
| Bulk actions | Select multiple items for bulk delete/status change |
| Search | Real-time search across list views |

### Admin Routes Protection
- All `/admin/*` routes (except `/admin/login`) wrapped in `AuthProvider`
- JWT stored in httpOnly cookie (set by backend)
- Auto-redirect to login if token expired
- Role-based route access in middleware

---

## 8. Authentication & Authorization

### Flow

```
1. Admin visits /admin/login
2. Submits email + password
3. Backend validates credentials (bcrypt compare)
4. Backend returns JWT (24h expiry) in httpOnly secure cookie
5. Frontend stores auth state in React context
6. All admin API calls include cookie automatically
7. Backend middleware verifies JWT on each request
8. Token refresh: issue new token on each valid request
```

### JWT Payload
```json
{
  "id": "admin_object_id",
  "email": "admin@genmash.com",
  "role": "super_admin",
  "iat": 1712300000,
  "exp": 1712386400
}
```

### Role Permissions

| Action | Super Admin | Editor | Viewer |
|--------|:-----------:|:------:|:------:|
| View dashboard | Yes | Yes | Yes |
| View content | Yes | Yes | Yes |
| Create/edit content | Yes | Yes | No |
| Delete content | Yes | No | No |
| Manage admins | Yes | No | No |
| Change settings | Yes | No | No |

---

## 9. File Upload Strategy

### Upload Flow
```
1. Frontend: User selects file
2. Frontend: Validate type + size client-side
3. Frontend: POST to /api/v1/admin/media (multipart/form-data)
4. Backend: Multer parses file (memory storage, size limit: 10MB)
5. Backend: Validate file type server-side
6. Backend: Upload to Cloudinary with folder organization
7. Backend: Save metadata to `media` collection
8. Backend: Return Cloudinary URL + public ID
```

### Cloudinary Folder Structure
```
genmash/
  portfolio/
  blog/
  team/
  clients/
  testimonials/
  resumes/
  general/
```

### Allowed File Types

| Context | Types | Max Size |
|---------|-------|----------|
| Images | jpg, jpeg, png, webp, svg | 5 MB |
| Resumes | pdf, doc, docx | 5 MB |
| Attachments (quotes) | pdf, doc, docx, png, jpg | 10 MB |

---

## 10. Email & Notification System

### Email Templates Needed

| Trigger | Recipient | Template |
|---------|-----------|----------|
| Contact form | Company + User | Contact notification / confirmation |
| Quote request | Company + User | Quote notification / confirmation |
| Job application | Company + User | Application notification / confirmation |
| Newsletter signup | User | Welcome email |
| Password reset | Admin | Reset link email |

### Implementation
```typescript
// emailService.ts pattern
const transporter = nodemailer.createTransport({
  service: 'gmail',   // or SendGrid for production
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS    // App password for Gmail
  }
});

// HTML email templates stored as functions
// that accept data and return HTML string
```

### Notification Channels (Future)
- Slack webhook for new quote requests (high priority)
- Daily digest email for new contact messages

---

## 11. SEO Strategy

### Technical SEO

| Element | Implementation |
|---------|---------------|
| Meta tags | Dynamic `generateMetadata()` in each page.tsx |
| Open Graph | Title, description, image for each page |
| Twitter Cards | Summary large image cards |
| JSON-LD | Organization, LocalBusiness, BlogPosting, FAQPage, BreadcrumbList |
| Sitemap | Auto-generated via next-sitemap |
| robots.txt | Allow all public, disallow /admin/* |
| Canonical URLs | Set on all pages |
| Breadcrumbs | On all inner pages |
| 404 page | Custom with navigation links |
| URL structure | Clean slugs: `/services/web-development`, `/blog/how-to-build-ai-chatbot` |

### Structured Data Examples

**Organization (global)**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "GenMash Software Solutions",
  "url": "https://genmash.com",
  "logo": "https://genmash.com/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "contact@genmash.com",
    "contactType": "sales"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Indore",
    "addressRegion": "Madhya Pradesh",
    "addressCountry": "IN"
  }
}
```

**BlogPosting (per blog post)**
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "...",
  "image": "...",
  "author": { "@type": "Person", "name": "..." },
  "datePublished": "...",
  "dateModified": "..."
}
```

### Content SEO
- Unique title and description for every page
- H1 tag on every page (only one)
- Image alt text on all images
- Internal linking between services, portfolio, and blog
- Blog content targeting long-tail keywords in software development

---

## 12. Performance Strategy

### Frontend Performance

| Technique | Implementation |
|-----------|---------------|
| Static generation | SSG + ISR for most pages |
| Image optimization | next/image with Cloudinary transformations (auto format, quality) |
| Code splitting | Dynamic imports for heavy components (editor, charts) |
| Font optimization | next/font with Inter, swap display |
| CSS | Tailwind purge removes unused styles |
| Bundle analysis | @next/bundle-analyzer for monitoring |
| Lazy loading | Intersection Observer for below-fold sections |
| Prefetching | Next.js Link auto-prefetch for navigation |

### Backend Performance

| Technique | Implementation |
|-----------|---------------|
| Query optimization | Mongoose lean(), select(), proper indexes |
| Pagination | Cursor-based for large collections, skip/limit for admin |
| Response compression | Express compression middleware |
| Caching headers | Cache-Control on public GET endpoints |
| Connection pooling | MongoDB driver default pooling |

### Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | > 90 |
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Total Blocking Time | < 200ms |
| Cumulative Layout Shift | < 0.1 |
| Time to Interactive | < 3.5s |
| Bundle size (JS, gzipped) | < 150 KB initial load |

---

## 13. Security Plan

### Application Security

| Layer | Measure |
|-------|---------|
| Transport | HTTPS enforced via Cloudflare |
| Headers | Helmet.js (CSP, HSTS, X-Frame-Options, etc.) |
| CORS | Whitelist frontend domain only |
| Auth | JWT in httpOnly, secure, sameSite cookies |
| Passwords | bcrypt with 12 salt rounds |
| Input validation | Zod schemas on every endpoint |
| Sanitization | DOMPurify on rich text input, escape HTML in text fields |
| File upload | Type validation + size limits + Cloudinary virus scan |
| Rate limiting | 100 req/15min on public forms, 1000 req/15min on API |
| CSRF | SameSite cookies + origin check |
| SQL/NoSQL injection | Mongoose parameterized queries (no raw queries) |
| XSS | React auto-escaping + CSP headers |
| Dependencies | npm audit in CI, Dependabot alerts |

### Environment Variables

```
# Backend .env (NEVER commit)
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=<random-64-char>
JWT_EXPIRE=24h

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=noreply@genmash.com
SMTP_PASS=<app-password>

CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

RECAPTCHA_SECRET_KEY=...

FRONTEND_URL=https://genmash.com

# Frontend .env.local
NEXT_PUBLIC_API_URL=https://api.genmash.com/api/v1
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=...
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_MAPS_KEY=...
```

---

## 14. Deployment Architecture

### Infrastructure

```
GitHub Repository (monorepo)
        |
        +-- Push to main
        |       |
        |       +-- GitHub Actions CI
        |               |
        |       +-------+-------+
        |       |               |
        v       v               v
    Vercel          Render          MongoDB Atlas
    (Frontend)      (Backend)       (Database)
        |               |               |
    Cloudflare      Cloudflare      Cloudinary
    (CDN/DNS)       (proxy)         (Media)
```

### Deployment Workflow

1. **Development:** Feature branches, local dev servers
2. **Preview:** Vercel auto-deploys preview URLs for every PR
3. **Staging:** Merge to `develop` branch deploys to staging environment
4. **Production:** Merge to `main` deploys to production

### CI/CD Pipeline (GitHub Actions)

```yaml
# On Pull Request:
- Lint (ESLint)
- Type check (tsc --noEmit)
- Unit tests (if any)
- Build check

# On merge to main:
- All above checks
- Deploy frontend to Vercel (auto via Vercel GitHub integration)
- Deploy backend to Render (auto via Render GitHub integration)
```

---

## 15. Development Phases

### Phase 1: Foundation (Week 1-2)
- [ ] Initialize monorepo (npm workspaces)
- [ ] Set up Next.js frontend with TypeScript + Tailwind
- [ ] Set up Express backend with TypeScript
- [ ] Configure MongoDB Atlas + Mongoose models
- [ ] Set up Cloudinary integration
- [ ] Create shared validation schemas (Zod)
- [ ] Implement JWT auth system
- [ ] Set up basic admin login page
- [ ] Deploy skeleton to Vercel + Render

### Phase 2: Public Pages -- Core (Week 3-4)
- [ ] Build layout: Header, Footer, MobileNav
- [ ] Home page (all sections)
- [ ] About Us page
- [ ] Contact page + form submission + email
- [ ] Get Quote page + form submission + email
- [ ] Design system / UI components library

### Phase 3: Public Pages -- Content (Week 5-6)
- [ ] Services list + detail pages
- [ ] Portfolio + case study pages
- [ ] Technologies page
- [ ] Pricing page
- [ ] Testimonials page
- [ ] Clients page

### Phase 4: Blog & Careers (Week 7)
- [ ] Blog list + detail pages
- [ ] Blog category/tag pages
- [ ] Careers page + job detail
- [ ] Job application form + resume upload

### Phase 5: Admin Panel (Week 8-10)
- [ ] Admin layout (sidebar, header)
- [ ] Dashboard with statistics
- [ ] Portfolio CRUD + case study editor
- [ ] Blog CRUD with rich text editor
- [ ] Services CRUD
- [ ] Testimonials CRUD
- [ ] Clients CRUD
- [ ] Pricing CRUD
- [ ] Team members CRUD
- [ ] Careers / Job postings CRUD
- [ ] Contact messages viewer
- [ ] Quote requests manager
- [ ] Media library
- [ ] Site settings editor

### Phase 6: Polish & Optimization (Week 11-12)
- [ ] Animations (Framer Motion: hero, scroll reveals, page transitions)
- [ ] SEO optimization (meta tags, JSON-LD, sitemap, robots.txt)
- [ ] Performance optimization (Lighthouse audit, image optimization)
- [ ] Responsive design QA across devices
- [ ] Accessibility audit (keyboard nav, screen reader, contrast)
- [ ] Security hardening (rate limiting, CORS, headers)
- [ ] Error pages (404, 500)
- [ ] Privacy Policy + Terms of Service pages
- [ ] Newsletter subscription
- [ ] reCAPTCHA integration on forms
- [ ] Google Analytics setup
- [ ] WhatsApp chat button
- [ ] Final testing and bug fixes

### Phase 7: Launch (Week 13)
- [ ] DNS configuration (Cloudflare)
- [ ] SSL verification
- [ ] Production environment variables
- [ ] Seed initial content (services, team, pricing)
- [ ] Smoke testing on production
- [ ] Google Search Console setup
- [ ] Submit sitemap
- [ ] Monitor error tracking (Sentry)
- [ ] Go live

---

## 16. Testing Strategy

### Testing Approach
Given this is a content-heavy marketing site (not a SaaS product), keep testing pragmatic:

| Type | Scope | Tools |
|------|-------|-------|
| Type checking | Full codebase | TypeScript strict mode |
| Linting | Full codebase | ESLint + Prettier |
| Component testing | Critical UI components | React Testing Library (optional) |
| API testing | All endpoints | Manual (Postman/Thunder Client) during dev |
| E2E testing | Critical flows | Playwright (optional, Phase 6+) |
| Manual testing | All pages/forms | Cross-browser, cross-device |

### Critical Paths to Test
1. Contact form submission -> email delivery -> admin dashboard display
2. Quote form submission -> email delivery -> admin dashboard display
3. Job application -> resume upload -> admin view
4. Admin login -> CRUD operations -> public page reflects changes
5. Blog publish -> appears on blog list -> correct SEO tags
6. Image upload -> Cloudinary -> displays correctly

---

## 17. Monitoring & Maintenance

### Monitoring Stack

| Tool | Purpose | Cost |
|------|---------|------|
| Vercel Analytics | Frontend performance | Free tier |
| Sentry | Error tracking (frontend + backend) | Free tier (5K events/mo) |
| UptimeRobot | Uptime monitoring + alerts | Free tier (50 monitors) |
| MongoDB Atlas | Database metrics | Built-in |
| Google Analytics 4 | Traffic analytics | Free |
| Google Search Console | SEO monitoring | Free |

### Maintenance Checklist (Monthly)
- [ ] Review and respond to pending inquiries/quotes
- [ ] Publish at least 2 blog posts (content marketing)
- [ ] Update portfolio with new projects
- [ ] Check Sentry for unresolved errors
- [ ] Run `npm audit` and update dependencies
- [ ] Review Lighthouse scores
- [ ] Check Google Search Console for crawl errors
- [ ] Backup MongoDB Atlas (automatic, verify retention)

---

## Appendix: Key Environment URLs

| Environment | Frontend | Backend API |
|-------------|----------|-------------|
| Local | http://localhost:3000 | http://localhost:5000 |
| Staging | https://staging.genmash.com | https://api-staging.genmash.com |
| Production | https://genmash.com | https://api.genmash.com |

---

*End of Website Plan*
