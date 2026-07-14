import SkillGrid from "./SkillGrid";
import ProjectMeta from "./ProjectMeta";

const ProjectCard = ({ project }) => {
  const stack = project.stack;

  return (
    <div className="w-full lg:w-[50%] lg:shrink-0 lg:min-h-fit rounded-lg my-2 mb-3 lg:first:ml-12 lg:last:mr-12 bg-gray-700 p-4 md:p-10 lg:flex">
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
