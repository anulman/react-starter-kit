# Deployment: Cloudflare Workers

## Prerequisites

- Cloudflare account
- `wrangler` CLI (included in devDependencies)

## Configuration

Edit `wrangler.jsonc`:
```jsonc
{
  "name": "my-app",
  "compatibility_date": "2025-09-02",
  "compatibility_flags": ["nodejs_compat"],
  "vars": {
    // Public vars (available to client via VITE_ prefix)
    "VITE_APP_NAME": "My App"
  }
}
```

For secrets (server-only):
```bash
bunx wrangler secret put MY_SECRET
```

For local dev secrets, create `.dev.vars`:
```
MY_SECRET=local-secret-value
```

## Deploy

```bash
bun run build
bun run deploy
```

Or in one step:
```bash
bunx wrangler deploy
```

## Custom Domain

Add to `wrangler.jsonc`:
```jsonc
{
  "routes": [
    {
      "pattern": "app.example.com",
      "zone_name": "example.com",
      "custom_domain": true
    }
  ]
}
```

## Smart Placement

The config includes `"placement": { "mode": "smart" }` which automatically
runs your Worker close to your backend services rather than closest to the user,
reducing latency for data-heavy operations.

## Environment Variables

- **Client (VITE_*)**: Set in `wrangler.jsonc` `vars` — bundled into client JS
- **Server secrets**: Set via `wrangler secret put` — only available in server functions via `getServerEnv()`
- **Never use `process.env`** in Workers — it doesn't exist. Use `getServerEnv()`.
