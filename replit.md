# AdmissionEU - European University Directory

## Overview

AdmissionEU (admissionEU.com) is a comprehensive web application that serves as a directory of accredited universities across Europe. The platform allows users to explore, search, and filter universities in Spain, Germany, Hungary, Italy, Poland, Netherlands, and France, with information about programs, languages, admission periods, and institutional details. The application provides a modern, responsive interface for discovering educational opportunities across European institutions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server
- **Wouter** for lightweight client-side routing
- **TanStack Query (React Query)** for server state management and data fetching
- **Tailwind CSS v4** with custom theming for styling
- **shadcn/ui** component library (New York variant) for consistent UI components
- CSS transitions for subtle UI effects (Framer Motion removed for performance)

**Design Decisions:**
- Component-based architecture with reusable UI components from shadcn/ui
- Custom theming with CSS variables for light/dark mode support
- Centralized state management through React Query for server data
- Type safety enforced across all components using TypeScript
- Responsive design with mobile-first approach

**Key Components:**
- `Hero` component with search functionality and country selection
- `UniversityCard` for displaying university information in grid layout
- `UniversityDetail` modal for detailed university information
- Comprehensive filtering system (country, region, type, domain, English programs)

### Backend Architecture

**Technology Stack:**
- **Express.js** for the REST API server
- **Node.js** with ES modules
- **TypeScript** for type safety across the stack
- **Drizzle ORM** for database operations
- **Zod** for schema validation

**API Structure:**
- RESTful endpoints under `/api` prefix
- Endpoints for countries, regions, and universities
- Search and filter capabilities
- CRUD operations for university data

**Key Endpoints:**
- `GET /api/countries` - Retrieve all countries
- `GET /api/countries/:country/regions` - Get regions by country
- `GET /api/countries/:country/universities` - Get universities by country
- `GET /api/universities` - Get all universities
- Search and filter endpoints for advanced queries

**Build Strategy:**
- Uses esbuild for server bundling with selective dependency bundling
- Allowlist approach for frequently-used dependencies to reduce cold start times
- Separate client and server builds with optimized production bundles

### Data Storage

**Database:**
- **PostgreSQL** via Neon serverless driver
- **Drizzle ORM** for type-safe database queries
- WebSocket support for real-time capabilities

**Schema Design:**
- Single `universities` table with comprehensive fields
- Array fields for languages and domains
- Boolean flags for filtering (e.g., `englishPrograms`)
- Auto-incrementing ranking field
- Support for multiple countries (Spain, Germany, and Hungary)

**Data Fields:**
- Institution metadata (name, country, region, city, type)
- Academic information (languages, domains, admission periods)
- URLs and branding (website, logoUrl)
- Descriptive content (description)
- Classification flags (type: Public/Private, englishPrograms)

### External Dependencies

**UI Component Library:**
- Radix UI primitives for accessible, unstyled components
- Custom wrapper components via shadcn/ui
- Lucide React for consistent iconography

**Database & ORM:**
- Neon Database (PostgreSQL serverless)
- Drizzle ORM with Drizzle Kit for migrations
- Connection pooling via WebSocket protocol

**Development Tools:**
- Replit-specific plugins for development experience
  - `@replit/vite-plugin-runtime-error-modal` for error handling
  - `@replit/vite-plugin-cartographer` for development tooling
  - `@replit/vite-plugin-dev-banner` for development banners
- Custom `vite-plugin-meta-images` for OpenGraph image handling

**Styling:**
- Tailwind CSS with JIT compiler
- Custom CSS variables for theming
- PostCSS with Autoprefixer
- Google Fonts (Inter and Plus Jakarta Sans)

**Form Handling:**
- React Hook Form with Zod resolvers for validation
- Integration with shadcn/ui form components

**Data Seeding:**
- Pre-populated data for Spanish universities (89 universities across all regions)
- German universities data (313 universities including research universities, Fachhochschulen, and specialized institutions)
- Hungarian universities data (50 universities including major research universities, medical schools, and specialized institutions)
- Italian universities data (50 universities including Politecnico di Milano, Bologna, La Sapienza and elite schools)
- Polish universities data (42 universities including University of Warsaw, Jagiellonian, and top medical schools)
- Dutch universities data (47 universities including TU Delft, University of Amsterdam, Wageningen, and leading applied sciences universities)
- French universities data (54 universities including Sorbonne, Sciences Po, HEC Paris, INSEAD, and top grandes écoles)
- Seed scripts for initial database population
- Total: 645 accredited European universities across 7 countries
- 93 cities across 7 countries for cost of living calculator
- 10 simplified study fields: Agriculture & Environment, Arts & Design, Business & Economics, Engineering & Technology, Law & Politics, Media & Communication, Medicine & Health, Sciences, Social Sciences & Humanities, Sports & Tourism

**Performance Optimizations:**
- UniversityCard memoized with React.memo() to prevent unnecessary re-renders
- useCallback handlers for stable function references
- useDeferredValue for search query to maintain UI responsiveness
- All Framer Motion animations removed for faster page loads (using CSS transitions instead)