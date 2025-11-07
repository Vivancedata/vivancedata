# Multi-Agent System Guide

This project uses a sophisticated multi-agent system where specialized AI agents work together to build, maintain, and optimize the VivanceData website. Each agent has specific expertise and access to relevant MCP servers.

## 🤖 Meet Your Agent Team

### 1. **Content Creator Agent** 📝
**Role:** AI Content Strategist & Writer

**Specializes in:**
- Researching AI trends using Brave Search
- Writing comprehensive MDX blog posts (2000-3500 words)
- Creating compelling case studies with real metrics
- Maintaining content calendar and avoiding topic duplication
- SEO-optimized content with proper meta tags

**MCP Servers:** `brave-search`, `memory`, `filesystem`, `fetch`, `git`

**Example Commands:**
```
"Content Creator: Research and write a blog post about AI implementation challenges in 2025"
"Content Creator: Update case studies with new AI ROI statistics"
"Content Creator: What blog topics have we covered? Suggest 5 new ones"
```

**Workflow Example:**
1. Searches web for "AI adoption trends 2025" using Brave Search
2. Checks memory for existing blog topics to avoid duplication
3. Structures outline with sequential thinking
4. Creates MDX file in `src/app/blog/posts/new-topic/`
5. Updates `src/constants/blog.ts` with metadata
6. Commits to git with descriptive message

---

### 2. **Developer Agent** 💻
**Role:** Full-Stack Next.js Specialist

**Specializes in:**
- Building interactive tools (ROI Calculator, AI Assessment)
- Creating React components with TypeScript
- Setting up API routes (`/api/contact`, `/api/newsletter`)
- Debugging with Next.js DevTools MCP
- Performance optimization

**MCP Servers:** `next-devtools`, `filesystem`, `git`, `sequential-thinking`, `fetch`, `github`

**Example Commands:**
```
"Developer: Create a new AI Cost Calculator tool"
"Developer: Debug the current errors in the application"
"Developer: Add a new API endpoint for form submissions"
"Developer: Implement dark mode toggle improvement"
```

**Workflow Example - Creating New Tool:**
1. Uses sequential thinking to design architecture
2. Creates component: `src/components/tools/AICalculator.tsx`
3. Creates page: `src/app/tools/ai-calculator/page.tsx`
4. Updates navigation: `src/constants/navigation.ts`
5. Tests with next-devtools in real-time
6. Commits with proper TypeScript types

---

### 3. **QA Tester Agent** 🧪
**Role:** Quality Assurance & Validation Specialist

**Specializes in:**
- Real-time error monitoring via Next.js DevTools
- API endpoint testing (contact form, newsletter)
- Form validation and edge case testing
- Pre-deployment checklists
- Creating GitHub issues for bugs

**MCP Servers:** `next-devtools`, `fetch`, `filesystem`, `git`, `github`

**Example Commands:**
```
"QA Tester: Test all API endpoints and report status"
"QA Tester: Verify the ROI Calculator with edge cases"
"QA Tester: Run pre-deployment checklist"
"QA Tester: Check for any current errors in the application"
```

**Test Scenarios:**
- Contact form with invalid email → Should show validation error
- ROI Calculator with 0 employees → Should handle gracefully
- Newsletter with duplicate email → Should show appropriate message
- All blog links → Should return 200 status codes

---

### 4. **UI Designer Agent** 🎨
**Role:** Design System & Component Specialist

**Specializes in:**
- Creating beautiful shadcn/ui components
- Framer Motion animations
- Color system and theming
- Responsive design (mobile-first)
- Loading states and skeleton screens

**MCP Servers:** `filesystem`, `next-devtools`, `fetch`, `brave-search`, `git`

**Example Commands:**
```
"UI Designer: Create an animated pricing card component"
"UI Designer: Improve the loading state for blog posts"
"UI Designer: Audit color consistency across all components"
"UI Designer: Add micro-interactions to the contact form"
```

