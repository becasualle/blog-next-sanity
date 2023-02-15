import { parseISO, format } from "date-fns";

export default function Date({ dateString }) {
  if (!dateString) return null;

  const date = parseISO(dateString);
  return (
    <time dateTime={dateString} className="dark:text-slate-400">
      {format(date, "LLLL	d, yyyy")}
    </time>
  );
}
