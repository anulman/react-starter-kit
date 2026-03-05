import { createFileRoute } from "@tanstack/react-router";
import { css } from "styled-system/css";
import { VStack, Center } from "@/components/layout";
import * as ui from "@/components/ui";

export const Route = createFileRoute("/_app/")({
  component: LandingPage,
});

const heroStyles = css({
  py: "2xl",
  px: "md",
});

const headingStyles = css({
  fontSize: "2xl",
  fontWeight: "bold",
  color: "text",
  marginBottom: "sm",
});

const subtitleStyles = css({
  fontSize: "lg",
  color: "text.muted",
  marginBottom: "lg",
});

function LandingPage() {
  return (
    <Center flex="1">
      <VStack gap="md" className={heroStyles}>
        <h1 className={headingStyles}>React Starter Kit</h1>
        <p className={subtitleStyles}>
          TanStack Start · Panda CSS · BaseUI · Cloudflare Workers
        </p>
        <ui.Button variant="primary" size="lg">
          Get Started
        </ui.Button>
      </VStack>
    </Center>
  );
}
