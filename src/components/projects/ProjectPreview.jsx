import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowTopRightOnSquareIcon,
  ChevronRightIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import CssRule from "./CssRule";

export const GithubMark = ({ className = "dp-icon" }) => (
  <svg
    viewBox="0 0 16 16"
    aria-hidden="true"
    className={className}
    fill="currentColor"
  >
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

export const fileName = (src) => (src || "").split("/").pop();

export const Shot = ({ src, alt = "", href, className = "" }) => {
  const [size, setSize] = useState(null);
  const image = (
    <span className="dp-shot-inner">
      <img
        src={src}
        alt={alt}
        onLoad={(e) =>
          setSize(
            `${e.currentTarget.naturalWidth} × ${e.currentTarget.naturalHeight}`,
          )
        }
      />
    </span>
  );
  return (
    <figure className={`dp-shot ${className}`}>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="dp-shot-link"
        >
          {image}
        </a>
      ) : (
        image
      )}
      <figcaption className="dp-shot-status">
        <span>{fileName(src)}</span>
        {size && <span>{size}</span>}
      </figcaption>
    </figure>
  );
};

export const Breadcrumb = ({ items }) => (
  <nav className="dp-breadcrumb" aria-label="Breadcrumb">
    {items.map((item, i) => (
      <span key={i} className="dp-crumb">
        {i > 0 && (
          <ChevronRightIcon className="dp-crumb-sep" aria-hidden="true" />
        )}
        {item}
      </span>
    ))}
  </nav>
);

export const ProjectActions = ({ project, detailTo }) => {
  const { t: translate } = useTranslation();
  return (
    <div className="dp-actions">
      {detailTo && (
        <Link to={detailTo} className="dp-btn dp-btn--primary">
          {translate("devProjects.openDetail")}
        </Link>
      )}
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="dp-btn"
        >
          <ArrowTopRightOnSquareIcon className="dp-icon" aria-hidden="true" />
          {translate("devProjects.live")}
        </a>
      )}
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="dp-btn"
        >
          <GithubMark />
          {translate("projectCard.openGithub")}
        </a>
      )}
    </div>
  );
};

const excerptOf = (text = "", max = 150) => {
  const flat = text.replace(/\s+/g, " ").trim();
  return flat.length > max
    ? `${flat.slice(0, max).replace(/\s\S*$/, "")}…`
    : flat;
};

const ProjectPreview = ({ project, detailTo, inline = false }) => {
  const { t: translate } = useTranslation();
  const cover = project.cover || project.images?.[0];

  return (
    <div className={`dp-preview ${inline ? "dp-preview--inline" : ""}`}>
      {!inline && (
        <Breadcrumb
          items={[
            translate("fileFinder.global"),
            translate("fileFinder.tabs.project"),
            cover ? fileName(cover) : `${project.id}.css`,
          ]}
        />
      )}
      <div className="dp-preview-body" key={project.id}>
        {cover ? (
          <Shot src={cover} alt={project.name} />
        ) : (
          <div className="dp-noshot">
            {project.icon ? (
              <img src={project.icon} alt="" className="dp-noshot-icon" />
            ) : (
              <PhotoIcon className="dp-noshot-icon" aria-hidden="true" />
            )}
            <p>{translate("devProjects.noCapture")}</p>
          </div>
        )}
        <CssRule
          project={project}
          excerpt={project.description && excerptOf(project.description)}
        />
        <ProjectActions project={project} detailTo={detailTo} />
      </div>
    </div>
  );
};

export default ProjectPreview;
