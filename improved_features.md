# GenMash Software Solutions -- Website Features & Structure (Improved)

> **Version:** 2.0  
> **Last Updated:** 2026-04-05  
> **Purpose:** Complete feature specification for the GenMash company website.

---

## 1. Website Overview

**Company:** GenMash Software Solutions  
**Location:** Indore, India  
**Founded:** 2020  

### Goals
- Showcase company services and technical expertise
- Display portfolio with detailed case studies
- Generate qualified leads via contact, quote, and consultation forms
- Build brand credibility and authority through blog content
- Provide admin tools to manage all dynamic content
- **[NEW]** Establish thought leadership through structured content marketing
- **[NEW]** Support multilingual visitors (English primary, Hindi secondary)

### Target Audience
- **[NEW]** Startups and SMBs looking for software development partners
- **[NEW]** Enterprise clients evaluating outsourcing options
- **[NEW]** Potential employees and interns

---

## 2. Sitemap (Pages Structure)

```
Home
About Us
Services
    +-- Service Detail Page (dynamic, one per service)
Portfolio
    +-- Case Study Page (dynamic, one per project)
Technologies
Pricing
    +-- Custom Quote Calculator [NEW]
Testimonials
Clients
Blog
    +-- Blog Detail Page
    +-- Blog Category Page [NEW]
    +-- Blog Tag Page [NEW]
Careers
    +-- Job Detail Page [NEW]
Contact
Get Quote / Start Project
Privacy Policy [NEW]
Terms of Service [NEW]
Sitemap (HTML) [NEW]
Admin Dashboard (protected)
```

---

## 3. Home Page Sections

### Hero Section
- Animated gradient or particle background (lightweight, no heavy libraries)
- Typing text slogan with 3-4 rotating taglines
- CTA Buttons:
  - **Primary:** Get a Free Quote
  - **Secondary:** View Our Work
- **[NEW]** Trust badges row (e.g., "5+ Years", "100+ Projects", "50+ Clients")

### Services Overview
- 6 service cards (top services) with icon, title, short description
- "View All Services" link
- **[NEW]** Each card links directly to its service detail page

### Portfolio Preview
- Top 3-4 featured projects with screenshot, tech tags, and client name
- "View All Projects" link
- **[NEW]** Filter/category chips (Web, Mobile, AI, etc.)

### Technologies
- Tech stack icons grouped by category
- **[NEW]** Animated on-scroll reveal

### Why Choose Us
- 4-6 differentiators with icons
- Points: Dedicated team, On-time delivery, Post-launch support, Transparent pricing, Modern tech stack, NDA-protected

### Company Stats (Animated Counters)
- Projects Completed
- Happy Clients
- Years of Experience
- Technologies Used
- **[NEW]** Countries Served

### Testimonials Carousel
- Client reviews slider (auto-play with manual controls)
- Star rating, client photo, name, company
- **[NEW]** Video testimonials support

### Clients Logo Strip
- Scrolling/grid of client company logos
- **[NEW]** Grayscale to color on hover

### Call To Action Banner
- "Ready to build your next project?" with CTA button
- **[NEW]** Background pattern or gradient for visual separation

### Quick Contact Form
- Name, Email, Phone (optional), Message
- **[NEW]** Honeypot + rate limiting for spam prevention
- **[NEW]** Form validation with inline error messages

### Footer
- Company logo and tagline
- Quick links (About, Services, Portfolio, Blog, Contact)
- Services list
- Contact info (Email, Phone, Address)
- Social links (LinkedIn, GitHub, Twitter/X, Instagram)
- **[NEW]** Newsletter subscription
- **[NEW]** Copyright notice with current year
- **[NEW]** Links to Privacy Policy & Terms of Service

---

## 4. About Us Page

### Sections
- Company Introduction (who we are, what we do)
- Mission Statement
- Vision Statement
- **[NEW]** Core Values (Innovation, Quality, Transparency, Client-first)
- Company Journey Timeline (interactive, from 2020 to present)
- Team Members (photo, name, role, LinkedIn link)
- Technologies We Use (icon grid)
- Global Clients / Reach (map or country flags)
- **[NEW]** Company culture section with office/team photos

---

## 5. Services Page

