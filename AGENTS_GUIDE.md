# Agents Guide

This project defines agent metadata and workflows in `.agents.json`.

## Configured Agents

- `content-creator`
- `developer`
- `qa-tester`
- `ui-designer`
- `seo-optimizer`
- `integration-manager`

## Source of Truth

- Agent definitions: `.agents.json`
- Capability and workflow details: `.agents.json`

## Typical Workflow

1. Pick one primary agent role for the task.
2. Execute the scoped workflow steps in `.agents.json`.
3. Validate changes with lint, type-check, and tests.
4. Hand off to the next role only after checks pass.

## Operational Notes

- Treat `.agents.json` as configuration; keep workflow steps aligned with real scripts and project structure.
- When adding a new workflow, include concrete verification commands.
- Avoid overlapping responsibilities across agents unless intentional for handoff.
