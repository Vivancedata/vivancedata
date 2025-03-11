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

- **Framework**: Next.js 13+ (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI (built on Radix UI)
- **Animation**: Framer Motion
- **TypeScript**: For type safety and better developer experience
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

## SEO

- The site includes proper meta tags and structured data for SEO
- Each page has its own meta description and title
- JSON-LD schema is implemented for rich results in search engines

## Contact

For any inquiries, please reach out to us through the contact form on the website or email us at info@vivancedata.com.

## License

This project is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.
