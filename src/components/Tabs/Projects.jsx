import { useState } from "react";
import { useTranslation } from "react-i18next";
import Title from "../Title";
import ProjectCard from "../ProjectCard";
import ProjectBundleCard from "../ProjectBundleCard";
import useData from "../useData";
import { byDateEndDesc } from "../dateUtils";

const findBundle = (groups, id) => {
  for (const group of groups) {
    for (const item of group.items || []) {
      if (item.id === id && item.subProjects) return item;
    }
  }
  return null;
};

const Projects = () => {
  const { t: translate } = useTranslation();
  const data = useData();
  const projects = data?.projects || [];
  const [activeBundleId, setActiveBundleId] = useState(null);

  // Look the bundle up fresh from merged data so it re-translates on language
  // change instead of holding a stale snapshot taken at click time.
  const activeBundle = activeBundleId
    ? findBundle(projects, activeBundleId)
    : null;

  if (activeBundle) {
    const subs = byDateEndDesc(activeBundle.subProjects || []);
    return (
      <div className="text-white flex flex-col h-full overflow-y-scroll lg:overflow-y-auto pt-8 md:pt-12">
        <div className="px-2 md:px-4 lg:px-12">
          <button
            type="button"
            onClick={() => setActiveBundleId(null)}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-700 hover:bg-gray-600 text-sm font-medium transition-colors"
          >
            <span aria-hidden="true">←</span>
            {translate("projectCard.backToProjects")}
          </button>
        </div>
        <Title text={activeBundle.name} />
        <div className="flex-grow flex max-w-full h-fit">
          <div className="h-full w-full lg:pb-10 px-2 md:px-4 lg:px-0 flex flex-col lg:flex-row overflow-y-scroll overflow-x-hidden lg:overflow-y-hidden lg:overflow-x-scroll gap-8">
            {subs.map((project, idx) => (
              <ProjectCard key={project.id || idx} project={project} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-white flex flex-col h-full overflow-y-scroll lg:overflow-y-auto pt-8 md:pt-12">
      <Title text={translate("home.projects")} />
      {projects.map((group, groupIdx) => (
        <div key={groupIdx} className="mb-4">
          <h2 className="text-xl md:text-2xl font-semibold px-2 md:px-4 lg:px-12 mb-2">
            {group.category}
          </h2>
          <div className="flex-grow flex max-w-full h-fit">
            <div className="h-full w-full lg:pb-10 px-2 md:px-4 lg:px-0 flex flex-col lg:flex-row overflow-y-scroll overflow-x-hidden lg:overflow-y-hidden lg:overflow-x-scroll gap-8">
              {byDateEndDesc(group.items).map((project, idx) =>
                project.subProjects ? (
                  <ProjectBundleCard
                    key={project.id || idx}
                    project={project}
                    onOpen={(p) => setActiveBundleId(p.id)}
                  />
                ) : (
                  <ProjectCard key={project.id || idx} project={project} />
                ),
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;
