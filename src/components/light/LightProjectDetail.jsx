import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import useData from "./useData";
import useSkillLabels from "../skillI18n";
import { SkillIcon, hasSkillIcon } from "../SkillReactIcons";
import { formatDateRange } from "../dateUtils";
import { findProject } from "../projectLookup";
import RoomHeader from "./RoomHeader";
import BackLink from "./BackLink";
import { Frame } from "./HungWork";
import { AiStamp } from "./Cartel";
import {
  AI_TAGS,
  aiTagOf,
  catalogue,
  durationKey,
  durationOf,
  stackOf,
} from "./museum";

const GithubMark = () => (
  <svg
    viewBox="0 0 16 16"
    aria-hidden="true"
    className="btn-icon"
    fill="currentColor"
  >
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

const useDocumentMeta = (project, owner) => {
  const name = project?.name;
  const description = project?.description;
  useEffect(() => {
    if (!name) return undefined;
    const previousTitle = document.title;
    document.title = `${name} — ${owner}`;
    let tag = document.querySelector('meta[name="description"]');
    const created = !tag;
    if (created) {
      tag = document.createElement("meta");
      tag.setAttribute("name", "description");
      document.head.appendChild(tag);
    }
    const previous = tag.getAttribute("content");
    tag.setAttribute(
      "content",
      (description || name).slice(0, 300).replace(/\s+/g, " "),
    );
    return () => {
      document.title = previousTitle;
      if (created) tag.remove();
      else tag.setAttribute("content", previous);
    };
  }, [name, description, owner]);
};

const Medium = ({ project }) => {
  const labels = useSkillLabels();
  const byCategory = {};
  stackOf(project)
    .filter((skill) => !AI_TAGS.includes(skill.name))
    .forEach((skill) => {
      (byCategory[skill.category] = byCategory[skill.category] || []).push(
        skill,
      );
    });

  return (
    <dl className="medium">
      {Object.entries(byCategory).map(([category, skills]) => (
        <div key={category} className="medium-group">
          <dt>{labels.category(category)}</dt>
          <dd>
            {skills.map((skill) => (
              <span
                key={skill.name}
                className={`medium-item ${skill.important ? "is-key" : ""}`}
              >
                {hasSkillIcon(skill.name) && (
                  <SkillIcon name={skill.name} size={15} />
                )}
                {labels.name(skill.name)}
              </span>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
};

const LightProjectDetail = () => {
  const { projectId } = useParams();
  const { t: translate } = useTranslation();
  const data = useData();
  const found = data ? findProject(data.projects || [], projectId) : null;
  useDocumentMeta(found?.project, translate("home.name"));

  if (!data) return <div className="room room--white room--page" />;

  if (!found) {
    return (
      <div className="room room--white room--page">
        <div className="room-inner">
          <BackLink
            to="/pro/projects"
            label={translate("projectCard.backToProjects")}
          />
          <RoomHeader title={translate("projectCard.notFound")} />
        </div>
      </div>
    );
  }

  const { project, bundle } = found;
  const number = catalogue(data.projects)[project.id];
  const images = project.images || [];
  const main = project.cover || images[0];
  const studies = images.filter((src) => src !== main);
  const duration = durationOf(project);
  const dates = formatDateRange(project.dateBegin, project.dateEnd);

  const facts = [
    [translate("light.detail.date"), dates],
    [
      translate("light.detail.duration"),
      duration &&
        translate(`projectCard.${durationKey(duration)}`, {
          count: duration.value,
        }),
    ],
    [
      translate("light.detail.team"),
      project.personCount > 1
        ? translate("projectCard.people", { count: project.personCount })
        : project.personCount === 1 && translate("projectCard.solo"),
    ],
    [translate("light.detail.with"), project.collaborators?.join(", ")],
    [translate("light.detail.context"), project.company],
    [
      translate("light.detail.status"),
      project.status && translate(`projectCard.status.${project.status}`),
    ],
  ].filter(([, value]) => value);

  return (
    <article className="room room--white room--page">
      <div className="room-inner">
        <BackLink
          to={bundle ? `/pro/projects/${bundle.id}` : "/pro/projects"}
          label={
            bundle
              ? translate("projectCard.backTo", { name: bundle.name })
              : translate("projectCard.backToProjects")
          }
          />
        <RoomHeader
          title={project.name}
          name
          meta={number && translate("light.cartel.cat", { n: number })}
        />

        <div className={`piece ${main || project.icon ? "" : "piece--text"}`}>
          {main ? (
            <a
              href={main}
              target="_blank"
              rel="noreferrer"
              className="piece-frame hung"
            >
              <span className="hung-light" aria-hidden="true" />
              <Frame src={main} alt={project.name} eager />
            </a>
          ) : (
            project.icon && (
              <div className="piece-frame piece-object">
                <Frame
                  src={project.icon}
                  alt={project.name}
                  className="frame--object"
                  eager
                />
              </div>
            )
          )}

          <aside className="cartel cartel--full">
            <dl className="facts">
              {facts.map(([label, value]) => (
                <div key={label} className="fact">
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <AiStamp tag={aiTagOf(project)} />
            {(project.link || project.github) && (
              <div className="piece-actions">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn--ink"
                  >
                    {translate("projectCard.openLink")}
                    <ArrowUpRightIcon className="btn-icon" aria-hidden="true" />
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn--line"
                  >
                    <GithubMark />
                    {translate("projectCard.openGithub")}
                  </a>
                )}
              </div>
            )}
          </aside>
        </div>

        <div className="piece-body">
          {project.description && (
            <p className="wall-text">{project.description}</p>
          )}
          {project.stack && (
            <section className="piece-medium">
              <h2 className="section-title">
                {translate("projectCard.stack")}
              </h2>
              <Medium project={project} />
            </section>
          )}
        </div>

        {studies.length > 0 && (
          <section className="studies">
            <h2 className="section-title">
              {translate("light.detail.studies")}
            </h2>
            <div className="studies-grid">
              {studies.map((src, i) => (
                <a
                  key={src}
                  href={src}
                  target="_blank"
                  rel="noreferrer"
                  className="hung study"
                >
                  <span className="hung-light" aria-hidden="true" />
                  <Frame
                    src={src}
                    alt={translate("light.detail.studyAlt", {
                      name: project.name,
                      n: i + 2,
                    })}
                  />
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
};

export default LightProjectDetail;
