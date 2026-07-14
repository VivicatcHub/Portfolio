import { useTranslation } from "react-i18next";

const useSkillLabels = () => {
  const { i18n } = useTranslation();
  const lang = (i18n?.language || "en").split("-")[0];
  const bundle = i18n?.getResourceBundle?.(lang, "translation") || {};
  const names = bundle?.skills?.names || {};
  const categories = bundle?.skills?.categories || {};

  return {
    name: (value) => names[value] || value,
    category: (value) => categories[value] || value,
  };
};

export default useSkillLabels;
