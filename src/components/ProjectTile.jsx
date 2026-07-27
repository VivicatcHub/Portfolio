import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { formatDateRange } from "./dateUtils";

const STYLES = {
  dark: {
    card: "bg-gray-700 ring-1 ring-transparent hover:ring-2 hover:ring-ayu-purple/60",
    important:
      "bg-gradient-to-br from-gray-700 via-gray-700 to-ayu-purple/25 ring-2 ring-ayu-purple/60 shadow-[0_0_30px_-6px_rgba(198,80,230,0.55)] hover:ring-ayu-purple",
    title: "text-white group-hover:text-ayu-purple",
    company: "text-gray-400",
    badge: "bg-gray-800/70 text-gray-200 border-gray-600",
    count: "border-ayu-purple/40 bg-ayu-purple/15 text-ayu-purple",
    teaser: "text-gray-300",
    arrow: "text-gray-500 group-hover:text-ayu-purple",
  },
  light: {
    card: "bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-ayu-purple/40",
    important:
      "bg-gradient-to-br from-white to-ayu-purple/5 border border-ayu-purple/40 ring-1 ring-ayu-purple/30 shadow-sm hover:shadow-md hover:border-ayu-purple/60",
    title: "text-gray-900 group-hover:text-ayu-purple",
    company: "text-gray-500",
    badge: "bg-gray-50 text-gray-600 border-gray-200",
    count: "border-ayu-purple/30 bg-ayu-purple/10 text-ayu-purple",
    teaser: "text-gray-600",
    arrow: "text-gray-300 group-hover:text-ayu-purple",
  },
};

const ProjectTile = ({ project, to, variant = "dark" }) => {
  const { t: translate } = useTranslation();
  const style = STYLES[variant] || STYLES.dark;
  const subProjects = project.subProjects;
  const dateRange = formatDateRange(project.dateBegin, project.dateEnd);

  const teaser = subProjects
    ? subProjects.map((sub) => sub.name).join(" · ")
    : project.description;

  return (
    <Link
      to={to}
      title={translate("projectCard.details")}
      className={
        "group relative flex flex-col rounded-xl p-4 md:p-5 transition-all duration-200 hover:-translate-y-0.5 " +
        (project.important ? style.important : style.card)
      }
    >
      {project.important && (
        <span className="absolute -top-2.5 left-4 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-white bg-gradient-to-r from-ayu-purple to-ayu-yellow shadow-md">
          ★ {translate("projectCard.featured")}
        </span>
      )}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3
            className={`text-base md:text-lg font-semibold truncate transition-colors ${style.title}`}
          >
            {project.name}
          </h3>
          {project.company && (
            <p className={`text-xs truncate ${style.company}`}>
              {project.company}
            </p>
          )}
        </div>
        <span
          aria-hidden="true"
          className={`shrink-0 transition-transform group-hover:translate-x-0.5 ${style.arrow}`}
        >
          →
        </span>
      </div>
      {(dateRange || subProjects) && (
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {dateRange && (
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[11px] font-medium ${style.badge}`}
            >
              {dateRange}
            </span>
          )}
          {subProjects && (
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[11px] font-medium ${style.count}`}
            >
              {translate("projectCard.bundleCount", {
                count: subProjects.length,
              })}
            </span>
          )}
        </div>
      )}
      {teaser && (
        <p className={`mt-3 text-sm line-clamp-2 ${style.teaser}`}>{teaser}</p>
      )}
    </Link>
  );
};

export default ProjectTile;
