import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const mergeProjects = (projects = [], tr) =>
  projects.map((group) => ({
    ...group,
    category: tr?.projects?.categories?.[group.category] ?? group.category,
    items: (group.items || []).map((item) => ({
      ...item,
      ...(tr?.projects?.items?.[item.id] || {}),
    })),
  }));

const mergeExperiences = (experiences = [], tr) =>
  experiences.map((xp) => ({
    ...xp,
    ...(tr?.experiences?.items?.[xp.id] || {}),
  }));

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
