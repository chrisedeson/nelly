# Portfolio CMS

A full-stack portfolio website with a built-in content management system. Built with Next.js 16, TypeScript, and Neon Postgres.

## Features

- Fully customizable portfolio sections (Hero, Projects, Testimonials, Recent Work)
- Admin dashboard for content management
- Image upload with Vercel Blob Storage
- Contact form with email notifications (Resend)
- Social media links with official brand icons
- Company logos showcase
- Fully responsive design
- Built with Next.js App Router and Server Components

## Tech Stack

- **Framework:** Next.js 16.0.3
- **Database:** Neon Postgres
- **Authentication:** NextAuth v5
- **UI:** Radix UI + TailwindCSS
- **File Storage:** Vercel Blob
- **Email:** Resend
- **Deployment:** Vercel

## Getting Started

1. Clone the repository
2. Copy `.env.template` to `.env.local` and fill in your environment variables
3. Install dependencies: `pnpm install`
4. Setup database: `pnpm db:setup`
5. Run development server: `pnpm dev`

Default admin password: Contact developer Chris

## Environment Variables

See `.env.template` for required environment variables.
