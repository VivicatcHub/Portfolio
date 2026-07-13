import { useTranslation } from "react-i18next";
import useData from "./useData";
import LightSection from "./LightSection";
import { SkillIcon } from "../SkillReactIcons";

const flattenSkills = (skills) => [
  ...new Set(
    Object.values(skills).flatMap((group) => Object.values(group).flat()),
  ),
];

const LightExperiences = () => {
  const { t: translate } = useTranslation();
  const data = useData();
  const xps = data?.experiences?.data || [];

  return (
    <LightSection title={translate("light.nav.experiences")}>
      <div className="relative border-l-2 border-gray-200 ml-3 space-y-10">
        {xps.map((xp, idx) => (
          <div key={idx} className="relative pl-8">
            <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-ayu-purple ring-4 ring-white" />
            <div className="flex flex-wrap items-baseline gap-x-2">
              <h3 className="text-xl font-semibold text-gray-900">
                {xp.company}
              </h3>
              {xp.xp && <span className="italic text-gray-500">— {xp.xp}</span>}
            </div>
            <time className="block text-xs uppercase tracking-wide text-gray-400 mt-1">
              {xp.startDate} - {xp.endDate}
            </time>
            <p className="mt-3 text-gray-600 whitespace-pre-wrap">
              {xp.description}
            </p>
            {xp.skills && (
              <div className="mt-4">
                <span className="block text-sm font-semibold text-ayu-purple mb-2">
                  {translate("data.experiences.skillsLabel")}
                </span>
                <div className="flex flex-wrap gap-2">
                  {flattenSkills(xp.skills).map((name) => (
                    <span
                      key={name}
                      title={name}
                      className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-gray-50 border border-gray-100 text-xs text-gray-700"
                    >
                      <SkillIcon name={name} size={14} />
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </LightSection>
  );
};

export default LightExperiences;
