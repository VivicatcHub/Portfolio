export const parseDate = (str) => {
  if (!str) return 0;
  const [a, b] = String(str).split("/");
  if (b !== undefined) return Number(b) * 100 + Number(a); // MM/YYYY
  return Number(a) * 100; // YYYY only
};

export const byDateDesc =
  (key) =>
  (list = []) =>
    [...list].sort((x, y) => parseDate(y[key]) - parseDate(x[key]));
