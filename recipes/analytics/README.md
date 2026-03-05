# Analytics Recipe: PostHog

## Setup

```bash
bun add posthog-js posthog-node
```

Add to `wrangler.jsonc`:
```json
"vars": {
  "VITE_POSTHOG_KEY": "phc_your_key_here"
}
```

## Integration

Import and initialize in your root layout or router setup.