**Design Principles:**
- Uses HSL CSS variables for colors
- Spring physics for smooth animations
- 8px grid system for spacing
- Dark mode compatible
- WCAG AA accessibility standards

---

### 5. **SEO Optimizer Agent** 🔍
**Role:** Search Engine Optimization Specialist

**Specializes in:**
- Meta tag optimization (title, description, keywords)
- OpenGraph and Twitter Card setup
- Sitemap and robots.txt management
- Keyword research using Brave Search
- Core Web Vitals monitoring

**MCP Servers:** `brave-search`, `filesystem`, `fetch`, `memory`, `git`

**Example Commands:**
```
"SEO Optimizer: Optimize meta tags for the services page"
"SEO Optimizer: Research keywords for AI consulting niche"
"SEO Optimizer: Audit all pages for missing meta tags"
"SEO Optimizer: Update sitemap with new blog posts"
```

**Target Keywords:**
- "AI consulting services"
- "generative AI solutions"
- "AI implementation strategy"
- "AI ROI calculator"
- "enterprise AI adoption"

---

### 6. **Integration Manager Agent** 🔌
**Role:** Third-Party Services Specialist

**Specializes in:**
- Email service setup (Resend, SendGrid)
- Newsletter integration (ConvertKit, Mailchimp)
- Analytics configuration (GA4, Vercel Analytics)
- API key management
- Testing external integrations

**MCP Servers:** `fetch`, `filesystem`, `brave-search`, `git`, `memory`

**Example Commands:**
```
"Integration Manager: Set up Resend for contact form emails"
"Integration Manager: Configure ConvertKit newsletter integration"
"Integration Manager: Test email delivery in production"
"Integration Manager: Add Google Analytics 4 tracking"
```

**Managed Integrations:**
- ✅ Resend API (email delivery)
- ⏳ ConvertKit (newsletter)
- ⏳ Google Analytics 4
- ⏳ Sentry (error tracking)

---

## 🤝 Collaborative Workflows

### Workflow 1: Launch New Feature

**Agents Involved:** Developer → UI Designer → QA Tester → SEO Optimizer

**Example: Creating "AI Cost Estimator" Tool**

1. **Developer** (Sequential)
   ```
   - Designs calculator logic
   - Creates component structure
   - Implements business logic
   - Sets up TypeScript types
   ```

2. **UI Designer** (Parallel with Developer on UI)
   ```
   - Creates beautiful input fields
   - Adds smooth animations
   - Designs result cards
   - Ensures responsive design
   ```

3. **QA Tester** (After Developer + UI Designer)
   ```
   - Tests calculations with various inputs
   - Verifies edge cases (0, negative, huge numbers)
   - Tests on mobile devices
   - Checks form validation
   ```

4. **SEO Optimizer** (Parallel with QA Tester)
   ```
   - Adds meta tags
   - Optimizes page title/description
   - Creates OG image
   - Updates sitemap
   ```

**Result:** Production-ready feature in hours, not days!

---

### Workflow 2: Create Blog Content

**Agents Involved:** Content Creator → SEO Optimizer → QA Tester

**Example: "The Future of AI Agents in Enterprise" Blog Post**

1. **Content Creator**
   ```bash
   User: "Content Creator: Write a blog post about AI agents in enterprise"

   Agent Actions:
   - brave-search: "AI agents enterprise 2025 trends"
   - memory: Check existing blog topics
   - sequential-thinking: Structure article outline
   - filesystem: Create src/app/blog/posts/ai-agents-enterprise/page.mdx
   - filesystem: Update src/constants/blog.ts
   - git: Commit changes
   ```

2. **SEO Optimizer**
   ```bash
   Agent Actions:
   - brave-search: "AI agents enterprise" keyword research
   - filesystem: Add optimized meta tags
   - filesystem: Update title for SEO
   - memory: Store keyword strategy
   - git: Commit SEO improvements
   ```

