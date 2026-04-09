# Skal Ventures - Investment Landing Page

## Overview
A Next.js 15.2.4 investment landing page ("Skal Ventures") with React 19, Tailwind CSS v3, and Three.js/React Three Fiber for WebGL animations. Migrated from Vercel to Replit.

## Architecture

- **Framework**: Next.js 15.2.4 (App Router)
- **Styling**: Tailwind CSS v3.4.x with PostCSS + Autoprefixer
- **3D/WebGL**: Three.js + React Three Fiber + Drei
- **UI Components**: Radix UI primitives + shadcn/ui components
- **Package Manager**: pnpm

## Key Files

- `app/` — Next.js App Router pages and layouts
- `app/globals.css` — Global CSS with Tailwind directives
- `app/layout.tsx` — Root layout (imports globals.css, Geist font)
- `components/` — React components
  - `components/hero.tsx` — Main hero section with WebGL animation
  - `components/gl/` — Three.js/WebGL components
- `tailwind.config.js` — Tailwind v3 configuration with custom theme
- `postcss.config.mjs` — PostCSS config (tailwindcss + autoprefixer)
- `next.config.ts` — Next.js config (ESLint/TS errors ignored, images unoptimized)

## Development

```bash
pnpm install
pnpm run dev  # Starts on port 5000
```

## Migration Notes (Vercel → Replit)

- Downgraded from Tailwind CSS v4 to v3 because `@tailwindcss/oxide` (the v4 Rust-based scanner) hangs indefinitely in the Replit sandbox environment
- Replaced Tailwind v4-specific directives (`@import "tailwindcss"`, `@utility`, `@theme inline`) with v3 equivalents (`@tailwind base/components/utilities`, `tailwind.config.js`)
- Added `allowedDevOrigins: ["*.replit.dev", "*.repl.co"]` to `next.config.ts` to suppress cross-origin warnings
- Server starts on port 5000 with `0.0.0.0` binding for Replit proxy compatibility
- WebGL features require GPU access — Three.js gracefully handles WebGL unavailability in headless environments
