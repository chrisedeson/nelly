# Portfolio Website

A modern, animated portfolio website for project managers built with Next.js 16, React 19, and Tailwind CSS 4.

## Features

- **Animated Landing Page**: Initial 100vh view with smooth transition to full portfolio
- **Admin Panel**: Easy-to-use content management without coding
- **Modern Tech Stack**: Next.js 16 App Router, React Server Components, TypeScript
- **Beautiful Animations**: Framer Motion for smooth, performant animations
- **Responsive Design**: Mobile-first approach, works on all devices
- **Contact Form**: Built-in contact form with database storage
- **Secure Authentication**: NextAuth.js for admin login
- **Database**: Vercel Postgres with direct SQL queries

## Tech Stack

- **Framework**: Next.js 16.0.3
- **UI Library**: React 19.2.0
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion 12.23.24
- **Authentication**: NextAuth 5.0.0-beta.30
- **Database**: Vercel Postgres
- **Storage**: Vercel Blob Storage
- **Fonts**: Raleway (headings), IBM Plex Mono (body)

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (or npm/yarn)
- Vercel account

### Installation

1. Clone the repository
2. Install dependencies:
```bash
pnpm install
```

3. Run development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000)

### Deployment

See **[SETUP.md](./SETUP.md)** for complete deployment instructions to Vercel with Postgres and Blob Storage.

## Project Structure

```
nelly/
├── app/                      # Next.js app directory
│   ├── admin/               # Admin panel pages
│   ├── api/                 # API routes
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles
├── components/              # React components
│   ├── admin/              # Admin UI components
│   └── [sections]          # Homepage sections
├── lib/                     # Utilities
│   ├── db/                 # Database
│   ├── db.ts               # Database queries
│   └── data.ts             # Data fetching
├── types/                   # TypeScript types
├── auth.ts                  # NextAuth configuration
├── SETUP.md                 # Deployment guide
└── task.md                  # Project requirements
```

## Admin Panel

Access at `/admin/login` after deployment.

### Features:
- **Hero Section**: Edit name, intro text, profile photo
- **Case Studies**: Manage project case studies
- **Testimonials**: Manage client testimonials
- **Recent Work**: Showcase latest projects
- **Companies**: Add company logos
- **Messages**: View contact form submissions

## Customization

### Colors
- Background: `#080808`
- Primary Green: `#3f8e00`
- Border Green: `#62ba1b`
- Gray Text: `#9c9c9c`

### Fonts
Edit `app/layout.tsx` to change fonts (using next/font/google)

## Development

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

## License

[MIT](LICENSE)

## Support

For setup help, see [SETUP.md](./SETUP.md)