3. **QA Tester**
   ```bash
   Agent Actions:
   - next-devtools: Check for rendering errors
   - fetch: Test all external links
   - filesystem: Verify image paths
   - github: Create issue if problems found
   ```

**Time Saved:** 3-4 hours → 30 minutes

---

### Workflow 3: Debug Production Issue

**Agents Involved:** QA Tester → Developer

**Example: Contact Form Not Sending Emails**

1. **QA Tester** (Detection)
   ```bash
   User: "QA Tester: The contact form isn't working"

   Agent Actions:
   - next-devtools: get_errors (check for runtime errors)
   - fetch: Test POST /api/contact with sample data
   - Result: "API returns 500 error, RESEND_API_KEY missing"
   ```

2. **Developer** (Fix)
   ```bash
   Agent Actions:
   - sequential-thinking: Analyze error root cause
   - filesystem: Check src/app/api/contact/route.ts
   - filesystem: Verify .env.local configuration
   - Fix: Add proper error handling for missing API key
   - next-devtools: Test fix
   - git: Commit with detailed message
   ```

3. **QA Tester** (Verification)
   ```bash
   Agent Actions:
   - fetch: Re-test POST /api/contact
   - Verify: Form now shows user-friendly error message
   - github: Close related issue
   ```

**Resolution Time:** 15 minutes instead of hours of debugging

---

## 🎯 Agent Invocation Examples

### Quick Commands

```bash
# Content
"Content Creator: Suggest 5 blog topics about AI ethics"
"Content Creator: Write a case study for financial services"

# Development
"Developer: What errors are in the application right now?"
"Developer: Create a chatbot widget component"
"Developer: Optimize the ROI Calculator performance"

# Testing
"QA Tester: Test the newsletter signup flow"
"QA Tester: Check all navigation links"
"QA Tester: Run pre-deployment checklist"

# Design
"UI Designer: Improve the loading skeleton for blog cards"
"UI Designer: Add hover animations to service cards"
"UI Designer: Audit dark mode consistency"

# SEO
"SEO Optimizer: Find trending AI keywords for our niche"
"SEO Optimizer: Optimize all tool pages for search"

# Integration
"Integration Manager: Set up Google Analytics 4"
"Integration Manager: Test Resend email delivery"
```

### Complex Multi-Agent Commands

```bash
# Launch complete feature
"All agents: Launch a new 'AI Implementation Roadmap' interactive tool with full testing and SEO"

# Content sprint
"Content Creator + SEO Optimizer: Create 3 blog posts about generative AI trends"

# Production deployment
"QA Tester + Integration Manager + SEO Optimizer: Prepare for production deployment"

# Emergency fix
"Developer + QA Tester: Fix the broken contact form ASAP"
```

---

## 📊 Agent Monitoring Dashboard

### Health Metrics

Each agent reports health metrics:

| Agent | Metric | Tool | Status |
|-------|--------|------|--------|
| Developer | Build Status | next-devtools | ✅ 0 errors |
| QA Tester | API Health | fetch | ✅ All endpoints OK |
| SEO Optimizer | Meta Tags | filesystem | ✅ All pages optimized |
| UI Designer | Theme Consistency | filesystem | ✅ Dark mode working |
| Content Creator | Blog Count | memory | ✅ 7 posts |
| Integration Manager | Services | fetch | ⏳ 2/5 integrated |

### Collaboration Score

Tracks how well agents work together:
- **Handoffs:** Clean git commits between agents
- **Speed:** Time from feature request to deployment
- **Quality:** Issues caught before production

---

## 🚀 Getting Started

### 1. Start Your Dev Server
```bash
npm run dev
```

### 2. Invoke an Agent
```bash
# In your MCP-compatible client (Claude Code, etc.)
"Developer: What's the current state of the application?"
```

### 3. Use Collaborative Workflows
```bash
"All agents: Let's launch a new blog post about AI cost reduction"
```

### 4. Monitor Progress
```bash
"QA Tester: Show me the health dashboard"
```

---

## 🎓 Best Practices

### For Users:

