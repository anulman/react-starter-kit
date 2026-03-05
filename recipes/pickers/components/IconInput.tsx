import {
  useState,
  useRef,
  useEffect,
  useCallback,
  forwardRef,
  lazy,
  Suspense,
} from "react";
import { css } from "styled-system/css";
import { Input } from "./Input";
import { Skeleton } from "./Skeleton";
import { ZONE_ICONS, getZoneIcon } from "./IconPicker";
import type { IconPickerProps } from "./IconPicker";
import { useKeyboardDirections } from "@/hooks/useKeyboardDirections";
import { useFocusTrap } from "@/hooks/useFocusTrap";

const IconPickerLazy = lazy(() =>
  import("./IconPicker").then((mod) => ({ default: mod.IconPicker }))
);

const containerStyles = css({
  position: "relative",
  display: "inline-block",
  width: "100%",
});

const inputRowStyles = css({
  display: "flex",
  alignItems: "center",
  gap: "sm",
});

const iconPreviewStyles = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  w: "40px",
  h: "40px",
  borderRadius: "sm",
  border: "1px solid token(colors.border)",
  bg: "surface",
  color: "text",
  flexShrink: 0,
  cursor: "pointer",
  transition: "border-color 0.15s",
  _hover: {
    borderColor: "primary",
  },
});

const panelStyles = css({
  position: "absolute",
  top: "100%",
  left: 0,
  right: 0,
  mt: "xs",
  p: "md",
  bg: "background",
  border: "1px solid token(colors.border)",
  borderRadius: "sm",
  boxShadow: "lg",
  zIndex: 1,
  maxHeight: "300px",
  overflowY: "auto",
});

const filteredGridStyles = css({
  display: "grid",
  gridTemplateColumns: "repeat(8, 1fr)",
  gap: "xs",
});

const iconButtonStyles = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  w: "36px",
  h: "36px",
  borderRadius: "sm",
  cursor: "pointer",
  border: "2px solid transparent",
  outline: "none",
  bg: "surface",
  color: "text",
  transition: "transform 0.1s, border-color 0.1s, background 0.1s",
  _hover: {
    transform: "scale(1.05)",
    bg: "background.hover",
  },
  _focus: {
    boxShadow: "0 0 0 2px token(colors.primary)",
  },
});

const iconButtonSelectedStyles = css({
  borderColor: "primary",
  bg: "primary.soft",
  transform: "scale(1.05)",
});

/** Number of columns in the icon grid */
const ICON_COLS = 8;

const noResultsStyles = css({
  textAlign: "center",
  py: "md",
  color: "text.muted",
  fontSize: "sm",
});

export type IconInputProps = Omit<IconPickerProps, "className"> & {
  /** Placeholder text for search input */
  placeholder?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Label for accessibility */
  label?: string;
  /** Additional class name */
  className?: string;
};

/**
 * Compact icon input with expandable picker panel.
 *
 * Displays an icon preview next to a search input. When focused,
 * expands to show the IconPicker for selection.
 * Typing filters icons by name, label, or category.
 *
 * @example
 * ```tsx
 * <IconInput
 *   value={zone.icon}
 *   onChange={(icon) => updateZone({ icon })}
 *   label="Zone icon"
 * />
 * ```
 */
