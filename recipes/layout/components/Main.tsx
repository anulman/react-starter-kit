import { forwardRef, type HTMLAttributes } from "react";
import { css } from "styled-system/css";

const mainStyles = css({
  flex: 1,
  minHeight: 0,
  overflow: "auto",
});

export type MainProps = HTMLAttributes<HTMLElement>;

export const Main = forwardRef<HTMLElement, MainProps>(
  function Main({ className, ...props }, ref) {
    return (
      <main
        ref={ref}
        className={mainStyles + (className ? ` ${className}` : "")}
        {...props}
      />
    );
  }
);
