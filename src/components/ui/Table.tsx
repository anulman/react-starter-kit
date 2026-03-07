/**
 * Basic Table Component
 *
 * A simple, styled table for rendering tabular data. This component handles
 * basic rendering with optional row click handlers.
 *
 * @note For advanced features (sorting, filtering, pagination, virtualization),
 * use TanStack Table: https://tanstack.com/table/latest
 *
 * @example
 * ```tsx
 * import { Table, type Column } from "@/components/ui";
 *
 * type User = { id: string; name: string; email: string };
 *
 * const columns: Column<User>[] = [
 *   { key: "name", header: "Name" },
 *   { key: "email", header: "Email" },
 *   { key: "actions", header: "", render: (user) => <Button>Edit</Button> },
 * ];
 *
 * <Table
 *   data={users}
 *   columns={columns}
 *   keyExtractor={(user) => user.id}
 *   onRowClick={(user) => navigate(`/users/${user.id}`)}
 * />
 * ```
 */
import { css } from "styled-system/css";

const tableStyles = css({
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "sm",
});

const theadStyles = css({
  borderBottom: "1px solid token(colors.border)",
});

const thStyles = css({
  textAlign: "left",
  fontWeight: "semibold",
  color: "text",
  px: "md",
  py: "sm",
});

const tbodyStyles = css({
  "& tr": {
    borderBottom: "1px solid token(colors.border)",
    _last: {
      borderBottom: "none",
    },
  },
});

const tdStyles = css({
  px: "md",
  py: "sm",
  color: "text",
});

const clickableRowStyles = css({
  cursor: "pointer",
  transition: "background-color 100ms",
  _hover: {
    bg: "surface",
  },
});

export type Column<T> = {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  width?: string;
};

export type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (item: T) => void;
  keyExtractor: (item: T) => string;
  className?: string;
};

export function Table<T>({
  data,
  columns,
  onRowClick,
  keyExtractor,
  className,
}: TableProps<T>) {
  return (
    <table className={tableStyles + (className ? ` ${className}` : "")}>
      <thead className={theadStyles}>
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              className={thStyles}
              style={col.width ? { width: col.width } : undefined}
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={tbodyStyles}>
        {data.length === 0 && (
          <tr>
            <td colSpan={columns.length} className={css({ textAlign: "center", py: "xl", color: "fg.muted" })}>
              No data available
            </td>
          </tr>
        )}
        {data.map((item) => (
          <tr
            key={keyExtractor(item)}
            onClick={onRowClick ? () => onRowClick(item) : undefined}
            className={onRowClick ? clickableRowStyles : undefined}
          >
            {columns.map((col) => (
              <td key={col.key} className={tdStyles}>
                {col.render
                  ? col.render(item)
                  : String((item as Record<string, unknown>)[col.key] ?? "")}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
