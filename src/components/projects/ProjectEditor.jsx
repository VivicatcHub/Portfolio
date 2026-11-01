import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";
import { SkillIcon, hasSkillIcon } from "../SkillReactIcons";
import { keySkillOf } from "../projectData";
import CssRule from "./CssRule";
import { Breadcrumb, ProjectActions, Shot } from "./ProjectPreview";
import "./devProjects.css";

const useDocumentTitle = (project, owner) => {
  useEffect(() => {
    if (!project?.name) return undefined;
    const previous = document.title;
    document.title = `${project.name} — ${owner}`;
    return () => {
      document.title = previous;
    };
  }, [project?.name, owner]);
};

const ProjectEditor = ({ project, back }) => {
  const { t: translate } = useTranslation();
  useDocumentTitle(project, translate("home.name"));

  const skill = keySkillOf(project, hasSkillIcon);
  const images = [
    ...new Set([project.cover, ...(project.images || [])].filter(Boolean)),
  ];

  return (
    <div className="dp-page">
      <div className="dp-page-bar">
        <Link to={back.to} className="dp-back">
          <ArrowLeftIcon className="dp-icon" aria-hidden="true" />
          {back.label}
        </Link>
        <Breadcrumb
          items={[
            translate("fileFinder.global"),
            translate("fileFinder.tabs.project"),
            `${project.id}.css`,
          ]}
        />
      </div>

      <article className="dp-page-body">
        <header className="dp-head">
          <span className="dp-head-icon">
            {project.icon ? (
              <img src={project.icon} alt="" />
            ) : (
              skill && <SkillIcon name={skill} size={30} />
            )}
          </span>
          <div className="dp-head-text">
            <h1 className="dp-head-title">
              {project.name}
              {project.important && (
                <span className="dp-featured">
                  <StarIcon className="dp-icon" aria-hidden="true" />
                  {translate("projectCard.featured")}
                </span>
              )}
            </h1>
            {project.company && (
              <p className="dp-head-sub">{project.company}</p>
            )}
          </div>
        </header>

        <div className="dp-page-grid">
          <div className="dp-readme">
            {project.description && (
              <p className="dp-prose">{project.description}</p>
            )}
            <ProjectActions project={project} />
          </div>
          <div className="dp-code-panel">
            <CssRule project={project} full />
          </div>
        </div>

        {images.length > 0 && (
          <section className="dp-gallery">
            <h2 className="dp-section-title">
              {translate("devProjects.captures")}
              <span className="dp-badge">{images.length}</span>
            </h2>
            <div className="dp-gallery-grid">
              {images.map((src, i) => (
                <Shot
                  key={src}
                  src={src}
                  href={src}
                  alt={translate("devProjects.captureAlt", {
                    name: project.name,
                    n: i + 1,
                  })}
                />
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
};

export default ProjectEditor;
