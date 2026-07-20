import { hasSkillIcon } from "./SkillReactIcons";
import { skillName } from "./skillMarkup";

const canonicalCategory = (result, category) =>
  Object.keys(result).find(
    (key) => key.toLowerCase() === category.toLowerCase(),
  ) || category;

export const buildSkills = (data) => {
  const result = {};
  const seen = new Set();
  const important = new Set(data?.importantSkills || []);

  const add = (rawCategory, name) => {
    if (!rawCategory || !name || seen.has(name) || !hasSkillIcon(name)) return;
    const category = canonicalCategory(result, rawCategory);
    if (!result[category]) result[category] = [];
    result[category].push({ name, important: important.has(name) });
    seen.add(name);
  };

  Object.entries(data?.skills || {}).forEach(([category, list]) =>
    (list || []).forEach((skill) =>
      add(category, typeof skill === "string" ? skill : skill?.name),
    ),
  );

  (data?.projects || []).forEach((group) =>
    (group?.items || []).forEach((project) => {
      const collect = (item) => {
        const stack = item?.stack;
        if (stack && typeof stack === "object") {
          Object.entries(stack).forEach(([category, names]) =>
            (names || []).forEach((name) => add(category, skillName(name))),
          );
        }
      };
      collect(project);
      (project?.subProjects || []).forEach(collect);
    }),
  );

  Object.keys(result).forEach((category) => {
    result[category].sort((a, b) => Number(b.important) - Number(a.important));
  });

  return result;
};

export default buildSkills;
