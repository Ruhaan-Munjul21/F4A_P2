# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 web application for "Fencing for Everyone" (En Garde Foundation), a nonprofit organization making fencing accessible to everyone. The site was initially generated with v0.app and features registration, donation, programs showcase, and media galleries.

## Tech Stack

- **Framework**: Next.js 16.0.0 with App Router
- **React**: v19.2.0 with TypeScript 5
- **UI Components**: shadcn/ui (59 pre-built components based on Radix UI)
- **Styling**: Tailwind CSS 4.1.9 with PostCSS
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Analytics**: Vercel Analytics

## Development Commands

```bash
# Development server (http://localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint
```

## Architecture

### Directory Structure
- `app/` - Next.js App Router pages (home, about, programs, gallery, donate, register)
- `components/` - React components split into:
  - `ui/` - shadcn/ui component library (Button, Card, Dialog, Form, etc.)
  - Feature components (header, footer, sections, forms)
- `hooks/` - Custom React hooks (use-mobile, use-toast)
- `lib/utils.ts` - Tailwind class merging utilities
- `public/` - Static assets (37 fencing-related images)

### Key Pages
- `/` - Landing page with hero, about, programs, testimonials sections
- `/about` - Organization information
- `/programs` - Program offerings
- `/gallery` - Media showcase
- `/donate` - Donation interface
- `/register` - Registration form with validation

### Component Pattern
Components use shadcn/ui's pattern:
- Radix UI primitives for accessibility
- Class variance authority for variants
- Tailwind for styling
- TypeScript for type safety

Example component import:
```tsx
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
```

### Form Handling
Registration and other forms use:
```tsx
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
```

## Important Configuration

### TypeScript Path Aliases
The project uses `@/*` alias for imports from the root:
```tsx
import { Component } from "@/components/component"
```

### Tailwind Theme
- Primary color: Yellow (#FACC14)
- Background: Dark slate (#252525)
- Font: Rubik (Google Fonts)
- CSS variables defined in `app/globals.css`

### Build Configuration
`next.config.mjs` has:
- `ignoreBuildErrors: true` and `ignoreDuringBuilds: true` for ESLint/TypeScript
- `unoptimized: true` for images

## Development Notes

### Adding New Components
1. For UI components, check if shadcn/ui has it first: `npx shadcn@latest add [component]`
2. Place feature components in `components/` root
3. Keep UI primitives in `components/ui/`

### Working with Forms
Use the established pattern with React Hook Form + Zod:
```tsx
const formSchema = z.object({
  field: z.string().min(1, "Required"),
})

const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
})
```

### Styling Approach
Use Tailwind classes directly. For conditional styling:
```tsx
import { cn } from "@/lib/utils"
className={cn("base-classes", conditional && "conditional-classes")}
```

### Image Assets
Place new images in `public/` and reference as:
```tsx
<Image src="/image-name.jpg" alt="Description" />
```

## Common Tasks

### Add a New Page
1. Create directory in `app/[page-name]/`
2. Add `page.tsx` with default export
3. Update navigation in `components/header.tsx`

### Modify Theme Colors
Edit CSS variables in `app/globals.css` under `:root` and `.dark` selectors.

### Add Toast Notifications
```tsx
import { useToast } from "@/hooks/use-toast"
const { toast } = useToast()
toast({ title: "Success", description: "Message" })
```