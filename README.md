# VivanceData - AI Solutions for Modern Businesses

![VivanceData](public/images/banner.png)

## Overview

VivanceData is a leading provider of AI solutions that transform businesses through intelligent automation. We combine cutting-edge AI technology with deep industry expertise to deliver solutions that drive real business outcomes. Our website showcases our services, case studies, and expertise in the AI space.

## Key Features

- **Comprehensive AI Solutions**: Presenting our AI services including Generative AI, Strategy Consulting, and more
- **Industry-Specific Solutions**: Tailored AI implementations for Finance, Healthcare, Retail, Manufacturing, etc.
- **Case Studies Showcase**: Real-world examples of successful AI implementations
- **Team Highlights**: Introducing our expert team of AI professionals
- **Client Testimonials**: Success stories from our satisfied clients
- **Responsive Design**: Fully optimized for all devices
- **Modern UI Components**: Using shadcn/ui and Tailwind CSS for a polished interface

## Tech Stack

- **Framework**: Next.js 16.0.1 (App Router + Turbopack)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with semantic color tokens
- **UI Components**: shadcn/ui (32+ components, Radix UI primitives)
- **Animation**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **AI Development**: Model Context Protocol (MCP) + 6 Specialized Agents
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm, yarn, or bun package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/vivancedata.git
cd vivancedata
```

2. Install dependencies
```bash
npm install
# or
yarn
# or
bun install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the site

## Testing

```bash
# Full release gate (unit + integration + e2e)
npm test

# Coverage gate (unit + integration)
npm run test:coverage

# Unit tests (with coverage)
npm run test:unit

# Integration tests
npm run test:integration

# E2E tests (Playwright)
npm run test:e2e

# React code health score
npm run react-doctor:ci
```

Production release gates are documented in:
- `docs/production-go-live-checklist.md`

## 🤖 AI-Powered Development

This project leverages **Model Context Protocol (MCP)** and **specialized AI agents** for enhanced development workflows.

### MCP Setup (8 Servers Configured)

The project includes 8 MCP servers for different capabilities:

- **next-devtools** - Real-time Next.js debugging and error detection
- **sequential-thinking** - Advanced reasoning for complex problem-solving
- **filesystem** - Secure file operations in project directory
- **git** - Version control operations and history
- **memory** - Persistent knowledge graph across sessions
- **brave-search** - Web search for research and current information
- **github** - GitHub repository management
- **fetch** - HTTP requests and API testing

📚 **Documentation**: See [MCP_SETUP.md](./MCP_SETUP.md) for detailed setup and usage.

### Specialized AI Agents (6 Configured)

Work with specialized agents for different aspects of development:

1. **content-creator** - AI content strategist for blog posts and case studies
2. **developer** - Full-stack Next.js specialist
3. **qa-tester** - Quality assurance and testing expert
4. **ui-designer** - UI/UX design and component specialist
5. **seo-optimizer** - SEO and search visibility expert
6. **integration-manager** - Third-party services and API specialist

📚 **Documentation**: See [AGENTS_GUIDE.md](./AGENTS_GUIDE.md) for agent workflows and examples.

### Quick Start with Agents

```bash
# Using Claude Code or MCP-compatible client

# Invoke specific agent
"Developer: Create a new AI pricing calculator tool"
"Content Creator: Write a blog post about AI ROI"
"QA Tester: Test all API endpoints"

# Multi-agent workflows
"All agents: Launch a new blog post about AI trends"
```

## Project Structure

```
vivancedata/
├── public/              # Static assets
│   ├── icons/           # Site icons
│   └── images/          # Site images
├── src/
│   ├── app/             # Next.js App Router pages
│   ├── components/      # React components
│   │   ├── about/       # About page components
│   │   ├── blog/        # Blog page components
│   │   ├── common/      # Shared components
│   │   ├── contact/     # Contact page components
│   │   ├── home/        # Home page components
│   │   ├── layout/      # Layout components
│   │   ├── services/    # Services page components
│   │   └── ui/          # UI components from shadcn
│   ├── config/          # Site configuration
│   ├── constants/       # Constants and data
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   └── types/           # TypeScript types
```

## Adding New Components

To add a new shadcn UI component:

```bash
npx shadcn-ui@latest add [component-name]
```

## Performance Considerations

- The site uses Next.js Image component for optimized image loading
- Components are split into smaller chunks for better code-splitting
- Animation is handled efficiently with Framer Motion

## Production Ops Notes

- API rate limiting uses Upstash Redis when `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are configured.
- If Upstash credentials are not set, API routes fall back to in-memory rate limiting (acceptable for local/dev only).
- Observability verification endpoint:
  - `GET /api/observability/sentry-test` for configuration status
  - `POST /api/observability/sentry-test` for protected manual event verification (`OBSERVABILITY_TEST_TOKEN` required)

## SEO

- The site includes proper meta tags and structured data for SEO
- Each page has its own meta description and title
- JSON-LD schema is implemented for rich results in search engines

## Contact

For any inquiries, please reach out to us through the contact form on the website or email us at info@vivancedata.com.

## License

This project is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.
