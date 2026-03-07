import { formatDistanceToNow, format, isValid } from "date-fns";
import { css } from "styled-system/css";

const timestampStyles = css({
  color: "text.muted",
  fontSize: "sm",
});

export type TimestampProps = {
  date: Date | number | string;
  relative?: boolean;
  formatStr?: string;
  className?: string;
};

export function Timestamp({
  date,
  relative = false,
  formatStr = "MMM d, yyyy",
  className,
}: TimestampProps) {
  const dateObj = typeof date === "string" || typeof date === "number"
    ? new Date(date)
    : date;

  if (!isValid(dateObj)) {
    return <time className={timestampStyles + (className ? ` ${className}` : "")}>Invalid date</time>;
  }

  const formattedDate = relative
    ? formatDistanceToNow(dateObj, { addSuffix: true })
    : format(dateObj, formatStr);

  return (
    <time
      dateTime={dateObj.toISOString()}
      title={format(dateObj, "PPpp")}
      className={timestampStyles + (className ? ` ${className}` : "")}
    >
      {formattedDate}
    </time>
  );
}
