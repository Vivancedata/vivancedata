# MCP Setup

This repository includes a sample MCP configuration in `.mcp.json`.

## Included MCP Servers

- `next-devtools`
- `sequential-thinking`
- `memory`
- `brave-search`
- `github`

Every server is pinned to an exact version. `npx -y` runs whatever it downloads, so an
unpinned server would run a compromised upstream release automatically. To upgrade, check
the new release, then bump the version in `.mcp.json`.

`brave-search` and `github` are deprecated on npm and no longer receive fixes. Prefer the
`gh` CLI for GitHub work.

## Environment Variables

Set the required environment variables before enabling external servers:

- `BRAVE_API_KEY` for `brave-search`
- `GITHUB_PERSONAL_ACCESS_TOKEN` for `github`

You can copy `.env.example` and set values in your local environment file.

## Verify Configuration

1. Confirm required API keys are set.
2. Restart your MCP-compatible client and verify all configured servers connect.
