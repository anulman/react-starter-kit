import { lazy, Suspense, forwardRef } from "react";
import type { IconPickerProps } from "./IconPicker";
import { Skeleton } from "./Skeleton";

const IconPickerLazy = lazy(() =>
  import("./IconPicker").then((mod) => ({ default: mod.IconPicker }))
);

/**
 * Lazy-loaded IconPicker component.
 *
 * Use this instead of IconPicker directly to reduce initial bundle size.
 * The IconPicker imports 55+ icons which adds significant weight.
 */
export const LazyIconPicker = forwardRef<HTMLDivElement, IconPickerProps>(
  function LazyIconPicker(props, ref) {
    return (
      <Suspense fallback={<Skeleton height="280px" />}>
        <IconPickerLazy ref={ref} {...props} />
      </Suspense>
    );
  }
);
