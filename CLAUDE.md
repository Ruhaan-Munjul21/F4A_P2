# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Fencing for Everyone (F4A_P2)** - Full-stack web application for a nonprofit fencing organization with CMS capabilities, player management, and public website features.

## Architecture Overview

This is a **monorepo** with strict separation between client, server, and shared code:

```
client/           # React + Vite frontend
server/           # Express.js backend
shared/           # Type definitions shared between client & server
  └── schema.ts   # Source of truth for all database types
```

**Key Architectural Decisions:**
- Monorepo structure with shared types for type safety
- Database-first design with Drizzle ORM
- Component-based architecture using shadcn/ui
- RESTful API with clear public/admin separation
- Firebase Storage for media with automatic thumbnails

## Technology Stack

### Frontend
- **React** 18.3.1 with TypeScript
- **Vite** 5.4.19 build tool
- **TanStack Query** 5.60.5 for data fetching
- **Wouter** for routing (lightweight)
- **Tailwind CSS** + **shadcn/ui** components
- **React Hook Form** + **Zod** for forms/validation

### Backend
- **Express.js** 4.21.2
- **Drizzle ORM** 0.39.1 with PostgreSQL
- **Neon** serverless PostgreSQL
- **Firebase Admin SDK** for storage
- **Replit Auth** + Passport.js support

## Database Schema

All schemas defined in `shared/schema.ts` using Drizzle ORM:

```typescript
// Main tables (11 total)
players         // Player profiles
adminUsers      // Admin authentication
aboutUs         // About page content
blogs           // Blog posts
news            // News articles
sponsors        // Sponsor information
tournaments     // Tournament data
eventTypes      // Event categories
eventTimes      // Event schedules
homepageCarousel // Homepage slideshow
images          // Media storage references
```

## Development Commands

```bash
# Install dependencies
npm install

# Development (runs both client and server)
npm run dev

# Type checking
npm run check         # Check TypeScript types

# Database
npm run db:generate   # Generate Drizzle migrations
npm run db:migrate    # Apply migrations
npm run db:push       # Push schema to database
npm run db:studio     # Open Drizzle Studio GUI

# Production
npm run build         # Build both client and server
npm run preview       # Preview production build
npm start             # Start production server

# Testing individual components
cd client && npm run dev    # Frontend only
cd server && npm run dev    # Backend only
```

## API Routes

### Public Routes (`/api/*`)
- `GET /api/players` - Player listings
- `GET /api/aboutUs` - About page data
- `GET /api/blogs` - Blog posts
- `GET /api/news` - News articles
- `GET /api/sponsors` - Sponsor information
- `GET /api/tournaments` - Tournament data
- `GET /api/homepage-carousel` - Homepage slides

### Admin Routes (`/api/admin/*`)
All require authentication via session cookie:
- `/api/admin/auth/*` - Authentication endpoints
- `/api/admin/players/*` - Player management
- `/api/admin/aboutUs/*` - About page editing
- `/api/admin/blogs/*` - Blog management
- `/api/admin/news/*` - News management
- `/api/admin/sponsors/*` - Sponsor management
- `/api/admin/tournaments/*` - Tournament management
- `/api/admin/homepage-carousel/*` - Carousel management
- `/api/admin/upload` - File upload endpoint

## Storage & Media

Firebase Storage is configured for media uploads:
- Automatic thumbnail generation for images
- Fallback URLs for missing images
- Storage paths: `players/`, `blogs/`, `news/`, `sponsors/`, `carousel/`

Configuration in `server/src/config/firebase.ts` requires:
```env
FIREBASE_PRIVATE_KEY
FIREBASE_CLIENT_EMAIL
FIREBASE_PROJECT_ID
FIREBASE_STORAGE_BUCKET
```

## State Management

- **TanStack Query** for server state
- React hooks for local state
- No global state management library
- Query keys follow pattern: `['resource', id?]`

Example:
```typescript
useQuery({
  queryKey: ['players'],
  queryFn: api.getPlayers
})
```

## Authentication

