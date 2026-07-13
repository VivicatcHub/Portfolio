import { useTranslation } from "react-i18next";
import useData from "./useData";
import LightSection from "./LightSection";
import { SkillIcon } from "../SkillReactIcons";
import { buildSkills } from "../buildSkills";

const LightSkills = () => {
  const { t: translate } = useTranslation();
  const data = useData();
  const skills = data ? buildSkills(data) : {};

  return (
    <LightSection title={translate("skills.title")}>
      <div className="space-y-10">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category}>
            <h2 className="text-lg font-semibold text-gray-500 mb-4">
              {category}
            </h2>
            <div className="flex flex-wrap gap-4">
              {items.map((skill) => (
                <div
                  key={skill.name}
                  className="flex flex-col items-center justify-center w-24 h-24 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <SkillIcon name={skill.name} size={36} />
                  <span className="mt-2 text-xs text-gray-600 text-center px-1">
                    {skill.name}
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
