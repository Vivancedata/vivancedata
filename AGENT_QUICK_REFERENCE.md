# Agent Quick Reference Card

## 🎯 Quick Commands

### Content Creation
```
"Content Creator: Write a blog post about [topic]"
"Content Creator: Update case studies with new AI metrics"
"Content Creator: Suggest 5 blog topics about AI ethics"
```

### Development
```
"Developer: Create a new AI cost estimator tool"
"Developer: What errors are in the application?"
"Developer: Add dark mode toggle to navigation"
```

### Testing
```
"QA Tester: Test all API endpoints"
"QA Tester: Run pre-deployment checklist"
"QA Tester: Check ROI Calculator with edge cases"
```

### Design
```
"UI Designer: Create an animated testimonial card"
"UI Designer: Improve loading states for blog posts"
"UI Designer: Add hover animations to service cards"
```

### SEO
```
"SEO Optimizer: Optimize meta tags for services page"
"SEO Optimizer: Research trending AI keywords"
"SEO Optimizer: Audit all pages for missing meta tags"
```

### Integrations
```
"Integration Manager: Set up Resend for contact form"
"Integration Manager: Configure Google Analytics"
"Integration Manager: Test email delivery"
```

---

## 📊 Agent Capabilities Matrix

| Agent | Primary MCP Servers | Best For | Model |
|-------|-------------------|----------|-------|
| **content-creator** | brave-search, memory, filesystem, git | Blog posts, case studies, content strategy | Sonnet |
| **developer** | next-devtools, filesystem, git, sequential-thinking | Features, debugging, API routes | Inherit |
| **qa-tester** | next-devtools, fetch, git | Testing, validation, bug detection | Haiku |
| **ui-designer** | filesystem, fetch, brave-search | Components, animations, design system | Sonnet |
| **seo-optimizer** | brave-search, filesystem, memory | SEO, keywords, meta tags | Sonnet |
| **integration-manager** | fetch, filesystem, git | APIs, third-party services | Sonnet |

---

## 🔄 Multi-Agent Workflows

### Launch New Feature
```
"Developer → UI Designer → QA Tester → SEO Optimizer"
```
1. Developer implements feature logic
2. UI Designer creates beautiful interface
3. QA Tester validates functionality
4. SEO Optimizer adds meta tags

### Create Blog Content
```
"Content Creator → SEO Optimizer → QA Tester"
```
1. Content Creator researches and writes
2. SEO Optimizer optimizes for search
3. QA Tester validates links and rendering

### Debug Production Issue
```
"QA Tester → Developer"
```
1. QA Tester identifies error
2. Developer implements fix
3. QA Tester verifies resolution

---

## 📁 Agent File Locations

```
.claude/
└── agents/
    ├── content-creator.md
    ├── developer.md
    ├── qa-tester.md
    ├── ui-designer.md
    ├── seo-optimizer.md
    └── integration-manager.md
```

---

## 🛠️ MCP Servers

### Always Available (No API Keys)
- ✅ next-devtools
- ✅ sequential-thinking
- ✅ filesystem
- ✅ git
- ✅ memory
- ✅ fetch

### Requires API Keys
- 🔑 brave-search (BRAVE_API_KEY)
- 🔑 github (GITHUB_PERSONAL_ACCESS_TOKEN)

---

## 🎨 Project Conventions

### Imports
```typescript
// ✅ Always use @/ alias
import { Button } from "@/components/ui/button"

// ❌ Never use relative paths
import { Button } from "../../components/ui/button"
```

### Component Organization
```
✅ src/components/blog/BlogCard.tsx
❌ src/components/cards/BlogCard.tsx
```

### File Naming
- Components: **PascalCase** (`BlogCard.tsx`)
- Utilities: **camelCase** (`formatDate.ts`)
- Constants: **camelCase** (`navigation.ts`)

### Client Components
```typescript
"use client"  // For interactive components
```

---

## 🚀 Common Workflows

### 1. Add New Blog Post
```bash
1. "Content Creator: Write blog post about [topic]"
   → Creates MDX file
   → Updates blog constants
   → Commits to git

2. "SEO Optimizer: Optimize new blog post"
   → Adds meta tags
   → Optimizes keywords
   → Updates sitemap

3. "QA Tester: Verify blog post renders correctly"
   → Tests links
   → Checks responsiveness
```

### 2. Create Interactive Tool
```bash
1. "Developer: Create [tool name]"
   → Designs logic
   → Creates components
   → Updates navigation

2. "UI Designer: Enhance [tool] interface"
   → Adds animations
   → Improves UX
   → Ensures responsive

3. "QA Tester: Test [tool] with edge cases"
   → Validates calculations
   → Tests error states
```

### 3. Pre-Production Deploy
```bash
1. "QA Tester: Run pre-deployment checklist"
   → Checks build
   → Tests APIs
   → Validates content

2. "Integration Manager: Verify production integrations"
   → Tests email delivery
   → Checks analytics
   → Verifies API keys

3. "SEO Optimizer: Final SEO audit"
   → Checks meta tags
   → Validates sitemap
   → Tests social sharing
```

---

## 📈 Success Metrics

### Developer
- ✅ 0 TypeScript errors
- ✅ 0 build warnings
- ✅ All routes generate

### QA Tester
- ✅ All API tests pass
- ✅ 0 broken links
- ✅ Forms work first try

### UI Designer
- ✅ WCAG AA accessible
- ✅ 60fps animations
- ✅ Mobile responsive

### SEO Optimizer
- ✅ Lighthouse SEO > 95
- ✅ All pages have meta tags
- ✅ Sitemap updated

### Content Creator
- ✅ 2000+ word posts
- ✅ SEO keywords integrated
- ✅ No placeholder content

### Integration Manager
- ✅ Emails deliver <30s
- ✅ Analytics tracking 100%
- ✅ Error monitoring active

---

## 🔗 Documentation Links

- [MCP Setup Guide](./MCP_SETUP.md) - Detailed MCP server configuration
- [Agents Guide](./AGENTS_GUIDE.md) - Complete agent workflows and examples
- [Project Instructions](./CLAUDE.md) - Development guidelines
- [Completion Summary](./COMPLETION_SUMMARY.md) - Feature list and metrics

---

## 💡 Pro Tips

1. **Be Specific**: "Developer: Add form validation" vs "Improve forms"
2. **Use Workflows**: Chain agents for complex tasks
3. **Check Twice**: Agents remember context across sessions
4. **Leverage Memory**: Agents store decisions in knowledge graph
5. **Parallel Work**: Multiple agents can work simultaneously
6. **Trust Agents**: They follow project conventions automatically

---

## 🆘 Troubleshooting

### Agent Not Responding
```bash
# Check if agent file exists
ls .claude/agents/

# Verify agent name is correct
cat .claude/agents/[agent-name].md
```

### MCP Server Not Working
```bash
# Check .mcp.json configuration
cat .mcp.json

# Verify API keys in .env.local
cat .env.local | grep API_KEY
```

### Build Errors
```bash
# Run TypeScript check
npx tsc --noEmit

# Run linter
npm run lint

# Clean build
rm -rf .next && npm run build
```

---

**Last Updated**: January 2025
**Next.js Version**: 16.0.1
**Total Agents**: 6
**Total MCP Servers**: 8