Two authentication systems:
1. **Replit Auth** (primary) - OAuth via Replit
2. **Passport.js** (fallback) - Local strategy

Session-based authentication with cookies. Check `req.session.user` in backend.

## Environment Variables

Required in `.env`:
```
# Database
DATABASE_URL=postgresql://...

# Firebase Storage
FIREBASE_PRIVATE_KEY=...
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PROJECT_ID=...
FIREBASE_STORAGE_BUCKET=...

# Server
PORT=3000
SESSION_SECRET=...

# Optional
REPLIT_DB_URL=...
```

## Key Client Components

### Pages (client/src/pages/)
- `Home.tsx` - Landing page with carousel
- `AboutUs.tsx` - Organization information
- `Players.tsx` - Player directory
- `NewsPage.tsx` - News listings
- `BlogPage.tsx` - Blog listings
- `admin/*` - Admin dashboard pages

### Custom Components (client/src/components/)
- `Navbar.tsx` - Main navigation
- `Footer.tsx` - Site footer
- `CarouselSection.tsx` - Homepage carousel
- `PlayerCard.tsx` - Player display cards
- `NewsCard.tsx` - News article cards
- `BlogCard.tsx` - Blog post cards
- `tournament/*` - Tournament display components

### UI Components
50+ shadcn/ui components in `client/src/components/ui/` - always prefer these for consistency.

## Development Workflow

1. **Before starting:** Run `npm install` and `npm run db:push`
2. **Development:** Use `npm run dev` for hot-reload
3. **Type checking:** Run `npm run check` frequently
4. **Database changes:** Edit `shared/schema.ts`, then `npm run db:push`
5. **Adding API endpoints:** Update both server route and client API service
6. **Component development:** Use shadcn/ui components as base
7. **Before commit:** Ensure `npm run check` passes

## Common Tasks

### Add a new database table
1. Define schema in `shared/schema.ts`
2. Run `npm run db:push`
3. Create API endpoints in `server/src/index.ts`
4. Add client API methods in `client/src/services/api.ts`
5. Create React components with TanStack Query

### Add a new admin page
1. Create page component in `client/src/pages/admin/`
2. Add route in `client/src/App.tsx` under admin routes
3. Implement CRUD operations using TanStack Query
4. Add navigation link in admin dashboard

### Deploy changes
1. Run `npm run build`
2. Test with `npm run preview`
3. Deploy `dist/` folder (client) and `server/dist/` (server)
4. Set environment variables on hosting platform

## Code Patterns

### API Service Pattern
```typescript
// client/src/services/api.ts
export const api = {
  async getResource() {
    const response = await fetch('/api/resource');
    if (!response.ok) throw new Error('Failed');
    return response.json();
  }
};
```

### Query Hook Pattern
```typescript
// In React component
const { data, isLoading, error } = useQuery({
  queryKey: ['resource'],
  queryFn: api.getResource
});
```

### Form Validation Pattern
```typescript
// Use Zod schemas
const schema = z.object({
  name: z.string().min(1),
  email: z.string().email()
});
```

## Important Files

- `shared/schema.ts` - Database schema (source of truth)
- `client/src/services/api.ts` - All API calls
- `server/src/index.ts` - Main server file with all routes
- `server/src/db.ts` - Database connection
- `client/src/App.tsx` - Route definitions
- `vite.config.ts` - Build configuration
- `drizzle.config.ts` - Database configuration

## Performance Considerations

- Images are automatically optimized via Firebase thumbnails
- Use React.lazy() for code splitting on routes
- TanStack Query handles caching automatically
- Database queries use indexes on primary keys
- Static assets served through Vite in production

## Debugging Tips

- Check browser DevTools Network tab for API failures
- Use Drizzle Studio (`npm run db:studio`) to inspect database
- Server logs to console in development
- React Query DevTools available in development
- TypeScript errors shown via `npm run check`

## Security Notes

- All admin routes require authentication
- Environment variables for sensitive data
- CORS configured for production domain
- Session cookies with httpOnly flag
- Input validation with Zod schemas
- SQL injection prevented via Drizzle ORM
