# Architecture Overview

## System Design

**Martyr Mohi School** is a full-stack learning management system with clean separation between:

### Public Layer
- Homepage, About, Location, Contact
- FAQ, Privacy Policy
- School information pages

### Authenticated Layer
- Student Dashboard
- Teacher Dashboard
- Parent Portal
- Administrative Functions

## Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 19 + TypeScript + Vite | UI/UX, client-side routing |
| **Styling** | Tailwind CSS + Radix UI | Responsive design, components |
| **State** | TanStack React Query | Server state management |
| **Auth** | Clerk | Multi-role authentication |
| **Backend** | Node.js + Express | REST API, business logic |
| **Language** | TypeScript | Type safety |
| **Database** | PostgreSQL (Supabase) | Data persistence |
| **ORM** | Prisma | Database abstraction |
| **Deployment** | Vercel (frontend) | Scalable hosting |

## Frontend Architecture

```
src/
├── config/
│   └── school.ts              # Single source of truth - school identity
├── constants/
│   ├── app.ts                 # App configuration
│   └── contact.ts             # Contact configuration
├── locales/
│   ├── ar.ts                  # Arabic translations
│   └── en.ts                  # English translations
├── data/
│   ├── about.ts               # About page content
│   ├── contact.ts             # Contact page data
│   ├── courses.ts             # Course listings (demo)
│   ├── faqs.ts                # FAQ content
│   ├── privacy.ts             # Privacy policy
│   └── teachers.ts            # Faculty data (empty state)
├── components/
│   ├── layout/                # Header, Footer, Navbar
│   ├── home/                  # Homepage components
│   ├── common/                # Reusable components
│   ├── dashboard/             # Dashboard components
│   └── ui/                    # UI primitives (Radix)
├── pages/
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Auth.tsx
│   └── ...
├── contexts/
│   ├── AuthContext.tsx        # Authentication state
│   └── LanguageContext.tsx    # i18n state
├── hooks/
│   ├── useCourses.ts
│   ├── useProfiles.ts
│   └── ...
├── services/
│   └── api.ts                 # API client
└── types/
    └── index.ts               # TypeScript definitions
```

## Backend Architecture

```
src/
├── config/
│   ├── index.ts               # Config loader
│   └── swagger.ts             # API documentation
├── middleware/
│   ├── auth.ts                # Clerk authentication
│   └── errorHandler.ts        # Error handling
├── routes/
│   ├── auth.ts
│   ├── courses.ts
│   ├── assignments.ts
│   └── ...
├── services/
│   ├── AuthService.ts
│   ├── CourseService.ts
│   └── ...
├── schemas/
│   └── (Zod validation schemas)
├── types/
│   └── index.ts               # DTO definitions
└── utils/
    ├── db.ts                  # Database utilities
    └── errors.ts              # Error classes
```

## Data Flow

### Public Routes
User → React Component → API Client → Express Route → Prisma Query → PostgreSQL

### Authenticated Routes
User (Authenticated) → React Component → API Client (+ Auth Token) → Express Route (Verified) → Service Layer → Database Query

## Authentication Flow

1. User opens app
2. Clerk detects session or shows login
3. AuthContext fetches user role from API
4. Dashboard rendered based on role (student/teacher/parent/admin)
5. API requests include Bearer token in Authorization header

## Data Integrity

### Verified Data
- School name (Arabic & English)
- Location (Mit Al-Rakha, Zefta, Gharbia)
- Plus Code (J6CG+9F2)
- Basic education classification

### Unavailable Data (Marked as "Not Published")
- Phone number
- Email address
- Teacher profiles
- Student count
- School code

### Demo Data (Marked as "Demo Sample")
- Courses (curriculum structure example)
- Statistics (platform features, not school facts)

## Security Considerations

1. **Authentication:** Clerk handles user management
2. **Authorization:** Role-based access control
3. **API Routes:** Protected with Clerk middleware
4. **Database:** Supabase PostgreSQL with security rules
5. **Environment Variables:** Secrets in .env (not committed)
6. **CORS:** Configured for Vercel deployment

## Scalability

- **Frontend:** Vercel auto-scaling
- **Backend:** Can be deployed to scalable services (Railway, Render)
- **Database:** Supabase handles auto-scaling
- **Static Assets:** Cached by CDN

## Development Workflow

1. **Local Development**
   - Frontend: `npm run dev` → http://localhost:5173
   - Backend: `npm run dev` → http://localhost:3000

2. **Testing**
   - Frontend: Component testing with Vitest
   - Backend: Service/route testing with Jest

3. **Deployment**
   - Frontend: Push to main → Vercel deploys automatically
   - Backend: Deploy separately to Node.js hosting
   - Database: Supabase managed

## Key Design Decisions

1. **Separation of Concerns:** School identity (config) separated from functionality
2. **Verified Data Only:** No fabricated statistics or information
3. **RTL-First:** Arabic as primary language, English secondary
4. **Bilingual:** Full i18n support
5. **Type Safety:** Strict TypeScript throughout
6. **Clean Architecture:** Layered approach for maintainability
