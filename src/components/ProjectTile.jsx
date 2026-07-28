import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { formatDateRange } from "./dateUtils";
import "./cardAnimation.css";

const STYLES = {
  dark: {
    card: "bg-gray-700 ring-1 ring-transparent hover:ring-2 hover:ring-ayu-purple/60",
    important:
      "bg-gray-700 bg-gradient-to-br from-gray-700 via-gray-700 to-ayu-purple/25 ring-2 ring-ayu-purple/60 shadow-[0_0_30px_-6px_rgba(198,80,230,0.55)] hover:ring-ayu-purple",
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
      "bg-white bg-gradient-to-br from-white to-ayu-purple/5 border border-ayu-purple/40 ring-1 ring-ayu-purple/30 shadow-sm hover:border-ayu-purple/70",
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
  const hasCover = Boolean(project.cover);

  const subProjects = project.subProjects;
  const dateRange = formatDateRange(project.dateBegin, project.dateEnd);

  const teaser = subProjects
    ? translate("projectCard.bundleCount", {
        count: subProjects.length,
      }) +
      ": " +
      subProjects.map((sub) => sub.name).join(" · ")
    : project.description;

  const inverted = false;

  return (
    <Link
      to={to}
      title={translate("projectCard.details")}
      className={[
        "group relative card_t",
        hasCover && "has-cover_t",
        project.important && "important_t",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {project.important && (
        <span className="featured_t absolute -top-2.5 left-4 z-20 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-ayu-purple to-ayu-yellow px-2.5 py-0.5 text-[11px] font-semibold text-white shadow-md">
          ★ {translate("projectCard.featured")}
        </span>
      )}

      {/* Image layer */}
      {hasCover && (
        <div className={inverted ? "wrapper_t" : "character_t"}>
          <img
            src={project.cover}
            alt=""
            className={[
              "rounded-xl sm:rounded-[0]",
              inverted ? "cover-image_t" : "",
            ].join(" ")}
          />
        </div>
      )}

      {/* Card content */}
      <div
        className={[
          !inverted ? "wrapper_t" : "character_t",
          "rounded-xl p-4 md:p-5",
          project.important ? style.important : style.card,
          "w-[100%]",
        ].join(" ")}
      >
        <div
          className={[
            "flex items-start justify-between gap-3",
            hasCover && "hidden md:flex",
          ].join(" ")}
        >
          <div className="min-w-0">
            <h3
              className={`truncate text-base font-semibold md:text-lg ${style.title}`}
            >
              {project.name}
            </h3>

            {project.company && (
              <p className={`truncate text-xs ${style.company}`}>
                {project.company}
              </p>
            )}
          </div>

          <span
            aria-hidden="true"
            className={`shrink-0 transition-transform group-hover:translate-x-1 ${style.arrow}`}
          >
            →
          </span>
        </div>

        {(dateRange || subProjects) && (
          <div
            className={[
              "flex items-start justify-between gap-3",
              hasCover && "hidden md:flex",
            ].join(" ")}
          >
            {dateRange && (
              <span
                className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${style.badge}`}
              >
                {dateRange}
              </span>
            )}

            {subProjects && (
              <span
                className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${style.count}`}
              >
                {translate("projectCard.bundleCount", {
                  count: subProjects.length,
                })}
              </span>
            )}
          </div>
        )}

        {teaser && (
          <p
            className={[
              "flex items-start justify-between gap-3 mt-3 text-sm line-clamp-2",
              hasCover && "hidden text-[0] md:text-sm",
            ].join(" ")}
          >
            {teaser}
          </p>
        )}
      </div>
    </Link>
  );
};

export default ProjectTile;