export const IconInput = forwardRef<HTMLDivElement, IconInputProps>(
  function IconInput(
    {
      value,
      onChange,
      placeholder = "Search icons...",
      disabled = false,
      label,
      className,
    },
    ref
  ) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const iconRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const panelRef = useFocusTrap<HTMLDivElement>(isOpen);

    const Icon = getZoneIcon(value);
    const currentIconConfig = ZONE_ICONS.find((i) => i.name === value);

    // Filter icons based on search term
    const filteredIcons = searchTerm
      ? ZONE_ICONS.filter(
          (icon) =>
            icon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            icon.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
            icon.category.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : null; // null means show the full picker

    // Memoized click-outside handler to avoid recreating on every render
    // Uses PointerEvent for consistent behavior across mouse, touch, and pen
    const handleClickOutside = useCallback((e: PointerEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    }, []);

    // Handle click outside to close panel
    // Using pointerdown instead of mousedown for better mobile/touch support
    useEffect(() => {
      if (!isOpen) return;

      document.addEventListener("pointerdown", handleClickOutside);
      return () => document.removeEventListener("pointerdown", handleClickOutside);
    }, [isOpen, handleClickOutside]);

    // Reset focus index when panel closes or search changes
    useEffect(() => {
      if (!isOpen) {
        setFocusedIndex(-1);
      }
    }, [isOpen]);

    useEffect(() => {
      setFocusedIndex(-1);
    }, [searchTerm]);

    const handleFocus = () => {
      if (!disabled) {
        // Pre-fill search with current label so user can see/modify it
        setSearchTerm(currentIconConfig?.label ?? "");
        setIsOpen(true);
        // Select input value on focus for easy replacement
        setTimeout(() => inputRef.current?.select(), 0);
      }
    };

    const handleIconSelect = (iconName: string) => {
      onChange?.(iconName);
      setIsOpen(false);
      setSearchTerm("");
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    };

    // Keyboard navigation for icon grid using reusable hook
    const canNavigate = isOpen && filteredIcons !== null && filteredIcons.length > 0;
    const totalIcons = filteredIcons?.length ?? 0;
    const rows = Math.ceil(totalIcons / ICON_COLS);

    const moveFocus = (getNext: (prev: number) => number) => {
      setFocusedIndex((prev) => {
        const next = getNext(prev);
        iconRefs.current[next]?.focus();
        return next;
      });
    };

    const handleKeyDown = useKeyboardDirections({
      onRight: canNavigate
        ? () => moveFocus((prev) => (prev < 0 ? 0 : (prev + 1) % totalIcons))
        : undefined,
      onLeft: canNavigate
        ? () => moveFocus((prev) => (prev <= 0 ? totalIcons - 1 : prev - 1))
        : undefined,
      onDown: canNavigate
        ? () =>
            moveFocus((prev) => {
              const currentRow = Math.floor((prev < 0 ? 0 : prev) / ICON_COLS);
              const currentCol = (prev < 0 ? 0 : prev) % ICON_COLS;
              const nextRow = (currentRow + 1) % rows;
              return Math.min(nextRow * ICON_COLS + currentCol, totalIcons - 1);
            })
        : undefined,
      onUp: canNavigate
        ? () =>
            moveFocus((prev) => {
              const currentRow = Math.floor((prev < 0 ? 0 : prev) / ICON_COLS);
              const currentCol = (prev < 0 ? 0 : prev) % ICON_COLS;
              const nextRow = currentRow <= 0 ? rows - 1 : currentRow - 1;
              return Math.min(nextRow * ICON_COLS + currentCol, totalIcons - 1);
            })
        : undefined,
      onSelect:
        canNavigate && focusedIndex >= 0 && focusedIndex < totalIcons
          ? () => {
              const icon = filteredIcons?.[focusedIndex];
              if (icon) {
                handleIconSelect(icon.name);
              }
            }
          : undefined,
      onEscape: isOpen
        ? () => {
            setIsOpen(false);
            setSearchTerm("");
            inputRef.current?.focus();
          }
        : undefined,
    });

    return (
      <div
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        className={`${containerStyles} ${className ?? ""}`}
      >
        <div className={inputRowStyles}>
          <button
            type="button"
            className={iconPreviewStyles}
            onClick={handleFocus}
            aria-label="Open icon picker"
            disabled={disabled}
            title={currentIconConfig?.label ?? "Select icon"}
          >
            <Icon size={20} />
          </button>
          <Input
            ref={inputRef}
            value={isOpen ? searchTerm : currentIconConfig?.label ?? ""}
            onChange={handleInputChange}
            onFocus={handleFocus}
            placeholder={placeholder}
            disabled={disabled}
            aria-label={label ?? "Icon search"}
          />
        </div>

        {isOpen && !disabled && (
          <div ref={panelRef} className={panelStyles} onKeyDown={handleKeyDown}>
            {filteredIcons !== null ? (
              // Show filtered results
              filteredIcons.length > 0 ? (
                <div className={filteredGridStyles} role="grid" aria-label="Icon grid">
                  {filteredIcons.map(({ name, icon: FilteredIcon, label: iconLabel }, index) => (
                    <button
                      key={name}
                      ref={(el) => {
                        iconRefs.current[index] = el;
                      }}
                      type="button"
                      role="gridcell"
                      tabIndex={index === focusedIndex ? 0 : -1}
                      className={`${iconButtonStyles} ${
                        value === name ? iconButtonSelectedStyles : ""
                      }`}
                      onClick={() => handleIconSelect(name)}
                      onFocus={() => setFocusedIndex(index)}
                      aria-label={`Select ${iconLabel} icon`}
                      aria-pressed={value === name}
                      title={iconLabel}
                    >
                      <FilteredIcon size={18} />
                    </button>
                  ))}
                </div>
              ) : (
                <div className={noResultsStyles}>
                  No icons match "{searchTerm}"
                </div>
              )
            ) : (
              // Show full picker when no search
              <Suspense fallback={<Skeleton height="200px" />}>
                <IconPickerLazy
                  value={value}
                  onChange={handleIconSelect}
                />
              </Suspense>
            )}
          </div>
        )}
      </div>
    );
  }
);
