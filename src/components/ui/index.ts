/**
 * Design System — Core Components
 *
 * Usage:
 *   import * as ui from "@/components/ui";
 *   <ui.Button variant="primary">Click me</ui.Button>
 *
 * Additional components available in recipes/:
 *   - recipes/auth/        → OtpInput
 *   - recipes/markdown/    → Markdown, MarkdownEditor
 *   - recipes/layout/      → Card, Section, Header, Sidebar, Main
 *   - recipes/data-display/ → Table, List, Avatar, Timestamp
 *   - recipes/pickers/     → ColorPicker, IconPicker, etc.
 */

// Forms
export { Button } from "./Button";
export { Input } from "./Input";
export { TextArea } from "./TextArea";
export { Select } from "./Select";
export { Checkbox } from "./Checkbox";

// Feedback
export { Modal } from "./Modal";
export { Dialog, ConfirmDialog, AlertDialog } from "./Dialog";
export { ToastProvider, useToast } from "./Toast";
export { LoadingSpinner } from "./LoadingSpinner";
export { Skeleton } from "./Skeleton";

// Data Display
export { Badge } from "./Badge";
export { EmptyState } from "./EmptyState";
