import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useData from "./useData";
import LightSection from "./LightSection";
import { SkillIcon } from "../SkillReactIcons";
import ProjectMeta from "../ProjectMeta";
import useSkillLabels from "../skillI18n";
import { parseSkill } from "../skillMarkup";
import { byDateEndDesc } from "../dateUtils";

export const ProjectCard = ({ project, labels, translate }) => {
  const stack = project.stack || {};
  const skills = Object.values(stack).flat();
  const important = project.important;

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noreferrer"
      className={
        "group relative flex flex-col rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition-all " +
        (important
          ? "border-ayu-purple/40 ring-1 ring-ayu-purple/30 bg-gradient-to-br from-white to-ayu-purple/5 hover:border-ayu-purple/60"
          : "border-gray-200 hover:border-ayu-purple/40")
      }
    >
      {important && (
        <span className="absolute -top-2.5 left-5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-white bg-gradient-to-r from-ayu-purple to-ayu-yellow shadow">
          ★ {translate("projectCard.featured")}
        </span>
      )}
      <div className="flex items-center gap-4 mb-4">
        {project.cover && (
          <div className="w-14 h-14 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
            <img
              src={project.cover}
              alt=""
              className="max-w-[70%] max-h-[70%]"
            />
          </div>
        )}
        <div>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-ayu-purple flex items-center gap-1.5">
            {project.name}
            <span
              aria-hidden="true"
              className="text-gray-300 group-hover:text-ayu-purple transition-transform group-hover:translate-x-0.5"
            >
              ↗
            </span>
          </h3>
          {project.company && (
            <p className="text-sm text-gray-500">{project.company}</p>
          )}
        </div>
      </div>
      <ProjectMeta project={project} variant="light" />
      <p className="mt-4 text-sm text-gray-600 whitespace-pre-wrap flex-grow">
        {project.description}
      </p>
      {skills.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {skills.map((raw) => {
            const { name, important: isImp } = parseSkill(raw);
            return (
              <span
                key={name}
                title={isImp ? `★ ${labels.name(name)}` : labels.name(name)}
                className={
                  "inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs " +
                  (isImp
                    ? "bg-gradient-to-r from-ayu-purple to-fuchsia-500 text-white border border-transparent shadow-sm"
                    : "bg-gray-50 border border-gray-100 text-gray-700")
                }
              >
                <SkillIcon name={name} size={14} />
                {isImp && (
                  <span aria-hidden="true" className="text-ayu-yellow">
                    ★
                  </span>
                )}
                {labels.name(name)}
              </span>
            );
          })}
        </div>
      )}
    </a>
  );
};

const BundleCard = ({ project, translate }) => {
  const navigate = useNavigate();
  const subProjects = project.subProjects || [];
  const important = project.important;
  const tiles = subProjects.slice(0, 4);
  const extra = subProjects.length - 4;

  return (
    <button
      type="button"
      onClick={() => navigate(`/pro/projects/${project.id}`)}
      className={
        "group relative flex flex-col text-left rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition-all " +
        (important
          ? "border-ayu-purple/40 ring-1 ring-ayu-purple/30 bg-gradient-to-br from-white to-ayu-purple/5 hover:border-ayu-purple/60"
          : "border-gray-200 hover:border-ayu-purple/40")
      }
    >
      {important && (
        <span className="absolute -top-2.5 left-5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-white bg-gradient-to-r from-ayu-purple to-ayu-yellow shadow">
          ★ {translate("projectCard.featured")}
        </span>
      )}
      <div className="mb-3">
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-ayu-purple flex flex-wrap items-center gap-2">
          {project.name}
          <span className="inline-flex items-center px-2 py-0.5 rounded-full border border-ayu-purple/30 bg-ayu-purple/10 text-ayu-purple text-[11px] font-medium">
            {translate("projectCard.bundleCount", {
              count: subProjects.length,
            })}
          </span>
        </h3>
        {project.company && (
          <p className="text-sm text-gray-500">{project.company}</p>
        )}
      </div>
      <ProjectMeta project={project} variant="light" />
      <div className="mt-4 grid grid-cols-2 gap-2.5">
        {tiles.map((sub, i) => (
          <div
            key={sub.id || i}
            className="rounded-lg border border-gray-100 bg-gray-50 p-2.5 min-h-[3rem] flex items-center justify-center text-center text-xs font-medium text-gray-700"
          >
            {sub.name}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between">
        {extra > 0 ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-ayu-purple/90 text-white text-xs font-medium">
            +{extra} {translate("projectCard.more")}
          </span>
        ) : (
          <span />
        )}
        <span className="text-[11px] text-gray-400 group-hover:text-ayu-purple flex items-center gap-1">
          {translate("projectCard.openBundle")}
          <span
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-0.5"
          >
            →
          </span>
        </span>
      </div>
    </button>
  );
};

const CategorySection = ({ group, labels, translate }) => {
  const [open, setOpen] = useState(true);
  const items = byDateEndDesc(group.items);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="group flex w-full items-center gap-2 mb-5 text-left"
      >
        <span
          aria-hidden="true"
          className={`text-gray-400 group-hover:text-ayu-purple transition-transform duration-200 ${open ? "rotate-90" : ""}`}
        >
          ▶
        </span>
        <h2 className="text-lg font-semibold text-gray-500 group-hover:text-ayu-purple transition-colors">
          {group.category}
        </h2>
        <span className="inline-flex items-center justify-center min-w-[1.5rem] px-1.5 rounded-full bg-gray-100 text-gray-500 text-xs font-medium">
          {items.length}
        </span>
      </button>
      {open && (
        <div className="grid gap-6 md:grid-cols-2 animate-fade-in">
          {items.map((project, pi) =>
            project.subProjects ? (
              <BundleCard
                key={project.id || pi}
                project={project}
                translate={translate}
              />
            ) : (
              <ProjectCard
                key={project.id || pi}
                project={project}
                labels={labels}
                translate={translate}
              />
            ),
          )}
        </div>
      )}
    </div>
  );
};

const LightProjects = () => {
  const { t: translate } = useTranslation();
  const data = useData();
  const labels = useSkillLabels();
  const groups = data?.projects || [];

  return (
    <LightSection title={translate("home.projects")}>
      <div className="space-y-8">
        {groups.map((group, gi) => (
          <CategorySection
            key={gi}
            group={group}
            labels={labels}
            translate={translate}
          />
        ))}
      </div>
    </LightSection>
  );
};

export default LightProjects;
