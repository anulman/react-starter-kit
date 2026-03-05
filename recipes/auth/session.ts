/**
 * Session Management Pattern
 *
 * Session is computed ONCE at router initialization and remains stable
 * for the entire page session. Auth-changing operations (login, logout)
 * should use hard navigation (window.location.href) to ensure a fresh
 * session on the next page load.
 */

import type { Session } from "./middleware";

/**
 * Get session from cookies (client-side).
 * In production, decode the access token JWT.
 */
export function getClientSession(): Session {
  // const token = document.cookie.match(/access_token=([^;]+)/)?.[1];
  // if (token) {
  //   const payload = decodeJwt(token); // decode without verify on client
  //   return { user: { id: payload.sub } };
  // }
  return {};
}

/**
 * Hard navigate after auth changes to get a fresh session.
 */
export function navigateAfterAuth(url: string = "/") {
  window.location.href = url;
}
