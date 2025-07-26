# Fencing for Everyone - Website Development

## Overview

This is a full-stack web application for "Fencing for Everyone," a nonprofit organization that provides free fencing classes and equipment to underprivileged students. The application includes a comprehensive website with a gear donation marketplace, class registration system, and donation platform.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Build Tool**: Vite with development optimizations for Replit
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with JSON responses
- **Session Management**: Express sessions with PostgreSQL storage

### Authentication Strategy
- **Provider**: Replit Auth (OIDC-based authentication)
- **Session Storage**: PostgreSQL-backed sessions using connect-pg-simple
- **Security**: HTTP-only cookies with secure settings

## Key Components

### Database Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Schema Location**: `shared/schema.ts` - contains all table definitions
- **Migrations**: Managed via `drizzle-kit` with migrations in `./migrations` directory

### Core Data Models
- **Users**: Authentication and profile management
- **Marketplace Items**: Equipment donation and sharing system
- **Class Registrations**: Student enrollment in fencing programs
- **Contact Submissions**: General inquiry form submissions
- **Donations**: Financial contribution tracking
- **Equipment Requests**: Student requests for specific gear

### UI Component System
- **Library**: shadcn/ui built on Radix UI primitives
- **Theme**: Customizable design system with CSS variables
- **Responsive**: Mobile-first design with Tailwind breakpoints
- **Accessibility**: WCAG-compliant components from Radix UI

### Key Features
1. **Public Landing Pages**: Mission, services, about, contact
2. **Gear Marketplace**: Donation and request system for fencing equipment
3. **Class Registration**: Program enrollment with user authentication
4. **Donation Processing**: Financial contribution system with impact tracking
5. **User Dashboard**: Personalized view for authenticated users
6. **Photo Gallery**: Visual showcase of programs and community impact
7. **Intro Video Section**: Featured video content highlighting the organization's mission

## Data Flow

### Authentication Flow
1. User clicks login → redirected to Replit OAuth
2. Successful auth → user data stored/updated in database
3. Session created with PostgreSQL storage
4. Protected routes check authentication status

### Marketplace Flow
1. Donors post equipment with photos and details
2. Students browse and search available items
3. Request system connects donors with recipients
4. Availability tracking prevents duplicate requests

### Registration Flow
1. Users view available programs and schedules
2. Authentication required for registration
3. Form submission creates database record
4. Confirmation and follow-up communication

## External Dependencies

### Development Tools
- **Replit Integration**: Custom plugins for development environment
- **TypeScript**: Full type safety across frontend and backend
- **ESBuild**: Production build optimization

### Runtime Dependencies
- **Database**: Neon serverless PostgreSQL
- **Authentication**: Replit OIDC service
- **UI Icons**: Lucide React icon library
- **Date Handling**: date-fns utility library

### Development Environment
- **Hot Reload**: Vite HMR for frontend development
- **Error Handling**: Runtime error overlay for development
- **Path Aliases**: Simplified imports with @ and @shared prefixes

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite compiles React app to `dist/public`
2. **Backend Build**: ESBuild bundles server code to `dist/index.js`
3. **Database**: Drizzle migrations applied via `db:push` command

### Environment Configuration
- **Development**: `NODE_ENV=development` with Vite dev server
- **Production**: `NODE_ENV=production` with static file serving
- **Database**: `DATABASE_URL` environment variable required
- **Auth**: Replit-specific environment variables for OIDC

### Monorepo Structure
```
/client          - React frontend application
/server          - Express.js backend API
/shared          - Shared TypeScript types and schemas
/migrations      - Database migration files
/attached_assets - Project documentation and assets
```

### Session and Security
- PostgreSQL-backed sessions with automatic cleanup
- HTTPS-only cookies in production
- CORS protection and input validation
- Environment-specific security settings

The application follows a clean separation of concerns with shared types between frontend and backend, comprehensive error handling, and a scalable architecture suitable for a nonprofit organization's growing needs.