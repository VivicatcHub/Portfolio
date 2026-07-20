export const parseSkill = (raw) => {
  if (typeof raw === "string") {
    const match = /^\*\*([\s\S]+)\*\*$/.exec(raw);
    if (match) return { name: match[1], important: true };
  }
  return { name: raw, important: false };
};

export const skillName = (raw) => parseSkill(raw).name;

// Shrink the label font when it is too long to fit a fixed-size skill card.
// `base` is the normal (short-label) size: "sm" for the dark page, "xs" for light.
export const skillLabelSizeClass = (label, base = "sm") => {
  const len = (label || "").length;
  if (base === "xs") {
    if (len <= 12) return "text-xs";
    if (len <= 20) return "text-[11px]";
    if (len <= 30) return "text-[10px]";
    return "text-[9px]";
  }
  if (len <= 12) return "text-sm";
  if (len <= 20) return "text-xs";
  if (len <= 30) return "text-[11px]";
  return "text-[10px]";
};

export default parseSkill;
