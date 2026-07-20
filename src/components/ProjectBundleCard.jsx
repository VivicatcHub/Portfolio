import { useTranslation } from "react-i18next";
import ProjectMeta from "./ProjectMeta";

const MAX_TILES = 4;

const ProjectBundleCard = ({ project, onOpen }) => {
  const { t: translate } = useTranslation();
  const subProjects = project.subProjects || [];
  const important = project.important;
  const extra = subProjects.length - MAX_TILES;
  const tiles = subProjects.slice(0, MAX_TILES);

  const open = () => onOpen(project);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={open}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && open()}
      className={
        "relative w-full lg:w-[50%] lg:shrink-0 lg:min-h-fit rounded-lg my-2 mb-3 lg:first:ml-12 lg:last:mr-12 p-4 md:p-10 cursor-pointer group transition-all duration-200 hover:-translate-y-0.5 " +
        (important
          ? "bg-gradient-to-br from-gray-700 via-gray-700 to-ayu-purple/25 ring-2 ring-ayu-purple/60 shadow-[0_0_30px_-6px_rgba(198,80,230,0.55)] hover:ring-ayu-purple"
          : "bg-gray-700 ring-1 ring-transparent hover:ring-2 hover:ring-ayu-purple/60")
      }
    >
      {important && (
        <span className="absolute -top-2 left-4 lg:left-8 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-white bg-gradient-to-r from-ayu-purple to-ayu-yellow shadow-md">
          ★ {translate("projectCard.featured")}
        </span>
      )}

      <div className="flex flex-col h-full">
        <div className="flex flex-col mb-4 ml-4 lg:ml-0">
          <div className="flex flex-col lg:items-center lg:flex-row">
            <h2 className="text-lg md:text-2xl font-semibold group-hover:text-ayu-purple transition-colors">
              {project.name}
            </h2>
            {project.company && (
              <span className="mx-2 font-normal text-base hidden lg:block">
                - {project.company}
              </span>
            )}
            <span className="mt-1 lg:mt-0 lg:ml-3 inline-flex w-fit items-center px-2 py-0.5 rounded-full border border-ayu-purple/40 bg-ayu-purple/15 text-ayu-purple text-[11px] font-medium">
              {translate("projectCard.bundleCount", {
                count: subProjects.length,
              })}
            </span>
          </div>
          <ProjectMeta project={project} variant="dark" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {tiles.map((sub, i) => (
            <div
              key={sub.id || i}
              className="rounded-md bg-gray-800/70 border border-gray-600 p-3 min-h-[3.75rem] flex items-center justify-center text-center text-sm font-medium text-gray-100"
            >
              {sub.name}
            </div>
          ))}
        </div>

        {extra > 0 && (
          <div className="mt-3 flex justify-end">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-ayu-purple/80 group-hover:bg-ayu-purple text-white text-xs font-medium transition-colors">
              +{extra} {translate("projectCard.more")}
            </span>
          </div>
        )}

        <div className="mt-4 text-[11px] text-gray-400 group-hover:text-ayu-purple transition-colors flex items-center gap-1">
          {translate("projectCard.openBundle")}
          <span
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-0.5"
          >
            →
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectBundleCard;
