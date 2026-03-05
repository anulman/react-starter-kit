import { createFileRoute } from "@tanstack/react-router";
import { css } from "styled-system/css";
import { VStack, HStack, Center } from "@/components/layout";
import * as ui from "@/components/ui";
import { makeHead } from "@/lib/head";
import { toggleTheme } from "@/lib/theme";

export const Route = createFileRoute("/_app/")({
  head: () => makeHead({ title: "Home", description: "React Starter Kit" }),
  component: LandingPage,
});

const heroStyles = css({
  py: "2xl",
  px: "md",
});

const headingStyles = css({
  fontSize: "2xl",
  fontWeight: "bold",
  color: "fg",
  marginBottom: "sm",
});

const subtitleStyles = css({
  fontSize: "lg",
  color: "fg.muted",
  marginBottom: "lg",
});

function LandingPage() {
  return (
    <Center flex="1">
      <VStack gap="md" className={heroStyles}>
        <h1 className={headingStyles}>React Starter Kit</h1>
        <p className={subtitleStyles}>
          TanStack Start + Panda CSS + BaseUI + Cloudflare Workers
        </p>
        <HStack gap="sm">
          <ui.Button variant="primary" size="lg">
            Get Started
          </ui.Button>
          <ui.Button variant="ghost" size="lg" onClick={toggleTheme}>
            Toggle Theme
          </ui.Button>
        </HStack>
      </VStack>
    </Center>
  );
}
