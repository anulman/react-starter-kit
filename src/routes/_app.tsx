/**
 * App layout route
 *
 * Pathless layout route that wraps all app pages.
 * Add shared layout (header, sidebar, etc.) here.
 */
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { css } from "styled-system/css";

const layoutStyles = css({
  minHeight: "100dvh",
  display: "flex",
  flexDirection: "column",
});

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <div className={layoutStyles}>
      <Outlet />
    </div>
  );
}
