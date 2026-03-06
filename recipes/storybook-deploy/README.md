# Storybook Deployment Recipe

Deploy Storybook alongside your main app -- either as a separate CF Pages project or as a subdomain.

## Option A: Separate CF Pages Project (Recommended)

The simplest approach. Storybook builds to static HTML and deploys independently.

### GitHub Actions

Add to `.github/workflows/ci.yml`:

```yaml
  deploy-storybook:
    name: Deploy Storybook
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    needs: check
    steps:
      - uses: actions/checkout@v4

      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: latest

      - name: Install dependencies
        run: bun install --frozen-lockfile

      - name: Build Storybook
        run: bun run build:storybook

      - name: Deploy to CF Pages
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          command: pages deploy storybook-static --project-name=my-app-storybook --commit-dirty=true
```

### Manual Deploy

```bash
bun run build:storybook
npx wrangler pages deploy storybook-static --project-name=my-app-storybook
```

## Option B: Subdirectory of Main App

Serve Storybook at `/storybook/` under the main app domain.

1. Build both:
   ```bash
   bun run build
   bun run build:storybook
   cp -r storybook-static dist/storybook
   ```

2. Deploy the combined `dist/`:
   ```bash
   npx wrangler pages deploy dist --project-name=my-app
   ```

**Note:** This increases your deploy size and couples Storybook updates to app deploys. Option A is usually better.

## Access Control

For internal-only Storybook, add Cloudflare Access in front of the Pages project:
1. Go to Cloudflare Zero Trust > Access > Applications
2. Add a self-hosted application pointing to your Storybook domain
3. Set a policy (e.g., email domain match, one-time PIN)

Or use HTTP basic auth via a CF Workers middleware (see the outsidetheboxmodel.com `/drafts` route for an example pattern).
