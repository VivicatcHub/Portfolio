import { durationInfo, parseDateParts, sortValue } from "./dateUtils";
import { parseSkill } from "./skillMarkup";

export const AI_TAGS = ["Without AI", "With AI"];

export const allWorks = (groups = []) =>
  groups.flatMap((group) =>
    (group.items || []).flatMap((item) => [item, ...(item.subProjects || [])]),
  );

export const byBeginDesc = (list = []) =>
  [...list].sort(
    (a, b) =>
      sortValue(b.dateBegin || b.dateEnd) - sortValue(a.dateBegin || a.dateEnd),
  );

const yearOf = (str) => parseDateParts(str)?.y ?? null;

export const yearLabel = (work, inProgressLabel) => {
  const begin = yearOf(work.dateBegin);
  const end = yearOf(work.dateEnd);
  if (!work.dateEnd && work.status === "in_progress" && begin)
    return `${begin} – ${inProgressLabel}`;
  if (begin && end && begin !== end) return `${begin}–${end}`;
  return String(begin || end || "");
};

export const stackOf = (work) => {
  const stack = work.stack || {};
  return Object.entries(stack).flatMap(([category, list]) =>
    (list || []).map((raw) => ({ ...parseSkill(raw), category })),
  );
};

export const aiTagOf = (work) => {
  const found = stackOf(work).find((skill) => AI_TAGS.includes(skill.name));
  return found ? found.name : null;
};

export const durationOf = (work) => durationInfo(work.dateBegin, work.dateEnd);

export const durationKey = ({ value, unit }) => {
  if (unit === "week") return value > 1 ? "durationWeeks" : "durationWeek";
  return value > 1 ? "durationDays" : "durationDay";
};

export const keySkillOf = (work, hasIcon = () => true) => {
  const skills = stackOf(work).filter(
    (skill) => !AI_TAGS.includes(skill.name) && hasIcon(skill.name),
  );
  return (skills.find((skill) => skill.important) || skills[0] || {}).name;
};
