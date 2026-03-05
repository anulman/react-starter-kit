/**
 * PostHog Analytics Scaffolding
 *
 * Client: posthog-js (auto-captures pageviews, clicks)
 * Server: posthog-node (server-side events, feature flags)
 */

// --- Client-side ---
// import posthog from "posthog-js";
//
// export function initClientAnalytics() {
//   const key = import.meta.env.VITE_POSTHOG_KEY;
//   if (!key) return;
//   posthog.init(key, {
//     api_host: "https://us.i.posthog.com",
//     person_profiles: "identified_only",
//   });
// }
//
// export function identify(userId: string, properties?: Record<string, unknown>) {
//   posthog.identify(userId, properties);
// }
//
// export function track(event: string, properties?: Record<string, unknown>) {
//   posthog.capture(event, properties);
// }

// --- Server-side ---
// import { PostHog } from "posthog-node";
//
// let serverPosthog: PostHog | null = null;
//
// export function getServerAnalytics(apiKey: string): PostHog {
//   if (!serverPosthog) {
//     serverPosthog = new PostHog(apiKey, { host: "https://us.i.posthog.com" });
//   }
//   return serverPosthog;
// }
