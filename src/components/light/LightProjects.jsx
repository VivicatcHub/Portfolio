import { useTranslation } from "react-i18next";
import useData from "./useData";
import LightSection from "./LightSection";
import { SkillIcon } from "../SkillReactIcons";
import ProjectMeta from "../ProjectMeta";
import useSkillLabels from "../skillI18n";
import { byDateDesc } from "../dateUtils";

const sortByDate = byDateDesc("date");

const LightProjects = () => {
  const { t: translate } = useTranslation();
  const data = useData();
  const labels = useSkillLabels();
  const groups = data?.projects || [];

  return (
    <LightSection title={translate("home.projects")}>
      <div className="space-y-12">
        {groups.map((group, gi) => (
          <div key={gi}>
            <h2 className="text-lg font-semibold text-gray-500 mb-5">
              {group.category}
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {sortByDate(group.items).map((project, pi) => {
                const stack = project.stack;
                const skills = Object.values(stack).flat();
                return (
                  <a
                    key={pi}
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:border-ayu-purple/40 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      {project.cover && (
                        <div className="w-14 h-14 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                          <img
                            src={project.cover}
                            alt=""
                            className="max-w-[70%] max-h-[70%]"
                          />
                        </div>
                      )}
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-ayu-purple flex items-center gap-1.5">
                          {project.name}
                          <span
                            aria-hidden="true"
                            className="text-gray-300 group-hover:text-ayu-purple transition-transform group-hover:translate-x-0.5"
                          >
                            ↗
                          </span>
                        </h3>
                        {project.company && (
                          <p className="text-sm text-gray-500">
                            {project.company}
                          </p>
                        )}
                      </div>
                    </div>
                    <ProjectMeta project={project} variant="light" />
                    <p className="mt-4 text-sm text-gray-600 whitespace-pre-wrap flex-grow">
                      {project.description}
                    </p>
                    {skills.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {skills.map((name) => (
                          <span
                            key={name}
                            title={labels.name(name)}
                            className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-gray-50 border border-gray-100 text-xs text-gray-700"
                          >
                            <SkillIcon name={name} size={14} />
                            {labels.name(name)}
                          </span>
                        ))}
                      </div>
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </LightSection>
  );
};

export default LightProjects;
