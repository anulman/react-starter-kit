import { createFileRoute } from "@tanstack/react-router";
import { css } from "styled-system/css";
import * as ui from "@/components/ui";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div className={css({ maxW: "640px", mx: "auto", p: "lg", mt: "xl" })}>
      <h1 className={css({ fontSize: "2xl", fontWeight: "bold", mb: "md" })}>
        React Starter Kit
      </h1>
      <p className={css({ color: "text.muted", mb: "lg" })}>
        TanStack Start + Cloudflare Workers + Panda CSS + BaseUI.
      </p>
      <ui.Button>Get Started</ui.Button>
    </div>
  );
}
