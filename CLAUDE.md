# CLAUDE.md - AI Assistant Guide for Nelly

> **Last Updated:** 2025-11-18
> **Project:** Nelly - A Project Manager's Portfolio
> **Owner:** Christopher Edeson (edesonchristopher@gmail.com)
> **License:** Apache 2.0

## Table of Contents

- [Project Overview](#project-overview)
- [Current Project Status](#current-project-status)
- [Tech Stack](#tech-stack)
- [Repository Structure](#repository-structure)
- [Development Workflows](#development-workflows)
- [Git Conventions](#git-conventions)
- [Code Conventions](#code-conventions)
- [AI Assistant Guidelines](#ai-assistant-guidelines)
- [Deployment](#deployment)
- [Common Tasks](#common-tasks)

---

## Project Overview

**Nelly** is a modern portfolio website for a project manager, built to showcase professional experience, projects, skills, and accomplishments. The application is designed to be fast, responsive, and SEO-optimized using the Next.js framework.

### Project Goals

- Create a professional portfolio that highlights project management expertise
- Showcase completed projects with descriptions, technologies, and outcomes
- Provide an engaging user experience with modern web technologies
- Ensure optimal performance and accessibility
- Support easy content updates and maintenance

---

## Current Project Status

**Phase:** Initial Setup (Pre-Implementation)

The repository is currently in its early stages with only foundational configuration files:

```
✅ Git repository initialized
✅ Apache 2.0 license added
✅ .gitignore configured for Next.js/TypeScript
✅ README.md created
⏳ Application code (pending)
⏳ Dependencies (pending)
⏳ Build configuration (pending)
```

### Next Steps

1. Initialize Next.js project with TypeScript
2. Set up project structure (components, pages, styles)
3. Configure TypeScript settings
4. Install and configure necessary dependencies
5. Create initial page layouts and components
6. Implement portfolio content sections
7. Add responsive design and styling
8. Configure Vercel deployment
9. Implement SEO optimization
10. Add analytics and performance monitoring

---

## Tech Stack

### Core Technologies

| Technology | Purpose | Status |
|-----------|---------|--------|
| **Next.js** | React framework for production | Planned |
| **TypeScript** | Type-safe JavaScript | Planned |
| **React** | UI library | Planned |
| **Node.js** | JavaScript runtime | Planned |

### Planned Dependencies

- **Styling:** CSS Modules, Tailwind CSS, or styled-components (TBD)
- **UI Components:** Custom components or component library (TBD)
- **Icons:** React Icons or Heroicons (TBD)
- **Forms:** React Hook Form (if contact form needed)
- **Analytics:** Google Analytics or Vercel Analytics (TBD)
- **Content Management:** MDX or headless CMS (TBD)

### Development Tools

- **Package Manager:** npm or yarn
- **Version Control:** Git with SSH signing
- **Deployment:** Vercel
- **Code Quality:** ESLint, Prettier (TBD)
- **Testing:** Jest, React Testing Library (if needed)

---

## Repository Structure

### Current Structure

```
nelly/
├── .git/                 # Git version control
├── .gitignore           # Git ignore patterns (Next.js configured)
├── LICENSE              # Apache 2.0 license
├── README.md            # Project documentation
└── CLAUDE.md            # This file
```

### Planned Structure (Next.js App Router)

```
nelly/
├── app/                 # App directory (Next.js 13+ App Router)
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   ├── about/          # About page
│   ├── projects/       # Projects showcase
│   ├── contact/        # Contact page
│   └── api/            # API routes (if needed)
├── components/          # Reusable React components
│   ├── ui/             # UI components (buttons, cards, etc.)
│   ├── sections/       # Page sections (hero, portfolio, etc.)
│   └── layout/         # Layout components (header, footer)
├── public/              # Static assets
│   ├── images/         # Images and graphics
│   ├── documents/      # PDFs, resumes, etc.
│   └── favicon.ico     # Favicon
├── styles/              # Global styles and CSS modules
├── lib/                 # Utility functions and helpers
├── types/               # TypeScript type definitions
├── config/              # Configuration files
├── .env.local          # Local environment variables
├── .env.example        # Environment variable template
├── next.config.js      # Next.js configuration
├── tsconfig.json       # TypeScript configuration
├── package.json        # Dependencies and scripts
├── .eslintrc.json      # ESLint configuration
└── .prettierrc         # Prettier configuration
```

### File Organization Principles

1. **Component Organization:** Group related components together
2. **Feature-Based Structure:** Organize by feature/page when appropriate
3. **Separation of Concerns:** Keep logic, styles, and types separated
4. **Reusability:** Create reusable components in `components/ui/`
5. **Type Safety:** Define types in dedicated files or co-located with components

---

## Development Workflows

### Initial Setup (When Ready)

```bash
# Initialize Next.js with TypeScript
npx create-next-app@latest . --typescript --app --tailwind --eslint

# Install additional dependencies
npm install [packages]

# Create environment file
cp .env.example .env.local

# Start development server
npm run dev
```

### Development Process

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/feature-name
   ```

2. **Make Changes**
   - Write code following conventions
   - Test changes locally
   - Ensure TypeScript compiles without errors

3. **Check Code Quality**
   ```bash
   npm run lint           # Run ESLint
   npm run type-check     # Check TypeScript
   npm run build          # Test production build
   ```

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: descriptive commit message"
   ```

5. **Push to Remote**
   ```bash
   git push -u origin feature/feature-name
   ```

### Local Development Commands

```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Create production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Check TypeScript types
```

---

## Git Conventions

### Branch Naming

- **Feature branches:** `feature/description` or `feat/description`
- **Bug fixes:** `fix/description` or `bugfix/description`
- **Documentation:** `docs/description`
- **Refactoring:** `refactor/description`
- **Claude AI branches:** `claude/session-id` (auto-generated)

### Commit Messages

Follow conventional commits format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes

**Examples:**
```bash
feat: add project showcase component
fix: resolve responsive layout issue on mobile
docs: update setup instructions in README
refactor: extract hero section into reusable component
style: format code with Prettier
```

### Git Configuration

- **Commit Signing:** Enabled with SSH keys
- **Remote:** GitHub repository via local proxy
- **Default Branch:** `main` (or `master`)
- **Protected Branches:** Main branch should be protected

### Push Operations

Always use the `-u` flag for first push:
```bash
git push -u origin branch-name
```

For network failures, retry up to 4 times with exponential backoff (2s, 4s, 8s, 16s).

---

## Code Conventions

### TypeScript Guidelines

1. **Type Everything:** Avoid using `any` type
2. **Interface Over Type:** Prefer interfaces for object shapes
3. **Explicit Return Types:** Define return types for functions
4. **Strict Mode:** Enable strict TypeScript checks
5. **Type Imports:** Use type-only imports when possible

```typescript
// Good
interface ProjectProps {
  title: string;
  description: string;
  imageUrl: string;
}

export function ProjectCard({ title, description, imageUrl }: ProjectProps): JSX.Element {
  return <div>...</div>;
}

// Bad
function ProjectCard(props: any) {
  return <div>...</div>;
}
```

### React Component Guidelines

1. **Functional Components:** Use function components with hooks
2. **Named Exports:** Use named exports for components
3. **Component Organization:**
   ```typescript
   // 1. Imports
   // 2. Types/Interfaces
   // 3. Component definition
   // 4. Exports
   ```
4. **Props Destructuring:** Destructure props in function signature
5. **Single Responsibility:** Keep components focused on one task

### File Naming Conventions

- **Components:** PascalCase (e.g., `ProjectCard.tsx`)
- **Utilities:** camelCase (e.g., `formatDate.ts`)
- **Pages:** lowercase with hyphens (e.g., `about-me/page.tsx`)
- **Types:** PascalCase (e.g., `Project.types.ts`)
- **Constants:** UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.ts`)

### Styling Conventions

- Use consistent styling approach (CSS Modules or Tailwind)
- Follow mobile-first responsive design
- Use CSS variables for theme colors and spacing
- Ensure accessibility (ARIA labels, semantic HTML)
- Test on multiple screen sizes

### Code Quality Standards

- **Linting:** All code must pass ESLint checks
- **Type Safety:** No TypeScript errors allowed
- **Build Success:** Code must build without errors
- **Formatting:** Use consistent code formatting (Prettier)
- **Comments:** Add comments for complex logic only
- **Documentation:** Document public APIs and components

---

## AI Assistant Guidelines

### When Working with This Repository

1. **Understand Context First**
   - Read relevant files before making changes
   - Understand the project structure and conventions
   - Check existing patterns and follow them

2. **Plan Before Implementation**
   - Create a todo list for multi-step tasks
   - Break down complex features into smaller tasks
   - Ask for clarification on ambiguous requirements

3. **Follow Conventions**
   - Use TypeScript with proper typing
   - Follow the established naming conventions
   - Match the existing code style
   - Use functional React components

4. **Quality Assurance**
   - Test changes work as expected
   - Run linting and type checking
   - Ensure responsive design works on all devices
   - Verify accessibility standards are met
   - Check that builds complete successfully

5. **Communication**
   - Provide clear explanations of changes
   - Reference file paths with line numbers (e.g., `app/page.tsx:42`)
   - Ask questions when requirements are unclear
   - Suggest improvements or alternatives when appropriate

6. **Git Operations**
   - Work on feature branches (avoid committing directly to main)
   - Use conventional commit messages
   - Push changes with `git push -u origin branch-name`
   - Only commit when explicitly requested

7. **Security Considerations**
   - Never commit `.env` files with secrets
   - Avoid adding sensitive information to code
   - Use environment variables for configuration
   - Follow security best practices (XSS, CSRF prevention)

8. **Documentation**
   - Update documentation when making significant changes
   - Add JSDoc comments for complex functions
   - Keep README.md and CLAUDE.md up to date
   - Document new dependencies and their purpose

### Common Pitfalls to Avoid

❌ Using `any` type in TypeScript
❌ Committing without testing
❌ Creating files unnecessarily (prefer editing existing files)
❌ Ignoring ESLint errors
❌ Missing responsive design considerations
❌ Forgetting to update documentation
❌ Hard-coding values that should be configurable
❌ Mixing different styling approaches

### Helpful Commands Reference

```bash
# Search for files
find . -name "*.tsx" -type f

# Search for code patterns
grep -r "searchTerm" --include="*.ts" --include="*.tsx"

# Check git status
git status

# View recent commits
git log --oneline -n 10

# Check current branch
git branch --show-current

# View file with line numbers
cat -n file.txt
```

---

## Deployment

### Deployment Platform

**Vercel** (configured in `.gitignore`)

### Deployment Process

1. **Connect Repository:** Link GitHub repository to Vercel
2. **Configure Settings:** Set environment variables in Vercel dashboard
3. **Automatic Deployments:** Push to main branch triggers deployment
4. **Preview Deployments:** Pull requests get preview URLs

### Environment Variables

When the project is set up, document required environment variables:

```env
# .env.example
NEXT_PUBLIC_SITE_URL=https://nelly.example.com
NEXT_PUBLIC_GA_ID=UA-XXXXXXXXX-X
# Add other variables as needed
```

### Pre-Deployment Checklist

- [ ] All tests pass
- [ ] TypeScript compiles without errors
- [ ] ESLint checks pass
- [ ] Build completes successfully
- [ ] Environment variables configured
- [ ] SEO meta tags added
- [ ] Performance optimized
- [ ] Accessibility tested

---

## Common Tasks

### Adding a New Page

1. Create page file in `app/` directory
2. Define page component with proper types
3. Add metadata for SEO
4. Update navigation if needed
5. Test responsive design

### Adding a New Component

1. Create component file in `components/`
2. Define TypeScript interfaces for props
3. Implement component with proper typing
4. Add to exports if needed
5. Document usage with comments

### Updating Dependencies

```bash
# Check for outdated packages
npm outdated

# Update specific package
npm update package-name

# Update all packages (carefully)
npm update

# Check for security vulnerabilities
npm audit
```

### Debugging Issues

1. Check browser console for errors
2. Review Next.js terminal output
3. Verify environment variables are set
4. Clear `.next/` cache and rebuild
5. Check TypeScript compilation errors

### Optimizing Performance

- Use Next.js Image component for images
- Implement lazy loading for heavy components
- Minimize bundle size (check `npm run build` output)
- Use code splitting for large features
- Optimize fonts with `next/font`
- Implement caching strategies

---

## Additional Resources

### Next.js Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [App Router Guide](https://nextjs.org/docs/app)
- [TypeScript with Next.js](https://nextjs.org/docs/basic-features/typescript)

### React Documentation
- [React Docs](https://react.dev/)
- [React Hooks](https://react.dev/reference/react)

### TypeScript Documentation
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TypeScript with React](https://react-typescript-cheatsheet.netlify.app/)

### Deployment
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel with Next.js](https://vercel.com/docs/frameworks/nextjs)

---

## Notes for Future Development

### Features to Consider

- **Blog/Articles:** Share project management insights
- **Case Studies:** Detailed project breakdowns
- **Contact Form:** Allow visitors to reach out
- **Testimonials:** Showcase client feedback
- **Resume/CV Download:** PDF download option
- **Dark Mode:** Theme toggle
- **Animations:** Subtle animations for engagement
- **Search:** Search functionality for projects/articles
- **Analytics:** Track visitor engagement
- **CMS Integration:** Easy content updates

### Technical Enhancements

- **Performance Monitoring:** Implement Lighthouse CI
- **Testing:** Add unit and integration tests
- **CI/CD Pipeline:** Automated testing and deployment
- **Error Tracking:** Sentry or similar tool
- **Internationalization:** Multi-language support
- **Progressive Web App:** PWA capabilities
- **Sitemap:** Auto-generated sitemap.xml
- **RSS Feed:** For blog content

---

## Conclusion

This document serves as a comprehensive guide for AI assistants working with the Nelly portfolio project. As the project evolves, this document should be updated to reflect new conventions, patterns, and architectural decisions.

**Remember:** The goal is to create a high-quality, professional portfolio that effectively showcases project management expertise while maintaining clean, maintainable code.

---

**For questions or clarifications, contact:** edesonchristopher@gmail.com
**License:** Apache 2.0 - See LICENSE file for details
