import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const mergeItem = (item, tr) => {
  const override = tr?.projects?.items?.[item.id] || {};
  const merged = { ...item, ...override };

  const companyMap = tr?.projects?.companies || {};
  if (item.company && companyMap[item.company] && override.company == null) {
    merged.company = companyMap[item.company];
  }

  if (item.subProjects) {
    merged.subProjects = item.subProjects.map((sub) => mergeItem(sub, tr));
  }
  return merged;
};

const mergeProjects = (projects = [], tr) =>
  projects.map((group) => ({
    ...group,
    category: tr?.projects?.categories?.[group.category] ?? group.category,
    items: (group.items || []).map((item) => mergeItem(item, tr)),
  }));

const mergeExperience = (xp, tr) => {
  const { roles: roleTitles, ...override } =
    tr?.experiences?.items?.[xp.id] || {};
  const merged = { ...xp, ...override };
  if (!xp.roles?.length) return merged;

  merged.roles = xp.roles.map((role, i) => ({
    ...role,
    title: roleTitles?.[i] ?? role.title,
  }));
  merged.startDate = merged.roles[0].startDate;
  merged.endDate = merged.roles[merged.roles.length - 1].endDate;
  return merged;
};

const mergeExperiences = (experiences = [], tr) =>
  experiences.map((xp) => mergeExperience(xp, tr));

const mergeData = (base, tr) => ({
  ...base,
  projects: mergeProjects(base.projects, tr),
  experiences: mergeExperiences(base.experiences, tr),
});

const useData = () => {
  const { i18n } = useTranslation();
  const lang = (i18n?.language || "en").split("-")[0];
  const [data, setData] = useState(null);

  useEffect(() => {
    let active = true;
    Promise.all([
      fetch("/locales/data.json").then((res) => res.json()),
      fetch(`/locales/${lang}.json`).then((res) => res.json()),
    ])
      .then(([base, tr]) => active && setData(mergeData(base, tr)))
      .catch(() => active && setData(null));
    return () => {
      active = false;
    };
  }, [lang]);

  return data;
};

export default useData;
