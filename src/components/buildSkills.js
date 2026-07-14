import { hasSkillIcon } from "./SkillReactIcons";

const canonicalCategory = (result, category) =>
  Object.keys(result).find(
    (key) => key.toLowerCase() === category.toLowerCase(),
  ) || category;

export const buildSkills = (data) => {
  const result = {};
  const seen = new Set();

  const add = (rawCategory, name) => {
    if (!rawCategory || !name || seen.has(name) || !hasSkillIcon(name)) return;
    const category = canonicalCategory(result, rawCategory);
    if (!result[category]) result[category] = [];
    result[category].push({ name });
    seen.add(name);
  };

  Object.entries(data?.skills || {}).forEach(([category, list]) =>
    (list || []).forEach((skill) =>
      add(category, typeof skill === "string" ? skill : skill?.name),
    ),
  );

  (data?.projects || []).forEach((group) =>
    (group?.items || []).forEach((project) => {
      const stack = project?.stack;
      if (stack && typeof stack === "object") {
        Object.entries(stack).forEach(([category, names]) =>
          (names || []).forEach((name) => add(category, name)),
        );
      }
    }),
  );

  return result;
};

export default buildSkills;