1. **Be Specific:**
   - ❌ "Make the site better"
   - ✅ "UI Designer: Add animations to the pricing cards"

2. **Use Right Agent:**
   - Content questions → Content Creator
   - Technical bugs → Developer + QA Tester
   - Design improvements → UI Designer

3. **Leverage Workflows:**
   - Use pre-defined collaborative workflows
   - Let agents coordinate automatically

4. **Trust Agent Memory:**
   - Agents remember context across sessions
   - They know your project conventions

### For Agents:

1. **Communicate via Git:**
   - Clear commit messages
   - Reference related changes

2. **Use Memory for Context:**
   - Store important decisions
   - Share learnings with other agents

3. **Fail Gracefully:**
   - If blocked, create GitHub issue
   - Pass to appropriate agent

4. **Document Actions:**
   - Log what you did
   - Explain why you made decisions

---

## 🔧 Configuration

### Customize Agents

Edit `.agents.json` to:
- Add new agents
- Modify workflows
- Change MCP server access
- Adjust collaboration rules

### Add New Workflows

```json
{
  "workflows": {
    "your-workflow": {
      "agents": ["agent1", "agent2"],
      "steps": [...]
    }
  }
}
```

---

## 🤝 Agent Communication Protocol

### Handoff Process

1. Agent A completes task
2. Commits to git with tag: `[Agent: A → B]`
3. Agent B pulls latest
4. Agent B reviews change in memory
5. Agent B continues workflow

### Conflict Resolution

- **Technical:** Developer has final say
- **Content:** Content Creator decides
- **Design:** UI Designer decides
- **Priority:** Production bugs > Features

---

## 📚 Real-World Examples

### Example 1: Zero to Blog Post in 30 Minutes

```
User: "Content Creator: Write a comprehensive blog post about AI ROI calculations"

[Content Creator activates]
→ Researches AI ROI trends via Brave Search
→ Checks memory for existing ROI content
→ Creates outline with sequential thinking
→ Writes 2,500 word blog post
→ Creates MDX file
→ Updates blog constants
→ Commits to git

[SEO Optimizer activates automatically]
→ Researches "AI ROI" keywords
→ Optimizes meta tags
→ Creates social sharing image
→ Updates sitemap
→ Commits SEO changes

[QA Tester activates automatically]
→ Checks blog renders correctly
→ Tests all links in content
→ Verifies responsive design
→ Approves for production

Result: Production-ready blog post in 30 minutes! ✅
```

### Example 2: Emergency Bug Fix

```
User: "Developer: The ROI Calculator is showing NaN for payback months"

[Developer activates]
→ Uses next-devtools to check errors
→ Reads ROICalculator.tsx via filesystem
→ Uses sequential thinking to analyze
→ Finds division by zero bug
→ Implements fix with proper validation
→ Tests fix with next-devtools
→ Commits with detailed message

[QA Tester activates automatically]
→ Tests ROI Calculator with edge cases
→ Verifies fix works with 0 values
→ Tests negative number handling
→ Creates regression test notes
→ Approves fix

Result: Bug fixed and tested in 10 minutes! ✅
```

---

## 🎯 Success Metrics

### Agent Performance

Track these metrics for each agent:

- **Response Time:** How fast agent completes tasks
- **Quality Score:** Issues caught vs. missed
- **Collaboration Rate:** Successful handoffs
- **Tool Usage:** Efficient use of MCP servers

### Project Impact

- **Deployment Frequency:** Features per week
- **Bug Resolution Time:** Minutes, not hours
- **Content Output:** Blog posts per week
- **Code Quality:** Build errors, test coverage

---

## 📖 Additional Resources

- [MCP Setup Guide](./MCP_SETUP.md)
- [Next.js 16 Documentation](https://nextjs.org/docs)
- [Agent Configuration](./.agents.json)
- [Project Structure](./CLAUDE.md)

---

**Ready to build with your agent team? Start with:** `"QA Tester: Show me the current health status"`
