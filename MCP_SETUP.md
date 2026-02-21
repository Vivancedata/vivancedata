# MCP Setup

This repository includes a sample MCP configuration in `.mcp.json`.

## Included MCP Servers

- `next-devtools`
- `sequential-thinking`
- `filesystem`
- `git`
- `memory`
- `brave-search`
- `github`
- `fetch`

## Important Path Update

The checked-in `.mcp.json` uses Windows example paths for `filesystem` and `git` (`c:\\_Code\\vivancedata`).
Update those paths to your local project path before using MCP locally.

## Environment Variables

Set the required environment variables before enabling external servers:

- `BRAVE_API_KEY` for `brave-search`
- `GITHUB_PERSONAL_ACCESS_TOKEN` for `github`

You can copy `.env.example` and set values in your local environment file.

## Verify Configuration

1. Confirm `.mcp.json` points to the correct local path.
2. Confirm required API keys are set.
3. Restart your MCP-compatible client and verify all configured servers connect.
