/**
 * Head metadata helpers for TanStack Start routes.
 *
 * Usage in route files:
 *   import { makeHead } from "@/lib/head";
 *
 *   export const Route = createFileRoute("/about")({
 *     head: () => makeHead({
 *       title: "About Us",
 *       description: "Learn more about our company.",
 *       image: "/og-about.png",
 *     }),
 *   });
 */

import { env } from "@/lib/env";

export interface HeadOptions {
  /** Page title. Automatically appended with " | AppName" unless `rawTitle` is true. */
  title?: string;
  /** Meta description for SEO. Also used for og:description. */
  description?: string;
  /** OG image URL (absolute or relative -- relative will be prefixed with app URL). */
  image?: string;
  /** Canonical URL override. Defaults to current page URL. */
  canonical?: string;
  /** Skip appending app name to title. */
  rawTitle?: boolean;
  /** Additional meta tags. */
  meta?: Array<Record<string, string>>;
  /** Additional link tags. */
  links?: Array<Record<string, string>>;
}

export function makeHead(options: HeadOptions = {}) {
  const appName = env.VITE_APP_NAME;
  const appUrl = env.VITE_APP_URL;

  const title = options.title
    ? options.rawTitle
      ? options.title
      : `${options.title} | ${appName}`
    : appName;

  const description = options.description || "";
  const image = options.image
    ? options.image.startsWith("http")
      ? options.image
      : `${appUrl}${options.image}`
    : "";

  const meta: Array<Record<string, string>> = [
    { title },
    ...(description
      ? [
          { name: "description", content: description },
          { property: "og:description", content: description },
        ]
      : []),
    { property: "og:title", content: title },
    { property: "og:type", content: "website" },
    ...(image ? [{ property: "og:image", content: image }] : []),
    ...(options.canonical
      ? [{ property: "og:url", content: options.canonical }]
      : []),
    // Twitter card
    { name: "twitter:card", content: image ? "summary_large_image" : "summary" },
    { name: "twitter:title", content: title },
    ...(description
      ? [{ name: "twitter:description", content: description }]
      : []),
    ...(image ? [{ name: "twitter:image", content: image }] : []),
    ...(options.meta || []),
  ];

  const links: Array<Record<string, string>> = [
    ...(options.canonical
      ? [{ rel: "canonical", href: options.canonical }]
      : []),
    ...(options.links || []),
  ];

  return { meta, links };
}
