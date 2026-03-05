# Convex Recipe: Real-time Database Integration

## Setup

```bash
bun add convex @convex-dev/react-query
npx convex init
```

## Integration

1. Add to `router.ts`:
```ts
import { ConvexReactClient } from "convex/react";
import { ConvexQueryClient } from "@convex-dev/react-query";

const convex = new ConvexReactClient(env.VITE_CONVEX_URL);
const convexQueryClient = new ConvexQueryClient(convex);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryKeyHashFn: convexQueryClient.hashFn(),
      queryFn: convexQueryClient.queryFn(),
    },
  },
});
convexQueryClient.connect(queryClient);
```

2. Wrap app with `<ConvexProvider>` in `__root.tsx`

3. Use in components:
```tsx
import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/convex/api";

const { data } = useQuery(convexQuery(api.myFunction, { arg: "value" }));
```
