import type { SVGProps } from "react";

export type ChevronDownIconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export function ChevronDownIcon({ size = 16, ...props }: ChevronDownIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
