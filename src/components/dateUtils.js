export const parseDateParts = (str) => {
  if (!str) return null;
  const parts = String(str).trim().split("/").map(Number);
  if (parts.some((n) => Number.isNaN(n))) return null;
  if (parts.length === 3)
    return { d: parts[0], m: parts[1], y: parts[2], precision: "day" };
  if (parts.length === 2)
    return { d: 1, m: parts[0], y: parts[1], precision: "month" };
  if (parts.length === 1) return { d: 1, m: 1, y: parts[0], precision: "year" };
  return null;
};

export const sortValue = (str) => {
  const p = parseDateParts(str);
  if (!p) return 0;
  return p.y * 10000 + p.m * 100 + (p.precision === "day" ? p.d : 0);
};

export const parseDate = (str) => sortValue(str);

export const byDateEndDesc = (list = []) =>
  [...list].sort((a, b) => sortValue(b.dateEnd) - sortValue(a.dateEnd));

export const byDateDesc =
  (key) =>
  (list = []) =>
    [...list].sort((x, y) => sortValue(y[key]) - sortValue(x[key]));

export const sameDate = (begin, end) => {
  if (!begin || !end) return false;
  return sortValue(begin) === sortValue(end);
};

export const durationInfo = (begin, end) => {
  const b = parseDateParts(begin);
  const e = parseDateParts(end);
  if (!b || !e || b.precision !== "day" || e.precision !== "day") return null;

  const bd = new Date(b.y, b.m - 1, b.d);
  const ed = new Date(e.y, e.m - 1, e.d);
  const days = Math.round((ed - bd) / 86400000) + 1; // inclusive of both ends
  if (days <= 0) return null;

  if (days > 14) return { value: Math.round(days / 7), unit: "week" };
  return { value: days, unit: "day" };
};

export const formatDateRange = (begin, end) => {
  if (!begin && !end) return null;
  if (!begin || sameDate(begin, end)) return end || begin;
  if (!end) return begin;
  return `${begin} → ${end}`;
};
