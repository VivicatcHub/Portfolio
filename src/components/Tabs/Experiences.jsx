import { useTranslation } from "react-i18next";
import Title from "../Title";
import { SkillIcon } from "../SkillReactIcons";
import useData from "../useData";
import useSkillLabels from "../skillI18n";
import { byDateDesc } from "../dateUtils";

const sortByStartDate = byDateDesc("startDate");

const flattenSkills = (skills) => [
  ...new Set(
    Object.values(skills).flatMap((group) => Object.values(group).flat()),
  ),
];

const Experiences = () => {
  const { t: translate } = useTranslation();
  const data = useData();
  const labels = useSkillLabels();
  const xps = data?.experiences || [];

  return (
    <div className="h-full max-w-7xl mx-auto flex flex-col lg:flex-row text-white pt-8 overflow-y-auto">
      <div className="px-2 md:px-4 lg:px-6 mb-6">
        <Title text={translate("experiences.title")} />
        <div className="px-12 space-y-6">
          <div className="relative px-[19px] space-y-8 before:absolute before:top-2 before:bottom-0 before:w-0.5 before:-left-2 before:bg-gray-700">
            {sortByStartDate(xps).map((xp, idx) => (
              <div
                key={idx}
                className="flex flex-col relative before:absolute before:top-2 before:w-4 before:h-4 before:rounded-full before:left-[-34px] before:z-[1] before:bg-ayu-purple"
              >
                <h3>
                  <span className="text-xl font-semibold">{xp.company}</span>
                  <span className="italic">{xp.xp && ` - ${xp.xp}`}</span>
                </h3>
                <time className="text-xs tracking-wide uppercase text-gray-400">
                  {xp.startDate} - {xp.endDate}
                </time>
                <p className="mt-3 whitespace-pre-wrap">{xp.description}</p>
                {xp.skills && (
                  <div className="mt-4">
                    <span className="block text-sm font-semibold text-ayu-purple mb-2">
                      {translate("experiences.skillsLabel")}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {flattenSkills(xp.skills).map((name) => (
                        <span
                          key={name}
                          title={labels.name(name)}
                          className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-gray-700 border border-gray-600 text-xs text-gray-200"
                        >
                          <SkillIcon name={name} size={14} />
                          {labels.name(name)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experiences;
