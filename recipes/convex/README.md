# Convex Recipe

Real-time reactive database with TanStack Query bridge.

## Additional Dependencies

```bash
bun add convex @convex-dev/react-query @tanstack/react-query
```

## Key Patterns

- **`convexQuery()` + TanStack `useQuery`**: Reactive subscriptions with caching
- **`convex.query()` (direct)**: For server functions or one-off queries
- **ConvexQueryClient**: Bridges Convex subscriptions into TanStack Query's cache
- **Transaction ordering**: Check permissions → Write to DB → Sync external → Rollback on failure

## Integration

1. `npx convex init` in your project
2. Set `VITE_CONVEX_URL` in your env
3. Add ConvexQueryClient setup to `router.ts` (see CLAUDE.md patterns)
4. Use `convexQuery()` in components for reactive data
