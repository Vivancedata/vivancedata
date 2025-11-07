# MCP (Model Context Protocol) Configuration

This project is configured with multiple MCP servers to enhance AI-assisted development. These servers provide specialized capabilities for different aspects of the development workflow.

## 📋 Configured MCP Servers

### 1. **next-devtools** 🚀
**Purpose:** Next.js runtime inspection and debugging

**Capabilities:**
- Real-time error detection (build, runtime, TypeScript)
- Live application state queries
- Page metadata and routing information
- Server Actions inspection
- Development server logs

**Use cases for this project:**
- Debug interactive tools (ROI Calculator, AI Readiness Assessment)
- Monitor form submissions and API routes
- Inspect blog post rendering and MDX compilation
- Track performance metrics

---

### 2. **sequential-thinking** 🧠
**Purpose:** Advanced reasoning for complex problem-solving

**Capabilities:**
- Break down complex tasks into logical steps
- Chain multiple reasoning operations
- Structured problem analysis
- Decision tree exploration

**Use cases for this project:**
- Design new interactive tools with complex logic
- Architect feature implementations
- Debug complex state management issues
- Plan multi-step refactoring operations
- Analyze ROI calculator algorithms and business logic

---

### 3. **filesystem** 📁
**Purpose:** Secure file system operations

**Capabilities:**
- Read/write files in the project directory
- Search for files and directories
- Move/rename files
- Create directory structures

**Scope:** Restricted to `c:\_Code\vivancedata`

**Use cases for this project:**
- Create new blog posts in MDX format
- Generate new component files
- Manage constants and configuration files
- Organize assets and images
- Update documentation

---

### 4. **git** 🔄
**Purpose:** Version control operations

**Capabilities:**
- View commit history and diffs
- Check branch status
- Search git logs
- View file changes
- Inspect repository structure

**Repository:** `c:\_Code\vivancedata`

**Use cases for this project:**
- Review recent changes before deploying
- Track feature development history
- Generate changelogs
- Analyze code evolution
- Find when specific features were added

---

### 5. **memory** 💾
**Purpose:** Persistent knowledge graph storage

**Capabilities:**
- Store project context across sessions
- Build knowledge graph of project decisions
- Remember architectural patterns
- Track feature requirements
- Maintain conversation context

**Use cases for this project:**
- Remember blog post topics and content strategy
- Track which features have been implemented
- Store design system decisions
- Remember API integration patterns
- Maintain content calendar context

---

### 6. **brave-search** 🔍
**Purpose:** Web search for research and current information

**Capabilities:**
- Search the web for current information
- Research topics and best practices
- Find documentation and examples
- Stay updated on AI trends

**Requires:** `BRAVE_API_KEY` environment variable

**Use cases for this project:**
- Research AI trends for blog content
- Find latest Next.js 16 features and best practices
- Research competitor websites and features
- Look up Tailwind/Framer Motion examples
- Stay current on generative AI developments
- Research ROI calculation methodologies

**Setup:** Get API key from [Brave Search API](https://brave.com/search/api/)

---

### 7. **github** 🐙
**Purpose:** GitHub repository management

**Capabilities:**
- Create and manage issues
- Review pull requests
- Search repositories
- Manage branches
- Create releases

**Requires:** `GITHUB_PERSONAL_ACCESS_TOKEN` environment variable

**Use cases for this project:**
- Create issues for feature requests
- Review pull requests
- Manage project board
- Create releases and tags
- Search across repositories

**Setup:** Create token at [GitHub Settings → Developer Settings → Personal Access Tokens](https://github.com/settings/tokens)

---

### 8. **fetch** 🌐
**Purpose:** HTTP requests and web content fetching

**Capabilities:**
- Make HTTP requests to any URL
- Fetch web content
- Test API endpoints
- Download external resources

**Use cases for this project:**
- Test contact form API (`/api/contact`)
- Test newsletter API (`/api/newsletter`)
- Verify external links in blog posts
- Fetch external data for blog content
- Test third-party integrations (Resend, ConvertKit)
- Validate API responses

---

## 🔧 Setup Instructions

### 1. Install MCP-compatible client
Ensure you're using an MCP-compatible AI assistant (Claude Code, Cursor, etc.)

### 2. Configure environment variables
Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

### 3. Add API keys (optional)
Edit `.env.local` and add your API keys:

```bash
# Optional: For web search capabilities
BRAVE_API_KEY=your_brave_api_key_here

# Optional: For GitHub integration
GITHUB_PERSONAL_ACCESS_TOKEN=your_github_token_here
```

### 4. Start development server
```bash
npm run dev
```

The MCP servers will automatically connect when your coding assistant loads.

---

## 🎯 Development Workflow Examples

### Example 1: Creating a New Blog Post
1. **Sequential Thinking:** Plan blog post structure and outline
2. **Brave Search:** Research latest AI trends and statistics
3. **Filesystem:** Create new MDX file in `src/app/blog/posts/`
4. **Git:** Commit and track changes
5. **Memory:** Store blog topic for future reference

### Example 2: Debugging Form Issues
1. **Next-devtools:** Check for runtime errors in forms
2. **Fetch:** Test API endpoint responses
3. **Filesystem:** Read form component code
4. **Sequential Thinking:** Analyze error patterns and plan fix

### Example 3: Adding New Interactive Tool
1. **Sequential Thinking:** Design tool logic and user flow
2. **Brave Search:** Research similar calculator implementations
3. **Filesystem:** Create component files
4. **Next-devtools:** Test tool in dev environment
5. **Git:** Review changes and commit
6. **Memory:** Store design decisions

### Example 4: Content Strategy Planning
1. **Memory:** Review previous blog topics
2. **Brave Search:** Research trending AI topics
3. **Sequential Thinking:** Plan content calendar
4. **GitHub:** Create issues for each blog post
5. **Filesystem:** Create draft MDX files

---

## 🚀 Benefits for This Project

### For Development:
- ✅ Real-time Next.js debugging with application context
- ✅ Structured problem-solving for complex features
- ✅ Direct file manipulation for rapid iterations
- ✅ Git integration for version control awareness

### For Content Creation:
- ✅ Research latest AI trends for blog posts
- ✅ Maintain content strategy in memory
- ✅ Quick MDX file creation and editing
- ✅ Track blog post versions

### For Quality Assurance:
- ✅ Test API endpoints directly
- ✅ Verify external integrations
- ✅ Monitor application errors in real-time
- ✅ Review code changes before commits

### For Project Management:
- ✅ Create and track GitHub issues
- ✅ Manage feature development
- ✅ Document architectural decisions
- ✅ Maintain project knowledge base

---

## 🔒 Security Notes

- **Filesystem** server is restricted to the project directory only
- **Git** server has read-only access by default
- **API keys** are stored in `.env.local` (never committed to git)
- **GitHub token** should have minimal required permissions
- All MCP servers run locally on your machine

---

## 📚 Additional Resources

- [Model Context Protocol Documentation](https://modelcontextprotocol.io)
- [MCP Servers Repository](https://github.com/modelcontextprotocol/servers)
- [Next.js MCP Guide](https://nextjs.org/docs/app/guides/mcp)
- [Brave Search API](https://brave.com/search/api/)
- [GitHub Personal Access Tokens](https://github.com/settings/tokens)

---

## 🤝 Support

For issues with specific MCP servers, refer to the [official MCP servers repository](https://github.com/modelcontextprotocol/servers/issues).

For project-specific questions, see our main [README.md](./README.md).
