# Auth Recipe

Passwordless authentication with Twilio Verify + Lucia Auth-inspired dual-token sessions.

## What's Included

- `components/OtpInput.tsx` — Six-digit verification code input with auto-advance and paste support
- Session management patterns (3-month sessions + 5-minute JWTs, RS256)
- Auth middleware for TanStack Start server functions
- JWKS endpoint pattern for external JWT validation (e.g., Convex)
- Mobile detection (defaults to phone verification on mobile)

## Additional Dependencies

```bash
bun add twilio jose cookie-es nanoid libphonenumber-js
```

## Key Patterns

- **Dual-token**: Long-lived session cookie (3mo) + short-lived JWT (5min)
- **No PII in JWTs**: Only user ID and resource memberships
- **Session computed once at router mount**: Auth-changing operations use hard navigation (`window.location.href`)
- **Find-or-create**: Auto-create user on first successful verification

## Integration

1. Copy `components/OtpInput.tsx` into `src/components/ui/` (or a domain-specific location)
2. Set up Twilio Verify service
3. Implement session management (see HomeHub's `src/lib/auth.ts` for reference)
4. Add auth middleware to your server functions
