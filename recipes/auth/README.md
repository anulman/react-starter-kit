# Auth Recipe: OTP Verification + Dual-Token Sessions

Pattern for passwordless authentication using verification codes (email/SMS).

## Architecture

- **Session token** (long-lived, ~3 months): Stored in httpOnly cookie, identifies the session
- **Access token** (short-lived, ~5 minutes): JWT for API authentication, refreshed automatically
- **Middleware**: Validates tokens on every request, refreshes access token if expired

## Files

- `OtpInput.tsx` — Individual digit input boxes with paste/autofill support
- `middleware.ts` — Auth middleware pattern for TanStack Start
- `session.ts` — Session management utilities

## Setup

1. Install your verification provider SDK
2. Copy files into `src/`
3. Add middleware to `src/start.ts`:
   ```ts
   import { createStart } from "@tanstack/react-start";
   import { authMiddleware } from "./lib/auth";
   
   export const startInstance = createStart(() => ({
     requestMiddleware: [authMiddleware],
   }));
   ```
4. Add session to router context (see `session.ts`)
