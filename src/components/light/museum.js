import { parseDateParts, sortValue } from "../dateUtils";
import { AI_TAGS, allWorks, byBeginDesc, stackOf } from "../projectData";

export {
  AI_TAGS,
  aiTagOf,
  allWorks,
  byBeginDesc,
  durationKey,
  durationOf,
  stackOf,
  yearLabel,
} from "../projectData";

export const workPath = (work) =>
  work.subProjects ? `/pro/projects/${work.id}` : `/pro/project/${work.id}`;

export const catalogue = (groups = []) => {
  const numbers = {};
  [...allWorks(groups)]
    .sort(
      (a, b) =>
        sortValue(a.dateBegin || a.dateEnd) -
        sortValue(b.dateBegin || b.dateEnd),
    )
    .forEach((work, i) => {
      numbers[work.id] = i + 1;
    });
  return numbers;
};

export const countWorks = (groups = []) =>
  allWorks(groups).filter((work) => !work.subProjects).length;

const yearOf = (str) => parseDateParts(str)?.y ?? null;

export const yearSpan = (groups = []) => {
  const years = allWorks(groups)
    .flatMap((work) => [yearOf(work.dateBegin), yearOf(work.dateEnd)])
    .filter(Boolean);
  if (years.length === 0) return null;
  return { from: Math.min(...years), to: Math.max(...years) };
};

export const featuredWork = (groups = []) => {
  const candidates = byBeginDesc(
    allWorks(groups).filter((work) => work.cover && !work.subProjects),
  );
  return (
    candidates.find(
      (work) => work.important && /^https?:/.test(work.link || ""),
    ) ||
    candidates.find((work) => work.important) ||
    candidates[0] ||
    null
  );
};

export const mediumOf = (work, max = 5) => {
  const skills = stackOf(work).filter((skill) => !AI_TAGS.includes(skill.name));
  const ordered = [
    ...skills.filter((skill) => skill.important),
    ...skills.filter((skill) => !skill.important),
  ];
  const names = [...new Set(ordered.map((skill) => skill.name))];
  return { names: names.slice(0, max), rest: Math.max(0, names.length - max) };
};

export const usageCounts = (groups = []) => {
  const counts = {};
  allWorks(groups).forEach((work) => {
    new Set(stackOf(work).map((skill) => skill.name)).forEach((name) => {
      counts[name] = (counts[name] || 0) + 1;
    });
  });
  return counts;
};
