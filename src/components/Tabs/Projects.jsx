import { useTranslation } from "react-i18next";
import Title from "../Title";
import ProjectCard from "../ProjectCard";
import { useEffect, useState } from "react";

const Projects = () => {
  const { t: translate, i18n } = useTranslation();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const lang = (i18n?.language || "en").split("-")[0];
    fetch(`/locales/${lang}/data.json`)
      .then((res) => res.json())
      .then((json) => setProjects(json.data?.projects || []))
      .catch(() => setProjects([]));
  }, [i18n?.language]);

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
              {group.items.map((project, idx) => (
                <ProjectCard key={idx} project={project} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;
