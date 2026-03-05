# PostHog Recipe

Product analytics with PostHog (client + server).

## Additional Dependencies

```bash
bun add posthog-js posthog-node
```

## Setup

1. Add `VITE_POSTHOG_KEY` to `src/lib/env.ts`
2. Add `POSTHOG_API_KEY` to `src/lib/serverEnv.ts`
3. Initialize client-side in `__root.tsx`:

```typescript
import posthog from "posthog-js";

if (typeof window !== "undefined") {
  posthog.init(env.VITE_POSTHOG_KEY, {
    api_host: "https://us.i.posthog.com",
  });
}
```

4. Server-side (in server functions):

```typescript
import { PostHog } from "posthog-node";

const posthog = new PostHog(serverEnv.POSTHOG_API_KEY);
posthog.capture({ distinctId: userId, event: "action_name" });
await posthog.shutdown();
```

## Key Patterns

- Client: auto-capture enabled by default, feature flags via `posthog.isFeatureEnabled()`
- Server: explicit capture only, always `shutdown()` in Workers (flush before response ends)
- Use feature flags for gradual rollouts
