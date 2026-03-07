# Recipes

Drop-in patterns you can copy into your project. Each recipe is self-contained with its own README explaining setup and dependencies.

## Available Recipes

| Recipe | Description | Extra Dependencies |
|--------|-------------|-------------------|
| **auth/** | OTP verification + dual-token sessions | Provider-specific (e.g., Twilio Verify) |
| **authoring/** | Markdown rendering + rich text editing | `react-markdown`, `remark-gfm`, TipTap |
| **convex/** | Convex real-time database integration | `convex`, `@convex-dev/react-query` |
| **analytics/** | PostHog analytics scaffolding | `posthog-js`, `posthog-node` |
| **storybook-deploy/** | Storybook deployment to CF Pages | None (Storybook is a core dependency) |

## How to Use

1. Read the recipe's `README.md`
2. Install any extra dependencies listed
3. Copy the files into your `src/` directory
4. Follow the recipe's integration instructions