### Services List
1. Website Development
2. Website Maintenance & Support
3. Website Renovation / Redesign
4. Mobile App Development (iOS, Android, Cross-platform)
5. AI/ML Development
6. AI Agents & Automation
7. Chatbot Development
8. Game Development
9. Desktop Applications
10. Enterprise Software Solutions
11. Cloud & DevOps
12. **[NEW]** UI/UX Design
13. **[NEW]** API Development & Integration

### Each Service Detail Page Should Include
- Service title and hero banner
- Detailed description (what, why, who it's for)
- Key features / deliverables
- Technologies used (with icons)
- Development process (step-by-step visual)
- Estimated timeline range
- Starting price range
- **[NEW]** Related case studies (auto-linked from portfolio)
- **[NEW]** FAQ section (service-specific)
- CTA: Start Your Project / Get a Quote

---

## 6. Portfolio Page

### Filters
- **[NEW]** Category filter: All, Web, Mobile, AI/ML, Automation, Game, Desktop
- **[NEW]** Technology filter: React, Node.js, Python, Flutter, etc.

### Portfolio Card
- Project thumbnail/screenshot
- Project name
- Client name (or "Confidential")
- Project type badge
- Technologies used (icon chips)
- Short description (2 lines max)
- Button: View Case Study

---

## 7. Case Study Page Structure

- **Hero:** Project name, client logo, key metrics
- Project Overview
- Client Problem / Challenge
- Our Solution / Approach
- Key Features Developed
- Technologies & Architecture Used
- Screenshots Gallery (lightbox with zoom)
- Results / Performance Improvements (with metrics)
- Client Testimonial (if available)
- Live Website / App Store Link
- **[NEW]** Related projects section
- **[NEW]** CTA: "Have a similar project? Let's talk"

---

## 8. Technologies Page

### Categories
- Frontend Development (React, Next.js, Vue, Angular, Tailwind CSS)
- Backend Development (Node.js, Express, Python, Django, FastAPI)
- Mobile Development (React Native, Flutter, Swift, Kotlin)
- AI / Machine Learning (TensorFlow, PyTorch, OpenAI, LangChain)
- Automation & AI Agents (n8n, LangGraph, CrewAI)
- Cloud & DevOps (AWS, GCP, Docker, Kubernetes, CI/CD)
- Game Development (Unity, Unreal Engine)
- Desktop Applications (Electron, .NET, Java)
- **[NEW]** Databases (MongoDB, PostgreSQL, Redis, Firebase)

### Each Category Shows
- Technology icons/logos
- Short description of capability
- **[NEW]** Experience level indicator (years using)
- **[NEW]** Link to related services

---

## 9. Pricing Page

### Pricing Tiers
| Plan | Target |
|------|--------|
| Starter Website | Landing pages, personal sites |
| Business Website | SMBs, corporate sites |
| E-commerce Website | Online stores |
| Custom Web Application | SaaS, dashboards, portals |
| Mobile App | iOS/Android apps |
| Custom AI Solution | ML models, AI integrations |
| Automation System | Workflow automation |

### Each Pricing Card Includes
- Plan name and icon
- Starting price (e.g., "Starting at $X")
- Feature list (with checkmarks)
- Estimated timeline
- CTA Button: "Get Started" or "Contact Us"
- **[NEW]** "Most Popular" badge on recommended plan
- **[NEW]** Tooltip for complex features

### [NEW] Custom Quote Calculator
- Interactive form: select project type, features, timeline
- Generates estimated price range
- CTA: "Get Exact Quote" leading to quote form

---

## 10. Testimonials Page

### Each Testimonial
- Client photo (with fallback avatar)
- Client name
- Company name and logo
- Designation/role
- Review text
- Star rating (1-5)
- **[NEW]** Date of review
- **[NEW]** Project type tag
- **[NEW]** Video testimonial embed (optional)

### Layout
- **[NEW]** Masonry grid or card layout
- **[NEW]** Filter by service type

---

## 11. Clients Page

- Logo grid (responsive)
- Company name on hover/below
- Project type tag
- **[NEW]** Link to related case study (if public)
- **[NEW]** Industry/sector grouping

---

## 12. Blog Page

### Blog List
- Blog title
- Featured image (with lazy loading)
- Short description / excerpt (150 chars)
- Author name and avatar
- Published date
- Read time estimate
- Category and tags
- Read More button

### Blog Detail Page
- Title
- Featured image (full-width)
- Content (rich text with code blocks, images, embeds)
- Author bio section
- Published and updated dates
- **[NEW]** Table of contents (auto-generated for long posts)
- **[NEW]** Social share buttons
- **[NEW]** Related posts section
- **[NEW]** Comments section (optional, can use Disqus or custom)
- **[NEW]** Previous/Next post navigation

### [NEW] Blog Category & Tag Pages
- Filtered blog list by category or tag
- SEO-optimized with proper meta tags

---

## 13. Careers Page

### Sections
- Company culture introduction
- **[NEW]** Perks & Benefits list
- **[NEW]** Hiring process steps

### Job Listings
- Job title
- Department
- Location (Remote / Indore / Hybrid)
- Experience level
- **[NEW]** Job type (Full-time, Part-time, Contract, Internship)
- Posted date
- Apply button

### [NEW] Job Detail Page
- Full job description
- Requirements and qualifications
- Responsibilities
- Perks and benefits
- Apply form (embedded)

### Application Form
- Name
- Email
- Phone
- Role applying for (dropdown)
- Experience (years)
- Portfolio/LinkedIn URL
- Resume upload (PDF only, max 5MB)
- Cover letter / Message
- **[NEW]** Consent checkbox for data processing

---

## 14. Contact Page

### Contact Information
- Email address
- Phone number
- WhatsApp (click to chat)
- LinkedIn profile
- GitHub organization
- Location: Indore, Madhya Pradesh, India
- Google Map embed (interactive)

### Contact Form
- Name (required)
- Email (required)
- Phone (optional)
- Subject (dropdown: General Inquiry, Project Discussion, Support, Partnership, Other)
- Message (required)
- **[NEW]** Captcha (reCAPTCHA v3 or Turnstile)

### [NEW] Office Hours
- Display business hours (IST timezone)
- Expected response time notice

---

## 15. Get Quote / Start Project Page

### Form Fields
- Full Name (required)
- Email (required)
- Phone (required)
- Company Name (optional)
- Project Type: Website / Mobile App / AI Solution / Automation / Game / Desktop / Other
- **[NEW]** Project subtype (dynamic based on project type)
- Budget Range (dropdown: < $1K, $1K-$5K, $5K-$15K, $15K-$50K, $50K+)
- Timeline (dropdown: ASAP, 1-3 months, 3-6 months, 6+ months, Flexible)
- Project Description (textarea, min 50 chars)
- Reference links (optional)
- File Upload (max 10MB, PDF/DOC/PNG/JPG)
- **[NEW]** NDA required checkbox
- **[NEW]** How did you hear about us? (dropdown)
- Submit Button

### On Submission
- Send notification email to company (with all form data)
- Send confirmation email to client
- Store in database with status tracking
- **[NEW]** Redirect to thank-you page with next steps
- **[NEW]** Slack/Discord notification to sales channel

---

## 16. Admin Dashboard

### Authentication
- Admin login (email + password)
- **[NEW]** Password reset via email
- **[NEW]** Session management with auto-logout
- **[NEW]** Role-based access (Super Admin, Editor, Viewer)

### Dashboard Overview
- Total inquiries (this month / all time)
- Total quote requests (with status breakdown)
- Total published projects
- Total blog posts
- **[NEW]** Recent activity log
- **[NEW]** Quick action buttons

### Content Management
- **Portfolio Projects** -- Add, Edit, Delete, Reorder, Toggle visibility
- **Case Studies** -- Rich text editor, image gallery management
- **Blog Posts** -- Rich text editor, categories, tags, draft/publish status, scheduled publishing
- **Testimonials** -- Add, Edit, Delete, Toggle featured
- **Client Logos** -- Upload, reorder, toggle visibility
- **Services** -- Edit content, pricing, toggle active
- **Pricing Plans** -- Edit tiers, features, prices
- **Team Members** -- Add, Edit, Delete, Reorder
- **Job Postings** -- Add, Edit, Delete, toggle active, view applications
- **[NEW]** Job Applications -- View, download resume, change status, add notes
- **Contact Messages** -- View, mark read/unread, reply via email
- **Quote Requests** -- View, change status (New/In Review/Quoted/Won/Lost), add notes
- **[NEW]** Media Library -- Centralized image/file management
- **[NEW]** Site Settings -- Company info, social links, SEO defaults

### [NEW] Notifications
- Email notifications for new inquiries and quotes
- In-dashboard notification bell

---

## 17. Required Integrations

| Integration | Purpose | Provider |
|-------------|---------|----------|
| Email | Transactional emails, notifications | Nodemailer with SMTP (Gmail/SendGrid) |
| WhatsApp | Chat button for instant messaging | WhatsApp Business API link |
| Google Maps | Office location on contact page | Google Maps Embed API |
| Analytics | Traffic and behavior tracking | Google Analytics 4 |
| SEO | Meta tags, sitemap, structured data | Next.js built-in + next-seo |
| File Storage | Images, resumes, attachments | Cloudinary (primary) or AWS S3 |
| **[NEW]** reCAPTCHA | Spam prevention on forms | Google reCAPTCHA v3 or Cloudflare Turnstile |
| **[NEW]** Newsletter | Email subscriber management | Mailchimp or Resend |
| **[NEW]** Error Tracking | Runtime error monitoring | Sentry (free tier) |
| **[NEW]** Uptime Monitoring | Downtime alerts | UptimeRobot or BetterStack |

---

## 18. Tech Stack

### Frontend
- **Framework:** Next.js 14+ (App Router) -- [CHANGED from React SPA for SSR/SEO benefits]
- **Styling:** Tailwind CSS 3.x
- **Animations:** Framer Motion (lightweight, React-native)
- **Icons:** Lucide React or React Icons
- **Forms:** React Hook Form + Zod validation
- **State:** React Context (minimal global state needed)
- **[NEW] Rich Text:** Tiptap or MDX for blog content

### Backend
- **Runtime:** Node.js 20 LTS
- **Framework:** Express.js or Fastify
- **ORM/ODM:** Mongoose (for MongoDB)
- **Auth:** JWT + bcrypt (admin only)
- **Email:** Nodemailer
- **File Upload:** Multer + Cloudinary SDK
- **[NEW] Validation:** Zod (shared schemas with frontend)
- **[NEW] Rate Limiting:** express-rate-limit

### Database
- **Primary:** MongoDB Atlas (free tier to start, scalable)
- **[NEW] Caching:** Redis (optional, for session/rate-limit if needed)

### DevOps & Hosting
- **Frontend:** Vercel (optimized for Next.js) -- [CHANGED from Render]
- **Backend API:** Render or Railway
- **Database:** MongoDB Atlas (managed)
- **Storage:** Cloudinary
- **CI/CD:** GitHub Actions
- **[NEW] Domain & DNS:** Cloudflare (free CDN + SSL + DDoS protection)

---

## 19. Non-Functional Requirements

### Performance
- Lighthouse score > 90 on all pages
- First Contentful Paint < 1.5s
- Largest Contentful Paint < 2.5s
- **[NEW]** Image optimization with next/image (WebP/AVIF auto-conversion)
- **[NEW]** Code splitting and lazy loading for non-critical components

### SEO
- **[NEW]** Dynamic meta tags (title, description, OG tags) per page
- **[NEW]** JSON-LD structured data (Organization, LocalBusiness, BlogPosting, FAQPage)
- **[NEW]** XML sitemap auto-generation
- **[NEW]** robots.txt configuration
- **[NEW]** Canonical URLs
- **[NEW]** Breadcrumb navigation

### Security
- **[NEW]** HTTPS everywhere (enforced)
- **[NEW]** Helmet.js for HTTP security headers
- **[NEW]** Input sanitization on all forms
- **[NEW]** CORS configuration
- **[NEW]** Rate limiting on API endpoints
- **[NEW]** File upload validation (type, size)
- **[NEW]** XSS and CSRF protection
- **[NEW]** Environment variables for all secrets

### Accessibility
- **[NEW]** WCAG 2.1 AA compliance target
- **[NEW]** Semantic HTML throughout
- **[NEW]** Keyboard navigation support
- **[NEW]** Alt text on all images
- **[NEW]** Sufficient color contrast ratios

### Responsiveness
- Fully responsive: Mobile (320px+), Tablet (768px+), Desktop (1024px+), Large (1440px+)
- Mobile-first design approach
- **[NEW]** Touch-friendly tap targets (min 44px)

---

## 20. Legal Pages [NEW]

### Privacy Policy
- Data collection practices
- Cookie usage
- Third-party services
- User rights
- Contact for data requests

### Terms of Service
- Service terms
- Limitation of liability
- Intellectual property
- Dispute resolution

---

# End of Improved Features Document
