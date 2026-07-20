import { useTranslation } from "react-i18next";
import SkillGrid from "./SkillGrid";
import ProjectMeta from "./ProjectMeta";

const ProjectCard = ({ project }) => {
  const { t: translate } = useTranslation();
  const stack = project.stack;
  const important = project.important;

  return (
    <div
      className={
        "relative w-full lg:w-[50%] lg:shrink-0 lg:min-h-fit rounded-lg my-2 mb-3 lg:first:ml-12 lg:last:mr-12 p-4 md:p-10 lg:flex " +
        (important
          ? "bg-gradient-to-br from-gray-700 via-gray-700 to-ayu-purple/25 ring-2 ring-ayu-purple/60 shadow-[0_0_30px_-6px_rgba(198,80,230,0.55)]"
          : "bg-gray-700")
      }
    >
      {important && (
        <span className="absolute -top-2 left-4 lg:left-8 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-white bg-gradient-to-r from-ayu-purple to-ayu-yellow shadow-md">
          ★ {translate("projectCard.featured")}
        </span>
      )}
      <div className="flex">
        {project.cover && (
          <>
            <div className="hidden lg:flex items-center flex-col justify-between w-1/3">
              <div className="w-full aspect-square p-4 flex justify-center items-center">
                <img src={project.cover} className="w-4/5" alt="" />
              </div>
            </div>
            <div className="hidden lg:block h-full border-r-1 border-superLightGray w-0 mx-8"></div>
          </>
        )}
        <div
          className={
            "flex flex-col justify-between" +
            (project.cover ? "lg:w-2/3" : "lg:w-1")
          }
        >
          <div>
            <div className="flex flex-col mb-6 ml-4 lg:ml-0">
              <div className="flex flex-col lg:items-center lg:flex-row">
                <h2 className="text-lg md:text-2xl font-semibold">
                  <a href={project.link} className="hover:underline">
                    {project.name}
                  </a>
                </h2>
                {project.company && (
                  <span className="mx-2 font-normal text-base hidden lg:block">
                    - {project.company}
                  </span>
                )}
              </div>
              <ProjectMeta project={project} variant="dark" />
            </div>
            <p className="w-full whitespace-pre-wrap text-justify">
              {project.description}
            </p>
          </div>
          <div className="mt-8 lg:mt-6">
            <SkillGrid skills={stack} category="Stack" size="sm" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
