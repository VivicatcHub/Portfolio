import { useTranslation } from "react-i18next";
import useData from "./useData";
import LightSection from "./LightSection";
import { SkillIcon } from "../SkillReactIcons";
import { buildSkills } from "../buildSkills";
import useSkillLabels from "../skillI18n";
import { skillLabelSizeClass } from "../skillMarkup";

const LightSkills = () => {
  const { t: translate } = useTranslation();
  const data = useData();
  const labels = useSkillLabels();
  const skills = data ? buildSkills(data) : {};

  return (
    <LightSection title={translate("skills.title")}>
      <div className="space-y-10">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category}>
            <h2 className="text-lg font-semibold text-gray-500 mb-4">
              {labels.category(category)}
            </h2>
            <div className="flex flex-wrap gap-4">
              {items.map((skill) => (
                <div
                  key={skill.name}
                  className={
                    "relative flex flex-col items-center justify-center w-24 h-24 rounded-xl border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all " +
                    (skill.important
                      ? "border-ayu-purple/50 bg-gradient-to-br from-ayu-purple/10 to-ayu-yellow/10 ring-1 ring-ayu-purple/40"
                      : "border-gray-200 bg-white")
                  }
                >
                  {skill.important && (
                    <span
                      className="absolute top-1 right-1.5 text-ayu-purple text-sm"
                      title="Key skill"
                      aria-label="Key skill"
                    >
                      ★
                    </span>
                  )}
                  <SkillIcon name={skill.name} size={36} />
                  <span
                    className={
                      "mt-2 text-center px-1 leading-tight break-words " +
                      skillLabelSizeClass(labels.name(skill.name), "xs") +
                      " " +
                      (skill.important
                        ? "font-semibold text-gray-800"
                        : "text-gray-600")
                    }
                  >
                    {labels.name(skill.name)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </LightSection>
  );
};

export default LightSkills;
