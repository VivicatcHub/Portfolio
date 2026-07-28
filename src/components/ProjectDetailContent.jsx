import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import ProjectMeta from "./ProjectMeta";
import SkillChips from "./SkillChips";

const STYLES = {
  dark: {
    title: "text-white",
    company: "text-gray-400",
    description: "text-gray-200",
    cover: "bg-gray-800/60 border border-gray-700",
    link: "bg-ayu-purple/80 hover:bg-ayu-purple text-white",
    github:
      "bg-gray-800/60 hover:bg-gray-800 border border-gray-600 text-gray-100",
  },
  light: {
    title: "text-gray-900",
    company: "text-gray-500",
    description: "text-gray-700",
    cover: "bg-gray-50 border border-gray-200",
    link: "bg-ayu-purple/90 hover:bg-ayu-purple text-white",
    github: "bg-white hover:bg-gray-50 border border-gray-300 text-gray-800",
  },
};

const setMetaDescription = (content) => {
  let tag = document.querySelector('meta[name="description"]');
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", "description");
    document.head.appendChild(tag);
  }
  const previous = tag.getAttribute("content");
  tag.setAttribute("content", content);
  return () => {
    if (previous == null) tag.remove();
    else tag.setAttribute("content", previous);
  };
};

const ProjectDetailContent = ({ project, variant = "dark" }) => {
  const { t: translate } = useTranslation();
  const style = STYLES[variant] || STYLES.dark;
  const owner = translate("home.name");
  const { name, description } = project;

  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${name} — ${owner}`;
    const restoreMeta = setMetaDescription(
      (description || name).slice(0, 300).replace(/\s+/g, " "),
    );
    return () => {
      document.title = previousTitle;
      restoreMeta();
    };
  }, [name, description, owner]);

  return (
    <article>
      <div className="flex flex-col sm:flex-row sm:items-center gap-5">
        {project.icon && (
          <div
            className={`w-20 h-20 shrink-0 rounded-xl flex items-center justify-center ${style.cover}`}
          >
            <img
              src={project.icon}
              alt={project.name}
              className="max-w-[70%] max-h-[70%]"
            />
          </div>
        )}
        <div className="min-w-0">
          {project.important && (
            <span className="inline-flex items-center gap-1 mb-2 px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-white bg-gradient-to-r from-ayu-purple to-ayu-yellow shadow-md">
              ★ {translate("projectCard.featured")}
            </span>
          )}
          <h1
            className={`text-2xl md:text-4xl font-bold tracking-tight ${style.title}`}
          >
            {name}
          </h1>
          {project.company && (
            <p className={`mt-1 text-sm ${style.company}`}>{project.company}</p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <ProjectMeta project={project} variant={variant} />
      </div>

      {description && (
        <p
          className={`mt-8 whitespace-pre-wrap text-justify leading-relaxed ${style.description}`}
        >
          {description}
        </p>
      )}

      {(project.link || project.github) && (
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium shadow-sm transition-colors ${style.link}`}
            >
              {translate("projectCard.openLink")}
              <span aria-hidden="true">↗</span>
            </a>
          )}

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium shadow-sm transition-colors ${style.github}`}
            >
              <svg
                viewBox="0 0 16 16"
                aria-hidden="true"
                className="w-4 h-4 fill-current"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              {translate("projectCard.openGithub")}
            </a>
          )}
        </div>
      )}

      <div className="mt-8">
        {project.images && (
          <h2
            className={`mb-4 text-xs font-semibold uppercase tracking-wider ${variant === "white" ? "text-gray-500" : "text-gray-400"}`}
          >
            IMAGES
          </h2>
        )}
        {project.images &&
          project.images.map((image) => (
            <div
              className={`w-200 h-200 shrink-0 rounded-xl flex items-center justify-center ${style.cover}`}
            >
              <img
                src={image}
                alt={image}
                className="w-auto h-[100%] rounded-xl"
              />
            </div>
          ))}
      </div>

      {project.stack && (
        <div className="mt-8">
          <SkillChips
            skills={project.stack}
            title={translate("projectCard.stack")}
            variant={variant}
          />
        </div>
      )}
    </article>
  );
};

export default ProjectDetailContent;
