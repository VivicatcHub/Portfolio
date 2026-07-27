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
  },
  light: {
    title: "text-gray-900",
    company: "text-gray-500",
    description: "text-gray-700",
    cover: "bg-gray-50 border border-gray-200",
    link: "bg-ayu-purple/90 hover:bg-ayu-purple text-white",
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
        {project.cover && (
          <div
            className={`w-20 h-20 shrink-0 rounded-xl flex items-center justify-center ${style.cover}`}
          >
            <img
              src={project.cover}
              alt=""
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

      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className={`mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium shadow-sm transition-colors ${style.link}`}
        >
          {translate("projectCard.openLink")}
          <span aria-hidden="true">↗</span>
        </a>
      )}

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
