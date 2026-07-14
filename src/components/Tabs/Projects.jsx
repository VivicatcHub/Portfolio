import { useTranslation } from "react-i18next";
import Title from "../Title";
import ProjectCard from "../ProjectCard";
import useData from "../useData";
import { byDateDesc } from "../dateUtils";

const sortByDate = byDateDesc("date");

const Projects = () => {
  const { t: translate } = useTranslation();
  const data = useData();
  const projects = data?.projects || [];

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
              {sortByDate(group.items).map((project, idx) => (
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
