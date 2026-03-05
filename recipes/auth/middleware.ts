/**
 * Auth Middleware Pattern
 *
 * This shows the dual-token session pattern for TanStack Start.
 * Adapt to your specific auth provider.
 *
 * Pattern:
 * 1. Check for access token (JWT, short-lived ~5min)
 * 2. If valid → attach user to context
 * 3. If expired → check session token (long-lived ~3mo)
 * 4. If session valid → refresh access token, attach user
 * 5. If neither → anonymous session
 */
import { createMiddleware } from "@tanstack/react-start";

export type Session =
  | { user?: never }
  | {
      user: {
        id: string;
        // Add your user fields here
      };
    };

export const authMiddleware = createMiddleware().handler(async (ctx) => {
  const { getRequest, setCookie } = await import("@tanstack/react-start/server");
  const request = getRequest();
  const cookieHeader = request.headers.get("cookie");

  // 1. Try to validate access token (JWT)
  // const accessToken = getCookie(cookieHeader, "access_token");
  // if (accessToken) {
  //   try {
  //     const payload = await verifyJwt(accessToken);
  //     ctx.context.session = { user: { id: payload.sub } };
  //     return ctx.next();
  //   } catch { /* expired, fall through */ }
  // }

  // 2. Try session token refresh
  // const sessionId = getCookie(cookieHeader, "session_id");
  // if (sessionId) {
  //   const session = await db.getSession(sessionId);
  //   if (session && !session.expired) {
  //     const newAccessToken = await signJwt({ sub: session.userId });
  //     setCookie("access_token", newAccessToken, { httpOnly: true, maxAge: 300 });
  //     ctx.context.session = { user: { id: session.userId } };
  //     return ctx.next();
  //   }
  // }

  // 3. Anonymous
  ctx.context.session = {};
  return ctx.next();
});
